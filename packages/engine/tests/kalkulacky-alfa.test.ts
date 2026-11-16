// Akceptační testy kalkulaček alfy A–G podle docs/KALKULACKY_ALFA.md (zadání 16. 11. 2026).
//
// Psáno ze ZADÁNÍ, ne z kódu: kód enginu (packages/engine/src/) tester nečetl a typy enginu nepoužívá.
// Ruční příklady s postupem: tests/priklady/kalkulacky-alfa.md (čísla P-A1, P-B1, … odpovídají názvům testů).
//
// „DOSLOVNÝ VÝKLAD (Qn)“ = místo, kde zadání není jednoznačné; test drží doslovný výklad a otázka Qn
// je v docs/testy/ZPRAVA.md, oddíl „Kalkulačky alfy – otázky pro mistra“.
//
// Obecná pravidla zadání, která test hlídá všude:
// - výsledek { stav: "ok", …, hlasky: string[] } nebo { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole };
// - NEPLATNY_VSTUP, když vstup není konečné číslo nebo je mimo rozsah; `pole` = název vstupu
//   (u seznamů `polozky[2].prikonW`);
// - žádná funkce nevyhazuje výjimku;
// - spojitá čísla s absolutní tolerancí 1e-9.
// Pořadí hlášek zadání neurčuje, test je porovnává jako množinu (Q10).

import { describe, expect, it } from "vitest";
import {
  bilanceSpotrebicu,
  jmenoviteNapeti,
  kolikUvarim,
  nabitiZJizdy,
  navrhMenice,
  ohrevVody,
  potrebnaBaterie,
  sobestacnost,
  vydrzBaterie,
  zapojeniPanelu,
} from "@caravanix/engine";

// ---------------------------------------------------------------------------------------------
// Pomůcky
// ---------------------------------------------------------------------------------------------

// Výsledky čteme volně podle jmen ze zadání, nezávisle na typech enginu.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Vysledek = any;
type Fn = (vstup: unknown, data?: unknown) => Vysledek;

const TOL = 1e-9;
const EPS = 1e-6; // „těsně za hranou“
const SMAZAT = Symbol("smazat");

function volej(fn: unknown, vstup: unknown, data?: unknown): Vysledek {
  let r: Vysledek;
  expect(() => {
    r = data === undefined ? (fn as Fn)(vstup) : (fn as Fn)(vstup, data);
  }, "funkce nesmí vyhodit výjimku").not.toThrow();
  return r;
}

function jeOk(r: Vysledek, hlasky: string[] = []): void {
  expect(r?.stav, `čekám stav ok: ${JSON.stringify(r)}`).toBe("ok");
  expect(Array.isArray(r.hlasky), "hlasky je pole").toBe(true);
  expect([...r.hlasky].sort(), "hlášky (jako množina)").toEqual([...hlasky].sort());
}

function jeChyba(r: Vysledek, pole: string): void {
  expect(r?.stav, `čekám stav chyba (pole ${pole}): ${JSON.stringify(r)}`).toBe("chyba");
  expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
  expect(r.pole).toBe(pole);
}

function cislo(skutecne: unknown, ocekavane: number, co: string): void {
  expect(typeof skutecne, `${co} je číslo`).toBe("number");
  expect(
    Math.abs((skutecne as number) - ocekavane),
    `${co}: ${String(skutecne)} ≠ ${ocekavane}`,
  ).toBeLessThanOrEqual(TOL);
}

function cisla(r: Vysledek, ocekavane: Record<string, number>, predpona = ""): void {
  for (const [k, v] of Object.entries(ocekavane)) cislo(r?.[k], v, predpona + k);
}

/** Hluboká kopie vstupu s jednou změněnou (nebo smazanou) hodnotou na cestě `a.b[2].c`. */
function nastav<T>(zaklad: T, cesta: string, hodnota: unknown): T {
  const kopie = structuredClone(zaklad) as Vysledek;
  const casti = cesta.match(/[^.[\]]+/g) ?? [];
  let o = kopie;
  for (let i = 0; i < casti.length - 1; i++) o = o[casti[i] as string];
  const posledni = casti[casti.length - 1] as string;
  if (hodnota === SMAZAT) delete o[posledni];
  else o[posledni] = hodnota;
  return kopie as T;
}

/** Všechna čísla ve výsledku jsou konečná (výsledek nikdy neukáže nesmysl). */
function vsechnaKonecna(x: unknown, cesta = "výsledek"): void {
  if (typeof x === "number") expect(Number.isFinite(x), `${cesta} = ${x} není konečné`).toBe(true);
  else if (Array.isArray(x)) x.forEach((y, i) => vsechnaKonecna(y, `${cesta}[${i}]`));
  else if (x !== null && typeof x === "object")
    for (const [k, v] of Object.entries(x)) vsechnaKonecna(v, `${cesta}.${k}`);
}

interface Rozsah {
  cesta: string;
  min: number;
  max: number;
  /** Vstup bez výchozí hodnoty: chybějící → NEPLATNY_VSTUP. */
  povinne?: boolean;
}

/** Hrany rozsahu (na hraně platné, těsně za ní chyba se správným `pole`) a neplatná čísla. */
function testyRozsahu(nazev: string, volat: (v: unknown) => Vysledek, zaklad: unknown, rozsahy: Rozsah[]): void {
  describe(`${nazev}: hrany rozsahů a neplatné vstupy`, () => {
    it("základní vstup je platný", () => {
      expect(volat(zaklad)?.stav).toBe("ok");
    });
    for (const r of rozsahy) {
      it(`${r.cesta} = ${r.min} a ${r.max} (na hraně) je platné`, () => {
        for (const h of [r.min, r.max]) {
          const v = volat(nastav(zaklad, r.cesta, h));
          expect(v?.stav, `${r.cesta} = ${h}: ${JSON.stringify(v)}`).toBe("ok");
          vsechnaKonecna(v);
        }
      });
      it(`${r.cesta} těsně za hranou (${r.min} − ${EPS}, ${r.max} + ${EPS}) → NEPLATNY_VSTUP`, () => {
        jeChyba(volat(nastav(zaklad, r.cesta, r.min - EPS)), r.cesta);
        jeChyba(volat(nastav(zaklad, r.cesta, r.max + EPS)), r.cesta);
      });
      it(`${r.cesta} = NaN, ±Infinity, záporné, text → NEPLATNY_VSTUP`, () => {
        const spatne: unknown[] = [NaN, Infinity, -Infinity, String(r.min)];
        if (r.min > -1) spatne.push(-1);
        if (r.min > -1e6) spatne.push(-1e6);
        for (const s of spatne) jeChyba(volat(nastav(zaklad, r.cesta, s)), r.cesta);
      });
      if (r.povinne)
        it(`${r.cesta} chybí → NEPLATNY_VSTUP`, () => {
          jeChyba(volat(nastav(zaklad, r.cesta, SMAZAT)), r.cesta);
        });
    }
  });
}

/**
 * Vstupy, pro které zadání nedává rozsah (Q6): NaN/±Infinity/text → NEPLATNY_VSTUP se správným `pole`.
 * Pro 0 a záporné hodnoty zadání nic neříká; test žádá jen „žádný nesmysl“: buď NEPLATNY_VSTUP
 * se správným `pole`, nebo ok s konečnými čísly a nezápornými hodnotami v `nezaporne`.
 */
function testyBezRozsahu(
  nazev: string,
  volat: (v: unknown) => Vysledek,
  zaklad: unknown,
  cesty: { cesta: string; povinne?: boolean }[],
  nezaporne: string[],
): void {
  describe(`${nazev}: vstupy bez rozsahu v zadání (Q6)`, () => {
    for (const { cesta, povinne } of cesty) {
      it(`${cesta} = NaN, ±Infinity, text → NEPLATNY_VSTUP`, () => {
        for (const s of [NaN, Infinity, -Infinity, "1"]) jeChyba(volat(nastav(zaklad, cesta, s)), cesta);
      });
      if (povinne)
        it(`${cesta} chybí → NEPLATNY_VSTUP`, () => {
          jeChyba(volat(nastav(zaklad, cesta, SMAZAT)), cesta);
        });
      it(`${cesta} = 0 nebo záporné → chyba, nebo výsledek bez nesmyslu`, () => {
        for (const s of [0, -1]) {
          const v = volat(nastav(zaklad, cesta, s));
          if (v?.stav === "chyba") jeChyba(v, cesta);
          else {
            expect(v?.stav, JSON.stringify(v)).toBe("ok");
            vsechnaKonecna(v);
            for (const k of nezaporne)
              if (typeof v[k] === "number") expect(v[k], `${cesta} = ${s}: ${k}`).toBeGreaterThanOrEqual(0);
          }
        }
      });
    }
  });
}

/** `napeti` smí být jen 12 nebo 24. */
function testyNapeti(nazev: string, volat: (v: unknown) => Vysledek, zaklad: unknown): void {
  it(`${nazev}: napeti mimo 12 | 24, NaN, text nebo chybí → NEPLATNY_VSTUP (pole napeti)`, () => {
    for (const s of [0, 12.8, 13, 48, -12, NaN, Infinity, "12", SMAZAT])
      jeChyba(volat(nastav(zaklad, "napeti", s)), "napeti");
  });
}

