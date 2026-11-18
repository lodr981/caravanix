// Testy doporučení výrobců (`prurezPodleVyrobce`, `navrhSVyrobcem`, `zkontrolujDoporuceni`) podle
// docs/KALKULACKA_PRUREZU.md, oddíl „Doporučení výrobce“, body 1–2, a karet docs/karty/K-VYROBCE-*.md.
// `maxFuse` a řada `MM` se berou z nezávislé reference v1.1 (tests/golden-v11/reference-v11.ts).

import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { doporuceniVyrobcu, type DoporuceniVyrobce } from "@caravanix/data";
import { navrhSVyrobcem, navrhVodice, prurezPodleVyrobce, zkontrolujDoporuceni } from "../src/index.ts";
import type { VstupVodice } from "../src/vodic.ts";
import { referenceV11 as ref } from "./golden-v11/reference-v11.ts";

const MM = vm.runInContext("MM", ref.ctx) as number[];
const maxFuse = vm.runInContext("maxFuse", ref.ctx) as (a: number, k: number) => number;

const polozka = (id: string): DoporuceniVyrobce => {
  const p = doporuceniVyrobcu.polozky.find((x) => x.id === id);
  if (!p) throw new Error(`v datech chybí ${id}`);
  return p;
};
const SECOP = polozka("secop-bd35f-bd50f");
const LILIE = polozka("lilie");
const SMART_1600 = polozka("victron-smart-12-1600");
const SMART_2000 = polozka("victron-smart-12-2000");
const ORION = polozka("victron-orion-12-12-30");
const TRUMA = polozka("truma-varioheat");

const vstup = (v: Partial<VstupVodice>): VstupVodice => ({
  napeti: 12,
  rezim: "P",
  hodnota: 60,
  delka: 5,
  ubytekProc: 3,
  zpetny: 2,
  prostredi: "n",
  ...v,
});

const prurez = (r: ReturnType<typeof prurezPodleVyrobce>) => (r.stav === "ok" ? r.prurez : r.stav);

describe("prurezPodleVyrobce – hranice řádků (Secop, délka jedné cesty)", () => {
  it.each([
    [12, 0.1, 2.5],
    [12, 2.5, 2.5],
    [12, 2.51, 4],
    [12, 4, 4],
    [12, 4.01, 6],
    [12, 6, 6],
    [12, 6.01, 10],
    [12, 10, 10],
    [24, 5, 2.5],
    [24, 5.01, 4],
    [24, 8, 4],
    [24, 8.01, 6],
    [24, 12, 6],
    [24, 12.01, 10],
    [24, 20, 10],
  ] as const)("%i V, %f m → %f mm²", (u, d, mm) => {
    expect(prurez(prurezPodleVyrobce(SECOP, u, d, 2))).toBe(mm);
  });

  it("délka jedné cesty se u Secopu nenásobí počtem vodičů (kostra i vlastní mínus)", () => {
    expect(prurezPodleVyrobce(SECOP, 12, 5, 1)).toMatchObject({ stav: "ok", prurez: 6, delkaTabulkyM: 5 });
    expect(prurezPodleVyrobce(SECOP, 12, 5, 2)).toMatchObject({ stav: "ok", prurez: 6, delkaTabulkyM: 5 });
  });

  it("těsně nad poslední řádek → mimo-tabulku s mezí a pojistkou výrobce", () => {
    expect(prurezPodleVyrobce(SECOP, 12, 10.01, 2)).toEqual({ stav: "mimo-tabulku", delkaTabulkyM: 10.01, maxDelkaM: 10, pojistkaA: 15 });
    expect(prurezPodleVyrobce(SECOP, 24, 20.01, 2)).toMatchObject({ stav: "mimo-tabulku", maxDelkaM: 20 });
  });

  it("výsledek ok nese pojistku výrobce 12 V", () => {
    expect(prurezPodleVyrobce(SECOP, 12, 3, 2)).toEqual({ stav: "ok", prurez: 4, delkaTabulkyM: 3, maxDelkaM: 10, pojistkaA: 15 });
  });
});

