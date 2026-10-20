export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTIES: readonly Difficulty[] = ["easy", "medium", "hard"];

export type CategoryMode = "single" | "mixed" | "all";
export type WordMode = "classic" | "different";
export type TieRule = "revote" | "imposters-win";
export type ThemePref = "system" | "light" | "dark";

export interface Category {
  id: string;
  label: string;
  description?: string;
}

export interface WordEntry {
  id: string;
  word: string;
  categoryId: string;
  difficulty: Difficulty;
  tags?: string[];
  aliases?: string[];
  /** Word exists only as one half of an association pair; never used as a classic-mode secret word. */
  pairOnly?: boolean;
}

/** Two distinct, related words. Used by "different word" mode. */
export interface WordPair {
  id: string;
  wordAId: string;
  wordBId: string;
  categoryIds: string[];
  difficulty: Difficulty;
  tags?: string[];
  /** Kind of association, e.g. "character-actor" (see lib/validation/pairs.ts). */
  relationship?: string;
  /** Why the two words are connected. For content review only; never shown in-game. */
  explanation?: string;
}

export interface WordBank {
  categories: Category[];
  words: WordEntry[];
  pairs: WordPair[];
}

/** Compact authoring format for data/categories/*.ts (see README). */
export interface CategorySource {
  id: string;
  label: string;
  description?: string;
  /** "word|word|word" per difficulty */
  words: Record<Difficulty, string>;
  /** "wordA~wordB|wordC~wordD" per difficulty */
  pairs: Record<Difficulty, string>;
  /**
   * Association pairs, one row per pair: "Word A~Word B|relationship|explanation|tag,tag".
   * Their words are registered as pair-only entries (shared ids: `pair:<slug>`).
   */
  associations?: Partial<Record<Difficulty, string[]>>;
}

/** User-supplied words per difficulty. Entries containing "~" are related pairs. */
export type CustomPack = Record<Difficulty, string[]>;

export interface Player {
  id: string;
  name: string;
}

export interface GameSettings {
  imposterCount: number;
  wordMode: WordMode;
  categoryMode: CategoryMode;
  categoryIds: string[];
  difficulty: Difficulty;
  /** 0 = untimed */
  timerSeconds: number;
  allowSelfVote: boolean;
  tieRule: TieRule;
}

export type Role = "regular" | "imposter";

export interface Assignment {
  playerId: string;
  role: Role;
  /** Word shown to this player; null for classic-mode imposters. */
  word: string | null;
}

export interface Round {
  id: string;
  wordMode: WordMode;
  secretWord: WordEntry;
  imposterWord: WordEntry | null;
  pairId?: string;
  assignments: Assignment[];
  startingPlayerId: string;
  /** Snapshot of players at round start. */
  players: Player[];
}

export interface Vote {
  voterId: string;
  /** null = abstain */
  targetId: string | null;
}

export interface RoundResult {
  winner: "regular" | "imposters";
  reason: string;
  accusedIds: string[];
  counts: Record<string, number>;
  tied: boolean;
  revoted: boolean;
}
