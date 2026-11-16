// Nezávislá reference kalkulačky průřezu VERZE 1.1 (platná, Radek 16. 11. 2026, docs/reset/KALKULACKA_V1_1.md).
//
// Postup (stejně jako golden test v1, tests/golden-v1/reference.ts):
// 1. Z docs/reference/kalkulacka-prurezu-v1.html se programově vytáhne jediný <script>.
// 2. Na text skriptu se programově uplatní JEN čtyři změny v1.1 (docs/KALKULACKA_PRUREZU.md, „Čtyři změny proti v1“).
//    Každá záměna musí ve skriptu najít svůj vzor PRÁVĚ JEDNOU, jinak reference spadne (změna reference v1
//    se tak nepřehlédne). Výpočet v calc(), amp(), interp(), maxFuse() a tabulky jinak zůstávají netknuté.
//      Změna 1: FUSES.find(f=>f>=I*1.1) → f>=I*1.25.
//      Změna 2: z FUSES pryč 300 (platí i pro maxFuse(), která FUSES používá). Když žádná pojistka není
//               ≥ 1,25 × I (nad 200 A), místo „mimo rozsah (nad 240 A)“ hláška HLAVNI_VEDENI s proudem.
//      Změna 3: za hlášku „Přes 150 A na 12 V“ přidána hláška NAD_150A_MENIC při I>150 (jakékoli napětí).
//               Pořadí podle kapitoly „Pořadí hlášek“: rozhodlo; kostra; NAD_150A_12V; NAD_150A_MENIC; měnič od 1 000 W.
//      Změna 4: popisek „Ve svazku / motorový prostor“ → „Ve svazku“. Jen text v HTML (mimo <script>),
//               výpočet (k 0,7, ρ 0,0216) zůstává. Reference to jen ověří (POPISEK_SVAZEK), na čísla to vliv nemá.
// 3. Skript běží v node:vm s minimálním podvrhem `document`. Po načtení se přepíše jen `fmt` (formátování)
//    na značku ⟨číslo⟩ s plnou přesností, aby šla čísla přečíst bez zaokrouhlení.
// 4. Pro každý vstup se nastaví `st` a pole `val`/`len` a zavolá se calc(); výsledek se přečte z HTML.
//
// Kód enginu (src/vodic.ts) jsem nečetl kromě typů a komentářů rozhraní v1.1.
//
// Parametr `Varianta` slouží JEN pro mutanty v kontrolách testu (ověření, že mřížka odhalí chybnou implementaci).
// Platná reference je `VARIANTA_V11`.

import { readFileSync } from "node:fs";
import vm from "node:vm";
import type { KodHlasky, RadekTabulky, VstupVodice, VysledekVodice } from "../../src/vodic.ts";
import { REFERENCE_PATH, extractScript } from "../golden-v1/reference.ts";

export { REFERENCE_PATH };

/** Texty hlášek přidaných ve v1.1 (doslova ze zadání). */
export const TEXT_HLAVNI_VEDENI =
  "Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.";
export const TEXT_NAD_150A_MENIC =
  "U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.";
export const POPISEK_SVAZEK_V1 = "Ve svazku / motorový prostor";
export const POPISEK_SVAZEK = "Ve svazku";

/** Varianta úprav skriptu. Platná je VARIANTA_V11, ostatní jen mutanty pro kontrolu testu. */
export interface Varianta {
  /** Násobek proudu pro výběr pojistky (v1.1: "1.25"; v1: "1.1"). Text dosazený do skriptu. */
  koef: string;
  /** Porovnání ve výběru pojistky (v1.1 doslova „≥“). */
  op: ">=" | ">";
  /** 300 A v řadě FUSES (v1.1: ne). */
  fuses300: boolean;
  /** 300 A jen v maxFuse() (mutant „300 A zapomenutá v maxFuse“). */
  maxFuse300: boolean;
  /** Hláška NAD_150A_MENIC: podmínka (v1.1: "I>150"), null = chybí. */
  menic: string | null;
  /** Hláška NAD_150A_MENIC před NAD_150A_12V (mutant pořadí). */
  menicPred12V: boolean;
  /** Chyba HLAVNI_VEDENI nese proud (v1.1: ano). */
  proudVChybe: boolean;
}

