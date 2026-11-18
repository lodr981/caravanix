// Akceptační testy úplného zapojení (navrhZapojeni s uplne: true, navrhSchematu) podle docs/KALKULACKY_ALFA.md,
// kapitola K (Radek 18. 11. 2026). Psáno ze ZADÁNÍ; z kódu převzata jen id komponent a kabelů z kapitoly H
// a jména typů prvků (hlavni-pojistka, vypinac, bocnik, odpojovac-fv, chranic-jistic, prepinac) z @caravanix/data.

import { describe, expect, it } from "vitest";
import { FUSES, POMER_POJISTKY, navrhSchematu, navrhZapojeni } from "../src/index.ts";

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

const ZAKLAD = { napeti: 12, baterieAh: 100, solarWp: 0, boosterA: 0, nabijeckaA: 0, menicW: 0, spotrebice: [] as Any[] };
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
const MALA = s({ solarWp: 100, spotrebice: [spotrebic("lednice", 60, 3)] });

const kabel = (r: Any, id: string) => r.projekt.kabely.find((k: Any) => k.id === id);
const komp = (r: Any, id: string) => r.projekt.komponenty.find((k: Any) => k.id === id);
const ids = (r: Any) => r.projekt.kabely.map((k: Any) => k.id).sort();
const ok = (r: Any) => {
  expect(r.stav, JSON.stringify(r)).toBe("ok");
  return r;
};
const uplne = (v: Record<string, unknown>) => ok(zap({ ...v, uplne: true }));
const sch = (r: Any, id: string) => navrhSchematu(r.projekt).find((k) => k.id === id) as Any;

const PREJMENOVANI: [string, string, string, string, string][] = [
  ["regulator-baterie", "regulator-sbernice", "regulator", "sbernice", "do"],
  ["booster-baterie", "booster-sbernice", "booster", "sbernice", "do"],
  ["nabijecka-baterie", "nabijecka-sbernice", "nabijecka", "sbernice", "do"],
  ["baterie-rozvod", "sbernice-rozvod", "sbernice", "rozvod", "od"],
  ["baterie-menic", "sbernice-menic", "sbernice", "menic", "od"],
];

// ---------------------------------------------------------------------------------------------
describe("K1 přípojnice, přejmenování kabelů a pojistkaU", () => {
  it("přípojnice sbernice typu sbernice existuje", () => {
    const r = uplne(TYPICKA);
    expect(komp(r, "sbernice")?.typ).toBe("sbernice");
    expect(r.projekt.komponenty.filter((c: Any) => c.id === "sbernice")).toHaveLength(1);
  });

  it("kabely k baterii se přejmenují na kabely k přípojnici s pojistkaU, proud i délka se přebírají", () => {
    const puvodni = ok(zap(TYPICKA));
    const r = uplne(TYPICKA);
    for (const [stary, novy, od, do_, poj] of PREJMENOVANI) {
      expect(kabel(r, stary), stary).toBeUndefined();
      const k = kabel(r, novy);
      expect(k, novy).toBeDefined();
      expect(k.od).toBe(od);
      expect(k.do).toBe(do_);
      expect(k.pojistkaU).toBe(poj);
      const p = kabel(puvodni, stary);
      expect(k.delkaM).toBe(p.delkaM);
      expect(k.proudA).toEqual(p.proudA);
      expect(k.prikonW).toEqual(p.prikonW);
    }
  });

  it("vstup boosteru startovaci-booster má pojistku na obou koncích", () => {
    const r = uplne(TYPICKA);
    expect(kabel(r, "startovaci-booster").pojistkaU).toBe("obe");
    expect(sch(r, "startovaci-booster").pojistkaU).toBe("obe");
  });

  it("žádný kabel nevede přímo do baterie kromě hlavního vedení", () => {
    const r = uplne(TYPICKA);
    const kBaterii = r.projekt.kabely.filter((k: Any) => k.od === "baterie" || k.do === "baterie").map((k: Any) => k.id);
    expect(kBaterii).toEqual(["baterie-sbernice"]);
  });

  it("každý kabel vede mezi existujícími komponentami a id kabelů jsou jedinečná", () => {
    for (const v of [TYPICKA, MALA, ZAKLAD, s({ menicW: 500 })]) {
      const r = uplne(v);
      const komponenty = new Set(r.projekt.komponenty.map((c: Any) => c.id));
      for (const k of r.projekt.kabely) {
        expect(komponenty.has(k.od), `${k.id}.od`).toBe(true);
        expect(komponenty.has(k.do), `${k.id}.do`).toBe(true);
      }
      expect(new Set(ids(r)).size).toBe(r.projekt.kabely.length);
    }
  });
});

