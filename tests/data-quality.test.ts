import { describe, expect, it } from "vitest";
import { BUILT_IN } from "@/data";
import { checkPairs, RELATIONSHIP_TYPES, wordReuse } from "@/lib/validation/pairs";
import { createRound, roundWordIds } from "@/lib/game/engine";
import { mulberry32 } from "@/lib/game/random";
import { filterPairs, filterWords } from "@/lib/game/select";
import { DIFFICULTIES } from "@/types";
import { makePlayers, settings } from "./helpers";

const bank = BUILT_IN.bank;

describe("association pair quality", () => {
  const { errors, flags } = checkPairs(bank);
  it("has no structural errors (missing words, duplicates incl. reversed, bad relationship/explanation/tags)", () => {
    expect(errors).toEqual([]);
  });
  it("has no unreviewed near-synonym flags", () => {
    expect(flags.map((f) => `${f.pairId}: ${f.problem}`)).toEqual([]);
  });
  it("every pair carries a known relationship type and a real explanation", () => {
    const known = new Set<string>(RELATIONSHIP_TYPES);
    for (const p of bank.pairs) {
      expect(known.has(p.relationship ?? ""), p.id).toBe(true);
      expect((p.explanation ?? "").length, p.id).toBeGreaterThanOrEqual(15);
    }
  });
  it("no single concept dominates the bank (each word in at most 3 pairs)", () => {
    const heavy = wordReuse(bank).filter((w) => w.pairs > 3);
    expect(heavy).toEqual([]);
  });
  it("uses a varied set of relationship types", () => {
    const counts = new Map<string, number>();
    for (const p of bank.pairs) counts.set(p.relationship!, (counts.get(p.relationship!) ?? 0) + 1);
    expect(counts.size).toBeGreaterThanOrEqual(30);
    const top = Math.max(...counts.values());
    expect(top / bank.pairs.length).toBeLessThan(0.15);
  });
  it("difficulty and categories are balanced", () => {
    for (const d of DIFFICULTIES) expect(bank.pairs.filter((p) => p.difficulty === d).length).toBe(bank.categories.length * 10);
  });
  it("has both Indian and global content, and regional tags", () => {
    const tags = new Set(bank.pairs.flatMap((p) => p.tags ?? []));
    for (const t of ["indian", "global", "malayalam", "hindi", "tamil", "telugu", "kannada", "bengali", "korean", "japanese"]) expect(tags.has(t), t).toBe(true);
  });
});

describe("repetition", () => {
  const ps = makePlayers(4);
  for (const mode of ["classic", "different"] as const) {
    it(`never repeats the previous round's word/pair in ${mode} mode (all categories, every difficulty)`, () => {
      for (const difficulty of DIFFICULTIES) {
        for (let seed = 0; seed < 8; seed++) {
          const rng = mulberry32(seed + 100);
          let recent: string[] = [];
          let last = "";
          for (let i = 0; i < 60; i++) {
            const res = createRound(bank, ps, settings({ wordMode: mode, difficulty }), { rng, recentWordIds: recent });
            if (!res.ok) throw new Error("round failed");
            const key = res.round.pairId ?? res.round.secretWord.id;
            expect(key).not.toBe(last);
            last = key;
            recent = [...roundWordIds(res.round), ...recent].slice(0, 90);
          }
        }
      }
    });
    it(`does not repeat anything within a full session on a single category (${mode})`, () => {
      const s = settings({ wordMode: mode, categoryMode: "single", categoryIds: ["movies"], difficulty: "medium" });
      const pool = mode === "classic" ? filterWords(bank, s).length : filterPairs(bank, s).length;
      const rng = mulberry32(7);
      let recent: string[] = [];
      const seen = new Set<string>();
      const rounds = Math.min(pool, 10);
      for (let i = 0; i < rounds; i++) {
        const res = createRound(bank, ps, s, { rng, recentWordIds: recent });
        if (!res.ok) throw new Error("round failed");
        const key = res.round.pairId ?? res.round.secretWord.id;
        expect(seen.has(key)).toBe(false);
        seen.add(key);
        recent = [...roundWordIds(res.round), ...recent];
      }
    });
  }
  it("still works (explicit fallback) when the pool is smaller than the history", () => {
    const tiny = { categories: [{ id: "c", label: "C" }], words: [{ id: "c:a", word: "A", categoryId: "c", difficulty: "easy" as const }, { id: "c:b", word: "B", categoryId: "c", difficulty: "easy" as const }], pairs: [] };
    let recent: string[] = [];
    let last = "";
    const rng = mulberry32(3);
    for (let i = 0; i < 20; i++) {
      const res = createRound(tiny, ps, settings({ categoryMode: "all" }), { rng, recentWordIds: recent });
      if (!res.ok) throw new Error("round failed");
      expect(res.round.secretWord.id).not.toBe(last);
      last = res.round.secretWord.id;
      recent = [res.round.secretWord.id, ...recent].slice(0, 12);
    }
  });
});
