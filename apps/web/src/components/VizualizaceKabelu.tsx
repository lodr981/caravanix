// Podpisový prvek 1 (docs/design/VIZUAL.md): řez kabelem v měřítku a kabel zbarvený podle zatížení.
// Nic nepočítají sami: průřez, proud a max. pojistku dostanou z enginu, hranici délky spočítá engine (dalsiStupen).
// Geometrie kresby (průměr kruhu o ploše průřezu) není výpočet kalkulačky, jen převod plochy na obrázek.
// Barvy jen z tokenů (--cx-*), takže kresba funguje ve světlém i tmavém režimu.
import { useId } from "react";
import { navrhVodice, type VstupVodice } from "@caravanix/engine";
import { IconInfo, IconOk, IconWarn, formatDecimal } from "@caravanix/ui";
import "./VizualizaceKabelu.css";

type Texts = Record<string, string>;
const NBSP = " ";
const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP);
const fill = (text: string | undefined, vars: Record<string, string>) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

/** Rozměry řezu v milimetrech: měď přesně podle plochy, izolace orientačně. */
export function rozmeryRezu(prurez: number) {
  const d = 2 * Math.sqrt(prurez / Math.PI); // průměr mědi [mm]
  const izolace = Math.max(0.5, 0.2 * d); // tloušťka izolace [mm], jen pro kresbu
  return { d, D: d + 2 * izolace };
}

