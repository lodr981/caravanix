// Ikony design systému. Vždy dekorativní (aria-hidden): ikona se nikdy nepoužívá bez textu.
import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps, children: ReactElement | ReactElement[]) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

/** Stav OK: kruh s fajfkou. */
export const IconOk = (p: IconProps) =>
  base(p, [<circle key="c" cx="12" cy="12" r="9.5" />, <path key="p" d="M7.6 12.4l3 3 5.8-6.3" />]);
/** Varování: trojúhelník s vykřičníkem. */
export const IconWarn = (p: IconProps) =>
  base(p, [
    <path key="t" d="M12 3.2L1.9 20.5h20.2z" />,
    <path key="l" d="M12 10v4.6" />,
    <circle key="d" cx="12" cy="17.5" r="0.4" fill="currentColor" />,
  ]);
/** Blok: osmiúhelník s vodorovnou čárou (značka „stop“ bez textu). */
export const IconBlock = (p: IconProps) =>
  base(p, [<path key="o" d="M8 2.5h8l5.5 5.5v8L16 21.5H8L2.5 16V8z" />, <path key="l" d="M7.5 12h9" />]);
export const IconInfo = (p: IconProps) =>
  base(p, [
    <circle key="c" cx="12" cy="12" r="9.5" />,
    <path key="l" d="M12 11v5.5" />,
    <circle key="d" cx="12" cy="7.6" r="0.4" fill="currentColor" />,
  ]);
export const IconShare = (p: IconProps) =>
  base(p, [
    <circle key="a" cx="18" cy="5" r="2.8" />,
    <circle key="b" cx="6" cy="12" r="2.8" />,
    <circle key="c" cx="18" cy="19" r="2.8" />,
    <path key="l" d="M8.5 10.6l7-4.1M8.5 13.4l7 4.1" />,
  ]);
export const IconLink = (p: IconProps) =>
  base(p, [
    <path key="a" d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6" />,
    <path key="b" d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />,
  ]);
export const IconSun = (p: IconProps) =>
  base(p, [
    <circle key="c" cx="12" cy="12" r="4.2" />,
    <path key="r" d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />,
  ]);
export const IconMoon = (p: IconProps) => base(p, <path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z" />);
export const IconMinus = (p: IconProps) => base(p, <path d="M5.5 12h13" />);
export const IconPlus = (p: IconProps) => base(p, <path d="M12 5.5v13M5.5 12h13" />);
export const IconArrowRight = (p: IconProps) => base(p, <path d="M4.5 12h14.5M13.5 6.5L19 12l-5.5 5.5" />);

/** Značka Caravanixu: řez vodičem (prstenec izolace a měděné jádro). */
export const Logo = (p: IconProps) => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" {...p}>
    <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="16" r="6.5" fill="var(--cx-copper)" />
  </svg>
);
