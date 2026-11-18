// Katalogy spotřebičů a komponent, pravidla, karty tvrzení a jejich schémata.
// Každá hodnota v datových tabulkách nese ID karty tvrzení (docs/karty/).

import odporVodicuJson from "./odpor-vodicu.json" with { type: "json" };
import pojistkyJson from "./pojistky.json" with { type: "json" };
import solarMestaJson from "./solar-mesta.json" with { type: "json" };
import doporuceniJson from "./doporuceni-vyrobcu.json" with { type: "json" };

export interface OdporVodice {
  /** Průřez [mm²]. */
  prurez: number;
  /** Max. odpor vodiče ze zdroje [Ω/km]. */
  odporOhmKm: number;
  /** Měrný odpor [Ω·mm²/m] = odporOhmKm × prurez / 1000, zaokrouhleno na 4 desetinná místa. */
  rho: number;
  karta: string;
}

export type RodinaPojistky = "ATOF" | "MIDI" | "MEGA";

export interface Pojistka {
  rodina: RodinaPojistky;
  /** Jmenovitý proud [A]. */
  jmenovita: number;
  /** Dovolený trvalý proud při 20 °C podle tabulky výrobce [A]. */
  trvaly20: number;
  /** Dovolený trvalý proud při 65 °C podle tabulky výrobce [A]. */
  trvaly65: number;
  karta: string;
}

export interface Tabulka<T> {
  verze: string;
  polozky: readonly T[];
}

export const odporVodicu: Tabulka<OdporVodice> = odporVodicuJson as Tabulka<OdporVodice>;
export const pojistky: Tabulka<Pojistka> = pojistkyJson as Tabulka<Pojistka>;

export interface MestoSolar {
  id: string;
  nazev: string;
  zeme: string;
  /** Průměrný denní výnos panelu vodorovně [kWh na 1 kWp za den], leden–prosinec, bez ztrát systému. */
  kWhNaKWpDen: number[];
  karta: string;
}

export interface DataSolarMesta {
  verze: string;
  vychoziZtraty: number;
  kartaZtraty: string;
  mesta: MestoSolar[];
}

/** Měsíční průměry výnosu soláru podle měst (K-SOLAR-0001) a výchozí ztráty systému (K-SOLAR-0002). */
export const solarMesta: DataSolarMesta = solarMestaJson as DataSolarMesta;

import spotrebiceJson from "./spotrebice.json" with { type: "json" };

export type SkupinaSpotrebice = "chlazeni" | "klimatizace" | "topeni" | "vareni" | "voda" | "elektronika";

export interface SpotrebicKatalogu {
  id: string;
  skupina: SkupinaSpotrebice;
  nazev: string;
  napajeni: "12V" | "12/24V" | "230V";
  /** Typický příkon v běhu [W]. */
  prikonW: number;
  /** Rozsah příkonu typických modelů [W]. */
  rozsahW: [number, number];
  /** Typická doba chodu za den [h], je-li podložená; jinak null. */
  hodinDenne: number | null;
  /** Rozběh nebo start [W], je-li v datasheetu; jinak null. */
  spickaW: number | null;
  poznamka: string;
  karta: string;
}

/** Přehledový katalog spotřebičů s typickými příkony (karty K-SPOTR-0001 až 0006). */
export const spotrebice: Tabulka<SpotrebicKatalogu> = spotrebiceJson as unknown as Tabulka<SpotrebicKatalogu>;

import r1Json from "./projekty/r1.json" with { type: "json" };

export type RezimSchematu = "den" | "noc" | "jizda" | "kemp";

export interface KomponentaProjektu {
  id: string;
  typ: string;
  nazev: string;
  /** Logická poloha pro rozložení schématu (sloupec zleva, řádek shora). */
  sloupec: number;
  radek: number;
}

export interface KabelProjektu {
  id: string;
  od: string;
  do: string;
  /** solar = kabel od panelů (dimenzuje se podle návodu regulátoru, kalkulačka průřezu ho nepočítá). */
  /** solar = kabel od panelů, ac = přívod 230 V k nabíječce; oba se volí podle návodu výrobce, kalkulačka průřezu je nepočítá. */
  druh?: "solar" | "ac";
  proudA?: number;
  prikonW?: number;
  delkaM?: number;
  ubytekProc?: 3 | 5 | 10;
  rezimy: RezimSchematu[];
  popis?: string;
  /** Typický spotřebič s doporučením výrobce (id z doporuceni-vyrobcu.json); průřez = větší z výpočtu a výrobce. */
  vyrobce?: string;
}

export interface Projekt {
  id: string;
  nazev: string;
  poznamka: string;
  napeti: 12 | 24;
  komponenty: KomponentaProjektu[];
  kabely: KabelProjektu[];
}

/** Referenční projekt R1 (malá dodávka) pro živé schéma. */
export const projektR1: Projekt = r1Json as unknown as Projekt;

// ---------------------------------------------------------------------------
// Doporučení výrobců k průřezu napájecího kabelu (karty K-VYROBCE, Radek 18. 11. 2026).
// ---------------------------------------------------------------------------

export interface RadekTabulkyVyrobce {
  /** Průřez [mm²] z řady kalkulačky (AWG a jiné hodnoty výrobce zaokrouhlené nahoru). */
  prurez: number;
  /** Nejdelší délka kabelu pro tento průřez [m]. */
  maxDelkaM: number;
}

export interface DoporuceniVyrobce {
  id: string;
  skupina: "lednice" | "cerpadlo" | "menic" | "topeni" | "booster";
  nazev: string;
  /** Karta s tabulkou výrobce (docs/karty). */
  karta: string;
  /** Tabulky podle napětí soustavy; chybí-li napětí, výrobce pro něj nic neuvádí. */
  tabulky: Partial<Record<"12" | "24", RadekTabulkyVyrobce[]>>;
  /** jedna = délka baterie → zařízení; celkova = součet délek všech vodičů okruhu (tam i zpět). */
  delka: "jedna" | "celkova";
  /** Pojistka předepsaná výrobcem [A] podle napětí; null = podle štítku / návodu. */
  pojistkaA: Partial<Record<"12" | "24", number>> | null;
  /** Nejmenší průřez, který výrobce připouští bez ohledu na délku [mm²]. */
  minPrurez?: number;
  /** Proč výrobce chce víc: rozběhový proud, proud jištění, nebo jmenovitý výkon zařízení. */
  duvod: "rozbeh" | "jisteni" | "jmenovity" | "booster";
  /** Hodnota, kterou kalkulačka předvyplní po výběru zařízení (měnič: jeho trvalý výkon, ne zátěž). */
  navrh: { rezim: "P" | "I"; hodnota: number; ubytekProc: 3 | 5 | 10; karta: string; popis: string };
}

export const doporuceniVyrobcu: Tabulka<DoporuceniVyrobce> = doporuceniJson as unknown as Tabulka<DoporuceniVyrobce>;
