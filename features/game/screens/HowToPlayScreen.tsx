"use client";
import { Button, Screen } from "@/components/ui";
import { useGame } from "../GameProvider";

const steps = [
  ["Set up", "Add everyone’s name, choose how many imposters, a category and a difficulty."],
  ["Pass the phone", "Each player takes the phone in private, taps to see their role, then hides it before passing it on."],
  ["Discuss", "Take turns giving one clue about the word. Be vague enough that the imposter can’t guess it, specific enough that friends believe you."],
  ["Vote", "Pass the phone again. Everyone secretly votes for who they think the imposter is."],
  ["Reveal", "See the word, the roles and who won."],
];

const rules = [
  ["Classic mode", "Imposters are told they’re the imposter and get no word."],
  ["Different word mode", "Imposters get a similar but different word. They know they’re the imposter, but not what the others have."],
  ["Winning", "The group accuses as many players as there are imposters. Regular players win only if every imposter is among them."],
  ["Ties", "A tie for the last accusation triggers one revote between the tied players (or an imposter win, if you choose that in Settings). A second tie means the imposters win."],
  ["Abstaining", "A player may skip their vote. Skipped votes count for nobody."],
];

export function HowToPlayScreen() {
  const { dispatch } = useGame();
  return (
    <Screen title="How to play" onBack={() => dispatch({ type: "closeOverlay" })} footer={<Button onClick={() => dispatch({ type: "closeOverlay" })}>Got it</Button>}>
      <ol className="space-y-5">
        {steps.map(([t, d], i) => (
          <li key={t} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm font-medium text-muted">{i + 1}</span>
            <div>
              <h2 className="font-medium">{t}</h2>
              <p className="text-muted">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Rules</h2>
      <dl className="space-y-4">
        {rules.map(([t, d]) => (
          <div key={t}>
            <dt className="font-medium">{t}</dt>
            <dd className="text-muted">{d}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm text-muted">
        Secrets live only in this browser tab, on a trusted shared phone. Keep the screen angled away while you look.
      </p>
    </Screen>
  );
}
