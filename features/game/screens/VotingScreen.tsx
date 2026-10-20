"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import type { Round } from "@/types";
import { Button, EndGameButton, Screen } from "@/components/ui";
import { useGame } from "../GameProvider";
import type { VotingState } from "../state";

export function VotingScreen({ round, v }: { round: Round; v: VotingState }) {
  const { state, dispatch } = useGame();
  // undefined = nothing chosen yet, null = abstain
  const [choice, setChoice] = useState<string | null | undefined>(undefined);
  const voter = round.players[v.voterIndex];
  const progress = `Vote ${v.voterIndex + 1} of ${round.players.length}${v.attempt === 2 ? " · revote" : ""}`;
  const end = <EndGameButton onConfirm={() => dispatch({ type: "goto", screen: "home" })} />;

  if (v.step === "handoff") {
    return (
      <Screen
        noSelect
        right={end}
        footer={
          <Button onClick={() => dispatch({ type: "voterReady" })} className="w-full">
            I’m {voter.name}. Cast my vote
          </Button>
        }
      >
        <div className="flex min-h-[60dvh] flex-col justify-center">
          <p className="text-sm text-muted">{progress}</p>
          {v.notice && <p className="mt-4 rounded-lg border border-line bg-surface p-3 text-sm">{v.notice}</p>}
          <p className="mt-6 text-lg text-muted">Pass the phone to</p>
          <h1 className="mt-1 break-words text-5xl font-semibold tracking-tight">{voter.name}</h1>
          <p className="mt-6 text-muted">Votes stay hidden until the reveal, so keep the screen to yourself.</p>
        </div>
      </Screen>
    );
  }

  const candidates = v.candidateIds
    .filter((id) => state.settings.allowSelfVote || id !== voter.id)
    .map((id) => round.players.find((p) => p.id === id)!)
    .filter(Boolean);
  const chosenName = choice ? round.players.find((p) => p.id === choice)?.name : null;
  const row = (selected: boolean) =>
    `flex min-h-12 w-full items-center justify-between rounded-lg border px-4 text-left text-base transition-colors ${
      selected ? "border-accent bg-subtle font-medium" : "border-line bg-surface hover:bg-subtle"
    }`;

  return (
    <Screen
      noSelect
      title={voter.name}
      right={end}
      footer={
        <>
          <p className="text-center text-sm text-muted" aria-live="polite">
            {choice === undefined ? "Choose a player, or skip." : choice === null ? "You’ll skip this vote." : `You’re voting for ${chosenName}.`}
          </p>
          <Button onClick={() => dispatch({ type: "castVote", targetId: choice ?? null })} disabled={choice === undefined} className="w-full">
            Confirm vote
          </Button>
        </>
      }
    >
      <p className="text-sm text-muted">{progress}</p>
      <h2 className="mb-4 mt-1 text-2xl font-semibold tracking-tight">Who is the imposter?</h2>
      <div role="radiogroup" aria-label="Suspect" className="space-y-2">
        {candidates.map((p) => (
          <button key={p.id} type="button" role="radio" aria-checked={choice === p.id} onClick={() => setChoice(p.id)} className={row(choice === p.id)}>
            <span className="break-words">{p.name}</span>
            {choice === p.id && <Check size={18} className="text-accent" aria-hidden />}
          </button>
        ))}
        <button type="button" role="radio" aria-checked={choice === null} onClick={() => setChoice(null)} className={`${row(choice === null)} text-muted`}>
          <span>Skip (abstain)</span>
          {choice === null && <Check size={18} className="text-accent" aria-hidden />}
        </button>
      </div>
    </Screen>
  );
}
