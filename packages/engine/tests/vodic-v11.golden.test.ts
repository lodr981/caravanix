// Golden test kalkulačky průřezu VERZE 1.1 (platná, Radek 16. 11. 2026, docs/reset/KALKULACKA_V1_1.md):
// engine (`navrhVodice`, `referencniTabulka` z @caravanix/engine, src/vodic.ts) proti nezávislé referenci
// tests/golden-v11/reference-v11.ts = skript docs/reference/kalkulacka-prurezu-v1.html se čtyřmi změnami v1.1,
// uplatněnými programově (docs/KALKULACKA_PRUREZU.md, „Verze 1.1: co platí“ a „Golden test“).
// Reference má vždy pravdu. Jakýkoli rozdíl je chyba enginu.

import { readFileSync } from "node:fs";
import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { navrhVodice, referencniTabulka } from "@caravanix/engine";
import type { RadekTabulky, VstupVodice, VysledekVodice } from "../src/vodic.ts";
import { extractScript, loadReference } from "./golden-v1/reference.ts";
import {
  POPISEK_SVAZEK,
  POPISEK_SVAZEK_V1,
  REFERENCE_PATH,
  VARIANTA_V11,
  htmlV11,
  nactiReferenciV11,
  referenceV11 as ref,
  skriptV11,
  type Varianta,
} from "./golden-v11/reference-v11.ts";
import { TOL, porovnej, porovnejRadek } from "./golden-v11/porovnani-v11.ts";
import {
  DELKY,
  FUSES,
  KOEF,
  MEZ,
  PROUDY,
  PROUDY_NAD,
  hranyPojistek,
  hranyUbytku,
  kombinace,
  mrizka,
  neplatne,
  prahyPrikonu,
  vse,
} from "./golden-v11/grid-v11.ts";

const MAX_VYPIS = 15;

const refMM = vm.runInContext("MM", ref.ctx) as number[];
const refFUSES = vm.runInContext("FUSES", ref.ctx) as number[];

function popis(v: VstupVodice): string {
  return `${v.napeti} V, ${v.rezim}=${v.hodnota}, L=${v.delka} m, ${v.ubytekProc} %, zpětný ${v.zpetny}, ${v.prostredi}`;
}

function overSadu(vstupy: VstupVodice[]): void {
  const chyby: string[] = [];
  let pocet = 0;
  for (const v of vstupy) {
    const exp = ref.navrh(v);
    const act = navrhVodice({ ...v }); // výjimka z enginu = pád testu
    const d = porovnej(exp, act);
    if (d.length) {
      pocet++;
      if (chyby.length < MAX_VYPIS) chyby.push(`[${popis(v)}] ${d.join("; ")}`);
    }
  }
  expect(chyby, `${pocet} z ${vstupy.length} případů nesedí s referencí, prvních ${chyby.length}:`).toEqual([]);
}

const zaklad = { napeti: 12, rezim: "P", hodnota: 120, delka: 4, ubytekProc: 3, zpetny: 2, prostredi: "n" } as const;

// ---------------------------------------------------------------------------
// 1. Kontrola samotného testu (nezávisí na enginu, musí procházet vždy).
// ---------------------------------------------------------------------------

