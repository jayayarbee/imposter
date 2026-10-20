import { describe, expect, it } from "vitest";
import { buildBank } from "@/lib/game/bank";
import { dedupeWords, filterPairs, filterWords } from "@/lib/game/select";
import { BUILT_IN } from "@/data";
import { settings, tinyBank, tinySources } from "./helpers";

describe("word filtering", () => {
  const bank = tinyBank();
  it("single category", () => {
    const w = filterWords(bank, settings({ categoryMode: "single", categoryIds: ["a"], difficulty: "easy" }));
    expect(w.every((x) => x.categoryId === "a" && x.difficulty === "easy")).toBe(true);
    expect(w.map((x) => x.word)).toEqual(expect.arrayContaining(["Apple", "Banana", "Cherry", "Pear"]));
  });
  it("mixed categories", () => {
    const w = filterWords(bank, settings({ categoryMode: "mixed", categoryIds: ["a", "b"], difficulty: "easy" }));
    expect(new Set(w.map((x) => x.categoryId))).toEqual(new Set(["a", "b"]));
  });
  it("all categories ignores selected ids", () => {
    const w = filterWords(bank, settings({ categoryMode: "all", categoryIds: ["a"], difficulty: "medium" }));
    expect(new Set(w.map((x) => x.categoryId))).toEqual(new Set(["a", "b"]));
  });
  it("difficulty really filters", () => {
    for (const d of ["easy", "medium", "hard"] as const) {
      const w = filterWords(BUILT_IN.bank, settings({ categoryMode: "all", difficulty: d }));
      expect(w.length).toBeGreaterThan(0);
      expect(w.every((x) => x.difficulty === d)).toBe(true);
    }
  });
  it("pairs are filtered by category and difficulty", () => {
    expect(filterPairs(bank, settings({ categoryMode: "single", categoryIds: ["a"], difficulty: "easy" }))).toHaveLength(1);
    expect(filterPairs(bank, settings({ categoryMode: "single", categoryIds: ["a"], difficulty: "hard" }))).toHaveLength(0);
    expect(filterPairs(bank, settings({ categoryMode: "all", difficulty: "medium" }))).toHaveLength(1);
  });
  it("drops duplicate entries so they cannot bias selection", () => {
    const { bank: b, warnings } = buildBank([{ ...tinySources[0], words: { easy: "Apple|apple|APPLE|Banana", medium: "", hard: "" } }]);
    expect(warnings.length).toBe(2);
    expect(b.words.filter((w) => w.difficulty === "easy" && w.word.toLowerCase() === "apple")).toHaveLength(1);
    const cross = buildBank([
      { id: "x", label: "X", words: { easy: "Same", medium: "", hard: "" }, pairs: { easy: "", medium: "", hard: "" } },
      { id: "y", label: "Y", words: { easy: "same|Other", medium: "", hard: "" }, pairs: { easy: "", medium: "", hard: "" } },
    ]).bank;
    expect(dedupeWords(filterWords(cross, settings({ categoryMode: "all" })))).toHaveLength(2);
  });
});
