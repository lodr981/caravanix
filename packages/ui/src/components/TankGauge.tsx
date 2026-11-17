import type { CSSProperties, ReactNode } from "react";

export type TankGaugeProps = {
  /** Úroveň 0–1 (převedený výstup výpočtu, nic se tu nepočítá). */
  level: number;
  /** Dělicí čárky v nádrži jako podíly výšky 0–1 (např. hranice dnů). */
  dividers?: number[];
  /** Přístupný popis obrázku (celý výsledek slovy). */
  label: string;
  /** Text vedle nádrže (vždy viditelný, např. „Jeden dílek = jeden den“). */
  caption?: ReactNode;
  /** Velký text na nádrži, např. „62 %“. */
  value?: ReactNode;
  /** Výška: větší u hlavního výsledku. */
  size?: "md" | "lg";
};

const clamp01 = (v: number) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);

/**
 * Baterie jako „nádrž“: svislé tělo s pólem a výplní podle úrovně. Výška výplně se mění krátkým přechodem
 * (200 ms, při omezeném pohybu bez animace). Prázdná nádrž má na dně tenkou linku barvy bloku.
 */
export function TankGauge({ level, dividers, label, caption, value, size = "md" }: TankGaugeProps) {
  const l = clamp01(level);
  return (
    <figure className={`cx-tank cx-tank--${size}`}>
      <div className="cx-tank__body" role="img" aria-label={label}>
        <span className="cx-tank__cap" aria-hidden="true" />
        <span
          className={`cx-tank__fill${l <= 0.001 ? " cx-tank__fill--empty" : l < 0.2 ? " cx-tank__fill--low" : ""}`}
          style={{ "--cx-level": String(l) } as CSSProperties}
          aria-hidden="true"
        />
        {dividers?.length ? (
          <span className="cx-tank__dividers" aria-hidden="true">
            {dividers
              .filter((d) => d > 0 && d < 1)
              .map((d) => (
                <i key={d} style={{ "--cx-d": String(d) } as CSSProperties} />
              ))}
          </span>
        ) : null}
        {value ? (
          <span className="cx-tank__value cx-num" aria-hidden="true">
            {value}
          </span>
        ) : null}
      </div>
      {caption ? <figcaption className="cx-tank__caption">{caption}</figcaption> : null}
    </figure>
  );
}
