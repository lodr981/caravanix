// Golden test kalkulačky průřezu VERZE 2 (platná, druhé kolo rozhodnutí 16. 11. 2026): engine
// (@caravanix/engine, src/vodic.ts) proti nezávislé referenci tests/golden-v2/reference-v2.ts, napsané jen
// z textu docs/KALKULACKA_PRUREZU.md („Verze 2: co platí“). Reference má vždy pravdu.
// Jakýkoli rozdíl je chyba enginu (docs/KALKULACKA_PRUREZU.md, Golden test).

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { odporVodicu, pojistky } from "@caravanix/data";
import { navrhVodice, referencniTabulka } from "@caravanix/engine";
import type { RadekTabulky, VstupVodice } from "../src/vodic.ts";
import { loadReference } from "./golden-v1/reference.ts";
import {
  AMP,
  AWG,
  CAPH,
  CAPN,
  MM,
  NABIDKA,
  PARAMETRY_V2,
  POJISTKY,
  RHO,
  amp,
  i30,
  interp,
  nearestAwg,
  referenceV2 as ref,
  vytvorReferenci,
  type ParametryV2,
  type PojistkaRef,
} from "./golden-v2/reference-v2.ts";
import { porovnej, porovnejRadek } from "./golden-v2/porovnani-v2.ts";
import {
  DELKY,
  MEZ,
  PROUDY,
  PROUDY_I30,
  PROUDY_NAD,
  hranyPojistekPresne,
  hranyUbytku,
  hranyUbytkuPresne,
  kombinace,
  mrizka,
  neplatne,
  prahy,
  vstup,
} from "./golden-v2/grid-v2.ts";

const MAX_VYPIS = 15;
const KARTY = fileURLToPath(new URL("../../../docs/karty/", import.meta.url));

function popis(v: VstupVodice): string {
  return `${v.napeti} V, ${v.rezim}=${v.hodnota}, L=${v.delka} m, ${v.ubytekProc} %, ${v.ulozeni}`;
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
  expect(chyby, `${pocet} z ${vstupy.length} případů nesedí s referencí v2, prvních ${chyby.length}:`).toEqual([]);
}

/** Celá mřížka všech kombinací (pro kontroly testu). */
function celaMrizka(): VstupVodice[] {
  const out: VstupVodice[] = [];
  for (const k of kombinace())
    out.push(...mrizka(k), ...hranyPojistekPresne(k), ...hranyUbytku(k), ...hranyUbytkuPresne(k), ...prahy(k), ...neplatne(k));
  return out;
}

/** Desetinné číslo jako celé číslo × 10^-des (přesně, přes řetězec). */
function naCele(x: number, des: number): bigint {
  const s = String(x);
  expect(s, `číslo ${s} v exponentovém tvaru`).not.toMatch(/e/i);
  const [cela, zlomek = ""] = s.split(".");
  expect(zlomek.length, `${s} má víc než ${des} desetinných míst`).toBeLessThanOrEqual(des);
  return BigInt(cela! + zlomek.padEnd(des, "0"));
}

// ---------------------------------------------------------------------------
// 1. Kontrola samotného testu (nezávisí na enginu, musí procházet vždy).
// ---------------------------------------------------------------------------

