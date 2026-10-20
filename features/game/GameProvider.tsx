"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { WordBank } from "@/types";
import { APP_CONFIG } from "@/lib/config";
import { getBank } from "@/data";
import { createNextRound, createRound } from "@/lib/game/engine";
import type { ConfigIssue } from "@/lib/validation/config";
import { createInitialState, reducer, type Action, type GameState } from "./state";

interface Ctx {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  bank: WordBank;
  startErrors: ConfigIssue[];
  startGame: () => void;
  playAgain: () => void;
}

const GameContext = createContext<Ctx | null>(null);

export function useGame(): Ctx {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [startErrors, setStartErrors] = useState<ConfigIssue[]>([]);
  const bank = useMemo(() => getBank(state.custom), [state.custom]);

  // Load non-sensitive preferences once on the client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(APP_CONFIG.storageKey);
      dispatch({ type: "hydrate", saved: raw ? JSON.parse(raw) : {} });
    } catch {
      dispatch({ type: "hydrate", saved: {} });
    }
  }, []);

  // Persist preferences only (players, settings, custom words, theme). Never the active round.
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      const { players, settings, custom, theme } = state;
      localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify({ players, settings, custom, theme }));
    } catch {
      /* storage unavailable (private mode etc.): ignore */
    }
  }, [state.hydrated, state.players, state.settings, state.custom, state.theme]); // eslint-disable-line react-hooks/exhaustive-deps

  // Theme
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.theme = state.theme === "system" ? (mq.matches ? "dark" : "light") : state.theme;
    };
    apply();
    if (state.theme !== "system") return;
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [state.theme]);

  // Drop selected categories that no longer exist (e.g. custom words removed).
  useEffect(() => {
    const known = new Set(bank.categories.map((c) => c.id));
    const kept = state.settings.categoryIds.filter((id) => known.has(id));
    if (kept.length !== state.settings.categoryIds.length) dispatch({ type: "settings", patch: { categoryIds: kept } });
  }, [bank, state.settings.categoryIds]);

  const startGame = useCallback(() => {
    const res = createRound(bank, state.players, state.settings, { recentWordIds: state.recentWordIds });
    if (res.ok) {
      setStartErrors([]);
      dispatch({ type: "startRound", round: res.round });
    } else {
      setStartErrors(res.issues);
    }
  }, [bank, state.players, state.settings, state.recentWordIds]);

  const playAgain = useCallback(() => {
    const res = createNextRound(bank, state.players, state.settings, state.recentWordIds);
    if (res.ok) {
      setStartErrors([]);
      dispatch({ type: "startRound", round: res.round });
    } else {
      setStartErrors(res.issues);
      dispatch({ type: "goto", screen: "setup" });
    }
  }, [bank, state.players, state.settings, state.recentWordIds]);

  const value = useMemo(() => ({ state, dispatch, bank, startErrors, startGame, playAgain }), [state, bank, startErrors, startGame, playAgain]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
