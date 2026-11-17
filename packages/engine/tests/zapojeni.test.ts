// Akceptační testy průvodce zapojením (navrhZapojeni) podle docs/KALKULACKY_ALFA.md, kapitola H
// (Radek 17. 11. 2026). Psáno ze ZADÁNÍ; z kódu převzata jen jména id komponent a kabelů,
// která zadání nevyjmenovává (panel, regulator, startovaci, booster, sit, nabijecka, baterie,
// rozvod, menic; kabely „od-do“), a tvar projektu z @caravanix/data.
//
// Obecná pravidla zadání (úvod KALKULACKY_ALFA.md): chyba = { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole },
// žádná výjimka, u seznamů pole ve tvaru `spotrebice[2].prikonW`. Čísla s tolerancí 1e-9.

import { describe, expect, it } from "vitest";
import { navrhMenice, navrhSchematu, navrhZapojeni } from "../src/index.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const zap = (v: unknown): Any => (navrhZapojeni as (x: unknown) => Any)(v);
const TOL = 1e-9;

const spotrebic = (id: string, prikonW: number, ubytekProc: 3 | 5 | 10 = 5, rezimy: string[] = ["den", "noc"]) => ({
  id,
  typ: "zasuvka",
  nazev: id,
  prikonW,
  ubytekProc,
  rezimy,
});

const ZAKLAD = {
  napeti: 12,
  baterieAh: 100,
  solarWp: 0,
  boosterA: 0,
  nabijeckaA: 0,
  menicW: 0,
  spotrebice: [] as Any[],
};
const s = (zmena: Record<string, unknown>) => ({ ...ZAKLAD, ...zmena });

const TYPICKA = s({
  solarWp: 200,
  boosterA: 30,
  nabijeckaA: 20,
  menicW: 1000,
  spotrebice: [
    spotrebic("lednice", 60, 3, ["den", "noc", "jizda", "kemp"]),
    spotrebic("svetla", 20, 10, ["noc"]),
    spotrebic("cerpadlo", 50, 5, ["den"]),
  ],
});

const kabel = (r: Any, id: string) => r.projekt.kabely.find((k: Any) => k.id === id);
const komp = (r: Any, id: string) => r.projekt.komponenty.find((k: Any) => k.id === id);
const ok = (r: Any) => {
  expect(r.stav, JSON.stringify(r)).toBe("ok");
  return r;
};
const chyba = (v: unknown, pole?: string) => {
  let r: Any;
  expect(() => (r = zap(v))).not.toThrow();
  expect(r.stav).toBe("chyba");
  expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
  expect(typeof r.pole).toBe("string");
  if (pole !== undefined) expect(r.pole).toBe(pole);
};

