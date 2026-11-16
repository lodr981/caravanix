// Mřížka vstupů golden testu kalkulačky průřezu (docs/KALKULACKA_PRUREZU.md, sekce Golden test).

import type { Napeti, Prostredi, Rezim, UbytekProc, VstupVodice, Zpetny } from "../../src/vodic.ts";

export const NAPETI: Napeti[] = [12, 24];
export const REZIMY: Rezim[] = ["P", "I"];
export const UBYTKY: UbytekProc[] = [3, 5, 10];
export const ZPETNE: Zpetny[] = [1, 2];
export const PROSTREDI: Prostredi[] = ["n", "h"];

/** Kopie FUSES z reference jen pro generování hran; test si ji ověří proti referenci. */
export const FUSES = [1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250, 300];

/** Rovnoměrně rozložené proudy 0,5–240 A včetně prahů hlášek (150 A) a stropu svazku pro 120 mm² (225/1,1). */
const PROUDY_ZAKLAD = [
  0.5, 0.8, 1, 1.5, 2, 2.7, 3, 4, 5, 6, 7, 8, 10, 12, 14, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 60, 70, 75,
  83.3, 90, 100, 110, 120, 136, 149.99, 150, 150.01, 160, 175, 180, 190, 200, 204.5, 204.55, 210, 220, 230, 240,
];

/** Hrany každé pojistky: těsně pod, na a nad f/1,1 (relativně ±1e-9) a ±0,01 A. */
export function hranyPojistek(): number[] {
  const out: number[] = [];
  for (const f of FUSES) {
    const h = f / 1.1;
    out.push(h * (1 - 1e-9), h, h * (1 + 1e-9), h - 0.01, h + 0.01);
  }
  return out;
}

/** Proudy nad rozsahem (MIMO_ROZSAH: 1,1 × I > 300 A). */
export const PROUDY_MIMO = [272.7, 272.73, 280, 300, 500, 1000];

export const PROUDY: number[] = [...new Set([...PROUDY_ZAKLAD, ...hranyPojistek(), ...PROUDY_MIMO])]
  .filter((x) => x > 0)
  .sort((a, b) => a - b);

/** Délky 0,2–20 m (16 hodnot) + 30 a 50 m pro ANI_120_NESTACI. */
export const DELKY = [0.2, 0.3, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 50];

export interface Kombinace {
  napeti: Napeti;
  rezim: Rezim;
  ubytekProc: UbytekProc;
  zpetny: Zpetny;
  prostredi: Prostredi;
}

export function kombinace(): Kombinace[] {
  const out: Kombinace[] = [];
  for (const napeti of NAPETI)
    for (const rezim of REZIMY)
      for (const ubytekProc of UBYTKY)
        for (const zpetny of ZPETNE) for (const prostredi of PROSTREDI) out.push({ napeti, rezim, ubytekProc, zpetny, prostredi });
  return out;
}

/** V režimu P se proud převede na příkon (proud × napětí). */
export function vstup(k: Kombinace, proud: number, delka: number): VstupVodice {
  return { ...k, hodnota: k.rezim === "P" ? proud * k.napeti : proud, delka };
}

/** Hlavní mřížka pro jednu kombinaci přepínačů: PROUDY × DELKY. */
export function mrizka(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY) for (const d of DELKY) out.push(vstup(k, p, d));
  return out;
}

/** Hrany úbytku: pro vybrané proudy délka, při které je požadovaný průřez přesně (a těsně kolem) každého MM. */
export const PROUDY_HRANY_UBYTKU = [1, 5, 10, 20, 50, 100, 200];
export function hranyUbytku(k: Kombinace, mm: number[]): VstupVodice[] {
  const out: VstupVodice[] = [];
  const rho = k.prostredi === "h" ? 0.0216 : 0.0175;
  const dU = (k.napeti * k.ubytekProc) / 100;
  for (const p of PROUDY_HRANY_UBYTKU)
    for (const m of mm) {
      const L = (dU * m) / (rho * k.zpetny * p); // Areq == m
      for (const d of [L * (1 - 1e-9), L, L * (1 + 1e-9)]) out.push(vstup(k, p, d));
    }
  return out;
}

/** Neplatné vstupy (hodnota nebo délka není kladné číslo) a jejich kombinace. */
export const NEPLATNE = [0, -0, -1, -0.5, -240, NaN];
export function neplatne(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const x of NEPLATNE) {
    out.push({ ...k, hodnota: x, delka: 4 });
    out.push({ ...k, hodnota: k.rezim === "P" ? 120 : 10, delka: x });
    out.push({ ...k, hodnota: x, delka: x });
  }
  return out;
}
