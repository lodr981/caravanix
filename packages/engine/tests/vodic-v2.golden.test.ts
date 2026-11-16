// Golden test kalkulačky průřezu VERZE 2 (platná): engine (@caravanix/engine, src/vodic.ts) proti nezávislé
// referenci tests/golden-v2/reference-v2.ts, napsané jen z textu docs/KALKULACKA_PRUREZU.md („Verze 2: co platí“).
// Reference má vždy pravdu. Jakýkoli rozdíl je chyba enginu (docs/KALKULACKA_PRUREZU.md, Golden test).

import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { navrhVodice, referencniTabulka } from "@caravanix/engine";
import type { RadekTabulky, VstupVodice } from "../src/vodic.ts";
import { loadReference } from "./golden-v1/reference.ts";
import {
  AMP,
  AWG,
  CAPH,
  CAPN,
  FUSES_V1,
  FUSES_V2,
  MM,
  PARAMETRY_V2,
  ULOZENI,
  amp,
  interp,
  nearestAwg,
  referenceV2 as ref,
  vytvorReferenci,
  type ParametryV2,
} from "./golden-v2/reference-v2.ts";
import { porovnej, porovnejRadek } from "./golden-v2/porovnani-v2.ts";
import {
  DELKY,
  PROUDY,
  PROUDY_NAD,
  hranyUbytku,
  hranyUbytkuPresne,
  kombinace,
  mrizka,
  neplatne,
  prahy,
  vstup,
} from "./golden-v2/grid-v2.ts";

const MAX_VYPIS = 15;

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
  for (const k of kombinace()) out.push(...mrizka(k), ...hranyUbytku(k), ...hranyUbytkuPresne(k), ...prahy(k), ...neplatne(k));
  return out;
}

// ---------------------------------------------------------------------------
// 1. Kontrola samotného testu (nezávisí na enginu, musí procházet vždy).
// ---------------------------------------------------------------------------

