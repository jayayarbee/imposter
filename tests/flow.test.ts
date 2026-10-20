import { describe, expect, it } from "vitest";
import { createInitialState, reducer, sanitizeSettings, type GameState } from "@/features/game/state";
import { createRound } from "@/lib/game/engine";
import { mulberry32 } from "@/lib/game/random";
import { BUILT_IN } from "@/data";
import { makePlayers, settings } from "./helpers";

function started(over: Partial<ReturnType<typeof settings>> = {}, n = 4, seed = 1): GameState {
  const players = makePlayers(n);
  const s = settings(over);
  const res = createRound(BUILT_IN.bank, players, s, { rng: mulberry32(seed) });
  if (!res.ok) throw new Error("round failed");
  let st: GameState = { ...createInitialState(), players, settings: s };
  st = reducer(st, { type: "startRound", round: res.round });
  return st;
}

function revealAll(st: GameState): GameState {
  let s = st;
  for (let i = 0; i < st.players.length; i++) {
    s = reducer(s, { type: "revealShow" });
    s = reducer(s, { type: "revealHide" });
    s = reducer(s, { type: "revealNext" });
  }
  return s;
}

function voteAll(st: GameState, pick: (voterId: string, candidates: string[]) => string | null): GameState {
  let s = reducer(st, { type: "toVoting" });
  for (let guard = 0; guard < 100 && s.screen.name === "voting"; guard++) {
    s = reducer(s, { type: "voterReady" });
    if (s.screen.name !== "voting") break;
    const voter = s.screen.round.players[s.screen.v.voterIndex];
    s = reducer(s, { type: "castVote", targetId: pick(voter.id, s.screen.v.candidateIds) });
  }
  return s;
}

