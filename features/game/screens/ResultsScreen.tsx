"use client";
import { Trophy } from "lucide-react";
import type { Round, RoundResult } from "@/types";
import { Button, Screen } from "@/components/ui";
import { useGame } from "../GameProvider";

export function ResultsScreen({ round, result }: { round: Round; result: RoundResult }) {
  const { dispatch, playAgain } = useGame();
  const regular = result.winner === "regular";
  const rows = round.players.map((p) => ({
    player: p,
    a: round.assignments.find((x) => x.playerId === p.id)!,
    votes: result.counts[p.id],
    accused: result.accusedIds.includes(p.id),
  }));

  return (
    <Screen
      title="Results"
      footer={
        <>
          <Button onClick={playAgain} className="w-full">
            Play again
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "goto", screen: "home" })} className="w-full">
            Back to home
          </Button>
          <Button variant="ghost" onClick={() => dispatch({ type: "goto", screen: "setup" })} className="w-full">
            Change players or settings
          </Button>
        </>
      }
    >
      <div className="rounded-lg border border-line bg-surface p-5">
        <div className="flex items-center gap-2 text-accent">
          <Trophy size={20} aria-hidden />
          <h2 className="text-xl font-semibold">{regular ? "Regular players win" : "Imposters win"}</h2>
        </div>
        <p className="mt-2 text-muted">{result.reason}</p>
        {result.revoted && <p className="mt-2 text-sm text-muted">Decided after a revote.</p>}
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-3">
        <div className="rounded-lg border border-line p-4">
          <dt className="text-sm text-muted">The secret word</dt>
          <dd className="text-2xl font-semibold">{round.secretWord.word}</dd>
        </div>
        {round.imposterWord && (
          <div className="rounded-lg border border-line p-4">
            <dt className="text-sm text-muted">The imposter’s word</dt>
            <dd className="text-2xl font-semibold">{round.imposterWord.word}</dd>
          </div>
        )}
      </dl>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted">Roles and votes</h2>
      <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
        {rows.map(({ player, a, votes, accused }) => (
          <li key={player.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="break-words font-medium">{player.name}</p>
              <p className="text-sm text-muted">
                {a.role === "imposter" ? "Imposter" : "Regular"}
                {a.word ? ` · ${a.word}` : " · no word"}
              </p>
            </div>
            <div className="shrink-0 text-right text-sm">
              <p className="tabular-nums">{votes === undefined ? "–" : `${votes} vote${votes === 1 ? "" : "s"}`}</p>
              {accused && <p className="text-accent">Accused</p>}
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
