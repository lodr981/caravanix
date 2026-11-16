// Porovnání výsledku enginu v2 s nezávislou referencí v2 (docs/KALKULACKA_PRUREZU.md, Golden test, bod 2).

import type { RadekTabulky, VysledekVodice } from "../../src/vodic.ts";

export const TOL = 1e-9;

function blizko(a: unknown, b: number): boolean {
  return typeof a === "number" && Number.isFinite(a) && Math.abs(a - b) <= TOL;
}

/** Vrací seznam rozdílů engine (act) vs. reference (exp); prázdný = shoda. */
export function porovnej(exp: VysledekVodice, act: VysledekVodice): string[] {
  const d: string[] = [];
  if (!act || typeof act !== "object") return [`výsledek není objekt: ${String(act)}`];
  if (act.stav !== exp.stav) d.push(`stav ${String(act.stav)} ≠ ${exp.stav}`);
  // Kódy hlášek a jejich pořadí: přesně.
  if (JSON.stringify(act.hlasky) !== JSON.stringify(exp.hlasky))
    d.push(`hlasky ${JSON.stringify(act.hlasky)} ≠ ${JSON.stringify(exp.hlasky)}`);
  if (exp.stav === "chyba") {
    // Proud u HLAVNI_VEDENI a ANI_120_NESTACI (reference ho tam vrací), tolerance 1e-9.
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
  if (!awgOk) d.push(`awg ${JSON.stringify(act.awg)} ≠ ${JSON.stringify(exp.awg)}`);
  for (const k of ["proud", "prikon", "ubytekV", "ubytekProc", "napetiUSpotrebice", "ztrata", "maxDelka"] as const)
    if (!blizko(act[k], exp[k])) d.push(`${k} ${String(act[k])} ≠ ${exp[k]}`);
  return d;
}

/** Porovnání jednoho řádku referenční tabulky. */
export function porovnejRadek(exp: RadekTabulky, act: RadekTabulky): string[] {
  const d: string[] = [];
  if (!act || typeof act !== "object") return [`řádek není objekt: ${String(act)}`];
  if (act.prurez !== exp.prurez) d.push(`prurez ${String(act.prurez)} ≠ ${exp.prurez}`);
  if (!act.awg || act.awg.oznaceni !== exp.awg.oznaceni || act.awg.plocha !== exp.awg.plocha)
    d.push(`awg ${JSON.stringify(act.awg)} ≠ ${JSON.stringify(exp.awg)}`);
  for (const u of ["par", "kostra", "svazek", "motor"] as const)
    if (act.maxPojistka?.[u] !== exp.maxPojistka[u]) d.push(`maxPojistka.${u} ${String(act.maxPojistka?.[u])} ≠ ${exp.maxPojistka[u]}`);
  if (act.maxPojistka && Object.keys(act.maxPojistka).length !== 4) d.push(`maxPojistka má klíče ${Object.keys(act.maxPojistka).join(",")}`);
  for (const k of ["delka3", "delka10"] as const) if (!blizko(act[k], exp[k])) d.push(`${k} ${String(act[k])} ≠ ${exp[k]}`);
  return d;
}