// ---------------------------------------------------------------------------------------------
describe("H1 vstupy a rozsahy", () => {
  it("prázdný, undefined, null vstup → NEPLATNY_VSTUP bez výjimky", () => {
    chyba(undefined);
    chyba(null);
    chyba({});
  });

  it("napeti jen 12 nebo 24", () => {
    ok(zap(s({ napeti: 12 })));
    ok(zap(s({ napeti: 24 })));
    for (const n of [0, 48, 13, Number.NaN, "12"]) chyba(s({ napeti: n }), "napeti");
  });

  it("baterieAh 10–2000", () => {
    ok(zap(s({ baterieAh: 10 })));
    ok(zap(s({ baterieAh: 2000 })));
    for (const v of [0, 9.99, 2000.01, -100, Number.NaN, Infinity, "100", null]) chyba(s({ baterieAh: v }), "baterieAh");
  });

  const nulaNebo: [string, number, number][] = [
    ["solarWp", 10, 3000],
    ["boosterA", 5, 100],
    ["nabijeckaA", 2, 100],
    ["menicW", 50, 5000],
  ];
  for (const [pole, min, max] of nulaNebo) {
    it(`${pole} 0 nebo ${min}–${max}`, () => {
      ok(zap(s({ [pole]: 0 })));
      ok(zap(s({ [pole]: min })));
      ok(zap(s({ [pole]: max })));
      for (const v of [min - 0.01, max + 0.01, 0.5, -1, Number.NaN, Infinity, "10", undefined]) chyba(s({ [pole]: v }), pole);
    });
  }

  it("spotrebice: nejvýš 8", () => {
    const osm = Array.from({ length: 8 }, (_, i) => spotrebic(`s${i}`, 10));
    ok(zap(s({ spotrebice: osm })));
    chyba(s({ spotrebice: [...osm, spotrebic("s8", 10)] }));
  });

  it("spotrebice: jedinečné id", () => {
    chyba(s({ spotrebice: [spotrebic("a", 10), spotrebic("a", 20)] }));
  });

  it("spotrebice: prikonW 0,1–3000, pole ve tvaru spotrebice[i].prikonW", () => {
    ok(zap(s({ spotrebice: [spotrebic("a", 0.1)] })));
    ok(zap(s({ spotrebice: [spotrebic("a", 3000)] })));
    for (const v of [0, 0.09, 3000.01, -5, Number.NaN, "60"]) {
      chyba(s({ spotrebice: [spotrebic("a", 10), spotrebic("b", v as number)] }), "spotrebice[1].prikonW");
    }
  });

  it("spotrebice: ubytekProc jen 3 / 5 / 10", () => {
    for (const u of [3, 5, 10]) ok(zap(s({ spotrebice: [spotrebic("a", 10, u as 3)] })));
    for (const u of [0, 4, 7.5, Number.NaN]) chyba(s({ spotrebice: [spotrebic("a", 10, u as 3)] }), "spotrebice[0].ubytekProc");
  });

  it("spotrebice není pole → chyba", () => {
    chyba(s({ spotrebice: "lednice" }), "spotrebice");
    chyba(s({ spotrebice: null }), "spotrebice");
  });

  it("delky 0,1–100 m", () => {
    ok(zap(s({ solarWp: 200, delky: { "regulator-baterie": 0.1 } })));
    ok(zap(s({ solarWp: 200, delky: { "regulator-baterie": 100 } })));
    for (const v of [0, 0.09, 100.01, -1, Number.NaN, "2"]) chyba(s({ solarWp: 200, delky: { "regulator-baterie": v } }));
  });
});

// ---------------------------------------------------------------------------------------------
describe("H2 solár a řada regulátorů", () => {
  const reg = (napeti: number, wp: number) => ok(zap(s({ napeti, solarWp: wp })));

  it("bez soláru: regulatorA a proudSolaruA null, žádné solární kabely", () => {
    const r = reg(12, 0);
    expect(r.regulatorA).toBeNull();
    expect(r.proudSolaruA).toBeNull();
    expect(kabel(r, "regulator-baterie")).toBeUndefined();
    expect(r.projekt.kabely.some((k: Any) => k.druh === "solar")).toBe(false);
  });

  it("proud z panelů = Wp / 12,8 V (12 V) a / 25,6 V (24 V)", () => {
    expect(reg(12, 200).proudSolaruA).toBeCloseTo(200 / 12.8, 9);
    expect(reg(24, 200).proudSolaruA).toBeCloseTo(200 / 25.6, 9);
  });

  it("12 V hranice řady: 128 Wp = přesně 10 A → 10; těsně nad → 15", () => {
    expect(reg(12, 10).regulatorA).toBe(10);
    expect(reg(12, 128).regulatorA).toBe(10);
    expect(reg(12, 128.01).regulatorA).toBe(15);
    expect(reg(12, 129).regulatorA).toBe(15);
  });

  it("12 V: každý stupeň řady přesně na hranici a těsně nad", () => {
    const rada = [10, 15, 20, 30, 40, 50, 60, 70, 85, 100];
    for (let i = 0; i < rada.length; i++) {
      expect(reg(12, rada[i] * 12.8).regulatorA, `${rada[i]} A`).toBe(rada[i]);
      if (i + 1 < rada.length) expect(reg(12, rada[i] * 12.8 + 0.5).regulatorA, `nad ${rada[i]} A`).toBe(rada[i + 1]);
    }
  });

  it("12 V: 1280 Wp = 100 A bez hlášky; nad 1280 Wp → 100 A + REGULATOR_NAD_100A", () => {
    const r100 = reg(12, 1280);
    expect(r100.regulatorA).toBe(100);
    expect(r100.hlasky).not.toContain("REGULATOR_NAD_100A");
    for (const wp of [1281, 3000]) {
      const r = reg(12, wp);
      expect(r.regulatorA).toBe(100);
      expect(r.hlasky).toContain("REGULATOR_NAD_100A");
      expect(kabel(r, "regulator-baterie").proudA).toBe(100);
    }
  });

  it("24 V: 256 Wp → 10; 257 → 15; 2560 → 100 bez hlášky; 2561 → hláška", () => {
    expect(reg(24, 256).regulatorA).toBe(10);
    expect(reg(24, 257).regulatorA).toBe(15);
    const r = reg(24, 2560);
    expect(r.regulatorA).toBe(100);
    expect(r.hlasky).not.toContain("REGULATOR_NAD_100A");
    const r2 = reg(24, 2561);
    expect(r2.regulatorA).toBe(100);
    expect(r2.hlasky).toContain("REGULATOR_NAD_100A");
  });

  it("kabel regulátor → baterie: jmenovitý proud regulátoru, 3 %, den; panel → regulátor druh solar", () => {
    const r = reg(12, 200);
    const k = kabel(r, "regulator-baterie");
    expect(k).toMatchObject({ od: "regulator", do: "baterie", proudA: 20, ubytekProc: 3, rezimy: ["den"] });
    expect(k.druh).toBeUndefined();
    const p = r.projekt.kabely.filter((x: Any) => x.druh === "solar");
    expect(p).toHaveLength(1);
    expect(p[0]).toMatchObject({ od: "panel", do: "regulator" });
  });
});

