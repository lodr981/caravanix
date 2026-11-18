// Akceptační testy doplňků po revizi kalkulaček podle docs/KALKULACKY_ALFA.md, kapitola I (body 1–7,
// Radek 18. 11. 2026). Psáno ze ZADÁNÍ: všechno jsou nové volitelné vstupy a výstupy; bez nich se dosavadní
// výsledky a hlášky nemění. Chyba = { stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole }, žádná výjimka.
// Hranice s desetinnými čísly se testují těsně pod a těsně nad mezí (přesná rovnost v plovoucí čárce
// jen tam, kde je výsledek celočíselně přesný). Tolerance 1e-9.

import { describe, expect, it } from "vitest";
import {
  bilanceSpotrebicu,
  FUSES,
  kolikUvarim,
  nabitiZJizdy,
  navrhMenice,
  navrhSchematu,
  navrhVodice,
  navrhZapojeni,
  ohrevVody,
  sobestacnost,
  zapojeniPanelu,
} from "../src/index.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const call = (f: unknown) => (v: unknown): Any => {
  let r: Any;
  expect(() => (r = (f as (x: unknown) => Any)(v))).not.toThrow();
  return r;
};
const bil = call(bilanceSpotrebicu);
const var_ = call(kolikUvarim);
const men = call(navrhMenice);
const jiz = call(nabitiZJizdy);
const pan = call(zapojeniPanelu);
const sob = call(sobestacnost);
const zap = call(navrhZapojeni);

const ok = (r: Any) => {
  expect(r.stav, JSON.stringify(r)).toBe("ok");
  return r;
};
const chyba = (r: Any, pole: string) => {
  expect(r.stav, JSON.stringify(r)).toBe("chyba");
  expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
  expect(r.pole).toBe(pole);
};
const blizko = (a: number, b: number) => expect(Math.abs(a - b), `${a} ≈ ${b}`).toBeLessThan(1e-9);
/** Vrátí objekt jen s danými klíči (dosavadní výstupy) pro porovnání zpětné kompatibility. */
const vyber = (r: Any, klice: string[]) => Object.fromEntries(klice.map((k) => [k, r[k]]));

// =============================================================================================
// 1. bilanceSpotrebicu
// =============================================================================================
describe("I1 bilanceSpotrebicu: vaření a BMS", () => {
  const ZAKLAD = { napeti: 12, polozky: [{ prikonW: 60, hodinDenne: 10, na230V: false }] };
  const STARE = ["polozky", "WhDenne", "AhDenne", "proudSoucasne", "vykon230V", "hlasky"];

  it("WhVareniDenne 400 → WhVareni 400, WhDenneCelkem 1000, AhDenneCelkem 1000/12,8", () => {
    const r = ok(bil({ ...ZAKLAD, WhVareniDenne: 400 }));
    blizko(r.WhDenne, 600);
    blizko(r.WhVareni, 400);
    blizko(r.WhDenneCelkem, 1000);
    blizko(r.AhDenneCelkem, 1000 / 12.8);
  });

  it("24 V: AhDenneCelkem dělí 25,6", () => {
    const r = ok(bil({ ...ZAKLAD, napeti: 24, WhVareniDenne: 400 }));
    blizko(r.AhDenneCelkem, 1000 / 25.6);
  });

  it("bez vstupů: WhVareni 0, celkem = WhDenne, nadBms false, dosavadní pole beze změny", () => {
    const bez = ok(bil(ZAKLAD));
    expect(bez.WhVareni).toBe(0);
    blizko(bez.WhDenneCelkem, bez.WhDenne);
    blizko(bez.AhDenneCelkem, bez.AhDenne);
    expect(bez.nadBms).toBe(false);
    const s = ok(bil({ ...ZAKLAD, WhVareniDenne: 5000, maxProudBmsA: 1 }));
    expect(vyber(s, STARE)).toEqual(vyber(bez, STARE));
    expect(s.hlasky).toEqual(bez.hlasky);
  });

  it("nadBms: proud 60/12,8 = 4,6875 A; mez 4,69 → false, 4,68 → true", () => {
    expect(ok(bil({ ...ZAKLAD, maxProudBmsA: 4.69 })).nadBms).toBe(false);
    expect(ok(bil({ ...ZAKLAD, maxProudBmsA: 4.68 })).nadBms).toBe(true);
    expect(ok(bil({ ...ZAKLAD, maxProudBmsA: 1000 })).nadBms).toBe(false);
  });

  it("rozsahy WhVareniDenne 0–50 000 a maxProudBmsA 1–1000", () => {
    ok(bil({ ...ZAKLAD, WhVareniDenne: 0 }));
    ok(bil({ ...ZAKLAD, WhVareniDenne: 50000 }));
    for (const x of [-1, 50000.01, Number.NaN, Infinity, "100", null]) chyba(bil({ ...ZAKLAD, WhVareniDenne: x }), "WhVareniDenne");
    ok(bil({ ...ZAKLAD, maxProudBmsA: 1 }));
    for (const x of [0, 0.99, 1000.01, -5, Number.NaN, "50", null]) chyba(bil({ ...ZAKLAD, maxProudBmsA: x }), "maxProudBmsA");
  });
});

