// Ikony design systému. Vždy dekorativní (aria-hidden): ikona se nikdy nepoužívá bez textu.
//
// Základ je Phosphor Icons, řez Bold (MIT, © 2023 Phosphor Icons, licence v LICENSE-phosphor.txt vedle tohoto
// souboru; evidence v docs/licence/EVIDENCE.md). Cesty jsou zkopírované z @phosphor-icons/core 2.1.1
// (assets/bold), bez závislosti. Bold má na mřížce 256 tah 24 jednotek, tedy 2,25 px na mřížce 24.
// Vlastní ikony oboru (baterie, booster, MPPT, pojistka, měnič, lednice, kabel) jsou kreslené na mřížce 24
// stejným tahem 2,25 se zaoblenými konci a rohy, s okrajem asi 2 px jako Phosphor.
import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const common = { "aria-hidden": true, focusable: "false", width: 24, height: 24 } as const;

/** Vlastní ikona oboru: tah na mřížce 24. */
const base = (props: IconProps, children: ReactElement | ReactElement[]) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...common}
    {...props}
  >
    {children}
  </svg>
);

/** Ikona Phosphor Bold: vyplněný obrys na mřížce 256. */
const ph = (d: string) => (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...common} {...props}>
    <path d={d} />
  </svg>
);

// ---------- Phosphor Bold (MIT) ----------

