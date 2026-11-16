import type { ReactNode } from "react";
import { IconMoon, IconSun, Logo } from "../icons.tsx";
import { THEME_TOGGLE_ATTR } from "../theme.ts";

export type ThemeToggleProps = {
  /** Text tlačítka ve světlém režimu (přepne na tmavý), např. „Tmavý režim“. */
  toDark: ReactNode;
  /** Text tlačítka v tmavém režimu (přepne na světlý), např. „Světlý režim“. */
  toLight: ReactNode;
};

/**
 * Přepínač režimu. Obsluhu kliknutí dělá inline skript z `themeInitScript` (delegovaný posluchač),
 * takže tlačítko funguje bez hydratace. Viditelný text vždy říká, na co se přepne; který text je vidět,
 * určuje CSS podle <html data-theme>. Bez JavaScriptu je tlačítko skryté a platí nastavení zařízení.
 */
export function ThemeToggle({ toDark, toLight }: ThemeToggleProps) {
  return (
    <button type="button" className="cx-btn cx-btn--secondary cx-theme-toggle" {...{ [THEME_TOGGLE_ATTR]: "" }}>
      <span className="cx-theme-toggle__to-dark">
        <IconMoon className="cx-icon" />
        <span>{toDark}</span>
      </span>
      <span className="cx-theme-toggle__to-light">
        <IconSun className="cx-icon" />
        <span>{toLight}</span>
      </span>
    </button>
  );
}

export type NavItem = { href: string; label: ReactNode; current?: boolean };

export type SiteHeaderProps = {
  /** Název webu (slovní značka). */
  brand: ReactNode;
  brandHref: string;
  /** Přístupný název odkazu na úvod, např. „Caravanix, úvodní stránka“. */
  brandLabel?: string;
  /** Odkazy hlavní navigace. Na mobilu se zalomí pod značku, nic se neschovává do menu. */
  nav?: NavItem[];
  /** Přístupný název navigace, např. „Hlavní navigace“. */
  navLabel?: string;
  /** Texty přepínače režimu. */
  theme: ThemeToggleProps;
  /** Odkaz „Přeskočit na obsah“ (cíl a text). */
  skip?: { href: string; label: ReactNode };
};

export function SiteHeader({ brand, brandHref, brandLabel, nav, navLabel, theme, skip }: SiteHeaderProps) {
  return (
    <header className="cx-header">
      {skip ? (
        <a className="cx-skip" href={skip.href}>
          {skip.label}
        </a>
      ) : null}
      <div className="cx-wrap cx-header__inner">
        <a className="cx-brand" href={brandHref} aria-label={brandLabel}>
          <Logo className="cx-brand__mark" />
          <span className="cx-brand__name">{brand}</span>
        </a>
        {nav?.length ? (
          <nav className="cx-nav" aria-label={navLabel}>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} aria-current={n.current ? "page" : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="cx-header__tools">
          <ThemeToggle {...theme} />
        </div>
      </div>
    </header>
  );
}
