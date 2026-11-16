// Nezávislá reference kalkulačky průřezu, VERZE 2 (druhé kolo Radkových rozhodnutí, 16. 11. 2026).
//
// Napsaná jen z textu docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“, a z řádků druhého kola
// v docs/ROZHODNUTI.md, ne z kódu enginu. Kód enginu jsem nečetl, z src/vodic.ts jsou převzaté jen typy.
//
// Tabulky MM, AMP, AWG, CAPN, CAPH a funkce amp(), interp() a nearestAwg() jsou opsané
// z docs/reference/kalkulacka-prurezu-v1.html („Tabulky beze změny proti v1“). Že se shodují, kontroluje
// test vodic-v2.golden.test.ts přímo proti skriptu reference v1 spuštěnému v Node.
//
// Datové tabulky (odpor vodiče, pojistky Littelfuse) jsou vstupní data z @caravanix/data. Reference je čte;
// test zvlášť kontroluje jejich tvar podle zadání (počet, pořadí, rho, nabízené hodnoty, rodiny, karty).
//
// Čísla „bod N“ v komentářích odkazují na číslovaný seznam v podkapitole „Výpočet“.
//
// Výpočet je parametrizovaný (ParametryV2), aby test mohl ověřit, že mřížka odhalí chybnou konstantu
// nebo pravidlo (mutanty). Platná verze 2 je jen PARAMETRY_V2.

import { odporVodicu, pojistky } from "@caravanix/data";
import type {
  AwgVelikost,
  KodHlasky,
  RadekTabulky,
  RodinaPojistky,
  UlozeniPocitane,
  VstupVodice,
  VysledekVodice,
} from "../../src/vodic.ts";

// ---------------------------------------------------------------------------
// Tabulky beze změny proti v1 (opis z kalkulacka-prurezu-v1.html)
// ---------------------------------------------------------------------------

export const MM: readonly number[] = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
/** DIN VDE 0298-4, jednožilový ve vzduchu, PVC 70 °C, okolí 30 °C [A]; 12 A pro 0,5 mm² (Lapp). */
export const AMP: readonly number[] = [12, 15, 19, 24, 32, 42, 54, 73, 98, 129, 158, 198, 245, 292, 344];
export const AWG: readonly (readonly [string, number])[] = [
  ["20", 0.52], ["18", 0.82], ["16", 1.31], ["14", 2.08], ["12", 3.31], ["10", 5.26], ["8", 8.37], ["6", 13.3],
  ["4", 21.2], ["2", 33.6], ["1", 42.4], ["1/0", 53.5], ["2/0", 67.4], ["3/0", 85], ["4/0", 107],
];
/** Strop pojistky, jeden vodič (rozhodnutí odborníka, Radek). */
export const CAPN: readonly number[] = [7.5, 10, 15, 15, 20, 30, 40, 60, 80, 100, 125, 150, 200, 250, 300];
/** Strop pojistky, svazek (rozhodnutí odborníka, Radek). */
export const CAPH: readonly number[] = [7.5, 10, 10, 15, 20, 25, 35, 50, 60, 80, 100, 125, 150, 200, 225];

/** „Interpolace amp() … beze změny“: opis amp() z reference v1 (log-log v tabulce VDE). */
export function amp(a: number): number {
  if (a <= MM[0]!) return (AMP[0]! * a) / MM[0]!;
  for (let i = 1; i < MM.length; i++) {
    if (a <= MM[i]!) {
      const t = Math.log(a / MM[i - 1]!) / Math.log(MM[i]! / MM[i - 1]!);
      return Math.exp(Math.log(AMP[i - 1]!) + t * Math.log(AMP[i]! / AMP[i - 1]!));
    }
  }
  return (AMP[AMP.length - 1]! * a) / MM[MM.length - 1]!;
}

/** „… a interp() (log-log), beze změny“: opis interp() z reference v1. */
export function interp(arr: readonly number[], a: number): number {
  if (a <= MM[0]!) return (arr[0]! * a) / MM[0]!;
  for (let i = 1; i < MM.length; i++) {
    if (a <= MM[i]!) {
      const t = Math.log(a / MM[i - 1]!) / Math.log(MM[i]! / MM[i - 1]!);
      return Math.exp(Math.log(arr[i - 1]!) + t * Math.log(arr[i]! / arr[i - 1]!));
    }
  }
  return (arr[arr.length - 1]! * a) / MM[MM.length - 1]!;
}