// ---------------------------------------------------------------------------------------------
describe("H3 booster", () => {
  it("startovací → booster = boosterA × 1,1; booster → baterie = boosterA; 3 %, jízda (12 i 24 V)", () => {
    for (const napeti of [12, 24]) {
      const r = ok(zap(s({ napeti, boosterA: 30 })));
      const vstup = kabel(r, "startovaci-booster");
      const vystup = kabel(r, "booster-baterie");
      expect(vstup.proudA).toBeCloseTo(33, 9);
      expect(vstup).toMatchObject({ od: "startovaci", do: "booster", ubytekProc: 3, rezimy: ["jizda"] });
      expect(vystup).toMatchObject({ od: "booster", do: "baterie", proudA: 30, ubytekProc: 3, rezimy: ["jizda"] });
    }
  });

  it("hranice 5 A a 100 A", () => {
    expect(kabel(ok(zap(s({ boosterA: 5 }))), "startovaci-booster").proudA).toBeCloseTo(5.5, 9);
    expect(kabel(ok(zap(s({ boosterA: 100 }))), "startovaci-booster").proudA).toBeCloseTo(110, 9);
  });

  it("bez boosteru žádné jeho kabely ani komponenty", () => {
    const r = ok(zap(ZAKLAD));
    expect(kabel(r, "booster-baterie")).toBeUndefined();
    expect(komp(r, "booster")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------------------------
describe("H4 nabíječka", () => {
  it("nabíječka → baterie = nabijeckaA, 3 %, kemp; přívod 230 V druh ac", () => {
    const r = ok(zap(s({ nabijeckaA: 20 })));
    expect(kabel(r, "nabijecka-baterie")).toMatchObject({ od: "nabijecka", do: "baterie", proudA: 20, ubytekProc: 3, rezimy: ["kemp"] });
    const ac = r.projekt.kabely.filter((k: Any) => k.druh === "ac");
    expect(ac).toHaveLength(1);
    expect(ac[0].do).toBe("nabijecka");
  });
});

// ---------------------------------------------------------------------------------------------
describe("H5 spotřebiče a hlavní vedení", () => {
  it("každý spotřebič svým kabelem ze skříňky s vlastním příkonem, úbytkem a režimy", () => {
    const r = ok(zap(TYPICKA));
    for (const sp of TYPICKA.spotrebice as Any[]) {
      const k = r.projekt.kabely.find((x: Any) => x.do === sp.id);
      expect(k, sp.id).toBeDefined();
      expect(k).toMatchObject({ od: "rozvod", prikonW: sp.prikonW, ubytekProc: sp.ubytekProc, rezimy: sp.rezimy });
    }
  });

  it("hlavní vedení baterie → skříňka = součet příkonů všech spotřebičů, 3 %", () => {
    const r = ok(zap(TYPICKA));
    const k = kabel(r, "baterie-rozvod");
    expect(k).toMatchObject({ od: "baterie", do: "rozvod", ubytekProc: 3 });
    expect(k.prikonW).toBeCloseTo(130, 9);
  });

  it("součet i s desetinnými příkony (0,1 + 0,2)", () => {
    const r = ok(zap(s({ spotrebice: [spotrebic("a", 0.1), spotrebic("b", 0.2)] })));
    expect(Math.abs(kabel(r, "baterie-rozvod").prikonW - 0.3)).toBeLessThan(TOL);
  });

  it("8 × 3000 W se sečte (24 000 W) bez chyby vstupu", () => {
    const osm = Array.from({ length: 8 }, (_, i) => spotrebic(`s${i}`, 3000));
    const r = ok(zap(s({ spotrebice: osm })));
    expect(kabel(r, "baterie-rozvod").prikonW).toBe(24000);
  });

  it("bez spotřebičů není skříňka ani hlavní vedení", () => {
    const r = ok(zap(ZAKLAD));
    expect(kabel(r, "baterie-rozvod")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------------------------
describe("H6 měnič", () => {
  const menic = (napeti: 12 | 24, menicW: number) => {
    const r = ok(zap(s({ napeti, menicW })));
    const m = (navrhMenice as (x: unknown) => Any)({ napeti, ucinnostMenice: 0.9, spotrebice: [{ prikonW: menicW }] });
    return { r, m };
  };

  it("proud = navrhMenice (12 i 24 V, různé výkony)", () => {
    for (const napeti of [12, 24] as const) {
      for (const w of [50, 1000, 2000, 5000]) {
        const { r, m } = menic(napeti, w);
        expect(r.proudMeniceA).toBeCloseTo(m.proudZBaterie, 9);
        expect(r.proudMeniceA).toBeCloseTo(w / 0.9 / (napeti === 12 ? 12.8 : 25.6), 9);
        expect(kabel(r, "baterie-menic").proudA).toBeCloseTo(m.proudZBaterie, 9);
      }
    }
  });

  it("kabel přímo z baterie, režimy den, noc, kemp", () => {
    const { r } = menic(12, 1000);
    const k = kabel(r, "baterie-menic");
    expect(k).toMatchObject({ od: "baterie", do: "menic" });
    expect([...k.rezimy].sort()).toEqual(["den", "kemp", "noc"]);
  });

  it("hláška MENIC_NAD_150A jen nad 150 A (12 V: 1728 W = 150 A bez hlášky)", () => {
    expect(menic(12, 1728).r.hlasky).not.toContain("MENIC_NAD_150A");
    expect(menic(12, 1729).r.hlasky).toContain("MENIC_NAD_150A");
    expect(menic(24, 3456).r.hlasky).not.toContain("MENIC_NAD_150A");
    expect(menic(24, 3457).r.hlasky).toContain("MENIC_NAD_150A");
    expect(menic(12, 5000).r.hlasky).toContain("MENIC_NAD_150A");
  });

  it("bez měniče proudMeniceA null", () => {
    const r = ok(zap(ZAKLAD));
    expect(r.proudMeniceA).toBeNull();
    expect(kabel(r, "baterie-menic")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------------------------
describe("H7 výchozí délky a převzetí delky/nazvy", () => {
  it("výchozí délky podle zadání", () => {
    const r = ok(zap(TYPICKA));
    const ocek: Record<string, number> = {
      "regulator-baterie": 1.5,
      "startovaci-booster": 4,
      "booster-baterie": 1,
      "nabijecka-baterie": 1,
      "baterie-rozvod": 0.5,
      "baterie-menic": 1,
    };
    for (const [id, d] of Object.entries(ocek)) expect(kabel(r, id).delkaM, id).toBe(d);
    for (const sp of TYPICKA.spotrebice as Any[]) {
      expect(r.projekt.kabely.find((x: Any) => x.do === sp.id).delkaM, sp.id).toBe(3);
    }
  });

  it("delky z vstupu se převezmou (i pro spotřebič), ostatní zůstanou výchozí", () => {
    const r = ok(zap({ ...TYPICKA, delky: { "regulator-baterie": 2.5, "baterie-menic": 0.1, "rozvod-lednice": 7 } }));
    expect(kabel(r, "regulator-baterie").delkaM).toBe(2.5);
    expect(kabel(r, "baterie-menic").delkaM).toBe(0.1);
    expect(r.projekt.kabely.find((x: Any) => x.do === "lednice").delkaM).toBe(7);
    expect(kabel(r, "booster-baterie").delkaM).toBe(1);
  });

  it("nazvy z vstupu se převezmou do komponent", () => {
    const r = ok(zap({ ...TYPICKA, nazvy: { baterie: "Trakční LiFePO4", menic: "Měnič 1000 W" } }));
    expect(komp(r, "baterie").nazev).toBe("Trakční LiFePO4");
    expect(komp(r, "menic").nazev).toBe("Měnič 1000 W");
  });
});

// ---------------------------------------------------------------------------------------------
describe("H8 rozložení", () => {
  it("zdroje vlevo, každý svým řádkem; baterie 3. sloupec uprostřed; skříňka a měnič 4.; spotřebiče 5.", () => {
    const r = ok(zap(TYPICKA));
    const k = r.projekt.komponenty;
    const zdroje = ["panel", "startovaci", "sit"].map((id) => komp(r, id));
    for (const z of zdroje) expect(z.sloupec).toBe(0);
    expect(new Set(zdroje.map((z) => z.radek)).size).toBe(3);
    for (const id of ["regulator", "booster", "nabijecka"]) expect(komp(r, id).sloupec).toBeLessThan(2);
    const bat = komp(r, "baterie");
    expect(bat.sloupec).toBe(2);
    const radky = k.map((x: Any) => x.radek);
    const min = Math.min(...radky);
    const max = Math.max(...radky);
    expect(Math.abs(bat.radek - (min + max) / 2)).toBeLessThanOrEqual(0.5);
    expect(komp(r, "rozvod").sloupec).toBe(3);
    expect(komp(r, "menic").sloupec).toBe(3);
    const sp = (TYPICKA.spotrebice as Any[]).map((x) => komp(r, x.id));
    for (const x of sp) expect(x.sloupec).toBe(4);
    expect(new Set(sp.map((x) => x.radek)).size).toBe(sp.length);
  });

  it("žádné dvě komponenty na stejném místě (8 spotřebičů, všechny zdroje)", () => {
    const osm = Array.from({ length: 8 }, (_, i) => spotrebic(`s${i}`, 10));
    const r = ok(zap({ ...TYPICKA, spotrebice: osm }));
    const mista = r.projekt.komponenty.map((x: Any) => `${x.sloupec}:${x.radek}`);
    expect(new Set(mista).size).toBe(mista.length);
    expect(komp(r, "baterie").sloupec).toBe(2);
  });
});

// ---------------------------------------------------------------------------------------------
describe("H9 výstup a navrhSchematu", () => {
  it("tvar výstupu", () => {
    const r = ok(zap(TYPICKA));
    expect(r).toHaveProperty("projekt");
    expect(r.projekt.napeti).toBe(12);
    expect(Array.isArray(r.hlasky)).toBe(true);
    expect(r.regulatorA).toBe(20);
    expect(r.proudSolaruA).toBeCloseTo(200 / 12.8, 9);
    expect(r.proudMeniceA).toBeCloseTo(1000 / 0.9 / 12.8, 9);
    expect(r.hlasky).toEqual([]);
  });

  it("každý kabel kromě solar/ac má v projektu délku a buď proud, nebo příkon", () => {
    const r = ok(zap(TYPICKA));
    for (const k of r.projekt.kabely) {
      if (k.druh) continue;
      expect(typeof k.delkaM, k.id).toBe("number");
      expect(typeof (k.proudA ?? k.prikonW), k.id).toBe("number");
    }
  });

  for (const napeti of [12, 24]) {
    it(`navrhSchematu: typická sestava ${napeti} V – každý počítaný kabel ok, solar/ac vysledek null`, () => {
      const r = ok(zap({ ...TYPICKA, napeti }));
      const sch = navrhSchematu(r.projekt);
      expect(sch).toHaveLength(r.projekt.kabely.length);
      const solarAc = sch.filter((k: Any) => k.druh === "solar" || k.druh === "ac");
      expect(solarAc).toHaveLength(2);
      for (const k of sch) {
        if (k.druh === "solar" || k.druh === "ac") {
          expect(k.vysledek, k.id).toBeNull();
        } else {
          expect(k.vysledek?.stav, `${k.id}: ${JSON.stringify(k.vysledek)}`).toBe("ok");
        }
      }
    });
  }
});
