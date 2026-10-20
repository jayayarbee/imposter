"use client";
import { BookOpen, Settings, VenetianMask } from "lucide-react";
import { Button, Screen } from "@/components/ui";
import { APP_CONFIG } from "@/lib/config";
import { useGame } from "../GameProvider";

export function HomeScreen() {
  const { dispatch } = useGame();
  return (
    <Screen
      footer={
        <>
          <Button onClick={() => dispatch({ type: "goto", screen: "setup" })} className="w-full">
            New Game
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "open", screen: "how" })} className="w-full">
            <BookOpen size={18} aria-hidden /> How to Play
          </Button>
          <Button variant="ghost" onClick={() => dispatch({ type: "open", screen: "settings" })} className="w-full">
            <Settings size={18} aria-hidden /> Settings
          </Button>
        </>
      }
    >
      <div className="flex min-h-[55dvh] flex-col justify-center">
        <VenetianMask size={36} className="mb-6 text-accent" aria-hidden />
        <h1 className="text-5xl font-semibold tracking-tight">{APP_CONFIG.name}</h1>
        <p className="mt-4 text-lg text-muted">{APP_CONFIG.tagline}</p>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Everyone secretly learns the same word, except the imposter. Talk, give clues, and vote out the one who doesn’t belong. Play on a single
          phone, passed around the group.
        </p>
      </div>
    </Screen>
  );
}