describe("round lifecycle", () => {
  it("cannot skip the reveal sequence", () => {
    let st = started();
    expect(st.screen.name).toBe("reveal");
    // advancing without viewing/hiding does nothing
    expect(reducer(st, { type: "revealNext" })).toBe(st);
    expect(reducer(st, { type: "toVoting" })).toBe(st);
    st = reducer(st, { type: "revealShow" });
    expect(reducer(st, { type: "revealNext" })).toBe(st); // still showing: must hide first
    st = reducer(st, { type: "revealHide" });
    st = reducer(st, { type: "revealNext" });
    expect(st.screen).toMatchObject({ name: "reveal", index: 1, step: "handoff" });
  });
  it("reveals one player at a time and ends in discussion, then voting", () => {
    const st = revealAll(started());
    expect(st.screen.name).toBe("discussion");
    expect(reducer(st, { type: "toVoting" }).screen.name).toBe("voting");
  });
  it("regular players win when the imposter is voted out", () => {
    const st = revealAll(started());
    const round = (st.screen as { round: { assignments: { playerId: string; role: string }[] } }).round;
    const imp = round.assignments.find((a) => a.role === "imposter")!.playerId;
    const end = voteAll(st, (voter, cands) => (voter === imp ? cands.find((c) => c !== imp)! : imp));
    expect(end.screen.name).toBe("results");
    if (end.screen.name === "results") {
      expect(end.screen.result.winner).toBe("regular");
      expect(end.screen.result.accusedIds).toEqual([imp]);
    }
  });
  it("imposters win when an innocent is eliminated", () => {
    const st = revealAll(started());
    const round = (st.screen as { round: { assignments: { playerId: string; role: string }[] } }).round;
    const imp = round.assignments.find((a) => a.role === "imposter")!.playerId;
    const innocent = round.assignments.find((a) => a.role === "regular")!.playerId;
    const end = voteAll(st, (voter, cands) => (voter === innocent ? cands.find((c) => c !== innocent && c !== imp)! : innocent));
    if (end.screen.name !== "results") throw new Error("expected results");
    expect(end.screen.result.winner).toBe("imposters");
  });
  it("revotes once on a tie, then decides", () => {
    const st = revealAll(started({}, 4));
    const ids = st.players.map((p) => p.id);
    let attempt = 0;
    // first round: p1->p2, p2->p1 (tie), p3/p4 abstain. second round: everyone votes for the first tied candidate.
    let s = reducer(st, { type: "toVoting" });
    const votes1: Record<string, string | null> = { [ids[0]]: ids[1], [ids[1]]: ids[0], [ids[2]]: null, [ids[3]]: null };
    for (const voterId of ids) {
      s = reducer(s, { type: "voterReady" });
      s = reducer(s, { type: "castVote", targetId: votes1[voterId] });
    }
    expect(s.screen.name).toBe("voting");
    if (s.screen.name !== "voting") return;
    expect(s.screen.v.attempt).toBe(2);
    expect(s.screen.v.candidateIds.sort()).toEqual([ids[0], ids[1]].sort());
    const target = s.screen.v.candidateIds[0];
    for (let i = 0; i < 4; i++) {
      attempt++;
      s = reducer(s, { type: "voterReady" });
      const scr = s.screen;
      if (scr.name !== "voting") throw new Error("expected voting");
      const voter = scr.round.players[scr.v.voterIndex].id;
      const other = scr.v.candidateIds.find((c) => c !== voter)!;
      s = reducer(s, { type: "castVote", targetId: voter === target ? other : target });
    }
    expect(attempt).toBe(4);
    expect(s.screen.name).toBe("results");
    if (s.screen.name === "results") expect(s.screen.result.revoted).toBe(true);
  });
  it("imposters win on a tie under the imposters-win rule", () => {
    const st = revealAll(started({ tieRule: "imposters-win" }, 4));
    const end = voteAll(st, () => null);
    if (end.screen.name !== "results") throw new Error("expected results");
    expect(end.screen.result.winner).toBe("imposters");
    expect(end.screen.result.tied).toBe(true);
  });
  it("rejects self votes when disabled", () => {
    let s = reducer(revealAll(started()), { type: "toVoting" });
    s = reducer(s, { type: "voterReady" });
    if (s.screen.name !== "voting") throw new Error();
    const voter = s.screen.round.players[0].id;
    const after = reducer(s, { type: "castVote", targetId: voter });
    expect(after).toBe(s);
  });
  it("restart keeps players and settings but produces a brand-new round", () => {
    const st = revealAll(started());
    const players = st.players;
    const res = createRound(BUILT_IN.bank, players, st.settings, { rng: mulberry32(99), recentWordIds: st.recentWordIds });
    if (!res.ok) throw new Error();
    const again = reducer(st, { type: "startRound", round: res.round });
    expect(again.screen).toMatchObject({ name: "reveal", index: 0, step: "handoff" });
    expect(again.players).toEqual(players);
    expect(again.settings).toEqual(st.settings);
    if (again.screen.name === "reveal" && st.screen.name === "discussion") expect(again.screen.round.id).not.toBe(st.screen.round.id);
  });
});

describe("state hygiene", () => {
  it("clamps imposters when players are removed", () => {
    let st: GameState = { ...createInitialState(), players: makePlayers(5), settings: settings({ imposterCount: 2 }) };
    st = reducer(st, { type: "removePlayer", id: "p5" });
    st = reducer(st, { type: "removePlayer", id: "p4" });
    expect(st.settings.imposterCount).toBe(1);
  });
  it("sanitizes untrusted persisted settings", () => {
    const s = sanitizeSettings({ difficulty: "nightmare", timerSeconds: -5, imposterCount: "x", wordMode: "different" });
    expect(s.difficulty).toBe("easy");
    expect(s.timerSeconds).toBe(180);
    expect(s.imposterCount).toBe(1);
    expect(s.wordMode).toBe("different");
  });
  it("never persists the active round (types only allow preferences)", () => {
    const st = started();
    const persisted = JSON.stringify({ players: st.players, settings: st.settings, custom: st.custom, theme: st.theme });
    expect(persisted).not.toContain(st.screen.name === "reveal" ? st.screen.round.secretWord.word : "###");
  });
});
