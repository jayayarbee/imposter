import { describe, expect, it } from "vitest";
import { createNextRound, createRound, roundWordIds } from "@/lib/game/engine";
import { mulberry32, shuffle } from "@/lib/game/random";
import { BUILT_IN } from "@/data";
import { makePlayers, settings, tinyBank } from "./helpers";

const bank = BUILT_IN.bank;

describe("createRound (classic)", () => {
  const players = makePlayers(6);
  it("gives every regular player the same word and imposters none", () => {
    const res = createRound(bank, players, settings({ imposterCount: 2 }), { rng: mulberry32(1) });
    if (!res.ok) throw new Error("expected ok");
    const r = res.round;
    const imps = r.assignments.filter((a) => a.role === "imposter");
    const regs = r.assignments.filter((a) => a.role === "regular");
    expect(imps).toHaveLength(2);
    expect(regs).toHaveLength(4);
    expect(new Set(regs.map((a) => a.word))).toEqual(new Set([r.secretWord.word]));
    expect(imps.every((a) => a.word === null)).toBe(true);
    expect(r.imposterWord).toBeNull();
    expect(r.assignments.map((a) => a.playerId)).toEqual(players.map((p) => p.id));
  });
  it("selects only from eligible words", () => {
    for (let s = 0; s < 50; s++) {
      const res = createRound(bank, players, settings({ categoryMode: "single", categoryIds: ["sports"], difficulty: "hard" }), { rng: mulberry32(s) });
      if (!res.ok) throw new Error("expected ok");
      expect(res.round.secretWord.categoryId).toBe("sports");
      expect(res.round.secretWord.difficulty).toBe("hard");
    }
  });
  it("assigns imposters without positional bias", () => {
    const ps = makePlayers(4);
    const hits: Record<string, number> = {};
    const rng = mulberry32(42);
    const N = 4000;
    for (let i = 0; i < N; i++) {
      const res = createRound(bank, ps, settings(), { rng });
      if (!res.ok) throw new Error("expected ok");
      const imp = res.round.assignments.find((a) => a.role === "imposter")!.playerId;
      hits[imp] = (hits[imp] ?? 0) + 1;
    }
    for (const p of ps) expect(Math.abs(hits[p.id] / N - 0.25)).toBeLessThan(0.04);
  });
  it("shuffle is a permutation", () => {
    const a = [1, 2, 3, 4, 5, 6];
    expect([...shuffle(a, mulberry32(3))].sort()).toEqual(a);
  });
  it("avoids recently used words when alternatives exist", () => {
    const tiny = tinyBank();
    const s = settings({ categoryMode: "single", categoryIds: ["b"], difficulty: "easy" });
    for (let i = 0; i < 30; i++) {
      const res = createRound(tiny, makePlayers(3), s, { rng: mulberry32(i), recentWordIds: ["b:dog"] });
      if (!res.ok) throw new Error("expected ok");
      expect(res.round.secretWord.id).toBe("b:cat");
    }
  });
  it("falls back to the only word when nothing else exists", () => {
    const tiny = tinyBank();
    const s = settings({ categoryMode: "single", categoryIds: ["b"], difficulty: "hard" });
    const res = createRound(tiny, makePlayers(3), s, { recentWordIds: ["b:lynx"] });
    expect(res.ok).toBe(true);
  });
  it("fails safely with a message for invalid config / empty pools", () => {
    const res = createRound(bank, makePlayers(2), settings());
    expect(res.ok).toBe(false);
    const res2 = createRound({ categories: [], words: [], pairs: [] }, makePlayers(4), settings());
    expect(res2.ok).toBe(false);
    if (!res2.ok) expect(res2.issues[0].message.length).toBeGreaterThan(10);
  });
});

describe("createRound (different word)", () => {
  it("assigns a curated related pair, same alternate word to all imposters", () => {
    const players = makePlayers(7);
    for (let s = 0; s < 40; s++) {
      const res = createRound(bank, players, settings({ wordMode: "different", imposterCount: 3 }), { rng: mulberry32(s) });
      if (!res.ok) throw new Error("expected ok");
      const r = res.round;
      expect(r.imposterWord).not.toBeNull();
      expect(r.imposterWord!.word).not.toBe(r.secretWord.word);
      const pair = bank.pairs.find((p) => p.id === r.pairId)!;
      expect([pair.wordAId, pair.wordBId].sort()).toEqual([r.secretWord.id, r.imposterWord!.id].sort());
      const imps = r.assignments.filter((a) => a.role === "imposter");
      expect(imps).toHaveLength(3);
      expect(new Set(imps.map((a) => a.word))).toEqual(new Set([r.imposterWord!.word]));
      expect(r.assignments.filter((a) => a.role === "regular").every((a) => a.word === r.secretWord.word)).toBe(true);
    }
  });
  it("respects category and difficulty for pairs", () => {
    const res = createRound(bank, makePlayers(4), settings({ wordMode: "different", categoryMode: "single", categoryIds: ["transport"], difficulty: "easy" }), { rng: mulberry32(9) });
    if (!res.ok) throw new Error("expected ok");
    expect(res.round.secretWord.categoryId).toBe("transport");
    const pair = bank.pairs.find((p) => p.id === res.round.pairId)!;
    expect(pair.categoryIds).toContain("transport");
    expect(pair.difficulty).toBe("easy");
  });
  it("never falls back to unrelated words", () => {
    const res = createRound(tinyBank(), makePlayers(4), settings({ wordMode: "different", categoryMode: "single", categoryIds: ["b"], difficulty: "easy" }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.issues[0].code).toBe("no-pairs");
  });
});

describe("replay", () => {
  it("creates a new round that avoids the previous words but keeps players and settings", () => {
    const players = makePlayers(5);
    const s = settings();
    const first = createRound(bank, players, s, { rng: mulberry32(5) });
    if (!first.ok) throw new Error("expected ok");
    const next = createNextRound(bank, players, s, roundWordIds(first.round), { rng: mulberry32(6) });
    if (!next.ok) throw new Error("expected ok");
    expect(next.round.id).not.toBe(first.round.id);
    expect(next.round.secretWord.id).not.toBe(first.round.secretWord.id);
    expect(next.round.players.map((p) => p.id)).toEqual(players.map((p) => p.id));
  });
});