/** Žádná výjimka ani pro úplně špatný vstup. */
function testyNesmyslu(nazev: string, fn: unknown, data?: unknown): void {
  it(`${nazev}: undefined, null, {} → chyba NEPLATNY_VSTUP, žádná výjimka`, () => {
    for (const s of [undefined, null, {}]) {
      const v = volej(fn, s, data);
      expect(v?.stav, `${String(JSON.stringify(s))}: ${JSON.stringify(v)}`).toBe("chyba");
      expect(v.hlasky).toEqual(["NEPLATNY_VSTUP"]);
      expect(typeof v.pole).toBe("string");
    }
  });
}

const zaokr1 = (x: number): number => Math.round(x * 10) / 10;

// ---------------------------------------------------------------------------------------------
// Jmenovité napětí
// ---------------------------------------------------------------------------------------------

describe("jmenoviteNapeti", () => {
  it("12 V systém (4S LiFePO4) = 4 × 3,2 = 12,8 V", () => {
    cislo((jmenoviteNapeti as unknown as Fn)(12), 12.8, "Unom(12)");
  });
  it("24 V systém (8S LiFePO4) = 8 × 3,2 = 25,6 V", () => {
    cislo((jmenoviteNapeti as unknown as Fn)(24), 25.6, "Unom(24)");
  });
});

// ---------------------------------------------------------------------------------------------
// A. Spotřebiče
// ---------------------------------------------------------------------------------------------

describe("A. bilanceSpotrebicu", () => {
  const f = (v: unknown): Vysledek => volej(bilanceSpotrebicu, v);

  // DOSLOVNÝ VÝKLAD (Q1): hodnoty jednotlivých položek čteme z `polozky[i]` výsledku
  // (zadání pojmenuje veličiny, ne pole výsledku).
  it("P-A1: lednice 45 W × 24 h DC + notebook 60 W × 3 h na 230 V, 12 V, výchozí účinnost 0,9", () => {
    const r = f({
      napeti: 12,
      polozky: [
        { prikonW: 45, hodinDenne: 24, na230V: false },
        { prikonW: 60, hodinDenne: 3, na230V: true },
      ],
    });
    jeOk(r, []);
    cisla(r.polozky[0], { WhSpotrebic: 1080, WhZBaterie: 1080, proud: 3.515625, AhDenne: 84.375 }, "polozky[0].");
    cisla(r.polozky[1], { WhSpotrebic: 180, WhZBaterie: 200, proud: 5.208333333333333, AhDenne: 15.625 }, "polozky[1].");
    cisla(r, { WhDenne: 1280, AhDenne: 100, proudSoucasne: 8.723958333333332, vykon230V: 60 });
  });

  it("P-A2: kávovar 1 200 W × 0,25 h na 230 V + světla 20 W × 5 h + čerpadlo 0 W, 24 V, účinnost 0,85", () => {
    const r = f({
      napeti: 24,
      ucinnostMenice: 0.85,
      polozky: [
        { prikonW: 1200, hodinDenne: 0.25, na230V: true },
        { prikonW: 20, hodinDenne: 5, na230V: false },
        { prikonW: 0, hodinDenne: 2, na230V: false },
      ],
    });
    jeOk(r, []);
    cisla(
      r.polozky[0],
      { WhSpotrebic: 300, WhZBaterie: 352.94117647058823, proud: 55.147058823529406, AhDenne: 13.786764705882351 },
      "polozky[0].",
    );
    cisla(r.polozky[1], { WhSpotrebic: 100, WhZBaterie: 100, proud: 0.78125, AhDenne: 3.90625 }, "polozky[1].");
    cisla(r.polozky[2], { WhSpotrebic: 0, WhZBaterie: 0, proud: 0, AhDenne: 0 }, "polozky[2].");
    cisla(r, {
      WhDenne: 452.94117647058823,
      AhDenne: 17.69301470588235,
      proudSoucasne: 55.928308823529406,
      vykon230V: 1200,
    });
  });

  it("P-A3: jen DC spotřebiče → BEZ_MENICE, vykon230V = 0", () => {
    const r = f({ napeti: 12, polozky: [{ prikonW: 100, hodinDenne: 2, na230V: false }] });
    jeOk(r, ["BEZ_MENICE"]);
    cisla(r, { WhDenne: 200, AhDenne: 15.625, proudSoucasne: 7.8125, vykon230V: 0 });
  });

  // DOSLOVNÝ VÝKLAD (Q14): „žádná položka není na 230 V“ – položka na 230 V s příkonem 0 W
  // je pořád položka na 230 V, takže BEZ_MENICE se neukáže.
  it("P-A4: položka na 230 V s příkonem 0 W → bez BEZ_MENICE", () => {
    const r = f({
      napeti: 12,
      polozky: [
        { prikonW: 100, hodinDenne: 2, na230V: false },
        { prikonW: 0, hodinDenne: 2, na230V: true },
      ],
    });
    jeOk(r, []);
    cisla(r, { WhDenne: 200, vykon230V: 0 });
  });

  it("NAD_150A: proudSoucasne přesně 150 A ne, těsně nad ano (12 V: 1 920 W / 12,8 V)", () => {
    const pol = (p: number) => [{ prikonW: p, hodinDenne: 1, na230V: false }];
    const r150 = f({ napeti: 12, polozky: pol(1920) });
    jeOk(r150, ["BEZ_MENICE"]);
    cislo(r150.proudSoucasne, 150, "proudSoucasne");
    jeOk(f({ napeti: 12, polozky: pol(1920.01) }), ["BEZ_MENICE", "NAD_150A"]);
  });

  it("NAD_150A: 24 V, 3 840 W = 150 A ne, 3 840,01 W ano; součet přes víc položek na 230 V", () => {
    jeOk(f({ napeti: 24, polozky: [{ prikonW: 3840, hodinDenne: 1, na230V: false }] }), ["BEZ_MENICE"]);
    jeOk(f({ napeti: 24, polozky: [{ prikonW: 3840.01, hodinDenne: 1, na230V: false }] }), [
      "BEZ_MENICE",
      "NAD_150A",
    ]);
    // 2 × 1 000 W na 230 V při účinnosti 0,9 na 12 V: 2 × 1000 / 0,9 / 12,8 = 173,6 A > 150 A
    const r = f({
      napeti: 12,
      polozky: [
        { prikonW: 1000, hodinDenne: 0.1, na230V: true },
        { prikonW: 1000, hodinDenne: 0.1, na230V: true },
      ],
    });
    jeOk(r, ["NAD_150A"]);
    cislo(r.proudSoucasne, 173.6111111111111, "proudSoucasne");
    cislo(r.vykon230V, 2000, "vykon230V");
  });

  it("prázdný seznam položek nebo chybějící seznam → NEPLATNY_VSTUP (pole polozky)", () => {
    jeChyba(f({ napeti: 12, polozky: [] }), "polozky");
    jeChyba(f({ napeti: 12 }), "polozky");
  });

  const zaklad = {
    napeti: 12,
    ucinnostMenice: 0.9,
    polozky: [
      { prikonW: 45, hodinDenne: 24, na230V: false },
      { prikonW: 60, hodinDenne: 3, na230V: true },
      { prikonW: 100, hodinDenne: 1, na230V: false },
    ],
  };
  testyNapeti("bilanceSpotrebicu", f, zaklad);
  testyNesmyslu("bilanceSpotrebicu", bilanceSpotrebicu);
  testyRozsahu("bilanceSpotrebicu", f, zaklad, [
    { cesta: "ucinnostMenice", min: 0.5, max: 1 },
    { cesta: "polozky[2].prikonW", min: 0, max: 10000, povinne: true },
    { cesta: "polozky[2].hodinDenne", min: 0, max: 24, povinne: true },
    { cesta: "polozky[0].prikonW", min: 0, max: 10000, povinne: true },
    { cesta: "polozky[1].hodinDenne", min: 0, max: 24, povinne: true },
  ]);
});

// ---------------------------------------------------------------------------------------------
// B. Vaření
// ---------------------------------------------------------------------------------------------

describe("B. ohrevVody", () => {
  const f = (v: unknown): Vysledek => volej(ohrevVody, v);

  it("příklad ze zadání: 1 l z 15 na 100 °C → teplo ≈ 98,8 Wh, z baterie ≈ 129,2 Wh (P-B1)", () => {
    const r = f({ litry: 1 });
    jeOk(r, []);
    expect(zaokr1(r.WhTeplo)).toBe(98.8);
    expect(zaokr1(r.WhZBaterie)).toBe(129.2);
    cisla(r, { WhTeplo: 98.83611111111111, WhZBaterie: 129.19753086419752 });
  });

  it("P-B2: 2,5 l z 10 na 95 °C, účinnost vaření 0,6, měnič 1", () => {
    const r = f({ litry: 2.5, tStart: 10, tCil: 95, ucinnostVareni: 0.6, ucinnostMenice: 1 });
    jeOk(r, []);
    cisla(r, { WhTeplo: 247.09027777777777, WhZBaterie: 411.8171296296296 });
  });

  it("P-B3: 0,5 l z −10 na −5 °C (tCil pod nulou je platný, jen musí být > tStart)", () => {
    const r = f({ litry: 0.5, tStart: -10, tCil: -5 });
    jeOk(r, []);
    cisla(r, { WhTeplo: 2.9069444444444446, WhZBaterie: 3.799927378358751 });
  });

  it("tStart 99 a tCil 100 (obě hrany najednou) je platné", () => {
    const r = f({ litry: 1, tStart: 99, tCil: 100 });
    jeOk(r, []);
    cislo(r.WhTeplo, 1.1627777777777777, "WhTeplo");
  });

  // DOSLOVNÝ VÝKLAD (Q5): podmínka „tCil > tStart a ≤ 100“ patří k tCil, proto pole = "tCil".
  it("tCil: 100 platné, 100 + ε, = tStart, < tStart, NaN, text → NEPLATNY_VSTUP (pole tCil)", () => {
    expect(f({ litry: 1, tCil: 100 })?.stav).toBe("ok");
    expect(f({ litry: 1, tStart: 20, tCil: 20 + EPS })?.stav).toBe("ok");
    for (const s of [100 + EPS, 15, 14, -20, NaN, Infinity, -Infinity, "90"])
      jeChyba(f({ litry: 1, tStart: 15, tCil: s }), "tCil");
  });

  testyNesmyslu("ohrevVody", ohrevVody);
  testyRozsahu("ohrevVody", f, { litry: 1 }, [
    { cesta: "litry", min: 0.1, max: 50, povinne: true },
    { cesta: "tStart", min: -10, max: 99 },
    { cesta: "ucinnostVareni", min: 0.3, max: 1 },
    { cesta: "ucinnostMenice", min: 0.3, max: 1 },
  ]);
});

