import type { Category, CategorySource, CustomPack, Difficulty, WordBank, WordEntry, WordPair } from "@/types";
import { DIFFICULTIES } from "@/types";

export const CUSTOM_CATEGORY_ID = "custom";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const splitList = (s: string | undefined): string[] =>
  (s ?? "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);

export interface BuildResult {
  bank: WordBank;
  warnings: string[];
}

/**
 * Turns compact category sources into a typed word bank.
 * - Word ids are `${categoryId}:${slug}`; exact duplicates inside a category are dropped with a warning.
 * - Pair words are registered in the bank automatically (at the pair's difficulty) if not already present.
 */
export function buildBank(sources: readonly CategorySource[]): BuildResult {
  const categories: Category[] = [];
  const words: WordEntry[] = [];
  const pairs: WordPair[] = [];
  const warnings: string[] = [];
  const byId = new Map<string, WordEntry>();
  const pairIds = new Set<string>();

  const addWord = (categoryId: string, word: string, difficulty: Difficulty): WordEntry => {
    const id = `${categoryId}:${slugify(word)}`;
    const existing = byId.get(id);
    if (existing) return existing;
    const entry: WordEntry = { id, word, categoryId, difficulty };
    byId.set(id, entry);
    words.push(entry);
    return entry;
  };

  for (const src of sources) {
    categories.push({ id: src.id, label: src.label, description: src.description });
    for (const d of DIFFICULTIES) {
      for (const w of splitList(src.words[d])) {
        if (byId.has(`${src.id}:${slugify(w)}`)) {
          warnings.push(`Duplicate word "${w}" in category ${src.id}`);
          continue;
        }
        addWord(src.id, w, d);
      }
    }
    for (const d of DIFFICULTIES) {
      for (const raw of splitList(src.pairs[d])) {
        const [a, b] = raw.split("~").map((x) => x.trim());
        if (!a || !b || slugify(a) === slugify(b)) {
          warnings.push(`Invalid pair "${raw}" in category ${src.id}`);
          continue;
        }
        const wa = addWord(src.id, a, d);
        const wb = addWord(src.id, b, d);
        const id = `${src.id}:${slugify(a)}--${slugify(b)}`;
        const reverse = `${src.id}:${slugify(b)}--${slugify(a)}`;
        if (pairIds.has(id) || pairIds.has(reverse)) {
          warnings.push(`Duplicate pair "${raw}" in category ${src.id}`);
          continue;
        }
        pairIds.add(id);
        pairs.push({ id, wordAId: wa.id, wordBId: wb.id, categoryIds: [src.id], difficulty: d });
      }
    }
  }

  // Association pairs (pair-only words use category-independent ids so recency tracking works across categories).
  const pairKeys = new Set(pairs.map((p) => [p.wordAId, p.wordBId].sort().join("|")));
  const assocKeys = new Set<string>();
  const addPairWord = (categoryId: string, word: string, difficulty: Difficulty): WordEntry => {
    const id = `pair:${slugify(word)}`;
    const existing = byId.get(id);
    if (existing) return existing;
    const entry: WordEntry = { id, word, categoryId, difficulty, pairOnly: true };
    byId.set(id, entry);
    words.push(entry);
    return entry;
  };
  for (const src of sources) {
    for (const d of DIFFICULTIES) {
      for (const row of src.associations?.[d] ?? []) {
        const [pairPart, relationship, explanation, tagStr] = row.split("|").map((x) => x.trim());
        const [a, b] = (pairPart ?? "").split("~").map((x) => x.trim());
        if (!a || !b || slugify(a) === slugify(b)) {
          warnings.push(`Invalid association "${row}" in category ${src.id}`);
          continue;
        }
        const key = [slugify(a), slugify(b)].sort().join("|");
        if (assocKeys.has(key)) {
          warnings.push(`Duplicate association "${a}~${b}" in category ${src.id}`);
          continue;
        }
        assocKeys.add(key);
        const wa = addPairWord(src.id, a, d);
        const wb = addPairWord(src.id, b, d);
        void pairKeys;
        pairs.push({
          id: `${src.id}:${slugify(a)}--${slugify(b)}`,
          wordAId: wa.id,
          wordBId: wb.id,
          categoryIds: [src.id],
          difficulty: d,
          relationship,
          explanation,
          tags: tagStr ? tagStr.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
        });
      }
    }
  }
  return { bank: { categories, words, pairs }, warnings };
}

export function customPackToSource(pack: CustomPack): CategorySource | null {
  const total = DIFFICULTIES.reduce((n, d) => n + pack[d].length, 0);
  if (total === 0) return null;
  const words = {} as Record<Difficulty, string>;
  const pairs = {} as Record<Difficulty, string>;
  for (const d of DIFFICULTIES) {
    words[d] = pack[d].filter((e) => !e.includes("~")).join("|");
    pairs[d] = pack[d].filter((e) => e.includes("~")).join("|");
  }
  return { id: CUSTOM_CATEGORY_ID, label: "Custom", description: "Your own words.", words, pairs };
}

export const emptyCustomPack = (): CustomPack => ({ easy: [], medium: [], hard: [] });
