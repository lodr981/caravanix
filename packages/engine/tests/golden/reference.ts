// Spouštěč referenční kalkulačky průřezu (docs/reference/kalkulacka-prurezu-v1.html) v Node.
//
// Postup:
// 1. Z HTML se programově vytáhne obsah posledního <script> a beze změny se spustí v `node:vm`
//    s minimálním podvrhem `document` (jen to, co skript při načtení a v calc() opravdu volá).
// 2. Po načtení se v kontextu přepíše jen funkce `fmt` (formátování čísel pro zobrazení)
//    na značku ⟨číslo⟩ s plnou přesností (String(x) je přesný zpětný převod double).
//    Výpočet v calc(), amp(), interp(), maxFuse() a tabulky zůstávají netknuté.
// 3. Pro dané vstupy se nastaví `st` a hodnoty polí, zavolá se původní calc() a z výsledného HTML
//    se přečte stav, čísla a hlášky (v pořadí, jak je reference ukazuje).
// 4. Referenční tabulka: programově vytažený původní blok `(function(){ ... })();` se spustí znovu,
//    už s přesnou `fmt`, a řádky se přečtou z insertAdjacentHTML.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import type {
  KodHlasky,
  Napeti,
  Prostredi,
  RadekTabulky,
  Rezim,
  UbytekProc,
  VysledekVodice,
  Zpetny,
} from "../../src/vodic.ts";

export const REFERENCE_PATH = fileURLToPath(
  new URL("../../../../docs/reference/kalkulacka-prurezu-v1.html", import.meta.url),
);

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

export function extractScript(html: string): string {
  const all = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  if (all.length !== 1) throw new Error(`Reference: čekán právě 1 <script>, nalezeno ${all.length}`);
  return all[0]![1]!;
}

export interface ReferenceRuntime {
  /** Původní calc() + parsování výsledku do tvaru VysledekVodice. */
  navrh(v: RefVstup): VysledekVodice;
  /** Surové HTML výsledku z calc() (s přesnou fmt). */
  rawHtml(v: RefVstup): string;
  tabulka(): RadekTabulky[];
  /** HTML tabulky vygenerované při načtení stránky s původní fmt (cs-CZ). */
  tabulkaPuvodniHtml: string[];
  /** Původní fmt reference (cs-CZ), jen pro kontrolu parsování. */
  fmt: (x: number, d?: number) => string;
  /** HTML výsledku s původní fmt (jak ho vidí uživatel), jen pro ruční kontrolu. */
  zobrazeni(v: RefVstup): string;
  /** Přímý přístup k funkcím a tabulkám reference. */
  ctx: vm.Context;
}

export interface RefVstup {
  napeti: Napeti;
  rezim: Rezim;
  hodnota: number;
  delka: number;
  ubytekProc: UbytekProc;
  zpetny: Zpetny;
  prostredi: Prostredi;
}

