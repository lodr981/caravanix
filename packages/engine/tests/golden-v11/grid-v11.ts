// Mřížka vstupů golden testu verze 1.1 (docs/KALKULACKA_PRUREZU.md, kapitola „Golden test“):
// 12 a 24 V × příkon i proud × 3, 5, 10 % × zpětný 1 a 2 × prostředí n a h × proud 0,5 A až nad 200 A
// (hrany kolem f / 1,25 u každé pojistky) × délka 0,2–20 m; navíc hrany úbytku, ANI_120_NESTACI a neplatné vstupy.

import type { Napeti, Prostredi, Rezim, UbytekProc, VstupVodice, Zpetny } from "../../src/vodic.ts";

export const NAPETI: Napeti[] = [12, 24];
export const REZIMY: Rezim[] = ["P", "I"];
export const UBYTKY: UbytekProc[] = [3, 5, 10];
export const ZPETNE: Zpetny[] = [1, 2];
export const PROSTREDI: Prostredi[] = ["n", "h"];

/** FUSES v1.1 (v1 bez 300 A). Jen pro generování hran; test si ji ověří proti referenci v1.1. */
export const FUSES = [1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250];
/** Koeficient pojistky v1.1. */
export const KOEF = 1.25;
/** Mez rozsahu = největší pojistka ÷ 1,25. */
export const MEZ = 250 / KOEF; // 200 A

/** Rovnoměrně rozložené proudy 0,5–200 A včetně prahu 150 A (hlášky) a okolí meze 200 A. */
const PROUDY_ZAKLAD = [
  0.5, 0.8, 1, 1.5, 2, 2.7, 3, 4, 5, 6, 7, 8, 10, 12, 14, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 60, 70, 75,
  83.3, 90, 100, 110, 120, 136, 149.99, 150, 150.01, 160, 170, 175, 180, 185, 190, 195, 199.99, 200,
];

/** Hrany každé pojistky: těsně pod, na a nad f/1,25 (relativně ±1e-9) a ±0,01 A. */
export function hranyPojistek(): number[] {
  const out: number[] = [];
  for (const f of FUSES) {
    const h = f / KOEF;
    out.push(h * (1 - 1e-9), h, h * (1 + 1e-9), h - 0.01, h + 0.01);
  }
  return out;
}

/** Proudy nad mezí 200 A (HLAVNI_VEDENI), včetně starých mezí v1 (240 A) a hran pro mutanty s 300 A. */
export const PROUDY_NAD = [200.0000001, 200.01, 201, 205, 210, 220, 225, 230, 239.99, 240, 240.01, 250, 272.73, 280, 300, 500, 1000];

export const PROUDY: number[] = [...new Set([...PROUDY_ZAKLAD, ...hranyPojistek(), ...PROUDY_NAD])]
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

/** Prahy hlášek v režimu P: měnič od 1 000 W (999,99 / 1 000 / 1 000,01 W) a příkon odpovídající 150 A. */
export function prahyPrikonu(k: Kombinace): VstupVodice[] {
  if (k.rezim !== "P") return [];
  const out: VstupVodice[] = [];
  const w150 = 150 * k.napeti;
  for (const w of [999.99, 1000, 1000.01, w150 - 0.01, w150, w150 + 0.01, MEZ * k.napeti, MEZ * k.napeti + 0.01])
    for (const d of [0.2, 1, 5]) out.push({ ...k, hodnota: w, delka: d });
  return out;
}

/** Hrany úbytku: pro vybrané proudy délka, při které je požadovaný průřez přesně (a těsně kolem) každého MM. */
export const PROUDY_HRANY_UBYTKU = [1, 5, 10, 20, 50, 100, 150, 200];
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

/** Neplatné vstupy (hodnota nebo délka není kladné číslo). */
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

/** Všechny vstupy jedné kombinace (bez neplatných), pro souhrny a mutanty. */
export function vse(k: Kombinace, mm: number[]): VstupVodice[] {
  return [...mrizka(k), ...prahyPrikonu(k), ...hranyUbytku(k, mm)];
}