// =============================================================================================
// 2. kolikUvarim
// =============================================================================================
describe("I2 kolikUvarim: účinnost vaření, jídla denně, proud", () => {
  const ZAKLAD = { kapacitaAh: 100, napeti: 12, prikonW: 1000, minutNaJidlo: 15 };
  const STARE = ["WhVyuzitelne", "WhNaJidlo", "jidel", "litruVody", "hodinChodu", "hlasky"];

  it("ucinnostVareni 0,5 → litruVodyZadane = WhVyuzitelne / ohrevVody(1 l, 0,5, 0,9).WhZBaterie", () => {
    const r = ok(var_({ ...ZAKLAD, ucinnostVareni: 0.5 }));
    blizko(r.WhVyuzitelne, 1152);
    const litr = ok(ohrevVody({ litry: 1, ucinnostVareni: 0.5, ucinnostMenice: 0.9 }));
    blizko(r.litruVodyZadane, 1152 / litr.WhZBaterie);
    // ručně: 1 l z 15 na 100 °C = 4,186 × 85 / 3,6 Wh tepla, ÷ (0,5 × 0,9)
    blizko(r.litruVodyZadane, 1152 / ((4.186 * 85) / 3.6 / 0.45));
  });

  it("ucinnostMenice 0,8 se promítne do litruVodyZadane, litruVody zůstává na výchozích účinnostech", () => {
    const bez = ok(var_(ZAKLAD));
    const r = ok(var_({ ...ZAKLAD, ucinnostMenice: 0.8, ucinnostVareni: 0.6 }));
    const litr = ok(ohrevVody({ litry: 1, ucinnostVareni: 0.6, ucinnostMenice: 0.8 }));
    blizko(r.litruVodyZadane, r.WhVyuzitelne / litr.WhZBaterie);
    blizko(r.litruVody, bez.litruVody);
  });

  it("jidelDenne 3 → WhVareniDenne = 3 × WhNaJidlo (1000 × 15/60/0,9)", () => {
    const r = ok(var_({ ...ZAKLAD, jidelDenne: 3 }));
    blizko(r.WhNaJidlo, (1000 * 15) / 60 / 0.9);
    blizko(r.WhVareniDenne, (3 * 1000 * 15) / 60 / 0.9);
  });

  it("proudVareni = prikonW / ucinnostMenice / Unom (12 i 24 V)", () => {
    blizko(ok(var_(ZAKLAD)).proudVareni, 1000 / 0.9 / 12.8);
    blizko(ok(var_({ ...ZAKLAD, napeti: 24, ucinnostMenice: 0.8 })).proudVareni, 1000 / 0.8 / 25.6);
  });

  it("bez vstupů: WhVareniDenne 0, litruVodyZadane = litruVody, dosavadní pole a hlášky beze změny", () => {
    const bez = ok(var_(ZAKLAD));
    expect(bez.WhVareniDenne).toBe(0);
    blizko(bez.litruVodyZadane, bez.litruVody);
    const s = ok(var_({ ...ZAKLAD, ucinnostVareni: 0.3, jidelDenne: 20 }));
    expect(vyber(s, STARE)).toEqual(vyber(bez, STARE));
  });

  it("rozsahy ucinnostVareni 0,3–1 a jidelDenne 0–20", () => {
    ok(var_({ ...ZAKLAD, ucinnostVareni: 0.3 }));
    ok(var_({ ...ZAKLAD, ucinnostVareni: 1 }));
    for (const x of [0.29, 1.01, 0, -1, Number.NaN, "0.8", null]) chyba(var_({ ...ZAKLAD, ucinnostVareni: x }), "ucinnostVareni");
    ok(var_({ ...ZAKLAD, jidelDenne: 0 }));
    ok(var_({ ...ZAKLAD, jidelDenne: 20 }));
    for (const x of [-1, 20.01, 1e9, Number.NaN, "3", null]) chyba(var_({ ...ZAKLAD, jidelDenne: x }), "jidelDenne");
  });
});

