// Kalkulačka průřezu a jištění, VERZE 2 (platná).
// Popis výpočtu: docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“. Rozhodl Radek 16. 11. 2026.
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/.

import type { AwgVelikost, Napeti, Rezim, UbytekProc } from "./vodic-v1.ts";
import { AMP, AWG, CAPH, CAPN, FUSES as FUSES_V1, MM, amp, interp, nearestAwg } from "./vodic-v1.ts";

export type { AwgVelikost, Napeti, Rezim, UbytekProc };
export { AMP, AWG, CAPH, CAPN, MM, amp, interp, nearestAwg };

/**
 * Uložení vodiče:
 * - `par`: plus a mínus vedle sebe (výchozí),
 * - `kostra`: jeden vodič, mínus přes kostru,
 * - `svazek`: ve svazku,
 * - `motor`: motorový prostor.
 */
export type Ulozeni = "par" | "kostra" | "svazek" | "motor";

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
  | "HLAVNI_VEDENI" // pro 1,25 × proud neexistuje pojistka v řadě: hlavní vedení, Class T, odborník
  | "ANI_120_NESTACI" // žádný průřez z MM nevyhoví
  | "ROZHODL_UBYTEK"
  | "ROZHODLO_OTEPLENI"
  | "MINUS_PRES_KOSTRU" // uložení `kostra`
  | "MOTOR_VYSSI_TRIDA" // uložení `motor`: kabel třídy C 125 °C nebo D 150 °C
  | "NAD_150A_12V"
  | "MENIC_OD_1000W";

export interface VysledekVodiceOk {
  stav: "ok";
  /** Průřez [mm²]. */
  prurez: number;
  /** První AWG, který splní úbytek i pojistku; null = „použijte metrický“. */
  awg: AwgVelikost | null;
  /** Doporučená pojistka [A]. */
  pojistka: number;
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
  /** Kódy hlášek v pořadí podle zadání (bod 10). */
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
  /** Nejbližší AWG podle logaritmu plochy. */
  awg: AwgVelikost;
  /** Max. pojistka pro každé uložení [A]. */
  maxPojistka: Record<Ulozeni, number>;
  /** Max. délka jedné cesty, uložení `par`, 12 V, úbytek 3 %, proud = maxPojistka.par [m]. */
  delka3: number;
  /** Totéž pro 10 % [m]. */
  delka10: number;
}

// ---------------------------------------------------------------------------
// Konstanty verze 2. Tabulky MM, AMP, AWG, CAPN, CAPH a funkce amp/interp jsou beze změny z v1.
// ---------------------------------------------------------------------------

/** Řada pojistek [A] bez 300 A (MEGA 300 A je podle výrobce jen zkratová ochrana). */
export const FUSES: readonly number[] = FUSES_V1.filter((f) => f !== 300);

/** Měrný odpor mědi [Ω·mm²/m]: horní mez lanka FLRY-B (K-VODIC-0001). */
export const RHO = 0.0191;
/** Měrný odpor při ~80 °C: 0,0191 × 0,0216 / 0,0175 = 0,023575, zaokrouhleno nahoru. */
export const RHO_TEPLE = 0.0236;
/**
 * Minimální poměr pojistky k proudu. Dočasná hodnota do rozhodnutí o rodinách pojistek
 * (docs/KALKULACKA_PRUREZU.md, Typ pojistky).
 */
export const POMER_POJISTKY = 1.25;

export interface ParametryUlozeni {
  /** Násobek délky (2 = plus i mínus vlastním kabelem, 1 = mínus přes kostru). */
  n: 1 | 2;
  /** Koeficient zatížitelnosti proti tabulce VDE. */
  k: number;
  rho: number;
  /** Strop max. pojistky. */
  strop: readonly number[];
}

export const ULOZENI: Readonly<Record<Ulozeni, ParametryUlozeni>> = {
  par: { n: 2, k: 0.8, rho: RHO, strop: CAPN },
  kostra: { n: 1, k: 1.0, rho: RHO, strop: CAPN },
  svazek: { n: 2, k: 0.53, rho: RHO_TEPLE, strop: CAPH },
  motor: { n: 2, k: 0.5, rho: RHO_TEPLE, strop: CAPH },
};

/** Největší pojistka z řady v2, kterou kabel o ploše `a` v daném uložení snese; 0 = žádná. */
export function maxFuse(a: number, ulozeni: Ulozeni): number {
  const u = ULOZENI[ulozeni];
  const lim = Math.min(amp(a) * u.k, interp(u.strop, a));
  let f = 0;
  for (const x of FUSES) if (x <= lim + 1e-9) f = x;
  return f;
}

// ---------------------------------------------------------------------------
// Výpočet (body 1–10 zadání verze 2).
// ---------------------------------------------------------------------------

export function navrhVodice(vstup: VstupVodice): VysledekVodice {
  const { napeti: U, rezim, hodnota: v, delka: L, ubytekProc: d, ulozeni } = vstup;
  // 1
  if (!(v > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };
  // 2
  const I = rezim === "P" ? v / U : v;
  // 3
  const { n, rho } = ULOZENI[ulozeni];
  const dU = (U * d) / 100;
  const Areq = (rho * L * n * I) / dU;
  // 4
  const fuse = FUSES.find((f) => f >= POMER_POJISTKY * I);
  if (fuse === undefined) return { stav: "chyba", proud: I, hlasky: ["HLAVNI_VEDENI"] };
  // 5, 6
  const ok = (a: number) => a >= Areq && maxFuse(a, ulozeni) >= fuse;
  const idx = MM.findIndex(ok);
  if (idx < 0) return { stav: "chyba", proud: I, hlasky: ["ANI_120_NESTACI"] };
  const A = MM[idx]!;
  // 7
  const iDrop = MM.findIndex((m) => m >= Areq);
  const iFuse = MM.findIndex((m) => maxFuse(m, ulozeni) >= fuse);
  const rozhodlo = iDrop >= iFuse ? "ubytek" : "oteplen";
  // 8
  const w = AWG.find((x) => ok(x[1]));
  // 9
  const dUa = (rho * L * n * I) / A;
  // 10
  const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
  if (ulozeni === "kostra") hlasky.push("MINUS_PRES_KOSTRU");
  if (ulozeni === "motor") hlasky.push("MOTOR_VYSSI_TRIDA");
  if (I > 150 && U === 12) hlasky.push("NAD_150A_12V");
  if (rezim === "P" && v >= 1000) hlasky.push("MENIC_OD_1000W");

  return {
    stav: "ok",
    prurez: A,
    awg: w ? { oznaceni: w[0], plocha: w[1] } : null,
    pojistka: fuse,
    maxPojistka: maxFuse(A, ulozeni),
    proud: I,
    prikon: rezim === "P" ? v : I * U,
    ubytekV: dUa,
    ubytekProc: (dUa / U) * 100,
    napetiUSpotrebice: U - dUa,
    ztrata: dUa * I,
    maxDelka: (dU * A) / (rho * n * I),
    rozhodlo,
    hlasky,
  };
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  return MM.slice(0, 14).map((m) => {
    const f = maxFuse(m, "par");
    return {
      prurez: m,
      awg: nearestAwg(m),
      maxPojistka: {
        par: f,
        kostra: maxFuse(m, "kostra"),
        svazek: maxFuse(m, "svazek"),
        motor: maxFuse(m, "motor"),
      },
      delka3: (0.36 * m) / (2 * RHO * f),
      delka10: (1.2 * m) / (2 * RHO * f),
    };
  });
}
