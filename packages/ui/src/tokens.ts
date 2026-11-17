// Design tokeny Caravanixu, směr 1 Dílna s tmavým „displejem“ výsledku (rozhodnutí 16. 11. 2026).
// Jediný zdroj pravdy. Z tohoto souboru skript `node tools/design/tokeny.mjs` skládá `tokens.css`
// a tabulku kontrastů v `docs/design/TOKENY.md`. Ručně se `tokens.css` neupravuje.
//
// Dvě mědi:
// - `accent` a `accentText`: tmavá, hnědější měď na tlačítka, odkazy a text (popisek tlačítka ≥ 7 : 1).
// - `copper`: jasnější měď jen na velké plochy, ikony a ilustrace (≥ 3 : 1 proti pozadí). Nikdy na text.

export type ColorTokens = {
  /** pozadí stránky */
  bg: string;
  /** karta, pole */
  surface: string;
  /** tónovaná plocha (záhlaví tabulky, sekundární blok) */
  surface2: string;
  /** běžný text */
  text: string;
  /** vedlejší text (popisy, nápovědy) */
  muted: string;
  /** okraj ovládacích prvků (pole, segmenty) */
  border: string;
  /** dělicí linka, jen dekorativní */
  line: string;
  /** plocha hlavního tlačítka a vybraného segmentu (tmavá měď) */
  accent: string;
  /** plocha hlavního tlačítka při najetí */
  accentHover: string;
  /** text na akcentu */
  onAccent: string;
  /** odkazy a akcentní text (tmavá měď) */
  accentText: string;
  /** jasnější měď: velké plochy, ikony, ilustrace */
  copper: string;
  /** měkká měděná výplň v ilustracích */
  copperSoft: string;
  /** obrys fokusu */
  focus: string;
  okFg: string;
  okBg: string;
  warnFg: string;
  warnBg: string;
  blockFg: string;
  blockBg: string;
  /** displej výsledku */
  displayBg: string;
  displayBorder: string;
  displayText: string;
  displayMuted: string;
  displayAccent: string;
  displayLine: string;
  displayFocus: string;
  displayOk: string;
  displayWarn: string;
  displayBlock: string;
  /** izolace plusového vodiče (červená) v technických ilustracích */
  polPlus: string;
  /** izolace mínusového vodiče (černá, v tmavém režimu grafitová) */
  polMinus: string;
  /** tmavá měď: mezery mezi drátky lanka, stíny mědi */
  copperDeep: string;
  /** vysoké zatížení vodiče (teplá oranžová), vždy se slovem a ikonou */
  heat: string;
};

export const color: { light: ColorTokens; dark: ColorTokens } = {
  light: {
    bg: "#F6F4F0",
    surface: "#FFFFFF",
    surface2: "#EEEAE3",
    text: "#1B1815",
    muted: "#57504A",
    border: "#857B70",
    line: "#E2DCD3",
    accent: "#7A3A17",
    accentHover: "#632E11",
    onAccent: "#FFFFFF",
    accentText: "#74361A",
    copper: "#B4652F",
    copperSoft: "#F2DFCF",
    focus: "#7A3A17",
    okFg: "#17502F",
    okBg: "#E3EFE5",
    warnFg: "#5E3A00",
    warnBg: "#F8ECD2",
    blockFg: "#8A1C12",
    blockBg: "#FAE3DE",
    displayBg: "#1C1916",
    displayBorder: "#1C1916",
    displayText: "#F5F1EA",
    displayMuted: "#B9AFA3",
    displayAccent: "#E3A574",
    displayLine: "#3A342E",
    displayFocus: "#F5F1EA",
    displayOk: "#9FDCB2",
    displayWarn: "#F1C978",
    displayBlock: "#FFB0A5",
    polPlus: "#B8261E",
    polMinus: "#2A2522",
    copperDeep: "#6E3414",
    heat: "#C2410C",
  },
  dark: {
    bg: "#12100E",
    surface: "#1C1915",
    surface2: "#26221D",
    text: "#F2EDE5",
    muted: "#BFB4A6",
    border: "#91867A",
    line: "#332D27",
    accent: "#E2A070",
    accentHover: "#EDB389",
    onAccent: "#1A0F08",
    accentText: "#E9AE80",
    copper: "#D4864D",
    copperSoft: "#4A3020",
    focus: "#E9AE80",
    okFg: "#A6E0B8",
    okBg: "#142519",
    warnFg: "#F3CB7C",
    warnBg: "#2B2110",
    blockFg: "#FFB7AC",
    blockBg: "#361714",
    displayBg: "#0A0908",
    displayBorder: "#3A332C",
    displayText: "#F5F1EA",
    displayMuted: "#B9AFA3",
    displayAccent: "#E3A574",
    displayLine: "#2E2924",
    displayFocus: "#F5F1EA",
    displayOk: "#9FDCB2",
    displayWarn: "#F1C978",
    displayBlock: "#FFB0A5",
    polPlus: "#E5675C",
    polMinus: "#7A736C",
    copperDeep: "#5A3218",
    heat: "#F2884B",
  },
};