export const VARIANTA_V11: Readonly<Varianta> = Object.freeze({
  koef: "1.25",
  op: ">=",
  fuses300: false,
  maxFuse300: false,
  menic: "I>150",
  menicPred12V: false,
  proudVChybe: true,
});

/** Záměna, která musí ve zdrojovém textu nastat právě jednou. */
function nahradJednou(src: string, co: string, cim: string): string {
  const prvni = src.indexOf(co);
  if (prvni < 0) throw new Error(`Reference v1.1: vzor nenalezen: ${co}`);
  if (src.indexOf(co, prvni + 1) >= 0) throw new Error(`Reference v1.1: vzor nalezen víckrát: ${co}`);
  return src.slice(0, prvni) + cim + src.slice(prvni + co.length);
}

const VZOR_FUSES = "const FUSES=[1,2,3,5,7.5,10,15,20,25,30,35,40,50,60,70,80,100,125,150,175,200,225,250,300];";
const VZOR_FIND = "const fuse=FUSES.find(f=>f>=I*1.1);";
const VZOR_MIMO =
  "if(!fuse){out.innerHTML='<div class=\"msg bad\">Proud '+fmt(I)+' A je mimo rozsah kalkulačky (nad 240 A). Rozdělte zátěž, použijte paralelní vodiče nebo přejděte na vyšší napětí.</div>';return}";
const VZOR_12V =
  "if(I>150 && U===12)msgs+='<div class=\"msg warn\">Přes 150 A na 12 V: zvažte 24 V nebo zkrácení trasy. Kabely začínají být velmi drahé a těžké.</div>';";
const VZOR_MAXFUSE =
  "function maxFuse(a,k){const lim=Math.min(amp(a)*k,interp(k<1?CAPH:CAPN,a));let f=0;for(const x of FUSES)if(x<=lim+1e-9)f=x;return f}";

/** Skript reference v1 se změnami v1.1 (případně mutant). */
export function skriptV11(puvodni: string, v: Varianta = VARIANTA_V11): string {
  let s = puvodni;
  // Změna 2: 300 A pryč z FUSES (maxFuse() čte FUSES, takže platí i tam).
  s = nahradJednou(
    s,
    VZOR_FUSES,
    v.fuses300 ? VZOR_FUSES : VZOR_FUSES.replace(",250,300];", ",250];"),
  );
  if (v.maxFuse300) s = nahradJednou(s, VZOR_MAXFUSE, VZOR_MAXFUSE.replace("of FUSES)", "of [...FUSES,300])"));
  else nahradJednou(s, VZOR_MAXFUSE, VZOR_MAXFUSE); // jen kontrola, že maxFuse() je beze změny
  // Změna 1: pojistka ≥ 1,25 × proud (doslova „≥“).
  s = nahradJednou(s, VZOR_FIND, `const fuse=FUSES.find(f=>f${v.op}I*${v.koef});`);
  // Změna 2: mez = největší pojistka ÷ 1,25 (nad ní žádná pojistka nevyhoví) → HLAVNI_VEDENI s proudem.
  // Proud je ve značce za textem hlášky, aby ho parser přečetl (DOSLOVNÝ VÝKLAD: „vrací i proud“).
  s = nahradJednou(
    s,
    VZOR_MIMO,
    `if(!fuse){out.innerHTML='<div class="msg bad">${TEXT_HLAVNI_VEDENI}${v.proudVChybe ? " Proud '+fmt(I)+' A." : ""}</div>';return}`,
  );
  // Změna 3: NAD_150A_MENIC nad 150 A při jakémkoli napětí, hned za NAD_150A_12V.
  const menic = v.menic === null ? "" : `if(${v.menic})msgs+='<div class="msg warn">${TEXT_NAD_150A_MENIC}</div>';`;
  s = nahradJednou(s, VZOR_12V, v.menicPred12V ? menic + VZOR_12V : VZOR_12V + menic);
  return s;
}

