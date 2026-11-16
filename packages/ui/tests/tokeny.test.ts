// Kontrast tokenů a čtení čísel z polí. Stejná kontrola běží v tools/design/tokeny.mjs.
import { describe, expect, it } from "vitest";
import { color, contrastPairs, contrastRatio } from "../src/tokens.ts";
import { parseDecimal } from "../src/number.ts";

describe("kontrast tokenů", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const p of contrastPairs) {
      it(`${mode}: ${p.label} ≥ ${p.min}`, () => {
        expect(contrastRatio(color[mode][p.fg], color[mode][p.bg])).toBeGreaterThanOrEqual(p.min);
      });
    }
  }
});

describe("parseDecimal", () => {
  it("přijímá čárku i tečku", () => {
    expect(parseDecimal("2,5")).toBe(2.5);
    expect(parseDecimal("2.5")).toBe(2.5);
    expect(parseDecimal(" 1 200 ")).toBe(1200);
    expect(parseDecimal("1 200,5")).toBe(1200.5);
    expect(parseDecimal(",5")).toBe(0.5);
    expect(parseDecimal("3,")).toBe(3);
    expect(parseDecimal("−1")).toBe(-1);
  });
  it("odmítne, co není jedno číslo", () => {
    for (const s of ["", " ", "abc", "2,5,1", "1.200,5", "2,5 m", "-"]) expect(parseDecimal(s)).toBeNull();
  });
});
