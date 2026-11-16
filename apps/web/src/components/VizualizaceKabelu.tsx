// Vizualizace výsledku kalkulačky průřezu (nápady skupiny A 1–3). Nic nepočítají sami:
// průřez, proud a max. pojistku dostanou z enginu, hranici délky spočítá engine (dalsiStupen).
import { navrhVodice, type VstupVodice } from "@caravanix/engine";
import { STATUS_ICON, formatDecimal } from "@caravanix/ui";

type Texts = Record<string, string>;
const NBSP = " ";
const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP);
const fill = (text: string | undefined, vars: Record<string, string>) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

/** Řez měděným jádrem ve skutečné velikosti: průměr kruhu o ploše `prurez` mm², kresleno v CSS milimetrech. */
export function RezKabelu({ prurez, t }: { prurez: number; t: Texts }) {
  const d = 2 * Math.sqrt(prurez / Math.PI); // průměr jádra [mm]
  const ram = Math.max(d + 4, 12); // plátno kolem jádra [mm]
  const c = ram / 2;
  return (
    <figure className="kv-rez">
      <svg width={`${ram}mm`} height={`${ram}mm`} viewBox={`0 0 ${ram} ${ram}`} role="img" aria-label={fill(t["rez.aria"], { prurez: fmt(prurez, 2), d: fmt(d, 1) })}>
        <circle cx={c} cy={c} r={d / 2} className="kv-rez__jadro" />
        <circle cx={c} cy={c} r={d / 2} className="kv-rez__obrys" />
      </svg>
      <figcaption>
        <b>{t["rez.label"]}</b>
        <span className="cx-hint">{fill(t["rez.note"], { d: fmt(d, 1) })}</span>
      </figcaption>
    </figure>
  );
}

/** Zatížení kabelu: podíl proudu k max. pojistce kabelu, slovem, ikonou i barvou. */
export function ZatizeniKabelu({ proud, maxPojistka, t }: { proud: number; maxPojistka: number; t: Texts }) {
  const podil = maxPojistka > 0 ? Math.min(1, proud / maxPojistka) : 1;
  const stupen = podil < 0.4 ? "nizke" : podil < 0.65 ? "stredni" : "vysoke";
  const Ikona = STATUS_ICON[stupen === "vysoke" ? "warn" : "ok"];
  return (
    <div className={`kv-zat kv-zat--${stupen}`}>
      <div className="kv-zat__hlava">
        <span className="cx-label">{t["zat.label"]}</span>
        <span className="kv-zat__slovo">
          <Ikona className="cx-icon" aria-hidden="true" /> {t[`zat.${stupen}`]}
        </span>
      </div>
      <div className="kv-zat__kabel" aria-hidden="true">
        <i style={{ width: `${Math.round(podil * 100)}%` }} />
      </div>
      <p className="cx-hint">{fill(t["zat.text"], { proc: fmt(podil * 100, 0), max: fmt(maxPojistka, 1) })}</p>
    </div>
  );
}

export interface Hranice {
  /** Délka [m], od které je potřeba jiný výsledek. */
  delka: number;
  /** Nový průřez, nebo null, když od té délky kabel nenajde (chyba). */
  prurez: number | null;
}

/**
 * Nejbližší delší délka (krok 0,1 m, nejvýš `max`), při které engine vrátí větší průřez nebo chybu.
 * null = do `max` stačí současný průřez.
 */
export function dalsiStupen(vstup: VstupVodice, prurez: number, max = 20): Hranice | null {
  for (let l = Math.round(vstup.delka * 10) + 1; l <= Math.round(max * 10); l++) {
    const delka = l / 10;
    const r = navrhVodice({ ...vstup, delka });
    if (r.stav !== "ok") return { delka, prurez: null };
    if (r.prurez > prurez) return { delka, prurez: r.prurez };
  }
  return null;
}