// =============================================================================================
// 3. navrhMenice
// =============================================================================================
describe("I3 navrhMenice: model porad-jeden, BMS, mez kabelu", () => {
  it("pořád 100 W (rozběh 3) + velké 1000 W a 700 W (rozběh 2): trvalý 1100, špička 1500", () => {
    const r = ok(
      men({
        napeti: 12,
        model: "porad-jeden",
        spotrebice: [
          { prikonW: 100, rozbehNasobek: 3, porad: true },
          { prikonW: 1000, porad: false },
          { prikonW: 700, rozbehNasobek: 2, porad: false },
        ],
      }),
    );
    blizko(r.trvalyVykonW, 1100);
    // max(100 × 2 = 200, 1000 × 1 − 1000 = 0, 700 × 2 − 1000 = 400) = 400
    blizko(r.spickaW, 1500);
    blizko(r.proudZBaterie, 1100 / 0.9 / 12.8);
  });

  it("rozběh největšího velkého: 1000 W × 2 − 1000 = 1000 → špička 2100", () => {
    const r = ok(
      men({
        napeti: 12,
        model: "porad-jeden",
        spotrebice: [
          { prikonW: 100, rozbehNasobek: 3 },
          { prikonW: 1000, rozbehNasobek: 2, porad: false },
          { prikonW: 700, rozbehNasobek: 2, porad: false },
        ],
      }),
    );
    blizko(r.trvalyVykonW, 1100);
    blizko(r.spickaW, 2100);
  });

  it("porad výchozí true: bez velkých je trvalý součet, špička součet + největší rozběhový nárůst", () => {
    const r = ok(men({ napeti: 24, model: "porad-jeden", spotrebice: [{ prikonW: 200, rozbehNasobek: 2 }, { prikonW: 50, rozbehNasobek: 5 }] }));
    blizko(r.trvalyVykonW, 250);
    blizko(r.spickaW, 250 + 200);
  });

  it("jen velké spotřebiče: trvalý = největší, ne součet", () => {
    const r = ok(men({ napeti: 12, model: "porad-jeden", spotrebice: [{ prikonW: 1500, porad: false }, { prikonW: 2000, porad: false }] }));
    blizko(r.trvalyVykonW, 2000);
    blizko(r.spickaW, 2000);
  });

  it("bez modelu: příznak porad nemá vliv, dosavadní výstupy i hlášky beze změny", () => {
    const sp = [
      { prikonW: 100, rozbehNasobek: 3 },
      { prikonW: 1000, rozbehNasobek: 2 },
    ];
    const bez = ok(men({ napeti: 12, spotrebice: sp }));
    const s = ok(men({ napeti: 12, spotrebice: sp.map((x) => ({ ...x, porad: false })), maxProudBmsA: 1000 }));
    const STARE = ["trvalyVykonW", "spickaW", "proudZBaterie", "WhNaprazdno", "hlasky"];
    expect(vyber(s, STARE)).toEqual(vyber(bez, STARE));
    blizko(bez.trvalyVykonW, 1100);
    expect(bez.nadBms).toBe(false);
  });

  it("nadBms: proud 1100/0,9/12,8 ≈ 95,49 A; mez 95,5 → false, 95,4 → true", () => {
    const sp = [{ prikonW: 1100 }];
    expect(ok(men({ napeti: 12, spotrebice: sp, maxProudBmsA: 95.5 })).nadBms).toBe(false);
    expect(ok(men({ napeti: 12, spotrebice: sp, maxProudBmsA: 95.4 })).nadBms).toBe(true);
  });

  it("nadMezKabelu: proud > 200 A (12 V, účinnost 1: 2559 W false, 2561 W true)", () => {
    expect(ok(men({ napeti: 12, ucinnostMenice: 1, spotrebice: [{ prikonW: 2559 }] })).nadMezKabelu).toBe(false);
    expect(ok(men({ napeti: 12, ucinnostMenice: 1, spotrebice: [{ prikonW: 2561 }] })).nadMezKabelu).toBe(true);
    expect(ok(men({ napeti: 24, ucinnostMenice: 1, spotrebice: [{ prikonW: 2561 }] })).nadMezKabelu).toBe(false);
  });

  it("rozsah maxProudBmsA 1–1000", () => {
    ok(men({ napeti: 12, spotrebice: [{ prikonW: 100 }], maxProudBmsA: 1 }));
    for (const x of [0, 1000.5, -1, Number.NaN, "100", null]) chyba(men({ napeti: 12, spotrebice: [{ prikonW: 100 }], maxProudBmsA: x }), "maxProudBmsA");
  });
});

