import { useId, type CSSProperties, type ReactNode } from "react";
import { parseDecimal } from "../number.ts";
import { IconBlock } from "../icons.tsx";

export type NumberFieldProps = {
  /** Popisek nad polem. Vždy viditelný. */
  label: ReactNode;
  /** Aktuální text v poli (řízená komponenta; text, ne číslo, aby šla psát čárka). */
  value: string;
  /** Volá se při každé změně: surový text a přečtené číslo (null, když to není číslo). */
  onValueChange: (raw: string, parsed: number | null) => void;
  /** Jednotka za polem, např. „m“ nebo „W“. */
  unit?: ReactNode;
  /** Jednotka pro čtečku, když se viditelná jednotka čte špatně (např. „metrů“). */
  unitLabel?: string;
  /** Nápověda pod polem. */
  hint?: ReactNode;
  /** Chybová hláška (text dodá volající). Když je zadaná, pole je označené jako neplatné. */
  error?: ReactNode;
  id?: string;
  name?: string;
  /** Šířka pole ve znacích (výchozí 7). */
  size?: number;
  required?: boolean;
};

/** Číselné pole: popisek nad polem, inputmode="decimal", přijímá čárku i tečku. */
export function NumberField({ label, value, onValueChange, unit, unitLabel, hint, error, id, name, size = 7, required }: NumberFieldProps) {
  const auto = useId();
  const inputId = id ?? `cx-nf${auto.replace(/:/g, "")}`;
  const unitId = unit ? `${inputId}-unit` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const described = [unitId, hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`cx-field${error ? " cx-field--invalid" : ""}`}>
      <label className="cx-label" htmlFor={inputId}>
        {label}
      </label>
      <div className="cx-input" style={{ "--cx-input-ch": `${size + 1}ch` } as CSSProperties}>
        <input
          id={inputId}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="done"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
          value={value}
          onChange={(e) => onValueChange(e.target.value, parseDecimal(e.target.value))}
        />
        {unit ? (
          <span className="cx-input__unit" id={unitId} aria-label={unitLabel}>
            {unit}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p className="cx-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="cx-field__error" id={errId}>
          <IconBlock className="cx-icon" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
