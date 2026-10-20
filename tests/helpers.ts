import type { CategorySource, GameSettings, Player } from "@/types";
import { buildBank } from "@/lib/game/bank";
import { DEFAULT_SETTINGS } from "@/features/game/state";

export const makePlayers = (n: number): Player[] => Array.from({ length: n }, (_, i) => ({ id: `p${i + 1}`, name: `Player ${i + 1}` }));
export const settings = (over: Partial<GameSettings> = {}): GameSettings => ({ ...DEFAULT_SETTINGS, ...over });

export const tinySources: CategorySource[] = [
  {
    id: "a",
    label: "A",
    words: { easy: "Apple|Banana|Cherry", medium: "Date|Elderberry", hard: "" },
    pairs: { easy: "Apple~Pear", medium: "", hard: "" },
  },
  {
    id: "b",
    label: "B",
    words: { easy: "Dog|Cat", medium: "Wolf", hard: "Lynx" },
    pairs: { easy: "", medium: "Wolf~Coyote", hard: "" },
  },
];
export const tinyBank = () => buildBank(tinySources).bank;