/** Referenční tabulka: „nejbližší AWG (podle logaritmu plochy, jako v1)“: opis nearestAwg() z reference v1. */
export function nearestAwg(a: number): AwgVelikost {
  let b = AWG[0]!;
  let bd = 1e9;
  for (const w of AWG) {
    const d = Math.abs(Math.log(w[1] / a));
    if (d < bd) {
      bd = d;
      b = w;
    }
  }
  return { oznaceni: b[0], plocha: b[1] };
}

// ---------------------------------------------------------------------------
// Ze zadání (kapitola „Nové datové tabulky“): nabízené pojistky a jejich rodiny.
// Reference bere I20 a I65 z datového souboru; že soubor obsahuje přesně tyto hodnoty a rodiny, hlídá test.
// ---------------------------------------------------------------------------

export const NABIDKA: readonly (readonly [RodinaPojistky, number])[] = [
  ...([1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30] as const).map((f) => ["ATOF", f] as const),
  ...([40, 50, 60, 70, 80, 100, 125] as const).map((f) => ["MIDI", f] as const),
  ...([150, 175, 200, 225, 250] as const).map((f) => ["MEGA", f] as const),
];

export interface PojistkaRef {
  rodina: string;
  jmenovita: number;
  trvaly20: number;
  trvaly65: number;
}

/** Pojistky z packages/data/src/pojistky.json (bez karty). */
export const POJISTKY: readonly PojistkaRef[] = pojistky.polozky.map(({ rodina, jmenovita, trvaly20, trvaly65 }) => ({
  rodina,
  jmenovita,
  trvaly20,
  trvaly65,
}));

/** ρ(a) podle průřezu z packages/data/src/odpor-vodicu.json, ve stejném pořadí jako MM (pořadí hlídá test). */
export const RHO: readonly number[] = odporVodicu.polozky.map((p) => p.rho);

/**
 * Bod 4: I30 = I20 + (I65 − I20) × (30 − 20) / (65 − 20).
 * DOSLOVNÝ VÝKLAD: počítá se zleva doprava, tj. ((I65 − I20) × 10) / 45, pak + I20.
 * Jiné pořadí (např. × (10/45)) se může lišit o 1 ulp; proto mají přesné hrany I30 zvláštní sadu
 * (viz Otázky pro Radka v docs/testy/ZPRAVA.md).
 */
export function i30(p: PojistkaRef): number {
  return p.trvaly20 + ((p.trvaly65 - p.trvaly20) * (30 - 20)) / (65 - 20);
}

// ---------------------------------------------------------------------------
// Parametry verze 2 (tabulka „Uložení“)
// ---------------------------------------------------------------------------

export interface ParamUlozeni {
  /** Násobek délky n. */
  n: number;
  /** Koeficient k. */
  k: number;
  /** Strop pojistky (CAPN / CAPH). */
  strop: readonly number[];
}

export interface ParametryV2 {
  ulozeni: Record<UlozeniPocitane, ParamUlozeni>;
  /** ρ(a) pro každý průřez z MM (stejné pořadí). */
  rho: readonly number[];
  /** Bod 9: odpor pro plochu AWG mimo MM z většího (platí) nebo menšího ρ sousedů. */
  awgSoused: "vetsi" | "mensi";
  /** Nabízené pojistky (bod 5 a 6). */
  pojistky: readonly PojistkaRef[];
  /** Bod 4: dovolený trvalý proud pojistky (platí I30). */
  dovolenyProud: (p: PojistkaRef) => number;
  /** Bod 5 jen pro mutant „poměr místo tabulky“: pojistka = nejmenší f ≥ pomer × I. */
  pomerPojistky?: number;
  /** Bod 7: porovnání úbytku (platí „≤“ bez tolerance). */
  ubytekOstre?: boolean;
  /** Bod 8: iDrop ≥ iFuse → úbytek (platí „≥“). */
  rozhodloOstre?: boolean;
  /** Bod 11: NAD_150A_12V při I > prah12V a U = 12. */
  prah12V: number;
  /** Bod 11: MENIC_OD_1000W v režimu P při v ≥ prahMenic. */
  prahMenic: number;
  /** Mutant „motor se počítá“ (platí: nepočítá se, bod 2). */
  motorJako?: UlozeniPocitane;
}

