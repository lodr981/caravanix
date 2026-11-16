import type { ReactNode } from "react";
import { STATUS_ICON, type Status } from "./Notice.tsx";

export type ResultValue = {
  /** Popis hodnoty, např. „Průřez kabelu“. */
  label: ReactNode;
  /** Číslo už naformátované podle jazyka, např. „2,5“. */
  value: string;
  /** Jednotka, např. „mm²“. */
  unit?: ReactNode;
  /** Řádek pod číslem, např. „nejbližší vyšší průřez“. */
  note?: ReactNode;
};

export type ResultCardProps = {
  /** Nadpis karty, např. „Výsledek“. */
  title: ReactNode;
  /** Úroveň nadpisu podle místa na stránce (výchozí h2). */
  headingLevel?: 2 | 3;
  /** Hlavní výsledek: největší a nejkontrastnější věc na obrazovce. */
  primary: ResultValue;
  /** Další hodnoty na displeji (nejvýš tři). */
  secondary?: ResultValue[];
  /** Stav na displeji: barva, ikona a slovo. */
  status?: { kind: Status; word: ReactNode };
  /** Jedna jasná věta, co z výsledku plyne. Ohlásí se čtečce při změně. */
  summary?: ReactNode;
  /** Obsah pod displejem: rozpis, hlášky, tlačítka. */
  children?: ReactNode;
  /** Text nad nadpisem vpravo, např. „Ukázková data“. */
  meta?: ReactNode;
  id?: string;
};

/**
 * Karta výsledku s tmavým „displejem“ (prvek ze směru 3 v Dílně). Displej je tmavý v obou režimech.
 * Při změně hodnoty se číslo krátce roztmí (klíč = hodnota); při omezeném pohybu bez animace.
 */
export function ResultCard({ title, headingLevel = 2, primary, secondary, status, summary, children, meta, id }: ResultCardProps) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const StatusIcon = status ? STATUS_ICON[status.kind] : null;
  return (
    <section className="cx-result" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="cx-result__head">
        <H className="cx-result__title" id={id ? `${id}-title` : undefined}>
          {title}
        </H>
        {meta ? <p className="cx-result__meta">{meta}</p> : null}
      </div>
      <div className="cx-display">
        <div className="cx-display__primary">
          <p className="cx-display__label">{primary.label}</p>
          <p className="cx-display__value cx-num">
            <span key={primary.value} className="cx-display__number">
              {primary.value}
            </span>
            {primary.unit ? <span className="cx-display__unit">{primary.unit}</span> : null}
          </p>
          {primary.note ? <p className="cx-display__note">{primary.note}</p> : null}
        </div>
        {secondary?.length ? (
          <dl className="cx-display__grid">
            {secondary.map((s, i) => (
              <div key={i} className="cx-display__item">
                <dt className="cx-display__label">{s.label}</dt>
                <dd className="cx-display__small cx-num">
                  <span key={s.value} className="cx-display__number">
                    {s.value}
                  </span>
                  {s.unit ? <span className="cx-display__unit">{s.unit}</span> : null}
                  {s.note ? <span className="cx-display__note">{s.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {status || summary ? (
          <div className="cx-display__foot" aria-live="polite" aria-atomic="true">
            {status && StatusIcon ? (
              <p className={`cx-display__status cx-display__status--${status.kind}`}>
                <StatusIcon className="cx-icon" />
                <span>{status.word}</span>
              </p>
            ) : null}
            {summary ? <p className="cx-display__summary">{summary}</p> : null}
          </div>
        ) : null}
      </div>
      {children ? <div className="cx-result__body">{children}</div> : null}
    </section>
  );
}