describe("prurezPodleVyrobce – bez-tabulky (ošklivé vstupy)", () => {
  it("24 V u čerpadla Lilie (tabulka jen pro 12 V)", () => {
    expect(prurezPodleVyrobce(LILIE, 24, 5, 2)).toEqual({ stav: "bez-tabulky" });
  });
  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])("délka %f", (d) => {
    expect(prurezPodleVyrobce(SECOP, 12, d, 2)).toEqual({ stav: "bez-tabulky" });
  });
  it("prázdná tabulka", () => {
    const p: DoporuceniVyrobce = { ...SECOP, tabulky: { "12": [] } };
    expect(prurezPodleVyrobce(p, 12, 1, 2)).toEqual({ stav: "bez-tabulky" });
  });
});

describe("prurezPodleVyrobce – celková délka × počet vodičů (čerpadlo Lilie)", () => {
  it.each([
    [3.75, 2, 7.5, 1.5],
    [3.76, 2, 7.52, 2.5],
    [7.5, 1, 7.5, 1.5],
    [7.6, 1, 7.6, 2.5],
    [10, 2, 20, 2.5],
    [10, 1, 10, 2.5],
    [15, 2, 30, 4],
    [20, 1, 20, 2.5],
    [30, 1, 30, 4],
  ] as const)("jedna cesta %f m, zpětný %i → tabulka %f m → %f mm²", (d, z, dt, mm) => {
    const r = prurezPodleVyrobce(LILIE, 12, d, z);
    expect(r.stav).toBe("ok");
    if (r.stav === "ok") {
      expect(r.delkaTabulkyM).toBeCloseTo(dt, 9);
      expect(r.prurez).toBe(mm);
    }
  });
  it("15,01 m s vlastním mínusem = 30,02 m celkem → mimo-tabulku", () => {
    const r = prurezPodleVyrobce(LILIE, 12, 15.01, 2);
    expect(r).toMatchObject({ stav: "mimo-tabulku", maxDelkaM: 30, pojistkaA: null });
    if (r.stav === "mimo-tabulku") expect(r.delkaTabulkyM).toBeCloseTo(30.02, 9);
  });
});

describe("prurezPodleVyrobce – minPrurez a pořadí řádků", () => {
  const p: DoporuceniVyrobce = {
    id: "test-min",
    skupina: "cerpadlo",
    nazev: "test",
    karta: "K-TEST",
    tabulky: { "12": [{ prurez: 6, maxDelkaM: 30 }, { prurez: 1.5, maxDelkaM: 5 }, { prurez: 2.5, maxDelkaM: 10 }] },
    delka: "jedna",
    pojistkaA: null,
    minPrurez: 2.5,
  } as DoporuceniVyrobce;
  it("krátká trasa → ne menší než minPrurez", () => {
    expect(prurezPodleVyrobce(p, 12, 1, 2)).toMatchObject({ stav: "ok", prurez: 2.5 });
  });
  it("bez minPrurez → nejmenší vyhovující řádek i v neseřazené tabulce", () => {
    const q = { ...p, minPrurez: undefined };
    expect(prurezPodleVyrobce(q, 12, 1, 2)).toMatchObject({ stav: "ok", prurez: 1.5 });
    expect(prurezPodleVyrobce(q, 12, 11, 2)).toMatchObject({ stav: "ok", prurez: 6, maxDelkaM: 30 });
  });
});