describe("reference v2 (kontrola testu)", () => {
  const v1 = loadReference();
  const g = <T,>(expr: string) => vm.runInContext(expr, v1.ctx) as T;

  it("tabulky beze změny = opis z kalkulacka-prurezu-v1.html; FUSES v2 = FUSES v1 bez 300 A", () => {
    expect(MM).toEqual(g("MM"));
    expect(AMP).toEqual(g("AMP"));
    expect(AWG).toEqual(g("AWG"));
    expect(CAPN).toEqual(g("CAPN"));
    expect(CAPH).toEqual(g("CAPH"));
    expect(FUSES_V1).toEqual(g("FUSES"));
    expect(FUSES_V2).toEqual(FUSES_V1.slice(0, -1));
    expect(FUSES_V2).not.toContain(300);
    expect(FUSES_V2.at(-1)).toBe(250);
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

  it("parametry uložení odpovídají tabulce „Uložení“ v zadání", () => {
    expect(PARAMETRY_V2.ulozeni).toEqual({
      par: { n: 2, k: 0.8, rho: 0.0191, strop: CAPN },
      kostra: { n: 1, k: 1.0, rho: 0.0191, strop: CAPN },
      svazek: { n: 2, k: 0.53, rho: 0.0236, strop: CAPH },
      motor: { n: 2, k: 0.5, rho: 0.0236, strop: CAPH },
    });
    expect(PARAMETRY_V2.faktorPojistky).toBe(1.25);
  });

  it("mřížka splňuje zadání (≥ 40 proudů 0,5–200 A, hrany každé pojistky, nad mezí, ≥ 15 délek 0,2–20 m, 48 kombinací)", () => {
    expect(PROUDY.filter((p) => p >= 0.5 && p <= 200).length).toBeGreaterThanOrEqual(40);
    for (const f of FUSES_V2) {
      const h = f / 1.25;
      expect(PROUDY, `hrana ${f} A`).toEqual(expect.arrayContaining([h * (1 - 1e-9), h, h * (1 + 1e-9)]));
    }
    expect(PROUDY.filter((p) => p > 200).length).toBeGreaterThanOrEqual(5);
    expect(DELKY.filter((l) => l >= 0.2 && l <= 20).length).toBeGreaterThanOrEqual(15);
    expect(kombinace()).toHaveLength(48);
  });

  // Ruční výpočty (postup v tests/priklady/vodic-v2.md).
  it("ruční případy: 60 W / 12 V / 5 m / 3 % / par → 4 mm², 7,5 A", () => {
    const r = ref.navrh({ napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, ulozeni: "par" });
    // I = 5 A; Areq = 0,0191 · 5 · 2 · 5 / 0,36 = 2,6528 mm² → 4 mm²; pojistka ≥ 6,25 A → 7,5 A;
    // maxFuse(4, par) = min(42 · 0,8 = 33,6; 30) → 30 A.
    expect(r).toEqual({
      stav: "ok",
      prurez: 4,
      // AWG 12 (3,31 mm²) ≥ Areq a maxFuse(3,31; par) = 25 A ≥ 7,5 A.
      awg: { oznaceni: "12", plocha: 3.31 },
      pojistka: 7.5,
      maxPojistka: 30,
      proud: 5,
      prikon: 60,
      ubytekV: expect.closeTo((0.0191 * 5 * 2 * 5) / 4, 12),
      ubytekProc: expect.closeTo(((0.0191 * 5 * 2 * 5) / 4 / 12) * 100, 12),
      napetiUSpotrebice: expect.closeTo(12 - (0.0191 * 5 * 2 * 5) / 4, 12),
      ztrata: expect.closeTo(((0.0191 * 5 * 2 * 5) / 4) * 5, 12),
      maxDelka: expect.closeTo((0.36 * 4) / (0.0191 * 2 * 5), 12),
      rozhodlo: "ubytek",
      hlasky: ["ROZHODL_UBYTEK"],
    });
  });

  it("ruční případy: kostra, svazek, motor a chyby", () => {
    expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" })).toMatchObject({
      stav: "ok", prurez: 35, pojistka: 125, maxPojistka: 125, proud: 100, rozhodlo: "oteplen",
      hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"],
    });
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 20, delka: 8, ubytekProc: 5, ulozeni: "svazek" })).toMatchObject({
      stav: "ok", prurez: 10, pojistka: 25, maxPojistka: 35, proud: 20, prikon: 480, rozhodlo: "ubytek", hlasky: ["ROZHODL_UBYTEK"],
    });
    expect(ref.navrh({ napeti: 12, rezim: "I", hodnota: 40, delka: 1.5, ubytekProc: 10, ulozeni: "motor" })).toMatchObject({
      stav: "ok", prurez: 25, pojistka: 50, maxPojistka: 60, rozhodlo: "oteplen", hlasky: ["ROZHODLO_OTEPLENI", "MOTOR_VYSSI_TRIDA"],
    });
    // Mez rozsahu: 200 A ještě projde (250 ≥ 250), nad 200 A HLAVNI_VEDENI s proudem.
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 200, delka: 0.2, ubytekProc: 10, ulozeni: "kostra" })).toMatchObject({ stav: "ok", pojistka: 250 });
    expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 3000, delka: 2, ubytekProc: 3, ulozeni: "par" })).toEqual({ stav: "chyba", proud: 250, hlasky: ["HLAVNI_VEDENI"] });
    // 160 A v motorovém prostoru: pojistka 200 A, ale maxFuse(120, motor) = 150 A → ANI_120_NESTACI i na 0,2 m.
    expect(ref.navrh({ napeti: 24, rezim: "I", hodnota: 160, delka: 0.2, ubytekProc: 10, ulozeni: "motor" })).toEqual({ stav: "chyba", proud: 160, hlasky: ["ANI_120_NESTACI"] });
    for (const x of [0, -1, NaN]) {
      expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: x, delka: 4, ubytekProc: 3, ulozeni: "par" })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
      expect(ref.navrh({ napeti: 12, rezim: "P", hodnota: 120, delka: x, ubytekProc: 3, ulozeni: "par" })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
    }
  });

  it("mřížka v referenci pokryje všechny kódy, obě „rozhodlo“, AWG null a každé uložení; hrany pojistek fungují", () => {
    const kody = new Set<string>();
    const rozhodlo = new Set<string>();
    const okUlozeni = new Set<string>();
    let awgNull = 0;
    let ani120Kratka = 0; // ANI_120_NESTACI kvůli oteplení (i na 0,2 m)
    for (const v of celaMrizka()) {
      const r = ref.navrh(v);
      r.hlasky.forEach((h) => kody.add(h));
      if (r.stav === "ok") {
        rozhodlo.add(r.rozhodlo);
        okUlozeni.add(v.ulozeni);
        if (r.awg === null) awgNull++;
      } else if (r.hlasky[0] === "ANI_120_NESTACI" && v.delka === 0.2) ani120Kratka++;
    }
    expect([...kody].sort()).toEqual(
      ["ANI_120_NESTACI", "HLAVNI_VEDENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU", "MOTOR_VYSSI_TRIDA", "NAD_150A_12V", "NEPLATNY_VSTUP", "ROZHODLO_OTEPLENI", "ROZHODL_UBYTEK"].sort(),
    );
    expect([...rozhodlo].sort()).toEqual(["oteplen", "ubytek"]);
    expect([...okUlozeni].sort()).toEqual([...ULOZENI].sort());
    expect(awgNull).toBeGreaterThan(0);
    expect(ani120Kratka).toBeGreaterThan(0);

    // Hrana pojistky f: těsně pod a na f/1,25 vyjde f, těsně nad vyjde další (nad 250 A → HLAVNI_VEDENI).
    const k = { napeti: 24, rezim: "I", ubytekProc: 10, ulozeni: "kostra" } as const;
    FUSES_V2.forEach((f, i) => {
      const h = f / 1.25;
      const poj = (I: number) => {
        const r = ref.navrh(vstup(k, I, 0.2));
        return r.stav === "ok" ? r.pojistka : r.hlasky[0];
      };
      expect(poj(h * (1 - 1e-9)), `pod hranou ${f} A`).toBe(f);
      expect(poj(h), `na hraně ${f} A`).toBe(f);
      expect(poj(h * (1 + 1e-9)), `nad hranou ${f} A`).toBe(FUSES_V2[i + 1] ?? "HLAVNI_VEDENI");
    });
    for (const p of PROUDY_NAD) expect(ref.navrh(vstup(k, p, 0.2)).hlasky).toEqual(["HLAVNI_VEDENI"]);
  }, 120_000);

  it("porovnání odhalí podvrženou odchylku v každém poli (a toleruje < 1e-9)", () => {
    const exp = ref.navrh({ napeti: 12, rezim: "P", hodnota: 1200, delka: 2, ubytekProc: 3, ulozeni: "kostra" });
    if (exp.stav !== "ok") throw new Error("čekán ok");
    expect(porovnej(exp, structuredClone(exp))).toEqual([]);
    expect(porovnej(exp, { ...exp, ubytekV: exp.ubytekV + 0.5e-9 })).toEqual([]);
    const zmeny: Partial<typeof exp>[] = [
      { prurez: 50 }, { pojistka: 150 }, { maxPojistka: 150 }, { rozhodlo: "ubytek" },
      { awg: { oznaceni: "1", plocha: 42.5 } }, { awg: { oznaceni: "1/0", plocha: 42.4 } }, { awg: null },
      { hlasky: ["ROZHODLO_OTEPLENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU"] }, { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU"] },
      { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MOTOR_VYSSI_TRIDA", "MENIC_OD_1000W"] },
      { proud: exp.proud + 2e-9 }, { prikon: exp.prikon + 1 }, { ubytekV: exp.ubytekV - 2e-9 }, { ubytekProc: NaN },
      { napetiUSpotrebice: exp.napetiUSpotrebice + 1e-6 }, { ztrata: exp.ztrata * 2 }, { maxDelka: exp.maxDelka + 1e-8 },
    ];
    for (const z of zmeny) expect(porovnej(exp, { ...exp, ...z }), JSON.stringify(z)).toHaveLength(1);
    expect(porovnej(exp, { stav: "chyba", hlasky: ["ANI_120_NESTACI"] }).length).toBeGreaterThan(0);

    const hv = ref.navrh({ napeti: 12, rezim: "I", hodnota: 250, delka: 2, ubytekProc: 3, ulozeni: "par" });
    expect(porovnej(hv, { stav: "chyba", proud: 250, hlasky: ["HLAVNI_VEDENI"] })).toEqual([]);
    expect(porovnej(hv, { stav: "chyba", proud: 251, hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1);
    expect(porovnej(hv, { stav: "chyba", hlasky: ["HLAVNI_VEDENI"] })).toHaveLength(1); // chybí proud
    expect(porovnej(hv, { stav: "chyba", proud: 250, hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);
    const a120 = ref.navrh({ napeti: 24, rezim: "I", hodnota: 160, delka: 0.2, ubytekProc: 10, ulozeni: "motor" });
    expect(porovnej(a120, { stav: "chyba", proud: 160 + 1e-6, hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);
    expect(porovnej(a120, { stav: "chyba", hlasky: ["ANI_120_NESTACI"] })).toHaveLength(1);

    // Řádek tabulky.
    const r = ref.tabulka()[5]!;
    expect(porovnejRadek(r, structuredClone(r))).toEqual([]);
    const zmenyRadku: Partial<RadekTabulky>[] = [
      { prurez: 6 }, { awg: { oznaceni: "14", plocha: 2.08 } }, { awg: { oznaceni: "12", plocha: 3.3 } },
      { maxPojistka: { ...r.maxPojistka, par: 25 } }, { maxPojistka: { ...r.maxPojistka, kostra: 25 } },
      { maxPojistka: { ...r.maxPojistka, svazek: 25 } }, { maxPojistka: { ...r.maxPojistka, motor: 25 } },
      { delka3: r.delka3 + 2e-9 }, { delka10: r.delka10 - 2e-9 },
    ];
    for (const z of zmenyRadku) expect(porovnejRadek(r, { ...r, ...z }), JSON.stringify(z)).toHaveLength(1);
  });

  // Podvržená chyba výpočtu (typická záměna v1 → v2): mřížka ji musí odhalit.
  it("mřížka odhalí podvrženou chybu v každém parametru výpočtu", () => {
    const P = PARAMETRY_V2;
    const U = P.ulozeni;
    const mutanty: [string, ParametryV2][] = [
      ["ρ běžně 0,0175 (v1)", { ...P, ulozeni: { ...U, par: { ...U.par, rho: 0.0175 }, kostra: { ...U.kostra, rho: 0.0175 } } }],
      ["ρ teplé 0,0216 (v1)", { ...P, ulozeni: { ...U, svazek: { ...U.svazek, rho: 0.0216 }, motor: { ...U.motor, rho: 0.0216 } } }],
      ["svazek s ρ 0,0191", { ...P, ulozeni: { ...U, svazek: { ...U.svazek, rho: 0.0191 } } }],
      ["pojistka ≥ 1,1 × I (v1)", { ...P, faktorPojistky: 1.1 }],
      ["řada s 300 A (v1)", { ...P, fuses: FUSES_V1 }],
      ["par k = 1", { ...P, ulozeni: { ...U, par: { ...U.par, k: 1 } } }],
      ["kostra n = 2", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, n: 2 } } }],
      ["kostra k = 0,8", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, k: 0.8 } } }],
      ["svazek k = 0,7 (v1)", { ...P, ulozeni: { ...U, svazek: { ...U.svazek, k: 0.7 } } }],
      ["motor k = 0,53", { ...P, ulozeni: { ...U, motor: { ...U.motor, k: 0.53 } } }],
      ["par se stropem CAPH", { ...P, ulozeni: { ...U, par: { ...U.par, strop: CAPH } } }],
      ["kostra se stropem CAPH", { ...P, ulozeni: { ...U, kostra: { ...U.kostra, strop: CAPH } } }],
      // Pozn.: záměna stropu u svazku a motoru (CAPH ↔ CAPN) je nerozlišitelná: amp(a) × k je tam vždy
      // pod stropem (nebo vede na stejnou pojistku), viz ZPRAVA.md. Proto takový mutant v seznamu není.
      ["práh 150 A jako ≥", { ...P, prah12V: 149.999 }],
      ["práh měniče > 1000 W", { ...P, prahMenic: 1000.001 }],
    ];
    const vstupy = celaMrizka();
    for (const [nazev, param] of mutanty) {
      const m = vytvorReferenci(param);
      const najde = vstupy.some((v) => porovnej(ref.navrh(v), m.navrh(v)).length > 0);
      expect(najde, `mřížka neodhalí: ${nazev}`).toBe(true);
    }
  }, 300_000);
});

// ---------------------------------------------------------------------------
// 2. Golden test navrhVodice v2: celá mřížka.
// ---------------------------------------------------------------------------

describe("golden v2: navrhVodice proti referenci v2", () => {
  for (const k of kombinace()) {
    const nazev = `${k.napeti} V, režim ${k.rezim}, úbytek ${k.ubytekProc} %, uložení ${k.ulozeni}`;
    it(`mřížka proud × délka: ${nazev}`, () => overSadu(mrizka(k)));
    it(`hrany úbytku ±1e-9: ${nazev}`, () => overSadu(hranyUbytku(k)));
    // DOSLOVNÝ VÝKLAD bodu 3 (pořadí operací ρ × L × n × I / dU zleva doprava). Padá-li jen tato sada
    // o 1 ulp, jde o otázku pro Radka (ZPRAVA.md), ne nutně o chybu logiky.
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
    const act: RadekTabulky[] = referencniTabulka();
    expect(act).toHaveLength(exp.length);
    const chyby = exp.flatMap((e, i) => porovnejRadek(e, act[i]!).map((d) => `řádek ${i + 1} (${e.prurez} mm²): ${d}`));
    expect(chyby).toEqual([]);
  });
});

