// Kalkulačky alfy (docs/KALKULACKY_ALFA.md, oddíly A–G). Čisté funkce, žádné výjimky:
// výsledek je { stav: "ok", …, hlasky } nebo { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole }.

import { solarMesta } from "@caravanix/data";

export type Soustava = 12 | 24;

export interface Chyba {
  stav: "chyba";
  hlasky: ["NEPLATNY_VSTUP"];
  pole: string;
}

const chyba = (pole: string): Chyba => ({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole });

/** Jmenovité napětí LiFePO4: 3,2 V na článek, 4S = 12,8 V, 8S = 25,6 V. */
export function jmenoviteNapeti(napeti: Soustava): number {
  return napeti === 24 ? 25.6 : 12.8;
}

/** Vrací název pole, když hodnota není konečné číslo v rozsahu [min, max]; jinak null. */
function mimo(pole: string, v: unknown, min: number, max: number): string | null {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? null : pole;
}
const spatneNapeti = (v: unknown) => (v === 12 || v === 24 ? null : "napeti");
const prvni = (...chyby: (string | null)[]) => chyby.find((c) => c !== null) ?? null;

// ---------------------------------------------------------------------------
// A. Spotřebiče
// ---------------------------------------------------------------------------

/** Sezóna pro hodiny chodu (kapitola J). */
export type Sezona = "leto" | "jaroPodzim" | "zima";
export const SEZONY: readonly Sezona[] = ["leto", "jaroPodzim", "zima"];

export interface PolozkaSpotrebice {
  prikonW: number;
  /** Hodin chodu za den (0–24). Nepovinné jen u trvalého odběru a u zadání použití × minut (kapitola J). */
  hodinDenne?: number;
  na230V: boolean;
  /** J: kolik % zadaných hodin spotřebič opravdu odebírá (termostat), 0–100, výchozí 100. */
  stridaProc?: number;
  /** J: počet použití za den (0–100); spolu s minutNaPouziti nahrazuje hodinDenne. */
  pouzitiDenne?: number;
  /** J: minut na jedno použití (0–1 440). */
  minutNaPouziti?: number;
  /** J: hodiny pro jednotlivé sezóny (0–24); chybějící sezóna použije hodinDenne. */
  hodinSezona?: Partial<Record<Sezona, number>>;
  /** J: trvalý odběr (standby) – běží 24 h ve všech sezónách. */
  trvale?: boolean;
}

export interface BilancePolozky {
  WhSpotrebic: number;
  WhZBaterie: number;
  proud: number;
  AhDenne: number;
  /** J: hodiny chodu, se kterými se položka počítala (po střídě, pro zvolenou sezónu). */
  hodinChodu: number;
  /** J: Wh z baterie za den v jednotlivých sezónách. */
  WhSezony: Record<Sezona, number>;
}

export interface SouhrnSezony {
  WhDenne: number;
  WhDenneCelkem: number;
  AhDenneCelkem: number;
}

export interface BilanceSpotrebicu {
  stav: "ok";
  polozky: BilancePolozky[];
  WhDenne: number;
  AhDenne: number;
  proudSoucasne: number;
  vykon230V: number;
  hlasky: ("NAD_150A" | "BEZ_MENICE")[];
  /** Energie na vaření za den [Wh] (vstup WhVareniDenne, výchozí 0). */
  WhVareni: number;
  /** Celková denní spotřeba z baterie včetně vaření [Wh]. */
  WhDenneCelkem: number;
  AhDenneCelkem: number;
  /** true, když proud všeho najednou překročí trvalý proud BMS (vstup maxProudBmsA). */
  nadBms: boolean;
  /** J: zvolená sezóna (vstup sezona), nebo null. */
  sezona: Sezona | null;
  /** J: souhrn pro každou sezónu (vaření stejné ve všech). */
  sezony: Record<Sezona, SouhrnSezony>;
  /** J: indexy položek seřazené od největší spotřeby (WhZBaterie) po nejmenší; při shodě podle pořadí. */
  poradi: number[];
  /** J: Wh z baterie za den na trvalé odběry (trvale: true). */
  WhTrvale: number;
}

const jeSezona = (v: unknown): v is Sezona => v === "leto" || v === "jaroPodzim" || v === "zima";