// ---------- běh v node:vm ----------

interface FakeEl {
  value: string;
  textContent: string;
  innerHTML: string;
  addEventListener: (...a: unknown[]) => void;
  querySelectorAll: (...a: unknown[]) => unknown[];
  insertAdjacentHTML: (pos: string, html: string) => void;
}

function fakeEl(rows?: string[]): FakeEl {
  return {
    value: "",
    textContent: "",
    innerHTML: "",
    addEventListener: () => {},
    querySelectorAll: () => [],
    insertAdjacentHTML: (_pos, html) => {
      rows?.push(html);
    },
  };
}

export interface ReferenceV11 {
  navrh(v: VstupVodice): VysledekVodice;
  rawHtml(v: VstupVodice): string;
  /** HTML výsledku s původní fmt (cs-CZ), jak ho vidí uživatel. */
  zobrazeni(v: VstupVodice): string;
  tabulka(): RadekTabulky[];
  tabulkaPuvodniHtml: string[];
  fmt: (x: number, d?: number) => string;
  ctx: vm.Context;
  /** Upravený skript (pro kontrolu testu). */
  skript: string;
}

export function nactiReferenciV11(varianta: Varianta = VARIANTA_V11): ReferenceV11 {
  const html = readFileSync(REFERENCE_PATH, "utf8");
  const code = skriptV11(extractScript(html), varianta);

  const tableRows: string[] = [];
  const els: Record<string, FakeEl> = {
    segU: fakeEl(),
    segDrop: fakeEl(),
    segRet: fakeEl(),
    segEnv: fakeEl(),
    segMode: fakeEl(),
    valLbl: fakeEl(),
    val: fakeEl(),
    len: fakeEl(),
    out: fakeEl(),
  };
  els.val!.value = "120";
  els.len!.value = "4";
  const tbody = fakeEl(tableRows);
  const document = {
    getElementById(id: string) {
      const el = els[id];
      if (!el) throw new Error(`Podvrh document: neznámé id ${id}`);
      return el;
    },
    querySelector(sel: string) {
      if (sel === "#tab tbody") return tbody;
      throw new Error(`Podvrh document: neznámý selektor ${sel}`);
    },
  };

  const ctx = vm.createContext({ document });
  vm.runInContext(code, ctx, { filename: "kalkulacka-prurezu-v1.1.html#script" });

  const tabulkaPuvodniHtml = [...tableRows];
  const origFmt = vm.runInContext("fmt", ctx) as (x: number, d?: number) => string;
  const preciseFmt = vm.runInContext("(function(x){return '⟨'+String(x)+'⟩'})", ctx);
  const setFmt = vm.runInContext("(function(f){fmt=f})", ctx) as (f: unknown) => void;
  setFmt(preciseFmt);

  const st = vm.runInContext("st", ctx) as Record<string, unknown>;
  const calc = vm.runInContext("calc", ctx) as () => void;

  function run(v: VstupVodice): string {
    st.U = v.napeti;
    st.mode = v.rezim;
    st.drop = v.ubytekProc;
    st.ret = v.zpetny;
    st.env = v.prostredi;
    els.val!.value = String(v.hodnota);
    els.len!.value = String(v.delka);
    els.out!.innerHTML = "";
    calc();
    return els.out!.innerHTML;
  }

  const iife = code.match(/\(function\(\)\{[\s\S]*?\}\)\(\);/);
  if (!iife) throw new Error("Reference v1.1: blok tabulky (IIFE) nenalezen");

  return {
    ctx,
    skript: code,
    tabulkaPuvodniHtml,
    fmt: origFmt,
    rawHtml: run,
    navrh: (v) => parseResult(run(v), v),
    zobrazeni(v) {
      setFmt(origFmt);
      try {
        return run(v);
      } finally {
        setFmt(preciseFmt);
      }
    },
    tabulka() {
      tableRows.length = 0;
      vm.runInContext(iife[0], ctx);
      return tableRows.map(parseTableRow);
    },
  };
}

