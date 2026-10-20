import type { GameSettings, Round, RoundResult, Vote } from "@/types";

/**
 * Voting rules (documented in README):
 * - Each player casts one vote for a suspect, or abstains.
 * - The group accuses as many players as there are imposters (top vote-getters).
 * - Regular players win only if every imposter is accused.
 * - A tie for the last accusation slot follows the tie rule (one revote among the tied players,
 *   or imposters win). A second tie always means the imposters win.
 * - Abstentions count for nobody; if everybody abstains the vote is a tie.
 */

export function tallyVotes(votes: readonly Vote[], candidateIds: readonly string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const id of candidateIds) counts[id] = 0;
  for (const v of votes) if (v.targetId !== null && v.targetId in counts) counts[v.targetId] += 1;
  return counts;
}

export type VoteOutcome =
  | { kind: "decided"; accusedIds: string[] }
  | { kind: "tie"; lockedIds: string[]; tiedIds: string[]; slots: number };

export function resolveVotes(counts: Record<string, number>, candidateIds: readonly string[], slots: number): VoteOutcome {
  const sorted = [...candidateIds].sort((a, b) => counts[b] - counts[a]);
  if (slots >= sorted.length) return { kind: "decided", accusedIds: sorted };
  const cutoff = counts[sorted[slots - 1]];
  const locked = sorted.filter((id) => counts[id] > cutoff);
  const atCutoff = sorted.filter((id) => counts[id] === cutoff);
  const remaining = slots - locked.length;
  if (atCutoff.length > remaining) return { kind: "tie", lockedIds: locked, tiedIds: atCutoff, slots: remaining };
  return { kind: "decided", accusedIds: [...locked, ...atCutoff] };
}

/** Returns an error message for an invalid vote, otherwise null. */
export function validateVote(
  voterId: string,
  targetId: string | null,
  candidateIds: readonly string[],
  settings: Pick<GameSettings, "allowSelfVote">,
): string | null {
  if (targetId === null) return null;
  if (!candidateIds.includes(targetId)) return "That player cannot be voted for.";
  if (targetId === voterId && !settings.allowSelfVote) return "You cannot vote for yourself.";
  return null;
}

export const decideWinner = (imposterIds: readonly string[], accusedIds: readonly string[]): "regular" | "imposters" =>
  imposterIds.every((id) => accusedIds.includes(id)) ? "regular" : "imposters";

const list = (names: string[]) => (names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`);

export function finishRound(
  round: Round,
  accusedIds: string[],
  counts: Record<string, number>,
  flags: { tied?: boolean; tiedIds?: string[]; revoted?: boolean } = {},
): RoundResult {
  const name = (id: string) => round.players.find((p) => p.id === id)?.name ?? "Unknown";
  const imposterIds = round.assignments.filter((a) => a.role === "imposter").map((a) => a.playerId);
  const multi = imposterIds.length > 1;
  const tied = !!flags.tied;
  const winner = tied ? "imposters" : decideWinner(imposterIds, accusedIds);
  let reason: string;
  if (tied) {
    reason = `The vote stayed tied between ${list((flags.tiedIds ?? []).map(name))}, so the imposters win.`;
  } else if (winner === "regular") {
    reason = multi
      ? `The group found every imposter: ${list(imposterIds.map(name))}.`
      : `The group accused ${name(accusedIds[0])}, who was the imposter.`;
  } else {
    const found = accusedIds.filter((id) => imposterIds.includes(id));
    reason = `The group accused ${list(accusedIds.map(name))}. ${
      multi
        ? found.length
          ? `That caught ${found.length} of ${imposterIds.length} imposters, but every imposter had to be found.`
          : `The imposters were ${list(imposterIds.map(name))}.`
        : `The imposter was ${name(imposterIds[0])}.`
    }`;
  }
  return { winner, reason, accusedIds, counts, tied, revoted: !!flags.revoted };
}