export function bilanceSpotrebicu(vstup: {
  napeti: Soustava;
  ucinnostMenice?: number;
  polozky: PolozkaSpotrebice[];
  /** Energie na vaření za den z baterie [Wh] (z kolikUvarim.WhVareniDenne). */
  WhVareniDenne?: number;
  /** Trvalý proud BMS baterie [A]; když chybí, nekontroluje se. */
  maxProudBmsA?: number;
  /** J: sezóna, pro kterou se počítá hlavní výsledek; bez ní platí hodinDenne. */
  sezona?: Sezona;
}): BilanceSpotrebicu | Chyba {
  const { napeti, ucinnostMenice = 0.9, polozky, WhVareniDenne = 0, maxProudBmsA, sezona } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    spatneNapeti(napeti),
    mimo("ucinnostMenice", ucinnostMenice, 0.5, 1),
    mimo("WhVareniDenne", WhVareniDenne, 0, 50000),
    maxProudBmsA === undefined ? null : mimo("maxProudBmsA", maxProudBmsA, 1, 1000),
    sezona === undefined || jeSezona(sezona) ? null : "sezona",
  );
  if (e) return chyba(e);
  if (!Array.isArray(polozky) || polozky.length === 0) return chyba("polozky");
  for (let i = 0; i < polozky.length; i++) {
    const p = polozky[i]!;
    if (!p || typeof p !== "object") return chyba(`polozky[${i}].prikonW`);
    if (p.trvale !== undefined && typeof p.trvale !== "boolean") return chyba(`polozky[${i}].trvale`);
    const pouziti = !p.trvale && (p.pouzitiDenne !== undefined || p.minutNaPouziti !== undefined);
    const ep = prvni(
      mimo(`polozky[${i}].prikonW`, p.prikonW, 0, 10000),
      p.trvale || pouziti ? null : mimo(`polozky[${i}].hodinDenne`, p.hodinDenne, 0, 24),
      p.stridaProc === undefined ? null : mimo(`polozky[${i}].stridaProc`, p.stridaProc, 0, 100),
      pouziti ? mimo(`polozky[${i}].pouzitiDenne`, p.pouzitiDenne, 0, 100) : null,
      pouziti ? mimo(`polozky[${i}].minutNaPouziti`, p.minutNaPouziti, 0, 1440) : null,
      pouziti && (p.pouzitiDenne! * p.minutNaPouziti!) / 60 > 24 ? `polozky[${i}].minutNaPouziti` : null,
    );
    if (ep) return chyba(ep);
    if (p.hodinSezona !== undefined) {
      if (!p.hodinSezona || typeof p.hodinSezona !== "object") return chyba(`polozky[${i}].hodinSezona`);
      for (const z of SEZONY) {
        const h = p.hodinSezona[z];
        if (h !== undefined && mimo("", h, 0, 24) !== null) return chyba(`polozky[${i}].hodinSezona.${z}`);
      }
    }
    if (typeof p.na230V !== "boolean") return chyba(`polozky[${i}].na230V`);
  }
  const U = jmenoviteNapeti(napeti);
  // Hodiny chodu položky v sezóně z (z = null: bez sezóny, platí hodinDenne).
  const hodin = (p: PolozkaSpotrebice, z: Sezona | null): number => {
    if (p.trvale) return 24;
    if (p.pouzitiDenne !== undefined || p.minutNaPouziti !== undefined) return (p.pouzitiDenne! * p.minutNaPouziti!) / 60;
    const zaklad = (z !== null ? p.hodinSezona?.[z] : undefined) ?? p.hodinDenne;
    const strida = p.stridaProc === undefined ? 1 : p.stridaProc / 100;
    return zaklad !== undefined ? zaklad * strida : 0;
  };
  const zBaterie = (p: PolozkaSpotrebice, h: number) => (p.na230V ? (p.prikonW * h) / ucinnostMenice : p.prikonW * h);
  const zvolena = sezona ?? null;
  const vysledky: BilancePolozky[] = polozky.map((p) => {
    const hodinChodu = hodin(p, zvolena);
    const WhSpotrebic = p.prikonW * hodinChodu;
    const WhZBaterie = p.na230V ? WhSpotrebic / ucinnostMenice : WhSpotrebic;
    const proud = (p.na230V ? p.prikonW / ucinnostMenice : p.prikonW) / U;
    const WhSezony = Object.fromEntries(SEZONY.map((z) => [z, zBaterie(p, hodin(p, z))])) as Record<Sezona, number>;
    return { WhSpotrebic, WhZBaterie, proud, AhDenne: WhZBaterie / U, hodinChodu, WhSezony };
  });
  const WhDenne = vysledky.reduce((a, b) => a + b.WhZBaterie, 0);
  const proudSoucasne = vysledky.reduce((a, b) => a + b.proud, 0);
  const vykon230V = polozky.filter((p) => p.na230V).reduce((a, p) => a + p.prikonW, 0);
  const hlasky: BilanceSpotrebicu["hlasky"] = [];
  if (proudSoucasne > 150) hlasky.push("NAD_150A");
  if (!polozky.some((p) => p.na230V)) hlasky.push("BEZ_MENICE");
  const WhDenneCelkem = WhDenne + WhVareniDenne;
  const sezony = Object.fromEntries(
    SEZONY.map((z) => {
      const Wh = vysledky.reduce((a, b) => a + b.WhSezony[z], 0);
      return [z, { WhDenne: Wh, WhDenneCelkem: Wh + WhVareniDenne, AhDenneCelkem: (Wh + WhVareniDenne) / U }];
    }),
  ) as Record<Sezona, SouhrnSezony>;
  const poradi = vysledky.map((_, i) => i).sort((a, b) => vysledky[b]!.WhZBaterie - vysledky[a]!.WhZBaterie || a - b);
  return {
    stav: "ok",
    polozky: vysledky,
    WhDenne,
    AhDenne: WhDenne / U,
    proudSoucasne,
    vykon230V,
    hlasky,
    WhVareni: WhVareniDenne,
    WhDenneCelkem,
    AhDenneCelkem: WhDenneCelkem / U,
    nadBms: maxProudBmsA !== undefined && proudSoucasne > maxProudBmsA,
    sezona: zvolena,
    sezony,
    poradi,
    WhTrvale: vysledky.reduce((a, b, i) => a + (polozky[i]!.trvale ? b.WhZBaterie : 0), 0),
  };
}

// ---------------------------------------------------------------------------
// B. Vaření
// ---------------------------------------------------------------------------