describe("reference v1.1 (kontrola testu)", () => {
  const v1 = loadReference();

  it("skript v1.1 se od v1 liší jen ve čtyřech změnách (FUSES, 1,25, HLAVNI_VEDENI, NAD_150A_MENIC)", () => {
    const puvodni = extractScript(readFileSync(REFERENCE_PATH, "utf8"));
    const a = puvodni.split("\n");
    const b = ref.skript.split("\n");
    expect(b).toHaveLength(a.length);
    const zmenene = a.map((r, i) => (r === b[i] ? null : i)).filter((i) => i !== null) as number[];
    // Přesně 4 změněné řádky: FUSES, výběr pojistky, chyba nad mezí, hláška nad 150 A na 12 V (+ NAD_150A_MENIC).
    expect(zmenene.map((i) => a[i]!.trim().slice(0, 25))).toEqual([
      "const FUSES=[1,2,3,5,7.5,",
      "const fuse=FUSES.find(f=>",
      "if(!fuse){out.innerHTML='",
      "if(I>150 && U===12)msgs+=",
    ]);
    expect(b[zmenene[0]!]).toBe("const FUSES=[1,2,3,5,7.5,10,15,20,25,30,35,40,50,60,70,80,100,125,150,175,200,225,250];");
    expect(b[zmenene[1]!]).toBe("  const fuse=FUSES.find(f=>f>=I*1.25);");
    expect(b[zmenene[3]!]).toContain(a[zmenene[3]!]!.trim()); // hláška 12 V zůstává, MENIC jen přidán za ni
    expect(b[zmenene[3]!]!.endsWith("if(I>150)msgs+='<div class=\"msg warn\">U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.</div>';")).toBe(true);
  });

  it("tabulky a funkce (MM, AMP, AWG, CAPN, CAPH, amp, interp, nearestAwg) jsou stejné jako ve v1; FUSES bez 300 A", () => {
    for (const t of ["MM", "AMP", "AWG", "CAPN", "CAPH"])
      expect(JSON.stringify(vm.runInContext(t, ref.ctx)), t).toBe(JSON.stringify(vm.runInContext(t, v1.ctx)));
    expect(refFUSES).toEqual(FUSES);
    expect(refFUSES).toEqual((vm.runInContext("FUSES", v1.ctx) as number[]).filter((f) => f !== 300));
    expect(refMM).toHaveLength(15);
    const f11 = ["amp", "nearestAwg"].map((n) => vm.runInContext(n, ref.ctx) as (a: number) => unknown);
    const f1 = ["amp", "nearestAwg"].map((n) => vm.runInContext(n, v1.ctx) as (a: number) => unknown);
    for (let a = 0.1; a < 200; a *= 1.05) for (let i = 0; i < 2; i++) expect(f11[i]!(a)).toEqual(f1[i]!(a));
    // maxFuse: shodná s v1 všude, kde v1 nedá 300 A; tam dá v1.1 nejvýš 250 A.
    const mf11 = vm.runInContext("maxFuse", ref.ctx) as (a: number, k: number) => number;
    const mf1 = vm.runInContext("maxFuse", v1.ctx) as (a: number, k: number) => number;
    let s300 = 0;
    for (const k of [1, 0.7])
      for (const a of [...refMM, 0.82, 1.31, 2.08, 3.31, 5.26, 8.37, 13.3, 21.2, 33.6, 42.4, 53.5, 67.4, 85, 107, 150]) {
        if (mf1(a, k) === 300) {
          s300++;
          expect(mf11(a, k)).toBe(250);
        } else expect(mf11(a, k), `maxFuse(${a}, ${k})`).toBe(mf1(a, k));
      }
    expect(s300).toBeGreaterThan(0); // 120 mm² samostatně: v1 300 A → v1.1 250 A
    expect(mf11(120, 1)).toBe(250);
  });

  it("změna 4: popisek „Ve svazku“ je jen text, výpočet ho nečte", () => {
    const html = htmlV11();
    expect(html).toContain(`<button data-v="h">${POPISEK_SVAZEK}</button>`);
    expect(html).not.toContain(`<button data-v="h">${POPISEK_SVAZEK_V1}</button>`);
    expect(ref.skript).not.toContain("motorov");
    expect(ref.skript).toContain('rho=hot?0.0216:0.0175, k=hot?0.7:1');
  });

  it("mřížka splňuje zadání (≥ 40 proudů 0,5–200 A, hrany f/1,25 každé pojistky, ≥ 5 nad 200 A, ≥ 15 délek 0,2–20 m, 48 kombinací)", () => {
    expect(KOEF).toBe(1.25);
    expect(MEZ).toBe(200);
    expect(PROUDY.filter((p) => p >= 0.5 && p <= 200).length).toBeGreaterThanOrEqual(40);
    expect(PROUDY.filter((p) => p > 200).length).toBeGreaterThanOrEqual(5);
    expect(Math.min(...PROUDY)).toBe(0.5);
    for (const h of hranyPojistek()) expect(PROUDY).toContain(h);
    for (const f of FUSES) for (const x of [f / 1.25, (f / 1.25) * (1 - 1e-9), (f / 1.25) * (1 + 1e-9)]) expect(PROUDY).toContain(x);
    expect(PROUDY_NAD.every((p) => p > MEZ)).toBe(true);
    expect(DELKY.filter((l) => l >= 0.2 && l <= 20).length).toBeGreaterThanOrEqual(15);
    expect(kombinace()).toHaveLength(48);
  });

  it("120 W, 12 V, 4 m, 3 %, vlastní mínus, samostatně → 4 mm², 15 A (stejně jako v1: 1,25 × 10 = 12,5 → 15 A)", () => {
    expect(ref.navrh(zaklad)).toEqual({
      stav: "ok",
      prurez: 4,
      awg: { oznaceni: "10", plocha: 5.26 },
      pojistka: 15,
      maxPojistka: 30,
      proud: 10,
      prikon: 120,
      ubytekV: expect.closeTo(0.35, 12),
      ubytekProc: expect.closeTo((0.35 / 12) * 100, 12),
      napetiUSpotrebice: expect.closeTo(11.65, 12),
      ztrata: expect.closeTo(3.5, 12),
      maxDelka: expect.closeTo((0.36 * 4) / (0.0175 * 2 * 10), 12),
      rozhodlo: "ubytek",
      hlasky: ["ROZHODL_UBYTEK"],
    });
    const html = ref.zobrazeni(zaklad);
    expect(html).toContain('<div class="v">4 mm²</div>');
    expect(html).toContain('<div class="v">15 A</div>');
  });

  it("ruční případy ze zadání úkolu", () => {
    // 60 W / 12 V / 5 m / 3 % / vlastní / samostatně: I = 5 A, Areq = 0,0175·10·5/0,36 = 2,43 → 2,5 mm²; 1,25·5 = 6,25 → 7,5 A.
    expect(ref.navrh({ ...zaklad, hodnota: 60, delka: 5 })).toMatchObject({
      stav: "ok", prurez: 2.5, awg: { oznaceni: "12", plocha: 3.31 }, pojistka: 7.5, maxPojistka: 20, proud: 5, rozhodlo: "ubytek",
      hlasky: ["ROZHODL_UBYTEK"],
    });
    // 1 200 W / 12 V / 2 m / kostra: I = 100 A, 1,25·100 = 125 → 125 A; maxFuse(35) = 125 → 35 mm².
    expect(ref.navrh({ ...zaklad, hodnota: 1200, delka: 2, zpetny: 1 })).toMatchObject({
      stav: "ok", prurez: 35, awg: { oznaceni: "1", plocha: 42.4 }, pojistka: 125, maxPojistka: 125, proud: 100, rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    });
    // 20 A / 24 V / 8 m / 5 % / svazek: Areq = 0,0216·16·20/1,2 = 5,76 → 6 mm²; 1,25·20 = 25 → 25 A; maxFuse(6; 0,7) = 35 A.
    expect(ref.navrh({ ...zaklad, napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, prostredi: "h" })).toMatchObject({
      stav: "ok", prurez: 6, awg: { oznaceni: "8", plocha: 8.37 }, pojistka: 25, maxPojistka: 35, proud: 20, prikon: 480, rozhodlo: "ubytek",
      hlasky: ["ROZHODL_UBYTEK"],
    });
    // 160 A / 12 V / 1 m / 10 %: 1,25·160 = 200 → 200 A; maxFuse(70) = min(245, 200) = 200 → 70 mm².
    expect(ref.navrh({ ...zaklad, rezim: "I", hodnota: 160, delka: 1, ubytekProc: 10 })).toMatchObject({
      stav: "ok", prurez: 70, awg: { oznaceni: "3/0", plocha: 85 }, pojistka: 200, maxPojistka: 200, proud: 160, rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "NAD_150A_12V", "NAD_150A_MENIC"],
    });
    // Totéž na 24 V: jen NAD_150A_MENIC (NAD_150A_12V platí jen pro 12 V).
    expect(ref.navrh({ ...zaklad, napeti: 24, rezim: "I", hodnota: 160, delka: 1, ubytekProc: 10 }).hlasky).toEqual([
      "ROZHODLO_OTEPLENI",
      "NAD_150A_MENIC",
    ]);
    // 205 A / 24 V: 1,25·205 = 256,25 > 250 → HLAVNI_VEDENI s proudem.
    expect(ref.navrh({ ...zaklad, napeti: 24, rezim: "I", hodnota: 205, delka: 1 })).toEqual({ stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] });
    // V režimu P: 4 920 W / 24 V = 205 A → HLAVNI_VEDENI, proud 205 (bez MENIC_OD_1000W: chyba nese jen svůj kód).
    expect(ref.navrh({ ...zaklad, napeti: 24, hodnota: 4920, delka: 1 })).toEqual({ stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] });
    // Přesně 200 A: 1,25·200 = 250 → 250 A (≥, ne >), ještě ok.
    expect(ref.navrh({ ...zaklad, rezim: "I", hodnota: 200, delka: 0.5, ubytekProc: 10 })).toMatchObject({ stav: "ok", pojistka: 250, prurez: 95 });
    // 190 A ve svazku: pojistka 250 A, ale maxFuse(120; 0,7) = 225 A → ANI_120_NESTACI.
    expect(ref.navrh({ ...zaklad, rezim: "I", hodnota: 190, delka: 0.5, prostredi: "h" })).toEqual({ stav: "chyba", hlasky: ["ANI_120_NESTACI"] });
    for (const x of [0, -1, NaN]) {
      expect(ref.navrh({ ...zaklad, hodnota: x })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
      expect(ref.navrh({ ...zaklad, delka: x })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
    }
  });

  it("varianta „v1“ (1,1 × I, 300 A, bez NAD_150A_MENIC) dá na mřížce totéž co nezměněná reference v1", () => {
    // Ověří, že úpravy skriptu nezměnily nic jiného než čtyři změny. MIMO_ROZSAH (v1) ↔ HLAVNI_VEDENI (varianta).
    const jakoV1 = nactiReferenciV11({ ...VARIANTA_V11, koef: "1.1", fuses300: true, menic: null });
    let n = 0;
    for (const k of kombinace())
      for (const v of [...mrizka(k), ...neplatne(k)]) {
        const a = v1.navrh(v);
        const b = jakoV1.navrh(v);
        const aa = a.hlasky[0] === ("MIMO_ROZSAH" as string) ? { ...a, hlasky: ["HLAVNI_VEDENI"] } : a;
        expect(b, popis(v)).toEqual(aa);
        n++;
      }
    expect(n).toBeGreaterThan(100_000);
  }, 300_000);

  it("mřížka v referenci pokryje všechny kódy, obě „rozhodlo“, AWG null, každou pojistku a změnu pojistky na každé hraně f/1,25", () => {
    const kody = new Set<string>();
    const rozhodlo = new Set<string>();
    const pojistky = new Set<number>();
    const sady = new Set<string>();
    let awgNull = 0;
    for (const k of kombinace()) {
      for (const v of [...vse(k, refMM), ...neplatne(k)]) {
        const r = ref.navrh(v);
        r.hlasky.forEach((h) => kody.add(h));
        if (r.stav === "ok") {
          rozhodlo.add(r.rozhodlo);
          pojistky.add(r.pojistka);
          if (r.awg === null) awgNull++;
          if (r.hlasky.length > 1) sady.add(`${v.napeti}:${r.hlasky.slice(1).join(",")}`);
        }
      }
    }
    expect([...kody].sort()).toEqual(
      ["ANI_120_NESTACI", "HLAVNI_VEDENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU", "NAD_150A_12V", "NAD_150A_MENIC", "NEPLATNY_VSTUP", "ROZHODLO_OTEPLENI", "ROZHODL_UBYTEK"].sort(),
    );
    expect([...rozhodlo].sort()).toEqual(["oteplen", "ubytek"]);
    expect(awgNull).toBeGreaterThan(0);
    expect([...pojistky].sort((a, b) => a - b)).toEqual(FUSES);
    // Pořadí všech čtyř dodatečných hlášek najednou (12 V) a NAD_150A_MENIC bez NAD_150A_12V (24 V).
    expect(sady).toContain("12:MINUS_PRES_KOSTRU,NAD_150A_12V,NAD_150A_MENIC,MENIC_OD_1000W");
    expect(sady).toContain("24:MINUS_PRES_KOSTRU,NAD_150A_MENIC,MENIC_OD_1000W");

    const k = { napeti: 12, rezim: "I", ubytekProc: 10, zpetny: 2, prostredi: "n" } as const;
    for (const f of FUSES) {
      const h = f / 1.25;
      const pod = ref.navrh({ ...k, hodnota: h * (1 - 1e-9), delka: 0.2 });
      const nad = ref.navrh({ ...k, hodnota: h * (1 + 1e-9), delka: 0.2 });
      expect(pod.stav === "ok" ? pod.pojistka : null, `pod hranou ${f} A`).toBe(f);
      if (f === 250) expect(nad, "nad 200 A").toEqual({ stav: "chyba", proud: h * (1 + 1e-9), hlasky: ["HLAVNI_VEDENI"] });
      else expect(nad.stav === "ok" ? nad.pojistka : null, `nad hranou ${f} A`).toBeGreaterThan(f);
    }
  }, 300_000);

  it("porovnání odhalí odchylku v každém poli (a toleruje < 1e-9)", () => {
    const exp = ref.navrh({ ...zaklad, rezim: "I", hodnota: 160, delka: 1, ubytekProc: 10, zpetny: 1 });
    if (exp.stav !== "ok") throw new Error("čekán ok");
    expect(exp.hlasky).toEqual(["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "NAD_150A_12V", "NAD_150A_MENIC"]);
    expect(porovnej(exp, structuredClone(exp))).toEqual([]);
    expect(porovnej(exp, { ...exp, ubytekV: exp.ubytekV + 0.5e-9 })).toEqual([]);
    const zmeny: Partial<typeof exp>[] = [
      { prurez: 95 }, { pojistka: 175 }, { pojistka: 225 }, { maxPojistka: 250 }, { rozhodlo: "ubytek" },
      { awg: { oznaceni: "4/0", plocha: 85 } }, { awg: { oznaceni: "3/0", plocha: 85.1 } }, { awg: null },
      { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "NAD_150A_MENIC", "NAD_150A_12V"] },
      { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "NAD_150A_12V"] },
      { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "NAD_150A_MENIC"] },
      { proud: exp.proud + 2e-9 }, { prikon: exp.prikon + 1 }, { ubytekV: exp.ubytekV - 2e-9 }, { ubytekProc: NaN },
      { napetiUSpotrebice: exp.napetiUSpotrebice + 1e-6 }, { ztrata: exp.ztrata * 2 }, { maxDelka: exp.maxDelka + 1e-8 },
    ];
    for (const z of zmeny) expect(porovnej(exp, { ...exp, ...z }), JSON.stringify(z)).toHaveLength(1);
    expect(porovnej(exp, { stav: "chyba", hlasky: ["HLAVNI_VEDENI"] }).length).toBeGreaterThan(0);
    const hv = ref.navrh({ ...zaklad, rezim: "I", hodnota: 205 });
    expect(hv).toEqual({ stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] });
    expect(porovnej(hv, { stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] })).toEqual([]);
    expect(porovnej(hv, { stav: "chyba", proud: 205 + 2e-9, hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1);
    expect(porovnej(hv, { stav: "chyba", hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1); // proud chybí
    expect(porovnej(hv, { stav: "chyba", proud: 205, hlasky: ["MIMO_ROZSAH" as never] })).toHaveLength(1);
    expect(porovnej(hv, { stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI", "NAD_150A_MENIC"] })).toHaveLength(1);

    const radky = ref.tabulka();
    const r0 = radky[13]!;
    expect(porovnejRadek(r0, { ...r0 })).toEqual([]);
    for (const z of [{ prurez: 120 }, { maxPojistka: 300 }, { maxPojistkaSvazek: 225 }, { awg: { oznaceni: "4/0", plocha: 85 } }, { delka3: r0.delka3 + 2e-9 }, { delka10: r0.delka10 - 2e-9 }])
      expect(porovnejRadek(r0, { ...r0, ...z } as RadekTabulky), JSON.stringify(z)).toHaveLength(1);
  });

  it("mřížka odhalí každého mutanta výpočtu", () => {
    const mutanti: [string, Partial<Varianta>][] = [
      ["1,1 × I místo 1,25 × I (v1)", { koef: "1.1" }],
      ["1,2 × I", { koef: "1.2" }],
      ["1,3 × I", { koef: "1.3" }],
      ["pojistka ostře > 1,25 × I", { op: ">" }],
      ["300 A v řadě FUSES", { fuses300: true }],
      ["300 A zapomenutá v maxFuse()", { maxFuse300: true }],
      ["chybí NAD_150A_MENIC", { menic: null }],
      ["NAD_150A_MENIC jen pro 12 V", { menic: "I>150 && U===12" }],
      ["NAD_150A_MENIC jen pro 24 V", { menic: "I>150 && U===24" }],
      ["NAD_150A_MENIC od 150 A včetně", { menic: "I>=150" }],
      ["NAD_150A_MENIC od 200 A", { menic: "I>200" }],
      ["NAD_150A_MENIC podle příkonu (režim P) místo proudu", { menic: "st.mode===\"P\" && v>150" }],
      ["NAD_150A_MENIC před NAD_150A_12V", { menicPred12V: true }],
      ["HLAVNI_VEDENI bez proudu", { proudVChybe: false }],
    ];
    // Platné výsledky jednou, mutanti proti nim (první rozdíl stačí).
    const vstupy: VstupVodice[] = [];
    for (const k of kombinace()) vstupy.push(...vse(k, refMM), ...neplatne(k));
    const platne: VysledekVodice[] = vstupy.map((v) => ref.navrh(v));
    const neodhaleni: string[] = [];
    for (const [nazev, zmena] of mutanti) {
      const m = nactiReferenciV11({ ...VARIANTA_V11, ...zmena });
      let odhalen = false;
      for (let i = 0; i < vstupy.length && !odhalen; i++) if (porovnej(platne[i]!, m.navrh(vstupy[i]!)).length) odhalen = true;
      if (!odhalen) neodhaleni.push(nazev);
    }
    expect(neodhaleni).toEqual([]);
  }, 600_000);

  it("parsování tabulky sedí s tím, co reference v1.1 vykreslí při načtení (cs-CZ)", () => {
    const rows = ref.tabulka();
    expect(rows).toHaveLength(14);
    const f = ref.fmt;
    const html = rows.map(
      (r) =>
        `<tr><td><b>${f(r.prurez, 2)}</b></td><td>${r.awg.oznaceni} <span class="note">(${f(r.awg.plocha, 2)})</span></td><td>${f(r.maxPojistka)} / ${f(r.maxPojistkaSvazek)} A</td><td>${f(r.delka3)} m</td><td>${f(r.delka10)} m</td></tr>`,
    );
    expect(html).toEqual(ref.tabulkaPuvodniHtml);
    // Prvních 14 průřezů (do 95 mm²) nedosáhne 300 A ani ve v1, tabulka v1.1 = tabulka v1.
    expect(rows).toEqual(v1.tabulka());
  });
});

// ---------------------------------------------------------------------------
// 2. Golden test navrhVodice: celá mřížka.
// ---------------------------------------------------------------------------

describe("golden v1.1: navrhVodice proti referenci", () => {
  for (const k of kombinace()) {
    const nazev = `${k.napeti} V, režim ${k.rezim}, úbytek ${k.ubytekProc} %, zpětný ${k.zpetny}, prostředí ${k.prostredi}`;
    it(`mřížka proud × délka (+ prahy příkonu): ${nazev}`, () => overSadu([...mrizka(k), ...prahyPrikonu(k)]));
    it(`hrany úbytku (Areq = průřez z MM): ${nazev}`, () => overSadu(hranyUbytku(k, refMM)));
    it(`neplatné vstupy: ${nazev}`, () => overSadu(neplatne(k)));
  }
});

// ---------------------------------------------------------------------------
// 3. Referenční tabulka.
// ---------------------------------------------------------------------------

describe("golden v1.1: referencniTabulka proti referenci", () => {
  it("14 řádků, řádek po řádku", () => {
    const exp = ref.tabulka();
    const act: RadekTabulky[] = referencniTabulka();
    expect(act).toHaveLength(exp.length);
    exp.forEach((e, i) => expect(porovnejRadek(e, act[i]!), `řádek ${i + 1} (${e.prurez} mm²), tolerance ${TOL}`).toEqual([]));
  });
});
