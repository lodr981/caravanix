// Nezávislá reference kalkulačky průřezu, VERZE 2.
//
// Napsaná jen z textu docs/KALKULACKA_PRUREZU.md, kapitola „Verze 2: co platí“ (rozhodl Radek 16. 11. 2026),
// ne z kódu enginu. Kód enginu v1 ani v2 jsem nečetl, z src/vodic.ts jsou převzaté jen typy.
//
// Tabulky MM, AMP, AWG, CAPN, CAPH, FUSES a funkce amp(), interp() a nearestAwg() jsou opsané
// z docs/reference/kalkulacka-prurezu-v1.html (zdroj pravdy pro části beze změny). Že se shodují,
// kontroluje test vodic-v2.golden.test.ts přímo proti skriptu reference v1 spuštěnému v Node.
//
// Čísla „bod N“ v komentářích odkazují na číslovaný seznam v podkapitole „Výpočet“.
// Ostatní odkazy: „Změny proti v1“, „Uložení“, „Referenční tabulka“ (podkapitoly zadání).
//
// Výpočet je parametrizovaný (ParametryV2), aby test mohl ověřit, že mřížka odhalí chybnou konstantu
// (např. ρ z v1, faktor 1,1 nebo řadu s 300 A). Platná verze 2 je jen PARAMETRY_V2.

