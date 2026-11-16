// Ruční příklady kalkulačky průřezu v2, druhé kolo (postup v tests/priklady/vodic-v2.md) proti enginu.
// Čísla jsou zapsaná z ručního postupu (vzorce bodu 10 s hodnotami ρ z tabulky); kontrola „reference“ hlídá,
// že zápis sedí i s nezávislou referencí v2.

import { describe, expect, it } from "vitest";
import { navrhVodice } from "@caravanix/engine";
import type { VstupVodice, VysledekVodice } from "../../packages/engine/src/vodic.ts";
import { referenceV2 } from "../../packages/engine/tests/golden-v2/reference-v2.ts";
import { porovnej } from "../../packages/engine/tests/golden-v2/porovnani-v2.ts";

/** Výstupy bodu 10 pro výsledek ok: ρ(A), L, n, I, A, U, dU, v (příkon). */
function vystupy(rho: number, L: number, n: number, I: number, A: number, U: number, dU: number, prikon: number) {
  const ubytekV = (rho * L * n * I) / A;
  return {
    proud: I,
    prikon,
    ubytekV,
    ubytekProc: (ubytekV / U) * 100,
    napetiUSpotrebice: U - ubytekV,
    ztrata: ubytekV * I,
    maxDelka: (dU * A) / (rho * n * I),
  };
}

const PRIKLADY: [string, VstupVodice, VysledekVodice][] = [
  [
    "1: lednice 60 W, 12 V, 5 m, 3 %, par (ATOF)",
    { napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, ulozeni: "par" },
    {
      stav: "ok", prurez: 4, awg: { oznaceni: "12", plocha: 3.31 }, pojistka: 7.5, rodinaPojistky: "ATOF", maxPojistka: 30,
      ...vystupy(0.0188, 5, 2, 5, 4, 12, 0.36, 60), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "2: měnič 1 200 W, 12 V, 2 m, 3 %, kostra (MIDI)",
    { napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" },
    {
      stav: "ok", prurez: 35, awg: { oznaceni: "1", plocha: 42.4 }, pojistka: 125, rodinaPojistky: "MIDI", maxPojistka: 125,
      ...vystupy(0.0184, 2, 1, 100, 35, 12, 0.36, 1200), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    },
  ],
  [
    "3: 20 A, 24 V, 8 m, 5 %, svazek",
    { napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, ulozeni: "svazek" },
    {
      stav: "ok", prurez: 6, awg: { oznaceni: "10", plocha: 5.26 }, pojistka: 25, rodinaPojistky: "ATOF", maxPojistka: 25,
      ...vystupy(0.0188, 8, 2, 20, 6, 24, 1.2, 480), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK", "SVAZEK_NEJVYS_3_OBVODY"],
    },
  ],
  [
    "4: 150 A, 12 V, 1 m, 10 %, par → 95 mm², MEGA 200 A",
    { napeti: 12, rezim: "I", hodnota: 150, delka: 1, ubytekProc: 10, ulozeni: "par" },
    {
      stav: "ok", prurez: 95, awg: { oznaceni: "3/0", plocha: 85 }, pojistka: 200, rodinaPojistky: "MEGA", maxPojistka: 200,
      ...vystupy(0.0196, 1, 2, 150, 95, 12, 1.2, 1800), rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI"],
    },
  ],
  [
    "5: 100 A, 12 V, 10 m, 3 %, par → 120 mm², AWG null",
    { napeti: 12, rezim: "I", hodnota: 100, delka: 10, ubytekProc: 3, ulozeni: "par" },
    {
      stav: "ok", prurez: 120, awg: null, pojistka: 125, rodinaPojistky: "MIDI", maxPojistka: 250,
      ...vystupy(0.0193, 10, 2, 100, 120, 12, 0.36, 1200), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "6: 5 A, 12 V, 5 m, 3 %, kostra → AWG 14 (AWG 16 neprojde s větším ρ)",
    { napeti: 12, rezim: "I", hodnota: 5, delka: 5, ubytekProc: 3, ulozeni: "kostra" },
    {
      stav: "ok", prurez: 1.5, awg: { oznaceni: "14", plocha: 2.08 }, pojistka: 7.5, rodinaPojistky: "ATOF", maxPojistka: 15,
      ...vystupy(0.0191, 5, 1, 5, 1.5, 12, 0.36, 60), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK", "MINUS_PRES_KOSTRU"],
    },
  ],
  [
    "7: 180 A, 12 V, 0,5 m, 10 %, kostra → MEGA 250 A, nad 150 A",
    { napeti: 12, rezim: "I", hodnota: 180, delka: 0.5, ubytekProc: 10, ulozeni: "kostra" },
    {
      stav: "ok", prurez: 95, awg: { oznaceni: "4/0", plocha: 107 }, pojistka: 250, rodinaPojistky: "MEGA", maxPojistka: 250,
      ...vystupy(0.0196, 0.5, 1, 180, 95, 12, 1.2, 2160), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "NAD_150A_12V"],
    },
  ],
  [
    "8: motorový prostor → MOTOR_NEPOCITA",
    { napeti: 12, rezim: "I", hodnota: 40, delka: 1.5, ubytekProc: 10, ulozeni: "motor" },
    { stav: "chyba", hlasky: ["MOTOR_NEPOCITA"] },
  ],
  [
    "9: 205 A, 24 V → HLAVNI_VEDENI",
    { napeti: 24, rezim: "I", hodnota: 205, delka: 1, ubytekProc: 10, ulozeni: "par" },
    { stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] },
  ],
  [
    "10: 3 000 W, 12 V → HLAVNI_VEDENI (250 A)",
    { napeti: 12, rezim: "P", hodnota: 3000, delka: 2, ubytekProc: 3, ulozeni: "par" },
    { stav: "chyba", proud: 250, hlasky: ["HLAVNI_VEDENI"] },
  ],
  [
    "11: 150 A, 24 V, 0,2 m, svazek → ANI_120_NESTACI",
    { napeti: 24, rezim: "I", hodnota: 150, delka: 0.2, ubytekProc: 10, ulozeni: "svazek" },
    { stav: "chyba", proud: 150, hlasky: ["ANI_120_NESTACI"] },
  ],
  [
    "12: příkon 0 W → NEPLATNY_VSTUP",
    { napeti: 12, rezim: "P", hodnota: 0, delka: 4, ubytekProc: 3, ulozeni: "par" },
    { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] },
  ],
];

describe("ruční příklady v2: kontrola zápisu proti nezávislé referenci", () => {
  for (const [nazev, vstup, cekano] of PRIKLADY)
    it(nazev, () => expect(porovnej(cekano, referenceV2.navrh(vstup))).toEqual([]));
});

describe("ruční příklady v2: engine", () => {
  for (const [nazev, vstup, cekano] of PRIKLADY)
    it(nazev, () => expect(porovnej(cekano, navrhVodice({ ...vstup }))).toEqual([]));
});