describe("reference v2 (kontrola testu)", () => {
  const v1 = loadReference();
  const g = <T,>(expr: string) => vm.runInContext(expr, v1.ctx) as T;

  it("tabulky beze změny = opis z kalkulacka-prurezu-v1.html", () => {
    expect(MM).toEqual(g("MM"));
    expect(AMP).toEqual(g("AMP"));
    expect(AWG).toEqual(g("AWG"));
    expect(CAPN).toEqual(g("CAPN"));
    expect(CAPH).toEqual(g("CAPH"));
  });

  it("amp(), interp() a nearestAwg() dávají bit po bitu totéž co reference v1", () => {
    const refAmp = g<(a: number) => number>("amp");
    const refInterp = g<(arr: number[], a: number) => number>("interp");
    const refAwg = g<(a: number) => [string, number]>("nearestAwg");
    const plochy = [...MM, ...AWG.map((w) => w[1]), 0.1, 0.3, 0.6, 3, 7, 20, 60, 110, 130, 200];
    for (let a = 0.05; a < 150; a *= 1.013) plochy.push(a);
    for (const a of plochy) {
      expect(amp(a), `amp(${a})`).toBe(refAmp(a));
      expect(interp(CAPN, a), `interp(CAPN, ${a})`).toBe(refInterp(g("CAPN"), a));
      expect(interp(CAPH, a), `interp(CAPH, ${a})`).toBe(refInterp(g("CAPH"), a));
      const w = refAwg(a);
      expect(nearestAwg(a), `nearestAwg(${a})`).toEqual({ oznaceni: w[0], plocha: w[1] });
    }
  });

  it("datová tabulka odpor-vodicu.json má tvar podle zadání (15 průřezů z MM, rho zaokrouhlené polovinou nahoru, karty)", () => {
    expect(odporVodicu.verze).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const pol = odporVodicu.polozky;
    expect(pol).toHaveLength(15);
    expect(pol.map((p) => p.prurez)).toEqual([...MM]);
    for (const p of pol) {
      // rho = odporOhmKm × prurez / 1000 na 4 desetinná místa, polovina nahoru, počítáno přesně v celých číslech:
      // odporOhmKm × 1000 · prurez × 100 = rho × 1e8; na 4 místa = (x + 5000) / 10000 dolů.
      const x = naCele(p.odporOhmKm, 3) * naCele(p.prurez, 2);
      const rho4 = (x + 5000n) / 10000n;
      expect(naCele(p.rho, 4), `rho pro ${p.prurez} mm²`).toBe(rho4);
      expect(p.karta, `karta pro ${p.prurez} mm²`).toMatch(/^K-VODIC-\d{4}$/);
      expect(existsSync(`${KARTY}${p.karta}.md`), `docs/karty/${p.karta}.md`).toBe(true);
    }
    // Zadání: 95 a 120 mm² = 0,0196 a 0,0193 (IEC 60228 třída 5, 0,206 a 0,161 Ω/km).
    expect(pol.slice(13).map((p) => [p.odporOhmKm, p.rho])).toEqual([[0.206, 0.0196], [0.161, 0.0193]]);
    // Pozor na 1,5 mm²: 12,7 × 1,5 / 1000 = 0,01905 přesně → 0,0191 (Math.round v double by dal 0,019).
    expect(pol[3]!.rho).toBe(0.0191);
    expect(RHO).toEqual(pol.map((p) => p.rho));
  });

  it("datová tabulka pojistky.json má tvar podle zadání (jen nabízené hodnoty, rodiny, pořadí, karty)", () => {
    expect(pojistky.verze).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const pol = pojistky.polozky;
    expect(pol.map((p) => [p.rodina, p.jmenovita])).toEqual(NABIDKA.map(([r, f]) => [r, f]));
    expect(NABIDKA).toHaveLength(22);
    const jm = pol.map((p) => p.jmenovita);
    expect(jm).toEqual([...jm].sort((a, b) => a - b));
    expect(jm).not.toContain(35);
    expect(jm).not.toContain(300);
    expect(new Set(pol.map((p) => p.rodina))).toEqual(new Set(["ATOF", "MIDI", "MEGA"]));
    for (const p of pol) {
      for (const k of ["trvaly20", "trvaly65"] as const)
        expect(Number.isFinite(p[k]) && p[k] > 0, `${p.jmenovita} A ${k}`).toBe(true);
      expect(Object.keys(p).sort(), `${p.jmenovita} A klíče`).toEqual(["jmenovita", "karta", "rodina", "trvaly20", "trvaly65"]);
      expect(p.karta).toMatch(/^K-VODIC-\d{4}$/);
      expect(existsSync(`${KARTY}${p.karta}.md`), `docs/karty/${p.karta}.md`).toBe(true);
    }
    expect(POJISTKY).toEqual(pol.map(({ karta: _k, ...x }) => x));
  });

  it("parametry odpovídají tabulce „Uložení“ a bodu 4", () => {
    expect(PARAMETRY_V2.ulozeni).toEqual({
      par: { n: 2, k: 0.76, strop: CAPN },
      kostra: { n: 1, k: 1.0, strop: CAPN },
      svazek: { n: 2, k: 0.53, strop: CAPH },
    });
    expect(PARAMETRY_V2.awgSoused).toBe("vetsi");
    expect(PARAMETRY_V2.pomerPojistky).toBeUndefined();
    // I30 ručně: 5 A ATOF: 5 + (4 − 5) × 10 / 45 = 4,7778; 250 A MEGA: 207 + (175 − 207) × 10 / 45 = 199,8889.
    const p = (j: number) => POJISTKY.find((x) => x.jmenovita === j)!;
    expect(i30(p(5))).toBeCloseTo(43 / 9, 14);
    expect(i30(p(250))).toBeCloseTo(1799 / 9, 12);
    expect(i30(p(225))).toBe(169);
    expect(MEZ).toBe(i30(p(250)));
  });

  it("mřížka splňuje zadání (≥ 40 proudů 0,5 A až mez, hrany I30 každé pojistky, nad mezí, ≥ 15 délek 0,2–20 m, 48 kombinací)", () => {
    expect(PROUDY.filter((p) => p >= 0.5 && p <= MEZ).length).toBeGreaterThanOrEqual(40);
    for (const p of POJISTKY) {
      const h = i30(p);
      expect(PROUDY, `pod/nad hranou ${p.jmenovita} A`).toEqual(expect.arrayContaining([h * (1 - 1e-9), h * (1 + 1e-9)]));
      expect(PROUDY_I30, `na hraně ${p.jmenovita} A`).toContain(h);
    }
    expect(PROUDY.filter((p) => p > MEZ).length).toBeGreaterThanOrEqual(5);
    expect(DELKY.filter((l) => l >= 0.2 && l <= 20).length).toBeGreaterThanOrEqual(15);
    expect(kombinace()).toHaveLength(48);
  });

  // Ruční výpočty (postup v tests/priklady/vodic-v2.md).
  it("ruční případ: 60 W / 12 V / 5 m / 3 % / par → 4 mm², ATOF 7,5 A", () => {
    // I = 5 A; I30(5 A) = 4,78 < 5, I30(7,5 A) = 6,78 ≥ 5 → 7,5 A ATOF.
    // dU = 0,36 V; ΔU(2,5) = 0,019·5·2·5/2,5 = 0,38 > 0,36; ΔU(4) = 0,0188·5·2·5/4 = 0,235 ≤ 0,36 → 4 mm².
    // maxFuse(4, par) = min(42 × 0,76 = 31,92; 30) → 30 A. AWG 12 (3,31; ρ = max(0,019; 0,0188) = 0,019):
    // 0,019·5·2·5/3,31 = 0,287 ≤ 0,36 a maxFuse(3,31) ≥ 7,5 → AWG 12.
    const dU = 0.0188 * 5 * 2 * 5 / 4;
    expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, ulozeni: "par" })).toEqual({
      stav: "ok", prurez: 4, awg: { oznaceni: "12", plocha: 3.31 }, pojistka: 7.5, rodinaPojistky: "ATOF", maxPojistka: 30,
      proud: 5, prikon: 60, ubytekV: expect.closeTo(dU, 12), ubytekProc: expect.closeTo((dU / 12) * 100, 12),
      napetiUSpotrebice: expect.closeTo(12 - dU, 12), ztrata: expect.closeTo(dU * 5, 12),
      maxDelka: expect.closeTo((0.36 * 4) / (0.0188 * 2 * 5), 12), rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    });
  });

  it("ruční případy: kostra, svazek, MEGA, chyby", () => {
    expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" })).toMatchObject({
      stav: "ok", prurez: 35, awg: { oznaceni: "1", plocha: 42.4 }, pojistka: 125, rodinaPojistky: "MIDI", maxPojistka: 125,
      proud: 100, rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    });
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, ulozeni: "svazek" })).toMatchObject({
      stav: "ok", prurez: 6, awg: { oznaceni: "10", plocha: 5.26 }, pojistka: 25, rodinaPojistky: "ATOF", maxPojistka: 25,
      prikon: 480, rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK", "SVAZEK_NEJVYS_3_OBVODY"],
    });
    expect(ref.navrh({ napeti: 12, rezim: "I", hodnota: 150, delka: 1, ubytekProc: 10, ulozeni: "par" })).toMatchObject({
      stav: "ok", prurez: 95, awg: { oznaceni: "3/0", plocha: 85 }, pojistka: 200, rodinaPojistky: "MEGA", maxPojistka: 200,
      rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI"], // 150 A není > 150 A
    });
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 205, delka: 1, ubytekProc: 10, ulozeni: "par" })).toEqual({ stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] });
    expect(ref.navrh({ napeti: 12, rezim: "I", hodnota: 40, delka: 1.5, ubytekProc: 10, ulozeni: "motor" })).toEqual({ stav: "chyba", hlasky: ["MOTOR_NEPOCITA"] });
    // Bod 1 před bodem 2: neplatný vstup i v motorovém prostoru.
    expect(ref.navrh({ napeti: 12, rezim: "I", hodnota: 0, delka: 1.5, ubytekProc: 10, ulozeni: "motor" })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
    // 150 A ve svazku: pojistka 200 A, ale maxFuse(120, svazek) = min(344 × 0,53 = 182,3; 225) → 175 A → ANI_120_NESTACI.
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 150, delka: 0.2, ubytekProc: 10, ulozeni: "svazek" })).toEqual({ stav: "chyba", proud: 150, hlasky: ["ANI_120_NESTACI"] });
    for (const x of [0, -1, NaN]) {
      expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: x, delka: 4, ubytekProc: 3, ulozeni: "par" })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
      expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 120, delka: x, ubytekProc: 3, ulozeni: "par" })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
    }
  });

  it("mřížka v referenci pokryje všechny kódy, rodiny, pojistky, obě „rozhodlo“, AWG null, 95 a 120 mm²; hrany I30 fungují", () => {
    const kody = new Set<string>();
    const rozhodlo = new Set<string>();
    const okUlozeni = new Set<string>();
    const rodiny = new Set<string>();
    const vybrane = new Set<number>();
    const prurezy = new Set<number>();
    let awgNull = 0;
    let ani120Kratka = 0; // ANI_120_NESTACI kvůli oteplení (i na 0,2 m)
    for (const v of celaMrizka()) {
      const r = ref.navrh(v);
      r.hlasky.forEach((h) => kody.add(h));
      if (r.stav === "ok") {
        rozhodlo.add(r.rozhodlo);
        okUlozeni.add(v.ulozeni);
        rodiny.add(r.rodinaPojistky);
        vybrane.add(r.pojistka);
        prurezy.add(r.prurez);
        if (r.awg === null) awgNull++;
      } else if (r.hlasky[0] === "ANI_120_NESTACI" && v.delka === 0.2) ani120Kratka++;
    }
    expect([...kody].sort()).toEqual(
      ["ANI_120_NESTACI", "HLAVNI_VEDENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU", "MOTOR_NEPOCITA", "NAD_150A_12V",
        "NEPLATNY_VSTUP", "ROZHODLO_OTEPLENI", "ROZHODL_UBYTEK", "SVAZEK_NEJVYS_3_OBVODY"].sort(),
    );
    expect([...rozhodlo].sort()).toEqual(["oteplen", "ubytek"]);
    expect([...okUlozeni].sort()).toEqual(["kostra", "par", "svazek"]);
    expect([...rodiny].sort()).toEqual(["ATOF", "MEGA", "MIDI"]);
    expect([...vybrane].sort((a, b) => a - b)).toEqual(POJISTKY.map((p) => p.jmenovita));
    expect([...prurezy].sort((a, b) => a - b)).toEqual([...MM]);
    expect(awgNull).toBeGreaterThan(0);
    expect(ani120Kratka).toBeGreaterThan(0);

    // Hrana pojistky f: těsně pod I30 a na I30 vyjde f, těsně nad vyjde další (nad 250 A → HLAVNI_VEDENI).
    const k = { napeti: 24, rezim: "I", ubytekProc: 10, ulozeni: "kostra" } as const;
    const poj = (I: number) => {
      const r = ref.navrh(vstup(k, I, 0.2));
      return r.stav === "ok" ? r.pojistka : r.hlasky[0];
    };
    POJISTKY.forEach((p, i) => {
      const h = i30(p);
      expect(poj(h * (1 - 1e-9)), `pod hranou ${p.jmenovita} A`).toBe(p.jmenovita);
      expect(poj(h), `na hraně ${p.jmenovita} A`).toBe(p.jmenovita);
      expect(poj(h * (1 + 1e-9)), `nad hranou ${p.jmenovita} A`).toBe(POJISTKY[i + 1]?.jmenovita ?? "HLAVNI_VEDENI");
    });
    for (const p of PROUDY_NAD) expect(ref.navrh(vstup(k, p, 0.2)).hlasky).toEqual(["HLAVNI_VEDENI"]);
  }, 120_000);

  it("porovnání odhalí podvrženou odchylku v každém poli (a toleruje < 1e-9)", () => {
    const exp = ref.navrh({ napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" });
    if (exp.stav !== "ok") throw new Error("čekán ok");
    expect(porovnej(exp, structuredClone(exp))).toEqual([]);
    expect(porovnej(exp, { ...exp, ubytekV: exp.ubytekV + 0.5e-9 })).toEqual([]);
    const zmeny: Partial<typeof exp>[] = [
      { prurez: 50 }, { pojistka: 150 }, { rodinaPojistky: "MEGA" }, { maxPojistka: 150 }, { rozhodlo: "ubytek" },
      { awg: { oznaceni: "1", plocha: 42.5 } }, { awg: { oznaceni: "1/0", plocha: 42.4 } }, { awg: null },
      { hlasky: ["ROZHODLO_OTEPLENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU"] }, { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU"] },
      { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "SVAZEK_NEJVYS_3_OBVODY", "MENIC_OD_1000W"] },
      { proud: exp.proud + 2e-9 }, { prikon: exp.prikon + 1 }, { ubytekV: exp.ubytekV - 2e-9 }, { ubytekProc: NaN },
      { napetiUSpotrebice: exp.napetiUSpotrebice + 1e-6 }, { ztrata: exp.ztrata * 2 }, { maxDelka: exp.maxDelka + 1e-8 },
    ];
    for (const z of zmeny) expect(porovnej(exp, { ...exp, ...z }), JSON.stringify(z)).toHaveLength(1);
    expect(porovnej(exp, { stav: "chyba", hlasky: ["ANI_120_NESTACI"] }).length).toBeGreaterThan(0);

    const hv = ref.navrh({ napeti: 24, rezim: "I", hodnota: 205, delka: 1, ubytekProc: 10, ulozeni: "par" });
    expect(porovnej(hv, { stav: "chyba", proud: 205, hlasky: ["HLAVNI_VEDENI"] })).toEqual([]);
    expect(porovnej(hv, { stav: "chyba", proud: 206, hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1);
    expect(porovnej(hv, { stav: "chyba", hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1); // chybí proud
    expect(porovnej(hv, { stav: "chyba", proud: 205, hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);
    const a120 = ref.navrh({ napeti: 24, rezim: "I", hodnota: 150, delka: 0.2, ubytekProc: 10, ulozeni: "svazek" });
    expect(porovnej(a120, { stav: "chyba", proud: 150 + 1e-6, hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);
    expect(porovnej(a120, { stav: "chyba", hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);
    const mot = ref.navrh({ napeti: 12, rezim: "I", hodnota: 40, delka: 1, ubytekProc: 3, ulozeni: "motor" });
    expect(porovnej(mot, { stav: "chyba", hlasky: ["MOTOR_NEPOCITA"] })).toEqual([]);
    expect(porovnej(mot, { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] })).toHaveLength(1);
    expect(porovnej(mot, { stav: "chyba", proud: 40, hlasky: ["MOTOR_NEPOCITA"] })).toHaveLength(1); // bod 2: bez proudu
    expect(porovnej(mot, ref.navrh({ napeti: 12, rezim: "I", hodnota: 40, delka: 1, ubytekProc: 3, ulozeni: "par" })).length).toBeGreaterThan(0);

    // Řádek tabulky.
    const r = ref.tabulka()[5]!;
    expect(porovnejRadek(r, structuredClone(r))).toEqual([]);
    const zmenyRadku: Partial<RadekTabulky>[] = [
      { prurez: 6 }, { rho: 0.0191 }, { awg: { oznaceni: "14", plocha: 2.08 } }, { awg: { oznaceni: "12", plocha: 3.3 } },
      { maxPojistka: { ...r.maxPojistka, par: 25 } }, { maxPojistka: { ...r.maxPojistka, kostra: 25 } },
      { maxPojistka: { ...r.maxPojistka, svazek: 25 } },
      { maxPojistka: { ...r.maxPojistka, motor: 25 } as RadekTabulky["maxPojistka"] },
      { delka3: r.delka3 + 2e-9 }, { delka10: r.delka10 - 2e-9 },
    ];
    for (const z of zmenyRadku) expect(porovnejRadek(r, { ...r, ...z }), JSON.stringify(z)).toHaveLength(1);
  });

  // Podvržená chyba výpočtu (typické záměny 1. kolo → 2. kolo, v1 → v2): mřížka ji musí odhalit.
  it("mřížka odhalí podvrženou chybu výpočtu (mutanty)", () => {
    const P = PARAMETRY_V2;
    const U = P.ulozeni;
    // Pojistky navíc mají vymyšlené I20/I65 (jen pro mutant, v datech nejsou a být nemají).
    const navic = (...x: PojistkaRef[]) => [...P.pojistky, ...x].sort((a, b) => a.jmenovita - b.jmenovita);
    const mutanty: [string, ParametryV2][] = [
      ["par k = 0,8 (1. kolo)", { ...P, ulozeni: { ...U, par: { ...U.par, k: 0.8 } } }],
      ["kostra k = 0,76", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, k: 0.76 } } }],
      ["kostra n = 2", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, n: 2 } } }],
      ["svazek k = 0,7 (v1)", { ...P, ulozeni: { ...U, svazek: { ...U.svazek, k: 0.7 } } }],
      ["svazek n = 1", { ...P, ulozeni: { ...U, svazek: { ...U.svazek, n: 1 } } }],
      ["par se stropem CAPH", { ...P, ulozeni: { ...U, par: { ...U.par, strop: CAPH } } }],
      ["kostra se stropem CAPH", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, strop: CAPH } } }],
      ["jedno ρ 0,0191 místo tabulky (1. kolo)", { ...P, rho: MM.map(() => 0.0191) }],
      ["ρ nezaokrouhlené (odporOhmKm × a / 1000)", { ...P, rho: odporVodicu.polozky.map((p) => (p.odporOhmKm * p.prurez) / 1000) }],
      ["ρ 1,5 mm² zaokrouhlené v double (0,019)", { ...P, rho: P.rho.map((r, i) => (i === 3 ? 0.019 : r)) }],
      ["ρ 95 a 120 mm² jako 70 mm²", { ...P, rho: P.rho.map((r, i) => (i >= 13 ? P.rho[12]! : r)) }],
      ["AWG s menším ρ ze sousedů", { ...P, awgSoused: "mensi" }],
      ["pojistka ≥ 1,25 × proud místo tabulky (1. kolo)", { ...P, pomerPojistky: 1.25 }],
      ["I20 místo I30", { ...P, dovolenyProud: (p) => p.trvaly20 }],
      ["I65 místo I30", { ...P, dovolenyProud: (p) => p.trvaly65 }],
      ["jmenovitá místo I30", { ...P, dovolenyProud: (p) => p.jmenovita }],
      ["I30 interpolace z 25 °C", { ...P, dovolenyProud: (p) => p.trvaly20 + ((p.trvaly65 - p.trvaly20) * 5) / 45 }],
      ["35 A v řadě", { ...P, pojistky: navic({ rodina: "ATOF", jmenovita: 35, trvaly20: 32, trvaly65: 27 }) }],
      ["MINI 4 A nabídnutá", { ...P, pojistky: navic({ rodina: "MINI", jmenovita: 4, trvaly20: 4, trvaly65: 3.5 }) }],
      ["MAXI 120 A nabídnutá", { ...P, pojistky: navic({ rodina: "MAXI", jmenovita: 120, trvaly20: 118, trvaly65: 100 }) }],
      ["MEGA 300 A (zkratová) nabídnutá", { ...P, pojistky: navic({ rodina: "MEGA", jmenovita: 300, trvaly20: 250, trvaly65: 210 }) }],
      ["chybí 7,5 A", { ...P, pojistky: P.pojistky.filter((p) => p.jmenovita !== 7.5) }],
      ["záměna rodiny 125 A za MEGA", { ...P, pojistky: P.pojistky.map((p) => (p.jmenovita === 125 ? { ...p, rodina: "MEGA" } : p)) }],
      ["úbytek ostře <", { ...P, ubytekOstre: true }],
      ["rozhodlo iDrop > iFuse", { ...P, rozhodloOstre: true }],
      ["práh 150 A jako ≥", { ...P, prah12V: 149.999 }],
      ["práh měniče > 1000 W", { ...P, prahMenic: 1000.001 }],
      ["motor se počítá jako par", { ...P, motorJako: "par" }],
    ];
    const vstupy = celaMrizka();
    const ocek = vstupy.map((v) => ref.navrh(v));
    const neodhaleno: string[] = [];
    for (const [nazev, param] of mutanty) {
      const m = vytvorReferenci(param);
      if (!vstupy.some((v, i) => porovnej(ocek[i]!, m.navrh(v)).length > 0)) neodhaleno.push(nazev);
    }
    expect(neodhaleno, "mutanty, které mřížka neodhalí").toEqual([]);
  }, 600_000);
});

