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

// ---------------------------------------------------------------------------
// Zmrazené tabulky (beze změny z reference; měnit jen se souhlasem Radka).
// ---------------------------------------------------------------------------

/** Průřezy [mm²]. */
export const MM: readonly number[] = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
/** Zatížitelnost [A] podle DIN VDE 0298-4: jednožilový kabel ve vzduchu, PVC 70 °C, okolí 30 °C. */
export const AMP: readonly number[] = [12, 15, 19, 24, 32, 42, 54, 73, 98, 129, 158, 198, 245, 292, 344];
/** AWG: označení a plocha [mm²]. */
export const AWG: readonly (readonly [string, number])[] = [
  ["20", 0.52], ["18", 0.82], ["16", 1.31], ["14", 2.08], ["12", 3.31], ["10", 5.26], ["8", 8.37],
  ["6", 13.3], ["4", 21.2], ["2", 33.6], ["1", 42.4], ["1/0", 53.5], ["2/0", 67.4], ["3/0", 85], ["4/0", 107],
];
/** Praktické stropy max. pojistky z autoelektriky [A], kabel vedený samostatně. */
export const CAPN: readonly number[] = [7.5, 10, 15, 15, 20, 30, 40, 60, 80, 100, 125, 150, 200, 250, 300];
/** Praktické stropy max. pojistky [A], ve svazku / motorový prostor. */
export const CAPH: readonly number[] = [7.5, 10, 10, 15, 20, 25, 35, 50, 60, 80, 100, 125, 150, 200, 225];
/** Řada pojistek [A]. */
export const FUSES: readonly number[] = [1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250, 300];

/** Měrný odpor mědi [Ω·mm²/m]: samostatně (20 °C) a ve svazku / motorovém prostoru. */
export const RHO_N = 0.0175;
export const RHO_H = 0.0216;
/** Koeficient zatížitelnosti ve svazku / motorovém prostoru. */
export const K_H = 0.7;

// ---------------------------------------------------------------------------
// Zmrazené funkce (port 1:1).
// ---------------------------------------------------------------------------

// Pole jsou neprázdná a stejně dlouhá jako MM, proto `!` u indexů.
function logLog(arr: readonly number[], a: number): number {
  if (a <= MM[0]!) return (arr[0]! * a) / MM[0]!;
  for (let i = 1; i < MM.length; i++) {
    if (a <= MM[i]!) {
      const t = Math.log(a / MM[i - 1]!) / Math.log(MM[i]! / MM[i - 1]!);
      return Math.exp(Math.log(arr[i - 1]!) + t * Math.log(arr[i]! / arr[i - 1]!));
    }
  }
  return (arr[arr.length - 1]! * a) / MM[MM.length - 1]!;
}

/** Zatížitelnost [A] pro libovolnou plochu: log-log interpolace v tabulce VDE. */
export function amp(a: number): number {
  return logLog(AMP, a);
}

/** Log-log interpolace libovolné tabulky indexované podle MM. */
export function interp(arr: readonly number[], a: number): number {
  return logLog(arr, a);
}

/** Největší pojistka z FUSES, kterou kabel o ploše `a` snese; k = 1 samostatně, k < 1 ve svazku. */
export function maxFuse(a: number, k: number): number {
  const lim = Math.min(amp(a) * k, interp(k < 1 ? CAPH : CAPN, a));
  let f = 0;
  for (const x of FUSES) if (x <= lim + 1e-9) f = x;
  return f;
}

/** Nejbližší AWG podle logaritmu plochy (pro referenční tabulku). */
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
// Výpočet (odpovídá funkci calc() v referenci).
// ---------------------------------------------------------------------------

export function navrhVodice(vstup: VstupVodice): VysledekVodice {
  const { napeti: U, rezim, hodnota: v, delka: L, ubytekProc: drop, zpetny: ret, prostredi } = vstup;
  if (!(v > 0) || !(L > 0)) return { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] };

  const I = rezim === "P" ? v / U : v;
  const hot = prostredi === "h";
  const rho = hot ? RHO_H : RHO_N;
  const k = hot ? K_H : 1;
  const dU = (U * drop) / 100;
  const Lc = L * ret;
  const Areq = (rho * Lc * I) / dU;

  const fuse = FUSES.find((f) => f >= I * 1.1);
  if (fuse === undefined) return { stav: "chyba", proud: I, hlasky: ["MIMO_ROZSAH"] };

  const ok = (a: number) => a >= Areq && maxFuse(a, k) >= fuse;
  const idx = MM.findIndex(ok);
  if (idx < 0) return { stav: "chyba", proud: I, hlasky: ["ANI_120_NESTACI"] };

  const A = MM[idx]!;
  const iDrop = MM.findIndex((m) => m >= Areq);
  const iFuse = MM.findIndex((m) => maxFuse(m, k) >= fuse);
  const rozhodlo = iDrop >= iFuse ? "ubytek" : "oteplen";
  const w = AWG.find((x) => ok(x[1]));
  const dUa = (rho * Lc * I) / A;

  const hlasky: KodHlasky[] = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
  if (ret === 1) hlasky.push("MINUS_PRES_KOSTRU");
  if (I > 150 && U === 12) hlasky.push("NAD_150A_12V");
  if (rezim === "P" && v >= 1000) hlasky.push("MENIC_OD_1000W");

  return {
    stav: "ok",
    prurez: A,
    awg: w ? { oznaceni: w[0], plocha: w[1] } : null,
    pojistka: fuse,
    maxPojistka: maxFuse(A, k),
    proud: I,
    prikon: rezim === "P" ? v : I * U,
    ubytekV: dUa,
    ubytekProc: (dUa / U) * 100,
    napetiUSpotrebice: U - dUa,
    ztrata: dUa * I,
    maxDelka: (dU * A) / (rho * ret * I),
    rozhodlo,
    hlasky,
  };
}

/** Referenční tabulka: prvních 14 průřezů z MM. */
export function referencniTabulka(): RadekTabulky[] {
  return MM.slice(0, 14).map((m) => {
    const f = maxFuse(m, 1);
    return {
      prurez: m,
      awg: nearestAwg(m),
      maxPojistka: f,
      maxPojistkaSvazek: maxFuse(m, 0.7),
      delka3: (0.36 * m) / (2 * 0.0175 * f),
      delka10: (1.2 * m) / (2 * 0.0175 * f),
    };
  });
}
