import { useId, type ReactNode } from "react";

export type SegmentOption<V extends string> = {
  value: V;
  label: ReactNode;
  /** Druhý řádek (vysvětlení), např. „běžné vozy“. */
  sub?: ReactNode;
};

export type SegmentedControlProps<V extends string> = {
  /** Popisek skupiny (legend). Vždy viditelný. */
  legend: ReactNode;
  options: SegmentOption<V>[];
  value: V;
  onChange: (value: V) => void;
  name?: string;
  hint?: ReactNode;
};

/** Segmentový přepínač: skupina přepínačů (radio) ve vzhledu tlačítek. Ovládá se šipkami jako běžná skupina. */
export function SegmentedControl<V extends string>({ legend, options, value, onChange, name, hint }: SegmentedControlProps<V>) {
  const auto = useId();
  const groupName = name ?? `cx-seg${auto.replace(/:/g, "")}`;
  const hintId = hint ? `${groupName}-hint` : undefined;
  return (
    <fieldset className="cx-seg" aria-describedby={hintId}>
      <legend className="cx-label">{legend}</legend>
      <div className="cx-seg__options">
        {options.map((o) => (
          <label key={o.value} className="cx-seg__option">
            <input type="radio" name={groupName} value={o.value} checked={o.value === value} onChange={() => onChange(o.value)} />
            <span className="cx-seg__face">
              <span className="cx-seg__main">{o.label}</span>
              {o.sub ? <span className="cx-seg__sub">{o.sub}</span> : null}
            </span>
          </label>
        ))}
      </div>
      {hint ? (
        <p className="cx-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}