import type {
  AwgVelikost,
  KodHlasky,
  RadekTabulky,
  Ulozeni,
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
/** Strop pojistky, svazek / motorový prostor (rozhodnutí odborníka, Radek). */
export const CAPH: readonly number[] = [7.5, 10, 10, 15, 20, 25, 35, 50, 60, 80, 100, 125, 150, 200, 225];
/** Řada pojistek v1 (včetně 300 A). Verze 2 ji používá bez 300 A, viz FUSES_V2. */
export const FUSES_V1: readonly number[] = [
  1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250, 300,
];

// Změny proti v1, řádek „Řada pojistek“: FUSES bez 300 A (MEGA 300 A je jen zkratová ochrana).
export const FUSES_V2: readonly number[] = FUSES_V1.filter((f) => f !== 300);

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
// Parametry verze 2
// ---------------------------------------------------------------------------

export interface ParamUlozeni {
  /** Zpětný vodič, násobek délky n. */
  n: number;
  /** Koeficient zatížitelnosti k. */
  k: number;
  /** ρ [Ω·mm²/m]. */
  rho: number;
  /** Strop pojistky (CAPN / CAPH). */
  strop: readonly number[];
}

export interface ParametryV2 {
  ulozeni: Record<Ulozeni, ParamUlozeni>;
  /** Pojistka ≥ faktor × proud (bod 4). */
  faktorPojistky: number;
  /** Řada pojistek (bod 4 a 5). */
  fuses: readonly number[];
  /** Práh hlášky NAD_150A_12V [A] (bod 10). */
  prah12V: number;
  /** Práh hlášky MENIC_OD_1000W [W] (bod 10). */
  prahMenic: number;
}

// Změny proti v1: ρ běžně 0,0191 (horní mez lanka FLRY-B), ρ teplé 0,0236.
export const RHO_BEZNE = 0.0191;
export const RHO_TEPLE = 0.0236;

export const PARAMETRY_V2: ParametryV2 = {
  // Tabulka „Uložení“: kód → zpětný vodič n, koeficient k, ρ, strop.
  ulozeni: {
    par: { n: 2, k: 0.8, rho: RHO_BEZNE, strop: CAPN },
    kostra: { n: 1, k: 1.0, rho: RHO_BEZNE, strop: CAPN },
    svazek: { n: 2, k: 0.53, rho: RHO_TEPLE, strop: CAPH },
    motor: { n: 2, k: 0.5, rho: RHO_TEPLE, strop: CAPH },
  },
  // Změny proti v1, řádek „Pojistka“: ≥ 1,25 × proud.
  faktorPojistky: 1.25,
  fuses: FUSES_V2,
  prah12V: 150,
  prahMenic: 1000,
};

export const ULOZENI: readonly Ulozeni[] = ["par", "kostra", "svazek", "motor"];

// ---------------------------------------------------------------------------
// Výpočet
// ---------------------------------------------------------------------------

export interface ReferenceV2 {
  maxFuse(a: number, ulozeni: Ulozeni): number;
  navrh(v: VstupVodice): VysledekVodice;
  tabulka(): RadekTabulky[];
}

export function vytvorReferenci(p: ParametryV2 = PARAMETRY_V2): ReferenceV2 {
  // Bod 5: maxFuse(a, uložení) = největší f z FUSES (bez 300), pro které
  // f ≤ min(amp(a) × k, interp(strop, a)) + 1e-9; žádné → 0.
  function maxFuse(a: number, ulozeni: Ulozeni): number {
    const u = p.ulozeni[ulozeni];
    const lim = Math.min(amp(a) * u.k, interp(u.strop, a));
    let f = 0;
    for (const x of p.fuses) if (x <= lim + 1e-9) f = x;
    return f;
  }

  function navrh(v: VstupVodice): VysledekVodice {
    const U = v.napeti;
    const val = v.hodnota;
    const L = v.delka;
    const u = p.ulozeni[v.ulozeni];

    // Bod 1: v ani L není kladné číslo → NEPLATNY_VSTUP (bez proudu, viz typ VysledekVodiceChyba).
    if (!(val > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };

    // Bod 2: I = v / U v režimu P, jinak I = v.
    const I = v.rezim === "P" ? val / U : val;

    // Bod 3: dU = U × d / 100; Areq = ρ × L × n × I / dU.
    // DOSLOVNÝ VÝKLAD: pořadí operací přesně jako v zadání, zleva doprava ((((ρ·L)·n)·I)/dU).
    // Na přesné hraně úbytku (Areq == průřez z MM) může jiné pořadí dát rozdíl 1 ulp (viz Otázky pro Radka).
    const dU = (U * v.ubytekProc) / 100;
    const Areq = (u.rho * L * u.n * I) / dU;

    // Bod 4: pojistka = první f z FUSES (bez 300), pro které f ≥ 1,25 × I. Žádná → HLAVNI_VEDENI (vrací i proud).
    const pojistka = p.fuses.find((f) => f >= p.faktorPojistky * I);
    if (pojistka === undefined) return { stav: "chyba", proud: I, hlasky: ["HLAVNI_VEDENI"] };

    // Bod 6: průřez = první z MM, pro který a ≥ Areq a zároveň maxFuse(a) ≥ pojistka.
    // Žádný → ANI_120_NESTACI (vrací i proud).
    const vyhovuje = (a: number) => a >= Areq && maxFuse(a, v.ulozeni) >= pojistka;
    const idx = MM.findIndex(vyhovuje);
    if (idx < 0) return { stav: "chyba", proud: I, hlasky: ["ANI_120_NESTACI"] };
    const A = MM[idx]!;

    // Bod 7: iDrop = index prvního MM ≥ Areq, iFuse = index prvního MM s maxFuse ≥ pojistka;
    // iDrop ≥ iFuse → úbytek, jinak oteplení.
    const iDrop = MM.findIndex((m) => m >= Areq);
    const iFuse = MM.findIndex((m) => maxFuse(m, v.ulozeni) >= pojistka);
    const rozhodlo: "ubytek" | "oteplen" = iDrop >= iFuse ? "ubytek" : "oteplen";

    // Bod 8: AWG = první z AWG, jehož plocha splní obě podmínky z bodu 6; žádný → null.
    const w = AWG.find((x) => vyhovuje(x[1]));
    const awg: AwgVelikost | null = w ? { oznaceni: w[0], plocha: w[1] } : null;

    // Bod 9: výstupy.
    const ubytekV = (u.rho * L * u.n * I) / A; // ΔU = ρ × L × n × I / A
    const ubytekProc = (ubytekV / U) * 100; // ΔU / U × 100
    const napetiUSpotrebice = U - ubytekV; // U − ΔU
    const ztrata = ubytekV * I; // ΔU × I
    const maxPojistka = maxFuse(A, v.ulozeni); // maxFuse(A)
    const prikon = v.rezim === "P" ? val : I * U; // v režimu P zadaná hodnota, jinak I × U
    const maxDelka = (dU * A) / (u.rho * u.n * I); // dU × A / (ρ × n × I)

    // Bod 10: hlášky v tomto pořadí.
    const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
    if (v.ulozeni === "kostra") hlasky.push("MINUS_PRES_KOSTRU");
    if (v.ulozeni === "motor") hlasky.push("MOTOR_VYSSI_TRIDA");
    if (I > p.prah12V && U === 12) hlasky.push("NAD_150A_12V");
    if (v.rezim === "P" && val >= p.prahMenic) hlasky.push("MENIC_OD_1000W");

    return {
      stav: "ok",
      prurez: A,
      awg,
      pojistka,
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

  // Referenční tabulka: 14 řádků pro MM[0]..MM[13]: průřez, nejbližší AWG, max. pojistka pro každé uložení,
  // délka 3 % = 0,36 × a / (2 × 0,0191 × f), délka 10 % = 1,2 × a / (2 × 0,0191 × f), f = max. pojistka `par`.
  function tabulka(): RadekTabulky[] {
    const rho = p.ulozeni.par.rho;
    return MM.slice(0, 14).map((a) => {
      const maxPojistka = {
        par: maxFuse(a, "par"),
        kostra: maxFuse(a, "kostra"),
        svazek: maxFuse(a, "svazek"),
        motor: maxFuse(a, "motor"),
      };
      const f = maxPojistka.par;
      return {
        prurez: a,
        awg: nearestAwg(a),
        maxPojistka,
        delka3: (0.36 * a) / (2 * rho * f),
        delka10: (1.2 * a) / (2 * rho * f),
      };
    });
  }

  return { maxFuse, navrh, tabulka };
}

/** Platná reference verze 2. */
export const referenceV2: ReferenceV2 = vytvorReferenci();
