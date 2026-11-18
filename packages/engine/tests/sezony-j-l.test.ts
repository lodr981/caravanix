// Testy ze zadání docs/KALKULACKY_ALFA.md, kapitoly J (podrobná spotřeba) a L (soběstačnost podle sezóny).
// Psáno ze specifikace, ne z kódu. Čísla spočítána ručně v komentářích.
import { describe, expect, it } from "vitest";
import { bilanceSpotrebicu, sezonaMesice, sobestacnost } from "../src/index.ts";

const blizko = (a: number, b: number, eps = 1e-6) => expect(Math.abs(a - b)).toBeLessThan(eps);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bil = (v: any) => bilanceSpotrebicu(v) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sob = (v: any) => sobestacnost(v) as any;
const ok = (r: any) => {
  expect(r.stav).toBe("ok");
  return r;
};
const chyba = (r: any, pole: string) => {
  expect(r).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole });
};

// ---------- J ----------
// A: 50 W, 10 h, střída 50 %, léto 20 h, zima 4 h → léto 10 h (500 Wh), jaro/podzim 5 h (250), zima 2 h (100), bez sezóny 5 h (250)
// B: trvalý odběr 2 W → 24 h = 48 Wh ve všech sezónách
// C: 900 W na 230 V, 3 × 20 min = 1 h → 900 Wh / 0,9 = 1 000 Wh
const A = { prikonW: 50, hodinDenne: 10, na230V: false, stridaProc: 50, hodinSezona: { leto: 20, zima: 4 } };
const B = { prikonW: 2, na230V: false, trvale: true };
const C = { prikonW: 900, na230V: true, pouzitiDenne: 3, minutNaPouziti: 20 };
const J = { napeti: 12, polozky: [A, B, C] };

