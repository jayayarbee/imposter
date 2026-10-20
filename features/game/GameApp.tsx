"use client";
import { GameProvider, useGame } from "./GameProvider";
import { useNavigationGuard } from "./useNavigationGuard";
import { HomeScreen } from "./screens/HomeScreen";
import { HowToPlayScreen } from "./screens/HowToPlayScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { SetupScreen } from "./screens/SetupScreen";
import { RevealScreen } from "./screens/RevealScreen";
import { DiscussionScreen } from "./screens/DiscussionScreen";
import { VotingScreen } from "./screens/VotingScreen";
import { ResultsScreen } from "./screens/ResultsScreen";

function Router() {
  const { state } = useGame();
  const s = state.screen;
  useNavigationGuard(s.name === "reveal" || s.name === "discussion" || s.name === "voting");

  switch (s.name) {
    case "home":
      return <HomeScreen />;
    case "how":
      return <HowToPlayScreen />;
    case "settings":
      return <SettingsScreen />;
    case "setup":
      return <SetupScreen />;
    case "reveal":
      // key forces a fresh component per player so no state leaks between players
      return <RevealScreen key={`${s.round.id}-${s.index}`} round={s.round} index={s.index} step={s.step} />;
    case "discussion":
      return <DiscussionScreen round={s.round} />;
    case "voting":
      return <VotingScreen key={`${s.v.attempt}-${s.v.voterIndex}-${s.v.step}`} round={s.round} v={s.v} />;
    case "results":
      return <ResultsScreen round={s.round} result={s.result} />;
  }
}

export function GameApp() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
