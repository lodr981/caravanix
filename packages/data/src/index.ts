// Katalogy spotřebičů a komponent, pravidla, karty tvrzení a jejich schémata.
// Každá hodnota v datových tabulkách nese ID karty tvrzení (docs/karty/).

import odporVodicuJson from "./odpor-vodicu.json" with { type: "json" };
import pojistkyJson from "./pojistky.json" with { type: "json" };

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
