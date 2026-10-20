# Imposter

A free, self-hostable, pass-the-phone party game of secret words and social deduction. Everyone sees the same word except the imposter. Discuss, give clues, vote.

No accounts, database, paid APIs or environment variables are needed. Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS · lucide-react · Vitest.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm test             # Vitest unit tests
npm run build        # production build
npm run check        # all three of the above
npm run report       # regenerate docs/DATA_REPORT.md
```

## Deploy to Vercel

1. Create a GitHub repository and push:
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/imposter.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, import the repository, and click **Deploy**. Defaults work (framework "Next.js", no environment variables).

## How the game works

1. **Setup:** add players (3–20), choose imposter count, imposter word mode, category mode, difficulty.
2. **Role reveal:** the phone is passed. Each player taps to reveal, then must tap **Hide** and **Done** before the next player's handoff screen appears.
3. **Discussion:** optional countdown (Settings). A random player is suggested to start.
4. **Voting:** the phone is passed again; each player votes for a suspect or abstains, then confirms.
5. **Results:** word(s), roles, tally, winner and reason. **Play again** keeps players and settings and deals new roles.

### Rules (implemented in `lib/game/voting.ts`)

- Imposters are always a minority: max = ⌊(players − 1) / 2⌋ (3–4 players → 1, 5–6 → 2, 7–8 → 3 …).
- **Classic:** imposters are told they are imposters and receive no word.
- **Different word:** every regular player gets word A; every imposter gets related word B (from a curated pair) and is told they are an imposter. With several imposters they all share the same alternate word.
- **Accusation:** each player casts one vote (or abstains). The group accuses as many players as there are imposters (the top vote-getters).
- **Winning:** regular players win only if *every* imposter is accused. Otherwise the imposters win.
- **Ties** (for the last accusation slot): *Revote once* (default) re-runs the vote among only the tied players (clear leaders stay accused); a second tie means imposters win. Or choose *Imposters win* immediately.
- **Self-voting** is off by default (Settings). **Abstaining** counts for nobody; if everyone abstains the vote is a tie.
- Words and pairs are not repeated in consecutive rounds while any alternative exists (most recent first, history of 90 entries); duplicate entries cannot bias selection.
- Category mode (One / Mix / All), difficulty and imposter word mode are independent settings.

## Word bank

Each category is one file in `data/categories/<id>.ts`:

```ts
export const food: CategorySource = {
  id: "food", label: "Food", description: "...",
  // Individual words for classic mode, "a|b|c" per difficulty
  words: { easy: "Pizza|Burger|...", medium: "...", hard: "..." },
  pairs: { easy: "", medium: "", hard: "" },          // legacy "A~B" sibling pairs (unused)
  // Association pairs for different-word mode
  associations: {
    easy: ["Oreo~Twist|brand-feature|The twist-lick-dunk ritual|global", /* ... */],
    medium: [/* ... */], hard: [/* ... */],
  },
};
```

An association row is `Word A~Word B|relationship|explanation|tag,tag`. The relationship must be one of the types in `lib/validation/pairs.ts`; the explanation (15+ characters) is for reviewers only and is never shown in game; tags are lowercase, e.g. `indian`, `malayalam`, `global`. Pair words become **pair-only** entries (ids `pair:<slug>`): they are used in different-word mode and never as classic secret words.

- **Add words:** append `|New word` to a difficulty string.
- **Add a pair:** add a row to `associations`. Avoid siblings and synonyms; the relationship should be nameable.
- **Add a category:** new file + entry in `CATEGORY_SOURCES` in `data/index.ts`.

Then run `npm test`. The data-quality tests check unique ids, valid relationships and explanations, no duplicate or reversed pairs, no word in more than 3 pairs, balance across difficulties, and regional coverage. `npm run report` regenerates `docs/DATA_REPORT.md` (counts by category and difficulty, relationship and tag distribution, shortfall against the goal).

Current content: **1,876 individual words and 480 association pairs** (10 per category per difficulty). See `docs/RESEARCH_AUDIT.md` for what was and wasn't verified, known uncertainties and next steps.

**Custom words** (Settings) live in a separate "Custom" category in localStorage; they are validated, removable, and use `A ~ B` for pairs.

## Project layout

```
app/                    routes, layout, global styles / design tokens
components/ui.tsx       shared UI primitives
features/game/          reducer state machine, provider, screens, hooks
lib/game/               pure game logic: bank building, selection, engine, voting, RNG
lib/validation/         config, word-bank and custom-word validation
data/categories/        word-bank data, one file per category
docs/                   research audit and generated data report
scripts/                data report generator
types/                  shared TypeScript types
tests/                  Vitest unit tests
```

Game rules live in `lib/` with no React imports, so a future server can reuse them. Rename the app in `lib/config.ts`; change colours in `app/globals.css` (CSS variables for light and dark).

## Privacy and limitations

- Pass-and-play on **one trusted device**. Roles live only in React memory: never in URLs, page titles, or localStorage (only players, settings, custom words and theme are stored).
- The Back button is neutralised and reload/close is guarded during a round, and each reveal step needs an explicit tap, but this is **not cryptographic secrecy**. Anyone inspecting the device or looking over a shoulder can see roles and votes, and votes are not hidden from whoever holds the phone.
- Reloading mid-round ends the round (by design: secrets are not persisted).

## Roadmap: online multiplayer (not implemented)

`createRound`, `validateConfig`, vote resolution and the reducer are pure and framework-free. An online version would add room codes and join links; readiness and host controls; **server-authoritative** role assignment with each player receiving only their own assignment (WebSocket/SSE); synchronised discussion and voting with server-side action validation; and reconnect handling. Local state and localStorage provide none of this.
