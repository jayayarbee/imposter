import type { GameSettings, Player, WordBank } from "@/types";
import { DIFFICULTIES } from "@/types";
import { eligibleCategoryIds, filterPairs, filterWords } from "@/lib/game/select";

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;
export const MAX_NAME_LENGTH = 20;

export interface ConfigIssue {
  code: string;
  message: string;
  field?: "players" | "imposters" | "categories" | "difficulty" | "wordMode" | "timer";
}

/** Imposters must stay a strict minority: players 3–4 → 1, 5–6 → 2, 7–8 → 3 … */
export function maxImposters(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

export const normalizeName = (name: string): string => name.trim().replace(/\s+/g, " ");

export function validatePlayerName(name: string, players: readonly Player[], ignoreId?: string): string | null {
  const n = normalizeName(name);
  if (!n) return "Enter a name.";
  if (n.length > MAX_NAME_LENGTH) return `Keep names under ${MAX_NAME_LENGTH + 1} characters.`;
  const clash = players.some((p) => p.id !== ignoreId && p.name.toLowerCase() === n.toLowerCase());
  return clash ? `"${n}" is already in the game. Use a different name.` : null;
}

export function validateConfig(
  players: readonly Player[],
  settings: GameSettings,
  bank: WordBank,
): { ok: boolean; issues: ConfigIssue[] } {
  const issues: ConfigIssue[] = [];
  const n = players.length;

  if (n < MIN_PLAYERS) {
    issues.push({ code: "too-few-players", field: "players", message: `Add at least ${MIN_PLAYERS} players (you have ${n}).` });
  }
  if (n > MAX_PLAYERS) {
    issues.push({ code: "too-many-players", field: "players", message: `At most ${MAX_PLAYERS} players are supported.` });
  }
  const names = new Set<string>();
  for (const p of players) {
    const key = normalizeName(p.name).toLowerCase();
    if (!key) issues.push({ code: "blank-name", field: "players", message: "Every player needs a name." });
    else if (names.has(key)) issues.push({ code: "duplicate-name", field: "players", message: `Two players are named "${p.name}".` });
    names.add(key);
  }

  if (!Number.isInteger(settings.imposterCount) || settings.imposterCount < 1) {
    issues.push({ code: "imposters-min", field: "imposters", message: "There must be at least 1 imposter." });
  } else if (n >= MIN_PLAYERS && settings.imposterCount > maxImposters(n)) {
    issues.push({
      code: "imposters-max",
      field: "imposters",
      message: `${n} players can have at most ${maxImposters(n)} imposter${maxImposters(n) === 1 ? "" : "s"}.`,
    });
  }

  if (!DIFFICULTIES.includes(settings.difficulty)) {
    issues.push({ code: "bad-difficulty", field: "difficulty", message: "Choose a difficulty." });
  }
  if (!Number.isInteger(settings.timerSeconds) || settings.timerSeconds < 0 || settings.timerSeconds > 3600) {
    issues.push({ code: "bad-timer", field: "timer", message: "Timer must be between 0 and 60 minutes." });
  }

  let categoriesOk = true;
  const known = new Set(bank.categories.map((c) => c.id));
  if (settings.categoryMode === "single") {
    if (settings.categoryIds.length !== 1) {
      categoriesOk = false;
      issues.push({ code: "single-needs-one", field: "categories", message: "Choose exactly one category." });
    }
  } else if (settings.categoryMode === "mixed") {
    if (settings.categoryIds.length < 2) {
      categoriesOk = false;
      issues.push({ code: "mixed-needs-two", field: "categories", message: "Choose at least two categories to mix." });
    }
  }
  if (settings.categoryMode !== "all" && settings.categoryIds.some((id) => !known.has(id))) {
    categoriesOk = false;
    issues.push({ code: "unknown-category", field: "categories", message: "A selected category no longer exists. Please reselect." });
  }

  if (categoriesOk && DIFFICULTIES.includes(settings.difficulty)) {
    const ids = eligibleCategoryIds(bank, settings);
    const label = ids.map((id) => bank.categories.find((c) => c.id === id)?.label ?? id).join(", ");
    const scope = settings.categoryMode === "all" ? "any category" : label;
    if (filterWords(bank, settings).length === 0) {
      issues.push({
        code: "empty-pool",
        field: "categories",
        message: `There are no ${settings.difficulty} words for ${scope}. Try another difficulty or category.`,
      });
    } else if (settings.wordMode === "different" && filterPairs(bank, settings).length === 0) {
      issues.push({
        code: "no-pairs",
        field: "wordMode",
        message: `There are no related word pairs at ${settings.difficulty} difficulty for ${scope}. Choose another category or difficulty, or switch to Classic.`,
      });
    }
  }

  return { ok: issues.length === 0, issues };
}
