import type { CustomPack, Difficulty, GameSettings, Player, Round, RoundResult, ThemePref, Vote } from "@/types";
import { DIFFICULTIES } from "@/types";
import { roundWordIds } from "@/lib/game/engine";
import { finishRound, resolveVotes, tallyVotes, validateVote } from "@/lib/game/voting";
import { emptyCustomPack } from "@/lib/game/bank";
import { MAX_PLAYERS, maxImposters, normalizeName, validatePlayerName } from "@/lib/validation/config";
import { uid } from "@/lib/game/random";

export const DEFAULT_SETTINGS: GameSettings = {
  imposterCount: 1,
  wordMode: "classic",
  categoryMode: "all",
  categoryIds: [],
  difficulty: "easy",
  timerSeconds: 180,
  allowSelfVote: false,
  tieRule: "revote",
};

export interface VotingState {
  candidateIds: string[];
  lockedIds: string[];
  slots: number;
  voterIndex: number;
  votes: Vote[];
  attempt: 1 | 2;
  step: "handoff" | "choose";
  notice?: string;
  priorCounts: Record<string, number>;
}

export type Screen =
  | { name: "home" }
  | { name: "setup" }
  | { name: "how"; from: "home" | "setup" }
  | { name: "settings"; from: "home" | "setup" }
  | { name: "reveal"; round: Round; index: number; step: "handoff" | "revealed" | "hidden" }
  | { name: "discussion"; round: Round }
  | { name: "voting"; round: Round; v: VotingState }
  | { name: "results"; round: Round; result: RoundResult };

export interface Persisted {
  players: Player[];
  settings: GameSettings;
  custom: CustomPack;
  theme: ThemePref;
}

export interface GameState extends Persisted {
  recentWordIds: string[];
  screen: Screen;
  hydrated: boolean;
}

export type Action =
  | { type: "hydrate"; saved: Partial<Record<keyof Persisted, unknown>> }
  | { type: "goto"; screen: "home" | "setup" }
  | { type: "open"; screen: "how" | "settings" }
  | { type: "closeOverlay" }
  | { type: "addPlayer"; name: string }
  | { type: "renamePlayer"; id: string; name: string }
  | { type: "removePlayer"; id: string }
  | { type: "settings"; patch: Partial<GameSettings> }
  | { type: "setCustom"; custom: CustomPack }
  | { type: "setTheme"; theme: ThemePref }
  | { type: "startRound"; round: Round }
  | { type: "revealShow" }
  | { type: "revealHide" }
  | { type: "revealNext" }
  | { type: "toVoting" }
  | { type: "voterReady" }
  | { type: "castVote"; targetId: string | null };

export const createInitialState = (): GameState => ({
  players: [],
  settings: DEFAULT_SETTINGS,
  custom: emptyCustomPack(),
  theme: "system",
  recentWordIds: [],
  screen: { name: "home" },
  hydrated: false,
});

const clampImposters = (s: GameSettings, playerCount: number): GameSettings => {
  const max = maxImposters(playerCount);
  return s.imposterCount > max ? { ...s, imposterCount: max } : s;
};

const oneOf = <T extends string>(v: unknown, allowed: readonly T[], fallback: T): T =>
  typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;

export function sanitizeSettings(raw: unknown): GameSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_SETTINGS;
  const int = (v: unknown, fb: number, min: number, max: number) =>
    typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : fb;
  return {
    imposterCount: int(r.imposterCount, d.imposterCount, 1, 9),
    wordMode: oneOf(r.wordMode, ["classic", "different"], d.wordMode),
    categoryMode: oneOf(r.categoryMode, ["single", "mixed", "all"], d.categoryMode),
    categoryIds: Array.isArray(r.categoryIds) ? r.categoryIds.filter((x): x is string => typeof x === "string").slice(0, 40) : [],
    difficulty: oneOf(r.difficulty, DIFFICULTIES as readonly Difficulty[], d.difficulty),
    timerSeconds: int(r.timerSeconds, d.timerSeconds, 0, 3600),
    allowSelfVote: typeof r.allowSelfVote === "boolean" ? r.allowSelfVote : d.allowSelfVote,
    tieRule: oneOf(r.tieRule, ["revote", "imposters-win"], d.tieRule),
  };
}

function sanitizeCustom(raw: unknown): CustomPack {
  const out = emptyCustomPack();
  if (raw && typeof raw === "object") {
    for (const d of DIFFICULTIES) {
      const v = (raw as Record<string, unknown>)[d];
      if (Array.isArray(v)) out[d] = v.filter((x): x is string => typeof x === "string").slice(0, 300);
    }
  }
  return out;
}

function sanitizePlayers(raw: unknown): Player[] {
  if (!Array.isArray(raw)) return [];
  const out: Player[] = [];
  for (const p of raw.slice(0, MAX_PLAYERS)) {
    if (p && typeof p === "object" && typeof (p as Player).id === "string" && typeof (p as Player).name === "string") {
      const name = normalizeName((p as Player).name);
      if (name && !validatePlayerName(name, out)) out.push({ id: (p as Player).id, name });
    }
  }
  return out;
}

