// Kalkulačka průřezu a jištění, VERZE 1.1 (platná, Radek 16. 11. 2026, docs/reset/KALKULACKA_V1_1.md).
// Výpočet z reference v1 se čtyřmi změnami (docs/KALKULACKA_PRUREZU.md, kapitola „Verze 1.1: co platí“).
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/.

import type { AwgVelikost, Napeti, Prostredi, Rezim, UbytekProc, Zpetny } from "./vodic-v1.ts";
import { AMP, AWG, CAPH, CAPN, FUSES as FUSES_V1, K_H, MM, RHO_H, RHO_N, amp, interp, nearestAwg } from "./vodic-v1.ts";

export type { AwgVelikost, Napeti, Prostredi, Rezim, UbytekProc, Zpetny };
export { AMP, AWG, CAPH, CAPN, K_H, MM, RHO_H, RHO_N, amp, interp, nearestAwg };

export interface VstupVodice {
  napeti: Napeti;
  rezim: Rezim;
  /** Příkon [W] nebo proud [A] podle režimu. */
  hodnota: number;
  /** Délka trasy jedné cesty [m]. */
  delka: number;
  ubytekProc: UbytekProc;
  /** 2 = vlastní zpětný vodič (+ i −), 1 = mínus přes kostru. */
  zpetny: Zpetny;
  /** n = kabel vedený samostatně, h = ve svazku. */
  prostredi: Prostredi;
}

export type KodHlasky =
  | "NEPLATNY_VSTUP" // hodnota nebo délka není kladné číslo
  | "HLAVNI_VEDENI" // žádná pojistka z FUSES (bez 300 A) není ≥ 1,25 × proud (nad 200 A)
  | "ANI_120_NESTACI" // žádný průřez z MM nevyhoví
  | "ROZHODL_UBYTEK"
  | "ROZHODLO_OTEPLENI"
  | "MINUS_PRES_KOSTRU"
  | "NAD_150A_12V" // proud nad 150 A a 12 V
  | "NAD_150A_MENIC" // proud nad 150 A (jakékoli napětí)
  | "MENIC_OD_1000W";

export interface VysledekVodiceOk {
  stav: "ok";
  /** Průřez [mm²]. */
  prurez: number;
  /** První AWG, který splní úbytek i pojistku; null = „použijte metrický“. */
  awg: AwgVelikost | null;
  /** Doporučená pojistka [A]. */
  pojistka: number;
  /** Max. pojistka pro zvolený průřez a prostředí [A]. */
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
  /** Kódy hlášek v pořadí podle zadání. */
  hlasky: KodHlasky[];
}

export interface VysledekVodiceChyba {
  stav: "chyba";
  /** Proud [A] u HLAVNI_VEDENI. */
  proud?: number;
  hlasky: KodHlasky[];
}

export type VysledekVodice = VysledekVodiceOk | VysledekVodiceChyba;

export interface RadekTabulky {
  /** Průřez [mm²]. */
  prurez: number;
  /** Nejbližší AWG podle logaritmu plochy. */
  awg: AwgVelikost;
  /** Max. pojistka, kabel vedený samostatně [A]. */
  maxPojistka: number;
  /** Max. pojistka, ve svazku [A]. */
  maxPojistkaSvazek: number;
  /** Max. délka jedné cesty při úbytku 3 % na 12 V a proudu = maxPojistka [m]. */
  delka3: number;
  /** Totéž pro 10 % [m]. */
  delka10: number;
}

// ---------------------------------------------------------------------------
// Konstanty v1.1. Tabulky a interpolace jsou beze změny z v1.
// ---------------------------------------------------------------------------

/** Řada pojistek [A] bez 300 A (změna 2: MEGA 300 A je jen zkratová ochrana). */
export const FUSES: readonly number[] = FUSES_V1.filter((f) => f !== 300);

/** Minimální poměr pojistky k proudu (změna 1). */
export const POMER_POJISTKY = 1.25;

/** Hranice proudu pro hlášky nad 150 A. */
const PROUD_150 = 150;

/** Největší pojistka z řady v1.1, kterou kabel o ploše `a` snese; k = 1 samostatně, k < 1 ve svazku. */
export function maxFuse(a: number, k: number): number {
  const lim = Math.min(amp(a) * k, interp(k < 1 ? CAPH : CAPN, a));
  let f = 0;
  for (const x of FUSES) if (x <= lim + 1e-9) f = x;
  return f;
}

// ---------------------------------------------------------------------------
// Výpočet: v1 se změnami 1–4.
// ---------------------------------------------------------------------------

export function navrhVodice(vstup: VstupVodice): VysledekVodice {
  const { napeti: U, rezim, hodnota: v, delka: L, ubytekProc: drop, zpetny: ret, prostredi } = vstup;
  if (!(v > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };

  const I = rezim === "P" ? v / U : v;
  const hot = prostredi === "h";
  const rho = hot ? RHO_H : RHO_N;
  const k = hot ? K_H : 1;
  const dU = (U * drop) / 100;
  const Lc = L * ret;
  const Areq = (rho * Lc * I) / dU;

  // Změny 1 a 2: pojistka ≥ 1,25 × proud z řady bez 300 A; jinak hlavní vedení.
  const fuse = FUSES.find((f) => f >= I * POMER_POJISTKY);
  if (fuse === undefined) return { stav: "chyba", proud: I, hlasky: ["HLAVNI_VEDENI"] };

  const ok = (a: number) => a >= Areq && maxFuse(a, k) >= fuse;
  const idx = MM.findIndex(ok);
  if (idx < 0) return { stav: "chyba", hlasky: ["ANI_120_NESTACI"] };

  const A = MM[idx]!;
  const iDrop = MM.findIndex((m) => m >= Areq);
  const iFuse = MM.findIndex((m) => maxFuse(m, k) >= fuse);
  const rozhodlo = iDrop >= iFuse ? "ubytek" : "oteplen";
  const w = AWG.find((x) => ok(x[1]));
  const dUa = (rho * Lc * I) / A;

  const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
  if (ret === 1) hlasky.push("MINUS_PRES_KOSTRU");
  if (I > PROUD_150 && U === 12) hlasky.push("NAD_150A_12V");
  if (I > PROUD_150) hlasky.push("NAD_150A_MENIC"); // změna 3
  if (rezim === "P" && v >= 1000) hlasky.push("MENIC_OD_1000W");

  return {
    stav: "ok",
    prurez: A,
    awg: w ? { oznaceni: w[0], plocha: w[1] } : null,
    pojistka: fuse,
    maxPojistka: maxFuse(A, k),
    proud: I,
    prikon: rezim === "P" ? v : I * U,
    ubytekV: dUa,
    ubytekProc: (dUa / U) * 100,
    napetiUSpotrebice: U - dUa,
    ztrata: dUa * I,
    maxDelka: (dU * A) / (rho * ret * I),
    rozhodlo,
    hlasky,
  };
}

/** Referenční tabulka: prvních 14 průřezů z MM (jako v1, maxFuse bez 300 A). */
export function referencniTabulka(): RadekTabulky[] {
  return MM.slice(0, 14).map((m) => {
    const f = maxFuse(m, 1);
    return {
      prurez: m,
      awg: nearestAwg(m),
      maxPojistka: f,
      maxPojistkaSvazek: maxFuse(m, 0.7),
      delka3: (0.36 * m) / (2 * 0.0175 * f),
      delka10: (1.2 * m) / (2 * 0.0175 * f),
    };
  });
}
