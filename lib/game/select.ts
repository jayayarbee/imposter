import type { GameSettings, WordBank, WordEntry, WordPair } from "@/types";
import { slugify } from "./bank";

export type Selection = Pick<GameSettings, "categoryMode" | "categoryIds" | "difficulty">;

export function eligibleCategoryIds(bank: WordBank, sel: Selection): string[] {
  const all = bank.categories.map((c) => c.id);
  if (sel.categoryMode === "all") return all;
  const known = new Set(all);
  const ids = sel.categoryIds.filter((id) => known.has(id));
  return sel.categoryMode === "single" ? ids.slice(0, 1) : ids;
}

export function filterWords(bank: WordBank, sel: Selection): WordEntry[] {
  const cats = new Set(eligibleCategoryIds(bank, sel));
  return bank.words.filter((w) => !w.pairOnly && cats.has(w.categoryId) && w.difficulty === sel.difficulty);
}

export function filterPairs(bank: WordBank, sel: Selection): WordPair[] {
  const cats = new Set(eligibleCategoryIds(bank, sel));
  return bank.pairs.filter((p) => p.difficulty === sel.difficulty && p.categoryIds.some((c) => cats.has(c)));
}

/** Removes entries with the same normalised text so duplicates cannot bias selection. */
export function dedupeWords(words: readonly WordEntry[]): WordEntry[] {
  const seen = new Set<string>();
  const out: WordEntry[] = [];
  for (const w of words) {
    const key = slugify(w.word);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(w);
  }
  return out;
}

export function dedupePairs(pairs: readonly WordPair[]): WordPair[] {
  const seen = new Set<string>();
  const out: WordPair[] = [];
  for (const p of pairs) {
    const key = [p.wordAId, p.wordBId].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}