describe("J – bilanceSpotrebicu se sezónami", () => {
  it("bez sezóny: hodinDenne × střída, trvalý 24 h, použití × minuty", () => {
    const r = ok(bil(J));
    expect(r.sezona).toBeNull();
    blizko(r.polozky[0].hodinChodu, 5);
    blizko(r.polozky[1].hodinChodu, 24);
    blizko(r.polozky[2].hodinChodu, 1);
    blizko(r.polozky[0].WhZBaterie, 250);
    blizko(r.polozky[1].WhZBaterie, 48);
    blizko(r.polozky[2].WhZBaterie, 1000);
    blizko(r.WhDenne, 1298);
    blizko(r.AhDenne, 1298 / 12.8);
    blizko(r.WhTrvale, 48);
  });

  it("sezóna léto: hodinSezona.leto × střída", () => {
    const r = ok(bil({ ...J, sezona: "leto" }));
    expect(r.sezona).toBe("leto");
    blizko(r.polozky[0].hodinChodu, 10);
    blizko(r.polozky[0].WhZBaterie, 500);
    blizko(r.WhDenne, 1548);
    blizko(r.AhDenne, 1548 / 12.8);
  });

  it("sezóna zima: 4 h × 50 % = 2 h; jaro/podzim bez hodinSezona → hodinDenne", () => {
    const z = ok(bil({ ...J, sezona: "zima" }));
    blizko(z.polozky[0].hodinChodu, 2);
    blizko(z.WhDenne, 1148);
    const j = ok(bil({ ...J, sezona: "jaroPodzim" }));
    blizko(j.polozky[0].hodinChodu, 5);
    blizko(j.WhDenne, 1298);
  });

  it("WhSezony u každé položky a sezony.{leto,jaroPodzim,zima} s vařením", () => {
    const r = ok(bil({ ...J, WhVareniDenne: 100 }));
    blizko(r.polozky[0].WhSezony.leto, 500);
    blizko(r.polozky[0].WhSezony.jaroPodzim, 250);
    blizko(r.polozky[0].WhSezony.zima, 100);
    for (const s of ["leto", "jaroPodzim", "zima"]) {
      blizko(r.polozky[1].WhSezony[s], 48);
      blizko(r.polozky[2].WhSezony[s], 1000);
    }
    blizko(r.sezony.leto.WhDenne, 1548);
    blizko(r.sezony.leto.WhDenneCelkem, 1648);
    blizko(r.sezony.leto.AhDenneCelkem, 1648 / 12.8);
    blizko(r.sezony.jaroPodzim.WhDenneCelkem, 1398);
    blizko(r.sezony.zima.WhDenne, 1148);
    blizko(r.sezony.zima.WhDenneCelkem, 1248);
    blizko(r.sezony.zima.AhDenneCelkem, 1248 / 12.8);
    blizko(r.WhDenneCelkem, 1398);
  });

  it("sezony na 24 V (Unom 25,6)", () => {
    const r = ok(bil({ ...J, napeti: 24 }));
    blizko(r.sezony.zima.AhDenneCelkem, 1148 / 25.6);
  });

  it("poradi od největšího WhZBaterie, shoda → nižší index první", () => {
    expect(ok(bil({ ...J, sezona: "leto" })).poradi).toEqual([2, 0, 1]);
    const p = { prikonW: 10, hodinDenne: 1, na230V: false };
    const big = { prikonW: 20, hodinDenne: 1, na230V: false };
    expect(ok(bil({ napeti: 12, polozky: [p, big, p] })).poradi).toEqual([1, 0, 2]);
  });

  it("poradi se řídí zvolenou sezónou", () => {
    const x = { prikonW: 10, hodinDenne: 3, na230V: false, hodinSezona: { zima: 20 } }; // zima 200, jinak 30
    const y = { prikonW: 10, hodinDenne: 10, na230V: false }; // 100
    expect(ok(bil({ napeti: 12, polozky: [x, y], sezona: "leto" })).poradi).toEqual([1, 0]);
    expect(ok(bil({ napeti: 12, polozky: [x, y], sezona: "zima" })).poradi).toEqual([0, 1]);
  });

  it("trvalý odběr ignoruje hodinDenne, hodinSezona i střídu; 230 V dělí účinností", () => {
    const t = { prikonW: 9, hodinDenne: 1, na230V: true, trvale: true, stridaProc: 10, hodinSezona: { zima: 1 } };
    const r = ok(bil({ napeti: 12, polozky: [t], sezona: "zima" }));
    blizko(r.polozky[0].hodinChodu, 24);
    blizko(r.polozky[0].WhZBaterie, 240);
    blizko(r.WhTrvale, 240);
  });

  it("použití × minuty ignoruje střídu a hodinSezona", () => {
    const u = { prikonW: 60, na230V: false, pouzitiDenne: 2, minutNaPouziti: 30, stridaProc: 10, hodinSezona: { leto: 10 } };
    const r = ok(bil({ napeti: 12, polozky: [u], sezona: "leto" }));
    blizko(r.polozky[0].hodinChodu, 1);
    blizko(r.WhDenne, 60);
    blizko(r.WhTrvale, 0);
  });

  it("proud položky nezávisí na hodinách", () => {
    const r1 = ok(bil({ ...J, sezona: "leto" }));
    const r2 = ok(bil({ ...J, sezona: "zima" }));
    blizko(r1.proudSoucasne, 50 / 12.8 + 2 / 12.8 + 900 / 0.9 / 12.8);
    blizko(r2.proudSoucasne, r1.proudSoucasne);
  });

  it("hranice: střída 0 → 0 Wh, 100 → plně; hodinSezona 0 a 24; použití × minuty přesně 24 h", () => {
    const s0 = ok(bil({ napeti: 12, polozky: [{ prikonW: 10, hodinDenne: 5, na230V: false, stridaProc: 0 }] }));
    blizko(s0.WhDenne, 0);
    const s100 = ok(bil({ napeti: 12, polozky: [{ prikonW: 10, hodinDenne: 5, na230V: false, stridaProc: 100 }] }));
    blizko(s100.WhDenne, 50);
    const h = { prikonW: 10, hodinDenne: 5, na230V: false, hodinSezona: { leto: 0, zima: 24 } };
    blizko(ok(bil({ napeti: 12, polozky: [h], sezona: "leto" })).WhDenne, 0);
    blizko(ok(bil({ napeti: 12, polozky: [h], sezona: "zima" })).WhDenne, 240);
    const u24 = ok(bil({ napeti: 12, polozky: [{ prikonW: 10, na230V: false, pouzitiDenne: 24, minutNaPouziti: 60 }] }));
    blizko(u24.polozky[0].hodinChodu, 24);
    const u0 = ok(bil({ napeti: 12, polozky: [{ prikonW: 10, na230V: false, pouzitiDenne: 0, minutNaPouziti: 1440 }] }));
    blizko(u0.WhDenne, 0);
    const u100 = ok(bil({ napeti: 12, polozky: [{ prikonW: 10, na230V: false, pouzitiDenne: 100, minutNaPouziti: 14.4 }] }));
    blizko(u100.polozky[0].hodinChodu, 24);
  });

  it("NEPLATNY_VSTUP: sezona", () => {
    chyba(bil({ ...J, sezona: "jaro" }), "sezona");
    chyba(bil({ ...J, sezona: "" }), "sezona");
    chyba(bil({ ...J, sezona: 1 }), "sezona");
  });

  it("NEPLATNY_VSTUP: hodinSezona mimo 0–24 nebo text", () => {
    const p = (hs: unknown) => ({ napeti: 12, polozky: [{ prikonW: 10, hodinDenne: 5, na230V: false, hodinSezona: hs }] });
    chyba(bil(p({ zima: 24.01 })), "polozky[0].hodinSezona.zima");
    chyba(bil(p({ leto: -1 })), "polozky[0].hodinSezona.leto");
    chyba(bil(p({ jaroPodzim: "5" })), "polozky[0].hodinSezona.jaroPodzim");
    chyba(bil(p({ zima: Number.NaN })), "polozky[0].hodinSezona.zima");
  });

  it("NEPLATNY_VSTUP: stridaProc mimo 0–100", () => {
    const p = (s: unknown) => ({ napeti: 12, polozky: [{ prikonW: 10, hodinDenne: 5, na230V: false }, { prikonW: 10, hodinDenne: 5, na230V: false, stridaProc: s }] });
    chyba(bil(p(100.1)), "polozky[1].stridaProc");
    chyba(bil(p(-1)), "polozky[1].stridaProc");
    chyba(bil(p("50")), "polozky[1].stridaProc");
  });

  it("NEPLATNY_VSTUP: použití × minuty", () => {
    const p = (o: object) => ({ napeti: 12, polozky: [{ prikonW: 10, na230V: false, ...o }] });
    chyba(bil(p({ pouzitiDenne: 101, minutNaPouziti: 1 })), "polozky[0].pouzitiDenne");
    chyba(bil(p({ pouzitiDenne: -1, minutNaPouziti: 1 })), "polozky[0].pouzitiDenne");
    chyba(bil(p({ pouzitiDenne: 1, minutNaPouziti: 1441 })), "polozky[0].minutNaPouziti");
    chyba(bil(p({ pouzitiDenne: 1, minutNaPouziti: -5 })), "polozky[0].minutNaPouziti");
    // zadané jen jedno → obě povinná
    chyba(bil(p({ pouzitiDenne: 2 })), "polozky[0].minutNaPouziti");
    chyba(bil(p({ minutNaPouziti: 20 })), "polozky[0].pouzitiDenne");
    // h > 24: 100 × 15 / 60 = 25 h
    chyba(bil(p({ pouzitiDenne: 100, minutNaPouziti: 15 })), "polozky[0].minutNaPouziti");
    chyba(bil(p({ pouzitiDenne: 2, minutNaPouziti: 1440 })), "polozky[0].minutNaPouziti");
  });

  it("bez hodinDenne a bez trvale/použití je hodinDenne stále povinné", () => {
    chyba(bil({ napeti: 12, polozky: [{ prikonW: 10, na230V: false }] }), "polozky[0].hodinDenne");
  });
});

