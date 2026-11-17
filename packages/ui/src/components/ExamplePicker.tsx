import { useId, type ReactNode } from "react";

export type ExampleItem = {
  id: string;
  /** Krátký název, např. „Víkend v létě“. */
  label: string;
  /** Jedna věta, co příklad nastaví. */
  description?: string;
  /** Volitelná ikona (vždy jen vedle textu). */
  icon?: ReactNode;
};

export type ExamplePickerProps = {
  /** Nadpis řady, např. „Typické příklady“. */
  title: ReactNode;
  /** Věta pod nadpisem, např. „Klepnutím nastavíte celé zadání.“ */
  hint?: ReactNode;
  items: ExampleItem[];
  /** Příklad, kterému odpovídá aktuální zadání (zvýrazní se a má aria-pressed). */
  activeId?: string | null;
  onSelect: (id: string) => void;
};

/**
 * Typické příklady: řada velkých tlačítek nad formulářem. Jedno klepnutí nastaví celé zadání kalkulačky.
 * Když žádné příklady nejsou, nevykreslí nic.
 */
export function ExamplePicker({ title, hint, items, activeId, onSelect }: ExamplePickerProps) {
  const id = `cx-ex${useId().replace(/:/g, "")}`;
  if (!items.length) return null;
  return (
    <section className="cx-examples" aria-labelledby={`${id}-t`}>
      <div className="cx-examples__head">
        <h2 className="cx-examples__title" id={`${id}-t`}>
          {title}
        </h2>
        {hint ? <p className="cx-hint">{hint}</p> : null}
      </div>
      <ul className="cx-examples__list">
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <button
                type="button"
                className={`cx-example${active ? " cx-example--active" : ""}`}
                aria-pressed={active}
                onClick={() => onSelect(it.id)}
              >
                {it.icon ? <span className="cx-example__icon">{it.icon}</span> : null}
                <span className="cx-example__text">
                  <span className="cx-example__label">{it.label}</span>
                  {it.description ? <span className="cx-example__desc">{it.description}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