// ---------------------------------------------------------------------------
// 2. Golden test navrhVodice v2: celá mřížka.
// ---------------------------------------------------------------------------

describe("golden v2: navrhVodice proti referenci v2", () => {
  for (const k of kombinace()) {
    const nazev = `${k.napeti} V, režim ${k.rezim}, úbytek ${k.ubytekProc} %, uložení ${k.ulozeni}`;
    it(`mřížka proud × délka: ${nazev}`, () => overSadu(mrizka(k)));
    // DOSLOVNÝ VÝKLAD bodu 4 (I30 zleva doprava). Padá-li jen tato sada o 1 ulp, jde o otázku pro Radka
    // (ZPRAVA.md), ne nutně o chybu logiky.
    it(`hrany pojistek přesně na I30: ${nazev}`, () => overSadu(hranyPojistekPresne(k)));
    it(`hrany úbytku ±1e-9: ${nazev}`, () => overSadu(hranyUbytku(k)));
    // Bod 7: ΔU(a) zleva doprava, porovnání bez tolerance (závazné podle zadání).
    it(`hrany úbytku přesně na hraně: ${nazev}`, () => overSadu(hranyUbytkuPresne(k)));
    it(`prahy hlášek (1 000 W, 150 A): ${nazev}`, () => overSadu(prahy(k)));
    it(`neplatné vstupy: ${nazev}`, () => overSadu(neplatne(k)));
  }
});

// ---------------------------------------------------------------------------
// 3. Referenční tabulka v2.
// ---------------------------------------------------------------------------

describe("golden v2: referencniTabulka proti referenci v2", () => {
  it("14 řádků, řádek po řádku", () => {
    const exp = ref.tabulka();
    expect(exp).toHaveLength(14);
    expect(exp.map((r) => r.prurez)).toEqual(MM.slice(0, 14));
    const act: RadekTabulky[] = referencniTabulka();
    expect(act).toHaveLength(exp.length);
    const chyby = exp.flatMap((e, i) => porovnejRadek(e, act[i]!).map((d) => `řádek ${i + 1} (${e.prurez} mm²): ${d}`));
    expect(chyby).toEqual([]);
  });
});

