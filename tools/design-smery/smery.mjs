// Definice tří směrů vzhledu: písmo, tokeny (světlý a tmavý režim), škála, charakter CSS a ukázková ilustrace.
// Barvy jsou jediný zdroj pravdy: generator z nich skládá CSS i tabulku kontrastů.

const CHIPS = [
  ["bg", "Pozadí"],
  ["surface", "Karta"],
  ["surface2", "Tónovaná plocha"],
  ["text", "Text"],
  ["muted", "Vedlejší text"],
  ["accent", "Akcent"],
  ["accentText", "Akcentní text"],
  ["border", "Okraj pole"],
  ["okFg", "OK"],
  ["warnFg", "Varování"],
  ["blockFg", "Blok"],
];

// ---------------------------------------------------------------- 1 Dílna
const dilnaSvg = `<svg viewBox="0 0 400 220" role="img" aria-labelledby="il1t" style="max-width:40rem;margin:0 auto">
<title id="il1t">Technická kresba kabelu: řez a pohled z boku s odizolovaným koncem</title>
<defs><pattern id="hatch1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="var(--il-copper-soft)"/><path d="M0 0v6" stroke="var(--il-copper)" stroke-width="1.6"/></pattern></defs>
<g stroke="var(--muted)" stroke-width="1" stroke-dasharray="6 3 1 3"><path d="M14 110h132M80 44v132"/><path d="M160 110h236"/></g>
<circle cx="80" cy="110" r="56" fill="var(--surface2)" stroke="var(--text)" stroke-width="2"/>
<circle cx="80" cy="110" r="38" fill="var(--il-copper-soft)" stroke="var(--il-copper)" stroke-width="2"/>
<g fill="url(#hatch1)" stroke="var(--il-copper)" stroke-width="1.4">
<circle cx="80" cy="110" r="7.4"/>
${[0, 1, 2, 3, 4, 5].map((i) => { const a = (i * Math.PI) / 3; return `<circle cx="${(80 + 15 * Math.cos(a)).toFixed(1)}" cy="${(110 + 15 * Math.sin(a)).toFixed(1)}" r="7.4"/>`; }).join("")}
${[...Array(12)].map((_, i) => { const a = (i * Math.PI) / 6 + Math.PI / 12; return `<circle cx="${(80 + 29.5 * Math.cos(a)).toFixed(1)}" cy="${(110 + 29.5 * Math.sin(a)).toFixed(1)}" r="7.4"/>`; }).join("")}
</g>
<rect x="170" y="82" width="160" height="56" rx="3" fill="var(--surface2)" stroke="var(--text)" stroke-width="2"/>
<path d="M330 82v56" stroke="var(--text)" stroke-width="2"/>
<rect x="330" y="91" width="56" height="38" fill="url(#hatch1)" stroke="var(--il-copper)" stroke-width="2"/>
<g stroke="var(--il-copper)" stroke-width="1.4" fill="none"><path d="M330 98q28 4 56 0M330 106q28 4 56 0M330 114q28 4 56 0M330 122q28 4 56 0"/></g>
<g stroke="var(--text)" stroke-width="1.25" fill="none"><path d="M200 82L214 40h20"/><path d="M372 91L372 40h-10"/><path d="M95 72L150 26h10"/></g>
<g font-size="20" font-weight="700" text-anchor="middle">
<circle cx="248" cy="40" r="14" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="248" y="47">1</text>
<circle cx="348" cy="40" r="14" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="348" y="47">2</text>
<circle cx="174" cy="26" r="14" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="174" y="33">3</text>
</g>
<g stroke="var(--text)" stroke-width="1.5"><path d="M42 196h76M42 189v14M118 189v14"/></g>
<text x="80" y="217" font-size="20" text-anchor="middle" font-weight="600">Ø asi 1,8 mm</text>
</svg>
<ol class="legend"><li><b>Izolace</b>, kreslená obrysem a tónovanou plochou.</li><li><b>Měděné lanko</b>, šrafa v barvě mědi. Počet drátků je schematický.</li><li><b>Průřez</b> = plocha mědi, tady 2,5 mm².</li></ol>`;