describe("J – zpětná kompatibilita", () => {
  const stare = { napeti: 12, polozky: [{ prikonW: 100, hodinDenne: 5, na230V: true }, { prikonW: 40, hodinDenne: 2, na230V: false }] };

  it("bez nových vstupů čísla podle oddílu A", () => {
    const r = ok(bil(stare));
    blizko(r.polozky[0].WhZBaterie, 500 / 0.9);
    blizko(r.polozky[1].WhZBaterie, 80);
    blizko(r.WhDenne, 500 / 0.9 + 80);
    blizko(r.AhDenne, (500 / 0.9 + 80) / 12.8);
    blizko(r.proudSoucasne, 100 / 0.9 / 12.8 + 40 / 12.8);
    blizko(r.vykon230V, 100);
    expect(r.hlasky).toEqual([]);
    expect(r.sezona).toBeNull();
    blizko(r.WhTrvale, 0);
  });

  it("sezóna bez hodinSezona nic nezmění; všechny sezóny stejné", () => {
    const r0 = ok(bil(stare));
    for (const s of ["leto", "jaroPodzim", "zima"]) {
      const r = ok(bil({ ...stare, sezona: s }));
      blizko(r.WhDenne, r0.WhDenne);
      blizko(r0.sezony[s].WhDenne, r0.WhDenne);
    }
  });

  it("hláška BEZ_MENICE zůstává", () => {
    expect(ok(bil({ napeti: 12, polozky: [{ prikonW: 10, hodinDenne: 1, na230V: false }] })).hlasky).toEqual(["BEZ_MENICE"]);
    expect(ok(bil({ napeti: 12, polozky: [B] })).hlasky).toEqual(["BEZ_MENICE"]);
  });

  it("undefined, null, {} → NEPLATNY_VSTUP bez výjimky", () => {
    for (const v of [undefined, null, {}]) {
      const r = bil(v);
      expect(r.stav).toBe("chyba");
      expect(r.hlasky).toEqual(["NEPLATNY_VSTUP"]);
    }
  });
});