/** Páry, které musí splnit minimum. 7 = běžný text (AAA), 4,5 = vedlejší text, 3 = netextový prvek (WCAG 1.4.11). */
export type ContrastPair = { label: string; fg: keyof ColorTokens; bg: keyof ColorTokens; min: number };

export const contrastPairs: ContrastPair[] = [
  { label: "Text na pozadí", fg: "text", bg: "bg", min: 7 },
  { label: "Text na kartě", fg: "text", bg: "surface", min: 7 },
  { label: "Text na tónované ploše", fg: "text", bg: "surface2", min: 7 },
  { label: "Vedlejší text na pozadí", fg: "muted", bg: "bg", min: 4.5 },
  { label: "Vedlejší text na kartě", fg: "muted", bg: "surface", min: 4.5 },
  { label: "Vedlejší text na tónované ploše", fg: "muted", bg: "surface2", min: 4.5 },
  { label: "Odkaz (tmavá měď) na pozadí", fg: "accentText", bg: "bg", min: 7 },
  { label: "Odkaz (tmavá měď) na kartě", fg: "accentText", bg: "surface", min: 7 },
  { label: "Odkaz (tmavá měď) na tónované ploše", fg: "accentText", bg: "surface2", min: 7 },
  { label: "Popisek tlačítka na tmavé mědi", fg: "onAccent", bg: "accent", min: 7 },
  { label: "Popisek tlačítka při najetí", fg: "onAccent", bg: "accentHover", min: 7 },
  { label: "Tlačítko (plocha) vůči kartě", fg: "accent", bg: "surface", min: 3 },
  { label: "Tlačítko (plocha) vůči pozadí", fg: "accent", bg: "bg", min: 3 },
  { label: "Jasná měď (ikona, plocha) na pozadí", fg: "copper", bg: "bg", min: 3 },
  { label: "Jasná měď (ikona, plocha) na kartě", fg: "copper", bg: "surface", min: 3 },
  { label: "Jasná měď na tónované ploše", fg: "copper", bg: "surface2", min: 3 },
  { label: "Text na zvýrazněném řádku (měkká měď)", fg: "text", bg: "copperSoft", min: 7 },
  { label: "Okraj pole na kartě", fg: "border", bg: "surface", min: 3 },
  { label: "Okraj pole na tónované ploše", fg: "border", bg: "surface2", min: 3 },
  { label: "Vybraný segment vůči kartě", fg: "accent", bg: "surface", min: 3 },
  { label: "Okraj pole na pozadí", fg: "border", bg: "bg", min: 3 },
  { label: "Fokus vůči pozadí", fg: "focus", bg: "bg", min: 3 },
  { label: "Fokus vůči kartě", fg: "focus", bg: "surface", min: 3 },
  { label: "Hláška OK", fg: "okFg", bg: "okBg", min: 7 },
  { label: "Hláška varování", fg: "warnFg", bg: "warnBg", min: 7 },
  { label: "Hláška blok", fg: "blockFg", bg: "blockBg", min: 7 },
  { label: "Displej: číslo a text", fg: "displayText", bg: "displayBg", min: 7 },
  { label: "Displej: vedlejší text", fg: "displayMuted", bg: "displayBg", min: 7 },
  { label: "Displej: jednotka a akcent (měď)", fg: "displayAccent", bg: "displayBg", min: 7 },
  { label: "Displej: stav OK", fg: "displayOk", bg: "displayBg", min: 7 },
  { label: "Displej: stav varování", fg: "displayWarn", bg: "displayBg", min: 7 },
  { label: "Displej: stav blok", fg: "displayBlock", bg: "displayBg", min: 7 },
  { label: "Displej: fokus", fg: "displayFocus", bg: "displayBg", min: 3 },
  { label: "Izolace plus (ilustrace) na kartě", fg: "polPlus", bg: "surface", min: 3 },
  { label: "Izolace mínus (ilustrace) na kartě", fg: "polMinus", bg: "surface", min: 3 },
  { label: "Vysoké zatížení (plocha) na kartě", fg: "heat", bg: "surface", min: 3 },
  { label: "Vysoké zatížení (plocha) na tónované ploše", fg: "heat", bg: "surface2", min: 3 },
  { label: "Nízké zatížení (plocha) na tónované ploše", fg: "okFg", bg: "surface2", min: 3 },
];

