// Kalkulačka průřezu a jištění, VERZE 2 (platná).
// Popis výpočtu: docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“. Rozhodl Radek 16. 11. 2026.
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/.

import type { AwgVelikost, Napeti, Rezim, UbytekProc } from "./vodic-v1.ts";

export type { AwgVelikost, Napeti, Rezim, UbytekProc };

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

export function navrhVodice(_vstup: VstupVodice): VysledekVodice {
  throw new Error("navrhVodice v2: zatím neimplementováno");
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  throw new Error("referencniTabulka v2: zatím neimplementováno");
}
