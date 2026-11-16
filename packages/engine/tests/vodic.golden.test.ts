// Golden test kalkulačky průřezu: engine (@caravanix/engine) proti referenci
// docs/reference/kalkulacka-prurezu-v1.html spuštěné v Node (viz tests/golden/reference.ts).
// Reference má vždy pravdu. Jakýkoli rozdíl je chyba enginu (docs/KALKULACKA_PRUREZU.md).

import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { navrhVodice, referencniTabulka } from "@caravanix/engine";
import type { RadekTabulky, VstupVodice, VysledekVodice } from "@caravanix/engine";
import { loadReference } from "./golden/reference.ts";
import { TOL, porovnej } from "./golden/porovnani.ts";
import { DELKY, FUSES, PROUDY, hranyUbytku, kombinace, mrizka, neplatne } from "./golden/grid.ts";

const MAX_VYPIS = 15;

const ref = loadReference();
// Tabulky přímo z kontextu reference (top-level const).
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

// ---------------------------------------------------------------------------
// 1. Kontrola samotného testu (nezávisí na enginu, musí procházet vždy).
// ---------------------------------------------------------------------------

describe("reference v Node (kontrola testu)", () => {
  const zaklad = { napeti: 12, rezim: "P", hodnota: 120, delka: 4, ubytekProc: 3, zpetny: 2, prostredi: "n" } as const;

  it("kopie FUSES v mřížce odpovídá referenci", () => {
    expect(FUSES).toEqual(refFUSES);
    expect(refMM).toHaveLength(15);
  });

  it("mřížka splňuje zadání (≥ 40 proudů 0,5–240 A, ≥ 15 délek 0,2–20 m)", () => {
    expect(PROUDY.filter((p) => p >= 0.5 && p <= 240).length).toBeGreaterThanOrEqual(40);
    expect(DELKY.filter((l) => l >= 0.2 && l <= 20).length).toBeGreaterThanOrEqual(15);
  });

  it("120 W, 12 V, 4 m, 3 %, vlastní mínus, samostatně → 4 mm² (ručně: Areq = 0,0175·8·10/0,36 = 3,89 mm²)", () => {
    expect(ref.navrh(zaklad)).toEqual({
      stav: "ok",
      prurez: 4,
      awg: { oznaceni: "10", plocha: 5.26 },
      pojistka: 15,
      maxPojistka: 30,
      proud: 10,
      prikon: 120,
      ubytekV: expect.closeTo(0.35, 12),
      ubytekProc: expect.closeTo(0.35 / 12 * 100, 12),
      napetiUSpotrebice: expect.closeTo(11.65, 12),
      ztrata: expect.closeTo(3.5, 12),
      maxDelka: expect.closeTo((0.36 * 4) / (0.0175 * 2 * 10), 12),
      rozhodlo: "ubytek",
      hlasky: ["ROZHODL_UBYTEK"],
    });
    // Totéž, jak to vidí uživatel (původní fmt, cs-CZ).
    const html = ref.zobrazeni(zaklad);
    expect(html).toContain('<div class="v">4 mm²</div>');
    expect(html).toContain("nebo AWG 10 (5,26 mm²)");
    expect(html).toContain('<div class="v">15 A</div>');
    expect(html).toContain("0,35 V (2,9 %)");
    expect(html).toContain("<b>4,1 m</b>");
  });

  it("1 200 W, 12 V, 2 m, mínus přes kostru → 35 mm², 125 A, oteplení + kostra + měnič", () => {
    const r = ref.navrh({ ...zaklad, hodnota: 1200, delka: 2, zpetny: 1 });
    expect(r).toMatchObject({ stav: "ok", prurez: 35, pojistka: 125, maxPojistka: 125, proud: 100, rozhodlo: "oteplen" });
    expect(r.hlasky).toEqual(["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU", "MENIC_OD_1000W"]);
  });

  it("chybové stavy reference", () => {
    expect(ref.navrh({ ...zaklad, rezim: "I", hodnota: 300 })).toEqual({ stav: "chyba", proud: 300, hlasky: ["MIMO_ROZSAH"] });
    expect(ref.navrh({ ...zaklad, rezim: "I", hodnota: 220, prostredi: "h" })).toEqual({ stav: "chyba", hlasky: ["ANI_120_NESTACI"] });
    for (const x of [0, -1, NaN]) {
      expect(ref.navrh({ ...zaklad, hodnota: x })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
      expect(ref.navrh({ ...zaklad, delka: x })).toEqual({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"] });
    }
  });

  it("mřížka v referenci pokryje všechny kódy hlášek, oba „rozhodlo“, AWG null a změnu pojistky na každé hraně", () => {
    const kody = new Set<string>();
    const rozhodlo = new Set<string>();
    let awgNull = 0;
    for (const k of kombinace()) {
      for (const v of [...mrizka(k), ...neplatne(k)]) {
        const r = ref.navrh(v);
        r.hlasky.forEach((h) => kody.add(h));
        if (r.stav === "ok") {
          rozhodlo.add(r.rozhodlo);
          if (r.awg === null) awgNull++;
        }
      }
    }
    expect([...kody].sort()).toEqual(
      ["ANI_120_NESTACI", "MENIC_OD_1000W", "MIMO_ROZSAH", "MINUS_PRES_KOSTRU", "NAD_150A_12V", "NEPLATNY_VSTUP", "ROZHODLO_OTEPLENI", "ROZHODL_UBYTEK"].sort(),
    );
    expect([...rozhodlo].sort()).toEqual(["oteplen", "ubytek"]);
    expect(awgNull).toBeGreaterThan(0);

    // Na hraně každé pojistky (krom poslední) se pojistka mezi „pod“ a „nad“ změní.
    const k = { napeti: 12, rezim: "I", ubytekProc: 10, zpetny: 2, prostredi: "n" } as const;
    for (const f of FUSES.slice(0, -1)) {
      const h = f / 1.1;
      const pod = ref.navrh({ ...k, hodnota: h * (1 - 1e-9), delka: 0.2 });
      const nad = ref.navrh({ ...k, hodnota: h * (1 + 1e-9), delka: 0.2 });
      expect(pod.stav === "ok" ? pod.pojistka : null, `pod hranou ${f} A`).toBe(f);
      expect(nad.stav === "ok" ? nad.pojistka : null, `nad hranou ${f} A`).toBeGreaterThan(f);
    }
  }, 120_000);

  it("porovnání odhalí odchylku v každém poli (a toleruje < 1e-9)", () => {
    const exp = ref.navrh({ ...zaklad, hodnota: 1200, delka: 2, zpetny: 1 });
    if (exp.stav !== "ok") throw new Error("čekán ok");
    expect(porovnej(exp, structuredClone(exp))).toEqual([]);
    expect(porovnej(exp, { ...exp, ubytekV: exp.ubytekV + 0.5e-9 })).toEqual([]);
    const zmeny: Partial<typeof exp>[] = [
      { prurez: 50 }, { pojistka: 150 }, { maxPojistka: 150 }, { rozhodlo: "ubytek" },
      { awg: { oznaceni: "1", plocha: 42.5 } }, { awg: { oznaceni: "1/0", plocha: 42.4 } }, { awg: null },
      { hlasky: ["ROZHODLO_OTEPLENI", "MENIC_OD_1000W", "MINUS_PRES_KOSTRU"] }, { hlasky: ["ROZHODLO_OTEPLENI", "MINUS_PRES_KOSTRU"] },
      { proud: exp.proud + 2e-9 }, { prikon: exp.prikon + 1 }, { ubytekV: exp.ubytekV - 2e-9 }, { ubytekProc: NaN },
      { napetiUSpotrebice: exp.napetiUSpotrebice + 1e-6 }, { ztrata: exp.ztrata * 2 }, { maxDelka: exp.maxDelka + 1e-8 },
    ];
    for (const z of zmeny) expect(porovnej(exp, { ...exp, ...z }), JSON.stringify(z)).toHaveLength(1);
    expect(porovnej(exp, { stav: "chyba", hlasky: ["ANI_120_NESTACI"] }).length).toBeGreaterThan(0);
    const mimo = ref.navrh({ ...zaklad, rezim: "I", hodnota: 300 });
    expect(porovnej(mimo, { stav: "chyba", proud: 301, hlasky: ["MIMO_ROZSAH"] })).toHaveLength(1);
  });

  it("parsování tabulky sedí s tím, co reference vykreslí při načtení (cs-CZ)", () => {
    const rows = ref.tabulka();
    expect(rows).toHaveLength(14);
    const f = ref.fmt;
    const html = rows.map(
      (r) =>
        `<tr><td><b>${f(r.prurez, 2)}</b></td><td>${r.awg.oznaceni} <span class="note">(${f(r.awg.plocha, 2)})</span></td><td>${f(r.maxPojistka)} / ${f(r.maxPojistkaSvazek)} A</td><td>${f(r.delka3)} m</td><td>${f(r.delka10)} m</td></tr>`,
    );
    expect(html).toEqual(ref.tabulkaPuvodniHtml);
  });
});

// ---------------------------------------------------------------------------
// 2. Golden test navrhVodice: celá mřížka.
// ---------------------------------------------------------------------------

describe("golden: navrhVodice proti referenci", () => {
  for (const k of kombinace()) {
    const nazev = `${k.napeti} V, režim ${k.rezim}, úbytek ${k.ubytekProc} %, zpětný ${k.zpetny}, prostředí ${k.prostredi}`;
    it(`mřížka proud × délka: ${nazev}`, () => overSadu(mrizka(k)));
    it(`hrany úbytku (Areq = průřez z MM): ${nazev}`, () => overSadu(hranyUbytku(k, refMM)));
    it(`neplatné vstupy: ${nazev}`, () => overSadu(neplatne(k)));
  }
});

// ---------------------------------------------------------------------------
// 3. Referenční tabulka.
// ---------------------------------------------------------------------------

describe("golden: referencniTabulka proti referenci", () => {
  it("14 řádků, řádek po řádku", () => {
    const exp = ref.tabulka();
    const act: RadekTabulky[] = referencniTabulka();
    expect(act).toHaveLength(exp.length);
    exp.forEach((e, i) => {
      const a = act[i]!;
      const tag = `řádek ${i + 1} (${e.prurez} mm²)`;
      expect(a.prurez, tag).toBe(e.prurez);
      expect(a.awg, tag).toEqual(e.awg);
      expect(a.maxPojistka, tag).toBe(e.maxPojistka);
      expect(a.maxPojistkaSvazek, tag).toBe(e.maxPojistkaSvazek);
      expect(Math.abs(a.delka3 - e.delka3), `${tag} delka3 ${a.delka3} ≠ ${e.delka3}`).toBeLessThanOrEqual(TOL);
      expect(Math.abs(a.delka10 - e.delka10), `${tag} delka10 ${a.delka10} ≠ ${e.delka10}`).toBeLessThanOrEqual(TOL);
    });
  });
});