// ---------- L ----------
describe("L – sezonaMesice", () => {
  it("všech 12 měsíců", () => {
    const ocek = ["zima", "zima", "jaroPodzim", "jaroPodzim", "leto", "leto", "leto", "leto", "jaroPodzim", "jaroPodzim", "zima", "zima"];
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sezonaMesice)).toEqual(ocek);
  });
});

// Tabulka: výnos 1 Wp = k Wh/den (ztráty 1). 200 Wp → výroba 200 × k.
const K = [1, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 1];
const DATA = { mesta: [{ id: "x", nazev: "X", kWhNaKWpDen: K }], vychoziZtraty: 0.8 };
const ZAKL = { mesto: "x", mesic: 3, panelyWp: 200, ztratySystemu: 1, kapacitaAh: 100, napeti: 12, WhDenne: 1000, data: DATA };
const PS = { leto: 300, jaroPodzim: 500, zima: 800 };
// kapacitaWh = 100 × 12,8 × 0,9 = 1 152

describe("L – sobestacnost s WhDennePoSezonach", () => {
  it("bilancePoMesicich: každý měsíc spotřeba své sezóny", () => {
    const r = ok(sob({ ...ZAKL, WhDennePoSezonach: PS }));
    const ocek = [-600, -600, -100, 100, 500, 700, 700, 500, 100, -100, -600, -600];
    r.bilancePoMesicich.forEach((b: number, i: number) => blizko(b, ocek[i]));
    expect(r.bilancePoMesicich).toHaveLength(12);
  });

  it("potrebaWp, potrebaWpSezona, potrebaWpRok podle sezón", () => {
    const r = ok(sob({ ...ZAKL, WhDennePoSezonach: PS }));
    blizko(r.potrebaWp, 250); // březen: 500 / 2
    blizko(r.potrebaWpSezona, 500 / 3); // duben–září: max(500/3, 300/4, 60, 60, 75, 500/3)
    blizko(r.potrebaWpRok, 800); // leden: 800 / 1
    blizko(ok(sob({ ...ZAKL, mesic: 6, WhDennePoSezonach: PS })).potrebaWp, 60);
  });

  it("simulace zvoleného měsíce se spotřebou jeho sezóny (březen −100 Wh/den)", () => {
    const r = ok(sob({ ...ZAKL, WhDennePoSezonach: PS }));
    expect(r.dnyBezPripojky).toBe(11); // 1152 − 11 × 100 = 52, den 12 < 0
    blizko(r.dnyPresne, 11.52);
    expect(r.vydrzi).toBe(false);
    expect(r.hlasky).not.toContain("BILANCE_KLADNA");
  });

  it("„co pomůže“: spotřeba −10 % ze sezónní spotřeby", () => {
    const r = ok(sob({ ...ZAKL, WhDennePoSezonach: PS }));
    blizko(r.zmenaBilance.SPOTREBA_MINUS_10, 50);
    const s = r.coPomuze.find((c: any) => c.varianta === "SPOTREBA_MINUS_10");
    expect(s.dnyBezPripojky).toBe(23); // bilance −50: 1152 − 23 × 50 = 2
    expect(s.prinosDni).toBe(12);
  });

  it("3 dny bez slunce a BILANCE_KLADNA v létě (300 Wh/den)", () => {
    const r = ok(sob({ ...ZAKL, mesic: 7, WhDennePoSezonach: PS }));
    blizko(r.stavPo3DnechBezSlunceProc, ((1152 - 900) / 1152) * 100);
    expect(r.hlasky).toContain("BILANCE_KLADNA");
    expect(r.vydrzi).toBe(true);
    expect(r.dnyBezPripojky).toBeNull();
  });

  it("zimní měsíc se zimní spotřebou (listopad −600)", () => {
    const r = ok(sob({ ...ZAKL, mesic: 11, WhDennePoSezonach: PS }));
    expect(r.dnyBezPripojky).toBe(1);
    blizko(r.dnyPresne, 1152 / 600);
    blizko(r.stavPo3DnechBezSlunceProc, 0);
  });

  it("booster se odečítá od sezónní spotřeby v potrebaWp", () => {
    // booster 10 A × 0,7 × 1 h × 12,8 = 89,6 Wh; březen (500 − 89,6) / 2
    const r = ok(sob({ ...ZAKL, jizda: { hodinDenne: 1, proudBoosteruA: 10 }, WhDennePoSezonach: PS }));
    blizko(r.potrebaWp, (500 - 89.6) / 2);
    blizko(r.bilancePoMesicich[0], 200 + 89.6 - 800);
  });

  it("hranice 1 a 50 000 platí", () => {
    ok(sob({ ...ZAKL, WhDennePoSezonach: { leto: 1, jaroPodzim: 50000, zima: 1 } }));
  });

  it("NEPLATNY_VSTUP s polem WhDennePoSezonach.<sezona>", () => {
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { ...PS, zima: 0 } }), "WhDennePoSezonach.zima");
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { ...PS, leto: 50001 } }), "WhDennePoSezonach.leto");
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { leto: 300, zima: 800 } }), "WhDennePoSezonach.jaroPodzim");
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { ...PS, jaroPodzim: "500" } }), "WhDennePoSezonach.jaroPodzim");
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { ...PS, leto: Number.NaN } }), "WhDennePoSezonach.leto");
    chyba(sob({ ...ZAKL, WhDennePoSezonach: { ...PS, zima: -800 } }), "WhDennePoSezonach.zima");
  });
});

describe("L – zpětná kompatibilita", () => {
  it("bez vstupu WhDenne pro všechny měsíce", () => {
    const r = ok(sob(ZAKL));
    K.forEach((k, i) => blizko(r.bilancePoMesicich[i], 200 * k - 1000));
    blizko(r.potrebaWp, 500);
    blizko(r.potrebaWpSezona, 1000 / 3);
    blizko(r.potrebaWpRok, 1000);
    expect(r.dnyBezPripojky).toBe(1); // březen −600
  });

  it("stejná spotřeba ve všech sezónách = výsledek bez vstupu", () => {
    for (const mesic of [1, 3, 7, 11]) {
      const bez = ok(sob({ ...ZAKL, mesic }));
      const s = ok(sob({ ...ZAKL, mesic, WhDennePoSezonach: { leto: 1000, jaroPodzim: 1000, zima: 1000 } }));
      expect(s).toEqual(bez);
    }
  });
});
