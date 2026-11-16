// Ruční příklady kalkulačky průřezu VERZE 1.1 (postup v tests/priklady/vodic-v11.md) proti enginu.
// Čísla jsou zapsaná z ručního postupu (vzorce v1: Areq = ρ·L·n·I/dU, pojistka ≥ 1,25 × I, maxFuse bez 300 A).
// Kontrola „zápis sedí s referencí“ hlídá, že ruční výpočet souhlasí s nezávislou referencí v1.1.

import { describe, expect, it } from "vitest";
import { navrhVodice } from "@caravanix/engine";
import type { VstupVodice, VysledekVodice } from "../../packages/engine/src/vodic.ts";
import { referenceV11 } from "../../packages/engine/tests/golden-v11/reference-v11.ts";
import { porovnej } from "../../packages/engine/tests/golden-v11/porovnani-v11.ts";
import { loadReference } from "../../packages/engine/tests/golden-v1/reference.ts";

/** Výstupy pro výsledek ok: ρ, délka L, násobek n (zpětný), proud I, průřez A, napětí U, dovolený úbytek dU, příkon. */
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
    "1: lednice 60 W, 12 V, 5 m, 3 %, vlastní mínus, samostatně",
    { napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, zpetny: 2, prostredi: "n" },
    {
      stav: "ok", prurez: 2.5, awg: { oznaceni: "12", plocha: 3.31 }, pojistka: 7.5, maxPojistka: 20,
      ...vystupy(0.0175, 5, 2, 5, 2.5, 12, 0.36, 60), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "2: měnič 1 200 W, 12 V, 2 m, 3 %, mínus přes kostru, samostatně",
    { napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, zpetny: 1, prostredi: "n" },
    {
      stav: "ok", prurez: 35, awg: { oznaceni: "1", plocha: 42.4 }, pojistka: 125, maxPojistka: 125,
      ...vystupy(0.0175, 2, 1, 100, 35, 12, 0.36, 1200), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    },
  ],
  [
    "3: 20 A, 24 V, 8 m, 5 %, vlastní mínus, ve svazku",
    { napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, zpetny: 2, prostredi: "h" },
    {
      stav: "ok", prurez: 6, awg: { oznaceni: "8", plocha: 8.37 }, pojistka: 25, maxPojistka: 35,
      ...vystupy(0.0216, 8, 2, 20, 6, 24, 1.2, 480), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    },
  ],
  [
    "4: nad 150 A: 160 A, 12 V, 1 m, 10 %, vlastní mínus, samostatně",
    { napeti: 12, rezim: "I", hodnota: 160, delka: 1, ubytekProc: 10, zpetny: 2, prostredi: "n" },
    {
      stav: "ok", prurez: 70, awg: { oznaceni: "3/0", plocha: 85 }, pojistka: 200, maxPojistka: 200,
      ...vystupy(0.0175, 1, 2, 160, 70, 12, 1.2, 1920), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "NAD_150A_12V", "NAD_150A_MENIC"],
    },
  ],
  [
    "5: hlavní vedení: 205 A, 24 V, 1 m, 10 %",
    { napeti: 24, rezim: "I", hodnota: 205, delka: 1, ubytekProc: 10, zpetny: 2, prostredi: "n" },
    { stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] },
  ],
  [
    "6: změna proti v1: 9 A, 12 V, 2 m, 10 %, vlastní mínus, samostatně",
    { napeti: 12, rezim: "I", hodnota: 9, delka: 2, ubytekProc: 10, zpetny: 2, prostredi: "n" },
    {
      stav: "ok", prurez: 1, awg: { oznaceni: "16", plocha: 1.31 }, pojistka: 15, maxPojistka: 15,
      ...vystupy(0.0175, 2, 2, 9, 1, 12, 1.2, 108), rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI"],
    },
  ],
  [
    "7: hrana meze: přesně 200 A, 12 V, 0,5 m, 10 %, vlastní mínus, samostatně",
    { napeti: 12, rezim: "I", hodnota: 200, delka: 0.5, ubytekProc: 10, zpetny: 2, prostredi: "n" },
    {
      stav: "ok", prurez: 95, awg: { oznaceni: "4/0", plocha: 107 }, pojistka: 250, maxPojistka: 250,
      ...vystupy(0.0175, 0.5, 2, 200, 95, 12, 1.2, 2400), rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "NAD_150A_12V", "NAD_150A_MENIC"],
    },
  ],
];

describe("ruční příklady v1.1: zápis sedí s referencí v1.1 (kontrola testu)", () => {
  for (const [nazev, vstup, cekam] of PRIKLADY)
    it(nazev, () => expect(porovnej(referenceV11.navrh(vstup), cekam)).toEqual([]));
  it("příklady 6 a 5 dávají v referenci v1 jiný výsledek (změny 1 a 2 se projeví)", () => {
    const v1 = loadReference();
    expect(v1.navrh(PRIKLADY[5]![1])).toMatchObject({ stav: "ok", prurez: 0.75, pojistka: 10, maxPojistka: 10 });
    expect(v1.navrh(PRIKLADY[4]![1])).toMatchObject({ stav: "ok", pojistka: 250 });
  });
});

describe("ruční příklady v1.1: engine", () => {
  for (const [nazev, vstup, cekam] of PRIKLADY)
    it(nazev, () => expect(porovnej(cekam, navrhVodice({ ...vstup }))).toEqual([]));
});
