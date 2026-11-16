import type { ReactNode } from "react";
import { Logo } from "../icons.tsx";
import { STATUS_ICON, type Status } from "./Notice.tsx";
import type { ResultValue } from "./ResultCard.tsx";

export type ShareCardProps = {
  /** Název webu na kartě. */
  brand: ReactNode;
  /** Co se počítalo, např. „Průřez kabelu pro lednici“. */
  title: ReactNode;
  /** Hodnoty (první je hlavní). Nejvýš tři, ať je karta čitelná i jako náhled ve WhatsAppu. */
  values: ResultValue[];
  /** Vstupy v jedné řádce, např. „12 V · 120 W · 2,3 m“. */
  inputs?: ReactNode;
  status?: { kind: Status; word: ReactNode };
  /** Adresa bez https://, jak se zobrazí na kartě. */
  url: ReactNode;
  /** Upozornění „podklad, ne revize“ zkráceně. Patří na každou kartu s výpočtem. */
  disclaimer: ReactNode;
  /** Tlačítka pod kartou (Sdílet, Kopírovat odkaz). */
  actions?: ReactNode;
  /** Přístupný popis karty, např. „Náhled karty ke sdílení“. */
  label?: string;
};

/**
 * Karta ke sdílení: úhledný výsledek v poměru stran náhledu odkazu (asi 1,91 : 1 na širokém okně).
 * Je to HTML, ze kterého se později vyrenderuje obrázek (Open Graph); na stránce slouží jako náhled.
 */
export function ShareCard({ brand, title, values, inputs, status, url, disclaimer, actions, label }: ShareCardProps) {
  const [main, ...rest] = values;
  const StatusIcon = status ? STATUS_ICON[status.kind] : null;
  return (
    <div className="cx-share">
      <figure className="cx-share__card" aria-label={label}>
        <div className="cx-share__top">
          <span className="cx-share__brand">
            <Logo className="cx-share__mark" />
            {brand}
          </span>
          {status && StatusIcon ? (
            <span className={`cx-display__status cx-display__status--${status.kind}`}>
              <StatusIcon className="cx-icon" />
              <span>{status.word}</span>
            </span>
          ) : null}
        </div>
        <p className="cx-share__title">{title}</p>
        {inputs ? <p className="cx-share__inputs cx-num">{inputs}</p> : null}
        <div className="cx-share__values">
          {main ? (
            <div className="cx-share__main">
              <span className="cx-display__label">{main.label}</span>
              <span className="cx-share__big cx-num">
                {main.value}
                {main.unit ? <span className="cx-display__unit">{main.unit}</span> : null}
              </span>
            </div>
          ) : null}
          {rest.map((v, i) => (
            <div key={i} className="cx-share__more">
              <span className="cx-display__label">{v.label}</span>
              <span className="cx-share__mid cx-num">
                {v.value}
                {v.unit ? <span className="cx-display__unit">{v.unit}</span> : null}
              </span>
            </div>
          ))}
        </div>
        <figcaption className="cx-share__foot">
          <span className="cx-share__url">{url}</span>
          <span className="cx-share__disclaimer">{disclaimer}</span>
        </figcaption>
      </figure>
      {actions ? <div className="cx-share__actions">{actions}</div> : null}
    </div>
  );
}