/** Celé HTML reference se změnou 4 (popisek „Ve svazku“). Jen text, výpočet se nemění. */
export function htmlV11(): string {
  const html = readFileSync(REFERENCE_PATH, "utf8");
  return nahradJednou(html, `<button data-v="h">${POPISEK_SVAZEK_V1}</button>`, `<button data-v="h">${POPISEK_SVAZEK}</button>`);
}

// ---------- parsování výstupu ----------

const NUM = /⟨([^⟩]*)⟩/g;

function nums(s: string): number[] {
  return [...s.matchAll(NUM)].map((m) => Number(m[1]));
}

function one(s: string, what: string): number {
  const n = nums(s);
  if (n.length !== 1) throw new Error(`Reference v1.1: u „${what}“ čekáno 1 číslo, nalezeno ${n.length}: ${s}`);
  return n[0]!;
}

/** Text hlášky → kód (podmínky viz calc() v referenci a úpravy výše). */
export function kodHlasky(text: string): KodHlasky {
  if (text.startsWith("Zadejte kladné číslo pro příkon/proud i délku.")) return "NEPLATNY_VSTUP";
  if (text.startsWith(TEXT_HLAVNI_VEDENI)) return "HLAVNI_VEDENI";
  if (text.startsWith("Ani 120 mm² nestačí.")) return "ANI_120_NESTACI";
  if (text.startsWith("Rozhodl úbytek napětí (délka trasy).")) return "ROZHODL_UBYTEK";
  if (text.startsWith("Rozhodlo oteplení kabelu a velikost pojistky.")) return "ROZHODLO_OTEPLENI";
  if (text.startsWith("Počítáno s mínusem přes kostru")) return "MINUS_PRES_KOSTRU";
  if (text.startsWith("Přes 150 A na 12 V")) return "NAD_150A_12V";
  if (text.startsWith(TEXT_NAD_150A_MENIC)) return "NAD_150A_MENIC";
  if (text.startsWith("Měnič: počítejte i s jeho účinností")) return "MENIC_OD_1000W";
  throw new Error(`Reference v1.1: neznámá hláška: ${text}`);
}

function messages(html: string): { cls: string; text: string; inner: string }[] {
  return [...html.matchAll(/<div class="msg (ok|warn|bad)">([\s\S]*?)<\/div>/g)].map((m) => ({
    cls: m[1]!,
    inner: m[2]!,
    text: m[2]!.replace(/<[^>]+>/g, ""),
  }));
}

function g<T>(x: T | undefined, co = "prvek"): T {
  if (x === undefined) throw new Error(`Reference v1.1: chybí ${co}`);
  return x;
}

