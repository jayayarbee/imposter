"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Plus, Trash2 } from "lucide-react";
import type { CategoryMode, Difficulty, GameSettings, Player, WordMode } from "@/types";
import { Button, Chip, Issues, Screen, Section, Segmented, Stepper } from "@/components/ui";
import { filterPairs, filterWords } from "@/lib/game/select";
import { MAX_NAME_LENGTH, MAX_PLAYERS, MIN_PLAYERS, maxImposters, validateConfig, validatePlayerName } from "@/lib/validation/config";
import { useGame } from "../GameProvider";

function PlayerRow({ player, players, onRename, onRemove }: { player: Player; players: Player[]; onRename: (n: string) => void; onRemove: () => void }) {
  const [draft, setDraft] = useState(player.name);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => setDraft(player.name), [player.name]);
  const commit = () => {
    if (draft === player.name) return setErr(null);
    const e = validatePlayerName(draft, players, player.id);
    if (e) {
      setErr(e);
      setDraft(player.name);
    } else {
      setErr(null);
      onRename(draft);
    }
  };
  return (
    <li>
      <div className="flex items-center gap-2">
        <input
          aria-label={`Rename ${player.name}`}
          value={draft}
          maxLength={MAX_NAME_LENGTH}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && (e.currentTarget.blur())}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base"
        />
        <button type="button" onClick={onRemove} aria-label={`Remove ${player.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-danger">
          <Trash2 size={18} aria-hidden />
        </button>
      </div>
      {err && <p className="mt-1 text-sm text-danger">{err}</p>}
    </li>
  );
}

export function SetupScreen() {
  const { state, dispatch, bank, startGame, startErrors } = useGame();
  const { players, settings } = state;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const validation = useMemo(() => validateConfig(players, settings, bank), [players, settings, bank]);
  const patch = (p: Partial<GameSettings>) => dispatch({ type: "settings", patch: p });

  const wordCount = filterWords(bank, settings).length;
  const pairCount = filterPairs(bank, settings).length;
  const selectionReady = settings.categoryMode === "all" || settings.categoryIds.length > 0;

  const add = () => {
    const err = players.length >= MAX_PLAYERS ? `At most ${MAX_PLAYERS} players.` : validatePlayerName(name, players);
    if (err) return setNameError(err);
    dispatch({ type: "addPlayer", name });
    setName("");
    setNameError(null);
    inputRef.current?.focus();
  };

  const setMode = (mode: CategoryMode) =>
    patch({ categoryMode: mode, categoryIds: mode === "single" ? settings.categoryIds.slice(0, 1) : mode === "all" ? [] : settings.categoryIds });
  const toggleCategory = (id: string) => {
    if (settings.categoryMode === "single") patch({ categoryIds: [id] });
    else patch({ categoryIds: settings.categoryIds.includes(id) ? settings.categoryIds.filter((c) => c !== id) : [...settings.categoryIds, id] });
  };

  const modeHint: Record<CategoryMode, string> = {
    single: "The word comes from the one category you pick.",
    mixed: "The word comes from any of the categories you pick.",
    all: "The word can come from any category.",
  };
  const wordHint: Record<WordMode, string> = {
    classic: "Imposters get no word and must bluff from the clues.",
    different: "Imposters get a similar word, so everyone is a little unsure.",
  };

  const messages = [...validation.issues.map((i) => i.message), ...startErrors.map((i) => i.message)];

  return (
    <Screen
      title="New game"
      onBack={() => dispatch({ type: "goto", screen: "home" })}
      right={
        <button type="button" onClick={() => dispatch({ type: "open", screen: "settings" })} className="min-h-11 rounded-lg px-3 text-sm text-muted hover:bg-subtle hover:text-ink">
          Settings
        </button>
      }
      footer={
        <>
          <Issues messages={[...new Set(messages)]} />
          <Button onClick={startGame} disabled={!validation.ok} className="w-full">
            <Play size={18} aria-hidden /> Start game
          </Button>
        </>
      }
    >
      <Section title={`Players · ${players.length}`} hint={`${MIN_PLAYERS}–${MAX_PLAYERS} players. Tap a name to rename it.`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            value={name}
            maxLength={MAX_NAME_LENGTH}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
            }}
            placeholder="Player name"
            aria-label="New player name"
            autoComplete="off"
            enterKeyHint="done"
            className="min-h-12 w-full rounded-lg border border-line bg-surface px-3 text-base placeholder:text-muted"
          />
          <Button type="submit" variant="secondary" aria-label="Add player" className="px-4">
            <Plus size={20} aria-hidden />
          </Button>
        </form>
        {nameError && <p className="text-sm text-danger">{nameError}</p>}
        {players.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">No players yet. Add at least {MIN_PLAYERS} to start.</p>
        ) : (
          <ul className="space-y-2">
            {players.map((p) => (
              <PlayerRow key={p.id} player={p} players={players} onRename={(n) => dispatch({ type: "renamePlayer", id: p.id, name: n })} onRemove={() => dispatch({ type: "removePlayer", id: p.id })} />
            ))}
          </ul>
        )}
      </Section>

      <Section title="Imposters" hint={players.length >= MIN_PLAYERS ? `Up to ${maxImposters(players.length)} with ${players.length} players.` : "Imposters are always a minority."}>
        <Stepper label="imposters" value={settings.imposterCount} min={1} max={Math.max(1, maxImposters(players.length))} onChange={(v) => patch({ imposterCount: v })} />
      </Section>

      <Section title="Imposter’s word" hint={wordHint[settings.wordMode]}>
        <Segmented<WordMode>
          label="Imposter word mode"
          value={settings.wordMode}
          onChange={(v) => patch({ wordMode: v })}
          options={[
            { value: "classic", label: "Classic" },
            { value: "different", label: "Different word" },
          ]}
        />
      </Section>

      <Section title="Category" hint={modeHint[settings.categoryMode]}>
        <Segmented<CategoryMode>
          label="Category selection mode"
          value={settings.categoryMode}
          onChange={setMode}
          options={[
            { value: "single", label: "One" },
            { value: "mixed", label: "Mix" },
            { value: "all", label: "All" },
          ]}
        />
        {settings.categoryMode === "all" ? (
          <p className="text-sm text-muted">All {bank.categories.length} categories are included.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {bank.categories.map((c) => (
              <Chip key={c.id} selected={settings.categoryIds.includes(c.id)} onClick={() => toggleCategory(c.id)}>
                {c.label}
              </Chip>
            ))}
          </div>
        )}
      </Section>

      <Section title="Difficulty" hint="Easy: familiar. Medium: more specific. Hard: niche.">
        <Segmented<Difficulty>
          label="Difficulty"
          value={settings.difficulty}
          onChange={(v) => patch({ difficulty: v })}
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
        />
        {selectionReady && (
          <p className="text-sm text-muted">
            {wordCount} word{wordCount === 1 ? "" : "s"} · {pairCount} related pair{pairCount === 1 ? "" : "s"} match these filters.
          </p>
        )}
      </Section>
    </Screen>
  );
}