/** Stav OK: kruh s fajfkou (check-circle). */
export const IconOk = ph(
  "M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z",
);
/** Varování: trojúhelník s vykřičníkem (warning). */
export const IconWarn = ph(
  "M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z",
);
/** Blok: osmiúhelník s vykřičníkem (warning-octagon), tvarem odlišný od varování. */
export const IconBlock = ph(
  "M116,132V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0ZM236,91.55v72.9a19.86,19.86,0,0,1-5.86,14.14l-51.55,51.55A19.85,19.85,0,0,1,164.45,236H91.55a19.85,19.85,0,0,1-14.14-5.86L25.86,178.59A19.86,19.86,0,0,1,20,164.45V91.55a19.86,19.86,0,0,1,5.86-14.14L77.41,25.86A19.85,19.85,0,0,1,91.55,20h72.9a19.85,19.85,0,0,1,14.14,5.86l51.55,51.55A19.86,19.86,0,0,1,236,91.55Zm-24,1.66L162.79,44H93.21L44,93.21v69.58L93.21,212h69.58L212,162.79ZM128,156a16,16,0,1,0,16,16A16,16,0,0,0,128,156Z",
);
export const IconInfo = ph(
  "M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z",
);
export const IconShare = ph(
  "M176,156a43.78,43.78,0,0,0-29.09,11L106.1,140.8a44.07,44.07,0,0,0,0-25.6L146.91,89a43.83,43.83,0,1,0-13-20.17L93.09,95a44,44,0,1,0,0,65.94L133.9,187.2A44,44,0,1,0,176,156Zm0-120a20,20,0,1,1-20,20A20,20,0,0,1,176,36ZM64,148a20,20,0,1,1,20-20A20,20,0,0,1,64,148Zm112,72a20,20,0,1,1,20-20A20,20,0,0,1,176,220Z",
);
export const IconLink = ph(
  "M117.18,188.74a12,12,0,0,1,0,17l-5.12,5.12A58.26,58.26,0,0,1,70.6,228h0A58.62,58.62,0,0,1,29.14,127.92L63.89,93.17a58.64,58.64,0,0,1,98.56,28.11,12,12,0,1,1-23.37,5.44,34.65,34.65,0,0,0-58.22-16.58L46.11,144.89A34.62,34.62,0,0,0,70.57,204h0a34.41,34.41,0,0,0,24.49-10.14l5.11-5.12A12,12,0,0,1,117.18,188.74ZM226.83,45.17a58.65,58.65,0,0,0-82.93,0l-5.11,5.11a12,12,0,0,0,17,17l5.12-5.12a34.63,34.63,0,1,1,49,49L175.1,145.86A34.39,34.39,0,0,1,150.61,156h0a34.63,34.63,0,0,1-33.69-26.72,12,12,0,0,0-23.38,5.44A58.64,58.64,0,0,0,150.56,180h.05a58.28,58.28,0,0,0,41.47-17.17l34.75-34.75a58.62,58.62,0,0,0,0-82.91Z",
);
export const IconSun = ph(
  "M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z",
);
export const IconMoon = ph(
  "M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z",
);
export const IconMinus = ph("M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z");
export const IconPlus = ph(
  "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z",
);
export const IconArrowRight = ph(
  "M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z",
);
/** Solární panel se sluncem (solar-panel). */
export const IconSolarPanel = ph(
  "M32,100A12,12,0,0,1,44,88h8a12,12,0,0,1,0,24H44A12,12,0,0,1,32,100Zm96-64a12,12,0,0,0,12-12V16a12,12,0,0,0-24,0v8A12,12,0,0,0,128,36ZM65.77,54.74a12,12,0,1,0,17-17l-5.66-5.65a12,12,0,0,0-17,17Zm116,3.52a12,12,0,0,0,8.49-3.52l5.65-5.65a12,12,0,0,0-17-17l-5.66,5.65a12,12,0,0,0,8.49,20.49ZM192,100a12,12,0,0,0,12,12h8a12,12,0,0,0,0-24h-8A12,12,0,0,0,192,100ZM88,112a12,12,0,0,0,12-12,28,28,0,0,1,56,0,12,12,0,0,0,24,0,52,52,0,0,0-104,0A12,12,0,0,0,88,112ZM242.36,222.05A12,12,0,0,1,232,228H24a12,12,0,0,1-10.45-17.9l43-76A12,12,0,0,1,67,128H189a12,12,0,0,1,10.45,6.1l43,76A12,12,0,0,1,242.36,222.05ZM182,152H140v12h48.82ZM74,152l-6.78,12H116V152ZM44.57,204H116V188H53.61Zm166.86,0-9-16H140v16Z",
);
/** Zásuvka 230 V / spotřebič (plug). */
export const IconPlug = ph(
  "M240.49,63.51a12,12,0,0,0-17,0L192,95,161,64l31.52-31.51a12,12,0,0,0-17-17L144,47,120.49,23.51a12,12,0,1,0-17,17L107,44,56.89,94.14a44,44,0,0,0,0,62.23l12.88,12.88L23.51,215.51a12,12,0,0,0,17,17l46.26-46.26,12.88,12.88a44,44,0,0,0,62.23,0L212,149l3.51,3.52a12,12,0,0,0,17-17L209,112l31.52-31.51A12,12,0,0,0,240.49,63.51Zm-95.6,118.63a20,20,0,0,1-28.29,0L73.86,139.4a20,20,0,0,1,0-28.29L124,61l71,71Z",
);
/** Dodávka (van). */
export const IconVan = ph(
  "M253.11,104.18,207.54,51.09A19.94,19.94,0,0,0,192.26,44H32A20,20,0,0,0,12,64V176a20,20,0,0,0,20,20H46.06a36,36,0,0,0,67.88,0h40.12a36,36,0,0,0,67.88,0H236a20,20,0,0,0,20-20V112A12.05,12.05,0,0,0,253.11,104.18ZM217.89,100H176V68h14.42ZM104,100V68h48v32ZM80,68v32H36V68Zm0,128a12,12,0,1,1,12-12A12,12,0,0,1,80,196Zm108,0a12,12,0,1,1,12-12A12,12,0,0,1,188,196Zm33.94-24a36,36,0,0,0-67.88,0H113.94a36,36,0,0,0-67.88,0H36V124H232v48Z",
);
/** Blesk: jízda a alternátor (lightning). */
export const IconBolt = ph(
  "M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z",
);
/** Vločka: klimatizace (snowflake). */
export const IconSnow = ph(
  "M227.65,149.14a12,12,0,0,1-8.79,14.51l-20.67,5.08,5.4,20.16a12,12,0,0,1-23.18,6.22l-7.29-27.2L140,148.78V187l20.48,20.48a12,12,0,0,1-17,17L128,209l-15.51,15.52a12,12,0,0,1-17-17L116,187V148.78L82.88,167.91l-7.29,27.2a12,12,0,0,1-23.18-6.22l5.4-20.16-20.67-5.08a12,12,0,1,1,5.72-23.3l27.89,6.85L104,128,70.75,108.8l-27.89,6.85A11.8,11.8,0,0,1,40,116a12,12,0,0,1-2.85-23.65l20.67-5.08-5.4-20.16a12,12,0,0,1,23.18-6.22l7.29,27.2L116,107.21V69L95.52,48.48a12,12,0,0,1,17-17L128,47l15.51-15.52a12,12,0,1,1,17,17L140,69v38.24l33.12-19.12,7.29-27.2a12,12,0,0,1,23.18,6.22l-5.4,20.16,20.67,5.08A12,12,0,0,1,216,116a11.8,11.8,0,0,1-2.87-.35l-27.89-6.85L152,128l33.25,19.2,27.89-6.85A12,12,0,0,1,227.65,149.14Z",
);
/** Plamen: topení (flame). */
export const IconFlame = ph(
  "M176.69,48.72a225,225,0,0,0-42.52-35,12,12,0,0,0-12.34,0,225,225,0,0,0-42.52,35C51,78.47,36,111.42,36,144a92,92,0,0,0,184,0C220,111.42,205,78.47,176.69,48.72ZM100,184c0-13.33,5.53-26.26,16.45-38.45A93,93,0,0,1,128,134.72a93,93,0,0,1,11.55,10.83C150.47,157.74,156,170.67,156,184a28,28,0,0,1-56,0Zm79.84,3.94c.09-1.3.16-2.61.16-3.94,0-46.26-44-73.17-45.83-74.29a12,12,0,0,0-12.34,0C120,110.83,76,137.74,76,184c0,1.33.07,2.64.16,3.94A67.68,67.68,0,0,1,60,144c0-26.52,12.21-52.86,36.28-78.3A213.07,213.07,0,0,1,128,38.39C145.82,50.86,196,90.71,196,144A67.68,67.68,0,0,1,179.84,187.94Z",
);
/** Hrnec: vaření (cooking-pot). */
export const IconPot = ph(
  "M253.76,93A12,12,0,0,0,237,90.24l-9,6.44V80a12,12,0,0,0-12-12H40A12,12,0,0,0,28,80V96.68l-9-6.44A12,12,0,1,0,5,109.76l23,16.42V184a36,36,0,0,0,36,36H192a36,36,0,0,0,36-36V126.18l23-16.42A12,12,0,0,0,253.76,93ZM204,184a12,12,0,0,1-12,12H64a12,12,0,0,1-12-12V92H204ZM76,40V16a12,12,0,0,1,24,0V40a12,12,0,0,1-24,0Zm40,0V16a12,12,0,0,1,24,0V40a12,12,0,0,1-24,0Zm40,0V16a12,12,0,0,1,24,0V40a12,12,0,0,1-24,0Z",
);
/** Kapka: voda (drop). */
export const IconDrop = ph(
  "M134.88,6.17a12,12,0,0,0-13.76,0,259,259,0,0,0-42.18,39C50.85,77.43,36,111.62,36,144a92,92,0,0,0,184,0C220,66.64,138.36,8.6,134.88,6.17ZM128,212a68.07,68.07,0,0,1-68-68c0-33.31,20-63.37,36.7-82.71A249.35,249.35,0,0,1,128,31.11a249.35,249.35,0,0,1,31.3,30.18C176,80.63,196,110.69,196,144A68.07,68.07,0,0,1,128,212Zm49.62-52.4a52,52,0,0,1-34,34,12.2,12.2,0,0,1-3.6.55,12,12,0,0,1-3.6-23.45,28,28,0,0,0,18.32-18.32,12,12,0,0,1,22.9,7.2Z",
);
/** Žárovka: elektronika a světla (lightbulb). */
export const IconBulb = ph(
  "M180,232a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,232Zm40-128a91.51,91.51,0,0,1-35.17,72.35A12.26,12.26,0,0,0,180,186v2a20,20,0,0,1-20,20H96a20,20,0,0,1-20-20v-2a12,12,0,0,0-4.7-9.51A91.57,91.57,0,0,1,36,104.52C35.73,54.69,76,13.2,125.79,12A92,92,0,0,1,220,104Zm-24,0a68,68,0,0,0-69.65-68C89.56,36.88,59.8,67.55,60,104.38a67.71,67.71,0,0,0,26.1,53.19A35.87,35.87,0,0,1,100,184h56.1A36.13,36.13,0,0,1,170,157.49,67.68,67.68,0,0,0,196,104Zm-20.07-5.32a48.5,48.5,0,0,0-31.91-40,12,12,0,0,0-8,22.62,24.31,24.31,0,0,1,16.09,20,12,12,0,0,0,23.86-2.64Z",
);
/** Kalendář: dny (calendar-blank). */
export const IconCalendar = ph(
  "M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z",
);

