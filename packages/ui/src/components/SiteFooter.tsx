import type { ReactNode } from "react";
import { IconInfo } from "../icons.tsx";

export type SiteFooterProps = {
  /**
   * Slot pro upozornění „podklad, ne revize“ (zásada 7). Na stránkách s výpočtem povinné.
   * Vykreslí se v plné velikosti základního textu, ne drobným písmem.
   */
  notice?: ReactNode;
  /** Odkazy v patičce. */
  links?: { href: string; label: ReactNode }[];
  /** Přístupný název navigace v patičce. */
  linksLabel?: string;
  /** Drobný text na konci (provozovatel, rok, zdroje). Nejmenší písmo na webu, 14,4 px. */
  meta?: ReactNode;
};

export function SiteFooter({ notice, links, linksLabel, meta }: SiteFooterProps) {
  return (
    <footer className="cx-footer">
      <div className="cx-wrap">
        {notice ? (
          <div className="cx-footer__notice">
            <IconInfo className="cx-icon" />
            <div>{notice}</div>
          </div>
        ) : null}
        {links?.length ? (
          <nav className="cx-footer__links" aria-label={linksLabel}>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        {meta ? <div className="cx-footer__meta">{meta}</div> : null}
      </div>
    </footer>
  );
}