/** Měrné teplo vody [kJ/(kg·K)]; 1 l vody = 1 kg. */
export const MERNE_TEPLO_VODY = 4.186;

export interface OhrevVody {
  stav: "ok";
  WhTeplo: number;
  WhZBaterie: number;
  hlasky: never[];
}

export function ohrevVody(vstup: {
  litry: number;
  tStart?: number;
  tCil?: number;
  ucinnostVareni?: number;
  ucinnostMenice?: number;
}): OhrevVody | Chyba {
  const { litry, tStart = 15, tCil = 100, ucinnostVareni = 0.85, ucinnostMenice = 0.9 } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    mimo("litry", litry, 0.1, 50),
    mimo("tStart", tStart, -10, 99),
    typeof tCil === "number" && Number.isFinite(tCil) && tCil > tStart && tCil <= 100 ? null : "tCil",
    mimo("ucinnostVareni", ucinnostVareni, 0.3, 1),
    mimo("ucinnostMenice", ucinnostMenice, 0.3, 1),
  );
  if (e) return chyba(e);
  const WhTeplo = (litry * MERNE_TEPLO_VODY * (tCil - tStart)) / 3.6;
  return { stav: "ok", WhTeplo, WhZBaterie: WhTeplo / (ucinnostVareni * ucinnostMenice), hlasky: [] };
}

export interface KolikUvarim {
  stav: "ok";
  WhVyuzitelne: number;
  WhNaJidlo: number;
  jidel: number;
  litruVody: number;
  hodinChodu: number;
  hlasky: "PROUD_VELKY"[];
  /** Litry vody k varu se zadanými účinnostmi vaření a měniče. */
  litruVodyZadane: number;
  /** Energie na vaření za den [Wh] = jidelDenne × WhNaJidlo. */
  WhVareniDenne: number;
  /** Proud z baterie při vaření [A]. */
  proudVareni: number;
}

export function kolikUvarim(vstup: {
  kapacitaAh: number;
  napeti: Soustava;
  vyuzitelnost?: number;
  prikonW: number;
  minutNaJidlo: number;
  ucinnostMenice?: number;
  ucinnostVareni?: number;
  jidelDenne?: number;
}): KolikUvarim | Chyba {
  const { kapacitaAh, napeti, vyuzitelnost = 0.9, prikonW, minutNaJidlo, ucinnostMenice = 0.9, ucinnostVareni = 0.85, jidelDenne = 0 } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    mimo("kapacitaAh", kapacitaAh, 1, 2000),
    spatneNapeti(napeti),
    mimo("vyuzitelnost", vyuzitelnost, 0.5, 1),
    mimo("prikonW", prikonW, 1, 10000),
    mimo("minutNaJidlo", minutNaJidlo, 1, 600),
    mimo("ucinnostMenice", ucinnostMenice, 0.5, 1),
    mimo("ucinnostVareni", ucinnostVareni, 0.3, 1),
    mimo("jidelDenne", jidelDenne, 0, 20),
  );
  if (e) return chyba(e);
  const U = jmenoviteNapeti(napeti);
  const WhVyuzitelne = kapacitaAh * U * vyuzitelnost;
  const WhNaJidlo = (prikonW * minutNaJidlo) / 60 / ucinnostMenice;
  const litr = ohrevVody({ litry: 1 }) as OhrevVody;
  const hlasky: KolikUvarim["hlasky"] = [];
  if (prikonW / ucinnostMenice / U > 150) hlasky.push("PROUD_VELKY");
  return {
    stav: "ok",
    WhVyuzitelne,
    WhNaJidlo,
    jidel: Math.floor(WhVyuzitelne / WhNaJidlo),
    litruVody: WhVyuzitelne / litr.WhZBaterie,
    hodinChodu: WhVyuzitelne / (prikonW / ucinnostMenice),
    hlasky,
    litruVodyZadane: WhVyuzitelne / (ohrevVody({ litry: 1, ucinnostVareni, ucinnostMenice }) as OhrevVody).WhZBaterie,
    WhVareniDenne: jidelDenne * WhNaJidlo,
    proudVareni: prikonW / ucinnostMenice / U,
  };
}

// ---------------------------------------------------------------------------
// C. Baterie
// ---------------------------------------------------------------------------

export interface PotrebnaBaterie {
  stav: "ok";
  WhPotreba: number;
  Ah: number;
  AhZaokrouhleno: number;
  hlasky: never[];
}

export function potrebnaBaterie(vstup: {
  WhDenne: number;
  dnyAutonomie: number;
  napeti: Soustava;
  vyuzitelnost?: number;
}): PotrebnaBaterie | Chyba {
  const { WhDenne, dnyAutonomie, napeti, vyuzitelnost = 0.9 } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    mimo("WhDenne", WhDenne, 1, 50000),
    mimo("dnyAutonomie", dnyAutonomie, 0.5, 14),
    spatneNapeti(napeti),
    mimo("vyuzitelnost", vyuzitelnost, 0.5, 1),
  );
  if (e) return chyba(e);
  const WhPotreba = (WhDenne * dnyAutonomie) / vyuzitelnost;
  const Ah = WhPotreba / jmenoviteNapeti(napeti);
  return { stav: "ok", WhPotreba, Ah, AhZaokrouhleno: Math.ceil(Ah / 10) * 10, hlasky: [] };
}