// ---------- Vlastní ikony oboru (mřížka 24, tah 2,25) ----------

/** Baterie: tělo s pólem nahoře a dvěma dílky. */
export const IconBattery = (p: IconProps) =>
  base(p, [
    <rect key="b" x="5" y="5" width="14" height="16.5" rx="2" />,
    <path key="p" d="M9.5 2.5h5" />,
    <path key="d" d="M8.5 11h7M8.5 15.5h7" />,
  ]);
/** Booster (nabíječ DC-DC): skříňka se šipkou z jedné baterie do druhé. */
export const IconBooster = (p: IconProps) =>
  base(p, [
    <rect key="r" x="2.5" y="5" width="19" height="14" rx="2" />,
    <path key="a" d="M6.5 12h10M13.5 9l3 3-3 3" />,
  ]);
/** Regulátor MPPT: skříňka se svorkami a křivkou výkonu panelu s vyznačeným vrcholem. */
export const IconMppt = (p: IconProps) =>
  base(p, [
    <rect key="r" x="2.5" y="6" width="19" height="15" rx="2" />,
    <path key="s" d="M8 6V3M16 6V3" />,
    <path key="k" d="M6 17.5c2-5.5 3.8-7 6-7s4 1.5 6 7" />,
    <circle key="v" cx="12" cy="10.5" r="0.9" fill="currentColor" />,
  ]);
