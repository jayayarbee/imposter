"use client";
import { useMemo, useState } from "react";
import type { Difficulty, ThemePref, TieRule } from "@/types";
import { DIFFICULTIES } from "@/types";
import { Button, Issues, Screen, Section, Segmented, Toggle } from "@/components/ui";
import { coverageReport } from "@/lib/validation/bank";
import { addCustomEntries, customCount, parseCustomInput, removeCustomEntry, MAX_CUSTOM_ENTRIES } from "@/lib/validation/custom";
import { emptyCustomPack } from "@/lib/game/bank";
import { useGame } from "../GameProvider";

const TIMERS = [
  { value: 0, label: "Off" },
  { value: 60, label: "1 min" },
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
  { value: 600, label: "10 min" },
];

export function SettingsScreen() {
  const { state, dispatch, bank } = useGame();
  const { settings, custom } = state;
  const [raw, setRaw] = useState("");
  const [diff, setDiff] = useState<Difficulty>("easy");
  const [errors, setErrors] = useState<string[]>([]);
  const report = useMemo(() => coverageReport(bank), [bank]);

  const addCustom = () => {
    const { valid, errors } = parseCustomInput(raw, custom);
    setErrors(errors);
    if (valid.length) dispatch({ type: "setCustom", custom: addCustomEntries(custom, diff, valid) });
    if (!errors.length) setRaw("");
  };

  return (
    <Screen title="Settings" onBack={() => dispatch({ type: "closeOverlay" })}>
      <Section title="Discussion timer">
        <Segmented<number> label="Discussion timer" columns={3} value={settings.timerSeconds} onChange={(v) => dispatch({ type: "settings", patch: { timerSeconds: v } })} options={TIMERS} />
      </Section>

      <Section title="Voting">
        <Toggle label="Allow voting for yourself" checked={settings.allowSelfVote} onChange={(v) => dispatch({ type: "settings", patch: { allowSelfVote: v } })} />
        <div className="space-y-2">
          <p>If the vote is tied</p>
          <Segmented<TieRule>
            label="Tie rule"
            value={settings.tieRule}
            onChange={(v) => dispatch({ type: "settings", patch: { tieRule: v } })}
            options={[
              { value: "revote", label: "Revote once" },
              { value: "imposters-win", label: "Imposters win" },
            ]}
          />
          <p className="text-sm text-muted">With a revote, only the tied players can be voted for. A second tie means the imposters win.</p>
        </div>
      </Section>

      <Section title="Theme">
        <Segmented<ThemePref>
          label="Theme"
          value={state.theme}
          onChange={(v) => dispatch({ type: "setTheme", theme: v })}
          options={[
            { value: "system", label: "System" },
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
        />
      </Section>

      <Section title="Custom words" hint={`One per line. Write "Cat ~ Dog" for a related pair. Stored only on this device, separate from the built-in words (${customCount(custom)}/${MAX_CUSTOM_ENTRIES}).`}>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={4}
          aria-label="Custom words"
          placeholder={"Pickleball\nTea ~ Chai"}
          className="w-full rounded-lg border border-line bg-surface p-3 text-base placeholder:text-muted"
        />
        <Segmented<Difficulty> label="Difficulty for these words" value={diff} onChange={setDiff} options={DIFFICULTIES.map((d) => ({ value: d, label: d[0].toUpperCase() + d.slice(1) }))} />
        <Button variant="secondary" onClick={addCustom} disabled={!raw.trim()} className="w-full">
          Add to Custom category
        </Button>
        <Issues messages={errors} />
        {customCount(custom) > 0 && (
          <div className="space-y-3">
            {DIFFICULTIES.filter((d) => custom[d].length).map((d) => (
              <div key={d}>
                <p className="mb-1 text-sm capitalize text-muted">{d}</p>
                <ul className="flex flex-wrap gap-2">
                  {custom[d].map((e) => (
                    <li key={e}>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "setCustom", custom: removeCustomEntry(custom, d, e) })}
                        aria-label={`Remove ${e}`}
                        className="min-h-9 rounded-lg border border-line bg-surface px-3 text-sm hover:text-danger"
                      >
                        {e.replace("~", " ~ ")} ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Button variant="danger" onClick={() => dispatch({ type: "setCustom", custom: emptyCustomPack() })} className="w-full">
              Remove all custom words
            </Button>
          </div>
        )}
      </Section>

      <Section title="Word bank">
        <details className="rounded-lg border border-line bg-surface">
          <summary className="flex min-h-12 cursor-pointer items-center px-4 font-medium">
            Coverage: {bank.words.length} words, {bank.pairs.length} pairs
          </summary>
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full text-left text-sm tabular-nums">
              <caption className="sr-only">Words and related pairs by category and difficulty</caption>
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-3 font-medium">Category</th>
                  <th className="px-2 font-medium" title="Easy / Medium / Hard words">Words E/M/H</th>
                  <th className="pl-2 font-medium" title="Easy / Medium / Hard related pairs">Pairs E/M/H</th>
                </tr>
              </thead>
              <tbody>
                {report.map((r) => (
                  <tr key={r.categoryId} className="border-t border-line">
                    <td className="py-2 pr-3">{r.label}</td>
                    <td className="px-2">{r.words.easy}/{r.words.medium}/{r.words.hard}</td>
                    <td className="pl-2">{r.pairs.easy}/{r.pairs.medium}/{r.pairs.hard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Section>
    </Screen>
  );
}