// ---------------------------------------------------------------------------------------------
describe("K2 hlavní vedení baterie-sbernice", () => {
  it("proud = hlavniProudA, délka 0,5 m, pojistkaU zadna, prvky hlavní pojistka, vypínač, bočník", () => {
    const r = uplne(TYPICKA);
    const k = kabel(r, "baterie-sbernice");
    expect(k.od).toBe("baterie");
    expect(k.do).toBe("sbernice");
    expect(k.proudA).toBeCloseTo(r.hlavniProudA, 9);
    expect(k.delkaM).toBe(0.5);
    expect(k.pojistkaU).toBe("zadna");
    const ocekavana = FUSES.find((f) => f >= r.hlavniProudA * POMER_POJISTKY);
    expect(r.hlavniPojistkaA).toBe(ocekavana);
    expect(k.prvky).toEqual([{ typ: "hlavni-pojistka", hodnotaA: ocekavana }, { typ: "vypinac" }, { typ: "bocnik" }]);
  });

  it("hlavniProudA = max(odběr, nabíjení) typické sestavy", () => {
    const r = uplne(TYPICKA);
    const p = ok(zap(TYPICKA));
    const proud = (id: string) => {
      const k = kabel(p, id);
      return k?.proudA ?? (k?.prikonW !== undefined ? k.prikonW / 12 : 0);
    };
    const odber = proud("baterie-rozvod") + proud("baterie-menic");
    const nabijeni = proud("regulator-baterie") + proud("booster-baterie") + proud("nabijecka-baterie");
    expect(Math.abs(r.hlavniProudA - Math.max(odber, nabijeni))).toBeLessThan(TOL);
  });

  it("proud nad řadou → hlavniPojistkaA null a hlavní pojistka bez hodnotaA", () => {
    const r = uplne(s({ menicW: 5000 }));
    expect(r.hlavniPojistkaA).toBeNull();
    const k = kabel(r, "baterie-sbernice");
    expect(k.prvky).toHaveLength(3);
    expect(k.prvky[0].typ).toBe("hlavni-pojistka");
    expect("hodnotaA" in k.prvky[0]).toBe(false);
    expect(k.prvky.slice(1)).toEqual([{ typ: "vypinac" }, { typ: "bocnik" }]);
  });

  it("navrhSchematu: hlavní vedení zadna a prvky v pořadí", () => {
    const r = uplne(TYPICKA);
    const k = sch(r, "baterie-sbernice");
    expect(k.pojistkaU).toBe("zadna");
    expect(k.prvky.map((p: Any) => p.typ)).toEqual(["hlavni-pojistka", "vypinac", "bocnik"]);
  });

  it("délka hlavního vedení se dá přepsat přes delky", () => {
    const r = uplne({ ...TYPICKA, delky: { "baterie-sbernice": 1.2 } });
    expect(kabel(r, "baterie-sbernice").delkaM).toBe(1.2);
  });

  it("prázdná sestava (nic připojeno) nespadne, hlavní vedení s proudem 0", () => {
    let r: Any;
    expect(() => (r = zap({ ...ZAKLAD, uplne: true }))).not.toThrow();
    ok(r);
    expect(r.hlavniProudA).toBe(0);
    expect(kabel(r, "baterie-sbernice").proudA).toBe(0);
  });
});

