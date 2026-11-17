// Testy obráceného režimu „Mám kabel“ (`mamKabel` z @caravanix/engine) podle docs/KALKULACKA_PRUREZU.md,
// oddíl „Obrácený režim „Mám kabel““, body 1–8.
//
// Psáno ze ZADÁNÍ, ne z kódu: kód enginu (packages/engine/src/) tester nečetl.
// Tabulky a funkce `MM`, `FUSES`, `maxFuse()` (přes `amp()`/`interp()`, `AMP`, `CAPN`, `CAPH`) se berou z nezávislé
// reference v1.1 (tests/golden-v11/reference-v11.ts = skript docs/reference/kalkulacka-prurezu-v1.html se změnami
// v1.1, řada FUSES bez 300 A). Očekávané hodnoty se počítají vzorci z bodů 2–6 zadání.
//
// Výsledek chyby podle konvence enginu (tests/kalkulacky-alfa.test.ts): { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole },
// `pole` = název vstupu. Spojitá čísla s absolutní tolerancí 1e-9.

import vm from "node:vm";
import { describe, expect, it } from "vitest";
import * as engine from "@caravanix/engine";
import { navrhVodice } from "@caravanix/engine";
import type { VstupVodice } from "../src/vodic.ts";
import { referenceV11 as ref } from "./golden-v11/reference-v11.ts";

type Napeti = 12 | 24;
type Ubytek = 3 | 5 | 10;
type Zpetny = 1 | 2;
type Prostredi = "n" | "h";
interface VstupMamKabel {
  napeti: Napeti;
  prurez: number;
  delka: number;
  ubytekProc: Ubytek;
  zpetny: Zpetny;
  prostredi: Prostredi;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Vysledek = any;

// Funkce se čte dynamicky, aby soubor šel načíst, i když ji engine (zatím) neexportuje.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mamKabel = (v: unknown): Vysledek => (engine as any).mamKabel(v);

const TOL = 1e-9;
const MAX_VYPIS = 15;

const MM = vm.runInContext("MM", ref.ctx) as number[];
const FUSES = vm.runInContext("FUSES", ref.ctx) as number[];
const maxFuse = vm.runInContext("maxFuse", ref.ctx) as (a: number, k: number) => number;

const NAPETI: Napeti[] = [12, 24];
const UBYTKY: Ubytek[] = [3, 5, 10];
const ZPETNE: Zpetny[] = [1, 2];
const PROSTREDI: Prostredi[] = ["n", "h"];
const DELKY = [0.1, 0.25, 0.5, 1, 2.5, 5, 7.3, 10, 20, 50, 100];

interface Ocekavano {
  maxPojistka: number;
  proudPodlePojistky: number;
  proudPodleUbytku: number;
  maxProud: number;
  maxPrikonW: number;
  rozhodlo: "ubytek" | "oteplen";
  hlasky: string[];
}

/** Body 2–7 zadání. */
function ocekavej(v: VstupMamKabel): Ocekavano {
  const svazek = v.prostredi === "h";
  const rho = svazek ? 0.0216 : 0.0175;
  const k = svazek ? 0.7 : 1;
  const n = v.zpetny;
  const maxPojistka = maxFuse(v.prurez, k);
  const proudPodlePojistky = maxPojistka / 1.25;
  const proudPodleUbytku = ((v.napeti * v.ubytekProc) / 100) * v.prurez / (rho * v.delka * n);
  const maxProud = Math.min(proudPodlePojistky, proudPodleUbytku);
  const rozhodlo = proudPodleUbytku < proudPodlePojistky ? "ubytek" : "oteplen";
  const hlasky = [rozhodlo === "ubytek" ? "ROZHODL_UBYTEK" : "ROZHODLO_OTEPLENI"];
  if (n === 1) hlasky.push("MINUS_PRES_KOSTRU");
  return {
    maxPojistka,
    proudPodlePojistky,
    proudPodleUbytku,
    maxProud,
    maxPrikonW: maxProud * v.napeti,
    rozhodlo,
    hlasky,
  };
}

function mrizka(): VstupMamKabel[] {
  const out: VstupMamKabel[] = [];
  for (const napeti of NAPETI)
    for (const prurez of MM)
      for (const ubytekProc of UBYTKY)
        for (const zpetny of ZPETNE)
          for (const prostredi of PROSTREDI)
            for (const delka of DELKY) out.push({ napeti, prurez, delka, ubytekProc, zpetny, prostredi });
  return out;
}

function popis(v: VstupMamKabel): string {
  return `${v.napeti} V, ${v.prurez} mm², L=${v.delka} m, ${v.ubytekProc} %, zpětný ${v.zpetny}, ${v.prostredi}`;
}

const CISLA = ["maxPojistka", "maxProud", "maxPrikonW", "proudPodlePojistky", "proudPodleUbytku"] as const;

/** Rozdíly výsledku proti očekávání. `sRozhodlo` = false u téměř shodných proudů (pořadí operací v plovoucí čárce). */
function porovnej(exp: Ocekavano, act: Vysledek, sRozhodlo = true): string[] {
  const d: string[] = [];
  if (act?.stav !== "ok") return [`stav ${JSON.stringify(act?.stav)} místo "ok" (${JSON.stringify(act)})`];
  for (const c of CISLA) {
    const a = act[c];
    if (typeof a !== "number" || !Number.isFinite(a) || Math.abs(a - exp[c]) > TOL)
      d.push(`${c}: čekáno ${exp[c]}, dostal ${a}`);
  }
  if (sRozhodlo) {
    if (act.rozhodlo !== exp.rozhodlo) d.push(`rozhodlo: čekáno ${exp.rozhodlo}, dostal ${act.rozhodlo}`);
    if (JSON.stringify(act.hlasky) !== JSON.stringify(exp.hlasky))
      d.push(`hlasky: čekáno ${JSON.stringify(exp.hlasky)}, dostal ${JSON.stringify(act.hlasky)}`);
  }
  return d;
}

function temerShoda(e: Ocekavano): boolean {
  return Math.abs(e.proudPodleUbytku - e.proudPodlePojistky) <= 1e-12 * e.proudPodlePojistky;
}

describe("mamKabel: reference v1.1", () => {
  it("reference: MM má 15 průřezů a FUSES je řada v1.1 bez 300 A", () => {
    expect(MM).toEqual([0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120]);
    expect(FUSES).not.toContain(300);
    expect(FUSES[FUSES.length - 1]).toBe(250);
  });

  it("engine exportuje funkci mamKabel", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(typeof (engine as any).mamKabel).toBe("function");
  });
});

