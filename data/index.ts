import type { CustomPack, WordBank } from "@/types";
import { buildBank, customPackToSource } from "@/lib/game/bank";
import { dailyLife } from "./categories/daily-life";
import { celebrities } from "./categories/celebrities";
import { nature } from "./categories/nature";
import { food } from "./categories/food";
import { characters } from "./categories/characters";
import { countries } from "./categories/countries";
import { fashion } from "./categories/fashion";
import { games } from "./categories/games";
import { movies } from "./categories/movies";
import { music } from "./categories/music";
import { objects } from "./categories/objects";
import { jobs } from "./categories/jobs";
import { school } from "./categories/school";
import { sports } from "./categories/sports";
import { technology } from "./categories/technology";
import { transport } from "./categories/transport";

/** To add a category: create data/categories/<id>.ts and list it here. */
export const CATEGORY_SOURCES = [
  dailyLife, celebrities, nature, food, characters, countries, fashion, games,
  movies, music, objects, jobs, school, sports, technology, transport,
];

export const BUILT_IN = buildBank(CATEGORY_SOURCES);

/** Built-in bank plus the optional user-defined "Custom" category (kept separate from built-in data). */
export function getBank(custom?: CustomPack): WordBank {
  const extra = custom ? customPackToSource(custom) : null;
  return extra ? buildBank([...CATEGORY_SOURCES, extra]).bank : BUILT_IN.bank;
}
