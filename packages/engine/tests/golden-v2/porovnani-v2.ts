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
    // Proud u HLAVNI_VEDENI a ANI_120_NESTACI (bod 5 a 7: „vrací i proud“), tolerance 1e-9.
    // Bod 2: MOTOR_NEPOCITA „bez proudu“, engine proud vracet nesmí. U NEPLATNY_VSTUP zadání nic neříká
    // (typ ho nepožaduje), proto se tam nekontroluje.
    const actProud = (act as { proud?: unknown }).proud;
    if (exp.hlasky[0] === "MOTOR_NEPOCITA" && actProud !== undefined)
      d.push(`proud ${String(actProud)} u MOTOR_NEPOCITA (má být bez proudu)`);
    if (exp.proud !== undefined && !blizko((act as { proud?: unknown }).proud, exp.proud))
      d.push(`proud ${String((act as { proud?: unknown }).proud)} ≠ ${exp.proud}`);
    return d;
  }
  if (act.stav !== "ok") return d;
  for (const k of ["prurez", "pojistka", "rodinaPojistky", "maxPojistka", "rozhodlo"] as const)
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
  if (act.rho !== exp.rho) d.push(`rho ${String(act.rho)} ≠ ${exp.rho}`);
  if (!act.awg || act.awg.oznaceni !== exp.awg.oznaceni || act.awg.plocha !== exp.awg.plocha)
    d.push(`awg ${JSON.stringify(act.awg)} ≠ ${JSON.stringify(exp.awg)}`);
  for (const u of ["par", "kostra", "svazek"] as const)
    if (act.maxPojistka?.[u] !== exp.maxPojistka[u])
      d.push(`maxPojistka.${u} ${String(act.maxPojistka?.[u])} ≠ ${exp.maxPojistka[u]}`);
  if (act.maxPojistka && Object.keys(act.maxPojistka).sort().join(",") !== "kostra,par,svazek")
    d.push(`maxPojistka má klíče ${Object.keys(act.maxPojistka).join(",")}`);
  for (const k of ["delka3", "delka10"] as const) if (!blizko(act[k], exp[k])) d.push(`${k} ${String(act[k])} ≠ ${exp[k]}`);
  return d;
}
