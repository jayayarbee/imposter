import type { Difficulty, WordBank } from "@/types";
import { DIFFICULTIES } from "@/types";
import { slugify } from "@/lib/game/bank";

/** Structural checks for a word bank. Returns human-readable problems (empty = valid). */
export function validateBank(bank: WordBank): string[] {
  const problems: string[] = [];
  const cats = new Set(bank.categories.map((c) => c.id));
  const ids = new Set<string>();
  const perCategoryText = new Set<string>();
  const wordIds = new Set(bank.words.map((w) => w.id));

  for (const w of bank.words) {
    if (ids.has(w.id)) problems.push(`Duplicate word id ${w.id}`);
    ids.add(w.id);
    if (!w.word || w.word !== w.word.trim()) problems.push(`Bad word text for ${w.id}`);
    if (!cats.has(w.categoryId)) problems.push(`Word ${w.id} has unknown category`);
    if (!DIFFICULTIES.includes(w.difficulty)) problems.push(`Word ${w.id} has invalid difficulty`);
    const key = `${w.pairOnly ? "pair" : w.categoryId}:${slugify(w.word)}`;
    if (perCategoryText.has(key)) problems.push(`Duplicate text in category: ${w.word}`);
    perCategoryText.add(key);
  }
  for (const p of bank.pairs) {
    if (!wordIds.has(p.wordAId) || !wordIds.has(p.wordBId)) problems.push(`Pair ${p.id} references a missing word`);
    if (p.wordAId === p.wordBId) problems.push(`Pair ${p.id} uses the same word twice`);
    if (!DIFFICULTIES.includes(p.difficulty)) problems.push(`Pair ${p.id} has invalid difficulty`);
    if (p.categoryIds.length === 0 || p.categoryIds.some((c) => !cats.has(c))) problems.push(`Pair ${p.id} has invalid categories`);
  }
  for (const c of bank.categories) {
    for (const d of DIFFICULTIES) {
      if (!bank.words.some((w) => !w.pairOnly && w.categoryId === c.id && w.difficulty === d)) {
        problems.push(`Category ${c.id} has no ${d} words`);
      }
    }
  }
  return problems;
}

/** Words that appear (by normalised text) in more than one category. */
export function crossCategoryDuplicates(bank: WordBank): string[] {
  const seen = new Map<string, Set<string>>();
  for (const w of bank.words) {
    if (w.pairOnly) continue;
    const k = slugify(w.word);
    if (!seen.has(k)) seen.set(k, new Set());
    seen.get(k)!.add(w.categoryId);
  }
  return [...seen.entries()].filter(([, s]) => s.size > 1).map(([k]) => k);
}

export interface CoverageRow {
  categoryId: string;
  label: string;
  words: Record<Difficulty, number>;
  pairs: Record<Difficulty, number>;
  totalWords: number;
}

export function coverageReport(bank: WordBank): CoverageRow[] {
  return bank.categories.map((c) => {
    const words = { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>;
    const pairs = { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>;
    for (const w of bank.words) if (!w.pairOnly && w.categoryId === c.id) words[w.difficulty] += 1;
    for (const p of bank.pairs) if (p.categoryIds.includes(c.id)) pairs[p.difficulty] += 1;
    return { categoryId: c.id, label: c.label, words, pairs, totalWords: words.easy + words.medium + words.hard };
  });
}
