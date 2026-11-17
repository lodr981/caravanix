import type { CSSProperties, ReactNode } from "react";

export type BarTone = "copper" | "accent" | "ok" | "warn" | "block" | "muted";

export type BarRow = {
  /** Popis řádku (vždy text; ikona jen doplňuje). */
  label: ReactNode;
  /** Hodnota už naformátovaná, např. „540 Wh“. */
  value: ReactNode;
  /** Délka pruhu 0–1 (převedený výstup výpočtu). */
  share: number;
  tone?: BarTone;
  icon?: ReactNode;
  /** Svislá značka na pruhu 0–1, např. limit regulátoru, a její popis (viditelný pod pruhem). */
  mark?: { at: number; label: ReactNode };
  /** Řádek pod pruhem. */
  note?: ReactNode;
};

export type BarListProps = {
  rows: BarRow[];
  /** Titulek seznamu (volitelně). */
  caption?: ReactNode;
};

const clamp01 = (v: number) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);

/**
 * Seznam vodorovných pruhů: popis, hodnota a pruh poměru. Čísla jsou vždy napsaná, pruh jen ukazuje tvar.
 * Šířka pruhu se mění krátkým přechodem (při omezeném pohybu bez animace).
 */
export function BarList({ rows, caption }: BarListProps) {
  return (
    <figure className="cx-bars">
      {caption ? <figcaption className="cx-bars__caption">{caption}</figcaption> : null}
      <ul className="cx-bars__list">
        {rows.map((r, i) => (
          <li key={i} className={`cx-bars__row cx-bars__row--${r.tone ?? "copper"}`}>
            <div className="cx-bars__head">
              <span className="cx-bars__label">
                {r.icon ? <span className="cx-bars__icon">{r.icon}</span> : null}
                <span>{r.label}</span>
              </span>
              <b className="cx-bars__value cx-num">{r.value}</b>
            </div>
            <div className="cx-bars__track" aria-hidden="true">
              <span className="cx-bars__fill" style={{ "--cx-share": `${clamp01(r.share) * 100}%` } as CSSProperties} />
              {r.mark ? <i className="cx-bars__mark" style={{ left: `${clamp01(r.mark.at) * 100}%` }} /> : null}
            </div>
            {r.mark || r.note ? (
              <p className="cx-bars__note">
                {r.note}
                {r.mark && r.note ? " " : null}
                {r.mark ? <span className="cx-bars__marklabel">{r.mark.label}</span> : null}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </figure>
  );
}