// =============================================================================================
// 4. nabitiZJizdy
// =============================================================================================
describe("I4 nabitiZJizdy: napětí vozu, alternátor, nabíjecí proud, podíl spotřeby", () => {
  const ZAKLAD = { napeti: 12, proudBoosteruA: 20, hodinJizdyDenne: 2 };

  it("24 V obytná, 12 V vůz, 20 A → vstupní proud 20 × 24 / 12 × 1,1 = 44 A", () => {
    blizko(ok(jiz({ ...ZAKLAD, napeti: 24, napetiVozu: 12 })).vstupniProudA, 44);
  });
  it("12 V obytná, 24 V vůz → 20 × 12 / 24 × 1,1 = 11 A", () => {
    blizko(ok(jiz({ ...ZAKLAD, napetiVozu: 24 })).vstupniProudA, 11);
  });

  it("nadAlternator: 44 A proti 90 A × 0,5 = 45 → false; 85 A × 0,5 = 42,5 → true; podíl 0,4 × 100 → true", () => {
    const v = { ...ZAKLAD, napeti: 24, napetiVozu: 12 };
    expect(ok(jiz({ ...v, alternatorA: 90 })).nadAlternator).toBe(false);
    expect(ok(jiz({ ...v, alternatorA: 85 })).nadAlternator).toBe(true);
    expect(ok(jiz({ ...v, alternatorA: 100, podilAlternatoru: 0.4 })).nadAlternator).toBe(true);
    expect(ok(jiz({ ...v, alternatorA: 100, podilAlternatoru: 0.45 })).nadAlternator).toBe(false);
    expect(ok(jiz({ ...v, alternatorA: 100, podilAlternatoru: 0.45, napetiVozu: 24 })).nadAlternator).toBe(false);
  });

  it("nadNabijeci: proud 20 > mez; 20 → false, 19,9 → true", () => {
    expect(ok(jiz({ ...ZAKLAD, maxNabijeciA: 20 })).nadNabijeci).toBe(false);
    expect(ok(jiz({ ...ZAKLAD, maxNabijeciA: 19.9 })).nadNabijeci).toBe(true);
  });

  it("podilSpotrebyProc = WhDenne / spotrebaWhDen × 100 (20 × 0,7 × 2 × 12,8 = 358,4 Wh; spotřeba 716,8 → 50 %)", () => {
    const r = ok(jiz({ ...ZAKLAD, spotrebaWhDen: 716.8 }));
    blizko(r.WhDenne, 358.4);
    blizko(r.podilSpotrebyProc, 50);
  });

  it("bez vstupů: vstupní proud = proud × 1,1, příznaky false, podíl null, dosavadní pole a hlášky beze změny", () => {
    const bez = ok(jiz({ ...ZAKLAD, kapacitaAh: 100, startProc: 50 }));
    blizko(bez.vstupniProudA, 22);
    expect(bez.nadAlternator).toBe(false);
    expect(bez.nadNabijeci).toBe(false);
    expect(bez.podilSpotrebyProc).toBeNull();
    const s = ok(jiz({ ...ZAKLAD, kapacitaAh: 100, startProc: 50, napetiVozu: 24, alternatorA: 20, podilAlternatoru: 0.1, maxNabijeciA: 1, spotrebaWhDen: 100 }));
    const STARE = ["AhDenne", "WhDenne", "naivniAh", "prumernyProudA", "konecProc", "hlasky"];
    expect(vyber(s, STARE)).toEqual(vyber(bez, STARE));
  });

  it("rozsahy napetiVozu 12/24, alternatorA 20–500, podilAlternatoru 0,1–1", () => {
    for (const x of [0, 48, 13, "12", null]) chyba(jiz({ ...ZAKLAD, napetiVozu: x }), "napetiVozu");
    ok(jiz({ ...ZAKLAD, alternatorA: 20 }));
    ok(jiz({ ...ZAKLAD, alternatorA: 500 }));
    for (const x of [19.9, 500.1, -1, Number.NaN, "90"]) chyba(jiz({ ...ZAKLAD, alternatorA: x }), "alternatorA");
    ok(jiz({ ...ZAKLAD, alternatorA: 100, podilAlternatoru: 0.1 }));
    ok(jiz({ ...ZAKLAD, alternatorA: 100, podilAlternatoru: 1 }));
    for (const x of [0.09, 1.01, 0, Number.NaN, "0.5"]) chyba(jiz({ ...ZAKLAD, alternatorA: 100, podilAlternatoru: x }), "podilAlternatoru");
  });

  it("ošklivé maxNabijeciA a spotrebaWhDen (záporné, nula, text) → NEPLATNY_VSTUP", () => {
    for (const x of [-5, 0, Number.NaN, "20"]) chyba(jiz({ ...ZAKLAD, maxNabijeciA: x }), "maxNabijeciA");
    for (const x of [-5, 0, Number.NaN, "500"]) chyba(jiz({ ...ZAKLAD, spotrebaWhDen: x }), "spotrebaWhDen");
  });
});