/** Písmo: jedna rodina, řezy 400, 600, 700. Self-hosted z @fontsource/ibm-plex-sans (latin, latin-ext). */
export const font = {
  family: '"IBM Plex Sans", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  weights: { regular: 400, semibold: 600, bold: 700 },
};

/**
 * Typografická škála v rem. Kořen je 18 px na mobilu a 20 px od 1024 px (html font-size 112,5 % a 125 %),
 * takže 1 rem je vždy základní text. Nejmenší text (small) je 0,875 rem = 15,75 px, patička 0,8 rem = 14,4 px.
 */
export const typography = {
  rootMobilePercent: 112.5,
  rootDesktopPercent: 125,
  desktopFrom: "1024px",
  size: {
    display: "clamp(2.4rem, 1.4rem + 6vw, 3.75rem)",
    h1: "clamp(1.75rem, 1.1rem + 3.4vw, 2.6rem)",
    h2: "clamp(1.4rem, 1.1rem + 1.6vw, 1.7rem)",
    h3: "1.2rem",
    lead: "1.15rem",
    body: "1rem",
    small: "0.875rem",
    foot: "0.8rem",
  },
  lineHeight: { body: "1.55", heading: "1.18", tight: "1.05" },
  tracking: { heading: "-0.015em", display: "-0.02em", caps: "0.06em" },
  measure: "36em",
};

/** Mezery: násobky 4 px při 16 px, v rem (rostou se základním písmem i se zvětšením). */
export const space = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.5rem",
  6: "2rem",
  7: "3rem",
  8: "4rem",
  9: "6rem",
};

export const size = {
  /** minimální dotykový cíl: 48 px i při nejmenším kořeni (18 px × 2,75 = 49,5 px) */
  tap: "max(48px, 2.75rem)",
  tapGap: "0.5rem",
  content: "72rem",
  gutter: "max(16px, 4vw)",
};

export const radius = { sm: "6px", md: "10px", lg: "14px", pill: "999px" };

export const shadow = {
  light: {
    sm: "0 1px 2px rgba(27, 24, 21, 0.06)",
    md: "0 1px 2px rgba(27, 24, 21, 0.05), 0 10px 28px -14px rgba(27, 24, 21, 0.22)",
    display: "0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 18px 40px -22px rgba(27, 24, 21, 0.55)",
  },
  dark: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
    md: "0 1px 2px rgba(0, 0, 0, 0.35), 0 12px 30px -16px rgba(0, 0, 0, 0.7)",
    display: "0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 0 1px rgba(0, 0, 0, 0.6)",
  },
};

/** Pohyb: krátký a smysluplný. Při prefers-reduced-motion jsou všechny délky 0 ms. */
export const motion = {
  fast: "120ms",
  base: "200ms",
  result: "260ms",
  ease: "cubic-bezier(0.2, 0.7, 0.2, 1)",
};

// ---------- kontrast podle WCAG 2.x ----------
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const l = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0]! + 0.7152 * l[1]! + 0.0722 * l[2]!;
}

export function contrastRatio(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
export const cssVarName = (key: string) => `--cx-${kebab(key)}`;