const dilna = {
  n: 1,
  slug: "dilna",
  name: "Dílna",
  feel: "Přesný nástroj na teplém papíře. Měď jako jediný akcent, tenké linky, technická kresba a velká čísla. Klid rýsovacího prkna, ne showroom.",
  font: { family: "IBM Plex Sans", file: "ibm-plex-sans", fallback: 'system-ui,"Segoe UI",Roboto,sans-serif', license: "SIL OFL 1.1" },
  radius: "6px",
  radiusSm: "4px",
  motion: 220,
  scale: { display: 3.2, h1: 2.3, h2: 1.55, h3: 1.15, lead: 1.15, small: 0.875, foot: 0.8 },
  paletteNote: "Teplý papír a grafitový inkoust. Akcent je tmavá měď, světlejší měď je jen v ilustracích.",
  illNote: "Technická kresba: obrys 2 px, osy čerchovaně, měď šrafou, číslované odkazy a legenda pod obrázkem (text v obrázku se při zmenšení nezmenší pod čitelnou mez). Jen barvy z palety, takže kresba funguje i v tmavém režimu.",
  chips: [...CHIPS, ["ilCopper", "Měď (kresba)"]],
  logo: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="16" cy="16" r="6" fill="var(--il-copper)"/></svg>`,
  tokens: {
    light: {
      bg: "#F6F2EA", surface: "#FFFDF9", surface2: "#EEE6D8", text: "#1E1A15", muted: "#574E43",
      border: "#857866", line: "#DCD2C2", accent: "#8A4319", onAccent: "#FFFFFF", accentText: "#7E3C15",
      focus: "#1E1A15", okFg: "#17502F", okBg: "#E2F0E5", warnFg: "#633D00", warnBg: "#FAEED0",
      blockFg: "#8A1C12", blockBg: "#FBE3DE", ilCopper: "#A95A26", ilCopperSoft: "#F1D7C0", copper: "#B8692F",
    },
    dark: {
      bg: "#15120E", surface: "#1F1B16", surface2: "#2A241D", text: "#F2ECE2", muted: "#C4B8A7",
      border: "#8C7E6C", line: "#3A332A", accent: "#E7A270", onAccent: "#1A110A", accentText: "#EFAF80",
      focus: "#F2ECE2", okFg: "#A6E0B8", okBg: "#142519", warnFg: "#F3CB7C", warnBg: "#2B2110",
      blockFg: "#FFB7AC", blockBg: "#361714", ilCopper: "#E39A63", ilCopperSoft: "#4A3020", copper: "#D98B50",
    },
  },
  css: `
body{counter-reset:sec}
section .sec-head h2::before{counter-increment:sec;content:"0" counter(sec);display:block;font-size:var(--fs-small);font-weight:600;color:var(--accent-text);letter-spacing:.12em;margin-bottom:.35rem}
.kicker{text-transform:uppercase;letter-spacing:.1em;font-size:var(--fs-small);font-weight:600;margin-bottom:.75rem}
.tile-head{border-bottom:2px solid var(--text)}
.tile-head h1{letter-spacing:-.01em;margin-bottom:1rem}
section{border-top:1px solid var(--line)}
.panel,.res,.ill{border-color:var(--border);box-shadow:none}
.res{border-top:5px solid var(--accent)}
.big>div{border-left:1px solid var(--line);padding-left:1rem}
.big-v .u{color:var(--accent-text)}
.legend{margin:1rem 0 0;padding-left:1.5rem;max-width:40rem;margin-inline:auto}
.legend li{margin:.3rem 0}
.msg{border-radius:2px}
`,
  illustration: dilnaSvg,
};

// ---------------------------------------------------------------- 2 Krajina
const krajinaSvg = `<svg viewBox="0 0 400 240" role="img" aria-labelledby="il2t" style="max-width:40rem;margin:0 auto;border-radius:18px">
<title id="il2t">Plochá ilustrace: lithiová baterie nabitá na 70 procent v krajině se sluncem</title>
<rect width="400" height="240" fill="var(--il-sky)"/>
<circle cx="330" cy="58" r="26" fill="var(--il-sun)"/>
<g stroke="var(--il-sun)" stroke-width="5" stroke-linecap="round"><path d="M330 14v-6M366 30l5-5M374 58h7M294 30l-5-5M286 58h-7"/></g>
<path d="M0 170Q90 120 190 160T400 140V240H0z" fill="var(--il-hill1)"/>
<path d="M0 205Q120 170 250 200T400 190V240H0z" fill="var(--il-hill2)"/>
<rect x="140" y="80" width="26" height="16" rx="5" fill="var(--il-term)"/>
<rect x="234" y="80" width="26" height="16" rx="5" fill="var(--il-term)"/>
<rect x="110" y="92" width="180" height="122" rx="20" fill="var(--il-body)"/>
<text x="153" y="126" font-size="26" font-weight="700" text-anchor="middle" style="fill:var(--il-on-body)">+</text>
<text x="247" y="126" font-size="26" font-weight="700" text-anchor="middle" style="fill:var(--il-on-body)">−</text>
<rect x="130" y="138" width="140" height="34" rx="10" fill="var(--il-win)"/>
<rect x="134" y="142" width="92" height="26" rx="7" fill="var(--il-charge)"/>
<text x="200" y="202" font-size="22" font-weight="700" text-anchor="middle" style="fill:var(--il-on-body)">70 %</text>
</svg>
<p class="legend">Ploché tvary, měkké rohy, žádné obrysy. Polarita je vždy napsaná znakem plus a minus, nejen barvou. Nabití 70 % je jen ilustrační hodnota. Ve stejném stylu by se baterie v kalkulačce soběstačnosti den po dni vybíjela a nabíjela.</p>`;

const krajina = {
  n: 2,
  slug: "krajina",
  name: "Krajina",
  feel: "Vzdušné a přívětivé, jako dobře naplánovaná cesta. Písmo navržené pro čitelnost, měkké tvary, petrolejová barva jezera a smrků. Klidné i pro toho, kdo elektřině zatím nerozumí.",
  font: { family: "Atkinson Hyperlegible Next", file: "atkinson-hyperlegible-next", fallback: 'system-ui,"Segoe UI",Roboto,sans-serif', license: "SIL OFL 1.1" },
  radius: "22px",
  radiusSm: "14px",
  motion: 260,
  scale: { display: 3.3, h1: 2.4, h2: 1.6, h3: 1.2, lead: 1.2, small: 0.9, foot: 0.8 },
  paletteNote: "Chladné, světlé pozadí s nádechem zeleně, petrolejový akcent. Teplé barvy jsou vyhrazené pro slunce v ilustracích a pro varování.",
  illNote: "Plochá ilustrace bez obrysů, zaoblené tvary, nebe, kopce a slunce jako kulisa, technický prvek v popředí. Stejný styl by měl řez dodávkou.",
  chips: CHIPS,
  logo: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="var(--accent)"/><path d="M5 22q6-7 11-3t11-2" stroke="var(--on-accent)" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  tokens: {
    light: {
      bg: "#F2F6F5", surface: "#FFFFFF", surface2: "#E2EDEB", text: "#10201F", muted: "#42524F",
      border: "#6C7E7A", line: "#D3DFDC", accent: "#0F5561", onAccent: "#FFFFFF", accentText: "#0D4F5A",
      focus: "#10201F", okFg: "#1A4C26", okBg: "#E0F0E2", warnFg: "#633D00", warnBg: "#FBEFCF",
      blockFg: "#871B1B", blockBg: "#FBE2E0",
      ilSky: "#D7EAEC", ilSun: "#E8B04F", ilHill1: "#A9CCC0", ilHill2: "#77A797", ilBody: "#24403E",
      ilTerm: "#55706C", ilOnBody: "#FFFFFF", ilWin: "#132927", ilCharge: "#8FD3A5", copper: "#B8692F",
    },
    dark: {
      bg: "#0E1716", surface: "#162220", surface2: "#1E2D2B", text: "#E7F0EE", muted: "#AFC1BD",
      border: "#7A8E8A", line: "#2B3B39", accent: "#86D0D6", onAccent: "#062022", accentText: "#93D7DD",
      focus: "#E7F0EE", okFg: "#A3DFB2", okBg: "#13261A", warnFg: "#F2CB7A", warnBg: "#2A2111",
      blockFg: "#FFB4AE", blockBg: "#351817",
      ilSky: "#1A2C33", ilSun: "#D9A345", ilHill1: "#2C4A44", ilHill2: "#3B6157", ilBody: "#D4E4E1",
      ilTerm: "#9DB5B0", ilOnBody: "#0E1716", ilWin: "#2A3D3A", ilCharge: "#6FC48D", copper: "#D98B50",
    },
  },
  css: `
section{border-top:0;padding:calc(var(--space)*1.75) 0}
.tile-head{background:var(--surface2);border-radius:0 0 40px 40px;margin-bottom:1rem}
.kicker{font-weight:600;margin-bottom:.5rem}
.panel,.res,.ill,.pal-mode{border:0;box-shadow:0 1px 2px rgba(10,40,40,.06),0 10px 30px rgba(10,40,40,.08)}
:root[data-theme="dark"] .panel,:root[data-theme="dark"] .res,:root[data-theme="dark"] .ill{box-shadow:none;border:1px solid var(--line)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .panel,:root:not([data-theme="light"]) .res,:root:not([data-theme="light"]) .ill{box-shadow:none;border:1px solid var(--line)}}
.btn,.seg span{border-radius:999px}
.seg span{padding:.5rem 1rem}
.field{border-radius:14px}
.big{background:var(--surface2);border-radius:16px;padding:1.1rem 1.25rem}
.msg{border-left:0;border-radius:16px;box-shadow:inset 0 0 0 2px currentColor}
.msg.block{box-shadow:inset 0 0 0 4px currentColor}
.legend{max-width:40rem;margin:1rem auto 0;color:var(--muted)}
`,
  illustration: krajinaSvg,
};

// ---------------------------------------------------------------- 3 Přístroj
const pristrojSvg = `<svg viewBox="0 0 400 230" role="img" aria-labelledby="il3t" style="max-width:40rem;margin:0 auto">
<title id="il3t">Řez kabelem zbarvený podle zatížení a ukazatel zatížení 31 procent</title>
<rect width="400" height="230" rx="14" fill="var(--panel-bg)"/>
<circle cx="95" cy="115" r="62" fill="var(--il-ins)"/>
<circle cx="95" cy="115" r="42" fill="var(--il-load)"/>
<g fill="none" stroke="var(--panel-bg)" stroke-opacity=".35" stroke-width="1.5">
<circle cx="95" cy="115" r="8"/>${[0, 1, 2, 3, 4, 5].map((i) => { const a = (i * Math.PI) / 3; return `<circle cx="${(95 + 16 * Math.cos(a)).toFixed(1)}" cy="${(115 + 16 * Math.sin(a)).toFixed(1)}" r="8"/>`; }).join("")}${[...Array(12)].map((_, i) => { const a = (i * Math.PI) / 6 + Math.PI / 12; return `<circle cx="${(95 + 31 * Math.cos(a)).toFixed(1)}" cy="${(115 + 31 * Math.sin(a)).toFixed(1)}" r="8"/>`; }).join("")}
</g>
<text x="190" y="62" font-size="20" font-weight="600" style="fill:var(--panel-muted);letter-spacing:.08em">ZATÍŽENÍ KABELU</text>
${[...Array(10)].map((_, i) => `<rect x="${190 + i * 19}" y="80" width="15" height="28" rx="2" fill="${i < 3 ? "var(--il-load)" : "var(--il-track)"}"/>`).join("")}
<path d="M249 116l-7 10h14z" fill="var(--panel-text)"/>
<text x="190" y="172" font-size="44" font-weight="700" style="fill:var(--panel-text)">31 %</text>
<text x="190" y="204" font-size="20" style="fill:var(--panel-muted)">10 A z 32 A</text>
</svg>
<p class="legend">Ilustrace jako displej přístroje: tmavý panel ve světlém i tmavém režimu, vodič zbarvený podle zatížení, ukazatel po dílcích. Zatížení 31 % je proud 10 A proti zatížitelnosti 32 A pro 2,5 mm² z tabulky v referenční kalkulačce.</p>`;

const pristroj = {
  n: 3,
  slug: "pristroj",
  name: "Přístroj",
  feel: "Sebevědomý jako dobrý měřák. Grafit, kobaltová modř a výsledek na tmavém displeji, který je vidět i na slunci. Úsporné písmo, pevná mřížka, čísla jako hlavní hrdina.",
  font: { family: "Inter", file: "inter", fallback: 'system-ui,"Segoe UI",Roboto,sans-serif', license: "SIL OFL 1.1" },
  radius: "10px",
  radiusSm: "8px",
  motion: 180,
  scale: { display: 3.6, h1: 2.4, h2: 1.5, h3: 1.15, lead: 1.15, small: 0.875, foot: 0.8 },
  paletteNote: "Studený grafit, kobaltový akcent a samostatný tmavý panel pro výsledek a hlavičku.",
  illNote: "Ilustrace jako displej: geometrické tvary, tmavý panel, barva vodiče podle zatížení, popisky v obrázku jen velké. Funguje stejně ve světlém i tmavém režimu.",
  chips: [...CHIPS, ["panelBg", "Panel"], ["panelAccent", "Akcent na panelu"]],
  logo: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="6" width="28" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M8 20l5-6 4 3 6-7" stroke="var(--accent)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  tokens: {
    light: {
      bg: "#F3F4F7", surface: "#FFFFFF", surface2: "#E6E8EE", text: "#101218", muted: "#474C57",
      border: "#707684", line: "#D5D8DF", accent: "#2A40B0", onAccent: "#FFFFFF", accentText: "#273DA8",
      focus: "#101218", okFg: "#17502C", okBg: "#E0F0E3", warnFg: "#613C00", warnBg: "#FAEECF",
      blockFg: "#8A1B16", blockBg: "#FBE3E0",
      panelBg: "#151821", panelText: "#F3F5F9", panelMuted: "#AEB5C2", panelAccent: "#A9B8FF",
      ilIns: "#3A4152", ilLoad: "#6F8BFF", ilTrack: "#2E3442", copper: "#B8692F",
    },
    dark: {
      bg: "#0C0E12", surface: "#15181F", surface2: "#1D212A", text: "#EDF0F4", muted: "#AAB1BD",
      border: "#7A8291", line: "#2A2F3A", accent: "#9AACFF", onAccent: "#0A1036", accentText: "#A7B7FF",
      focus: "#EDF0F4", okFg: "#A1DEB0", okBg: "#12251A", warnFg: "#F1CA7A", warnBg: "#2A2110",
      blockFg: "#FFB3AC", blockBg: "#351716",
      panelBg: "#1C2029", panelText: "#F3F5F9", panelMuted: "#B1B8C5", panelAccent: "#B3C0FF",
      ilIns: "#3E4558", ilLoad: "#7C95FF", ilTrack: "#30374A", copper: "#D98B50",
    },
  },
  headClass: "dark-panel",
  resClass: "dark-panel display",
  css: `
.dark-panel{--bg:var(--panel-bg);--surface:var(--panel-bg);--surface2:var(--panel-bg);--text:var(--panel-text);--muted:var(--panel-muted);--border:var(--panel-muted);--line:rgba(255,255,255,.14);--accent:var(--panel-accent);--on-accent:var(--panel-bg);--accent-text:var(--panel-accent);--focus:var(--panel-text);background:var(--panel-bg);color:var(--panel-text)}
.tile-head{margin-bottom:0}
.tile-head h1{letter-spacing:-.02em;font-size:calc(var(--fs-h1)*1.1);margin-bottom:1rem}
.kicker{text-transform:uppercase;letter-spacing:.12em;font-size:var(--fs-small);font-weight:600;margin-bottom:.75rem}
h2{letter-spacing:-.01em}
.res.display{border:0}
.big-k{text-transform:uppercase;letter-spacing:.08em}
.big-v{letter-spacing:-.025em}
.big-v .u{color:var(--panel-accent)}
.big>div{border-top:2px solid var(--line);padding-top:.75rem}
.panel{border-color:var(--border)}
.ill{background:transparent;border:0;padding:0}
.legend{max-width:40rem;margin:1rem auto 0;color:var(--muted)}
`,
  illustration: pristrojSvg,
};

export const SMERY = [dilna, krajina, pristroj];