describe("B. kolikUvarim", () => {
  const f = (v: unknown): Vysledek => volej(kolikUvarim, v);

  it("příklad ze zadání: 200 Ah, 12 V, 90 % → 2 304 Wh; 1 000 W, 20 min → 370,4 Wh na jídlo → 6 jídel (P-B4)", () => {
    const r = f({ kapacitaAh: 200, napeti: 12, prikonW: 1000, minutNaJidlo: 20 });
    jeOk(r, []);
    cislo(r.WhVyuzitelne, 2304, "WhVyuzitelne");
    expect(zaokr1(r.WhNaJidlo)).toBe(370.4);
    expect(r.jidel).toBe(6);
    cisla(r, { WhNaJidlo: 370.3703703703703, litruVody: 17.833158146201626, hodinChodu: 2.0736 });
  });

  // DOSLOVNÝ VÝKLAD (Q8): litruVody = WhVyuzitelne / ohrevVody({ litry: 1 }).WhZBaterie s VÝCHOZÍMI
  // účinnostmi (0,85 a 0,9), i když uživatel zadá jinou účinnost měniče (zde 0,95).
  it("P-B5: 100 Ah, 24 V, 80 %, 2 000 W, 15 min, účinnost měniče 0,95", () => {
    const r = f({
      kapacitaAh: 100,
      napeti: 24,
      vyuzitelnost: 0.8,
      prikonW: 2000,
      minutNaJidlo: 15,
      ucinnostMenice: 0.95,
    });
    jeOk(r, []);
    expect(r.jidel).toBe(3);
    cisla(r, {
      WhVyuzitelne: 2048,
      WhNaJidlo: 526.3157894736843,
      litruVody: 15.851696129957,
      hodinChodu: 0.9727999999999999,
    });
  });

  it("P-B6: floor na hraně: 2 304 / 384 = přesně 6 jídel; o chlup delší vaření → 5", () => {
    const r = f({ kapacitaAh: 200, napeti: 12, prikonW: 1152, minutNaJidlo: 20, ucinnostMenice: 1 });
    jeOk(r, []);
    cislo(r.WhNaJidlo, 384, "WhNaJidlo");
    expect(r.jidel).toBe(6);
    expect(f({ kapacitaAh: 200, napeti: 12, prikonW: 1152, minutNaJidlo: 20.0001, ucinnostMenice: 1 }).jidel).toBe(5);
  });

  it("P-B7: jídlo dražší než celá baterie → 0 jídel", () => {
    const r = f({ kapacitaAh: 1, napeti: 12, prikonW: 1500, minutNaJidlo: 60 });
    jeOk(r, []); // 1 500 / 0,9 / 12,8 = 130,2 A ≤ 150 A
    expect(r.jidel).toBe(0);
    cisla(r, { WhVyuzitelne: 11.52, WhNaJidlo: 1666.6666666666667, hodinChodu: 0.006912 });
  });

  it("PROUD_VELKY: prikonW / ucinnostMenice / Unom přesně 150 A ne, těsně nad ano", () => {
    const zakl = { kapacitaAh: 200, minutNaJidlo: 10, ucinnostMenice: 1 };
    jeOk(f({ ...zakl, napeti: 12, prikonW: 1920 }), []);
    jeOk(f({ ...zakl, napeti: 12, prikonW: 1920.01 }), ["PROUD_VELKY"]);
    jeOk(f({ ...zakl, napeti: 24, prikonW: 3840 }), []);
    jeOk(f({ ...zakl, napeti: 24, prikonW: 3840.01 }), ["PROUD_VELKY"]);
    // výchozí účinnost 0,9: 2 000 / 0,9 / 12,8 = 173,6 A
    jeOk(f({ kapacitaAh: 200, napeti: 12, prikonW: 2000, minutNaJidlo: 10 }), ["PROUD_VELKY"]);
  });

  const zaklad = { kapacitaAh: 200, napeti: 12, prikonW: 1000, minutNaJidlo: 20 };
  testyNapeti("kolikUvarim", f, zaklad);
  testyNesmyslu("kolikUvarim", kolikUvarim);
  testyRozsahu("kolikUvarim", f, zaklad, [
    { cesta: "kapacitaAh", min: 1, max: 2000, povinne: true },
    { cesta: "vyuzitelnost", min: 0.5, max: 1 },
    { cesta: "prikonW", min: 1, max: 10000, povinne: true },
    { cesta: "minutNaJidlo", min: 1, max: 600, povinne: true },
  ]);
  testyBezRozsahu("kolikUvarim", f, zaklad, [{ cesta: "ucinnostMenice" }], [
    "WhVyuzitelne",
    "WhNaJidlo",
    "jidel",
    "litruVody",
    "hodinChodu",
  ]);
});

// ---------------------------------------------------------------------------------------------
// C. Baterie
// ---------------------------------------------------------------------------------------------

describe("C. potrebnaBaterie", () => {
  const f = (v: unknown): Vysledek => volej(potrebnaBaterie, v);

  it("P-C1: 1 280 Wh/den, 3 dny, 12 V, 90 % → 4 266,7 Wh, 333,3 Ah → 340 Ah", () => {
    const r = f({ WhDenne: 1280, dnyAutonomie: 3, napeti: 12 });
    jeOk(r, []);
    cisla(r, { WhPotreba: 4266.666666666667, Ah: 333.3333333333333 });
    expect(r.AhZaokrouhleno).toBe(340);
  });

  it("P-C2: 2 000 Wh/den, půl dne, 24 V, 100 % → 1 000 Wh, 39,0625 Ah → 40 Ah", () => {
    const r = f({ WhDenne: 2000, dnyAutonomie: 0.5, napeti: 24, vyuzitelnost: 1 });
    jeOk(r, []);
    cisla(r, { WhPotreba: 1000, Ah: 39.0625 });
    expect(r.AhZaokrouhleno).toBe(40);
  });

  it("P-C3: zaokrouhlení nahoru na 10 Ah: přesně 100 Ah zůstane 100, o chlup víc → 110", () => {
    const r = f({ WhDenne: 2560, dnyAutonomie: 1, napeti: 24, vyuzitelnost: 1 });
    jeOk(r, []);
    cislo(r.Ah, 100, "Ah");
    expect(r.AhZaokrouhleno).toBe(100);
    expect(f({ WhDenne: 2560.01, dnyAutonomie: 1, napeti: 24, vyuzitelnost: 1 }).AhZaokrouhleno).toBe(110);
  });

  it("spotřeba z příkladu A1 (1 280 Wh) na 1 den: 1 422,2 Wh, 111,1 Ah → 120 Ah", () => {
    const r = f({ WhDenne: 1280, dnyAutonomie: 1, napeti: 12, vyuzitelnost: 0.9 });
    cisla(r, { WhPotreba: 1422.2222222222222, Ah: 111.11111111111111 });
    expect(r.AhZaokrouhleno).toBe(120);
  });

  const zaklad = { WhDenne: 1280, dnyAutonomie: 3, napeti: 12 };
  testyNapeti("potrebnaBaterie", f, zaklad);
  testyNesmyslu("potrebnaBaterie", potrebnaBaterie);
  testyRozsahu("potrebnaBaterie", f, zaklad, [
    { cesta: "WhDenne", min: 1, max: 50000, povinne: true },
    { cesta: "dnyAutonomie", min: 0.5, max: 14, povinne: true },
    { cesta: "vyuzitelnost", min: 0.5, max: 1 },
  ]);
});

describe("C. vydrzBaterie", () => {
  const f = (v: unknown): Vysledek => volej(vydrzBaterie, v);

  it("P-C4: 200 Ah, 12 V, 90 % (2 304 Wh) při 2 304 Wh/den → 1 den, 24 h", () => {
    const r = f({ kapacitaAh: 200, napeti: 12, WhDenne: 2304 });
    jeOk(r, []);
    cisla(r, { dny: 1, hodin: 24 });
  });

  it("P-C5: 100 Ah, 24 V, 80 % (2 048 Wh) při 500 Wh/den → 4,096 dne, 98,304 h", () => {
    const r = f({ kapacitaAh: 100, napeti: 24, vyuzitelnost: 0.8, WhDenne: 500 });
    jeOk(r, []);
    cisla(r, { dny: 4.096, hodin: 98.304 });
  });

  it("vydrz(potrebnaBaterie) je zpětný výpočet: 333,33 Ah, 12 V, 90 % při 1 280 Wh/den → 3 dny", () => {
    const r = f({ kapacitaAh: 1000 / 3, napeti: 12, vyuzitelnost: 0.9, WhDenne: 1280 });
    cisla(r, { dny: 3, hodin: 72 });
  });

  const zaklad = { kapacitaAh: 200, napeti: 12, WhDenne: 2304 };
  testyNapeti("vydrzBaterie", f, zaklad);
  testyNesmyslu("vydrzBaterie", vydrzBaterie);
  testyBezRozsahu(
    "vydrzBaterie",
    f,
    zaklad,
    [{ cesta: "kapacitaAh", povinne: true }, { cesta: "WhDenne", povinne: true }, { cesta: "vyuzitelnost" }],
    ["dny", "hodin"],
  );
});