// =============================================================================================
// 5. zapojeniPanelu
// =============================================================================================
describe("I5 zapojeniPanelu: nabíjecí proud regulátoru a rozdíl napětí", () => {
  const panel = { Voc: 22, Isc: 6, Vmp: 18, Imp: 5.5, Wp: 100, koefVocProcNaK: -0.3 };
  const ZAKLAD = { panel, serie: 2, paralel: 2, regulator: { maxVstupV: 100, maxVstupA: 30 } };
  const reg = (x: Record<string, unknown>) => ({ ...ZAKLAD.regulator, ...x });

  it("400 Wp, regulátor 30 A při 12 V → maxWp 384, omezí; 40 A → 512, neomezí", () => {
    const r = ok(pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: 30 }) }));
    blizko(r.maxWpRegulatoru, 30 * 12.8);
    expect(r.regulatorOmezi).toBe(true);
    const r2 = ok(pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: 40 }) }));
    blizko(r2.maxWpRegulatoru, 512);
    expect(r2.regulatorOmezi).toBe(false);
  });

  it("napeti 24: 15 A → 384 Wp (omezí), 16 A → 409,6 Wp (neomezí)", () => {
    const r = ok(pan({ ...ZAKLAD, napeti: 24, regulator: reg({ nabijeciProudA: 15 }) }));
    blizko(r.maxWpRegulatoru, 384);
    expect(r.regulatorOmezi).toBe(true);
    expect(ok(pan({ ...ZAKLAD, napeti: 24, regulator: reg({ nabijeciProudA: 16 }) })).regulatorOmezi).toBe(false);
  });

  it("hranice omezení: 31,25 A × 12,8 ≈ 400 Wp; 31,3 A → false, 31,2 A → true", () => {
    expect(ok(pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: 31.3 }) })).regulatorOmezi).toBe(false);
    expect(ok(pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: 31.2 }) })).regulatorOmezi).toBe(true);
  });

  it("vmpNizke: 1 panel v sérii Vmp 18 V; rozdíl 5 V (17,8) → false, 5,5 V (18,3) → true; 24 V → true", () => {
    const v = { ...ZAKLAD, serie: 1, paralel: 1 };
    expect(ok(pan({ ...v, regulator: reg({ minRozdilV: 5 }) })).vmpNizke).toBe(false);
    expect(ok(pan({ ...v, regulator: reg({ minRozdilV: 5.5 }) })).vmpNizke).toBe(true);
    expect(ok(pan({ ...v, napeti: 24, regulator: reg({ minRozdilV: 1 }) })).vmpNizke).toBe(true);
    expect(ok(pan({ ...v, serie: 2, napeti: 24, regulator: reg({ minRozdilV: 5 }) })).vmpNizke).toBe(false);
  });

  it("bez vstupů: maxWp null, omezení a vmpNizke false, dosavadní výstupy a hlášky beze změny", () => {
    const bez = ok(pan(ZAKLAD));
    expect(bez.maxWpRegulatoru).toBeNull();
    expect(bez.regulatorOmezi).toBe(false);
    expect(bez.vmpNizke).toBe(false);
    const s = ok(pan({ ...ZAKLAD, napeti: 24, regulator: reg({ nabijeciProudA: 1, minRozdilV: 100 }) }));
    const STARE = ["VocMraz", "VmpPole", "IscPole", "ImpPole", "WpPole", "blok", "hlasky"];
    expect(vyber(s, STARE)).toEqual(vyber(bez, STARE));
    // napeti výchozí 12
    blizko(ok(pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: 10 }) })).maxWpRegulatoru, 128);
  });

  it("ošklivé vstupy: napeti 48, nabijeciProudA záporný/text", () => {
    for (const x of [48, 0, "12", null]) chyba(pan({ ...ZAKLAD, napeti: x }), "napeti");
    for (const x of [-1, 0, Number.NaN, "30"]) {
      const r = pan({ ...ZAKLAD, regulator: reg({ nabijeciProudA: x }) });
      expect(r.stav).toBe("chyba");
      expect(r.pole).toContain("nabijeciProudA");
    }
  });
});