describe("mamKabel: mřížka (12/24 V × 15 průřezů × 3/5/10 % × zpětný 1/2 × n/h × 11 délek 0,1–100 m)", () => {
  it("všechny body sedí na referenci (tolerance 1e-9)", () => {
    const vstupy = mrizka();
    expect(vstupy.length).toBe(2 * 15 * 3 * 2 * 2 * DELKY.length);
    const chyby: string[] = [];
    let pocet = 0;
    for (const v of vstupy) {
      const exp = ocekavej(v);
      const act = mamKabel({ ...v });
      const d = porovnej(exp, act, !temerShoda(exp));
      if (d.length) {
        pocet++;
        if (chyby.length < MAX_VYPIS) chyby.push(`[${popis(v)}] ${d.join("; ")}`);
      }
    }
    expect(chyby, `${pocet} z ${vstupy.length} bodů nesedí`).toEqual([]);
  });

  it("mřížka pokrývá obě rozhodnutí (ubytek i oteplen)", () => {
    const r = new Set(mrizka().map((v) => ocekavej(v).rozhodlo));
    expect([...r].sort()).toEqual(["oteplen", "ubytek"]);
  });

  it("ruční příklad: 12 V, 2,5 mm², 5 m, 3 %, zpětný 2, samostatně", () => {
    // maxFuse(2,5; 1) = min(32, 20) → 20 A; 20 / 1,25 = 16 A; úbytek 0,36 × 2,5 / (0,0175 × 5 × 2) = 5,142857… A.
    const r = mamKabel({ napeti: 12, prurez: 2.5, delka: 5, ubytekProc: 3, zpetny: 2, prostredi: "n" });
    expect(r.stav).toBe("ok");
    expect(r.maxPojistka).toBe(20);
    expect(r.proudPodlePojistky).toBeCloseTo(16, 9);
    expect(r.proudPodleUbytku).toBeCloseTo(0.9 / 0.175, 9);
    expect(r.maxProud).toBeCloseTo(0.9 / 0.175, 9);
    expect(r.maxPrikonW).toBeCloseTo((12 * 0.9) / 0.175, 9);
    expect(r.rozhodlo).toBe("ubytek");
    expect(r.hlasky).toEqual(["ROZHODL_UBYTEK"]);
  });
});

