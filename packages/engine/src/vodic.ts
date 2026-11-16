// Kalkulačka průřezu a jištění, VERZE 2 (platná, po druhém kole rozhodnutí 16. 11. 2026).
// Popis výpočtu: docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“.
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/. Datové tabulky jsou v @caravanix/data.

import { odporVodicu, pojistky } from "@caravanix/data";
import type { Pojistka, RodinaPojistky } from "@caravanix/data";
import type { AwgVelikost, Napeti, Rezim, UbytekProc } from "./vodic-v1.ts";
import { AMP, AWG, CAPH, CAPN, MM, amp, interp, nearestAwg } from "./vodic-v1.ts";

export type { AwgVelikost, Napeti, Rezim, RodinaPojistky, UbytekProc };
export { AMP, AWG, CAPH, CAPN, MM, amp, interp, nearestAwg };

/**
 * Uložení vodiče:
 * - `par`: plus a mínus vedle sebe, připevněné k povrchu (výchozí),
 * - `kostra`: jeden vodič, mínus přes kostru,
 * - `svazek`: ve svazku, nejvýš 3 obvody,
 * - `motor`: motorový prostor (v alfě se nepočítá).
 */
export type Ulozeni = "par" | "kostra" | "svazek" | "motor";

/** Uložení, pro která kalkulačka počítá. */
export type UlozeniPocitane = Exclude<Ulozeni, "motor">;

export interface VstupVodice {
  napeti: Napeti;
  rezim: Rezim;
  /** Příkon [W] nebo proud [A] podle režimu. */
  hodnota: number;
  /** Délka trasy jedné cesty [m]. */
  delka: number;
  ubytekProc: UbytekProc;
  ulozeni: Ulozeni;
}

export type KodHlasky =
  | "NEPLATNY_VSTUP" // hodnota nebo délka není kladné číslo
  | "MOTOR_NEPOCITA" // uložení `motor`: nepočítá se, kabel třídy C/D podle tabulky výrobce
  | "HLAVNI_VEDENI" // žádná nabízená pojistka nemá I30 ≥ proud: Class T u baterie, odborník
  | "ANI_120_NESTACI" // žádný průřez z MM nevyhoví
  | "ROZHODL_UBYTEK"
  | "ROZHODLO_OTEPLENI"
  | "MINUS_PRES_KOSTRU" // uložení `kostra`
  | "SVAZEK_NEJVYS_3_OBVODY" // uložení `svazek`
  | "NAD_150A_12V"
  | "MENIC_OD_1000W";

export interface VysledekVodiceOk {
  stav: "ok";
  /** Průřez [mm²]. */
  prurez: number;
  /** První AWG, který splní úbytek i pojistku; null = „použijte metrický“. */
  awg: AwgVelikost | null;
  /** Doporučená pojistka, jmenovitá hodnota [A]. */
  pojistka: number;
  /** Rodina doporučené pojistky. */
  rodinaPojistky: RodinaPojistky;
  /** Max. pojistka pro zvolený průřez a uložení [A]. */
  maxPojistka: number;
  /** Proud spotřebiče [A]. */
  proud: number;
  /** Příkon [W] (v režimu P zadaná hodnota, v režimu I proud × napětí). */
  prikon: number;
  /** Úbytek napětí v kabelu [V]. */
  ubytekV: number;
  /** Úbytek napětí [%]. */
  ubytekProc: number;
  /** Napětí u spotřebiče [V]. */
  napetiUSpotrebice: number;
  /** Ztráta (teplo v kabelu) [W]. */
  ztrata: number;
  /** Max. délka jedné cesty na zvoleném průřezu při tomto proudu [m]. */
  maxDelka: number;
  rozhodlo: "ubytek" | "oteplen";
  /** Kódy hlášek v pořadí podle zadání (bod 11). */
  hlasky: KodHlasky[];
}

export interface VysledekVodiceChyba {
  stav: "chyba";
  /** Proud [A] u HLAVNI_VEDENI a ANI_120_NESTACI. */
  proud?: number;
  hlasky: KodHlasky[];
}

export type VysledekVodice = VysledekVodiceOk | VysledekVodiceChyba;

export interface RadekTabulky {
  /** Průřez [mm²]. */
  prurez: number;
  /** Měrný odpor z tabulky [Ω·mm²/m]. */
  rho: number;
  /** Nejbližší AWG podle logaritmu plochy. */
  awg: AwgVelikost;
  /** Max. pojistka pro každé počítané uložení [A]. */
  maxPojistka: Record<UlozeniPocitane, number>;
  /** Max. délka jedné cesty, uložení `par`, 12 V, úbytek 3 %, proud = maxPojistka.par [m]. */
  delka3: number;
  /** Totéž pro 10 % [m]. */
  delka10: number;
}

// ---------------------------------------------------------------------------
// Parametry uložení a datové tabulky.
// ---------------------------------------------------------------------------

export interface ParametryUlozeni {
  /** Násobek délky (2 = plus i mínus vlastním kabelem, 1 = mínus přes kostru). */
  n: 1 | 2;
  /** Koeficient zatížitelnosti proti tabulce VDE. */
  k: number;
  /** Strop max. pojistky. */
  strop: readonly number[];
}

export const ULOZENI: Readonly<Record<UlozeniPocitane, ParametryUlozeni>> = {
  par: { n: 2, k: 0.76, strop: CAPN },
  kostra: { n: 1, k: 1.0, strop: CAPN },
  svazek: { n: 2, k: 0.53, strop: CAPH },
};