export function loadReference(): ReferenceRuntime {
  const html = readFileSync(REFERENCE_PATH, "utf8");
  const code = extractScript(html);

  const tableRows: string[] = [];
  const els = {
    segU: fakeEl(),
    segDrop: fakeEl(),
    segRet: fakeEl(),
    segEnv: fakeEl(),
    segMode: fakeEl(),
    valLbl: fakeEl(),
    val: fakeEl(),
    len: fakeEl(),
    out: fakeEl(),
  } satisfies Record<string, FakeEl>;
  // Výchozí hodnoty pro úvodní calc() při načtení (v HTML jsou v inputech).
  els.val.value = "120";
  els.len.value = "4";
  const tbody = fakeEl(tableRows);

  const document = {
    getElementById(id: string) {
      const el = (els as Record<string, FakeEl>)[id];
      if (!el) throw new Error(`Podvrh document: neznámé id ${id}`);
      return el;
    },
    querySelector(sel: string) {
      if (sel === "#tab tbody") return tbody;
      throw new Error(`Podvrh document: neznámý selektor ${sel}`);
    },
  };

  const ctx = vm.createContext({ document });
  vm.runInContext(code, ctx, { filename: "kalkulacka-prurezu-v1.html#script" });

  const tabulkaPuvodniHtml = [...tableRows];
  const origFmt = vm.runInContext("fmt", ctx) as (x: number, d?: number) => string;

  // Jediný zásah: fmt vrací přesnou hodnotu ve značce.
  const preciseFmt = vm.runInContext("(function(x){return '⟨'+String(x)+'⟩'})", ctx);
  const setFmt = vm.runInContext("(function(f){fmt=f})", ctx) as (f: unknown) => void;
  setFmt(preciseFmt);

  const st = vm.runInContext("st", ctx) as Record<string, unknown>;
  const calc = vm.runInContext("calc", ctx) as () => void;

  function run(v: RefVstup): string {
    st.U = v.napeti;
    st.mode = v.rezim;
    st.drop = v.ubytekProc;
    st.ret = v.zpetny;
    st.env = v.prostredi;
    els.val.value = String(v.hodnota);
    els.len.value = String(v.delka);
    els.out.innerHTML = "";
    calc();
    return els.out.innerHTML;
  }

  // Tabulka: původní blok IIFE vytažený ze skriptu, spuštěný znovu s přesnou fmt.
  const iife = code.match(/\(function\(\)\{[\s\S]*?\}\)\(\);/);
  if (!iife) throw new Error("Reference: blok tabulky (IIFE) nenalezen");

  return {
    ctx,
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

// ---------- parsování výstupu ----------

const NUM = /⟨([^⟩]*)⟩/g;

function nums(s: string): number[] {
  return [...s.matchAll(NUM)].map((m) => Number(m[1]));
}

function one(s: string, what: string): number {
  const n = nums(s);
  if (n.length !== 1) throw new Error(`Reference: u „${what}“ čekáno 1 číslo, nalezeno ${n.length}: ${s}`);
  return n[0]!;
}

/** Mapování textu hlášky reference na kód. Podmínky viz calc() v referenci. */
export function kodHlasky(text: string): KodHlasky {
  if (text.startsWith("Zadejte kladné číslo pro příkon/proud i délku.")) return "NEPLATNY_VSTUP"; // !(v>0)||!(L>0)
  if (/^Proud .* A je mimo rozsah kalkulačky/.test(text)) return "MIMO_ROZSAH"; // !fuse
  if (text.startsWith("Ani 120 mm² nestačí.")) return "ANI_120_NESTACI"; // idx<0
  if (text.startsWith("Rozhodl úbytek napětí (délka trasy).")) return "ROZHODL_UBYTEK"; // iDrop>=iFuse
  if (text.startsWith("Rozhodlo oteplení kabelu a velikost pojistky.")) return "ROZHODLO_OTEPLENI";
  if (text.startsWith("Počítáno s mínusem přes kostru")) return "MINUS_PRES_KOSTRU"; // st.ret===1
  if (text.startsWith("Přes 150 A na 12 V")) return "NAD_150A_12V"; // I>150 && U===12
  if (text.startsWith("Měnič: počítejte i s jeho účinností")) return "MENIC_OD_1000W"; // mode P && v>=1000
  throw new Error(`Reference: neznámá hláška: ${text}`);
}

function messages(html: string): { cls: string; text: string; inner: string }[] {
  return [...html.matchAll(/<div class="msg (ok|warn|bad)">([\s\S]*?)<\/div>/g)].map((m) => ({
    cls: m[1]!,
    inner: m[2]!,
    text: m[2]!.replace(/<[^>]+>/g, ""),
  }));
}

/** Prvek, který musí existovat (jinak reference vypadá jinak, než test čeká). */
function g<T>(x: T | undefined, co = "prvek"): T {
  if (x === undefined) throw new Error(`Reference: chybí ${co}`);
  return x;
}

function parseResult(html: string, v: RefVstup): VysledekVodice {
  const msgs = messages(html);
  const hlasky = msgs.map((m) => kodHlasky(m.text));

  if (!html.includes('<div class="big">')) {
    if (msgs.length !== 1) throw new Error(`Reference: chybový výstup s ${msgs.length} hláškami: ${html}`);
    const kod = hlasky[0];
    if (kod === "MIMO_ROZSAH") return { stav: "chyba", proud: one(g(msgs[0]).inner, "proud mimo rozsah"), hlasky };
    return { stav: "chyba", hlasky };
  }

  const boxes = [
    ...html.matchAll(
      /<div class="box"><div class="k">([^<]*)<\/div><div class="v">([^<]*)<\/div><div class="s">([^<]*)<\/div><\/div>/g,
    ),
  ];
  if (boxes.length !== 2) throw new Error(`Reference: čekány 2 boxy, nalezeno ${boxes.length}`);
  const [box0, box1] = [g(boxes[0]), g(boxes[1])];
  const prurez = one(g(box0[2]), "průřez");
  const awgText = g(box0[3]);
  let awg: { oznaceni: string; plocha: number } | null;
  if (awgText === "AWG: použijte metrický") awg = null;
  else {
    const m = awgText.match(/^nebo AWG (\S+) \(⟨([^⟩]*)⟩ mm²\)$/);
    if (!m) throw new Error(`Reference: neznámý AWG text: ${awgText}`);
    awg = { oznaceni: g(m[1]), plocha: Number(m[2]) };
  }
  const pojistka = one(g(box1[2]), "pojistka");

  const det = html.match(/<div class="det">([\s\S]*?)<\/div><div class="msg/);
  if (!det) throw new Error("Reference: blok det nenalezen");
  const cells = [...g(det[1]).matchAll(/<div>([\s\S]*?)<\/div>/g)].map((m) => g(m[1]));
  const rows = new Map<string, string>();
  for (let i = 0; i < cells.length; i += 2) {
    const label = g(cells[i]).replace(NUM, "#");
    rows.set(label, g(cells[i + 1], `hodnota řádku ${label}`));
  }
  const get = (label: string) => {
    const r = rows.get(label);
    if (r === undefined) throw new Error(`Reference: řádek „${label}“ chybí`);
    return r;
  };
  const proud = one(get("Proud spotřebiče"), "proud");
  const prikon = v.rezim === "I" ? one(get("Příkon"), "příkon") : num(v.hodnota);
  const ub = nums(get("Úbytek napětí v kabelu"));
  if (ub.length !== 2) throw new Error("Reference: u úbytku čekána 2 čísla");
  const ubytekV = g(ub[0]);
  const ubytekProc = g(ub[1]);
  const napetiUSpotrebice = one(get("Napětí u spotřebiče"), "napětí u spotřebiče");
  const ztrata = one(get("Ztráta (teplo v kabelu)"), "ztráta");
  const maxPojistka = one(get("Max. pojistka pro # mm²"), "max. pojistka");
  if (one(cells.find((c) => c.startsWith("Max. pojistka pro"))!, "max. pojistka – průřez") !== prurez)
    throw new Error("Reference: průřez v řádku max. pojistky nesedí");

  // Max. délka je v první (ok) hlášce: „Na ⟨A⟩ mm² může být kabel … až <b>⟨Lmax⟩ m</b>.“
  const okMsg = msgs[0];
  if (okMsg?.cls !== "ok") throw new Error("Reference: první hláška není ok");
  const okNums = nums(okMsg.inner);
  if (okNums.length !== 2 || okNums[0] !== prurez) throw new Error(`Reference: ok hláška: ${okMsg.inner}`);
  const maxDelka = g(okNums[1]);

  return {
    stav: "ok",
    prurez,
    awg,
    pojistka,
    maxPojistka,
    proud,
    prikon,
    ubytekV,
    ubytekProc,
    napetiUSpotrebice,
    ztrata,
    maxDelka,
    rozhodlo: hlasky[0] === "ROZHODL_UBYTEK" ? "ubytek" : "oteplen",
    hlasky,
  };
}

/** V režimu P reference bere zadaný příkon přes num(String(v)), tj. beze změny. */
function num(x: number): number {
  return parseFloat(String(x).replace(",", ".").replace(/\s/g, ""));
}

function parseTableRow(row: string): RadekTabulky {
  const m = row.match(
    /^<tr><td><b>⟨([^⟩]*)⟩<\/b><\/td><td>(\S+) <span class="note">\(⟨([^⟩]*)⟩\)<\/span><\/td><td>⟨([^⟩]*)⟩ \/ ⟨([^⟩]*)⟩ A<\/td><td>⟨([^⟩]*)⟩ m<\/td><td>⟨([^⟩]*)⟩ m<\/td><\/tr>$/,
  );
  if (!m) throw new Error(`Reference: neznámý řádek tabulky: ${row}`);
  return {
    prurez: Number(m[1]),
    awg: { oznaceni: g(m[2]), plocha: Number(m[3]) },
    maxPojistka: Number(m[4]),
    maxPojistkaSvazek: Number(m[5]),
    delka3: Number(m[6]),
    delka10: Number(m[7]),
  };
}