// ---------------------------------------------------------------------------------------------
// D. Měnič
// ---------------------------------------------------------------------------------------------

describe("D. navrhMenice", () => {
  const f = (v: unknown): Vysledek => volej(navrhMenice, v);

  it("P-D1: kávovar 1 000 W, lednice 60 W (rozběh 5×), nabíječka 30 W, vše současně, 12 V", () => {
    const r = f({
      napeti: 12,
      spotrebice: [{ prikonW: 1000 }, { prikonW: 60, rozbehNasobek: 5 }, { prikonW: 30 }],
      spotrebaNaprazdnoW: 10,
      hodinZapnutoDenne: 5,
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1090, spickaW: 1330, proudZBaterie: 94.61805555555554, WhNaprazdno: 50 });
  });

  it("P-D2: vrtačka 600 W × 3 a kompresor 500 W × 4, 24 V, účinnost 0,92 → rozbíhá se kompresor", () => {
    const r = f({
      napeti: 24,
      ucinnostMenice: 0.92,
      spotrebice: [
        { prikonW: 600, rozbehNasobek: 3, soucasne: true },
        { prikonW: 500, rozbehNasobek: 4, soucasne: true },
      ],
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1100, spickaW: 2600, proudZBaterie: 46.70516304347826, WhNaprazdno: 0 });
  });

  it("P-D3: shoda rozběhových přírůstků (600 × 3 a 400 × 4, obojí +1 200 W) → špička 2 200 W", () => {
    const r = f({
      napeti: 12,
      spotrebice: [
        { prikonW: 600, rozbehNasobek: 3 },
        { prikonW: 400, rozbehNasobek: 4 },
      ],
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1000, spickaW: 2200, proudZBaterie: 86.80555555555556 });
  });

  // Q7 (rozhodnuto 16. 11. 2026, zadání D): trvalyVykonW = větší z (součet současných) a (největší
  // samostatný); spickaW = větší z (součet současných + největší rozběhový přírůstek mezi současnými)
  // a (největší prikonW × rozbehNasobek mezi samostatnými).
  it("P-D4: 100 W současně + 2 000 W samostatně → trvalý 2 000 W, špička 2 000 W, 173,6 A (NAD_150A)", () => {
    const r = f({ napeti: 12, spotrebice: [{ prikonW: 100 }, { prikonW: 2000, soucasne: false }] });
    jeOk(r, ["ODKAZ_PRUREZ", "NAD_150A"]);
    cisla(r, { trvalyVykonW: 2000, spickaW: 2000, proudZBaterie: 173.6111111111111 });
  });

  it("P-D5: jen samostatné 1 500 W a 700 W × 3 → trvalý 1 500 W, špička 700 × 3 = 2 100 W", () => {
    const r = f({
      napeti: 12,
      spotrebice: [
        { prikonW: 1500, rozbehNasobek: 1, soucasne: false },
        { prikonW: 700, rozbehNasobek: 3, soucasne: false },
      ],
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1500, spickaW: 2100, proudZBaterie: 130.20833333333334 });
  });

  it("P-D6: současné vyhrají trvalý, samostatný špičku: 1 000 W + lednice 60 W × 5 současně, kompresor 500 W × 4 samostatně", () => {
    // trvalý max(1 060; 500) = 1 060; špička max(1 060 + 60 × 4 = 1 300; 500 × 4 = 2 000) = 2 000
    const r = f({
      napeti: 12,
      spotrebice: [
        { prikonW: 1000 },
        { prikonW: 60, rozbehNasobek: 5 },
        { prikonW: 500, rozbehNasobek: 4, soucasne: false },
      ],
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1060, spickaW: 2000, proudZBaterie: 92.01388888888889 });
  });

  it("P-D7: samostatný menší než součet současných → trvalý = součet; špička ze současných", () => {
    // trvalý max(1 090; 800) = 1 090; špička max(1 090 + 240 = 1 330; 800 × 1 = 800) = 1 330
    const r = f({
      napeti: 12,
      spotrebice: [{ prikonW: 1000 }, { prikonW: 60, rozbehNasobek: 5 }, { prikonW: 30 }, { prikonW: 800, soucasne: false }],
    });
    jeOk(r, ["ODKAZ_PRUREZ"]);
    cisla(r, { trvalyVykonW: 1090, spickaW: 1330, proudZBaterie: 94.61805555555554 });
  });

  it("NAD_150A: proudZBaterie přesně 150 A ne, těsně nad ano; ODKAZ_PRUREZ vždy", () => {
    const sp = (p: number) => [{ prikonW: p }];
    const r150 = f({ napeti: 12, ucinnostMenice: 1, spotrebice: sp(1920) });
    jeOk(r150, ["ODKAZ_PRUREZ"]);
    cislo(r150.proudZBaterie, 150, "proudZBaterie");
    jeOk(f({ napeti: 12, ucinnostMenice: 1, spotrebice: sp(1920.01) }), ["ODKAZ_PRUREZ", "NAD_150A"]);
    jeOk(f({ napeti: 24, ucinnostMenice: 1, spotrebice: sp(3840) }), ["ODKAZ_PRUREZ"]);
    jeOk(f({ napeti: 24, ucinnostMenice: 1, spotrebice: sp(3840.01) }), ["ODKAZ_PRUREZ", "NAD_150A"]);
    // 2 000 W, výchozí 0,9, 12 V → 173,6 A
    jeOk(f({ napeti: 12, spotrebice: sp(2000) }), ["ODKAZ_PRUREZ", "NAD_150A"]);
    // 0 W → 0 A, ODKAZ_PRUREZ pořád
    const r0 = f({ napeti: 12, spotrebice: sp(0) });
    jeOk(r0, ["ODKAZ_PRUREZ"]);
    cisla(r0, { trvalyVykonW: 0, spickaW: 0, proudZBaterie: 0 });
  });

  const zaklad = {
    napeti: 12,
    spotrebice: [{ prikonW: 1000 }, { prikonW: 60, rozbehNasobek: 5 }, { prikonW: 30 }],
    spotrebaNaprazdnoW: 10,
    hodinZapnutoDenne: 5,
  };
  testyNapeti("navrhMenice", f, zaklad);
  testyNesmyslu("navrhMenice", navrhMenice);
  testyRozsahu("navrhMenice", f, zaklad, [
    { cesta: "spotrebice[1].prikonW", min: 0, max: 10000, povinne: true },
    { cesta: "spotrebice[1].rozbehNasobek", min: 1, max: 10 },
    { cesta: "spotrebice[2].prikonW", min: 0, max: 10000, povinne: true },
    { cesta: "spotrebaNaprazdnoW", min: 0, max: 200 },
    { cesta: "hodinZapnutoDenne", min: 0, max: 24 },
  ]);
  testyBezRozsahu("navrhMenice", f, zaklad, [{ cesta: "ucinnostMenice" }], [
    "trvalyVykonW",
    "spickaW",
    "proudZBaterie",
    "WhNaprazdno",
  ]);
});

// ---------------------------------------------------------------------------------------------
// E. Booster
// ---------------------------------------------------------------------------------------------

