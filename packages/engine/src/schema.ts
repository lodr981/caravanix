// Živé schéma: průřez a pojistku každého kabelu projektu počítá kalkulačka průřezu v1.1 (navrhVodice).
import { doporuceniVyrobcu, type Projekt } from "@caravanix/data";
import { navrhSVyrobcem } from "./vyrobci.ts";
import { navrhVodice, type VstupVodice, type VysledekVodice } from "./vodic.ts";

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
  /** Kde je pojistka kabelu (výchozí „od“) a prvky v cestě. */
  pojistkaU: "od" | "do" | "obe" | "zadna";
  prvky: NonNullable<Projekt["kabely"][number]["prvky"]>;
}

export function navrhSchematu(projekt: Projekt): KabelSchematu[] {
  return projekt.kabely.map((k) => {
    if (k.druh !== undefined || k.delkaM === undefined) {
      return { id: k.id, od: k.od, do: k.do, proudA: null, vysledek: null, rezimy: k.rezimy, popis: k.popis ?? null, druh: k.druh ?? "solar", pojistkaU: "zadna", prvky: k.prvky ?? [] };
    }
    const rezim = k.proudA !== undefined ? "I" : "P";
    const hodnota = k.proudA ?? k.prikonW ?? Number.NaN;
    const vstup: VstupVodice = {
      napeti: projekt.napeti,
      rezim,
      hodnota,
      delka: k.delkaM,
      ubytekProc: k.ubytekProc ?? 3,
      zpetny: 2,
      prostredi: "n",
    };
    let vysledek = navrhVodice(vstup);
    const vyr = k.vyrobce ? doporuceniVyrobcu.polozky.find((x) => x.id === k.vyrobce) : undefined;
    if (vyr && vysledek.stav === "ok") {
      const sv = navrhSVyrobcem(vstup, vyr);
      if (sv.prurez !== null && sv.pojistka !== null && sv.maxPojistka !== null && sv.ubytekV !== null && sv.ubytekProc !== null)
        vysledek = { ...vysledek, prurez: sv.prurez, pojistka: sv.pojistka, maxPojistka: sv.maxPojistka, ubytekV: sv.ubytekV, ubytekProc: sv.ubytekProc };
    }
    const proudA = rezim === "I" ? hodnota : hodnota / projekt.napeti;
    return { id: k.id, od: k.od, do: k.do, proudA, vysledek, rezimy: k.rezimy, popis: k.popis ?? null, druh: null, pojistkaU: k.pojistkaU ?? "od", prvky: k.prvky ?? [] };
  });
}