export interface VydrzBaterie {
  stav: "ok";
  dny: number;
  hodin: number;
  hlasky: never[];
}

export function vydrzBaterie(vstup: {
  kapacitaAh: number;
  napeti: Soustava;
  vyuzitelnost?: number;
  WhDenne: number;
}): VydrzBaterie | Chyba {
  const { kapacitaAh, napeti, vyuzitelnost = 0.9, WhDenne } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    mimo("kapacitaAh", kapacitaAh, 1, 2000),
    spatneNapeti(napeti),
    mimo("vyuzitelnost", vyuzitelnost, 0.5, 1),
    mimo("WhDenne", WhDenne, 1, 50000),
  );
  if (e) return chyba(e);
  const dny = (kapacitaAh * jmenoviteNapeti(napeti) * vyuzitelnost) / WhDenne;
  return { stav: "ok", dny, hodin: dny * 24, hlasky: [] };
}

// ---------------------------------------------------------------------------
// D. Měnič
// ---------------------------------------------------------------------------

export interface SpotrebicMenice {
  prikonW: number;
  rozbehNasobek?: number;
  soucasne?: boolean;
  /** Model „pořád + jeden velký“ (revize 18. 11. 2026): true = běží pořád, false = velký, vždy jen jeden naráz. */
  porad?: boolean;
}

export interface NavrhMenice {
  stav: "ok";
  trvalyVykonW: number;
  spickaW: number;
  proudZBaterie: number;
  WhNaprazdno: number;
  hlasky: ("NAD_150A" | "ODKAZ_PRUREZ")[];
  /** true, když proud z baterie překročí trvalý proud BMS (vstup maxProudBmsA). */
  nadBms: boolean;
  /** true, když proud z baterie překročí 200 A – mez kalkulačky průřezu v1.1 (hlavní vedení). */
  nadMezKabelu: boolean;
}

export function navrhMenice(vstup: {
  napeti: Soustava;
  ucinnostMenice?: number;
  spotrebice: SpotrebicMenice[];
  spotrebaNaprazdnoW?: number;
  hodinZapnutoDenne?: number;
  /** "porad-jeden": trvalý = součet „běží pořád“ + největší velký; jinak původní model (soucasne). */
  model?: "soucasne" | "porad-jeden";
  maxProudBmsA?: number;
}): NavrhMenice | Chyba {
  const { napeti, ucinnostMenice = 0.9, spotrebice, spotrebaNaprazdnoW = 0, hodinZapnutoDenne = 0, model = "soucasne", maxProudBmsA } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    maxProudBmsA === undefined ? null : mimo("maxProudBmsA", maxProudBmsA, 1, 1000),
    spatneNapeti(napeti),
    mimo("ucinnostMenice", ucinnostMenice, 0.5, 1),
    mimo("spotrebaNaprazdnoW", spotrebaNaprazdnoW, 0, 200),
    mimo("hodinZapnutoDenne", hodinZapnutoDenne, 0, 24),
  );
  if (e) return chyba(e);
  if (!Array.isArray(spotrebice) || spotrebice.length === 0) return chyba("spotrebice");
  const sp = spotrebice.map((s) => ({ prikonW: s.prikonW, r: s.rozbehNasobek ?? 1, soucasne: s.soucasne ?? true, porad: s.porad ?? true }));
  for (let i = 0; i < sp.length; i++) {
    const ep = prvni(mimo(`spotrebice[${i}].prikonW`, sp[i]!.prikonW, 0, 10000), mimo(`spotrebice[${i}].rozbehNasobek`, sp[i]!.r, 1, 10));
    if (ep) return chyba(ep);
  }
  // Trvalý výkon: součet spotřebičů běžících současně, ale nikdy méně než největší spotřebič,
  // který běží samostatně (rozhodnutí 16. 11. 2026, bezpečnější výklad nálezu testera Q7).
  let trvalyVykonW: number;
  let spickaW: number;
  if (model === "porad-jeden") {
    // Běží pořád + z velkých vždy jen jeden; rozbíhá se jeden spotřebič (největší nárůst nad provoz).
    const porad = sp.filter((s) => s.porad);
    const velke = sp.filter((s) => !s.porad);
    const zaklad = porad.reduce((a, s) => a + s.prikonW, 0);
    const nejvetsi = Math.max(0, ...velke.map((s) => s.prikonW));
    trvalyVykonW = zaklad + nejvetsi;
    const narust = Math.max(0, ...porad.map((s) => s.prikonW * (s.r - 1)), ...velke.map((s) => s.prikonW * s.r - nejvetsi));
    spickaW = trvalyVykonW + narust;
  } else {
    const soucasne = sp.filter((s) => s.soucasne);
    const samostatne = sp.filter((s) => !s.soucasne);
    const souctem = soucasne.reduce((a, s) => a + s.prikonW, 0);
    trvalyVykonW = Math.max(souctem, ...samostatne.map((s) => s.prikonW), 0);
    // Špička: rozbíhá se vždy jen jeden spotřebič – buď jeden ze současných nad jejich součtem, nebo samostatný.
    const spickaSoucasne = soucasne.length ? souctem + Math.max(...soucasne.map((s) => s.prikonW * (s.r - 1))) : 0;
    const spickaSamostatne = samostatne.length ? Math.max(...samostatne.map((s) => s.prikonW * s.r)) : 0;
    spickaW = Math.max(spickaSoucasne, spickaSamostatne);
  }
  const proudZBaterie = trvalyVykonW / ucinnostMenice / jmenoviteNapeti(napeti);
  const hlasky: NavrhMenice["hlasky"] = [];
  if (proudZBaterie > 150) hlasky.push("NAD_150A");
  hlasky.push("ODKAZ_PRUREZ");
  return {
    stav: "ok",
    trvalyVykonW,
    spickaW,
    proudZBaterie,
    WhNaprazdno: spotrebaNaprazdnoW * hodinZapnutoDenne,
    hlasky,
    nadBms: maxProudBmsA !== undefined && proudZBaterie > maxProudBmsA,
    nadMezKabelu: proudZBaterie > 200,
  };
}

