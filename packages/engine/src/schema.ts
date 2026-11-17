// Živé schéma: průřez a pojistku každého kabelu projektu počítá kalkulačka průřezu v1.1 (navrhVodice).
import type { Projekt } from "@caravanix/data";
import { navrhVodice, type VysledekVodice } from "./vodic.ts";

export interface KabelSchematu {
  id: string;
  od: string;
  do: string;
  /** Proud kabelem [A]. */
  proudA: number | null;
  /** Výsledek kalkulačky průřezu, null u solárního kabelu. */
  vysledek: VysledekVodice | null;
  rezimy: Projekt["kabely"][number]["rezimy"];
  popis: string | null;
  /** solar / ac = kabel, který kalkulačka průřezu nepočítá (volí se podle návodu výrobce). */
  druh: "solar" | "ac" | null;
}

export function navrhSchematu(projekt: Projekt): KabelSchematu[] {
  return projekt.kabely.map((k) => {
    if (k.druh !== undefined || k.delkaM === undefined) {
      return { id: k.id, od: k.od, do: k.do, proudA: null, vysledek: null, rezimy: k.rezimy, popis: k.popis ?? null, druh: k.druh ?? "solar" };
    }
    const rezim = k.proudA !== undefined ? "I" : "P";
    const hodnota = k.proudA ?? k.prikonW ?? Number.NaN;
    const vysledek = navrhVodice({
      napeti: projekt.napeti,
      rezim,
      hodnota,
      delka: k.delkaM,
      ubytekProc: k.ubytekProc ?? 3,
      zpetny: 2,
      prostredi: "n",
    });
    const proudA = rezim === "I" ? hodnota : hodnota / projekt.napeti;
    return { id: k.id, od: k.od, do: k.do, proudA, vysledek, rezimy: k.rezimy, popis: k.popis ?? null, druh: null };
  });
}
