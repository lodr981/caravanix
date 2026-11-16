// Kalkulačky alfy (docs/KALKULACKY_ALFA.md, oddíly A–G). Čisté funkce, žádné výjimky:
// výsledek je { stav: "ok", …, hlasky } nebo { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole }.

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

export interface PolozkaSpotrebice {
  prikonW: number;
  hodinDenne: number;
  na230V: boolean;
}

export interface BilancePolozky {
  WhSpotrebic: number;
  WhZBaterie: number;
  proud: number;
  AhDenne: number;
}

export interface BilanceSpotrebicu {
  stav: "ok";
  polozky: BilancePolozky[];
  WhDenne: number;
  AhDenne: number;
  proudSoucasne: number;
  vykon230V: number;
  hlasky: ("NAD_150A" | "BEZ_MENICE")[];
}

export function bilanceSpotrebicu(vstup: {
  napeti: Soustava;
  ucinnostMenice?: number;
  polozky: PolozkaSpotrebice[];
}): BilanceSpotrebicu | Chyba {
  const { napeti, ucinnostMenice = 0.9, polozky } = vstup;
  const e = prvni(spatneNapeti(napeti), mimo("ucinnostMenice", ucinnostMenice, 0.5, 1));
  if (e) return chyba(e);
  if (!Array.isArray(polozky) || polozky.length === 0) return chyba("polozky");
  for (let i = 0; i < polozky.length; i++) {
    const p = polozky[i]!;
    const ep = prvni(mimo(`polozky[${i}].prikonW`, p.prikonW, 0, 10000), mimo(`polozky[${i}].hodinDenne`, p.hodinDenne, 0, 24));
    if (ep) return chyba(ep);
    if (typeof p.na230V !== "boolean") return chyba(`polozky[${i}].na230V`);
  }
  const U = jmenoviteNapeti(napeti);
  const vysledky = polozky.map((p) => {
    const WhSpotrebic = p.prikonW * p.hodinDenne;
    const WhZBaterie = p.na230V ? WhSpotrebic / ucinnostMenice : WhSpotrebic;
    const proud = (p.na230V ? p.prikonW / ucinnostMenice : p.prikonW) / U;
    return { WhSpotrebic, WhZBaterie, proud, AhDenne: WhZBaterie / U };
  });
  const WhDenne = vysledky.reduce((a, b) => a + b.WhZBaterie, 0);
  const proudSoucasne = vysledky.reduce((a, b) => a + b.proud, 0);
  const vykon230V = polozky.filter((p) => p.na230V).reduce((a, p) => a + p.prikonW, 0);
  const hlasky: BilanceSpotrebicu["hlasky"] = [];
  if (proudSoucasne > 150) hlasky.push("NAD_150A");
  if (!polozky.some((p) => p.na230V)) hlasky.push("BEZ_MENICE");
  return { stav: "ok", polozky: vysledky, WhDenne, AhDenne: WhDenne / U, proudSoucasne, vykon230V, hlasky };
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
  const { litry, tStart = 15, tCil = 100, ucinnostVareni = 0.85, ucinnostMenice = 0.9 } = vstup;
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
}