// ---------------------------------------------------------------------------
// E. Booster
// ---------------------------------------------------------------------------

export interface NabitiZJizdy {
  stav: "ok";
  AhDenne: number;
  WhDenne: number;
  /** Kolik by dal booster, kdyby jel celou dobu naplno [Ah]. */
  naivniAh: number;
  /** Průměrný skutečný proud za jízdu [A]. */
  prumernyProudA: number;
  /** Stav baterie na konci jízdy [%], jen když je zadaný stav baterie. */
  konecProc: number | null;
  hlasky: ("LITHIUM_BOOSTER" | "DOBITO_DO_PLNA")[];
  /** Proud, který booster bere ze startovací strany [A] = proud × Ubat ÷ Uvozu × 1,1 (ztráta 10 %, jako R1). */
  vstupniProudA: number;
  /** true, když vstupní proud překročí zadaný podíl alternátoru. */
  nadAlternator: boolean;
  /** true, když proud boosteru překročí doporučený nabíjecí proud baterie. */
  nadNabijeci: boolean;
  /** Podíl denní spotřeby, který jízda pokryje [%]; null bez spotřeby. */
  podilSpotrebyProc: number | null;
}

/**
 * Nabití z jízdy přes booster (oddíl E, upraveno 17. 11. 2026): booster nejede celou jízdu naplno.
 * Do 90 % nabití průměrně `koeficient` × jmenovitý proud, nad 90 % jen `koeficientPlna` (K-BOOST-0001, 0002).
 */
export function nabitiZJizdy(vstup: {
  napeti: Soustava;
  proudBoosteruA: number;
  hodinJizdyDenne: number;
  koeficient?: number;
  koeficientPlna?: number;
  kapacitaAh?: number;
  startProc?: number;
  /** Napětí elektriky vozu (startovací strana) [V], výchozí = napětí obytné baterie. */
  napetiVozu?: Soustava;
  /** Jmenovitý proud alternátoru [A] a podíl, který smí booster brát (0,1–1). */
  alternatorA?: number;
  podilAlternatoru?: number;
  /** Doporučený (max.) nabíjecí proud obytné baterie z datasheetu [A]. */
  maxNabijeciA?: number;
  /** Denní spotřeba [Wh] pro porovnání. */
  spotrebaWhDen?: number;
}): NabitiZJizdy | Chyba {
  const { napeti, proudBoosteruA, hodinJizdyDenne, koeficient = 0.7, koeficientPlna = 0.2, kapacitaAh, startProc, napetiVozu = napeti, alternatorA, podilAlternatoru = 0.5, maxNabijeciA, spotrebaWhDen } = (vstup ?? {}) as typeof vstup;
  const e = prvni(
    spatneNapeti(napeti) ?? (napetiVozu === 12 || napetiVozu === 24 ? null : "napetiVozu"),
    alternatorA === undefined ? null : mimo("alternatorA", alternatorA, 20, 500),
    mimo("podilAlternatoru", podilAlternatoru, 0.1, 1),
    maxNabijeciA === undefined ? null : mimo("maxNabijeciA", maxNabijeciA, 1, 1000),
    spotrebaWhDen === undefined ? null : mimo("spotrebaWhDen", spotrebaWhDen, 1, 50000),
    spatneNapeti(napeti),
    mimo("proudBoosteruA", proudBoosteruA, 1, 100),
    mimo("hodinJizdyDenne", hodinJizdyDenne, 0, 24),
    mimo("koeficient", koeficient, 0.3, 1),
    mimo("koeficientPlna", koeficientPlna, 0, 1),
  );
  if (e) return chyba(e);
  const maKapacitu = kapacitaAh !== undefined;
  const maStart = startProc !== undefined;
  if (maKapacitu !== maStart) return chyba(maKapacitu ? "startProc" : "kapacitaAh");
  const naivniAh = proudBoosteruA * hodinJizdyDenne;
  let AhDenne: number;
  let konecProc: number | null = null;
  if (maKapacitu && maStart) {
    const e2 = prvni(mimo("kapacitaAh", kapacitaAh, 10, 2000), mimo("startProc", startProc, 0, 100));
    if (e2) return chyba(e2);
    const I1 = proudBoosteruA * koeficient;
    const I2 = proudBoosteruA * koeficientPlna;
    const doDevadesati = Math.max(0, kapacitaAh! * (0.9 - startProc! / 100));
    const t1 = doDevadesati === 0 ? 0 : Math.min(hodinJizdyDenne, doDevadesati / I1);
    const Ah1 = I1 * t1;
    const zbyvaDoPlna = kapacitaAh! * (1 - Math.max(startProc! / 100, 0.9));
    const Ah2 = Math.min(zbyvaDoPlna, I2 * (hodinJizdyDenne - t1));
    AhDenne = Ah1 + Ah2;
    konecProc = startProc! + (AhDenne / kapacitaAh!) * 100;
  } else {
    AhDenne = proudBoosteruA * koeficient * hodinJizdyDenne;
  }
  const hlasky: NabitiZJizdy["hlasky"] = ["LITHIUM_BOOSTER"];
  if (konecProc !== null && konecProc >= 100) hlasky.push("DOBITO_DO_PLNA");
  const WhDenne = AhDenne * jmenoviteNapeti(napeti);
  const vstupniProudA = ((proudBoosteruA * napeti) / napetiVozu) * 1.1;
  return {
    stav: "ok",
    AhDenne,
    WhDenne,
    naivniAh,
    prumernyProudA: hodinJizdyDenne > 0 ? AhDenne / hodinJizdyDenne : 0,
    konecProc,
    hlasky,
    vstupniProudA,
    nadAlternator: alternatorA !== undefined && vstupniProudA > alternatorA * podilAlternatoru,
    nadNabijeci: maxNabijeciA !== undefined && proudBoosteruA > maxNabijeciA,
    podilSpotrebyProc: spotrebaWhDen === undefined ? null : (WhDenne / spotrebaWhDen) * 100,
  };
}