describe("mamKabel: hrany", () => {
  // 12 V, 3 %, zpětný 1, ve svazku, 0,75 mm²: maxFuse(0,75; 0,7) = 10 A → 8 A;
  // úbytek 0,36 × 0,75 / (0,0216 × L × 1) = 8 A přesně pro L = 1,5625 m (v plovoucí čárce přesně).
  const shoda: VstupMamKabel = { napeti: 12, prurez: 0.75, delka: 1.5625, ubytekProc: 3, zpetny: 1, prostredi: "h" };

  it("shoda obou proudů → rozhodlo oteplen (bod 6: ubytek jen při ostře menším)", () => {
    const e = ocekavej(shoda);
    expect(e.proudPodleUbytku).toBe(e.proudPodlePojistky); // kontrola testu: hrana je přesná
    const r = mamKabel(shoda);
    expect(porovnej(e, r)).toEqual([]);
    expect(r.rozhodlo).toBe("oteplen");
    expect(r.hlasky).toEqual(["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU"]);
    expect(r.maxProud).toBeCloseTo(8, 9);
    expect(r.maxPrikonW).toBeCloseTo(96, 9);
  });

  it("těsně delší kabel → ubytek, těsně kratší → oteplen", () => {
    const delsi = mamKabel({ ...shoda, delka: 1.5626 });
    expect(delsi.rozhodlo).toBe("ubytek");
    expect(delsi.hlasky).toEqual(["ROZHODL_UBYTEK", "MINUS_PRES_KOSTRU"]);
    const kratsi = mamKabel({ ...shoda, delka: 1.5624 });
    expect(kratsi.rozhodlo).toBe("oteplen");
    expect(kratsi.maxProud).toBeCloseTo(8, 9);
  });

  it("hranice délky 0,1 a 100 m platí", () => {
    for (const delka of [0.1, 100]) {
      const v: VstupMamKabel = { napeti: 24, prurez: 120, delka, ubytekProc: 10, zpetny: 2, prostredi: "n" };
      expect(porovnej(ocekavej(v), mamKabel(v)), `delka ${delka}`).toEqual([]);
    }
  });

  it("120 mm² krátce: max. pojistka 250 A (ne 300 A), proud 200 A", () => {
    const r = mamKabel({ napeti: 24, prurez: 120, delka: 0.1, ubytekProc: 10, zpetny: 2, prostredi: "n" });
    expect(r.maxPojistka).toBe(250);
    expect(r.maxProud).toBeCloseTo(200, 9);
    expect(r.rozhodlo).toBe("oteplen");
  });
});

describe("mamKabel: neplatné vstupy → NEPLATNY_VSTUP s polem", () => {
  const zaklad: VstupMamKabel = { napeti: 12, prurez: 2.5, delka: 5, ubytekProc: 3, zpetny: 2, prostredi: "n" };
  const pripady: [string, Record<string, unknown>][] = [
    ["prurez", { prurez: 3 }],
    ["prurez", { prurez: 0 }],
    ["prurez", { prurez: -2.5 }],
    ["prurez", { prurez: 150 }],
    ["prurez", { prurez: Number.NaN }],
    ["prurez", { prurez: "2.5" }],
    ["delka", { delka: 0 }],
    ["delka", { delka: -1 }],
    ["delka", { delka: 0.09 }],
    ["delka", { delka: 100.0001 }],
    ["delka", { delka: Number.NaN }],
    ["delka", { delka: Number.POSITIVE_INFINITY }],
    ["napeti", { napeti: 48 }],
    ["napeti", { napeti: Number.NaN }],
    ["ubytekProc", { ubytekProc: 4 }],
    ["zpetny", { zpetny: 3 }],
    ["prostredi", { prostredi: "x" }],
  ];
  for (const [pole, zmena] of pripady) {
    it(`${pole} = ${String(Object.values(zmena)[0])} → chyba (pole ${pole})`, () => {
      let r: Vysledek;
      expect(() => (r = mamKabel({ ...zaklad, ...zmena }))).not.toThrow();
      expect(r?.stav, JSON.stringify(r)).toBe("chyba");
      expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
      expect(r.pole).toBe(pole);
    });
  }
});

describe("mamKabel: konzistence s navrhVodice v1.1", () => {
  it("proud těsně pod maxProud → navrhVodice (režim proud) vrátí průřez ≤ zadanému", () => {
    const chyby: string[] = [];
    let pocet = 0;
    const vstupy = mrizka();
    for (const v of vstupy) {
      const r = mamKabel({ ...v });
      const maxProud = typeof r?.maxProud === "number" ? r.maxProud : ocekavej(v).maxProud;
      const I = maxProud * (1 - 1e-9);
      const vstup: VstupVodice = {
        napeti: v.napeti,
        rezim: "I",
        hodnota: I,
        delka: v.delka,
        ubytekProc: v.ubytekProc,
        zpetny: v.zpetny,
        prostredi: v.prostredi,
      } as VstupVodice;
      const n = navrhVodice(vstup);
      const ok = n.stav === "ok" && n.prurez <= v.prurez;
      if (!ok) {
        pocet++;
        if (chyby.length < MAX_VYPIS)
          chyby.push(`[${popis(v)}] I=${I}: navrhVodice → ${JSON.stringify(n.stav === "ok" ? n.prurez : n)}`);
      }
    }
    expect(chyby, `${pocet} z ${vstupy.length} bodů nekonzistentních`).toEqual([]);
  });
});
