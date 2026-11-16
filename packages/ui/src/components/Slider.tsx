import { useId, type CSSProperties, type ReactNode } from "react";
import { IconMinus, IconPlus } from "../icons.tsx";

export type SliderMark = {
  value: number;
  /** Krátký popis značky (např. „od 2,6 m: 4 mm²“). Zobrazí se jako title; podstatné patří do `note`. */
  label?: string;
};

export type SliderProps = {
  label: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** Text hodnoty, jak se zobrazí i přečte (např. „2,3 m“). */
  formatValue: (value: number) => string;
  /** Viditelný text tlačítek − a + (např. „0,1“) a jejich přístupné názvy (např. „Kratší o 0,1 m“). */
  decrement: { text: ReactNode; label: string };
  increment: { text: ReactNode; label: string };
  /** Značky na stupnici, kde výsledek skočí na další stupeň. */
  marks?: SliderMark[];
  /** Věta pod posuvníkem, např. „Od 2,6 m bude potřeba 4 mm²“. */
  note?: ReactNode;
  id?: string;
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Posuvník s tlačítky − a + (jemné nastavení bez tahu), hodnotou nahoře a značkami skoků. */
export function Slider({ label, value, onChange, min, max, step, formatValue, decrement, increment, marks, note, id }: SliderProps) {
  const auto = useId();
  const inputId = id ?? `cx-sl${auto.replace(/:/g, "")}`;
  const noteId = note ? `${inputId}-note` : undefined;
  const decimals = (String(step).split(".")[1] ?? "").length;
  const round = (v: number) => Number(clamp(v, min, max).toFixed(decimals));
  const pct = ((clamp(value, min, max) - min) / (max - min)) * 100;
  return (
    <div className="cx-slider">
      <div className="cx-slider__head">
        <label className="cx-label" htmlFor={inputId}>
          {label}
        </label>
        <output className="cx-slider__value" htmlFor={inputId} aria-hidden="true">
          {formatValue(value)}
        </output>
      </div>
      <div className="cx-slider__row">
        <button
          type="button"
          className="cx-btn cx-btn--secondary cx-slider__step"
          aria-label={decrement.label}
          onClick={() => onChange(round(value - step))}
          disabled={value <= min}
        >
          <IconMinus className="cx-icon" />
          <span aria-hidden="true">{decrement.text}</span>
        </button>
        <div className="cx-slider__track" style={{ "--cx-p": `${pct}%` } as CSSProperties}>
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-valuetext={formatValue(value)}
            aria-describedby={noteId}
            onChange={(e) => onChange(round(Number(e.target.value)))}
          />
          {marks?.length ? (
            <div className="cx-slider__marks" aria-hidden="true">
              {marks
                .filter((m) => m.value >= min && m.value <= max)
                .map((m) => (
                  <i key={m.value} title={m.label} style={{ left: `${((m.value - min) / (max - min)) * 100}%` }} />
                ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="cx-btn cx-btn--secondary cx-slider__step"
          aria-label={increment.label}
          onClick={() => onChange(round(value + step))}
          disabled={value >= max}
        >
          <IconPlus className="cx-icon" />
          <span aria-hidden="true">{increment.text}</span>
        </button>
      </div>
      {note ? (
        <p className="cx-hint cx-slider__note" id={noteId} aria-live="polite">
          {note}
        </p>
      ) : null}
    </div>
  );
}
