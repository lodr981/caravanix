// Kalkulačka průřezu a jištění: port 1:1 z docs/reference/kalkulacka-prurezu-v1.html.
// Logika je zmrazená (docs/KALKULACKA_PRUREZU.md). Engine vrací jen čísla a kódy hlášek, texty jsou v content/cs/.

export type Napeti = 12 | 24;
/** P = zadává se příkon ve W, I = zadává se proud v A. */
export type Rezim = "P" | "I";
export type UbytekProc = 3 | 5 | 10;
/** 2 = vlastní zpětný vodič (+ i −), 1 = mínus přes kostru. */
export type Zpetny = 1 | 2;
/** n = kabel vedený samostatně, h = ve svazku nebo v motorovém prostoru. */
export type Prostredi = "n" | "h";

export interface VstupVodice {
  napeti: Napeti;
  rezim: Rezim;
  /** Příkon [W] nebo proud [A] podle režimu. */
  hodnota: number;
  /** Délka trasy jedné cesty [m]. */
  delka: number;
  ubytekProc: UbytekProc;
  zpetny: Zpetny;
  prostredi: Prostredi;
}

export type KodHlasky =
  | "NEPLATNY_VSTUP" // hodnota nebo délka není kladné číslo
  | "MIMO_ROZSAH" // pro 1,1 × proud neexistuje pojistka v tabulce FUSES
  | "ANI_120_NESTACI" // žádný průřez z MM nevyhoví
  | "ROZHODL_UBYTEK" // rozhodl úbytek napětí (délka trasy)
  | "ROZHODLO_OTEPLENI" // rozhodlo oteplení kabelu a velikost pojistky
  | "MINUS_PRES_KOSTRU"
  | "NAD_150A_12V"
  | "MENIC_OD_1000W";

export interface AwgVelikost {
  oznaceni: string;
  /** Plocha [mm²]. */
  plocha: number;
}

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
  /** Kódy hlášek v pořadí, v jakém je ukazuje reference. */
  hlasky: KodHlasky[];
}

export interface VysledekVodiceChyba {
  stav: "chyba";
  /** Proud [A], pokud jde spočítat (u MIMO_ROZSAH). */
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
  /** Max. pojistka, ve svazku / motorový prostor [A]. */
  maxPojistkaSvazek: number;
  /** Max. délka jedné cesty při úbytku 3 % na 12 V a proudu = maxPojistka [m]. */
  delka3: number;
  /** Totéž pro 10 % [m]. */
  delka10: number;
}

export function navrhVodice(_vstup: VstupVodice): VysledekVodice {
  throw new Error("navrhVodice: zatím neimplementováno");
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  throw new Error("referencniTabulka: zatím neimplementováno");
}