// ---------------------------------------------------------------------------
// F. Solár – zapojení panelů
// ---------------------------------------------------------------------------

export interface Panel {
  Voc: number;
  Isc: number;
  Vmp: number;
  Imp: number;
  Wp: number;
  koefVocProcNaK: number;
}

export interface ZapojeniPanelu {
  stav: "ok";
  VocMraz: number;
  VmpPole: number;
  IscPole: number;
  ImpPole: number;
  WpPole: number;
  /** true, když napětí v mrazu překročí maximum regulátoru (blok). */
  blok: boolean;
  hlasky: ("VOC_NAD_MAX" | "ISC_NAD_MAX" | "POJISTKA_VETVE")[];
  /** Nejvíc Wp, které regulátor s daným nabíjecím proudem využije (nabijeciProudA × Unom); null bez vstupu. */
  maxWpRegulatoru: number | null;
  /** true, když pole dá víc, než regulátor nabíjecím proudem využije (WpPole > maxWpRegulatoru). */
  regulatorOmezi: boolean;
  /** true, když VmpPole < jmenovité napětí baterie + minRozdilV (MPPT nemusí nabíjet, v horku ještě méně). */
  vmpNizke: boolean;
}

export function zapojeniPanelu(vstup: {
  panel: Panel;
  serie: number;
  paralel: number;
  tMin?: number;
  regulator: { maxVstupV: number; maxVstupA: number; nabijeciProudA?: number; minRozdilV?: number };
  napeti?: Soustava;
}): ZapojeniPanelu | Chyba {
  const { panel, serie, paralel, tMin = -20, regulator, napeti = 12 } = (vstup ?? {}) as typeof vstup;
  const minRozdilV = regulator?.minRozdilV;
  if (!panel) return chyba("panel");
  if (!regulator) return chyba("regulator");
  const e = prvni(
    mimo("panel.Voc", panel.Voc, 1, 100),
    mimo("panel.Isc", panel.Isc, 0.1, 30),
    mimo("panel.Vmp", panel.Vmp, 1, 100),
    mimo("panel.Imp", panel.Imp, 0.1, 30),
    mimo("panel.Wp", panel.Wp, 1, 1000),
    mimo("panel.koefVocProcNaK", panel.koefVocProcNaK, -1, 0),
    Number.isInteger(serie) ? mimo("serie", serie, 1, 10) : "serie",
    Number.isInteger(paralel) ? mimo("paralel", paralel, 1, 10) : "paralel",
    mimo("tMin", tMin, -40, 25),
    mimo("regulator.maxVstupV", regulator.maxVstupV, 10, 500),
    mimo("regulator.maxVstupA", regulator.maxVstupA, 1, 200),
    regulator.nabijeciProudA === undefined ? null : mimo("regulator.nabijeciProudA", regulator.nabijeciProudA, 1, 200),
    spatneNapeti(napeti),
  );
  if (e) return chyba(e);
  const maxWpRegulatoru = regulator.nabijeciProudA === undefined ? null : regulator.nabijeciProudA * jmenoviteNapeti(napeti);
  const VocMraz = serie * panel.Voc * (1 + (panel.koefVocProcNaK / 100) * (tMin - 25));
  const IscPole = paralel * panel.Isc;
  const hlasky: ZapojeniPanelu["hlasky"] = [];
  const blok = VocMraz > regulator.maxVstupV;
  if (blok) hlasky.push("VOC_NAD_MAX");
  if (IscPole > regulator.maxVstupA) hlasky.push("ISC_NAD_MAX");
  if (paralel >= 3) hlasky.push("POJISTKA_VETVE");
  return {
    stav: "ok",
    VocMraz,
    VmpPole: serie * panel.Vmp,
    IscPole,
    ImpPole: paralel * panel.Imp,
    WpPole: serie * paralel * panel.Wp,
    blok,
    hlasky,
    maxWpRegulatoru,
    regulatorOmezi: maxWpRegulatoru !== null && serie * paralel * panel.Wp > maxWpRegulatoru,
    vmpNizke: minRozdilV !== undefined && serie * panel.Vmp < jmenoviteNapeti(napeti) + minRozdilV,
  };
}