/** Pojistka: válcové tělo s vývody a tavným drátkem. */
export const IconFuse = (p: IconProps) =>
  base(p, [
    <rect key="t" x="5" y="7.5" width="14" height="9" rx="2" />,
    <path key="v" d="M1.5 12H5M19 12h3.5" />,
    <path key="d" d="M8 12h2l1-2 2 4 1-2h2" />,
  ]);
/** Měnič: skříňka se sinusovkou. */
export const IconInverter = (p: IconProps) =>
  base(p, [
    <rect key="r" x="2.5" y="5" width="19" height="14" rx="2" />,
    <path key="s" d="M6 12c1.5-4 3-4 4.5 0s3 4 4.5 0 3-4 3.5-1" />,
  ]);
/** Lednice (skupina chlazení). */
export const IconFridge = (p: IconProps) =>
  base(p, [<rect key="r" x="5.5" y="2.5" width="13" height="19" rx="2" />, <path key="d" d="M5.5 9.5h13M9 5.5v1.5M9 12.5v3" />]);
/** Kabel: řez vodičem s vývodem. */
export const IconCable = (p: IconProps) =>
  base(p, [
    <circle key="o" cx="8.5" cy="12" r="6" />,
    <circle key="j" cx="8.5" cy="12" r="2.2" fill="currentColor" />,
    <path key="v" d="M14.5 12h7" />,
  ]);

/** Značka Caravanixu: řez vodičem (prstenec izolace a měděné jádro). */
export const Logo = (p: IconProps) => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" {...p}>
    <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="16" r="6.5" fill="var(--cx-copper)" />
  </svg>
);

/** Přehled sady pro /styleguide: název, komponenta a původ. */
export const ICON_SET: { name: string; Icon: (p: IconProps) => ReactElement; source: "phosphor" | "vlastni" }[] = [
  { name: "IconOk", Icon: IconOk, source: "phosphor" },
  { name: "IconWarn", Icon: IconWarn, source: "phosphor" },
  { name: "IconBlock", Icon: IconBlock, source: "phosphor" },
  { name: "IconInfo", Icon: IconInfo, source: "phosphor" },
  { name: "IconShare", Icon: IconShare, source: "phosphor" },
  { name: "IconLink", Icon: IconLink, source: "phosphor" },
  { name: "IconSun", Icon: IconSun, source: "phosphor" },
  { name: "IconMoon", Icon: IconMoon, source: "phosphor" },
  { name: "IconMinus", Icon: IconMinus, source: "phosphor" },
  { name: "IconPlus", Icon: IconPlus, source: "phosphor" },
  { name: "IconArrowRight", Icon: IconArrowRight, source: "phosphor" },
  { name: "IconSolarPanel", Icon: IconSolarPanel, source: "phosphor" },
  { name: "IconPlug", Icon: IconPlug, source: "phosphor" },
  { name: "IconVan", Icon: IconVan, source: "phosphor" },
  { name: "IconBolt", Icon: IconBolt, source: "phosphor" },
  { name: "IconSnow", Icon: IconSnow, source: "phosphor" },
  { name: "IconFlame", Icon: IconFlame, source: "phosphor" },
  { name: "IconPot", Icon: IconPot, source: "phosphor" },
  { name: "IconDrop", Icon: IconDrop, source: "phosphor" },
  { name: "IconBulb", Icon: IconBulb, source: "phosphor" },
  { name: "IconCalendar", Icon: IconCalendar, source: "phosphor" },
  { name: "IconBattery", Icon: IconBattery, source: "vlastni" },
  { name: "IconBooster", Icon: IconBooster, source: "vlastni" },
  { name: "IconMppt", Icon: IconMppt, source: "vlastni" },
  { name: "IconFuse", Icon: IconFuse, source: "vlastni" },
  { name: "IconInverter", Icon: IconInverter, source: "vlastni" },
  { name: "IconFridge", Icon: IconFridge, source: "vlastni" },
  { name: "IconCable", Icon: IconCable, source: "vlastni" },
];
