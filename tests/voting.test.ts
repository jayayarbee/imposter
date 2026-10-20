import { describe, expect, it } from "vitest";
import { decideWinner, finishRound, resolveVotes, tallyVotes, validateVote } from "@/lib/game/voting";
import type { Round, Vote } from "@/types";
import { makePlayers } from "./helpers";

const v = (voterId: string, targetId: string | null): Vote => ({ voterId, targetId });
const ids = ["p1", "p2", "p3", "p4", "p5"];

function roundWith(imposters: string[]): Round {
  const players = makePlayers(5);
  return {
    id: "r", wordMode: "classic", players, startingPlayerId: "p1",
    secretWord: { id: "x:w", word: "W", categoryId: "x", difficulty: "easy" }, imposterWord: null,
    assignments: players.map((p) => ({ playerId: p.id, role: imposters.includes(p.id) ? "imposter" : "regular", word: imposters.includes(p.id) ? null : "W" })),
  };
}

describe("tally and resolve", () => {
  it("counts votes and ignores abstentions", () => {
    const c = tallyVotes([v("p1", "p2"), v("p3", "p2"), v("p4", null), v("p5", "p1")], ids);
    expect(c).toMatchObject({ p1: 1, p2: 2, p3: 0 });
  });
  it("decides a clear winner", () => {
    const c = { p1: 1, p2: 3, p3: 1, p4: 0, p5: 0 };
    expect(resolveVotes(c, ids, 1)).toEqual({ kind: "decided", accusedIds: ["p2"] });
  });
  it("detects ties for the last slot", () => {
    const c = { p1: 2, p2: 2, p3: 1, p4: 0, p5: 0 };
    expect(resolveVotes(c, ids, 1)).toEqual({ kind: "tie", lockedIds: [], tiedIds: ["p1", "p2"], slots: 1 });
  });
  it("locks clear leaders and ties only the boundary (multi-imposter)", () => {
    const c = { p1: 3, p2: 1, p3: 1, p4: 0, p5: 0 };
    expect(resolveVotes(c, ids, 2)).toEqual({ kind: "tie", lockedIds: ["p1"], tiedIds: ["p2", "p3"], slots: 1 });
    expect(resolveVotes({ p1: 3, p2: 2, p3: 0, p4: 0, p5: 0 }, ids, 2)).toEqual({ kind: "decided", accusedIds: ["p1", "p2"] });
  });
  it("treats an all-abstain vote as a tie", () => {
    const c = tallyVotes([v("p1", null), v("p2", null)], ids);
    expect(resolveVotes(c, ids, 1).kind).toBe("tie");
  });
});

describe("validateVote", () => {
  it("blocks self votes unless allowed, and non-candidates", () => {
    expect(validateVote("p1", "p1", ids, { allowSelfVote: false })).toMatch(/yourself/);
    expect(validateVote("p1", "p1", ids, { allowSelfVote: true })).toBeNull();
    expect(validateVote("p1", "zzz", ids, { allowSelfVote: false })).toMatch(/cannot/);
    expect(validateVote("p1", null, ids, { allowSelfVote: false })).toBeNull();
  });
});

describe("win conditions", () => {
  it("regular players win only if every imposter is accused", () => {
    expect(decideWinner(["p1"], ["p1"])).toBe("regular");
    expect(decideWinner(["p1"], ["p2"])).toBe("imposters");
    expect(decideWinner(["p1", "p2"], ["p1", "p2"])).toBe("regular");
    expect(decideWinner(["p1", "p2"], ["p1", "p3"])).toBe("imposters");
  });
  it("explains results", () => {
    const r1 = finishRound(roundWith(["p2"]), ["p2"], { p2: 3 });
    expect(r1.winner).toBe("regular");
    expect(r1.reason).toMatch(/Player 2/);
    const r2 = finishRound(roundWith(["p2"]), ["p3"], { p3: 3 });
    expect(r2.winner).toBe("imposters");
    const r3 = finishRound(roundWith(["p2", "p3"]), ["p2", "p4"], {});
    expect(r3.reason).toMatch(/1 of 2/);
    const r4 = finishRound(roundWith(["p2"]), [], {}, { tied: true, tiedIds: ["p1", "p2"] });
    expect(r4.winner).toBe("imposters");
    expect(r4.tied).toBe(true);
  });
});