export function kolikUvarim(vstup: {
  kapacitaAh: number;
  napeti: Soustava;
  vyuzitelnost?: number;
  prikonW: number;
  minutNaJidlo: number;
  ucinnostMenice?: number;
}): KolikUvarim | Chyba {
  const { kapacitaAh, napeti, vyuzitelnost = 0.9, prikonW, minutNaJidlo, ucinnostMenice = 0.9 } = vstup;
  const e = prvni(
    mimo("kapacitaAh", kapacitaAh, 1, 2000),
    spatneNapeti(napeti),
    mimo("vyuzitelnost", vyuzitelnost, 0.5, 1),
    mimo("prikonW", prikonW, 1, 10000),
    mimo("minutNaJidlo", minutNaJidlo, 1, 600),
    mimo("ucinnostMenice", ucinnostMenice, 0.5, 1),
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
  const { WhDenne, dnyAutonomie, napeti, vyuzitelnost = 0.9 } = vstup;
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
  const { kapacitaAh, napeti, vyuzitelnost = 0.9, WhDenne } = vstup;
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
}

export interface NavrhMenice {
  stav: "ok";
  trvalyVykonW: number;
  spickaW: number;
  proudZBaterie: number;
  WhNaprazdno: number;
  hlasky: ("NAD_150A" | "ODKAZ_PRUREZ")[];
}

export function navrhMenice(vstup: {
  napeti: Soustava;
  ucinnostMenice?: number;
  spotrebice: SpotrebicMenice[];
  spotrebaNaprazdnoW?: number;
  hodinZapnutoDenne?: number;
}): NavrhMenice | Chyba {
  const { napeti, ucinnostMenice = 0.9, spotrebice, spotrebaNaprazdnoW = 0, hodinZapnutoDenne = 0 } = vstup;
  const e = prvni(
    spatneNapeti(napeti),
    mimo("ucinnostMenice", ucinnostMenice, 0.5, 1),
    mimo("spotrebaNaprazdnoW", spotrebaNaprazdnoW, 0, 200),
    mimo("hodinZapnutoDenne", hodinZapnutoDenne, 0, 24),
  );
  if (e) return chyba(e);
  if (!Array.isArray(spotrebice) || spotrebice.length === 0) return chyba("spotrebice");
  const sp = spotrebice.map((s) => ({ prikonW: s.prikonW, r: s.rozbehNasobek ?? 1, soucasne: s.soucasne ?? true }));
  for (let i = 0; i < sp.length; i++) {
    const ep = prvni(mimo(`spotrebice[${i}].prikonW`, sp[i]!.prikonW, 0, 10000), mimo(`spotrebice[${i}].rozbehNasobek`, sp[i]!.r, 1, 10));
    if (ep) return chyba(ep);
  }
  const soucasne = sp.filter((s) => s.soucasne);
  let trvalyVykonW: number;
  let spickaW: number;
  if (soucasne.length > 0) {
    trvalyVykonW = soucasne.reduce((a, s) => a + s.prikonW, 0);
    const prirustek = Math.max(...soucasne.map((s) => s.prikonW * (s.r - 1)));
    spickaW = trvalyVykonW + prirustek;
  } else {
    // Žádný spotřebič neběží současně: trvalý výkon = největší jednotlivý, špička = největší jednotlivý rozběh.
    trvalyVykonW = Math.max(...sp.map((s) => s.prikonW));
    spickaW = Math.max(...sp.map((s) => s.prikonW * s.r));
  }
  const proudZBaterie = trvalyVykonW / ucinnostMenice / jmenoviteNapeti(napeti);
  const hlasky: NavrhMenice["hlasky"] = [];
  if (proudZBaterie > 150) hlasky.push("NAD_150A");
  hlasky.push("ODKAZ_PRUREZ");
  return { stav: "ok", trvalyVykonW, spickaW, proudZBaterie, WhNaprazdno: spotrebaNaprazdnoW * hodinZapnutoDenne, hlasky };
}

// ---------------------------------------------------------------------------
// E. Booster
// ---------------------------------------------------------------------------

export interface NabitiZJizdy {
  stav: "ok";
  AhDenne: number;
  WhDenne: number;
  hlasky: "LITHIUM_BOOSTER"[];
}

export function nabitiZJizdy(vstup: { napeti: Soustava; proudBoosteruA: number; hodinJizdyDenne: number }): NabitiZJizdy | Chyba {
  const { napeti, proudBoosteruA, hodinJizdyDenne } = vstup;
  const e = prvni(spatneNapeti(napeti), mimo("proudBoosteruA", proudBoosteruA, 1, 100), mimo("hodinJizdyDenne", hodinJizdyDenne, 0, 24));
  if (e) return chyba(e);
  const AhDenne = proudBoosteruA * hodinJizdyDenne;
  return { stav: "ok", AhDenne, WhDenne: AhDenne * jmenoviteNapeti(napeti), hlasky: ["LITHIUM_BOOSTER"] };
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
}

export function zapojeniPanelu(vstup: {
  panel: Panel;
  serie: number;
  paralel: number;
  tMin?: number;
  regulator: { maxVstupV: number; maxVstupA: number };
}): ZapojeniPanelu | Chyba {
  const { panel, serie, paralel, tMin = -20, regulator } = vstup;
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
  );
  if (e) return chyba(e);
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
  jizda?: { hodinDenne?: number; proudBoosteruA?: number };
  pripojkaKazdychDni?: number;
  dniSimulace?: number;
  data?: DataSolar;
}

let vychoziData: DataSolar | undefined;
/** Nastaví výchozí tabulku měst (volá se z webu nebo testů s daty z @caravanix/data). */
export function nastavDataSolar(data: DataSolar): void {
  vychoziData = data;
}

export function sobestacnost(vstup: VstupSobestacnosti): Sobestacnost | Chyba {
  const data = vstup.data ?? vychoziData;
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
  } = vstup;
  const hodinDenne = jizda.hodinDenne ?? 0;
  const proudBoosteruA = jizda.proudBoosteruA ?? 0;
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
    Number.isInteger(pripojkaKazdychDni) ? mimo("pripojkaKazdychDni", pripojkaKazdychDni, 0, 30) : "pripojkaKazdychDni",
    Number.isInteger(dniSimulace) ? mimo("dniSimulace", dniSimulace, 1, 366) : "dniSimulace",
  );
  if (e || !m) return chyba(e ?? "mesto");

  const U = jmenoviteNapeti(napeti);
  const vyroba = (wp: number, mes: number) => (wp / 1000) * m.kWhNaKWpDen[mes - 1]! * 1000 * ztratySystemu * (1 - stineniProc / 100);

  const simuluj = (kapAh: number, wp: number, proudB: number, spotreba: number) => {
    const vyrobaWhDen = vyroba(wp, mesic);
    const boosterWhDen = proudB * hodinDenne * U;
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
  };
}