/** Zvětšení pro detail: největší „hezké“ číslo, při kterém se dvojice vodičů vejde do asi 72 × 40 mm. */
function zvetseni(sirka: number, vyska: number) {
  const kroky = [1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
  let z = 1;
  for (const k of kroky) if (k * sirka <= 72 && k * vyska <= 40) z = k;
  return z;
}

/** Drátky lanka v soustředných kruzích (zjednodušeně: 1 + 6 + 12 + …), průměr drátku podle počtu kruhů. */
function dratky(d: number) {
  const kruhy = Math.min(7, Math.max(2, Math.round(d / 1.1)));
  const s = d / (2 * kruhy + 1);
  const body: [number, number][] = [[0, 0]];
  for (let i = 1; i <= kruhy; i++)
    for (let j = 0; j < 6 * i; j++) {
      const a = (2 * Math.PI * j) / (6 * i) + (i % 2 ? 0 : Math.PI / (6 * i));
      body.push([i * s * Math.cos(a), i * s * Math.sin(a)]);
    }
  return { s, body };
}

/** Jeden vodič v řezu se středem v (cx, cy) v milimetrech. */
function Vodic({ cx, cy, d, D, pol, lesk }: { cx: number; cy: number; d: number; D: number; pol: "plus" | "minus"; lesk: string }) {
  const { s, body } = dratky(d);
  return (
    <g>
      <circle cx={cx} cy={cy} r={D / 2} className={`kv-rez__izolace kv-rez__izolace--${pol}`} />
      <circle cx={cx} cy={cy} r={d / 2} className="kv-rez__med-zaklad" />
      {body.map(([x, y], i) => (
        <circle key={i} cx={cx + x} cy={cy + y} r={(s / 2) * 0.92} className="kv-rez__drat" />
      ))}
      <circle cx={cx} cy={cy} r={d / 2} fill={`url(#${lesk})`} />
      <circle cx={cx} cy={cy} r={d / 2} className="kv-rez__obrys" />
      <circle cx={cx} cy={cy} r={D / 2} className="kv-rez__obrys" />
    </g>
  );
}

/**
 * Řez kabelem: dvojice vodičů plus a mínus ve zvětšení (měděné lanko, izolace v barvě polarity, kóta průměru mědi)
 * a vedle jeden vodič ve skutečné velikosti s pravítkem 10 mm. Obojí je vidět najednou, nic se neschovává za ovládání.
 */
export function RezKabelu({ prurez, t }: { prurez: number; t: Texts }) {
  const id = useId().replace(/:/g, "");
  const { d, D } = rozmeryRezu(prurez);
  const mezera = Math.max(0.6, 0.35 * D);
  const okraj = 0.08 * D;
  const kota = 0.42 * D; // místo pod vodiči pro kótu
  const W = 2 * D + mezera + 2 * okraj;
  const H = D + 2 * okraj + kota;
  const z = zvetseni(W, H);
  const c1 = okraj + D / 2;
  const c2 = okraj + 1.5 * D + mezera;
  const cy = okraj + D / 2;
  const yk = okraj + D + kota * 0.55;
  // Skutečná velikost: vodič a pravítko 10 mm (milimetrové dílky).
  const Wr = Math.max(D, 10) + 1;
  const Hr = D + 4;
  return (
    <figure className="kv-rez">
      <figcaption className="kv-rez__hlava">
        <b>{fill(t["rez.label"], { prurez: fmt(prurez, 2) })}</b>
        <span className="cx-num">{fill(t["rez.d"], { d: fmt(d, 1), z: fmt(z, z % 1 ? 1 : 0) })}</span>
      </figcaption>
      <div className="kv-rez__plocha">
        <div className="kv-rez__detail">
          <svg
            key={prurez}
            className="kv-rez__svg"
            width={`${z * W}mm`}
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={fill(t["rez.aria"], { prurez: fmt(prurez, 2), d: fmt(d, 1) })}
          >
            <defs>
              <radialGradient id={`${id}l`} cx="0.35" cy="0.3" r="0.75">
                <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.18" />
              </radialGradient>
            </defs>
            <Vodic cx={c1} cy={cy} d={d} D={D} pol="plus" lesk={`${id}l`} />
            <Vodic cx={c2} cy={cy} d={d} D={D} pol="minus" lesk={`${id}l`} />
            {/* Kóta průměru mědi pod plusovým vodičem */}
            <path
              className="kv-rez__kota"
              d={`M${c1 - d / 2} ${cy} V${yk + kota * 0.2} M${c1 + d / 2} ${cy} V${yk + kota * 0.2} M${c1 - d / 2} ${yk} H${c1 + d / 2}`}
            />
            <path
              className="kv-rez__kota kv-rez__kota--sipka"
              d={`M${c1 - d / 2 + D * 0.07} ${yk - D * 0.045} L${c1 - d / 2} ${yk} L${c1 - d / 2 + D * 0.07} ${yk + D * 0.045} M${c1 + d / 2 - D * 0.07} ${yk - D * 0.045} L${c1 + d / 2} ${yk} L${c1 + d / 2 - D * 0.07} ${yk + D * 0.045}`}
            />
          </svg>
          <ul className="kv-rez__legenda">
            <li>
              <i className="kv-rez__tecka kv-rez__tecka--plus" aria-hidden="true">+</i>
              {t["rez.plus"]}
            </li>
            <li>
              <i className="kv-rez__tecka kv-rez__tecka--minus" aria-hidden="true">−</i>
              {t["rez.minus"]}
            </li>
          </ul>
        </div>
        <div className="kv-rez__skutecna">
          <svg width={`${Wr}mm`} height={`${Hr}mm`} viewBox={`0 0 ${Wr} ${Hr}`} role="img" aria-label={fill(t["rez.realAria"], { prurez: fmt(prurez, 2) })}>
            <circle cx={0.5 + D / 2} cy={D / 2 + 0.2} r={D / 2} className="kv-rez__izolace kv-rez__izolace--plus" />
            <circle cx={0.5 + D / 2} cy={D / 2 + 0.2} r={d / 2} className="kv-rez__drat" />
            <path
              className="kv-rez__pravitko"
              d={`M0.5 ${D + 1.6} H10.5 ${Array.from({ length: 11 }, (_, i) => `M${0.5 + i} ${D + 1.6} V${D + (i % 5 === 0 ? 3.4 : 2.5)}`).join(" ")}`}
            />
          </svg>
          <p>
            <b>{t["rez.real"]}</b>
            <span className="cx-hint">{t["rez.ruler"]}</span>
          </p>
        </div>
      </div>
      <p className="cx-hint kv-rez__pozn">{t["rez.note"]}</p>
    </figure>
  );
}

/**
 * Zatížení: plusový vodič z boku. Okénkem v izolaci je vidět měď, která se „zahřeje“ do délky podle podílu
 * proudu k max. pojistce kabelu; konec je pojistka. Stav je vždy slovem, ikonou i barvou.
 */
export function ZatizeniKabelu({ proud, maxPojistka, t }: { proud: number; maxPojistka: number; t: Texts }) {
  const id = useId().replace(/:/g, "");
  const podil = maxPojistka > 0 ? Math.min(1, Math.max(0, proud / maxPojistka)) : 1;
  const stupen = podil < 0.4 ? "nizke" : podil < 0.65 ? "stredni" : "vysoke";
  const Ikona = stupen === "vysoke" ? IconWarn : stupen === "stredni" ? IconInfo : IconOk;
  const slovo = t[`zat.${stupen}`] ?? "";
  const vars = { proud: fmt(proud, 1), max: fmt(maxPojistka, 1), proc: fmt(podil * 100, 0), slovo };
  // Okénko s mědí: x 50–340 ve viewBoxu 0–400.
  const x0 = 50;
  const w = 290;
  return (
    <div className={`kv-zat kv-zat--${stupen}`}>
      <div className="kv-zat__hlava">
        <span className="cx-label">{t["zat.label"]}</span>
        <span className="kv-zat__slovo">
          <Ikona className="cx-icon kv-zat__ikona" aria-hidden="true" /> {slovo}
        </span>
      </div>
      <p className="kv-zat__cislo cx-num">{fill(t["zat.proud"], vars)}</p>
      <svg className="kv-zat__kabel" viewBox="0 0 400 60" role="img" aria-label={fill(t["zat.aria"], vars)} preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id={`${id}o`}>
            <rect x={x0} y="22" width={w} height="16" rx="8" />
          </clipPath>
        </defs>
        {/* Odizolovaný konec s lankem */}
        <rect x="4" y="22" width="34" height="16" rx="3" className="kv-zat__med" />
        <path d="M8 26.5h28M8 30h28M8 33.5h28" className="kv-zat__lanko" />
        {/* Izolace (plus = červená) */}
        <rect x="30" y="12" width="330" height="36" rx="18" className="kv-zat__izolace" />
        {/* Okénko: celá délka = max. pojistka kabelu */}
        <rect x={x0} y="22" width={w} height="16" rx="8" className="kv-zat__okno" />
        <g clipPath={`url(#${id}o)`}>
          <rect x={x0} y="22" width={w} height="16" className="kv-zat__teplo" style={{ transform: `scaleX(${podil})` }} />
        </g>
        <path d={`M${x0 + w * 0.4} 19v22M${x0 + w * 0.65} 19v22`} className="kv-zat__hranice" />
        <rect x={x0} y="22" width={w} height="16" rx="8" className="kv-zat__okno-obrys" />
        {/* Pojistka na konci */}
        <path d="M360 30h6" className="kv-zat__pojistka-drat" />
        <rect x="366" y="21" width="30" height="18" rx="4" className="kv-zat__pojistka" />
        <path d="M373 21v18M389 21v18" className="kv-zat__pojistka-drat" />
        <path d="M373 30c3-4 5 4 8 0s5 4 8 0" className="kv-zat__pojistka-drat kv-zat__pojistka-tavna" />
      </svg>
      <div className="kv-zat__osa cx-num" aria-hidden="true">
        <span>{t["zat.min"]}</span>
        <span>{fill(t["zat.max"], vars)}</span>
      </div>
      <p className="cx-hint">{fill(t["zat.text"], vars)}</p>
    </div>
  );
}

export interface Hranice {
  /** Délka [m], od které je potřeba jiný výsledek. */
  delka: number;
  /** Nový průřez, nebo null, když od té délky kabel nenajde (chyba). */
  prurez: number | null;
}

/**
 * Nejbližší delší délka (krok 0,1 m, nejvýš `max`), při které engine vrátí větší průřez nebo chybu.
 * null = do `max` stačí současný průřez.
 */
export function dalsiStupen(vstup: VstupVodice, prurez: number, max = 20): Hranice | null {
  for (let l = Math.round(vstup.delka * 10) + 1; l <= Math.round(max * 10); l++) {
    const delka = l / 10;
    const r = navrhVodice({ ...vstup, delka });
    if (r.stav !== "ok") return { delka, prurez: null };
    if (r.prurez > prurez) return { delka, prurez: r.prurez };
  }
  return null;
}
