"use client";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { Round } from "@/types";
import { Button, EndGameButton, Screen } from "@/components/ui";
import { useGame } from "../GameProvider";
import { useCountdown } from "../useCountdown";

const fmt = (ms: number) => {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function Timer({ seconds }: { seconds: number }) {
  const t = useCountdown(seconds);
  const pct = t.total ? Math.max(0, Math.min(100, (t.remaining / t.total) * 100)) : 0;
  return (
    <div className="rounded-lg border border-line bg-surface p-5 text-center">
      <p className={`text-6xl font-semibold tabular-nums tracking-tight ${t.status === "expired" ? "text-accent" : ""}`} aria-hidden>
        {fmt(t.remaining)}
      </p>
      <p className="sr-only">Time remaining {fmt(t.remaining)}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-subtle" aria-hidden>
        <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 min-h-6 text-sm text-muted" role="status">
        {t.status === "expired" ? "Time’s up. Time to vote." : t.status === "paused" ? "Paused" : t.status === "idle" ? "Ready when you are" : "Discussing…"}
      </p>
      <div className="mt-4 flex justify-center gap-2">
        {t.status === "running" ? (
          <Button variant="secondary" onClick={t.pause}>
            <Pause size={18} aria-hidden /> Pause
          </Button>
        ) : (
          <Button variant="secondary" onClick={t.start} disabled={t.status === "expired"}>
            <Play size={18} aria-hidden /> {t.status === "paused" ? "Resume" : "Start"}
          </Button>
        )}
        <Button variant="ghost" onClick={t.reset} aria-label="Reset timer">
          <RotateCcw size={18} aria-hidden /> Reset
        </Button>
      </div>
    </div>
  );
}

export function DiscussionScreen({ round }: { round: Round }) {
  const { state, dispatch } = useGame();
  const seconds = state.settings.timerSeconds;
  const starter = round.players.find((p) => p.id === round.startingPlayerId);
  return (
    <Screen
      title="Discussion"
      right={<EndGameButton onConfirm={() => dispatch({ type: "goto", screen: "home" })} />}
      footer={
        <Button onClick={() => dispatch({ type: "toVoting" })} className="w-full">
          Go to voting
        </Button>
      }
    >
      <p className="text-lg">
        Take turns giving one clue each. <span className="text-muted">{starter?.name} goes first.</span>
      </p>
      <p className="mt-2 text-muted">Be specific enough for friends to trust you, and vague enough to confuse the imposter.</p>
      <div className="mt-8">
        {seconds > 0 ? (
          <Timer key={seconds} seconds={seconds} />
        ) : (
          <p className="rounded-lg border border-dashed border-line p-5 text-center text-muted">Untimed discussion. Vote whenever you’re ready.</p>
        )}
      </div>
    </Screen>
  );
}
