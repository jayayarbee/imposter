import type { WordBank } from "@/types";
import { slugify } from "@/lib/game/bank";

/** Allowed relationship types for association pairs. Add new ones here when research reveals a new pattern. */
export const RELATIONSHIP_TYPES = [
  "character-actor", "actor-role", "film-prop", "film-scene", "film-character", "film-location", "film-music", "film-director",
  "film-dialogue", "film-fact", "brand-slogan", "brand-mascot", "brand-product", "brand-feature",
  "food-texture", "food-method", "food-context", "food-origin", "object-use", "object-sound", "object-setting",
  "nature-consequence", "nature-mechanism", "nature-location", "animal-trait",
  "tech-feature", "tech-error", "tech-behaviour", "person-event", "person-achievement", "person-signature",
  "place-landmark", "place-feature", "place-culture", "wordplay", "job-tool", "job-task", "job-workplace",
  "school-experience", "transport-feature", "transport-route", "music-song", "music-instrument", "music-signature",
  "game-mechanic", "game-character", "fashion-feature", "fashion-brand", "sport-equipment", "sport-term", "sport-event",
  "daily-habit", "daily-context", "character-trait", "game-lore",
] as const;

const REL = new Set<string>(RELATIONSHIP_TYPES);
const norm = (s: string) => slugify(s);

export interface PairFinding {
  pairId: string;
  problem: string;
}

/** Quality checks specific to association pairs. Returns hard errors and softer review flags. */
export function checkPairs(bank: WordBank): { errors: PairFinding[]; flags: PairFinding[] } {
  const errors: PairFinding[] = [];
  const flags: PairFinding[] = [];
  const byId = new Map(bank.words.map((w) => [w.id, w]));
  const seen = new Map<string, string>();
  for (const p of bank.pairs) {
    const a = byId.get(p.wordAId);
    const b = byId.get(p.wordBId);
    if (!a || !b) {
      errors.push({ pairId: p.id, problem: "missing word" });
      continue;
    }
    const key = [p.wordAId, p.wordBId].sort().join("|");
    if (seen.has(key)) errors.push({ pairId: p.id, problem: `duplicate of ${seen.get(key)} (possibly reversed)` });
    seen.set(key, p.id);
    if (!p.relationship || !REL.has(p.relationship)) {
      if (p.explanation !== undefined || p.relationship !== undefined) errors.push({ pairId: p.id, problem: `unknown relationship "${p.relationship}"` });
      continue; // legacy sibling pairs carry no metadata
    }
    if (!p.explanation || p.explanation.length < 15) errors.push({ pairId: p.id, problem: "explanation missing or too short" });
    if (a.word.length > 40 || b.word.length > 40) errors.push({ pairId: p.id, problem: "word too long" });
    if (p.tags?.some((t) => !/^[a-z0-9-]+$/.test(t))) errors.push({ pairId: p.id, problem: "malformed tag" });
    const na = norm(a.word), nb = norm(b.word);
    if (na.includes(nb) || nb.includes(na)) flags.push({ pairId: p.id, problem: "one word contains the other (possible near-synonym or alias)" });
  }
  return { errors, flags };
}

/** How many pairs each word appears in. High counts mean the same concept dominates the bank. */
export function wordReuse(bank: WordBank): { word: string; pairs: number }[] {
  const byId = new Map(bank.words.map((w) => [w.id, w.word]));
  const n = new Map<string, number>();
  for (const p of bank.pairs) for (const id of [p.wordAId, p.wordBId]) n.set(id, (n.get(id) ?? 0) + 1);
  return [...n.entries()].map(([id, pairs]) => ({ word: byId.get(id) ?? id, pairs })).sort((x, y) => y.pairs - x.pairs);
}
