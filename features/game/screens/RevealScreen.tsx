"use client";
import { Eye, EyeOff } from "lucide-react";
import type { Round } from "@/types";
import { Button, EndGameButton, Screen } from "@/components/ui";
import { useGame } from "../GameProvider";

export function RevealScreen({ round, index, step }: { round: Round; index: number; step: "handoff" | "revealed" | "hidden" }) {
  const { dispatch } = useGame();
  const player = round.players[index];
  const assignment = round.assignments.find((a) => a.playerId === player.id)!;
  const isLast = index + 1 >= round.players.length;
  const progress = `Player ${index + 1} of ${round.players.length}`;
  const end = <EndGameButton onConfirm={() => dispatch({ type: "goto", screen: "home" })} />;

  if (step === "handoff") {
    return (
      <Screen
        noSelect
        right={end}
        footer={
          <Button onClick={() => dispatch({ type: "revealShow" })} className="w-full">
            <Eye size={18} aria-hidden /> I’m {player.name}. Show my role
          </Button>
        }
      >
        <div className="flex min-h-[60dvh] flex-col justify-center">
          <p className="text-sm text-muted">{progress}</p>
          <p className="mt-6 text-lg text-muted">Pass the phone to</p>
          <h1 className="mt-1 break-words text-5xl font-semibold tracking-tight">{player.name}</h1>
          <p className="mt-6 text-muted">Make sure nobody else can see the screen, then tap below.</p>
        </div>
      </Screen>
    );
  }

  if (step === "revealed") {
    const imposter = assignment.role === "imposter";
    return (
      <Screen
        noSelect
        right={end}
        footer={
          <Button onClick={() => dispatch({ type: "revealHide" })} className="w-full">
            <EyeOff size={18} aria-hidden /> Hide
          </Button>
        }
      >
        <div className="flex min-h-[60dvh] flex-col justify-center" role="status">
          <p className="text-sm text-muted">{player.name}</p>
          {imposter ? (
            <>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-accent">You are the imposter</h1>
              {assignment.word ? (
                <div className="mt-8 rounded-lg border border-line bg-surface p-5">
                  <p className="text-sm text-muted">Your word</p>
                  <p className="mt-1 break-words text-3xl font-semibold">{assignment.word}</p>
                  <p className="mt-3 text-sm text-muted">The others have a similar, but different, word. Work out what it is.</p>
                </div>
              ) : (
                <p className="mt-6 text-lg text-muted">You don’t get a word. Listen to the clues and blend in.</p>
              )}
            </>
          ) : (
            <>
              <p className="mt-4 text-lg text-muted">The secret word is</p>
              <h1 className="mt-1 break-words text-5xl font-semibold tracking-tight">{assignment.word}</h1>
              <p className="mt-6 text-muted">Give clues without making it too obvious.</p>
            </>
          )}
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      noSelect
      right={end}
      footer={
        <>
          <Button onClick={() => dispatch({ type: "revealNext" })} className="w-full">
            {isLast ? "Done. Start discussion" : "Done. Pass the phone on"}
          </Button>
          <Button variant="ghost" onClick={() => dispatch({ type: "revealShow" })} className="w-full">
            <Eye size={18} aria-hidden /> Show again
          </Button>
        </>
      }
    >
      <div className="flex min-h-[60dvh] flex-col justify-center">
        <p className="text-sm text-muted">{progress}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Role hidden</h1>
        <p className="mt-3 text-muted">
          {isLast ? "Everyone has seen their role." : "Tap done, then hand the phone to the next player."}
        </p>
      </div>
    </Screen>
  );
}
