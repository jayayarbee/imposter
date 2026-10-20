import type { CustomPack, Difficulty } from "@/types";
import { DIFFICULTIES } from "@/types";
import { slugify } from "@/lib/game/bank";

export const MAX_CUSTOM_ENTRIES = 300;
const MAX_LEN = 40;

export const customCount = (p: CustomPack): number => DIFFICULTIES.reduce((n, d) => n + p[d].length, 0);

/** Validates raw textarea input (one entry per line; "A ~ B" = related pair). */
export function parseCustomInput(raw: string, existing: CustomPack): { valid: string[]; errors: string[] } {
  const keys = new Set<string>();
  for (const d of DIFFICULTIES) for (const e of existing[d]) keys.add(e.split("~").map(slugify).join("~"));
  const valid: string[] = [];
  const errors: string[] = [];
  let total = customCount(existing);

  for (const line of raw.split("\n")) {
    const entry = line.trim().replace(/\s+/g, " ");
    if (!entry) continue;
    const parts = entry.split("~").map((s) => s.trim());
    if (entry.includes("|")) errors.push(`"${entry}": the | character is not allowed.`);
    else if (parts.length > 2) errors.push(`"${entry}": use a single ~ between two words.`);
    else if (parts.some((p) => !p)) errors.push(`"${entry}": both sides of ~ need a word.`);
    else if (parts.some((p) => p.length > MAX_LEN)) errors.push(`"${entry}": keep words under ${MAX_LEN + 1} characters.`);
    else if (parts.length === 2 && slugify(parts[0]) === slugify(parts[1])) errors.push(`"${entry}": the two words must differ.`);
    else {
      const key = parts.map(slugify).join("~");
      if (keys.has(key)) errors.push(`"${entry}" is already added.`);
      else if (total >= MAX_CUSTOM_ENTRIES) errors.push(`Limit of ${MAX_CUSTOM_ENTRIES} custom entries reached.`);
      else {
        keys.add(key);
        total += 1;
        valid.push(parts.join(parts.length === 2 ? "~" : ""));
      }
    }
  }
  return { valid, errors };
}

export const addCustomEntries = (pack: CustomPack, d: Difficulty, entries: string[]): CustomPack => ({
  ...pack,
  [d]: [...pack[d], ...entries],
});

export const removeCustomEntry = (pack: CustomPack, d: Difficulty, entry: string): CustomPack => ({
  ...pack,
  [d]: pack[d].filter((e) => e !== entry),
});