function parseResult(html: string, v: VstupVodice): VysledekVodice {
  const msgs = messages(html);
  const hlasky = msgs.map((m) => kodHlasky(m.text));

  if (!html.includes('<div class="big">')) {
    if (msgs.length !== 1) throw new Error(`Reference v1.1: chybový výstup s ${msgs.length} hláškami: ${html}`);
    if (hlasky[0] === "HLAVNI_VEDENI") {
      const n = nums(g(msgs[0]).inner);
      if (n.length === 0) return { stav: "chyba", hlasky }; // jen mutant bez proudu
      return { stav: "chyba", proud: one(g(msgs[0]).inner, "proud hlavního vedení"), hlasky };
    }
    return { stav: "chyba", hlasky };
  }

  const boxes = [
    ...html.matchAll(
      /<div class="box"><div class="k">([^<]*)<\/div><div class="v">([^<]*)<\/div><div class="s">([^<]*)<\/div><\/div>/g,
    ),
  ];
  if (boxes.length !== 2) throw new Error(`Reference v1.1: čekány 2 boxy, nalezeno ${boxes.length}`);
  const [box0, box1] = [g(boxes[0]), g(boxes[1])];
  const prurez = one(g(box0[2]), "průřez");
  const awgText = g(box0[3]);
  let awg: { oznaceni: string; plocha: number } | null;
  if (awgText === "AWG: použijte metrický") awg = null;
  else {
    const m = awgText.match(/^nebo AWG (\S+) \(⟨([^⟩]*)⟩ mm²\)$/);
    if (!m) throw new Error(`Reference v1.1: neznámý AWG text: ${awgText}`);
    awg = { oznaceni: g(m[1]), plocha: Number(m[2]) };
  }
  const pojistka = one(g(box1[2]), "pojistka");

  const det = html.match(/<div class="det">([\s\S]*?)<\/div><div class="msg/);
  if (!det) throw new Error("Reference v1.1: blok det nenalezen");
  const cells = [...g(det[1]).matchAll(/<div>([\s\S]*?)<\/div>/g)].map((m) => g(m[1]));
  const rows = new Map<string, string>();
  for (let i = 0; i < cells.length; i += 2) rows.set(g(cells[i]).replace(NUM, "#"), g(cells[i + 1], "hodnota řádku"));
  const get = (label: string) => {
    const r = rows.get(label);
    if (r === undefined) throw new Error(`Reference v1.1: řádek „${label}“ chybí`);
    return r;
  };
  const proud = one(get("Proud spotřebiče"), "proud");
  // V režimu P reference příkon nezobrazuje; podle typu je to zadaná hodnota (stejně jako u v1).
  const prikon = v.rezim === "I" ? one(get("Příkon"), "příkon") : parseFloat(String(v.hodnota));
  const ub = nums(get("Úbytek napětí v kabelu"));
  if (ub.length !== 2) throw new Error("Reference v1.1: u úbytku čekána 2 čísla");
  const napetiUSpotrebice = one(get("Napětí u spotřebiče"), "napětí u spotřebiče");
  const ztrata = one(get("Ztráta (teplo v kabelu)"), "ztráta");
  const maxPojistka = one(get("Max. pojistka pro # mm²"), "max. pojistka");

  const okMsg = msgs[0];
  if (okMsg?.cls !== "ok") throw new Error("Reference v1.1: první hláška není ok");
  const okNums = nums(okMsg.inner);
  if (okNums.length !== 2 || okNums[0] !== prurez) throw new Error(`Reference v1.1: ok hláška: ${okMsg.inner}`);

  return {
    stav: "ok",
    prurez,
    awg,
    pojistka,
    maxPojistka,
    proud,
    prikon,
    ubytekV: g(ub[0]),
    ubytekProc: g(ub[1]),
    napetiUSpotrebice,
    ztrata,
    maxDelka: g(okNums[1]),
    rozhodlo: hlasky[0] === "ROZHODL_UBYTEK" ? "ubytek" : "oteplen",
    hlasky,
  };
}

function parseTableRow(row: string): RadekTabulky {
  const m = row.match(
    /^<tr><td><b>⟨([^⟩]*)⟩<\/b><\/td><td>(\S+) <span class="note">\(⟨([^⟩]*)⟩\)<\/span><\/td><td>⟨([^⟩]*)⟩ \/ ⟨([^⟩]*)⟩ A<\/td><td>⟨([^⟩]*)⟩ m<\/td><td>⟨([^⟩]*)⟩ m<\/td><\/tr>$/,
  );
  if (!m) throw new Error(`Reference v1.1: neznámý řádek tabulky: ${row}`);
  return {
    prurez: Number(m[1]),
    awg: { oznaceni: g(m[2]), plocha: Number(m[3]) },
    maxPojistka: Number(m[4]),
    maxPojistkaSvazek: Number(m[5]),
    delka3: Number(m[6]),
    delka10: Number(m[7]),
  };
}

/** Platná reference v1.1 (načtená jednou). */
export const referenceV11: ReferenceV11 = nactiReferenciV11();
