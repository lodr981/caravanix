// Ruční příklady kalkulačky průřezu v2 (postup v tests/priklady/vodic-v2.md) proti enginu.
// Čísla jsou zapsaná natvrdo z ručního postupu; kontrola „reference“ hlídá, že sedí i s nezávislou referencí v2.

import { describe, expect, it } from "vitest";
import { navrhVodice } from "@caravanix/engine";
import type { VstupVodice, VysledekVodice } from "../../packages/engine/src/vodic.ts";
import { referenceV2 } from "../../packages/engine/tests/golden-v2/reference-v2.ts";
import { porovnej } from "../../packages/engine/tests/golden-v2/porovnani-v2.ts";

const PRIKLADY: [string, VstupVodice, VysledekVodice][] = [
  [
    "1: lednice 60 W, 12 V, 5 m, 3 %, par",
    { napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, ulozeni: "par" },
    {
      stav: "ok", prurez: 4, awg: { oznaceni: "12", plocha: 3.31 }, pojistka: 7.5, maxPojistka: 30, proud: 5, prikon: 60,
      ubytekV: (0.0191 * 5 * 2 * 5) / 4, ubytekProc: ((0.0191 * 5 * 2 * 5) / 4 / 12) * 100,
      napetiUSpotrebice: 12 - (0.0191 * 5 * 2 * 5) / 4, ztrata: ((0.0191 * 5 * 2 * 5) / 4) * 5,
      maxDelka: (0.36 * 4) / (0.0191 * 2 * 5), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "2: měnič 1 200 W, 12 V, 2 m, 3 %, kostra",
    { napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" },
    {
      stav: "ok", prurez: 35, awg: { oznaceni: "1", plocha: 42.4 }, pojistka: 125, maxPojistka: 125, proud: 100, prikon: 1200,
      ubytekV: (0.0191 * 2 * 1 * 100) / 35, ubytekProc: ((0.0191 * 2 * 1 * 100) / 35 / 12) * 100,
      napetiUSpotrebice: 12 - (0.0191 * 2 * 1 * 100) / 35, ztrata: ((0.0191 * 2 * 1 * 100) / 35) * 100,
      maxDelka: (0.36 * 35) / (0.0191 * 1 * 100), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    },
  ],
  [
    "3: 20 A, 24 V, 8 m, 5 %, svazek",
    { napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, ulozeni: "svazek" },
    {
      stav: "ok", prurez: 10, awg: { oznaceni: "8", plocha: 8.37 }, pojistka: 25, maxPojistka: 35, proud: 20, prikon: 480,
      ubytekV: 0.7552, ubytekProc: (0.7552 / 24) * 100, napetiUSpotrebice: 23.2448, ztrata: 15.104,
      maxDelka: (1.2 * 10) / (0.0236 * 2 * 20), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "4: 40 A, 12 V, 1,5 m, 10 %, motor",
    { napeti: 12, rezim: "I", hodnota: 40, delka: 1.5, ubytekProc: 10, ulozeni: "motor" },
    {
      stav: "ok", prurez: 25, awg: { oznaceni: "4", plocha: 21.2 }, pojistka: 50, maxPojistka: 60, proud: 40, prikon: 480,
      ubytekV: 0.11328, ubytekProc: 0.944, napetiUSpotrebice: 11.88672, ztrata: 4.5312,
      maxDelka: (1.2 * 25) / (0.0236 * 2 * 40), rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI", "MOTOR_VYSSI_TRIDA"],
    },
  ],
  [
    "5a: 3 000 W na 12 V → HLAVNI_VEDENI",
    { napeti: 12, rezim: "P", hodnota: 3000, delka: 2, ubytekProc: 3, ulozeni: "par" },
    { stav: "chyba", proud: 250, hlasky: ["HLAVNI_VEDENI"] },
  ],
  [
    "5b: 160 A, 24 V, 0,2 m, motor → ANI_120_NESTACI",
    { napeti: 24, rezim: "I", hodnota: 160, delka: 0.2, ubytekProc: 10, ulozeni: "motor" },
    { stav: "chyba", proud: 160, hlasky: ["ANI_120_NESTACI"] },
  ],
  [
    "5c: příkon 0 W → NEPLATNY_VSTUP",
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