export const PARAMETRY_V2: ParametryV2 = {
  // Tabulka „Uložení“: kód → n, k, strop.
  ulozeni: {
    par: { n: 2, k: 0.76, strop: CAPN },
    kostra: { n: 1, k: 1.0, strop: CAPN },
    svazek: { n: 2, k: 0.53, strop: CAPH },
  },
  rho: RHO,
  awgSoused: "vetsi",
  pojistky: POJISTKY,
  dovolenyProud: i30,
  prah12V: 150,
  prahMenic: 1000,
};

export const ULOZENI_POCITANA: readonly UlozeniPocitane[] = ["par", "kostra", "svazek"];

// ---------------------------------------------------------------------------
// Výpočet
// ---------------------------------------------------------------------------

export interface ReferenceV2 {
  maxFuse(a: number, ulozeni: UlozeniPocitane): number;
  rhoAwg(p: number): number;
  navrh(v: VstupVodice): VysledekVodice;
  tabulka(): RadekTabulky[];
}

export function vytvorReferenci(p: ParametryV2 = PARAMETRY_V2): ReferenceV2 {
  const nabidka = p.pojistky.map((x) => x.jmenovita);

  // Bod 6: maxFuse(a, uložení) = největší nabízená jmenovitá hodnota f, pro kterou
  // f ≤ min(amp(a) × k, interp(strop, a)) + 1e-9; žádná → 0.
  function maxFuse(a: number, ulozeni: UlozeniPocitane): number {
    const u = p.ulozeni[ulozeni];
    const lim = Math.min(amp(a) * u.k, interp(u.strop, a));
    let f = 0;
    for (const x of nabidka) if (x <= lim + 1e-9) f = x;
    return f;
  }

  // Bod 9: odpor pro plochu AWG: rovná-li se průřezu z MM, jeho ρ; jinak větší ρ ze dvou sousedních průřezů
  // MM (pod 0,5 mm² ρ(0,5), nad 120 mm² ρ(120)).
  function rhoAwg(plocha: number): number {
    const i = MM.indexOf(plocha);
    if (i >= 0) return p.rho[i]!;
    if (plocha < MM[0]!) return p.rho[0]!;
    if (plocha > MM[MM.length - 1]!) return p.rho[MM.length - 1]!;
    const j = MM.findIndex((m) => m > plocha); // horní soused
    const dolni = p.rho[j - 1]!;
    const horni = p.rho[j]!;
    return p.awgSoused === "vetsi" ? Math.max(dolni, horni) : Math.min(dolni, horni);
  }

  function navrh(v: VstupVodice): VysledekVodice {
    const U = v.napeti;
    const val = v.hodnota;
    const L = v.delka;

    // Bod 1: v ani L není kladné číslo → NEPLATNY_VSTUP (bez proudu). Kontroluje se před uložením (bod 2).
    if (!(val > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };

    // Bod 2: uložení motor → MOTOR_NEPOCITA, bez dalšího výpočtu, bez proudu.
    let ulozeni: UlozeniPocitane;
    if (v.ulozeni === "motor") {
      if (!p.motorJako) return { stav: "chyba", hlasky: ["MOTOR_NEPOCITA"] };
      ulozeni = p.motorJako; // jen mutant
    } else ulozeni = v.ulozeni;
    const u = p.ulozeni[ulozeni];
    const n = u.n;

    // Bod 3: I = v / U v režimu P, jinak I = v.
    const I = v.rezim === "P" ? val / U : val;

    // Bod 4 a 5: pojistka = nejmenší nabízená jmenovitá hodnota, pro kterou I30 ≥ I.
    // Žádná → HLAVNI_VEDENI (vrací i proud).
    const vybrana =
      p.pomerPojistky === undefined
        ? p.pojistky.find((x) => p.dovolenyProud(x) >= I)
        : p.pojistky.find((x) => x.jmenovita >= p.pomerPojistky! * I); // jen mutant
    if (vybrana === undefined) return { stav: "chyba", proud: I, hlasky: ["HLAVNI_VEDENI"] };
    const pojistka = vybrana.jmenovita;
    const rodinaPojistky = vybrana.rodina as RodinaPojistky;

    // Bod 7: dU = U × d / 100. Závazná forma ΔU(a) = ρ(a) × L × n × I / a ≤ dU,
    // ΔU zleva doprava ((((ρ·L)·n)·I)/a), porovnání bez tolerance.
    const dU = (U * v.ubytekProc) / 100;
    const dUa = (rho: number, a: number) => (rho * L * n * I) / a;
    const ubytekOk = (rho: number, a: number) => (p.ubytekOstre ? dUa(rho, a) < dU : dUa(rho, a) <= dU);
    const pojistkaOk = (a: number) => maxFuse(a, ulozeni) >= pojistka;

    // Bod 7: průřez = první a z MM, pro který platí úbytek a zároveň maxFuse(a) ≥ pojistka.
    // Žádný → ANI_120_NESTACI (vrací i proud).
    const idx = MM.findIndex((a, i) => ubytekOk(p.rho[i]!, a) && pojistkaOk(a));
    if (idx < 0) return { stav: "chyba", proud: I, hlasky: ["ANI_120_NESTACI"] };
    const A = MM[idx]!;
    const rhoA = p.rho[idx]!;

    // Bod 8: iDrop = index prvního MM s ΔU(a) ≤ dU; iFuse = index prvního MM s maxFuse ≥ pojistka.
    // iDrop ≥ iFuse → úbytek, jinak oteplení.
    const iDrop = MM.findIndex((a, i) => ubytekOk(p.rho[i]!, a));
    const iFuse = MM.findIndex((a) => pojistkaOk(a));
    const ubytekRozhodl = p.rozhodloOstre ? iDrop > iFuse : iDrop >= iFuse;
    const rozhodlo: "ubytek" | "oteplen" = ubytekRozhodl ? "ubytek" : "oteplen";

    // Bod 9: AWG = první z AWG, jehož plocha splní obě podmínky z bodu 7 (s ρ podle bodu 9); žádný → null.
    const w = AWG.find(([, plocha]) => ubytekOk(rhoAwg(plocha), plocha) && pojistkaOk(plocha));
    const awg: AwgVelikost | null = w ? { oznaceni: w[0], plocha: w[1] } : null;

    // Bod 10: výstupy (vzorce zleva doprava, jak jsou zapsané).
    const ubytekV = (rhoA * L * n * I) / A; // ΔU = ρ(A) × L × n × I / A
    const ubytekProc = (ubytekV / U) * 100; // ΔU / U × 100
    const napetiUSpotrebice = U - ubytekV; // U − ΔU
    const ztrata = ubytekV * I; // ΔU × I
    const maxPojistka = maxFuse(A, ulozeni); // maxFuse(A)
    const prikon = v.rezim === "P" ? val : I * U; // v režimu P zadaná hodnota, jinak I × U
    const maxDelka = (dU * A) / (rhoA * n * I); // dU × A / (ρ(A) × n × I)

    // Bod 11: hlášky v tomto pořadí.
    const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
    if (v.ulozeni === "kostra") hlasky.push("MINUS_PRES_KOSTRU");
    if (v.ulozeni === "svazek") hlasky.push("SVAZEK_NEJVYS_3_OBVODY");
    if (I > p.prah12V && U === 12) hlasky.push("NAD_150A_12V");
    if (v.rezim === "P" && val >= p.prahMenic) hlasky.push("MENIC_OD_1000W");

    return {
      stav: "ok",
      prurez: A,
      awg,
      pojistka,
      rodinaPojistky,
      maxPojistka,
      proud: I,
      prikon,
      ubytekV,
      ubytekProc,
      napetiUSpotrebice,
      ztrata,
      maxDelka,
      rozhodlo,
      hlasky,
    };
  }

  // „Referenční tabulka“: 14 řádků pro MM[0]..MM[13]: průřez, ρ, nejbližší AWG, max. pojistka pro par, kostra
  // a svazek; f = max. pojistka par; délka 3 % = 0,36 × a / (2 × ρ(a) × f), délka 10 % = 1,2 × a / (2 × ρ(a) × f).
  function tabulka(): RadekTabulky[] {
    return MM.slice(0, 14).map((a, i) => {
      const rho = p.rho[i]!;
      const maxPojistka = {
        par: maxFuse(a, "par"),
        kostra: maxFuse(a, "kostra"),
        svazek: maxFuse(a, "svazek"),
      };
      const f = maxPojistka.par;
      return {
        prurez: a,
        rho,
        awg: nearestAwg(a),
        maxPojistka,
        delka3: (0.36 * a) / (2 * rho * f),
        delka10: (1.2 * a) / (2 * rho * f),
      };
    });
  }

  return { maxFuse, rhoAwg, navrh, tabulka };
}

/** Platná reference verze 2. */
export const referenceV2: ReferenceV2 = vytvorReferenci();