// =============================================================================================
// 6. sobestacnost
// =============================================================================================
describe("I6 sobestacnost: potřeba Wp, prázdné dny, upozornění, přesné dny, 3 dny bez slunce, změna bilance", () => {
  // Praha: červen 5,4; září 3,2; prosinec 0,6 kWh/kWp/den; ztráty výchozí 0,7.
  const ZAKLAD = { mesto: "praha", mesic: 6, panelyWp: 200, kapacitaAh: 100, napeti: 12, WhDenne: 1000 };
  const mesta = (hodnoty: number[]) => ({ vychoziZtraty: 0.7, mesta: [{ id: "x", nazev: "X", kWhNaKWpDen: hodnoty }] });

  it("potrebaWp: 1000 / (5,4 × 0,7); sezóna podle září 3,2; rok podle prosince 0,6", () => {
    const r = ok(sob(ZAKLAD));
    blizko(r.potrebaWp, 1000 / (5.4 * 0.7));
    blizko(r.potrebaWpSezona, 1000 / (3.2 * 0.7));
    blizko(r.potrebaWpRok, 1000 / (0.6 * 0.7));
  });

  it("potrebaWp odečte booster: 2 h × 5 A × 0,7 × 12,8 = 89,6 Wh", () => {
    const r = ok(sob({ ...ZAKLAD, jizda: { hodinDenne: 2, proudBoosteruA: 5 } }));
    blizko(r.potrebaWp, (1000 - 89.6) / (5.4 * 0.7));
  });

  it("potrebaWp 0, když spotřebu pokryje jízda (booster 1792 Wh ≥ 1000 Wh)", () => {
    const r = ok(sob({ ...ZAKLAD, jizda: { hodinDenne: 10, proudBoosteruA: 20 } }));
    expect(r.potrebaWp).toBe(0);
    expect(r.potrebaWpSezona).toBe(0);
    expect(r.potrebaWpRok).toBe(0);
  });

  it("potrebaWp ∞, když je výroba v měsíci 0", () => {
    const d = mesta([0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0]);
    const r = ok(sob({ ...ZAKLAD, mesto: "x", mesic: 1, data: d }));
    expect(r.potrebaWp).toBe(Number.POSITIVE_INFINITY);
    expect(r.potrebaWpRok).toBe(Number.POSITIVE_INFINITY);
    blizko(r.potrebaWpSezona, 1000 / (2 * 0.7)); // nejhorší duben–září: duben i září 2
  });

  it("dnyPresne = kapacita / schodek: 1152 / (1000 − 756) ≈ 4,72; dnuPrazdna = dny 5–30 = 26", () => {
    const r = ok(sob(ZAKLAD));
    blizko(r.kapacitaWh, 1152);
    blizko(r.bilanceWhDen, 756 - 1000);
    blizko(r.dnyPresne, 1152 / 244);
    expect(r.dnuPrazdna).toBe(26);
  });

  it("kladná bilance: dnyPresne null, dnuPrazdna 0", () => {
    const r = ok(sob({ ...ZAKLAD, WhDenne: 500 }));
    expect(r.dnyPresne).toBeNull();
    expect(r.dnuPrazdna).toBe(0);
  });

  it("stavPo3DnechBezSlunceProc: 1000 Wh/den → 0 %; 300 Wh/den → (1152 − 900)/1152 = 21,875 %; s boosterem 89,6", () => {
    expect(ok(sob(ZAKLAD)).stavPo3DnechBezSlunceProc).toBe(0);
    blizko(ok(sob({ ...ZAKLAD, WhDenne: 300 })).stavPo3DnechBezSlunceProc, 21.875);
    blizko(ok(sob({ ...ZAKLAD, WhDenne: 300, jizda: { hodinDenne: 2, proudBoosteruA: 5 } })).stavPo3DnechBezSlunceProc, ((1152 - 3 * (300 - 89.6)) / 1152) * 100);
    blizko(ok(sob({ ...ZAKLAD, WhDenne: 50, jizda: { hodinDenne: 2, proudBoosteruA: 5 } })).stavPo3DnechBezSlunceProc, 100);
  });

  it("upozornění: listopad (0,9) MALO_SLUNCE + MRAZ, únor (1,6) jen MRAZ, březen a říjen nic navíc", () => {
    const u = (mesic: number) => [...ok(sob({ ...ZAKLAD, mesic })).upozorneni].sort();
    expect(u(11)).toEqual(["MALO_SLUNCE", "MRAZ"]);
    expect(u(12)).toEqual(["MALO_SLUNCE", "MRAZ"]);
    expect(u(1)).toEqual(["MALO_SLUNCE", "MRAZ"]);
    expect(u(2)).toEqual(["MRAZ"]);
    expect(u(3)).toEqual([]);
    expect(u(10)).toEqual([]);
  });

  it("MALO_SLUNCE přesně na mezi 1,5 → ano, 1,51 → ne", () => {
    const d = mesta([1, 1, 1, 1, 1.5, 1.51, 4, 4, 3, 2, 1, 1]);
    expect(ok(sob({ ...ZAKLAD, mesto: "x", mesic: 5, data: d })).upozorneni).toEqual(["MALO_SLUNCE"]);
    expect(ok(sob({ ...ZAKLAD, mesto: "x", mesic: 6, data: d })).upozorneni).toEqual([]);
  });

  it("zmenaBilance: baterie 0, panely 100 × 5,4 × 0,7 = 378, booster 10 × 0,7 × 2 × 12,8 = 179,2, spotřeba 100", () => {
    const r = ok(sob({ ...ZAKLAD, jizda: { hodinDenne: 2, proudBoosteruA: 5 } }));
    expect(r.zmenaBilance.BATERIE_100AH).toBe(0);
    blizko(r.zmenaBilance.PANELY_100WP, 378);
    blizko(r.zmenaBilance.BOOSTER_10A, 179.2);
    blizko(r.zmenaBilance.SPOTREBA_MINUS_10, 100);
    const bez = ok(sob(ZAKLAD));
    expect(bez.zmenaBilance.BOOSTER_10A).toBe(0);
  });

  it("zpětná kompatibilita: hlášky jen dosavadní kódy, MALO_SLUNCE/MRAZ jsou jen v upozorneni", () => {
    for (const mesic of [1, 6, 11]) {
      const r = ok(sob({ ...ZAKLAD, mesic }));
      for (const h of r.hlasky) expect(["BILANCE_KLADNA", "ZIMA_MALO_SLUNCE"]).toContain(h);
    }
    expect(ok(sob({ ...ZAKLAD, mesic: 12 })).hlasky).toContain("ZIMA_MALO_SLUNCE");
  });
});

