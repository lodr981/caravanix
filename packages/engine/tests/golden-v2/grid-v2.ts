// Mřížka vstupů golden testu verze 2 (docs/KALKULACKA_PRUREZU.md, Golden test, bod 1).

import type { Napeti, Rezim, UbytekProc, Ulozeni, VstupVodice } from "../../src/vodic.ts";
import { FUSES_V2, MM, PARAMETRY_V2, ULOZENI } from "./reference-v2.ts";

export const NAPETI: Napeti[] = [12, 24];
export const REZIMY: Rezim[] = ["P", "I"];
export const UBYTKY: UbytekProc[] = [3, 5, 10];
export const FAKTOR = 1.25;

/** Rovnoměrně rozložené proudy 0,5–200 A včetně prahu NAD_150A_12V (150 A) a meze rozsahu 200 A. */
export const PROUDY_ZAKLAD = [
  0.5, 0.8, 1, 1.5, 2, 2.7, 3, 4, 5, 6, 7, 8, 10, 12, 14, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 55, 60, 70, 75,
  83.3, 90, 100, 110, 120, 130, 136, 140, 149.99, 150, 150.01, 160, 170, 175, 180, 190, 199.99, 200,
];

/** Hrany každé pojistky z FUSES (bez 300): těsně pod, na a nad f / 1,25 (relativně ±1e-9) a ±0,01 A. */
export function hranyPojistek(): number[] {
  const out: number[] = [];
  for (const f of FUSES_V2) {
    const h = f / FAKTOR;
    out.push(h * (1 - 1e-9), h, h * (1 + 1e-9), h - 0.01, h + 0.01);
  }
  return out;
}

/** Nad mezí rozsahu (žádná pojistka ≥ 1,25 × I, tj. I > 200 A): HLAVNI_VEDENI. */
export const PROUDY_NAD = [200.01, 201, 210, 225, 240, 250, 300, 1000];

export const PROUDY: number[] = [...new Set([...PROUDY_ZAKLAD, ...hranyPojistek(), ...PROUDY_NAD])]
  .filter((x) => x > 0)
  .sort((a, b) => a - b);

/** Délky 0,2–20 m (16 hodnot) a navíc 30, 50 a 100 m pro ANI_120_NESTACI. */
export const DELKY = [0.2, 0.3, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 50, 100];

export interface Kombinace {
  napeti: Napeti;
  rezim: Rezim;
  ubytekProc: UbytekProc;
  ulozeni: Ulozeni;
}

/** 2 napětí × 2 režimy × 3 úbytky × 4 uložení = 48 kombinací. */
export function kombinace(): Kombinace[] {
  const out: Kombinace[] = [];
  for (const napeti of NAPETI)
    for (const rezim of REZIMY)
      for (const ubytekProc of UBYTKY) for (const ulozeni of ULOZENI) out.push({ napeti, rezim, ubytekProc, ulozeni });
  return out;
}

/** V režimu P se proud převede na příkon (proud × napětí). */
export function vstup(k: Kombinace, proud: number, delka: number): VstupVodice {
  return { ...k, hodnota: k.rezim === "P" ? proud * k.napeti : proud, delka };
}

export function mrizka(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY) for (const d of DELKY) out.push(vstup(k, p, d));
  return out;
}

/** Délka, při které je Areq přesně průřez m (ρ a n podle uložení). */
function delkaHrany(k: Kombinace, proud: number, m: number): number {
  const u = PARAMETRY_V2.ulozeni[k.ulozeni];
  const dU = (k.napeti * k.ubytekProc) / 100;
  return (dU * m) / (u.rho * u.n * proud);
}

export const PROUDY_HRANY_UBYTKU = [1, 5, 10, 20, 50, 100, 150, 200];

/** Hrany úbytku: délky těsně pod a nad hranou Areq = průřez z MM (relativně ±1e-9). */
export function hranyUbytku(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY_HRANY_UBYTKU)
    for (const m of MM) {
      const L = delkaHrany(k, p, m);
      for (const d of [L * (1 - 1e-9), L * (1 + 1e-9)]) out.push(vstup(k, p, d));
    }
  return out;
}

/** Hrany úbytku: délka přesně na hraně. Citlivé na pořadí operací v bodu 3 (viz Otázky pro Radka). */
export function hranyUbytkuPresne(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY_HRANY_UBYTKU) for (const m of MM) out.push(vstup(k, p, delkaHrany(k, p, m)));
  return out;
}

/** Neplatné vstupy (bod 1): hodnota nebo délka není kladné číslo, zvlášť i obojí. */
export const NEPLATNE = [0, -0, -1, -0.5, -200, NaN, -Infinity];
export function neplatne(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const x of NEPLATNE) {
    out.push({ ...k, hodnota: x, delka: 4 });
    out.push({ ...k, hodnota: k.rezim === "P" ? 120 : 10, delka: x });
    out.push({ ...k, hodnota: x, delka: x });
  }
  return out;
}

/** Prahy hlášek (bod 10) přesně zadanou hodnotou: měnič od 1 000 W (režim P), nad 150 A (12 V). */
export const PRAHY_P = [999.99, 1000, 1000.01, 1799.88, 1800, 1800.12, 3599.76, 3600, 3600.24];
export const PRAHY_I = [149.99, 150, 150.01];
export function prahy(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const hodnota of k.rezim === "P" ? PRAHY_P : PRAHY_I)
    for (const delka of [0.2, 1, 5]) out.push({ ...k, hodnota, delka });
  return out;
}
