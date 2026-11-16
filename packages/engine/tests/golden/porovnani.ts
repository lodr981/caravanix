// Porovnání výsledku enginu s referencí pro golden test.

import type { VysledekVodice } from "../../src/vodic.ts";

export const TOL = 1e-9;

function blizko(a: unknown, b: number): boolean {
  return typeof a === "number" && Number.isFinite(a) && Math.abs(a - b) <= TOL;
}

/** Vrací seznam rozdílů engine (act) vs. reference (exp); prázdný = shoda. */
export function porovnej(exp: VysledekVodice, act: VysledekVodice): string[] {
  const d: string[] = [];
  if (!act || typeof act !== "object") return [`výsledek není objekt: ${String(act)}`];
  if (act.stav !== exp.stav) d.push(`stav ${String(act.stav)} ≠ ${exp.stav}`);
  if (JSON.stringify(act.hlasky) !== JSON.stringify(exp.hlasky))
    d.push(`hlasky ${JSON.stringify(act.hlasky)} ≠ ${JSON.stringify(exp.hlasky)}`);
  if (exp.stav === "chyba") {
    // Proud se porovnává tam, kde ho reference ukazuje (MIMO_ROZSAH).
    if (exp.proud !== undefined && !blizko(act.proud, exp.proud)) d.push(`proud ${String(act.proud)} ≠ ${exp.proud}`);
    return d;
  }
  if (act.stav !== "ok") return d;
  for (const k of ["prurez", "pojistka", "maxPojistka", "rozhodlo"] as const)
    if (act[k] !== exp[k]) d.push(`${k} ${String(act[k])} ≠ ${String(exp[k])}`);
  const awgOk =
    exp.awg === null
      ? act.awg === null
      : act.awg != null && act.awg.oznaceni === exp.awg.oznaceni && act.awg.plocha === exp.awg.plocha;
  if (!awgOk)
    d.push(`awg ${JSON.stringify(act.awg)} ≠ ${JSON.stringify(exp.awg)}`);
  for (const k of ["proud", "prikon", "ubytekV", "ubytekProc", "napetiUSpotrebice", "ztrata", "maxDelka"] as const)
    if (!blizko(act[k], exp[k])) d.push(`${k} ${String(act[k])} ≠ ${exp[k]}`);
  return d;
}