// ---------------------------------------------------------------------------------------------
describe("K3 prvky v cestě: odpojovač FV, chránič, zásuvky 230 V a přepínač", () => {
  it("panel-regulator má odpojovač FV, sit-nabijecka chránič s jističem", () => {
    const r = uplne(TYPICKA);
    expect(kabel(r, "panel-regulator").prvky).toEqual([{ typ: "odpojovac-fv" }]);
    expect(kabel(r, "sit-nabijecka").prvky).toEqual([{ typ: "chranic-jistic" }]);
    expect(sch(r, "panel-regulator").prvky).toEqual([{ typ: "odpojovac-fv" }]);
    expect(sch(r, "sit-nabijecka").prvky).toEqual([{ typ: "chranic-jistic" }]);
  });

  it("měnič s přípojkou: zásuvky 230 V a kabel menic-zasuvky230 (ac) s přepínačem", () => {
    const r = uplne(TYPICKA);
    expect(komp(r, "zasuvky230")).toBeDefined();
    const k = kabel(r, "menic-zasuvky230");
    expect(k.od).toBe("menic");
    expect(k.do).toBe("zasuvky230");
    expect(k.druh).toBe("ac");
    expect(k.prvky).toEqual([{ typ: "prepinac" }]);
  });

  it("měnič bez přípojky: zásuvky 230 V bez přepínače", () => {
    const r = uplne(s({ menicW: 1000, solarWp: 200 }));
    const k = kabel(r, "menic-zasuvky230");
    expect(k.druh).toBe("ac");
    expect(k.prvky ?? []).toEqual([]);
    expect(sch(r, "menic-zasuvky230").prvky).toEqual([]);
  });

  it("zasuvky230: false → bez zásuvek 230 V i kabelu", () => {
    const r = uplne({ ...TYPICKA, zasuvky230: false });
    expect(komp(r, "zasuvky230")).toBeUndefined();
    expect(kabel(r, "menic-zasuvky230")).toBeUndefined();
  });

  it("bez měniče žádné zásuvky 230 V ani při zasuvky230: true", () => {
    for (const v of [s({ nabijeckaA: 20 }), { ...s({ nabijeckaA: 20 }), zasuvky230: true }]) {
      const r = uplne(v);
      expect(komp(r, "zasuvky230")).toBeUndefined();
      expect(kabel(r, "menic-zasuvky230")).toBeUndefined();
    }
  });

  it("bez soláru a bez přípojky nejsou odpojovač ani chránič", () => {
    const r = uplne(s({ menicW: 500 }));
    expect(kabel(r, "panel-regulator")).toBeUndefined();
    expect(kabel(r, "sit-nabijecka")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------------------------
describe("K1 délky: převzetí z původních kabelů a přepis pod novým id", () => {
  it("délka zadaná pod starým id se převezme", () => {
    const r = uplne({ ...TYPICKA, delky: { "regulator-baterie": 2.2, "baterie-menic": 1.7 } });
    expect(kabel(r, "regulator-sbernice").delkaM).toBe(2.2);
    expect(kabel(r, "sbernice-menic").delkaM).toBe(1.7);
  });

  it("délka pod novým id přepíše výchozí i starou", () => {
    const r = uplne({
      ...TYPICKA,
      delky: { "regulator-baterie": 2.2, "regulator-sbernice": 3.3, "booster-sbernice": 0.8, "nabijecka-sbernice": 2, "sbernice-rozvod": 0.4, "sbernice-menic": 1.1 },
    });
    expect(kabel(r, "regulator-sbernice").delkaM).toBe(3.3);
    expect(kabel(r, "booster-sbernice").delkaM).toBe(0.8);
    expect(kabel(r, "nabijecka-sbernice").delkaM).toBe(2);
    expect(kabel(r, "sbernice-rozvod").delkaM).toBe(0.4);
    expect(kabel(r, "sbernice-menic").delkaM).toBe(1.1);
  });

  it("neplatná délka pod novým id → NEPLATNY_VSTUP", () => {
    for (const d of [0, -1, 1000, Number.NaN]) {
      const r = zap({ ...TYPICKA, uplne: true, delky: { "regulator-sbernice": d } });
      expect(r.stav).toBe("chyba");
      expect(r.pole).toBe("delky.regulator-sbernice");
    }
  });
});

// ---------------------------------------------------------------------------------------------
describe("K4 rozložení", () => {
  const poloha = (r: Any, id: string) => {
    const c = komp(r, id);
    expect(c, id).toBeDefined();
    return [c.sloupec, c.radek];
  };

  it("plná sestava: sloupce a řádky podle bodu 4", () => {
    const r = uplne(TYPICKA);
    // 1: regulátor, booster, nabíječka a pod nimi baterie.
    expect(poloha(r, "regulator")).toEqual([1, 0]);
    expect(poloha(r, "booster")).toEqual([1, 1]);
    expect(poloha(r, "nabijecka")).toEqual([1, 2]);
    expect(poloha(r, "baterie")).toEqual([1, 3]);
    // 0: zdroje v řádku svého měniče.
    expect(poloha(r, "panel")).toEqual([0, 0]);
    expect(poloha(r, "startovaci")).toEqual([0, 1]);
    expect(poloha(r, "sit")).toEqual([0, 2]);
    // 2: přípojnice uprostřed.
    const vsechny = r.projekt.komponenty.map((c: Any) => c.radek);
    const max = Math.max(...vsechny);
    const [sl, rd] = poloha(r, "sbernice");
    expect(sl).toBe(2);
    expect([Math.floor(max / 2), Math.ceil(max / 2)]).toContain(rd);
    // 3: skříňka a měnič, každý jiný řádek.
    expect(poloha(r, "rozvod")[0]).toBe(3);
    expect(poloha(r, "menic")[0]).toBe(3);
    expect(komp(r, "rozvod").radek).not.toBe(komp(r, "menic").radek);
    // 4: spotřebiče a zásuvky 230 V, každý svým řádkem.
    const vpravo = ["lednice", "svetla", "cerpadlo", "zasuvky230"].map((id) => poloha(r, id));
    for (const [sl4] of vpravo) expect(sl4).toBe(4);
    expect(new Set(vpravo.map(([, rr]) => rr)).size).toBe(4);
  });

  it("žádné dvě komponenty na stejném místě (plná i malá sestava)", () => {
    for (const v of [TYPICKA, MALA, s({ boosterA: 20, menicW: 800 }), s({ nabijeckaA: 10, spotrebice: [spotrebic("a", 10), spotrebic("b", 10)] })]) {
      const r = uplne(v);
      const mista = r.projekt.komponenty.map((c: Any) => `${c.sloupec}:${c.radek}`);
      expect(new Set(mista).size, JSON.stringify(mista)).toBe(mista.length);
      for (const c of r.projekt.komponenty) {
        expect(Number.isInteger(c.sloupec) && c.sloupec >= 0 && c.sloupec <= 4, c.id).toBe(true);
        expect(Number.isInteger(c.radek) && c.radek >= 0, c.id).toBe(true);
      }
    }
  });

  it("malá sestava (solár + 1 spotřebič): panel 0, regulátor a pod ním baterie 1, přípojnice 2, skříňka 3, spotřebič 4", () => {
    const r = uplne(MALA);
    expect(poloha(r, "panel")).toEqual([0, 0]);
    expect(poloha(r, "regulator")).toEqual([1, 0]);
    expect(poloha(r, "baterie")).toEqual([1, 1]);
    expect(poloha(r, "sbernice")[0]).toBe(2);
    expect(poloha(r, "rozvod")[0]).toBe(3);
    expect(poloha(r, "lednice")[0]).toBe(4);
    expect(komp(r, "zasuvky230")).toBeUndefined();
  });

  it("jen přípojka: síť v řádku nabíječky", () => {
    const r = uplne(s({ nabijeckaA: 10, menicW: 500 }));
    expect(poloha(r, "nabijecka")).toEqual([1, 0]);
    expect(poloha(r, "sit")).toEqual([0, 0]);
    expect(poloha(r, "baterie")).toEqual([1, 1]);
    expect(poloha(r, "zasuvky230")[0]).toBe(4);
  });
});

// ---------------------------------------------------------------------------------------------
describe("K5 navrhSchematu: pojistkaU a prvky", () => {
  it("pojistkaU přejmenovaných kabelů prochází do schématu", () => {
    const r = uplne(TYPICKA);
    for (const [, novy, , , poj] of PREJMENOVANI) expect(sch(r, novy).pojistkaU, novy).toBe(poj);
  });

  it("výchozí pojistkaU od a prvky [] u kabelu bez nich (okruhy spotřebičů)", () => {
    const r = uplne(TYPICKA);
    for (const id of ["rozvod-lednice", "rozvod-svetla", "rozvod-cerpadlo"]) {
      expect(sch(r, id).pojistkaU).toBe("od");
      expect(sch(r, id).prvky).toEqual([]);
    }
  });

  it("solární a AC kabely mají pojistkaU zadna", () => {
    const r = uplne(TYPICKA);
    for (const id of ["panel-regulator", "sit-nabijecka", "menic-zasuvky230"]) {
      expect(sch(r, id).druh, id).not.toBeNull();
      expect(sch(r, id).pojistkaU, id).toBe("zadna");
    }
  });

  it("bez uplne: všechny DC kabely od, solární a AC zadna, prvky []", () => {
    const r = ok(zap(TYPICKA));
    for (const k of navrhSchematu(r.projekt) as Any[]) {
      expect(k.pojistkaU, k.id).toBe(k.druh === null ? "od" : "zadna");
      expect(k.prvky, k.id).toEqual([]);
    }
  });

  it("typická sestava: každý počítaný kabel má stav ok", () => {
    const r = uplne(TYPICKA);
    const pocitane = (navrhSchematu(r.projekt) as Any[]).filter((k) => k.druh === null);
    expect(pocitane.length).toBeGreaterThanOrEqual(9);
    for (const k of pocitane) expect(k.vysledek?.stav, `${k.id}: ${JSON.stringify(k.vysledek)}`).toBe("ok");
  });

  it("typická sestava 24 V: každý počítaný kabel má stav ok", () => {
    const r = uplne({ ...TYPICKA, napeti: 24 });
    for (const k of (navrhSchematu(r.projekt) as Any[]).filter((x) => x.druh === null))
      expect(k.vysledek?.stav, `${k.id}: ${JSON.stringify(k.vysledek)}`).toBe("ok");
  });
});

// ---------------------------------------------------------------------------------------------
describe("K6 výstupy a zpětná kompatibilita", () => {
  const VARIANTY = [
    TYPICKA,
    MALA,
    { ...TYPICKA, napeti: 24, napetiVozu: 12 },
    { ...TYPICKA, privodNaPojistky: true, maxProudBmsA: 50, maxNabijeciA: 40 },
    s({ menicW: 5000 }),
  ];

  it("hlavniProudA, hlavniPojistkaA, nadBms, nadNabijeci se s uplne nemění", () => {
    for (const v of VARIANTY) {
      const a = ok(zap(v));
      const b = uplne(v);
      for (const pole of ["hlavniProudA", "hlavniPojistkaA", "nadBms", "nadNabijeci", "regulatorA", "proudSolaruA", "proudMeniceA", "hlasky"])
        expect(b[pole], pole).toEqual(a[pole]);
    }
  });

  it("nadBms a nadNabijeci se počítají z původních kabelů i při uplne", () => {
    const r = uplne({ ...TYPICKA, maxProudBmsA: 50, maxNabijeciA: 40 });
    expect(r.nadBms).toBe(true);
    expect(r.nadNabijeci).toBe(true);
  });

  it("bez uplne (i uplne: false) je výsledek beze změny: žádná přípojnice, pojistkaU, prvky ani zásuvky", () => {
    for (const v of VARIANTY) {
      const a = ok(zap(v));
      const b = ok(zap({ ...v, uplne: false }));
      expect(b).toEqual(a);
      expect(komp(a, "sbernice")).toBeUndefined();
      expect(komp(a, "zasuvky230")).toBeUndefined();
      expect(kabel(a, "baterie-sbernice")).toBeUndefined();
      for (const k of a.projekt.kabely) {
        expect(k.pojistkaU, k.id).toBeUndefined();
        expect(k.prvky, k.id).toBeUndefined();
        expect(k.id.includes("sbernice"), k.id).toBe(false);
      }
    }
  });

  it("bez uplne zůstávají kabely kapitoly H", () => {
    const a = ok(zap(TYPICKA));
    expect(ids(a)).toEqual(
      [
        "panel-regulator",
        "regulator-baterie",
        "startovaci-booster",
        "booster-baterie",
        "sit-nabijecka",
        "nabijecka-baterie",
        "baterie-rozvod",
        "rozvod-lednice",
        "rozvod-svetla",
        "rozvod-cerpadlo",
        "baterie-menic",
      ].sort(),
    );
  });

  it("zasuvky230 bez uplne nic nepřidá", () => {
    const a = ok(zap({ ...TYPICKA, zasuvky230: true }));
    expect(a).toEqual(ok(zap(TYPICKA)));
  });

  it("uplne s neplatným vstupem vrací chybu, ne výjimku", () => {
    for (const v of [{ uplne: true }, { ...TYPICKA, uplne: true, napeti: 48 }, { ...TYPICKA, uplne: true, menicW: -1 }]) {
      let r: Any;
      expect(() => (r = zap(v))).not.toThrow();
      expect(r.stav).toBe("chyba");
      expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
    }
  });
});