// Zadání E upravené 17. 11. 2026 (realistický model, K-BOOST-0001 a 0002): koeficient 0,7 (do 90 %),
// koeficientPlna 0,2 (nad 90 %), volitelný stav baterie kapacitaAh + startProc (buď obě, nebo žádná).
describe("E. nabitiZJizdy", () => {
  const f = (v: unknown): Vysledek => volej(nabitiZJizdy, v);

  describe("bez stavu baterie: AhDenne = proud × koeficient × hodiny", () => {
    it("P-E1: 12 V, 30 A, 2 h, výchozí koeficient 0,7 → 42 Ah, 537,6 Wh; naivně 60 Ah; průměr 21 A", () => {
      const r = f({ napeti: 12, proudBoosteruA: 30, hodinJizdyDenne: 2 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 42, WhDenne: 537.6, naivniAh: 60, prumernyProudA: 21 });
    });

    it("P-E2: 24 V, 20 A, 0,5 h → 7 Ah, 179,2 Wh; naivně 10 Ah; průměr 14 A", () => {
      const r = f({ napeti: 24, proudBoosteruA: 20, hodinJizdyDenne: 0.5 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 7, WhDenne: 179.2, naivniAh: 10, prumernyProudA: 14 });
    });

    it("P-E3: bez jízdy (0 h) → 0 Ah, 0 Wh, naivně 0, průměrný proud 0 (ne NaN); LITHIUM_BOOSTER i tak (vždy)", () => {
      const r = f({ napeti: 12, proudBoosteruA: 50, hodinJizdyDenne: 0 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 0, WhDenne: 0, naivniAh: 0, prumernyProudA: 0 });
      vsechnaKonecna(r);
    });

    it("P-E4: zadaný koeficient 1 → jako naivně (60 Ah); 0,5 → 30 Ah; 0,3 → 18 Ah", () => {
      const z = { napeti: 12, proudBoosteruA: 30, hodinJizdyDenne: 2 };
      cisla(f({ ...z, koeficient: 1 }), { AhDenne: 60, WhDenne: 768, naivniAh: 60, prumernyProudA: 30 });
      cisla(f({ ...z, koeficient: 0.5 }), { AhDenne: 30, WhDenne: 384, naivniAh: 60, prumernyProudA: 15 });
      cisla(f({ ...z, koeficient: 0.3 }), { AhDenne: 18, WhDenne: 230.4, naivniAh: 60, prumernyProudA: 9 });
    });

    it("P-E5: koeficientPlna bez stavu baterie nic nemění; DOBITO_DO_PLNA nikdy (jen se stavem baterie)", () => {
      const z = { napeti: 12, proudBoosteruA: 100, hodinJizdyDenne: 24 };
      for (const kp of [0, 0.2, 1]) {
        const r = f({ ...z, koeficientPlna: kp });
        jeOk(r, ["LITHIUM_BOOSTER"]);
        cisla(r, { AhDenne: 1680, WhDenne: 21504, naivniAh: 2400, prumernyProudA: 70 });
      }
    });
  });

  describe("se stavem baterie (do 90 % I1 = proud × koeficient, nad 90 % I2 = proud × koeficientPlna)", () => {
    // Příklady ze zadání: 30 A, 12 V, 100 Ah, koeficienty 0,7 / 0,2.
    const Z = { napeti: 12, proudBoosteruA: 30, kapacitaAh: 100 };

    it("P-E6 (zadání): 1 h z 30 % → 21,0 Ah, konec 51 %; 268,8 Wh; naivně 30; průměr 21 A", () => {
      const r = f({ ...Z, hodinJizdyDenne: 1, startProc: 30 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 21, WhDenne: 268.8, naivniAh: 30, prumernyProudA: 21, konecProc: 51 });
    });

    it("P-E7 (zadání): 3 h z 30 % → 60,857… Ah (= 426/7), konec 90,857… %; bez DOBITO_DO_PLNA", () => {
      // doDevadesati 60 Ah, t1 = 60/21 h, Ah1 = 60; zbytek 1/7 h × 6 A = 6/7 Ah (< 10 do plna)
      const r = f({ ...Z, hodinJizdyDenne: 3, startProc: 30 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, {
        AhDenne: 426 / 7,
        WhDenne: (426 / 7) * 12.8,
        naivniAh: 90,
        prumernyProudA: 426 / 21,
        konecProc: 30 + 426 / 7,
      });
    });

    it("P-E8 (zadání): 3 h ze 70 % → 30,0 Ah, konec 100 %, DOBITO_DO_PLNA", () => {
      // doDevadesati 20 Ah, t1 = 20/21 h; zbytek 43/21 h × 6 A = 12,29 Ah, ale do plna jen 10 Ah
      const r = f({ ...Z, hodinJizdyDenne: 3, startProc: 70 });
      jeOk(r, ["LITHIUM_BOOSTER", "DOBITO_DO_PLNA"]);
      cisla(r, { AhDenne: 30, WhDenne: 384, naivniAh: 90, prumernyProudA: 10, konecProc: 100 });
    });

    it("P-E9: start nad 90 % (95 %), 0,5 h → jen I2 = 6 A → 3 Ah, konec 98 %, bez DOBITO_DO_PLNA", () => {
      const r = f({ ...Z, hodinJizdyDenne: 0.5, startProc: 95 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 3, WhDenne: 38.4, naivniAh: 15, prumernyProudA: 6, konecProc: 98 });
    });

    it("P-E10: start nad 90 % (95 %), 2 h → I2 by dal 12 Ah, do plna jen 5 → 5 Ah, konec 100 %, DOBITO_DO_PLNA", () => {
      const r = f({ ...Z, hodinJizdyDenne: 2, startProc: 95 });
      jeOk(r, ["LITHIUM_BOOSTER", "DOBITO_DO_PLNA"]);
      cisla(r, { AhDenne: 5, WhDenne: 64, naivniAh: 60, prumernyProudA: 2.5, konecProc: 100 });
    });

    it("P-E11: start přesně 90 % → t1 = 0, hned I2: 1 h → 6 Ah, konec 96 %", () => {
      const r = f({ ...Z, hodinJizdyDenne: 1, startProc: 90 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 6, WhDenne: 76.8, naivniAh: 30, prumernyProudA: 6, konecProc: 96 });
    });

    it("P-E12: start 100 % → nic se nenabije: 0 Ah, 0 Wh, průměr 0 A, konec 100 %, DOBITO_DO_PLNA", () => {
      const r = f({ ...Z, hodinJizdyDenne: 3, startProc: 100 });
      jeOk(r, ["LITHIUM_BOOSTER", "DOBITO_DO_PLNA"]);
      cisla(r, { AhDenne: 0, WhDenne: 0, naivniAh: 90, prumernyProudA: 0, konecProc: 100 });
    });

    it("P-E13: 0 h jízdy z 30 % → 0 Ah, průměr 0 (ne NaN), konec 30 %; z 100 % → konec 100 %, DOBITO_DO_PLNA", () => {
      const r = f({ ...Z, hodinJizdyDenne: 0, startProc: 30 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 0, WhDenne: 0, naivniAh: 0, prumernyProudA: 0, konecProc: 30 });
      vsechnaKonecna(r);
      const r2 = f({ ...Z, hodinJizdyDenne: 0, startProc: 100 });
      jeOk(r2, ["LITHIUM_BOOSTER", "DOBITO_DO_PLNA"]);
      cisla(r2, { AhDenne: 0, prumernyProudA: 0, konecProc: 100 });
      vsechnaKonecna(r2);
    });

    it("P-E14: 24 V, 0 %, 2 h → celé pod 90 % (t1 = 2 h z 4,29 h) → 42 Ah, 1 075,2 Wh, konec 42 %", () => {
      const r = f({ ...Z, napeti: 24, hodinJizdyDenne: 2, startProc: 0 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 42, WhDenne: 1075.2, naivniAh: 60, prumernyProudA: 21, konecProc: 42 });
    });

    it("P-E15: zadané koeficienty 1 / 0 → naplno do 90 %, nad 90 % nic: 3 h z 30 % → 60 Ah, konec 90 %", () => {
      const r = f({ ...Z, hodinJizdyDenne: 3, startProc: 30, koeficient: 1, koeficientPlna: 0 });
      jeOk(r, ["LITHIUM_BOOSTER"]);
      cisla(r, { AhDenne: 60, WhDenne: 768, naivniAh: 90, prumernyProudA: 20, konecProc: 90 });
    });

    it("P-E16: malá baterie 10 Ah z 0 %, 24 h → AhDenne 10, konec 100 %, DOBITO_DO_PLNA", () => {
      const r = f({ ...Z, kapacitaAh: 10, hodinJizdyDenne: 24, startProc: 0 });
      jeOk(r, ["LITHIUM_BOOSTER", "DOBITO_DO_PLNA"]);
      cisla(r, { AhDenne: 10, WhDenne: 128, naivniAh: 720, prumernyProudA: 10 / 24, konecProc: 100 });
    });

    it("invarianty na mřížce: 0 ≤ AhDenne ≤ naivniAh, startProc ≤ konecProc ≤ 100, DOBITO_DO_PLNA ⇔ konec ≥ 100", () => {
      for (const startProc of [0, 30, 69, 89.9, 90, 95, 99.9, 100])
        for (const hodinJizdyDenne of [0, 0.25, 1, 3, 8, 24])
          for (const [koeficient, koeficientPlna] of [
            [0.7, 0.2],
            [0.3, 1],
            [1, 0],
          ]) {
            const v = { ...Z, startProc, hodinJizdyDenne, koeficient, koeficientPlna };
            const r = f(v);
            const co = JSON.stringify(v);
            expect(r?.stav, co).toBe("ok");
            vsechnaKonecna(r);
            expect(r.AhDenne, co).toBeGreaterThanOrEqual(-TOL);
            expect(r.AhDenne, co).toBeLessThanOrEqual(r.naivniAh + TOL);
            expect(r.konecProc, co).toBeGreaterThanOrEqual(startProc - TOL);
            expect(r.konecProc, co).toBeLessThanOrEqual(100 + TOL);
            // kapacita 100 Ah: konecProc = startProc + AhDenne
            cislo(r.konecProc, startProc + r.AhDenne, `${co} konecProc`);
            expect(r.hlasky.includes("DOBITO_DO_PLNA"), co).toBe(r.konecProc >= 100);
          }
    });

    it("jen jedna z dvojice kapacitaAh / startProc → NEPLATNY_VSTUP s polem té chybějící", () => {
      const z = { napeti: 12, proudBoosteruA: 30, hodinJizdyDenne: 2 };
      jeChyba(f({ ...z, kapacitaAh: 100 }), "startProc");
      jeChyba(f({ ...z, startProc: 30 }), "kapacitaAh");
    });
  });

  const zaklad = { napeti: 12, proudBoosteruA: 30, hodinJizdyDenne: 2 };
  const zakladStav = { ...zaklad, kapacitaAh: 100, startProc: 30 };
  testyNapeti("nabitiZJizdy", f, zaklad);
  testyNapeti("nabitiZJizdy se stavem baterie", f, zakladStav);
  testyNesmyslu("nabitiZJizdy", nabitiZJizdy);
  testyRozsahu("nabitiZJizdy (bez stavu baterie)", f, zaklad, [
    { cesta: "proudBoosteruA", min: 1, max: 100, povinne: true },
    { cesta: "hodinJizdyDenne", min: 0, max: 24, povinne: true },
    { cesta: "koeficient", min: 0.3, max: 1 },
    { cesta: "koeficientPlna", min: 0, max: 1 },
  ]);
  // Se stavem baterie: smazání jedné z dvojice → NEPLATNY_VSTUP s polem té chybějící (proto povinne).
  testyRozsahu("nabitiZJizdy (se stavem baterie)", f, zakladStav, [
    { cesta: "proudBoosteruA", min: 1, max: 100, povinne: true },
    { cesta: "hodinJizdyDenne", min: 0, max: 24, povinne: true },
    { cesta: "koeficient", min: 0.3, max: 1 },
    { cesta: "koeficientPlna", min: 0, max: 1 },
    { cesta: "kapacitaAh", min: 10, max: 2000, povinne: true },
    { cesta: "startProc", min: 0, max: 100, povinne: true },
  ]);
});

// ---------------------------------------------------------------------------------------------
// F. Solár – zapojení panelů
// ---------------------------------------------------------------------------------------------

describe("F. zapojeniPanelu", () => {
  const f = (v: unknown): Vysledek => volej(zapojeniPanelu, v);
  const panel180 = { Voc: 23, Isc: 10.5, Vmp: 19, Imp: 9.8, Wp: 180, koefVocProcNaK: -0.3 };

  it("P-F1: 3S2P panelů 180 Wp, výchozí tMin −20 °C → VocMraz 78,315 V, bez hlášek", () => {
    const r = f({ panel: panel180, serie: 3, paralel: 2, regulator: { maxVstupV: 100, maxVstupA: 30 } });
    jeOk(r, []);
    cisla(r, { VocMraz: 78.315, VmpPole: 57, IscPole: 21, ImpPole: 19.6, WpPole: 1080 });
  });

  it("P-F2: 1S3P panelů 320 Wp, tMin 25 °C (bez korekce) → POJISTKA_VETVE", () => {
    const r = f({
      panel: { Voc: 45, Isc: 9, Vmp: 37.5, Imp: 8.5, Wp: 320, koefVocProcNaK: -0.28 },
      serie: 1,
      paralel: 3,
      tMin: 25,
      regulator: { maxVstupV: 100, maxVstupA: 30 },
    });
    jeOk(r, ["POJISTKA_VETVE"]);
    cisla(r, { VocMraz: 45, VmpPole: 37.5, IscPole: 27, ImpPole: 25.5, WpPole: 960 });
  });

  // DOSLOVNÝ VÝKLAD (Q9): VOC_NAD_MAX je „blok“, ale obecný tvar výsledku zná jen stav ok / chyba
  // a chyba je jen NEPLATNY_VSTUP. Test proto čeká stav ok s VOC_NAD_MAX v hláškách a s čísly.
  it("P-F3: 4S1P v mrazu → VocMraz 104,42 V > 100 V: VOC_NAD_MAX (blok) a ISC_NAD_MAX (10,5 > 10 A)", () => {
    const r = f({ panel: panel180, serie: 4, paralel: 1, regulator: { maxVstupV: 100, maxVstupA: 10 } });
    jeOk(r, ["VOC_NAD_MAX", "ISC_NAD_MAX"]);
    cisla(r, { VocMraz: 104.42, VmpPole: 76, IscPole: 10.5, ImpPole: 9.8, WpPole: 720 });
  });

  it("VOC_NAD_MAX: VocMraz = maxVstupV ne, maxVstupV těsně pod ano (koef 0 → VocMraz = 2 × 22,5 = 45 V)", () => {
    const p = { Voc: 22.5, Isc: 5, Vmp: 18, Imp: 4.5, Wp: 100, koefVocProcNaK: 0 };
    const r = f({ panel: p, serie: 2, paralel: 1, regulator: { maxVstupV: 45, maxVstupA: 50 } });
    jeOk(r, []);
    cislo(r.VocMraz, 45, "VocMraz");
    jeOk(f({ panel: p, serie: 2, paralel: 1, regulator: { maxVstupV: 44.99, maxVstupA: 50 } }), ["VOC_NAD_MAX"]);
  });

  it("ISC_NAD_MAX: IscPole = maxVstupA ne, maxVstupA těsně pod ano (2 × 5 = 10 A)", () => {
    const p = { Voc: 22.5, Isc: 5, Vmp: 18, Imp: 4.5, Wp: 100, koefVocProcNaK: 0 };
    jeOk(f({ panel: p, serie: 1, paralel: 2, regulator: { maxVstupV: 100, maxVstupA: 10 } }), []);
    jeOk(f({ panel: p, serie: 1, paralel: 2, regulator: { maxVstupV: 100, maxVstupA: 9.99 } }), ["ISC_NAD_MAX"]);
  });

  it("POJISTKA_VETVE: paralel 2 ne, 3 ano, 10 ano", () => {
    const p = { Voc: 22.5, Isc: 5, Vmp: 18, Imp: 4.5, Wp: 100, koefVocProcNaK: 0 };
    const reg = { maxVstupV: 100, maxVstupA: 200 };
    jeOk(f({ panel: p, serie: 1, paralel: 2, regulator: reg }), []);
    jeOk(f({ panel: p, serie: 1, paralel: 3, regulator: reg }), ["POJISTKA_VETVE"]);
    jeOk(f({ panel: p, serie: 1, paralel: 10, regulator: reg }), ["POJISTKA_VETVE"]);
  });

  it("RUZNE_PANELY není kód hlášky (jen text u volby)", () => {
    const r = f({ panel: panel180, serie: 3, paralel: 3, regulator: { maxVstupV: 50, maxVstupA: 1 } });
    expect(r.hlasky).not.toContain("RUZNE_PANELY");
    jeOk(r, ["VOC_NAD_MAX", "ISC_NAD_MAX", "POJISTKA_VETVE"]);
  });

  // DOSLOVNÝ VÝKLAD (Q5): `pole` vnořeného vstupu ve tvaru `panel.Voc`, `regulator.maxVstupV`
  // (obdoba `polozky[2].prikonW` ze zadání).
  const zaklad = { panel: panel180, serie: 3, paralel: 2, regulator: { maxVstupV: 100, maxVstupA: 30 } };
  testyNesmyslu("zapojeniPanelu", zapojeniPanelu);
  testyRozsahu("zapojeniPanelu", f, zaklad, [
    { cesta: "panel.Voc", min: 1, max: 100, povinne: true },
    { cesta: "panel.Vmp", min: 1, max: 100, povinne: true },
    { cesta: "panel.Isc", min: 0.1, max: 30, povinne: true },
    { cesta: "panel.Imp", min: 0.1, max: 30, povinne: true },
    { cesta: "panel.Wp", min: 1, max: 1000, povinne: true },
    { cesta: "panel.koefVocProcNaK", min: -1, max: 0, povinne: true },
    { cesta: "serie", min: 1, max: 10, povinne: true },
    { cesta: "paralel", min: 1, max: 10, povinne: true },
    { cesta: "tMin", min: -40, max: 25 },
    { cesta: "regulator.maxVstupV", min: 10, max: 500, povinne: true },
    { cesta: "regulator.maxVstupA", min: 1, max: 200, povinne: true },
  ]);
});

// ---------------------------------------------------------------------------------------------
// G. Soběstačnost
// ---------------------------------------------------------------------------------------------

// Vlastní malá tabulka měst (nezávisí na packages/data/src/solar-mesta.json). Hodnoty jsou vymyšlené,
// zvolené tak, aby se daly počítat z hlavy; „testov“ ani „jinde“ ve skutečných datech není.
const DATA = {
  mesta: [
    {
      id: "testov",
      nazev: "Testov",
      //            led  úno  bře  dub  kvě  čvn  čvc  srp  zář  říj  lis  pro
      kWhNaKWpDen: [0.5, 0.9, 1.0, 2.0, 3.0, 4.0, 5.0, 4.5, 3.5, 2.5, 1.2, 0.4],
    },
    { id: "jinde", nazev: "Jinde", kWhNaKWpDen: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5] },
  ],
  vychoziZtraty: 0.8,
};

