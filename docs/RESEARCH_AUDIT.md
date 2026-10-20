# Research and quality audit

Counts below come from `docs/DATA_REPORT.md`, which is generated from the real data files (`npm run report`).

## 1. Before and after (measured, not taken from the README)

| | Before | After |
|---|---:|---:|
| Individual words (classic mode) | 578 | 1,876 |
| Related-word pairs | 96 | 480 |
| Words per category per difficulty | 9 to 14 | 32 to 62 |
| Pairs per category per difficulty | exactly 2 | exactly 10 |

**Target not met.** The brief asked for 150 to 200 words per category per difficulty (7,200 to 9,600 total). This delivery reaches about 21% to 41% of the 150 floor per cell. The per-cell shortfall is listed in `DATA_REPORT.md`. I chose to stop at a validated set rather than pad with filler. Association pairs, the central focus, went from 96 to 480, but the old 96 were mostly siblings (Batman/Superman style) and were retired, so the net association count is 480 genuinely new rows.

## 2. What was actually researched

Honest split:

- **Web-verified in this session (three targeted checks):**
  - *Domino's "30 minutes" promise.* Sources (a Harvard D3 case, exchange4media, ICMR case study, Tasting Table and others) confirm the promise is real and India-linked, but **disagree on its current terms** (free pizza vs a ₹300 voucher; some say it was replaced). The pair is therefore worded as "the promise", not as current policy.
  - *Kolkata is India's only tram city.* Confirmed by C40 and AFP syndications (Arab News, Inquirer). Caveat: the network has shrunk to very few routes and may shrink further.
  - *Mumbai Monorail.* Confirmed as India's first modern monorail, opened 2 February 2014 (Wikipedia, Business Today, Gulf Times, The Hindu).
- **Everything else (the large majority) was written from my own knowledge, not looked up.** I used editorial judgement and avoided claims I was unsure of, but these entries are **not source-checked**. Treat them as "likely correct, needs a human skim", especially film credits, slogans and sports trivia.

No sources were consulted for the individual word lists beyond general knowledge.

## 3. Curation criteria

- A pair is two different concepts joined by a nameable, defensible relationship (see `RELATIONSHIP_TYPES` in `lib/validation/pairs.ts`, 55 types). Siblings and synonyms were avoided; an automated check flags pairs where one word contains the other.
- Each pair stores a relationship type, a one-line explanation (for review only, never shown in game), and regional/subject tags.
- Both words must be plausible secret words that two players could give overlapping clues for.
- Pair words are stored as **pair-only** entries and never appear as classic-mode secret words (so a word like "Twist" cannot become a standalone secret).

## 4. Difficulty assignment

- **Easy:** associations most players in India or globally would reach quickly (mainstream brands, blockbusters, everyday habits).
- **Medium:** needs a little thought or regional/scene knowledge (specific scenes, props, slogans, regional cinema).
- **Hard:** niche but verifiable (classic and arthouse cinema, specialist music, scientific and historical references, wordplay and etymology).
- Difficulty was judged by recognisability of the association, not word length. This is subjective; some Easy/Medium boundaries (especially regional references) will vary by player.

## 5. Known uncertainties and entries for human review

- Domino's "Thirty minutes": current terms are disputed (see above).
- Kolkata tram: network shrinking; "only city with trams" may change.
- Widely repeated but secondary claims, worded cautiously: Pangolin as "most trafficked mammal", Ikigai/Okinawa, Brogues' holes (folk origin), Cummerbund "crumb catcher", Bamboo "nearly a metre a day" (some species only).
- Film, slogan and sports facts not individually web-checked: all rows in Movies, Brand/slogan rows in Food, Sports and Characters. A reviewer should skim the `explanation` field of each.
- Difficulty tiers for Hard Indian-cinema pairs (e.g. Pather Panchali, Mughal-e-Azam) assume cinephile knowledge.

## 6. Coverage and balance

- Exactly 10 pairs in each of the 48 category/difficulty cells (480 total).
- 55 relationship types defined; no single type exceeds 15% of pairs (enforced by test).
- Regional tags present: indian, hindi, malayalam, tamil, telugu, kannada, bengali, korean, japanese, global (enforced by test). Indian content is deliberately strong in Movies, Food, Celebrities and Daily Life; Bengali, Tamil and Kannada remain thin (a handful of pairs each).
- No concept appears in more than 3 pairs (enforced by test).

## 7. Remaining weak areas and next steps

1. Individual word lists are 21% to 41% of the target. Easiest way to grow: append to the `@words` lines in the category files, then re-run tests.
2. Only 10 pairs per cell. Single-category plus single-difficulty games will cycle after about 10 rounds (the engine now avoids immediate repeats, but a 10-pair pool is still small). "All categories" has about 160 pairs per difficulty.
3. More regional depth: Tamil, Telugu, Kannada, Bengali and Marathi cinema, Indian sports beyond cricket.
4. Aliases (`aliases` field) are supported by the schema but not yet populated.
5. A human review pass of explanations, and a web-verification pass over the film and slogan rows.

## 8. Repetition: root causes and fixes

Measured on the original data (Movies / Medium, 12 consecutive rounds, 40 seeds): in different-word mode **95 of 480 rounds repeated the previous round's word**; classic mode repeated 2 of 480.

Root causes:
1. **Tiny pools:** about 12 words and exactly 2 pairs per category and difficulty.
2. **Real defect in the selection logic:** the recent-history list (12 entries) was longer than the pool. When every eligible item counted as "recent", the code fell back to the whole pool, including the very last word. Avoidance silently switched off.
3. History does not survive a reload or PWA relaunch (see recommendation below).

Fixes (minimal, in `lib/game/engine.ts` and `features/game/state.ts`):
- `freshPool()` excludes recently used items most-recent-first but never empties the pool, so the last word can't repeat while any alternative exists.
- Pairs are tracked by pair id as well as by word ids (`roundWordIds`), so a recent pair and its words are avoided independently.
- History window raised from 12 to 90 entries.

Not changed (recommendation): the history is in memory only, so closing the app resets it. Persisting it would be an easy fix, but it means storing past words in localStorage, which conflicts with the project's "no secrets in storage" rule while a round is in progress. If wanted, persist only after a round ends.

## 9. Schema and code changes (all backwards compatible)

- `WordEntry.pairOnly?`, `WordPair.relationship?`, `WordPair.explanation?` and `CategorySource.associations?` added to `types/index.ts`.
- `lib/game/bank.ts` parses association rows: `"A~B|relationship|explanation|tag,tag"`.
- `lib/game/select.ts`: classic-mode pool excludes pair-only words.
- `lib/validation/bank.ts`: coverage and duplicate checks ignore pair-only words.
- New: `lib/validation/pairs.ts`, `tests/data-quality.test.ts`, `scripts/report.ts`, `vitest.report.config.ts`, `docs/`.
- No UI, routing, game rules or dependencies changed. The legacy `A~B` sibling format is still supported by the loader but no longer used in the data.
