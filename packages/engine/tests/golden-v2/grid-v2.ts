// ARCHIV: nahrazená VERZE 2 (platí v1.1). Typy z src/vodic-v2.ts (jmenný prostor `v2`).
// Mřížka vstupů golden testu verze 2 (docs/KALKULACKA_PRUREZU.md, Golden test, bod 1).

import type { Napeti, Rezim, UbytekProc, Ulozeni, VstupVodice } from "../../src/vodic-v2.ts";
import { MM, PARAMETRY_V2, POJISTKY, i30 } from "./reference-v2.ts";

export const NAPETI: Napeti[] = [12, 24];
export const REZIMY: Rezim[] = ["P", "I"];
export const UBYTKY: UbytekProc[] = [3, 5, 10];
/** Všechna čtyři uložení; `motor` dává jen chybu MOTOR_NEPOCITA. */
export const ULOZENI: Ulozeni[] = ["par", "kostra", "svazek", "motor"];

/** Mez rozsahu: největší I30 z nabízených pojistek (250 A MEGA, cca 199,89 A). */
export const MEZ = Math.max(...POJISTKY.map(i30));

/** Rovnoměrně rozložené proudy 0,5 A až pod mez, včetně prahu NAD_150A_12V (150 A). */
export const PROUDY_ZAKLAD = [
  0.5, 0.8, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20, 22, 25, 28, 30, 33, 36, 40, 45, 50, 55, 60,
  65, 70, 75, 83.3, 90, 100, 110, 120, 130, 136, 140, 145, 149.99, 150, 150.01, 155, 160, 165, 170, 180, 190, 195,
  199.5,
];

/** Hrany kolem I30 každé nabízené pojistky: těsně pod a nad (relativně ±1e-9) a ±0,01 A. „Na“ hraně je zvlášť. */
export function hranyPojistek(): number[] {
  const out: number[] = [];
  for (const p of POJISTKY) {
    const h = i30(p);
    out.push(h * (1 - 1e-9), h * (1 + 1e-9), h - 0.01, h + 0.01);
  }
  return out.filter((x) => x > 0);
}

/** Proudy přesně na I30 každé pojistky (bod 4 zleva doprava, citlivé na pořadí operací). */
export const PROUDY_I30: number[] = POJISTKY.map(i30);

/** Nad mezí rozsahu (žádná pojistka nemá I30 ≥ I): HLAVNI_VEDENI. */
export const PROUDY_NAD = [199.9, 200, 201, 210, 225, 250, 300, 1000];

export const PROUDY: number[] = [...new Set([...PROUDY_ZAKLAD, ...hranyPojistek(), ...PROUDY_NAD])].sort((a, b) => a - b);

/** Délky 0,2–20 m (16 hodnot) a navíc 30, 50, 100 a 200 m pro ANI_120_NESTACI. */
export const DELKY = [0.2, 0.3, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 50, 100, 200];

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

/** Hrany pojistek přesně na I30 × všechny délky. */
export function hranyPojistekPresne(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY_I30) for (const d of DELKY) out.push(vstup(k, p, d));
  return out;
}

/** Délka, při které je ΔU(a) přesně dU pro průřez MM[i] (n podle uložení; motor jako par, výsledek je stejně chyba). */
function delkaHrany(k: Kombinace, proud: number, i: number): number {
  const n = PARAMETRY_V2.ulozeni[k.ulozeni === "motor" ? "par" : k.ulozeni].n;
  const dU = (k.napeti * k.ubytekProc) / 100;
  return (dU * MM[i]!) / (PARAMETRY_V2.rho[i]! * n * proud);
}

export const PROUDY_HRANY_UBYTKU = [1, 5, 10, 20, 50, 100, 150, 199];

/** Hrany úbytku: délky těsně pod a nad hranou ΔU(a) = dU pro každý průřez z MM (relativně ±1e-9). */
export function hranyUbytku(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY_HRANY_UBYTKU)
    for (let i = 0; i < MM.length; i++) {
      const L = delkaHrany(k, p, i);
      for (const d of [L * (1 - 1e-9), L * (1 + 1e-9)]) out.push(vstup(k, p, d));
    }
  return out;
}

/** Hrany úbytku: délka přesně na hraně. Bod 7: ΔU zleva doprava, porovnání bez tolerance (závazné). */
export function hranyUbytkuPresne(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const p of PROUDY_HRANY_UBYTKU) for (let i = 0; i < MM.length; i++) out.push(vstup(k, p, delkaHrany(k, p, i)));
  return out;
}

/** Neplatné vstupy (bod 1): hodnota nebo délka není kladné číslo, zvlášť i obojí (i u motoru: bod 1 je první). */
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

/** Prahy hlášek (bod 11) přesně zadanou hodnotou: měnič od 1 000 W (režim P), nad 150 A (12 V). */
export const PRAHY_P = [999.99, 1000, 1000.01, 1799.88, 1800, 1800.12, 3599.76, 3600, 3600.24];
export const PRAHY_I = [149.99, 150, 150.01];
export function prahy(k: Kombinace): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const hodnota of k.rezim === "P" ? PRAHY_P : PRAHY_I)
    for (const delka of [0.2, 1, 5]) out.push({ ...k, hodnota, delka });
  return out;
}