describe("navrhSVyrobcem", () => {
  it("příklad z rešerše: lednice 60 W, 12 V, 5 m, 3 %, vlastní mínus, samostatně", () => {
    const r = navrhSVyrobcem(vstup({}), SECOP);
    expect(r.vypocet).toMatchObject({ stav: "ok", prurez: 2.5, pojistka: 7.5 });
    expect(r.vyrobce).toMatchObject({ stav: "ok", prurez: 6 });
    expect(r.prurez).toBe(6);
    expect(r.rozhodlVyrobce).toBe(true);
    expect(r.pojistka).toBe(15);
    expect(r.pojistkaNadKabel).toBe(false);
  });

  it("výpočet je vždy shodný s navrhVodice (v1.1 se nemění)", () => {
    const v = vstup({ hodnota: 40, rezim: "I", delka: 1 });
    expect(navrhSVyrobcem(v, SECOP).vypocet).toEqual(navrhVodice(v));
  });

  it("rozhodne výpočet: 40 A na 1 m, Secop chce 2,5 mm² → výsledek z výpočtu, rozhodlVyrobce false", () => {
    const v = vstup({ rezim: "I", hodnota: 40, delka: 1 });
    const vyp = navrhVodice(v);
    const r = navrhSVyrobcem(v, SECOP);
    expect(vyp.stav).toBe("ok");
    if (vyp.stav !== "ok") return;
    expect(vyp.prurez).toBeGreaterThan(2.5);
    expect(r.prurez).toBe(vyp.prurez);
    expect(r.rozhodlVyrobce).toBe(false);
    expect(r.pojistka).toBe(Math.max(vyp.pojistka, 15));
  });

  it("stejný průřez výpočtu i výrobce → rozhodlVyrobce false", () => {
    // Smart 12/1600 při 1 600 W, 2 m: výpočet 70 mm², výrobce 70 mm².
    const r = navrhSVyrobcem(vstup({ hodnota: 1600, delka: 2 }), SMART_1600);
    expect(r.vypocet).toMatchObject({ stav: "ok", prurez: 70 });
    expect(r.prurez).toBe(70);
    expect(r.rozhodlVyrobce).toBe(false);
  });

  it("pojistka výrobce menší než z výpočtu → platí výpočet (Truma 10 A, proud 20 A)", () => {
    const r = navrhSVyrobcem(vstup({ rezim: "I", hodnota: 20, delka: 2 }), TRUMA);
    expect(r.vypocet).toMatchObject({ stav: "ok", pojistka: 25 });
    expect(r.pojistka).toBe(25);
    expect(r.pojistkaNadKabel).toBe(false);
  });

  it("měnič Smart 12/2000 s pojistkou výrobce 300 A → pojistkaNadKabel, pojistka z výpočtu", () => {
    const r = navrhSVyrobcem(vstup({ hodnota: 2000, delka: 2 }), SMART_2000);
    expect(r.vypocet.stav).toBe("ok");
    if (r.vypocet.stav !== "ok") return;
    expect(r.prurez).toBe(Math.max(r.vypocet.prurez, 70));
    expect(maxFuse(r.prurez!, 1)).toBeLessThan(300);
    expect(r.pojistkaNadKabel).toBe(true);
    expect(r.pojistka).toBe(r.vypocet.pojistka);
  });

  it("měnič Smart 12/1600: 70 mm² nesnese 250 A v řadě v1.1 → pojistkaNadKabel", () => {
    const r = navrhSVyrobcem(vstup({ hodnota: 1600, delka: 2 }), SMART_1600);
    expect(maxFuse(70, 1)).toBeLessThan(250);
    expect(r.pojistkaNadKabel).toBe(true);
    expect(r.pojistka).toBe(175);
  });

  it("mimo tabulku (Smart 12/2000 na 6 m) → průřez z výpočtu, pojistka výrobce se stále hlídá", () => {
    const r = navrhSVyrobcem(vstup({ hodnota: 2000, delka: 6 }), SMART_2000);
    expect(r.vyrobce).toMatchObject({ stav: "mimo-tabulku", maxDelkaM: 5, pojistkaA: 300 });
    if (r.vypocet.stav === "ok") expect(r.prurez).toBe(r.vypocet.prurez);
    expect(r.rozhodlVyrobce).toBe(false);
  });

  it("bez tabulky (24 V u čerpadla) → čistý výpočet", () => {
    const v = vstup({ napeti: 24, rezim: "I", hodnota: 5, delka: 3 });
    const r = navrhSVyrobcem(v, LILIE);
    const vyp = navrhVodice(v);
    expect(r.vyrobce).toEqual({ stav: "bez-tabulky" });
    if (vyp.stav === "ok") {
      expect(r.prurez).toBe(vyp.prurez);
      expect(r.pojistka).toBe(vyp.pojistka);
    }
    expect(r.rozhodlVyrobce).toBe(false);
    expect(r.pojistkaNadKabel).toBe(false);
  });

  it("čerpadlo Lilie 5 A, 5 m, vlastní mínus → 10 m celkem → 2,5 mm²", () => {
    const r = navrhSVyrobcem(vstup({ rezim: "I", hodnota: 5, delka: 5, ubytekProc: 10 }), LILIE);
    expect(r.vyrobce).toMatchObject({ stav: "ok", prurez: 2.5, delkaTabulkyM: 10 });
    expect(r.prurez).toBe(2.5);
  });

  it("prostředí h: booster Orion 30 A, 2 m – 10 mm² ve svazku nesnese 60 A", () => {
    const n = navrhSVyrobcem(vstup({ rezim: "I", hodnota: 30, delka: 2 }), ORION);
    expect(n.prurez).toBe(10);
    expect(n.pojistka).toBe(60);
    expect(n.pojistkaNadKabel).toBe(false);
    const h = navrhSVyrobcem(vstup({ rezim: "I", hodnota: 30, delka: 2, prostredi: "h" }), ORION);
    expect(maxFuse(10, 0.7)).toBeLessThan(60);
    expect(h.prurez).toBe(10);
    expect(h.pojistkaNadKabel).toBe(true);
    expect(h.vypocet.stav === "ok" && h.pojistka).toBe(h.vypocet.stav === "ok" && h.vypocet.pojistka);
  });

  it.each([0, -5, Number.NaN])("neplatná hodnota %f → prurez, pojistka, úbytek a maxPojistka null", (x) => {
    const r = navrhSVyrobcem(vstup({ hodnota: x }), SECOP);
    expect(r.vypocet.stav).toBe("chyba");
    expect(r).toMatchObject({ prurez: null, pojistka: null, rozhodlVyrobce: false, pojistkaNadKabel: false, ubytekV: null, ubytekProc: null, maxPojistka: null });
  });

  it("bod 4: lednice 60 W, 5 m → úbytek na 6 mm² = 0,35 V × 2,5 ÷ 6, maxPojistka = maxFuse(6, 1)", () => {
    const r = navrhSVyrobcem(vstup({}), SECOP);
    expect(r.ubytekV).toBeCloseTo((0.35 * 2.5) / 6, 9);
    expect(r.ubytekProc).toBeCloseTo((((0.35 * 2.5) / 6) / 12) * 100, 9);
    expect(r.maxPojistka).toBe(maxFuse(6, 1));
  });

  const pripady: [string, VstupVodice, DoporuceniVyrobce][] = [
    ["Secop 40 A 1 m (rozhodl výpočet)", vstup({ rezim: "I", hodnota: 40, delka: 1 }), SECOP],
    ["Secop 24 V 60 W 10 m", vstup({ napeti: 24, delka: 10 }), SECOP],
    ["Smart 12/2000 2 m", vstup({ hodnota: 2000, delka: 2 }), SMART_2000],
    ["Orion 30 A 2 m ve svazku", vstup({ rezim: "I", hodnota: 30, delka: 2, prostredi: "h" }), ORION],
    ["Lilie 24 V (bez tabulky)", vstup({ napeti: 24, rezim: "I", hodnota: 5, delka: 3 }), LILIE],
    ["Lilie 5 A 12 m kostra 10 %", vstup({ rezim: "I", hodnota: 5, delka: 12, zpetny: 1, ubytekProc: 10 }), LILIE],
  ];
  it.each(pripady)("bod 4 obecně: %s", (_, v, p) => {
    const r = navrhSVyrobcem(v, p);
    expect(r.vypocet.stav).toBe("ok");
    if (r.vypocet.stav !== "ok" || r.prurez === null) return;
    const k = v.prostredi === "h" ? 0.7 : 1;
    expect(r.ubytekV).toBeCloseTo((r.vypocet.ubytekV * r.vypocet.prurez) / r.prurez, 9);
    expect(r.ubytekProc).toBeCloseTo((r.vypocet.ubytekProc * r.vypocet.prurez) / r.prurez, 9);
    expect(r.maxPojistka).toBe(maxFuse(r.prurez, k));
    if (r.prurez === r.vypocet.prurez) {
      expect(r.ubytekV).toBeCloseTo(r.vypocet.ubytekV, 9);
      expect(r.maxPojistka).toBe(r.vypocet.maxPojistka);
    }
  });
});

