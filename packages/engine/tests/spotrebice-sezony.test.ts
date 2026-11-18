// Kapitola J (docs/KALKULACKY_ALFA.md): sezóny, střída, použití × minuty, trvalé odběry, pořadí žroutů.
// Ruční příklady: 12 V → Unom 12,8 V, účinnost měniče 0,9.
import { describe, expect, it } from "vitest";
import { bilanceSpotrebicu } from "@caravanix/engine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const f = (v: unknown): any => bilanceSpotrebicu(v as never);

describe("J bilanceSpotrebicu: sezóny a formy zadání", () => {
  it("bez nových vstupů: sezóny = hodinDenne, pořadí podle spotřeby, WhTrvale 0", () => {
    const r = f({ napeti: 12, polozky: [{ prikonW: 20, hodinDenne: 4, na230V: false }, { prikonW: 45, hodinDenne: 12, na230V: false }] });
    expect(r.stav).toBe("ok");
    expect(r.WhDenne).toBeCloseTo(620, 9);
    expect(r.sezona).toBeNull();
    expect(r.sezony.zima.WhDenne).toBeCloseTo(620, 9);
    expect(r.poradi).toEqual([1, 0]);
    expect(r.WhTrvale).toBe(0);
    expect(r.polozky[1].hodinChodu).toBe(12);
  });

  it("hodiny podle sezóny a střída: lednice 45 W, léto 24 h × 50 %, zima 24 h × 50 % s 8 h", () => {
    const r = f({
      napeti: 12,
      sezona: "zima",
      polozky: [{ prikonW: 45, hodinDenne: 24, stridaProc: 50, hodinSezona: { leto: 24, zima: 8 }, na230V: false }],
    });
    expect(r.stav).toBe("ok");
    expect(r.WhDenne).toBeCloseTo(45 * 4, 9); // zima 8 h × 50 % = 4 h
    expect(r.sezony.leto.WhDenne).toBeCloseTo(45 * 12, 9);
    expect(r.sezony.jaroPodzim.WhDenne).toBeCloseTo(45 * 12, 9); // chybí → hodinDenne 24 × 50 %
    expect(r.polozky[0].hodinChodu).toBeCloseTo(4, 9);
  });

  it("použití × minuty na 230 V: konvice 1 000 W, 3× 4 min → 200 Wh / 0,9", () => {
    const r = f({ napeti: 12, WhVareniDenne: 100, polozky: [{ prikonW: 1000, pouzitiDenne: 3, minutNaPouziti: 4, na230V: true }] });
    expect(r.stav).toBe("ok");
    expect(r.WhDenne).toBeCloseTo(200 / 0.9, 9);
    expect(r.sezony.leto.WhDenneCelkem).toBeCloseTo(200 / 0.9 + 100, 9);
    expect(r.sezony.leto.AhDenneCelkem).toBeCloseTo((200 / 0.9 + 100) / 12.8, 9);
  });

  it("trvalý odběr: 0,5 W × 24 h ve všech sezónách, i bez hodinDenne", () => {
    const r = f({ napeti: 12, sezona: "leto", polozky: [{ prikonW: 0.5, trvale: true, na230V: false }, { prikonW: 10, hodinDenne: 1, na230V: false }] });
    expect(r.stav).toBe("ok");
    expect(r.WhTrvale).toBeCloseTo(12, 9);
    expect(r.sezony.zima.WhDenne).toBeCloseTo(22, 9);
    expect(r.poradi).toEqual([0, 1]);
  });

  it("neplatné nové vstupy → NEPLATNY_VSTUP s polem", () => {
    const p = { prikonW: 10, hodinDenne: 2, na230V: false };
    expect(f({ napeti: 12, sezona: "jaro", polozky: [p] }).pole).toBe("sezona");
    expect(f({ napeti: 12, polozky: [{ ...p, stridaProc: 101 }] }).pole).toBe("polozky[0].stridaProc");
    expect(f({ napeti: 12, polozky: [{ ...p, hodinSezona: { zima: 25 } }] }).pole).toBe("polozky[0].hodinSezona.zima");
    expect(f({ napeti: 12, polozky: [{ prikonW: 10, pouzitiDenne: 2, na230V: false }] }).pole).toBe("polozky[0].minutNaPouziti");
    expect(f({ napeti: 12, polozky: [{ prikonW: 10, pouzitiDenne: 100, minutNaPouziti: 15, na230V: false }] }).pole).toBe("polozky[0].minutNaPouziti");
    expect(f({ napeti: 12, polozky: [{ prikonW: 10, na230V: false }] }).pole).toBe("polozky[0].hodinDenne");
  });
});
