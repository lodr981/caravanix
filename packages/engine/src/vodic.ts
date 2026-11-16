// Kalkulačka průřezu a jištění, VERZE 2 (platná, po druhém kole rozhodnutí 16. 11. 2026).
// Popis výpočtu: docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“.
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/. Datové tabulky jsou v @caravanix/data.

import type { RodinaPojistky } from "@caravanix/data";
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

export function navrhVodice(_vstup: VstupVodice): VysledekVodice {
  throw new Error("navrhVodice v2 (2. kolo): zatím neimplementováno");
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  throw new Error("referencniTabulka v2 (2. kolo): zatím neimplementováno");
}