function newVoting(round: Round): VotingState {
  return {
    candidateIds: round.players.map((p) => p.id),
    lockedIds: [],
    slots: round.assignments.filter((a) => a.role === "imposter").length,
    voterIndex: 0,
    votes: [],
    attempt: 1,
    step: "handoff",
    priorCounts: {},
  };
}

function resolveVoting(state: GameState, round: Round, v: VotingState, votes: Vote[]): GameState {
  const counts = tallyVotes(votes, v.candidateIds);
  const merged = { ...v.priorCounts, ...counts };
  const outcome = resolveVotes(counts, v.candidateIds, v.slots);
  const nameOf = (id: string) => round.players.find((p) => p.id === id)?.name ?? "?";

  if (outcome.kind === "decided") {
    const accused = [...v.lockedIds, ...outcome.accusedIds];
    const result = finishRound(round, accused, merged, { revoted: v.attempt === 2 });
    return { ...state, screen: { name: "results", round, result } };
  }
  if (state.settings.tieRule === "revote" && v.attempt === 1) {
    return {
      ...state,
      screen: {
        name: "voting",
        round,
        v: {
          candidateIds: outcome.tiedIds,
          lockedIds: [...v.lockedIds, ...outcome.lockedIds],
          slots: outcome.slots,
          voterIndex: 0,
          votes: [],
          attempt: 2,
          step: "handoff",
          priorCounts: merged,
          notice: `Tie between ${outcome.tiedIds.map(nameOf).join(", ")}. Everyone votes again, tied players only.`,
        },
      },
    };
  }
  const result = finishRound(round, [], merged, { tied: true, tiedIds: outcome.tiedIds, revoted: v.attempt === 2 });
  return { ...state, screen: { name: "results", round, result } };
}

export function reducer(state: GameState, action: Action): GameState {
  const s = state.screen;
  switch (action.type) {
    case "hydrate": {
      const players = sanitizePlayers(action.saved.players);
      const settings = clampImposters(sanitizeSettings(action.saved.settings), players.length);
      return {
        ...state,
        players,
        settings,
        custom: sanitizeCustom(action.saved.custom),
        theme: oneOf(action.saved.theme, ["system", "light", "dark"], "system"),
        hydrated: true,
      };
    }
    case "goto":
      return { ...state, screen: { name: action.screen } };
    case "open":
      return { ...state, screen: { name: action.screen, from: s.name === "setup" ? "setup" : "home" } };
    case "closeOverlay":
      return s.name === "how" || s.name === "settings" ? { ...state, screen: { name: s.from } } : state;
    case "addPlayer": {
      if (state.players.length >= MAX_PLAYERS || validatePlayerName(action.name, state.players)) return state;
      const players = [...state.players, { id: uid("p"), name: normalizeName(action.name) }];
      return { ...state, players };
    }
    case "renamePlayer": {
      if (validatePlayerName(action.name, state.players, action.id)) return state;
      return { ...state, players: state.players.map((p) => (p.id === action.id ? { ...p, name: normalizeName(action.name) } : p)) };
    }
    case "removePlayer": {
      const players = state.players.filter((p) => p.id !== action.id);
      return { ...state, players, settings: clampImposters(state.settings, players.length) };
    }
    case "settings":
      return { ...state, settings: clampImposters({ ...state.settings, ...action.patch }, state.players.length) };
    case "setCustom":
      return { ...state, custom: action.custom };
    case "setTheme":
      return { ...state, theme: action.theme };
    case "startRound":
      return {
        ...state,
        recentWordIds: [...roundWordIds(action.round), ...state.recentWordIds].slice(0, 90),
        screen: { name: "reveal", round: action.round, index: 0, step: "handoff" },
      };
    case "revealShow":
      return s.name === "reveal" && s.step !== "revealed" ? { ...state, screen: { ...s, step: "revealed" } } : state;
    case "revealHide":
      return s.name === "reveal" && s.step === "revealed" ? { ...state, screen: { ...s, step: "hidden" } } : state;
    case "revealNext": {
      // Only possible after the current player has viewed AND hidden their role.
      if (s.name !== "reveal" || s.step !== "hidden") return state;
      if (s.index + 1 >= s.round.players.length) return { ...state, screen: { name: "discussion", round: s.round } };
      return { ...state, screen: { ...s, index: s.index + 1, step: "handoff" } };
    }
    case "toVoting":
      return s.name === "discussion" ? { ...state, screen: { name: "voting", round: s.round, v: newVoting(s.round) } } : state;
    case "voterReady":
      return s.name === "voting" && s.v.step === "handoff" ? { ...state, screen: { ...s, v: { ...s.v, step: "choose" } } } : state;
    case "castVote": {
      if (s.name !== "voting" || s.v.step !== "choose") return state;
      const voter = s.round.players[s.v.voterIndex];
      if (validateVote(voter.id, action.targetId, s.v.candidateIds, state.settings)) return state;
      const votes = [...s.v.votes, { voterId: voter.id, targetId: action.targetId }];
      if (s.v.voterIndex + 1 < s.round.players.length) {
        return { ...state, screen: { ...s, v: { ...s.v, votes, voterIndex: s.v.voterIndex + 1, step: "handoff", notice: undefined } } };
      }
      return resolveVoting(state, s.round, s.v, votes);
    }
    default:
      return state;
  }
}
