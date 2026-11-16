// Generátor style tiles tří směrů vzhledu (docs/design/smery/).
// Spuštění: node tools/design-smery/generuj.mjs
// Každá vygenerovaná stránka je samostatná (CSS, JS, SVG i odkazy na fonty v docs/design/smery/fonty/),
// funguje otevřená ze souboru a bez internetu. Kontrastní poměry počítá tento skript ze stejných tokenů,
// ze kterých skládá CSS, a když pár nesplní minimum, skončí chybou.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SMERY } from "./smery.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "docs", "design", "smery");

// ---------- kontrast podle WCAG 2.x ----------
function lum(hex) {
  const h = hex.replace("#", "");
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const l = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
export function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
// Zaokrouhlení dolů, ať poměr nikdy nepřikrášlíme.
const fmtRatio = (r) => (Math.floor(r * 100) / 100).toFixed(2).replace(".", ",");

// Páry, které se kontrolují. min: 7 = běžný text (AAA), 4,5 = vedlejší text, 3 = netextový prvek (WCAG 1.4.11).
const PAIRS = [
  ["Text na pozadí", "text", "bg", 7],
  ["Text na kartě", "text", "surface", 7],
  ["Text na tónované ploše", "text", "surface2", 7],
  ["Vedlejší text na pozadí", "muted", "bg", 4.5],
  ["Vedlejší text na kartě", "muted", "surface", 4.5],
  ["Vedlejší text na tónované ploše", "muted", "surface2", 4.5],
  ["Akcentní text (odkaz) na pozadí", "accentText", "bg", 7],
  ["Akcentní text (odkaz) na kartě", "accentText", "surface", 7],
  ["Popisek tlačítka na akcentu", "onAccent", "accent", 7],
  ["Hláška OK", "okFg", "okBg", 7],
  ["Hláška varování", "warnFg", "warnBg", 7],
  ["Hláška blok", "blockFg", "blockBg", 7],
  ["Okraj pole na kartě", "border", "surface", 3],
  ["Tlačítko (plocha) vůči kartě", "accent", "surface", 3],
  ["Fokus vůči pozadí", "focus", "bg", 3],
];
const PANEL_PAIRS = [
  ["Číslo výsledku na panelu", "panelText", "panelBg", 7],
  ["Vedlejší text na panelu", "panelMuted", "panelBg", 4.5],
  ["Akcent na panelu", "panelAccent", "panelBg", 7],
];

function contrastRows(tokens) {
  const pairs = tokens.panelBg ? [...PAIRS, ...PANEL_PAIRS] : PAIRS;
  return pairs.map(([label, fg, bg, min]) => {
    if (!tokens[fg] || !tokens[bg]) throw new Error(`chybí token ${fg} nebo ${bg}`);
    const r = ratio(tokens[fg], tokens[bg]);
    return { label, fg, bg, fgHex: tokens[fg], bgHex: tokens[bg], min, r, ok: r >= min };
  });
}

// ---------- česká typografie v textu stránky ----------
const NBSP = " ";
function typo(t) {
  return t
    .replace(/(\d) (?=(mm²|mm|V|A|W|Wh|Ah|m|%|Kč|px|°C|ms|rem)(?![\p{L}]))/gu, `$1${NBSP}`)
    .replace(/(^|[\s(„])([vkszouaiVKSZOUAI]) /gu, `$1$2${NBSP}`)
    .replace(/(\d) : (\d)/g, `$1${NBSP}:${NBSP}$2`);
}
const typoHtml = (html) => html.replace(/>([^<]+)</g, (m, t) => ">" + typo(t) + "<");

// ---------- CSS ----------
const cssVars = (t) =>
  Object.entries(t)
    .map(([k, v]) => `--${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}:${v};`)
    .join("");

function fontFaces(f) {
  const rangeLatin =
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
  const rangeExt =
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
  return [400, 600, 700]
    .flatMap((w) => [
      `@font-face{font-family:"${f.family}";font-style:normal;font-weight:${w};font-display:swap;src:url(fonty/${f.file}-latin-ext-${w}-normal.woff2) format("woff2");unicode-range:${rangeExt}}`,
      `@font-face{font-family:"${f.family}";font-style:normal;font-weight:${w};font-display:swap;src:url(fonty/${f.file}-latin-${w}-normal.woff2) format("woff2");unicode-range:${rangeLatin}}`,
    ])
    .join("\n");
}

function baseCss(s) {
  const sc = s.scale;
  return `
${fontFaces(s.font)}
:root{${cssVars(s.tokens.light)}color-scheme:light;
  --font:"${s.font.family}",${s.font.fallback};
  --r:${s.radius};--r-sm:${s.radiusSm};
  --fs-display:clamp(2.2rem,1.2rem + 7vw,${sc.display}rem);--fs-h1:clamp(1.6rem,1rem + 4vw,${sc.h1}rem);--fs-h2:${sc.h2}rem;--fs-h3:${sc.h3}rem;--fs-lead:${sc.lead}rem;--fs-body:1rem;--fs-small:${sc.small}rem;--fs-foot:${sc.foot}rem;
  --space:1.5rem;--tap:3rem;--dur:${s.motion}ms}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${cssVars(s.tokens.dark)}color-scheme:dark}}
:root[data-theme="dark"]{${cssVars(s.tokens.dark)}color-scheme:dark}
@media (prefers-reduced-motion:reduce){:root{--dur:0ms}}
*,*::before,*::after{box-sizing:border-box}
html{font-size:112.5%;-webkit-text-size-adjust:100%;text-size-adjust:100%}
@media (min-width:1024px){html{font-size:125%}}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font);font-size:var(--fs-body);line-height:1.55;font-weight:400;font-kerning:normal;overflow-wrap:break-word}
.num,table,.big-v,.dl dd,.field input{font-variant-numeric:tabular-nums lining-nums}
.wrap{max-width:70rem;margin:0 auto;padding:0 max(16px,4vw)}
h1,h2,h3{line-height:1.2;margin:0;font-weight:700;text-wrap:balance}
h1{font-size:var(--fs-h1)}h2{font-size:var(--fs-h2)}h3{font-size:var(--fs-h3);font-weight:600}
p{margin:0 0 1em;max-width:36em}
a{color:var(--accent-text);text-decoration-thickness:2px;text-underline-offset:.2em}
.lead{font-size:var(--fs-lead);max-width:34em}
.muted{color:var(--muted)}
.small{font-size:var(--fs-small)}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
section{padding:calc(var(--space)*2) 0;border-top:1px solid var(--line)}
.sec-head{margin-bottom:var(--space)}
.sec-head p{margin:.5rem 0 0;color:var(--muted)}
.grid2{display:grid;gap:var(--space)}
.grid2>*{min-width:0}
@media (min-width:900px){.grid2{grid-template-columns:1fr 1fr}.grid-calc{grid-template-columns:5fr 7fr;align-items:start}}

/* hlavička */
.tile-head{padding:1.5rem 0 2rem}
.tile-head h1{margin-bottom:.75rem}
.tile-head .top{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;margin-bottom:2rem}
.brand{font-weight:700;font-size:1.15rem;letter-spacing:.01em;display:flex;align-items:center;gap:.5rem}
.brand svg{width:1.6rem;height:1.6rem}

/* písmo */
.scale{width:100%;border-collapse:collapse}
.scale td{padding:.75rem .5rem .75rem 0;border-bottom:1px solid var(--line);vertical-align:baseline}
.scale td.meta{color:var(--muted);font-size:var(--fs-small);white-space:nowrap;text-align:right;padding-right:0}
@media (max-width:30rem){.scale td{display:block;padding:.6rem 0 0;border:0}.scale td.meta{text-align:left;white-space:normal;padding:0 0 .6rem;border-bottom:1px solid var(--line)}}
.digits{width:100%;max-width:30rem;border-collapse:collapse;margin-top:1rem}
.digits th,.digits td{padding:.6rem .25rem;border-bottom:1px solid var(--line);text-align:right}
.digits th:first-child,.digits td:first-child{text-align:left}
.digits th{font-weight:600;color:var(--muted);font-size:var(--fs-small)}
.prop{font-variant-numeric:proportional-nums}

/* paleta */
.pal{display:grid;gap:var(--space)}
@media (min-width:900px){.pal{grid-template-columns:1fr 1fr}}
.pal-mode{border-radius:var(--r);padding:1.25rem;border:1px solid var(--line)}
.pal-mode h3{margin-bottom:1rem}
.chips{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(6.5rem,100%),1fr));gap:.5rem;margin-bottom:1.25rem}
.chip{border-radius:var(--r-sm);padding:.5rem;font-size:var(--fs-small);line-height:1.3;min-height:4.5rem;border:1px solid rgba(127,127,127,.35)}
.chip b{display:block;font-weight:600}
.ctable{width:100%;border-collapse:collapse;font-size:var(--fs-small)}
.ctable td{padding:.45rem .25rem;border-top:1px solid rgba(127,127,127,.3);vertical-align:middle}
.ctable td.r{text-align:right;white-space:nowrap;font-weight:600}
@media (max-width:30rem){.ctable tr{display:block;padding:.45rem 0;border-top:1px solid rgba(127,127,127,.3)}.ctable td{display:inline-block;border:0;padding:.1rem .4rem .1rem 0}.ctable td:first-child{display:block}.ctable td.r{text-align:left}}
.sample{display:inline-block;min-width:2.6rem;text-align:center;border-radius:6px;padding:.1rem .35rem;font-weight:600;margin-right:.4rem}

/* ovládání */
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:clamp(1rem,4vw,1.75rem)}
.ctl{margin:0 0 1.75rem;padding:0;border:0;min-width:0}
.ctl:last-child{margin-bottom:0}
.lbl{display:block;font-weight:600;margin:0 0 .5rem;padding:0;font-size:1rem}
.hint{display:block;color:var(--muted);font-size:var(--fs-small);margin-top:.4rem}
.btn{font:inherit;font-weight:600;min-height:var(--tap);min-width:var(--tap);padding:.6rem 1.4rem;border-radius:var(--r-sm);border:2px solid var(--accent);background:var(--accent);color:var(--on-accent);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;line-height:1.2;text-align:center}
.btn svg{width:1.25em;height:1.25em;flex:none}
.btn.sec{background:transparent;color:var(--accent-text);border-color:var(--border)}
.btn:hover{filter:brightness(1.08)}
.btn.sec:hover{background:var(--surface2);filter:none}
.btns{display:flex;flex-wrap:wrap;gap:.75rem}
.seg{display:flex;flex-wrap:wrap;gap:.5rem}
.seg label{flex:1 1 7rem;position:relative;display:flex}
.seg input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.seg span{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:var(--tap);padding:.5rem .75rem;border:2px solid var(--border);border-radius:var(--r-sm);background:var(--surface);color:var(--text);line-height:1.25;font-weight:600}
.seg span small{font-weight:400;font-size:var(--fs-small);color:inherit}
.seg input:checked+span{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.seg input:focus-visible+span{outline:3px solid var(--focus);outline-offset:3px}
.field{display:flex;align-items:stretch;border:2px solid var(--border);border-radius:var(--r-sm);background:var(--surface);max-width:16rem}
.field:focus-within{outline:3px solid var(--focus);outline-offset:3px}
.field input{font:inherit;font-size:1.25rem;font-weight:600;border:0;background:transparent;color:var(--text);padding:.5rem .75rem;min-height:var(--tap);width:100%;min-width:0;outline:none}
.field .unit{display:flex;align-items:center;padding:0 .9rem;color:var(--muted);font-weight:600;border-left:1px solid var(--line)}
.err{display:none;color:var(--block-fg);background:var(--block-bg);border-radius:var(--r-sm);padding:.4rem .6rem;margin-top:.5rem;font-size:var(--fs-small);font-weight:600}
.err.on{display:block}
.range-row{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}
.range-row .btn{padding:.4rem .7rem;flex:none;min-width:var(--tap)}
.range-wrap{position:relative;flex:1 1 5rem;min-width:0}
.range-row .btn{padding-inline:.55rem}
@media (min-width:40rem){.theme-switch .seg label{flex:0 0 auto}}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:var(--tap);background:transparent;margin:0;cursor:pointer;display:block}
input[type=range]:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:var(--r-sm)}
input[type=range]::-webkit-slider-runnable-track{height:.5rem;border-radius:1rem;background:linear-gradient(to right,var(--accent) 0 var(--p,50%),var(--border) var(--p,50%) 100%)}
input[type=range]::-moz-range-track{height:.5rem;border-radius:1rem;background:var(--border)}
input[type=range]::-moz-range-progress{height:.5rem;border-radius:1rem;background:var(--accent)}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:2rem;height:2rem;margin-top:-.75rem;border-radius:50%;background:var(--surface);border:3px solid var(--accent);box-shadow:0 1px 3px rgba(0,0,0,.3)}
input[type=range]::-moz-range-thumb{width:2rem;height:2rem;border-radius:50%;background:var(--surface);border:3px solid var(--accent);box-shadow:0 1px 3px rgba(0,0,0,.3)}
.ticks{position:relative;height:.75rem;margin:-.6rem 1rem 0}
.ticks i{position:absolute;top:0;width:2px;height:.75rem;background:var(--muted);transform:translateX(-1px)}
.next{margin:.6rem 0 0;font-size:var(--fs-small);color:var(--muted)}
.next b{color:var(--text)}

/* výsledek */
.res{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:clamp(1rem,4vw,1.75rem)}
.res-title{display:flex;justify-content:space-between;gap:1rem;align-items:baseline;flex-wrap:wrap;margin-bottom:1rem}
.big{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(13rem,100%),1fr));gap:1rem}
.big-k{font-weight:600;color:var(--muted);font-size:var(--fs-small)}
.big-v{font-size:var(--fs-display);font-weight:700;line-height:1.05;letter-spacing:-.01em;white-space:nowrap}
.big-v .u{font-size:.5em;font-weight:600;letter-spacing:0;margin-left:.1em}
.big-s{color:var(--muted);font-size:var(--fs-small);margin-top:.25rem}
.pulse{animation:pulse var(--dur) ease-out}
@keyframes pulse{from{opacity:.35}to{opacity:1}}
.dl{display:grid;grid-template-columns:1fr auto;gap:0;margin:1.25rem 0}
.dl dt,.dl dd{margin:0;padding:.55rem 0;border-bottom:1px solid var(--line)}
.dl dt{color:var(--muted);padding-right:1rem}
.dl dd{text-align:right;font-weight:600;white-space:nowrap}
.scalebox{display:flex;align-items:center;gap:1rem;margin:1rem 0;padding:.75rem 0}
.scalebox svg{flex:none}
.note{font-size:var(--fs-small);color:var(--muted);margin:1rem 0 0}

/* hlášky */
.msgs{display:grid;gap:1rem}
.msg{display:grid;grid-template-columns:auto 1fr;gap:.25rem .9rem;align-items:start;padding:1rem 1.1rem;border-radius:var(--r-sm);border-left:6px solid currentColor;max-width:44rem}
.msg svg{width:1.75rem;height:1.75rem;grid-row:span 2;margin-top:.05rem}
.msg strong{font-size:1.05rem}
.msg p{margin:0;grid-column:2}
.msg.ok{background:var(--ok-bg);color:var(--ok-fg)}
.msg.warn{background:var(--warn-bg);color:var(--warn-fg)}
.msg.block{background:var(--block-bg);color:var(--block-fg)}
.msg.block{border-left-width:10px}

/* ilustrace */
.ill{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:clamp(.75rem,3vw,1.5rem)}
.ill svg{display:block;width:100%;height:auto}
.ill svg text{font-family:var(--font);fill:var(--text)}

footer{padding:2rem 0 3rem;border-top:1px solid var(--line);font-size:var(--fs-foot);color:var(--muted)}
footer p{max-width:60em;margin:0 0 .5rem}
/* velmi úzké okno (360 px při 200% zvětšení) */
@media (max-width:20rem){.ill{padding:0;border:0;background:transparent}.dl{grid-template-columns:1fr}.dl dt{border:0;padding-bottom:0}.dl dd{text-align:left;padding-top:.1rem;white-space:normal}.ctable td.r{white-space:normal}.pal-mode{overflow-wrap:anywhere}.chip{min-width:0}.digits thead{display:none}.digits td{display:block;text-align:left!important;border:0;padding:.1rem 0}.digits tr{display:block;border-bottom:1px solid var(--line);padding:.4rem 0}.msg{grid-template-columns:1fr}.msg svg{grid-row:auto}.msg p{grid-column:1}.pal-mode{padding:.75rem}}
`;
}

// ---------- HTML ----------
const ICON = {
  ok: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L1.8 20.5h20.4z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/></svg>`,
  block: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z"/><path d="M7 12h10"/></svg>`,
  share: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>`,
  link: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/></svg>`,
};

function paletteHtml(s, rows) {
  const mode = (key, title) => {
    const t = s.tokens[key];
    const show = s.chips;
    const chips = show
      .map(([tok, name]) => {
        const fg = ratio(t[tok], "#000000") > ratio(t[tok], "#ffffff") ? "#000000" : "#ffffff";
        return `<div class="chip" style="background:${t[tok]};color:${fg}"><b>${name}</b>${t[tok].toUpperCase()}</div>`;
      })
      .join("");
    const tr = rows[key]
      .map(
        (c) =>
          `<tr><td><span class="sample" style="color:${c.fgHex};background:${c.bgHex};${c.min === 3 ? `box-shadow:inset 0 0 0 3px ${c.fgHex};color:transparent` : ""}">Aa</span>${c.label}</td><td class="r">${fmtRatio(c.r)} : 1</td><td class="r">${c.ok ? "splňuje" : "NESPLŇUJE"} (min. ${String(c.min).replace(".", ",")})</td></tr>`,
      )
      .join("");
    return `<div class="pal-mode" style="background:${t.bg};color:${t.text};border-color:${t.line}">
<h3>${title}</h3><div class="chips">${chips}</div>
<table class="ctable"><tbody>${tr}</tbody></table></div>`;
  };
  return `<div class="pal">${mode("light", "Světlý režim")}${mode("dark", "Tmavý režim")}</div>`;
}

function page(s, rows) {
  const sc = s.scale;
  const px = (rem) => `${String(+(rem * 18).toFixed(1)).replace(".", ",")}/${String(+(rem * 20).toFixed(1)).replace(".", ",")} px`;
  const body = `
<header class="tile-head ${s.headClass || ""}"><div class="wrap">
  <div class="top">
    <div class="brand">${s.logo}<span>Caravanix</span></div>
    <fieldset class="ctl theme-switch" style="margin:0"><legend class="lbl" style="font-size:var(--fs-small)">Režim zobrazení</legend>
      <div class="seg" id="theme">
        <label><input type="radio" name="theme" value="system" checked><span>Podle zařízení</span></label>
        <label><input type="radio" name="theme" value="light"><span>Světlý</span></label>
        <label><input type="radio" name="theme" value="dark"><span>Tmavý</span></label>
      </div></fieldset>
  </div>
  <p class="kicker muted">Směr ${s.n} ze 3 · style tile k výběru</p>
  <h1>${s.name}</h1>
  <p class="lead">${s.feel}</p>
</div></header>

<main>
<section id="pismo"><div class="wrap">
  <div class="sec-head"><h2>Písmo</h2><p>${s.font.family}, licence ${s.font.license}. Jedna rodina, řezy 400, 600 a 700. Základní text 18 px na mobilu, 20 px na počítači, řádkování 1,55.</p></div>
  <div class="grid2">
    <div>
      <table class="scale"><tbody>
        <tr><td style="font-size:var(--fs-h1);font-weight:700;line-height:1.2">Nadpis 1</td><td class="meta">${px(sc.h1)} · 700</td></tr>
        <tr><td style="font-size:var(--fs-h2);font-weight:700;line-height:1.2">Nadpis 2</td><td class="meta">${px(sc.h2)} · 700</td></tr>
        <tr><td style="font-size:var(--fs-h3);font-weight:600">Nadpis 3</td><td class="meta">${px(sc.h3)} · 600</td></tr>
        <tr><td>Základní text</td><td class="meta">${px(1)} · 400</td></tr>
        <tr><td class="small" style="color:var(--muted)">Vedlejší text, nápověda</td><td class="meta">${px(sc.small)} · 400</td></tr>
        <tr><td style="font-size:var(--fs-foot)" data-foot>Patička</td><td class="meta">${px(sc.foot)} · 400</td></tr>
      </tbody></table>
    </div>
    <div>
      <h3 style="margin-bottom:.75rem">Proč na průřezu záleží</h3>
      <p>U 12 V tečou za stejný výkon velké proudy: 120 W je 10 A, 1 200 W už 100 A. Na dlouhém kabelu se ztratí část voltů. Lednice pak hlásí vybitou baterii, i když je plná, a měnič pípá a vypíná. Proti tomu pomáhá větší průřez nebo kratší trasa.</p>
      <p class="muted small">Ukázka odstavce: text převzatý z referenční kalkulačky průřezu, desetinná čárka, nezlomitelné mezery a „české uvozovky“.</p>
      <table class="digits"><thead><tr><th>Tabulkové číslice</th><th>Hodnota</th></tr></thead><tbody>
        <tr><td>Proud spotřebiče</td><td>10 A</td></tr>
        <tr><td>Úbytek napětí v kabelu</td><td>0,32 V</td></tr>
        <tr><td>Napětí u spotřebiče</td><td>11,68 V</td></tr>
        <tr><td>Ztráta (teplo v kabelu)</td><td>3,2 W</td></tr>
      </tbody></table>
      <p class="small muted" style="margin-top:.75rem">Pro srovnání proporcionální: <span class="prop">111,1 · 888,8</span>, tabulkové: <span class="num">111,1 · 888,8</span>.</p>
    </div>
  </div>
</div></section>

<section id="paleta"><div class="wrap">
  <div class="sec-head"><h2>Paleta</h2><p>${s.paletteNote} Kontrastní poměry spočítal generátor podle vzorce WCAG ze stejných hodnot, ze kterých je poskládané CSS. Běžný text min. 7 : 1, vedlejší text min. 4,5 : 1, okraje a plochy ovládacích prvků min. 3 : 1.</p></div>
  ${paletteHtml(s, rows)}
</div></section>

<section id="kalkulacka"><div class="wrap">
  <div class="sec-head"><h2>Ovládání a karta výsledku</h2><p>Ukázka kalkulačky průřezu: spotřebič 120 W, vlastní kabel plus i mínus, kabel vedený samostatně. Výpočet je převzatý z referenční kalkulačky, přepočítá se hned.</p></div>
  <div class="grid2 grid-calc">
    <form class="panel" id="calc" onsubmit="return false">
      <fieldset class="ctl"><legend class="lbl">Napětí soustavy</legend>
        <div class="seg" id="segU">
          <label><input type="radio" name="u" value="12" checked><span>12 V</span></label>
          <label><input type="radio" name="u" value="24"><span>24 V</span></label>
        </div></fieldset>
      <div class="ctl">
        <label class="lbl" for="len">Délka kabelu</label>
        <div class="field"><input id="len" type="text" inputmode="decimal" autocomplete="off" value="2,3" aria-describedby="len-hint len-err"><span class="unit">m</span></div>
        <span class="hint" id="len-hint">Jedna cesta od baterie ke spotřebiči. Můžete psát s čárkou i s tečkou.</span>
        <span class="err" id="len-err" role="alert"></span>
      </div>
      <div class="ctl">
        <label class="lbl" for="lenR">Nebo posuňte</label>
        <div class="range-row">
          <button type="button" class="btn sec" id="minus" aria-label="Kratší o 0,1 m">−&nbsp;0,1</button>
          <div class="range-wrap"><input id="lenR" type="range" min="0.5" max="12" step="0.1" value="2.3" aria-valuetext="2,3 metru"><div class="ticks" id="ticks" aria-hidden="true"></div></div>
          <button type="button" class="btn sec" id="plus" aria-label="Delší o 0,1 m">+&nbsp;0,1</button>
        </div>
        <p class="next" id="next"></p>
      </div>
      <fieldset class="ctl"><legend class="lbl">Co napájím</legend>
        <div class="seg" id="segDrop">
          <label><input type="radio" name="drop" value="3" checked><span>Elektronika, lednice<small>úbytek 3 %</small></span></label>
          <label><input type="radio" name="drop" value="5"><span>Běžné<small>úbytek 5 %</small></span></label>
          <label><input type="radio" name="drop" value="10"><span>Světla<small>úbytek 10 %</small></span></label>
        </div></fieldset>
      <div class="ctl btns">
        <button type="button" class="btn">Přidat do kusovníku</button>
        <button type="button" class="btn sec" id="reset">Vrátit výchozí</button>
      </div>
    </form>

    <div class="res ${s.resClass || ""}" id="res" aria-live="polite">
      <div class="res-title"><h3>Výsledek</h3><span class="small res-sub">12 V · 120 W · 2,3 m</span></div>
      <div class="big">
        <div><div class="big-k">Průřez kabelu</div><div class="big-v" id="vA">2,5<span class="u">mm²</span></div><div class="big-s" id="vAwg">nebo AWG 12 (3,31 mm²)</div></div>
        <div><div class="big-k">Pojistka</div><div class="big-v" id="vF">15<span class="u">A</span></div><div class="big-s">u baterie, na plusu</div></div>
      </div>
      <dl class="dl" id="det">
        <dt>Proud spotřebiče</dt><dd>10 A</dd>
        <dt>Úbytek napětí v kabelu</dt><dd>0,32 V (2,7 %)</dd>
        <dt>Napětí u spotřebiče</dt><dd>11,68 V</dd>
        <dt>Ztráta (teplo v kabelu)</dt><dd>3,2 W</dd>
        <dt>Max. pojistka pro 2,5 mm²</dt><dd>20 A</dd>
      </dl>
      <div class="scalebox"><svg id="xs" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"></svg><p class="small" id="xs-t" style="margin:0"></p></div>
      <div id="msgs"></div>
      <div class="btns" style="margin-top:1.25rem">
        <button type="button" class="btn">${ICON.share}Sdílet výsledek</button>
        <button type="button" class="btn sec">${ICON.link}Kopírovat odkaz</button>
      </div>
      <p class="note">Výsledek je podklad pro návrh, ne revize elektroinstalace.</p>
    </div>
  </div>
</div></section>

<section id="hlasky"><div class="wrap">
  <div class="sec-head"><h2>Hlášky</h2><p>Stav se nikdy nesděluje jen barvou: vždy barva, ikona a slovo. Blok má navíc silnější okraj a nejde obejít.</p></div>
  <div class="msgs">
    <div class="msg ok" role="status">${ICON.ok}<strong>V pořádku</strong><p>Kabel 2,5 mm² snese pojistku až 20 A. Zvolená pojistka 15 A je v limitu.</p></div>
    <div class="msg warn" role="status">${ICON.warn}<strong>Pozor</strong><p>Počítáno s mínusem přes kostru bez odporu spojů. Dobrý, čistý kostřicí bod je nutnost.</p></div>
    <div class="msg block" role="alert">${ICON.block}<strong>Stop</strong><p>Ani 120 mm² nestačí. Zkraťte trasu, povolte větší úbytek, použijte paralelní kabely nebo vyšší napětí (24 V).</p></div>
  </div>
</div></section>

<section id="ilustrace"><div class="wrap">
  <div class="sec-head"><h2>Styl ilustrace</h2><p>${s.illNote}</p></div>
  <div class="ill">${s.illustration}</div>
</div></section>
</main>

<footer><div class="wrap">
  <p>Caravanix · style tile, směr ${s.n}: ${s.name}. Ukázková čísla: 12 V, 120 W, 2,3 m, úbytek 3 %, výpočet podle referenční kalkulačky průřezu. Nepublikovat.</p>
  <p>Písmo ${s.font.family} (${s.font.license}), self-hosted ze složky fonty/. Výstup je podklad, ne revize.</p>
</div></footer>`;

  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Caravanix – směr ${s.n}: ${s.name}</title>
<style>${baseCss(s)}
/* charakter směru */
${s.css}
</style>
</head>
<body class="smer-${s.n}">
${typoHtml(body)}
<script>
${SCRIPT}
</script>
</body>
</html>
`;
}

// Výpočet je 1:1 převzatý z docs/reference/kalkulacka-prurezu-v1.html (tabulky i funkce amp, interp, maxFuse).
const SCRIPT = String.raw`(function(){
"use strict";
var MM=[0.5,0.75,1,1.5,2.5,4,6,10,16,25,35,50,70,95,120];
var AMP=[12,15,19,24,32,42,54,73,98,129,158,198,245,292,344];
var AWG=[["20",0.52],["18",0.82],["16",1.31],["14",2.08],["12",3.31],["10",5.26],["8",8.37],["6",13.3],["4",21.2],["2",33.6],["1",42.4],["1/0",53.5],["2/0",67.4],["3/0",85],["4/0",107]];
var CAPN=[7.5,10,15,15,20,30,40,60,80,100,125,150,200,250,300];
var CAPH=[7.5,10,10,15,20,25,35,50,60,80,100,125,150,200,225];
var FUSES=[1,2,3,5,7.5,10,15,20,25,30,35,40,50,60,70,80,100,125,150,175,200,225,250,300];
function amp(a){if(a<=MM[0])return AMP[0]*a/MM[0];for(var i=1;i<MM.length;i++){if(a<=MM[i]){var t=Math.log(a/MM[i-1])/Math.log(MM[i]/MM[i-1]);return Math.exp(Math.log(AMP[i-1])+t*Math.log(AMP[i]/AMP[i-1]))}}return AMP[AMP.length-1]*a/MM[MM.length-1]}
function interp(arr,a){if(a<=MM[0])return arr[0]*a/MM[0];for(var i=1;i<MM.length;i++){if(a<=MM[i]){var t=Math.log(a/MM[i-1])/Math.log(MM[i]/MM[i-1]);return Math.exp(Math.log(arr[i-1])+t*Math.log(arr[i]/arr[i-1]))}}return arr[arr.length-1]*a/MM[MM.length-1]}
function maxFuse(a,k){var lim=Math.min(amp(a)*k,interp(k<1?CAPH:CAPN,a));var f=0;for(var j=0;j<FUSES.length;j++)if(FUSES[j]<=lim+1e-9)f=FUSES[j];return f}
var NB=" ";
function fmt(x,d){if(d===undefined)d=1;return x.toLocaleString("cs-CZ",{maximumFractionDigits:d,minimumFractionDigits:0})}
function num(s){return parseFloat(String(s).replace(",",".").replace(/\s/g,""))}
var st={U:12,P:120,drop:3,ret:2,L:2.3};
var rho=0.0175,k=1;
function solve(L){
  var U=st.U,I=st.P/U,dU=U*st.drop/100,Lc=L*st.ret,Areq=rho*Lc*I/dU;
  var fuse=null;for(var i=0;i<FUSES.length;i++)if(FUSES[i]>=I*1.1){fuse=FUSES[i];break}
  if(fuse===null)return {err:"range",I:I};
  var ok=function(a){return a>=Areq&&maxFuse(a,k)>=fuse};
  var idx=-1;for(i=0;i<MM.length;i++)if(ok(MM[i])){idx=i;break}
  return {U:U,I:I,dU:dU,Lc:Lc,Areq:Areq,fuse:fuse,idx:idx,ok:ok};
}
var $=function(id){return document.getElementById(id)};
var lenI=$("len"),lenR=$("lenR"),err=$("len-err");
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function pulse(el,html){if(el.innerHTML===html)return;el.innerHTML=html;if(reduce)return;el.classList.remove("pulse");void el.offsetWidth;el.classList.add("pulse")}
function msg(kind,word,text){
  var ic={ok:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>',
    warn:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L1.8 20.5h20.4z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/></svg>',
    block:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z"/><path d="M7 12h10"/></svg>'}[kind];
  return '<div class="msg '+kind+'">'+ic+'<strong>'+word+'</strong><p>'+text+'</p></div>';
}
function ticks(){
  var box=$("ticks"),min=+lenR.min,max=+lenR.max,prev=null,h="";
  for(var L=min;L<=max+1e-9;L=Math.round((L+0.1)*10)/10){var r=solve(L);if(prev!==null&&r.idx!==prev){h+='<i style="left:'+((L-min)/(max-min)*100)+'%"></i>'}prev=r.idx}
  box.innerHTML=h;
}
function render(){
  var L=st.L,r=solve(L);
  var p=(Math.min(Math.max(L,+lenR.min),+lenR.max)-lenR.min)/(lenR.max-lenR.min)*100;
  lenR.style.setProperty("--p",p+"%");
  lenR.setAttribute("aria-valuetext",fmt(L)+" metru");
  document.querySelector(".res-sub").textContent=st.U+NB+"V · "+st.P+NB+"W · "+fmt(L)+NB+"m";
  if(r.err||r.idx<0){
    pulse($("vA"),"–");pulse($("vF"),"–");$("vAwg").textContent="";$("det").innerHTML="";
    $("msgs").innerHTML=msg("block","Stop","Ani 120"+NB+"mm² nestačí. Zkraťte trasu, povolte větší úbytek, použijte paralelní kabely nebo vyšší napětí (24"+NB+"V).");
    return;
  }
  var A=MM[r.idx],I=r.I,dUa=rho*r.Lc*I/A,pct=dUa/r.U*100,Pl=dUa*I,Lmax=r.dU*A/(rho*st.ret*I);
  var awg=null;for(var i=0;i<AWG.length;i++)if(r.ok(AWG[i][1])){awg=AWG[i];break}
  pulse($("vA"),fmt(A,2)+'<span class="u">mm²</span>');
  pulse($("vF"),fmt(r.fuse)+'<span class="u">A</span>');
  $("vAwg").textContent=awg?"nebo AWG "+awg[0]+" ("+fmt(awg[1],2)+NB+"mm²)":"AWG: použijte metrický";
  $("det").innerHTML="<dt>Proud spotřebiče</dt><dd>"+fmt(I)+NB+"A</dd><dt>Úbytek napětí v kabelu</dt><dd>"+fmt(dUa,2)+NB+"V ("+fmt(pct)+NB+"%)</dd><dt>Napětí u spotřebiče</dt><dd>"+fmt(r.U-dUa,2)+NB+"V</dd><dt>Ztráta (teplo v kabelu)</dt><dd>"+fmt(Pl)+NB+"W</dd><dt>Max. pojistka pro "+fmt(A,2)+NB+"mm²</dt><dd>"+fmt(maxFuse(A,k))+NB+"A</dd>";
  var iDrop=-1,iFuse=-1;for(i=0;i<MM.length;i++){if(iDrop<0&&MM[i]>=r.Areq)iDrop=i;if(iFuse<0&&maxFuse(MM[i],k)>=r.fuse)iFuse=i}
  var lim=iDrop>=iFuse?"Rozhodl úbytek napětí (délka trasy).":"Rozhodlo oteplení kabelu a velikost pojistky.";
  $("msgs").innerHTML=msg("ok","V pořádku",lim+" Na "+fmt(A,2)+NB+"mm² může být kabel při tomto proudu dlouhý až <b>"+fmt(Lmax)+NB+"m</b>.");
  // další stupeň na posuvníku
  var nx="";for(var l=Math.round((L+0.1)*10)/10;l<=+lenR.max+1e-9;l=Math.round((l+0.1)*10)/10){var q=solve(l);if(q.idx!==r.idx){nx=q.idx<0?"Od <b>"+fmt(l)+NB+"m</b> už výpočet nenajde vhodný kabel.":"Od <b>"+fmt(l)+NB+"m</b> bude potřeba <b>"+fmt(MM[q.idx],2)+NB+"mm²</b>.";break}}
  $("next").innerHTML=nx||"Do konce posuvníku zůstává "+fmt(A,2)+NB+"mm².";
  // řez vodičem ve skutečné velikosti: SVG v milimetrech
  var d=Math.sqrt(4*A/Math.PI),box=Math.max(d+2,6),xs=$("xs");
  xs.setAttribute("width",box+"mm");xs.setAttribute("height",box+"mm");xs.setAttribute("viewBox","0 0 "+box+" "+box);
  xs.innerHTML='<rect x=".15" y=".15" width="'+(box-.3)+'" height="'+(box-.3)+'" rx=".6" fill="none" stroke="var(--border)" stroke-width=".3" stroke-dasharray=".8 .5"/><circle cx="'+box/2+'" cy="'+box/2+'" r="'+d/2+'" fill="var(--copper)"/>';
  $("xs-t").innerHTML="Měděné jádro "+fmt(A,2)+NB+"mm² ve skutečné velikosti (průměr asi "+fmt(d)+NB+"mm). Na obrazovce bez kalibrace jen přibližně.";
}
function setL(v,from){
  st.L=Math.round(v*100)/100;
  if(from!=="input")lenI.value=fmt(st.L,2);
  if(from!=="range")lenR.value=Math.min(Math.max(st.L,+lenR.min),+lenR.max);
  render();
}
lenI.addEventListener("input",function(){
  var v=num(lenI.value);
  if(!(v>0)){err.textContent="Pozor: zadejte kladné číslo, třeba 2,3.";err.classList.add("on");return}
  err.classList.remove("on");err.textContent="";setL(v,"input");
});
lenR.addEventListener("input",function(){setL(+lenR.value,"range")});
$("minus").addEventListener("click",function(){setL(Math.max(0.1,Math.round((st.L-0.1)*10)/10))});
$("plus").addEventListener("click",function(){setL(Math.round((st.L+0.1)*10)/10)});
document.querySelectorAll('input[name="u"]').forEach(function(x){x.addEventListener("change",function(){st.U=+x.value;ticks();render()})});
document.querySelectorAll('input[name="drop"]').forEach(function(x){x.addEventListener("change",function(){st.drop=+x.value;ticks();render()})});
// režim zobrazení
var root=document.documentElement;
function theme(v){if(v==="system")root.removeAttribute("data-theme");else root.setAttribute("data-theme",v);try{localStorage.setItem("cx-theme",v)}catch(e){}}
var saved=null;try{saved=localStorage.getItem("cx-theme")}catch(e){}
var q=new URLSearchParams(location.search).get("theme");if(q)saved=q;
if(saved){theme(saved);var rb=document.querySelector('input[name="theme"][value="'+saved+'"]');if(rb)rb.checked=true}
document.querySelectorAll('input[name="theme"]').forEach(function(x){x.addEventListener("change",function(){theme(x.value)})});
$("reset").addEventListener("click",function(){st.U=12;st.drop=3;document.querySelector('input[name="u"][value="12"]').checked=true;document.querySelector('input[name="drop"][value="3"]').checked=true;err.classList.remove("on");ticks();setL(2.3)});
ticks();render();
})();`;

// ---------- běh ----------
let failed = false;
const report = [];
for (const s of SMERY) {
  const rows = { light: contrastRows(s.tokens.light), dark: contrastRows(s.tokens.dark) };
  for (const m of ["light", "dark"])
    for (const c of rows[m]) {
      if (!c.ok) {
        failed = true;
        console.error(`NESPLŇUJE  směr ${s.n} ${m}: ${c.label} ${c.fgHex}/${c.bgHex} = ${c.r.toFixed(2)} (min ${c.min})`);
      }
    }
  report.push({ n: s.n, slug: s.slug, name: s.name, rows });
  writeFileSync(join(OUT, `smer-${s.n}-${s.slug}.html`), page(s, rows));
}
// Souhrn kontrastů jako tabulka do README.
const lines = ["| Pár | Min. | " + report.flatMap((r) => [`${r.n} světlý`, `${r.n} tmavý`]).join(" | ") + " |"];
lines.push("| --- | --- | " + report.flatMap(() => ["---", "---"]).join(" | ") + " |");
const labels = [...new Set(report.flatMap((r) => r.rows.light.map((c) => c.label)))];
for (const l of labels) {
  const cells = report.flatMap((r) =>
    ["light", "dark"].map((m) => {
      const c = r.rows[m].find((x) => x.label === l);
      return c ? fmtRatio(c.r) : "–";
    }),
  );
  const min = report[0].rows.light.find((x) => x.label === l)?.min ?? report.find((r) => r.rows.light.find((x) => x.label === l)).rows.light.find((x) => x.label === l).min;
  lines.push(`| ${l} | ${String(min).replace(".", ",")} | ${cells.join(" | ")} |`);
}
writeFileSync(join(OUT, "kontrasty.md"), "<!-- Vygenerováno: node tools/design-smery/generuj.mjs -->\n" + lines.join("\n") + "\n");
console.log(lines.join("\n"));
if (failed) {
  console.error("\nNěkterý pár nesplňuje minimum.");
  process.exit(1);
}