describe("zkontrolujDoporuceni a data", () => {
  it("všechny položky dat projdou bez chyb", () => {
    expect(doporuceniVyrobcu.polozky.length).toBeGreaterThan(0);
    expect(zkontrolujDoporuceni(doporuceniVyrobcu.polozky)).toEqual([]);
  });
  it("všechny průřezy jsou z řady MM reference, délky kladné, id jedinečná", () => {
    for (const p of doporuceniVyrobcu.polozky)
      for (const tab of Object.values(p.tabulky))
        for (const r of tab ?? []) {
          expect(MM, p.id).toContain(r.prurez);
          expect(r.maxDelkaM, p.id).toBeGreaterThan(0);
        }
    const ids = doporuceniVyrobcu.polozky.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("ošklivá data: průřez mimo řadu, nulová a NaN délka → chyby", () => {
    const zle = { ...SECOP, id: "zle", tabulky: { "12": [{ prurez: 3, maxDelkaM: 1 }, { prurez: 4, maxDelkaM: 0 }], "24": [{ prurez: 6, maxDelkaM: Number.NaN }] } };
    expect(zkontrolujDoporuceni([zle as DoporuceniVyrobce])).toHaveLength(3);
    expect(zkontrolujDoporuceni([])).toEqual([]);
  });

  it("Secop odpovídá kartě K-VYROBCE-0001 (12 V 2,5/4/6/10 m, 24 V dvojnásobek, pojistka 15 A)", () => {
    expect(SECOP.karta).toBe("K-VYROBCE-0001");
    expect(SECOP.delka).toBe("jedna");
    expect(SECOP.tabulky["12"]).toEqual([
      { prurez: 2.5, maxDelkaM: 2.5 },
      { prurez: 4, maxDelkaM: 4 },
      { prurez: 6, maxDelkaM: 6 },
      { prurez: 10, maxDelkaM: 10 },
    ]);
    expect(SECOP.tabulky["24"]).toEqual(SECOP.tabulky["12"]!.map((r) => ({ prurez: r.prurez, maxDelkaM: 2 * r.maxDelkaM })));
    expect(SECOP.pojistkaA?.["12"]).toBe(15);
  });
  it("Secop 24 V: karta K-VYROBCE-0001 uvádí pojistku 15 A i pro 24 V", () => {
    expect(SECOP.pojistkaA?.["24"]).toBe(15);
  });
  it("Lilie odpovídá kartě K-VYROBCE-0006 (celková délka 7,5/20/30 m, min. 1,5 mm²)", () => {
    expect(LILIE.karta).toBe("K-VYROBCE-0006");
    expect(LILIE.delka).toBe("celkova");
    expect(LILIE.minPrurez).toBe(1.5);
    expect(LILIE.tabulky["12"]).toEqual([
      { prurez: 1.5, maxDelkaM: 7.5 },
      { prurez: 2.5, maxDelkaM: 20 },
      { prurez: 4, maxDelkaM: 30 },
    ]);
    expect(LILIE.tabulky["24"]).toBeUndefined();
  });
  it("Victron Smart odpovídá kartě K-VYROBCE-0102 (70 mm² do 5 m; 250 A / 300 A)", () => {
    expect(SMART_1600.karta).toBe("K-VYROBCE-0102");
    expect(SMART_1600.tabulky["12"]).toEqual([{ prurez: 70, maxDelkaM: 5 }]);
    expect(SMART_1600.pojistkaA).toEqual({ "12": 250 });
    expect(SMART_2000.tabulky["12"]).toEqual([{ prurez: 70, maxDelkaM: 5 }]);
    expect(SMART_2000.pojistkaA).toEqual({ "12": 300 });
  });
});