/** Nabízené pojistky seřazené podle jmenovité hodnoty, s I30. */
export const POJISTKY: readonly (Pojistka & { trvaly30: number })[] = [...pojistky.polozky]
  .sort((a, b) => a.jmenovita - b.jmenovita)
  // bod 4: I30 = I20 + (I65 − I20) × (30 − 20) / (65 − 20), počítáno zleva doprava
  .map((p) => ({ ...p, trvaly30: p.trvaly20 + ((p.trvaly65 - p.trvaly20) * (30 - 20)) / (65 - 20) }));

const RHO_PODLE_MM: readonly number[] = MM.map((m) => {
  const r = odporVodicu.polozky.find((o) => o.prurez === m);
  if (!r) throw new Error(`Chybí odpor pro ${m} mm² v @caravanix/data`);
  return r.rho;
});

/** Měrný odpor [Ω·mm²/m] pro průřez z MM. */
export function rho(a: number): number {
  const i = MM.indexOf(a);
  if (i < 0) throw new Error(`rho: ${a} mm² není v tabulce MM`);
  return RHO_PODLE_MM[i]!;
}

/** Měrný odpor pro libovolnou plochu (AWG): větší ρ ze dvou sousedních průřezů (bod 9). */
export function rhoPlochy(p: number): number {
  const i = MM.indexOf(p);
  if (i >= 0) return RHO_PODLE_MM[i]!;
  if (p < MM[0]!) return RHO_PODLE_MM[0]!;
  if (p > MM[MM.length - 1]!) return RHO_PODLE_MM[MM.length - 1]!;
  const j = MM.findIndex((m) => m > p);
  return Math.max(RHO_PODLE_MM[j - 1]!, RHO_PODLE_MM[j]!);
}

/** Bod 6: největší nabízená pojistka, kterou kabel o ploše `a` v daném uložení snese; 0 = žádná. */
export function maxFuse(a: number, ulozeni: UlozeniPocitane): number {
  const u = ULOZENI[ulozeni];
  const lim = Math.min(amp(a) * u.k, interp(u.strop, a));
  let f = 0;
  for (const p of POJISTKY) if (p.jmenovita <= lim + 1e-9) f = p.jmenovita;
  return f;
}

// ---------------------------------------------------------------------------
// Výpočet (body 1–11 zadání verze 2).
// ---------------------------------------------------------------------------

export function navrhVodice(vstup: VstupVodice): VysledekVodice {
  const { napeti: U, rezim, hodnota: v, delka: L, ubytekProc: d, ulozeni } = vstup;
  // 1
  if (!(v > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };
  // 2
  if (ulozeni === "motor") return { stav: "chyba", hlasky: ["MOTOR_NEPOCITA"] };
  // 3
  const I = rezim === "P" ? v / U : v;
  // 4, 5
  const poj = POJISTKY.find((p) => p.trvaly30 >= I);
  if (poj === undefined) return { stav: "chyba", proud: I, hlasky: ["HLAVNI_VEDENI"] };
  const fuse = poj.jmenovita;
  // 7
  const { n } = ULOZENI[ulozeni];
  const dU = (U * d) / 100;
  const ubytek = (r: number, a: number) => (r * L * n * I) / a;
  const vyhovi = (r: number, a: number) => ubytek(r, a) <= dU && maxFuse(a, ulozeni) >= fuse;
  const idx = MM.findIndex((m) => vyhovi(rho(m), m));
  if (idx < 0) return { stav: "chyba", proud: I, hlasky: ["ANI_120_NESTACI"] };
  const A = MM[idx]!;
  // 8
  const iDrop = MM.findIndex((m) => ubytek(rho(m), m) <= dU);
  const iFuse = MM.findIndex((m) => maxFuse(m, ulozeni) >= fuse);
  const rozhodlo = iDrop >= iFuse ? "ubytek" : "oteplen";
  // 9
  const w = AWG.find((x) => vyhovi(rhoPlochy(x[1]), x[1]));
  // 10
  const rA = rho(A);
  const dUa = ubytek(rA, A);
  // 11
  const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
  if (ulozeni === "kostra") hlasky.push("MINUS_PRES_KOSTRU");
  if (ulozeni === "svazek") hlasky.push("SVAZEK_NEJVYS_3_OBVODY");
  if (I > 150 && U === 12) hlasky.push("NAD_150A_12V");
  if (rezim === "P" && v >= 1000) hlasky.push("MENIC_OD_1000W");

  return {
    stav: "ok",
    prurez: A,
    awg: w ? { oznaceni: w[0], plocha: w[1] } : null,
    pojistka: fuse,
    rodinaPojistky: poj.rodina,
    maxPojistka: maxFuse(A, ulozeni),
    proud: I,
    prikon: rezim === "P" ? v : I * U,
    ubytekV: dUa,
    ubytekProc: (dUa / U) * 100,
    napetiUSpotrebice: U - dUa,
    ztrata: dUa * I,
    maxDelka: (dU * A) / (rA * n * I),
    rozhodlo,
    hlasky,
  };
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  return MM.slice(0, 14).map((m) => {
    const f = maxFuse(m, "par");
    const r = rho(m);
    return {
      prurez: m,
      rho: r,
      awg: nearestAwg(m),
      maxPojistka: { par: f, kostra: maxFuse(m, "kostra"), svazek: maxFuse(m, "svazek") },
      delka3: (0.36 * m) / (2 * r * f),
      delka10: (1.2 * m) / (2 * r * f),
    };
  });
}
