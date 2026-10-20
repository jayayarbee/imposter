import { describe, expect, it } from "vitest";
import { BUILT_IN, CATEGORY_SOURCES, getBank } from "@/data";
import { coverageReport, crossCategoryDuplicates, validateBank } from "@/lib/validation/bank";
import { parseCustomInput, addCustomEntries } from "@/lib/validation/custom";
import { emptyCustomPack } from "@/lib/game/bank";
import { DIFFICULTIES } from "@/types";

const bank = BUILT_IN.bank;
const EXPECTED = ["daily-life", "celebrities", "nature", "food", "characters", "countries", "fashion", "games", "movies", "music", "objects", "jobs", "school", "sports", "technology", "transport"];

describe("built-in word bank", () => {
  it("has exactly the 16 required categories", () => {
    expect(bank.categories.map((c) => c.id)).toEqual(EXPECTED);
    expect(CATEGORY_SOURCES).toHaveLength(16);
  });
  it("builds without warnings and passes structural validation", () => {
    expect(BUILT_IN.warnings).toEqual([]);
    expect(validateBank(bank)).toEqual([]);
  });
  it("has no unintentional cross-category duplicates", () => {
    expect(crossCategoryDuplicates(bank)).toEqual([]);
  });
  it("has plenty of words AND association pairs at every difficulty in every category", () => {
    for (const row of coverageReport(bank)) {
      for (const d of DIFFICULTIES) {
        expect(row.words[d], `${row.categoryId} ${d} words`).toBeGreaterThanOrEqual(30);
        expect(row.pairs[d], `${row.categoryId} ${d} pairs`).toBeGreaterThanOrEqual(10);
      }
    }
  });
  it("coverage report agrees with the raw data", () => {
    const total = coverageReport(bank).reduce((n, r) => n + r.totalWords, 0);
    expect(total).toBe(bank.words.filter((w) => !w.pairOnly).length);
  });
  it("pair words are distinct, exist, and are pair-only (never classic secret words)", () => {
    const byId = new Map(bank.words.map((w) => [w.id, w]));
    for (const p of bank.pairs) {
      const a = byId.get(p.wordAId)!;
      const b = byId.get(p.wordBId)!;
      expect(a.word.toLowerCase()).not.toBe(b.word.toLowerCase());
      expect(a.pairOnly && b.pairOnly).toBe(true);
    }
  });
});

describe("custom words", () => {
  it("validates input and builds a separate Custom category", () => {
    const { valid, errors } = parseCustomInput("Pickleball\nTea ~ Chai\n  \nTea~Chai\nA ~ A\nx|y\nB ~ C ~ D", emptyCustomPack());
    expect(valid).toEqual(["Pickleball", "Tea~Chai"]);
    expect(errors).toHaveLength(4);
    const pack = addCustomEntries(emptyCustomPack(), "easy", valid);
    const withCustom = getBank(pack);
    expect(withCustom.categories.at(-1)?.id).toBe("custom");
    expect(withCustom.pairs.some((p) => p.categoryIds[0] === "custom")).toBe(true);
    expect(getBank(emptyCustomPack()).categories).toHaveLength(16);
    expect(bank.categories).toHaveLength(16); // built-in data untouched
  });
});
