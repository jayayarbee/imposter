import type { Assignment, GameSettings, Player, Round, WordBank, WordEntry } from "@/types";
import { validateConfig, type ConfigIssue } from "@/lib/validation/config";
import { dedupePairs, dedupeWords, filterPairs, filterWords } from "./select";
import type { WordPair } from "@/types";
import { pickOne, secureRng, shuffle, type Rng } from "./random";

export type CreateRoundResult = { ok: true; round: Round } | { ok: false; issues: ConfigIssue[] };

export interface CreateRoundOptions {
  rng?: Rng;
  /** Word/pair ids used in recent rounds, MOST RECENT FIRST; avoided while alternatives exist. */
  recentWordIds?: readonly string[];
}

/** Picks `count` distinct imposters uniformly at random. */
export function pickImposterIds(players: readonly Player[], count: number, rng: Rng = secureRng): string[] {
  return shuffle(players.map((p) => p.id), rng).slice(0, count);
}

/**
 * Drops recently used items from the pool, most recent first, but never so many that the pool
 * becomes empty. (Previously a history longer than the pool disabled avoidance entirely, which
 * allowed the very last word to repeat.)
 */
export function freshPool<T>(pool: readonly T[], keysOf: (t: T) => string[], recent: readonly string[]): T[] {
  let avoid = new Set<string>();
  for (const id of recent) {
    const next = new Set(avoid).add(id);
    if (pool.some((t) => !keysOf(t).some((k) => next.has(k)))) avoid = next;
  }
  const out = pool.filter((t) => !keysOf(t).some((k) => avoid.has(k)));
  return out.length ? out : [...pool];
}

const fail = (message: string): CreateRoundResult => ({ ok: false, issues: [{ code: "no-eligible-words", message }] });

/**
 * Validates the config, selects the word (or related pair) and distributes private roles.
 * Pure: all randomness comes from `rng`.
 *
 * Multiple imposters in "different word" mode all receive the same alternate word.
 */
export function createRound(
  bank: WordBank,
  players: readonly Player[],
  settings: GameSettings,
  opts: CreateRoundOptions = {},
): CreateRoundResult {
  const rng = opts.rng ?? secureRng;
  const recent = opts.recentWordIds ?? [];
  const check = validateConfig(players, settings, bank);
  if (!check.ok) return { ok: false, issues: check.issues };

  let secret: WordEntry;
  let alternate: WordEntry | null = null;
  let pairId: string | undefined;

  if (settings.wordMode === "classic") {
    const pool = dedupeWords(filterWords(bank, settings));
    const w = pickOne(freshPool(pool, (x) => [x.id], recent), rng);
    if (!w) return fail("No eligible words are available for these settings.");
    secret = w;
  } else {
    const byId = new Map(bank.words.map((w) => [w.id, w]));
    const pool = dedupePairs(filterPairs(bank, settings));
    const pair: WordPair | undefined = pickOne(freshPool(pool, (p) => [p.id, p.wordAId, p.wordBId], recent), rng);
    const a = pair && byId.get(pair.wordAId);
    const b = pair && byId.get(pair.wordBId);
    if (!pair || !a || !b) return fail("No related word pairs are available for these settings.");
    const flip = rng() < 0.5;
    secret = flip ? b : a;
    alternate = flip ? a : b;
    pairId = pair.id;
  }

  const imposters = new Set(pickImposterIds(players, settings.imposterCount, rng));
  const assignments: Assignment[] = players.map((p) =>
    imposters.has(p.id)
      ? { playerId: p.id, role: "imposter", word: alternate ? alternate.word : null }
      : { playerId: p.id, role: "regular", word: secret.word },
  );
  const starter = pickOne(players, rng)!;

  return {
    ok: true,
    round: {
      id: `r-${Math.floor(rng() * 2 ** 32).toString(36)}`,
      wordMode: settings.wordMode,
      secretWord: secret,
      imposterWord: alternate,
      pairId,
      assignments,
      startingPlayerId: starter.id,
      players: players.map((p) => ({ ...p })),
    },
  };
}

/** Ids to remember after a round: its words and (separately) its pair. */
export const roundWordIds = (r: Round): string[] => [
  ...(r.pairId ? [r.pairId] : []),
  r.secretWord.id,
  ...(r.imposterWord ? [r.imposterWord.id] : []),
];

/** Fresh round that keeps players + settings but never reuses the previous assignments or word. */
export function createNextRound(
  bank: WordBank,
  players: readonly Player[],
  settings: GameSettings,
  previous: readonly string[],
  opts: Omit<CreateRoundOptions, "recentWordIds"> = {},
): CreateRoundResult {
  return createRound(bank, players, settings, { ...opts, recentWordIds: previous });
}