// ---------------------------------------------------------------------------
// G. Soběstačnost
// ---------------------------------------------------------------------------

export interface MestoSolar {
  id: string;
  nazev: string;
  kWhNaKWpDen: readonly number[];
}

export interface DataSolar {
  mesta: readonly MestoSolar[];
  vychoziZtraty: number;
}

export type VariantaPomoci = "BATERIE_100AH" | "PANELY_100WP" | "BOOSTER_10A" | "SPOTREBA_MINUS_10";

export interface Sobestacnost {
  stav: "ok";
  vyrobaWhDen: number;
  boosterWhDen: number;
  bilanceWhDen: number;
  kapacitaWh: number;
  /** null = za dobu simulace k vybití nedojde. */
  dnyBezPripojky: number | null;
  vydrzi: boolean;
  /** Stav baterie v % kapacity na konci každého dne. */
  prubeh: number[];
  bilancePoMesicich: number[];
  coPomuze: { varianta: VariantaPomoci; dnyBezPripojky: number | null; prinosDni: number }[];
  hlasky: ("BILANCE_KLADNA" | "ZIMA_MALO_SLUNCE")[];
  /** Kolik Wp panelů pokryje denní spotřebu (po odečtení boosteru) v tomto měsíci; 0 = pokryje už booster. */
  potrebaWp: number;
  /** Totéž pro nejhorší měsíc dubna až září a pro nejhorší měsíc roku. */
  potrebaWpSezona: number;
  potrebaWpRok: number;
  /** Počet dnů simulace, kdy byla baterie na konci dne prázdná. */
  dnuPrazdna: number;
  /** MALO_SLUNCE: výnos ≤ 1,5 kWh/kWp za den; MRAZ: listopad až únor (nabíjení LiFePO4 v mrazu). */
  upozorneni: ("MALO_SLUNCE" | "MRAZ")[];
  /** Dny do vybití s desetinami (kapacita ÷ denní schodek); null, když bilance není záporná. */
  dnyPresne: number | null;
  /** Stav plné baterie po 3 dnech úplně bez slunce (jen jízda) [%]. */
  stavPo3DnechBezSlunceProc: number;
  /** Změna denní bilance u variant „co pomůže“ [Wh/den]. */
  zmenaBilance: Record<VariantaPomoci, number>;
}

export interface VstupSobestacnosti {
  mesto: string;
  mesic: number;
  panelyWp: number;
  stineniProc?: number;
  ztratySystemu?: number;
  kapacitaAh: number;
  napeti: Soustava;
  vyuzitelnost?: number;
  WhDenne: number;
  jizda?: { hodinDenne?: number; proudBoosteruA?: number; koeficient?: number };
  pripojkaKazdychDni?: number;
  dniSimulace?: number;
  data?: DataSolar;
}

let vychoziData: DataSolar | undefined = solarMesta;
/** Nastaví výchozí tabulku měst (volá se z webu nebo testů s daty z @caravanix/data). */
export function nastavDataSolar(data: DataSolar): void {
  vychoziData = data;
}

