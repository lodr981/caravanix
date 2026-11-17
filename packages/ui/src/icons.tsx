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

// Ikony kalkulaček a skupin spotřebičů: vlastní obrysy, jeden styl (tah 2,2, zaoblené konce), bez log a značek.
/** Baterie: tělo s pólem nahoře a dvěma dílky. */
export const IconBattery = (p: IconProps) =>
  base(p, [
    <rect key="b" x="5" y="5" width="14" height="16.5" rx="2" />,
    <path key="p" d="M9.5 2.5h5" />,
    <path key="d" d="M8.5 11h7M8.5 15.5h7" />,
  ]);
/** Solární panel: šikmá plocha s mřížkou a stojánkem. */
export const IconSolarPanel = (p: IconProps) =>
  base(p, [
    <path key="o" d="M5 4.5h14l2.5 10.5h-19z" />,
    <path key="m" d="M12 4.5v10.5M3.8 9.75h16.4M8.5 4.5l-1 10.5M15.5 4.5l1 10.5" />,
    <path key="s" d="M12 15v4.5M8.5 20.5h7" />,
  ]);
/** Zásuvka 230 V / spotřebič: vidlice s kabelem. */
export const IconPlug = (p: IconProps) =>
  base(p, [
    <path key="v" d="M9 2.5v4.5M15 2.5v4.5" />,
    <path key="t" d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0z" />,
    <path key="k" d="M12 16v5.5" />,
  ]);
/** Měnič: skříňka se sinusovkou. */
export const IconInverter = (p: IconProps) =>
  base(p, [
    <rect key="r" x="2.5" y="5" width="19" height="14" rx="2" />,
    <path key="s" d="M6 12c1.5-4 3-4 4.5 0s3 4 4.5 0 3-4 3.5-1" />,
  ]);
/** Dodávka: obrys vozu s koly (jízda, booster, soběstačnost). */
export const IconVan = (p: IconProps) =>
  base(p, [
    <path key="k" d="M2.5 17V8a2.5 2.5 0 0 1 2.5-2.5h10l4 5 2.5 1.2V17h-2" />,
    <path key="p" d="M9.5 17h5" />,
    <path key="o" d="M15 5.5v5h4" />,
    <circle key="a" cx="7" cy="17.5" r="2.2" />,
    <circle key="b" cx="17" cy="17.5" r="2.2" />,
  ]);
/** Kabel: řez vodičem s vývodem. */
export const IconCable = (p: IconProps) =>
  base(p, [
    <circle key="o" cx="8.5" cy="12" r="6" />,
    <circle key="j" cx="8.5" cy="12" r="2.2" fill="currentColor" />,
    <path key="v" d="M14.5 12h7" />,
  ]);
/** Blesk: jízda a alternátor (booster). */
export const IconBolt = (p: IconProps) => base(p, <path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z" />);
/** Lednice (skupina chlazení). */
export const IconFridge = (p: IconProps) =>
  base(p, [<rect key="r" x="5.5" y="2.5" width="13" height="19" rx="2" />, <path key="d" d="M5.5 9.5h13M9 5.5v1.5M9 12.5v3" />]);
/** Vločka (klimatizace). */
export const IconSnow = (p: IconProps) =>
  base(p, <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5M9.5 4l2.5 2 2.5-2M9.5 20l2.5-2 2.5 2" />);
/** Plamen (topení). */
export const IconFlame = (p: IconProps) =>
  base(p, <path d="M12 21.5c-3.9 0-6.5-2.6-6.5-6.2 0-3.6 3-5.6 3.5-9.8 2.2 1.3 3.4 3.3 3.5 5.2 1-.8 1.6-2 1.7-3.3 2.4 2 4.3 4.9 4.3 7.9 0 3.6-2.6 6.2-6.5 6.2z" />);
/** Hrnec (vaření). */
export const IconPot = (p: IconProps) =>
  base(p, [
    <path key="h" d="M4.5 10h15v6.5a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4z" />,
    <path key="u" d="M2 11.5h2.5M19.5 11.5H22" />,
    <path key="p" d="M9 3.5c0 1.5 1 1.5 1 3M14 3.5c0 1.5 1 1.5 1 3" />,
  ]);
/** Kapka (voda). */
export const IconDrop = (p: IconProps) => base(p, <path d="M12 2.8c3.3 4 6 7.4 6 11a6 6 0 0 1-12 0c0-3.6 2.7-7 6-11z" />);
/** Žárovka (elektronika a světla). */
export const IconBulb = (p: IconProps) =>
  base(p, [
    <path key="z" d="M9 17.5v-1.8c0-1.3-.6-2.2-1.6-3.3A6 6 0 1 1 18 8.5c0 1.6-.6 2.8-1.4 3.9-.9 1.1-1.6 2-1.6 3.3v1.8z" />,
    <path key="p" d="M9.5 21h5" />,
  ]);
/** Kalendář (dny). */
export const IconCalendar = (p: IconProps) =>
  base(p, [<rect key="r" x="3.5" y="5" width="17" height="16" rx="2" />, <path key="l" d="M3.5 10h17M8 2.8v4M16 2.8v4" />]);

/** Značka Caravanixu: řez vodičem (prstenec izolace a měděné jádro). */
export const Logo = (p: IconProps) => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" {...p}>
    <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="16" r="6.5" fill="var(--cx-copper)" />
  </svg>
);