describe("G. sobestacnost", () => {
  // Q4 (rozhodnuto 16. 11. 2026, zadání „Obecně“): tabulka měst se předává jako pole `data` ve vstupu.
  const f = (v: unknown): Vysledek =>
    volej(sobestacnost, v !== null && typeof v === "object" ? { ...(v as object), data: DATA } : v);

  // Q2 (rozhodnuto 16. 11. 2026, zadání G): prubeh má délku dniSimulace, prubeh[d − 1] = konec dne d.
  const prubeh = (r: Vysledek, ocek: number[]): void => {
    expect(Array.isArray(r.prubeh), "prubeh je pole").toBe(true);
    expect(r.prubeh, "délka prubeh = dniSimulace").toHaveLength(ocek.length);
    ocek.forEach((p, i) => cislo(r.prubeh[i], p, `prubeh[${i}] (den ${i + 1})`));
  };
  // Q3 (rozhodnuto, zadání G): index měsíce kWhNaKWpDen[mesic − 1];
  // bilancePoMesicich[0] = leden … [11] = prosinec.
  const poMesicich = (r: Vysledek, ocek: number[]): void => {
    expect(r.bilancePoMesicich).toHaveLength(12);
    ocek.forEach((b, i) => cislo(r.bilancePoMesicich[i], b, `bilancePoMesicich[${i}]`));
  };
  // Q1 (rozhodnuto 16. 11. 2026, zadání G): coPomuze = [{ varianta, dnyBezPripojky, prinosDni }],
  // varianty BATERIE_100AH | PANELY_100WP | BOOSTER_10A (jen když jizda.hodinDenne > 0) | SPOTREBA_MINUS_10,
  // seřazené podle prinosDni sestupně, při shodě v pořadí zadání.
  // Q12: prinosDni = dnyBezPripojky(varianta) − dnyBezPripojky(základ), null = dniSimulace + 1.
  // Očekávání: [varianta, dnyBezPripojky varianty, prinosDni].
  const VARIANTA: Record<string, string> = {
    baterie: "BATERIE_100AH",
    panely: "PANELY_100WP",
    booster: "BOOSTER_10A",
    spotreba: "SPOTREBA_MINUS_10",
  };
  const coPomuze = (r: Vysledek, ocek: [string, number | null, number][]): void => {
    expect(Array.isArray(r.coPomuze), "coPomuze je pole").toBe(true);
    expect(r.coPomuze.map((x: Vysledek) => x.varianta)).toEqual(ocek.map((x) => VARIANTA[x[0]]));
    expect(r.coPomuze.map((x: Vysledek) => x.dnyBezPripojky)).toEqual(ocek.map((x) => x[1]));
    expect(r.coPomuze.map((x: Vysledek) => x.prinosDni)).toEqual(ocek.map((x) => x[2]));
  };

  // P-G1: 5 dní, přípojka každý 3. den, výchozí ztráty z tabulky (0,8).
  // Zadání G upravené 17. 11. 2026: boosterWhDen = proud × jizda.koeficient × hodiny × Unom (výchozí 0,7).
  // Starší příklady s boosterem (P-G1, P-G2, P-G6, hrany hlášek) mají zadaný koeficient 1, aby jejich
  // ručně spočítaná čísla platila beze změny; výchozí 0,7 a jiný zadaný koeficient testují P-G8 a P-G9.
  const G1 = {
    mesto: "testov",
    mesic: 4,
    panelyWp: 300,
    kapacitaAh: 100,
    napeti: 12,
    WhDenne: 1235.2,
    jizda: { hodinDenne: 1, proudBoosteruA: 5, koeficient: 1 },
    pripojkaKazdychDni: 3,
    dniSimulace: 5,
  };

  it("P-G1: duben, 300 Wp, booster 5 A × 1 h, 1 235,2 Wh/den, 100 Ah 12 V, přípojka každé 3 dny, 5 dní", () => {
    const r = f(G1);
    jeOk(r, []);
    cisla(r, { vyrobaWhDen: 480, boosterWhDen: 64, bilanceWhDen: -691.2, kapacitaWh: 1152 });
    // d1 1152 − 691,2 = 460,8 (40 %); d2 −230,4 → vybití, 0; d3 −691,2 → vybití, 0, přípojka → 100 %;
    // d4 40 %; d5 0 (vybití)
    prubeh(r, [40, 0, 100, 40, 0]);
    expect(r.dnyBezPripojky).toBe(1);
    expect(r.vydrzi).toBe(false);
    poMesicich(
      r,
      DATA.mesta[0]!.kWhNaKWpDen.map((k) => 240 * k - 1171.2),
    );
  });

  // Q2 (rozhodnuto 16. 11. 2026, zadání G): prubeh má délku dniSimulace, prubeh[d − 1] = konec dne d.
  it("Q2: prubeh má délku dniSimulace, prubeh[d − 1] je stav na konci dne d", () => {
    const r = f(G1);
    expect(r.prubeh).toHaveLength(5);
    [40, 0, 100, 40, 0].forEach((p, i) => cislo(r.prubeh[i], p, `prubeh[${i}] (den ${i + 1})`));
    expect(f({ ...G1, dniSimulace: undefined }).prubeh).toHaveLength(30);
  });

  // DOSLOVNÝ VÝKLAD (Q11): varianty se počítají se všemi ostatními vstupy stejnými, i s přípojkou.
  it("P-G1: co pomůže nejvíc s přípojkou: baterie +5 (vydrží), pak shoda panely / booster / spotřeba +1", () => {
    coPomuze(f(G1), [
      ["baterie", null, 5],
      ["panely", 2, 1],
      ["booster", 2, 1],
      ["spotreba", 2, 1],
    ]);
  });

  it("P-G2: bez přípojky (jinak jako G1): vybití 2. den, baterie +2, shoda tří variant +1 v pořadí zadání", () => {
    const r = f({ ...G1, pripojkaKazdychDni: 0 });
    jeOk(r, []);
    prubeh(r, [40, 0, 0, 0, 0]);
    expect(r.dnyBezPripojky).toBe(1);
    expect(r.vydrzi).toBe(false);
    coPomuze(r, [
      ["baterie", 3, 2],
      ["panely", 2, 1],
      ["booster", 2, 1],
      ["spotreba", 2, 1],
    ]);
  });

  it("P-G3: kladná bilance (červenec, 400 Wp, stínění 25 %, ztráty 0,9) → ořez na 100 %, vydrží, BILANCE_KLADNA", () => {
    const r = f({
      mesto: "testov",
      mesic: 7,
      panelyWp: 400,
      stineniProc: 25,
      ztratySystemu: 0.9,
      kapacitaAh: 200,
      napeti: 24,
      WhDenne: 1000,
      jizda: {},
      dniSimulace: 5,
    });
    jeOk(r, ["BILANCE_KLADNA"]);
    cisla(r, { vyrobaWhDen: 1350, boosterWhDen: 0, bilanceWhDen: 350, kapacitaWh: 4608 });
    prubeh(r, [100, 100, 100, 100, 100]);
    expect(r.dnyBezPripojky).toBeNull();
    expect(r.vydrzi).toBe(true);
    poMesicich(
      r,
      DATA.mesta[0]!.kWhNaKWpDen.map((k) => 270 * k - 1000),
    );
    // bez jízdy není varianta booster; všechny vydrží → 0 dní navíc, pořadí zadání
    coPomuze(r, [
      ["baterie", null, 0],
      ["panely", null, 0],
      ["spotreba", null, 0],
    ]);
  });

  it("P-G4: stav přesně 0 je den vybití (≤ 0): 24 V, 100 Ah, 100 %, bez panelů, 1 280 Wh/den, leden", () => {
    const r = f({
      mesto: "testov",
      mesic: 1,
      panelyWp: 0,
      kapacitaAh: 100,
      napeti: 24,
      vyuzitelnost: 1,
      WhDenne: 1280,
      jizda: {},
      dniSimulace: 3,
    });
    jeOk(r, ["ZIMA_MALO_SLUNCE"]);
    cisla(r, { vyrobaWhDen: 0, boosterWhDen: 0, bilanceWhDen: -1280, kapacitaWh: 2560 });
    prubeh(r, [50, 0, 0]);
    expect(r.dnyBezPripojky).toBe(1);
    expect(r.vydrzi).toBe(false);
    poMesicich(r, new Array(12).fill(-1280));
    coPomuze(r, [
      ["baterie", null, 3],
      ["panely", 2, 1],
      ["spotreba", 2, 1],
    ]);
  });

  it("P-G5: výchozí hodnoty (30 dní, využitelnost 0,9, bez stínění, bez přípojky, ztráty z tabulky)", () => {
    const r = f({ mesto: "testov", mesic: 4, panelyWp: 300, kapacitaAh: 100, napeti: 12, WhDenne: 580, jizda: {} });
    jeOk(r, []);
    cisla(r, { vyrobaWhDen: 480, boosterWhDen: 0, bilanceWhDen: -100, kapacitaWh: 1152 });
    // stav = 1152 − 100 d; d = 11: 52 Wh; d = 12: −48 → vybití
    prubeh(r, [
      ...Array.from({ length: 11 }, (_, i) => ((1152 - 100 * (i + 1)) / 1152) * 100),
      ...new Array(19).fill(0),
    ]);
    expect(r.dnyBezPripojky).toBe(11);
    expect(r.vydrzi).toBe(false);
    // panely +100 Wp → bilance +60 → vydrží (31 − 11 = 20); spotřeba 522 → 27 (+16); baterie 2 304 Wh → 23 (+12)
    coPomuze(r, [
      ["panely", null, 20],
      ["spotreba", 27, 16],
      ["baterie", 23, 12],
    ]);
  });

  it("P-G6: pořadí jiné než v zadání a shoda uprostřed: booster +9, baterie +4, panely +4, spotřeba +1", () => {
    const r = f({
      mesto: "testov",
      mesic: 4,
      panelyWp: 200,
      kapacitaAh: 50,
      napeti: 12,
      WhDenne: 700,
      jizda: { hodinDenne: 2, proudBoosteruA: 5, koeficient: 1 },
      dniSimulace: 10,
    });
    jeOk(r, []);
    cisla(r, { vyrobaWhDen: 320, boosterWhDen: 128, bilanceWhDen: -252, kapacitaWh: 576 });
    prubeh(r, [56.25, 12.5, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(r.dnyBezPripojky).toBe(2);
    coPomuze(r, [
      ["booster", null, 9],
      ["baterie", 6, 4],
      ["panely", 6, 4],
      ["spotreba", 3, 1],
    ]);
  });

  it("P-G7: vybití hned 1. den → dnyBezPripojky 0; druhé město z tabulky (jinde, 1,5 kWh/kWp)", () => {
    const r = f({ mesto: "jinde", mesic: 2, panelyWp: 500, kapacitaAh: 50, napeti: 12, WhDenne: 2000, jizda: {}, dniSimulace: 4 });
    jeOk(r, []);
    cisla(r, { vyrobaWhDen: 600, bilanceWhDen: -1400, kapacitaWh: 576 });
    prubeh(r, [0, 0, 0, 0]);
    expect(r.dnyBezPripojky).toBe(0);
    expect(r.vydrzi).toBe(false);
    poMesicich(r, new Array(12).fill(-1400));
    coPomuze(r, [
      ["baterie", 1, 1],
      ["panely", 0, 0],
      ["spotreba", 0, 0],
    ]);
  });

  it("BILANCE_KLADNA: bilance přesně 0 ano (booster 10 A × 1 h × 12,8 = 128 Wh = spotřeba), o chlup záporná ne", () => {
    const zakl = { mesto: "testov", mesic: 4, panelyWp: 0, kapacitaAh: 100, napeti: 12, jizda: { hodinDenne: 1, proudBoosteruA: 10, koeficient: 1 }, dniSimulace: 5 };
    const r = f({ ...zakl, WhDenne: 128 });
    jeOk(r, ["BILANCE_KLADNA"]);
    cislo(r.bilanceWhDen, 0, "bilanceWhDen");
    prubeh(r, [100, 100, 100, 100, 100]);
    expect(r.vydrzi).toBe(true);
    expect(r.dnyBezPripojky).toBeNull();
    const r2 = f({ ...zakl, WhDenne: 128.000001 });
    jeOk(r2, []);
    expect(r2.vydrzi).toBe(true);
  });

  it("ZIMA_MALO_SLUNCE: kWhNaKWpDen < 1 (leden 0,5, únor 0,9, prosinec 0,4) ano; březen 1,0 a listopad 1,2 ne", () => {
    const zakl = { mesto: "testov", panelyWp: 300, kapacitaAh: 100, napeti: 12, WhDenne: 2000, jizda: {}, dniSimulace: 3 };
    for (const m of [1, 2, 12]) jeOk(f({ ...zakl, mesic: m }), ["ZIMA_MALO_SLUNCE"]);
    for (const m of [3, 11]) jeOk(f({ ...zakl, mesic: m }), []);
  });

  it("obě hlášky najednou: zima a kladná bilance (jízda pokryje spotřebu)", () => {
    const r = f({
      mesto: "testov",
      mesic: 12,
      panelyWp: 100,
      kapacitaAh: 100,
      napeti: 12,
      WhDenne: 200,
      jizda: { hodinDenne: 2, proudBoosteruA: 10, koeficient: 1 },
      dniSimulace: 3,
    });
    // výroba 0,1 × 0,4 × 1000 × 0,8 = 32; booster 256; bilance 88
    jeOk(r, ["ZIMA_MALO_SLUNCE", "BILANCE_KLADNA"]);
    cisla(r, { vyrobaWhDen: 32, boosterWhDen: 256, bilanceWhDen: 88 });
  });

  it("vydrzi a dnyBezPripojky při přípojce, která vybití předejde (každý 2. den, 2 dny by vydržela)", () => {
    // K = 1152, bilance −500: d1 652, d2 152 → přípojka 1152; d3 652, d4 152 → 1152 …
    const r = f({ mesto: "testov", mesic: 4, panelyWp: 0, kapacitaAh: 100, napeti: 12, WhDenne: 500, jizda: {}, pripojkaKazdychDni: 2, dniSimulace: 5 });
    jeOk(r, []);
    prubeh(r, [652 / 11.52, 100, 652 / 11.52, 100, 652 / 11.52]);
    expect(r.dnyBezPripojky).toBeNull();
    expect(r.vydrzi).toBe(true);
  });

  it("P-G8: výchozí koeficient boosteru 0,7: 10 A × 2 h → 179,2 Wh; bilance −200; vybití 6. den; co pomůže", () => {
    const r = f({
      mesto: "testov",
      mesic: 4,
      panelyWp: 0,
      kapacitaAh: 100,
      napeti: 12,
      WhDenne: 379.2,
      jizda: { hodinDenne: 2, proudBoosteruA: 10 },
      dniSimulace: 10,
    });
    jeOk(r, []);
    cisla(r, { vyrobaWhDen: 0, boosterWhDen: 179.2, bilanceWhDen: -200, kapacitaWh: 1152 });
    // stav = 1152 − 200 d: d5 152 Wh, d6 −48 → vybití
    prubeh(r, [
      ...Array.from({ length: 5 }, (_, i) => ((1152 - 200 * (i + 1)) / 1152) * 100),
      ...new Array(5).fill(0),
    ]);
    expect(r.dnyBezPripojky).toBe(5);
    expect(r.vydrzi).toBe(false);
    poMesicich(r, new Array(12).fill(-200));
    // baterie 2 304 − 2 000 > 0 → vydrží (+6); panely +160 → −40 → vydrží (+6);
    // booster 20 A × 0,7 × 2 × 12,8 = 358,4 → −20,8 → vydrží (+6); spotřeba 341,28 → −162,08 → 7 (+2)
    coPomuze(r, [
      ["baterie", null, 6],
      ["panely", null, 6],
      ["booster", null, 6],
      ["spotreba", 7, 2],
    ]);
  });

  it("P-G9: zadaný koeficient 0,5: booster 128 Wh, bilance −251,2; varianta booster +10 A drží zadaný koeficient", () => {
    const r = f({
      mesto: "testov",
      mesic: 4,
      panelyWp: 0,
      kapacitaAh: 100,
      napeti: 12,
      WhDenne: 379.2,
      jizda: { hodinDenne: 2, proudBoosteruA: 10, koeficient: 0.5 },
      dniSimulace: 10,
    });
    jeOk(r, []);
    cisla(r, { boosterWhDen: 128, bilanceWhDen: -251.2 });
    // d4 147,2 Wh, d5 → vybití
    expect(r.dnyBezPripojky).toBe(4);
    poMesicich(r, new Array(12).fill(-251.2));
    // panely +160 → −91,2 → vydrží (+7); baterie 2 304 − 251,2 × 9 = 43,2, d10 vybití → 9 (+5);
    // booster 20 × 0,5 × 2 × 12,8 = 256 → −123,2: 1 152 − 123,2 × 9 = 43,2 → 9 (+5);
    // (s koeficientem 0,7 by varianta booster vyšla 358,4 → vydrží → +7);
    // spotřeba 341,28 → −213,28 → 5 (+1)
    coPomuze(r, [
      ["panely", null, 7],
      ["baterie", 9, 5],
      ["booster", 9, 5],
      ["spotreba", 5, 1],
    ]);
  });

  it("koeficient boosteru: 1 → plný proud (G1: 64 Wh), 0,3 → 19,2 Wh; výchozí (chybí) → 44,8 Wh", () => {
    cisla(f(G1), { boosterWhDen: 64, bilanceWhDen: -691.2 });
    cisla(f(nastav(G1, "jizda.koeficient", 0.3)), { boosterWhDen: 19.2, bilanceWhDen: 480 + 19.2 - 1235.2 });
    cisla(f(nastav(G1, "jizda.koeficient", SMAZAT)), { boosterWhDen: 44.8, bilanceWhDen: 480 + 44.8 - 1235.2 });
  });

  it("neznámé nebo chybějící město → NEPLATNY_VSTUP (pole mesto)", () => {
    for (const m of ["praha-neexistuje", "", 5, SMAZAT]) jeChyba(f(nastav(G1, "mesto", m)), "mesto");
  });

  it("mesic: 1 a 12 platné, 0, 13, NaN, text, chybí → NEPLATNY_VSTUP (pole mesic)", () => {
    expect(f({ ...G1, mesic: 1 })?.stav).toBe("ok");
    expect(f({ ...G1, mesic: 12 })?.stav).toBe("ok");
    for (const m of [0, 13, -1, NaN, Infinity, "4", SMAZAT]) jeChyba(f(nastav(G1, "mesic", m)), "mesic");
  });

  testyNapeti("sobestacnost", f, G1);
  testyNesmyslu("sobestacnost", sobestacnost);
  testyRozsahu("sobestacnost", f, G1, [
    { cesta: "panelyWp", min: 0, max: 5000, povinne: true },
    { cesta: "stineniProc", min: 0, max: 90 },
    { cesta: "ztratySystemu", min: 0.5, max: 1 },
    { cesta: "kapacitaAh", min: 10, max: 2000, povinne: true },
    { cesta: "WhDenne", min: 1, max: 50000, povinne: true },
    { cesta: "pripojkaKazdychDni", min: 0, max: 30 },
    { cesta: "jizda.koeficient", min: 0.3, max: 1 },
  ]);
  testyBezRozsahu(
    "sobestacnost",
    f,
    G1,
    [{ cesta: "vyuzitelnost" }, { cesta: "jizda.hodinDenne" }, { cesta: "jizda.proudBoosteruA" }, { cesta: "dniSimulace" }],
    ["kapacitaWh", "vyrobaWhDen", "boosterWhDen"],
  );
});
