// Kalkulačka průřezu a jištění, VERZE 1.1 (platná, Radek 16. 11. 2026, docs/reset/KALKULACKA_V1_1.md).
// Výpočet z reference v1 se čtyřmi změnami (docs/KALKULACKA_PRUREZU.md, kapitola „Verze 1.1: co platí“).
// Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/.

import type { AwgVelikost, Napeti, Prostredi, Rezim, UbytekProc, Zpetny } from "./vodic-v1.ts";

export type { AwgVelikost, Napeti, Prostredi, Rezim, UbytekProc, Zpetny };

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

export function navrhVodice(_vstup: VstupVodice): VysledekVodice {
  throw new Error("navrhVodice v1.1: zatím neimplementováno");
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  throw new Error("referencniTabulka v1.1: zatím neimplementováno");
}