export function sobestacnost(vstup: VstupSobestacnosti): Sobestacnost | Chyba {
  const data = vstup?.data ?? vychoziData;
  if (!data) return chyba("data");
  const {
    mesto,
    mesic,
    panelyWp,
    stineniProc = 0,
    ztratySystemu = data.vychoziZtraty,
    kapacitaAh,
    napeti,
    vyuzitelnost = 0.9,
    WhDenne,
    jizda = {},
    pripojkaKazdychDni = 0,
    dniSimulace = 30,
  } = (vstup ?? {}) as typeof vstup;
  const hodinDenne = jizda?.hodinDenne ?? 0;
  const proudBoosteruA = jizda?.proudBoosteruA ?? 0;
  const koeficientBoosteru = jizda?.koeficient ?? 0.7;
  const m = data.mesta.find((x) => x.id === mesto);
  const e = prvni(
    m ? null : "mesto",
    Number.isInteger(mesic) ? mimo("mesic", mesic, 1, 12) : "mesic",
    mimo("panelyWp", panelyWp, 0, 5000),
    mimo("stineniProc", stineniProc, 0, 90),
    mimo("ztratySystemu", ztratySystemu, 0.5, 1),
    mimo("kapacitaAh", kapacitaAh, 10, 2000),
    spatneNapeti(napeti),
    mimo("vyuzitelnost", vyuzitelnost, 0.5, 1),
    mimo("WhDenne", WhDenne, 1, 50000),
    mimo("jizda.hodinDenne", hodinDenne, 0, 24),
    mimo("jizda.proudBoosteruA", proudBoosteruA, 0, 100),
    mimo("jizda.koeficient", koeficientBoosteru, 0.3, 1),
    Number.isInteger(pripojkaKazdychDni) ? mimo("pripojkaKazdychDni", pripojkaKazdychDni, 0, 30) : "pripojkaKazdychDni",
    Number.isInteger(dniSimulace) ? mimo("dniSimulace", dniSimulace, 1, 366) : "dniSimulace",
  );
  if (e || !m) return chyba(e ?? "mesto");

  const U = jmenoviteNapeti(napeti);
  const vyroba = (wp: number, mes: number) => (wp / 1000) * m.kWhNaKWpDen[mes - 1]! * 1000 * ztratySystemu * (1 - stineniProc / 100);

  const simuluj = (kapAh: number, wp: number, proudB: number, spotreba: number) => {
    const vyrobaWhDen = vyroba(wp, mesic);
    const boosterWhDen = proudB * koeficientBoosteru * hodinDenne * U;
    const bilanceWhDen = vyrobaWhDen + boosterWhDen - spotreba;
    const kapacitaWh = kapAh * U * vyuzitelnost;
    let stav = kapacitaWh;
    let denVybiti: number | null = null;
    const prubeh: number[] = [];
    for (let d = 1; d <= dniSimulace; d++) {
      stav = Math.min(kapacitaWh, stav + bilanceWhDen);
      if (stav <= 0) {
        if (denVybiti === null) denVybiti = d;
        stav = 0;
      }
      if (pripojkaKazdychDni > 0 && d % pripojkaKazdychDni === 0) stav = kapacitaWh;
      prubeh.push((stav / kapacitaWh) * 100);
    }
    return { vyrobaWhDen, boosterWhDen, bilanceWhDen, kapacitaWh, dny: denVybiti === null ? null : denVybiti - 1, prubeh };
  };

  const zaklad = simuluj(kapacitaAh, panelyWp, proudBoosteruA, WhDenne);
  const porovnej = (d: number | null) => (d === null ? dniSimulace + 1 : d);
  const varianty: { varianta: VariantaPomoci; dny: number | null }[] = [
    { varianta: "BATERIE_100AH", dny: simuluj(kapacitaAh + 100, panelyWp, proudBoosteruA, WhDenne).dny },
    { varianta: "PANELY_100WP", dny: simuluj(kapacitaAh, panelyWp + 100, proudBoosteruA, WhDenne).dny },
  ];
  if (hodinDenne > 0) varianty.push({ varianta: "BOOSTER_10A", dny: simuluj(kapacitaAh, panelyWp, proudBoosteruA + 10, WhDenne).dny });
  varianty.push({ varianta: "SPOTREBA_MINUS_10", dny: simuluj(kapacitaAh, panelyWp, proudBoosteruA, WhDenne * 0.9).dny });
  const coPomuze = varianty
    .map((v) => ({ varianta: v.varianta, dnyBezPripojky: v.dny, prinosDni: porovnej(v.dny) - porovnej(zaklad.dny) }))
    .sort((a, b) => b.prinosDni - a.prinosDni); // stabilní řazení zachová pořadí při shodě

  // Kolik Wp: spotřeba po odečtení boosteru ÷ výroba 1 Wp v daném měsíci.
  const naWp = (mes: number) => vyroba(1, mes);
  const potrebaPro = (mes: number) => {
    const zbytek = Math.max(0, WhDenne - zaklad.boosterWhDen);
    const jedenWp = naWp(mes);
    return zbytek === 0 ? 0 : jedenWp > 0 ? zbytek / jedenWp : Number.POSITIVE_INFINITY;
  };
  const potrebaWp = potrebaPro(mesic);
  const potrebaWpSezona = Math.max(...[4, 5, 6, 7, 8, 9].map(potrebaPro));
  const potrebaWpRok = Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(potrebaPro));
  const dnuPrazdna = zaklad.prubeh.filter((x) => x <= 0).length;
  const dnyPresne = zaklad.bilanceWhDen < 0 ? zaklad.kapacitaWh / -zaklad.bilanceWhDen : null;
  const bezSlunce = Math.max(0, zaklad.kapacitaWh - 3 * Math.max(0, WhDenne - zaklad.boosterWhDen));
  const zmenaBilance: Record<VariantaPomoci, number> = {
    BATERIE_100AH: 0,
    PANELY_100WP: vyroba(100, mesic),
    BOOSTER_10A: hodinDenne > 0 ? 10 * koeficientBoosteru * hodinDenne * U : 0,
    SPOTREBA_MINUS_10: WhDenne * 0.1,
  };
  const upozorneni: Sobestacnost["upozorneni"] = [];
  if (m.kWhNaKWpDen[mesic - 1]! <= 1.5) upozorneni.push("MALO_SLUNCE");
  if ([11, 12, 1, 2].includes(mesic)) upozorneni.push("MRAZ");

  const hlasky: Sobestacnost["hlasky"] = [];
  if (zaklad.bilanceWhDen >= 0) hlasky.push("BILANCE_KLADNA");
  if (m.kWhNaKWpDen[mesic - 1]! < 1) hlasky.push("ZIMA_MALO_SLUNCE");

  return {
    stav: "ok",
    vyrobaWhDen: zaklad.vyrobaWhDen,
    boosterWhDen: zaklad.boosterWhDen,
    bilanceWhDen: zaklad.bilanceWhDen,
    kapacitaWh: zaklad.kapacitaWh,
    dnyBezPripojky: zaklad.dny,
    vydrzi: zaklad.dny === null,
    prubeh: zaklad.prubeh,
    bilancePoMesicich: Array.from({ length: 12 }, (_, i) => vyroba(panelyWp, i + 1) + zaklad.boosterWhDen - WhDenne),
    coPomuze,
    hlasky,
    potrebaWp,
    potrebaWpSezona,
    potrebaWpRok,
    dnuPrazdna,
    upozorneni,
    dnyPresne,
    stavPo3DnechBezSlunceProc: (bezSlunce / zaklad.kapacitaWh) * 100,
    zmenaBilance,
  };
}