// =============================================================================================
// 7. navrhZapojeni
// =============================================================================================
const spotrebic = (id: string, prikonW: number, ubytekProc: 3 | 5 | 10 = 5, extra: Record<string, unknown> = {}) => ({
  id,
  typ: "zasuvka",
  nazev: id,
  prikonW,
  ubytekProc,
  rezimy: ["den", "noc"],
  ...extra,
});
const Z = { napeti: 12, baterieAh: 100, solarWp: 0, boosterA: 0, nabijeckaA: 0, menicW: 0, spotrebice: [] as Any[] };
const s7 = (x: Record<string, unknown>) => ({ ...Z, ...x });
const kabel = (r: Any, id: string) => r.projekt.kabely.find((k: Any) => k.id === id);
const sch = (r: Any, id: string) => navrhSchematu(r.projekt).find((k) => k.id === id)!;

describe("I7 navrhZapojeni: výrobce, napětí vozu, přívod na pojistky, hlavní pojistka, BMS", () => {
  const LEDNICE = spotrebic("lednice", 45, 3, { typ: "lednice", vyrobce: "secop-bd35f-bd50f" });

  it("lednice Secop 3 m při 12 V: kabel nese vyrobce, navrhSchematu dá 4 mm² a pojistku 15 A", () => {
    const r = ok(zap(s7({ spotrebice: [LEDNICE] })));
    expect(kabel(r, "rozvod-lednice").vyrobce).toBe("secop-bd35f-bd50f");
    expect(kabel(r, "rozvod-lednice").delkaM).toBe(3);
    const v = sch(r, "rozvod-lednice").vysledek as Any;
    expect(v.stav).toBe("ok");
    expect(v.prurez).toBe(4);
    expect(v.pojistka).toBe(15);
    expect(v.maxPojistka).toBeGreaterThanOrEqual(15);
    // úbytek výsledného kabelu (4 mm²) je menší než u výpočtu bez výrobce
    const bez = ok(zap(s7({ spotrebice: [spotrebic("lednice", 45, 3)] })));
    const vb = sch(bez, "rozvod-lednice").vysledek as Any;
    expect(vb.prurez).toBeLessThan(4);
    expect(v.ubytekV).toBeLessThan(vb.ubytekV);
    blizko(v.ubytekV, (vb.ubytekV * vb.prurez) / 4);
    blizko(v.ubytekProc, (v.ubytekV / 12) * 100);
  });

  it("bez vyrobce kabel pole vyrobce nemá a schéma počítá jen navrhVodice", () => {
    const r = ok(zap(s7({ spotrebice: [spotrebic("lednice", 45, 3)] })));
    expect(kabel(r, "rozvod-lednice")).not.toHaveProperty("vyrobce");
    const v = sch(r, "rozvod-lednice").vysledek as Any;
    const p = navrhVodice({ napeti: 12, rezim: "P", hodnota: 45, delka: 3, ubytekProc: 3, zpetny: 2, prostredi: "n" }) as Any;
    expect(v.prurez).toBe(p.prurez);
    expect(v.pojistka).toBe(p.pojistka);
  });

  it("napetiVozu: 24 V obytná, 12 V vůz, booster 20 A → vstup 20 × 24/12 × 1,1 = 44 A; výstup 20 A", () => {
    const r = ok(zap(s7({ napeti: 24, boosterA: 20, napetiVozu: 12 })));
    blizko(kabel(r, "startovaci-booster").proudA, 44);
    blizko(kabel(r, "booster-baterie").proudA, 20);
    blizko(ok(zap(s7({ boosterA: 20, napetiVozu: 24 }))).projekt.kabely.find((k: Any) => k.id === "startovaci-booster").proudA, 11);
  });

  it("napetiVozu mimo 12/24 → NEPLATNY_VSTUP", () => {
    for (const x of [0, 48, "12"]) chyba(zap(s7({ boosterA: 20, napetiVozu: x })), "napetiVozu");
  });

  it("privodNaPojistky: přívod proudA = Σ pojistek okruhů / 1,25, jeho pojistka ≥ Σ pojistek okruhů", () => {
    const sp = [spotrebic("a", 100, 5), spotrebic("b", 50, 10), spotrebic("c", 300, 3)];
    const r = ok(zap(s7({ spotrebice: sp, privodNaPojistky: true })));
    const soucet = sp.reduce((a, x) => a + ((sch(r, `rozvod-${x.id}`).vysledek as Any).pojistka as number), 0);
    blizko(kabel(r, "baterie-rozvod").proudA, soucet / 1.25);
    const privod = sch(r, "baterie-rozvod").vysledek as Any;
    expect(privod.stav).toBe("ok");
    expect(privod.pojistka).toBeGreaterThanOrEqual(soucet);
  });

  it("privodNaPojistky s lednicí Secop: pojistka přívodu ≥ Σ pojistek okruhů ve schématu (včetně 15 A lednice)", () => {
    const sp = [LEDNICE, spotrebic("svetla", 20, 10)];
    const r = ok(zap(s7({ spotrebice: sp, privodNaPojistky: true })));
    const okruhy = sp.map((x) => (sch(r, `rozvod-${x.id}`).vysledek as Any).pojistka as number);
    expect(okruhy[0]).toBe(15);
    const soucet = okruhy.reduce((a, b) => a + b, 0);
    const privod = sch(r, "baterie-rozvod").vysledek as Any;
    expect(privod.pojistka, `okruhy ${okruhy.join("+")} A, přívod ${privod.pojistka} A`).toBeGreaterThanOrEqual(soucet);
  });

  it("bez privodNaPojistky (i false): přívod = součet příkonů jako dřív", () => {
    const sp = [spotrebic("a", 100, 5), spotrebic("b", 50, 10)];
    const bez = ok(zap(s7({ spotrebice: sp })));
    expect(kabel(bez, "baterie-rozvod").prikonW).toBe(150);
    expect(kabel(bez, "baterie-rozvod").proudA).toBeUndefined();
    expect(ok(zap(s7({ spotrebice: sp, privodNaPojistky: false })))).toEqual(bez);
  });

  it("hlavniProudA = max(odběr skříňka + měnič, nabíjení regulátor + booster + nabíječka), pojistka z řady ≥ 1,25 ×", () => {
    const r = ok(
      zap(s7({ solarWp: 200, boosterA: 30, nabijeckaA: 20, menicW: 1000, spotrebice: [spotrebic("a", 100), spotrebic("b", 50)] })),
    );
    const k = navrhSchematu(r.projekt);
    const p = (id: string) => k.find((x) => x.id === id)!.proudA as number;
    expect(r.regulatorA).toBe(20);
    const odber = p("baterie-rozvod") + p("baterie-menic");
    const nabijeni = 20 + 30 + 20;
    blizko(r.hlavniProudA, Math.max(odber, nabijeni));
    expect(r.hlavniPojistkaA).toBe(FUSES.find((f) => f >= 1.25 * r.hlavniProudA));
    expect(r.hlavniPojistkaA).toBe(125);
  });

  it("hlavní pojistka na mezi: nabíječka 40 A → 50 A přesně; 41 A → 60 A; bez ničeho 0 A", () => {
    const a = ok(zap(s7({ nabijeckaA: 40 })));
    blizko(a.hlavniProudA, 40);
    expect(a.hlavniPojistkaA).toBe(50);
    expect(ok(zap(s7({ nabijeckaA: 41 }))).hlavniPojistkaA).toBe(60);
    const nic = ok(zap(Z));
    expect(nic.hlavniProudA).toBe(0);
  });

  it("hlavniPojistkaA null, když 1,25 × proud přesahuje řadu (měnič 5000 W při 12 V)", () => {
    const r = ok(zap(s7({ menicW: 5000 })));
    expect(r.hlavniProudA * 1.25).toBeGreaterThan(Math.max(...FUSES));
    expect(r.hlavniPojistkaA).toBeNull();
  });

  it("nadBms podle odběru, nadNabijeci podle nabíjení", () => {
    const v = s7({ nabijeckaA: 40, spotrebice: [spotrebic("a", 120)] }); // odběr ≈ 10 A (9,375–10), nabíjení 40 A
    expect(ok(zap({ ...v, maxProudBmsA: 10.5 })).nadBms).toBe(false);
    expect(ok(zap({ ...v, maxProudBmsA: 9 })).nadBms).toBe(true);
    expect(ok(zap({ ...v, maxNabijeciA: 40 })).nadNabijeci).toBe(false);
    expect(ok(zap({ ...v, maxNabijeciA: 39.9 })).nadNabijeci).toBe(true);
    // odběr se nepočítá do nabíjení a naopak
    expect(ok(zap({ ...v, maxProudBmsA: 20 })).nadBms).toBe(false);
    expect(ok(zap({ ...v, maxNabijeciA: 20 })).nadNabijeci).toBe(true);
    const bez = ok(zap(v));
    expect(bez.nadBms).toBe(false);
    expect(bez.nadNabijeci).toBe(false);
  });

  it("rozsahy maxProudBmsA a maxNabijeciA", () => {
    for (const x of [0, -1, 1001, Number.NaN, "50", null]) chyba(zap(s7({ maxProudBmsA: x })), "maxProudBmsA");
    for (const x of [0, -1, Number.NaN, "50", null]) chyba(zap(s7({ maxNabijeciA: x })), "maxNabijeciA");
  });

  it("zpětná kompatibilita: bez nových vstupů je projekt i hlášky stejný jako s výchozími hodnotami", () => {
    const v = s7({ solarWp: 2000, boosterA: 30, nabijeckaA: 20, menicW: 2500, spotrebice: [spotrebic("a", 100), spotrebic("b", 50, 10)] });
    const bez = ok(zap(v));
    const s = ok(zap({ ...v, napetiVozu: 12, privodNaPojistky: false, maxProudBmsA: 1000, maxNabijeciA: 1000 }));
    expect(s.projekt).toEqual(bez.projekt);
    expect(s.hlasky).toEqual(bez.hlasky);
    expect([...bez.hlasky].sort()).toEqual(["MENIC_NAD_150A", "REGULATOR_NAD_100A"]);
    blizko(kabel(bez, "startovaci-booster").proudA, 33);
    expect(kabel(bez, "baterie-rozvod").prikonW).toBe(150);
  });
});

