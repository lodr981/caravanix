// Podpisový prvek 3 (docs/design/VIZUAL.md): živé schéma projektu R1.
// Nic nepočítá: proud, průřez a pojistku každého kabelu dává engine (navrhSchematu, kalkulačka průřezu v1.1),
// rozložení dává projekt (sloupec, řádek). Kód jen převádí data na kresbu: polohy, tloušťku čáry z plochy průřezu
// a rychlost animace z proudu. Barvy jen z tokenů (--cx-*), takže kresba funguje ve světlém i tmavém režimu.
import { useMemo, useState, type KeyboardEvent, type ReactElement, type SVGProps } from "react";
import { projektR1, type Projekt, type RezimSchematu } from "@caravanix/data";
import { navrhSchematu, type KabelSchematu } from "@caravanix/engine";
import {
  IconBattery,
  IconBooster,
  IconBulb,
  IconDrop,
  IconFridge,
  IconFuse,
  IconMppt,
  IconPlug,
  IconSolarPanel,
  IconVan,
  SegmentedControl,
  formatDecimal,
} from "@caravanix/ui";
import "./ZiveSchema.css";

type Texts = Record<string, string>;
type Ikona = (p: SVGProps<SVGSVGElement>) => ReactElement;
const NBSP = " ";
const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP);
const fill = (text: string | undefined, vars: Record<string, string>) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

const IKONY: Record<string, Ikona> = {
  panel: IconSolarPanel,
  mppt: IconMppt,
  startovaci: IconVan,
  booster: IconBooster,
  baterie: IconBattery,
  rozvod: IconFuse,
  lednice: IconFridge,
  svetla: IconBulb,
  cerpadlo: IconDrop,
  zasuvka: IconPlug,
};

// Mřížka kresby v jednotkách viewBoxu (1 jednotka = 1 px při plné velikosti).
const OKRAJ = 20;
const BOX_W = 150;
const BOX_H = 84;
const KROK_X = 225;
const KROK_Y = 124;
const NAVIC_POSLEDNI = 50; // širší mezera před sloupcem spotřebičů (víc kabelů ze skříňky)
const ODBOCKA = 26; // první svislý úsek za pojistkou u zdroje
const KROK_ODBOCKY = 14;
const PISMO = 15;
const RADEK = 18;

/** Tloušťka čáry z průřezu: úměrná průměru vodiče (odmocnina plochy), jen pro kresbu. */
const tloustka = (prurez: number | null) => (prurez === null ? 2.5 : 1 + 1.4 * Math.sqrt(prurez));
/** Rychlost teček z proudu [jednotky/s]; větší proud = rychlejší tok. */
const rychlost = (proud: number | null) => 8 + 2.4 * (proud ?? 0);
const PERIODA = 16;

/** Rozdělí název do řádků podle přibližné šířky písma. */
function zalom(text: string, maxZnaku: number) {
  const radky: string[] = [];
  let r = "";
  for (const slovo of text.split(" ")) {
    if (r && (r + " " + slovo).length > maxZnaku) {
      radky.push(r);
      r = slovo;
    } else r = r ? `${r} ${slovo}` : slovo;
  }
  if (r) radky.push(r);
  return radky;
}

interface Box {
  x: number;
  y: number;
}
interface Usek {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface Obdelnik {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Kresba {
  k: KabelSchematu;
  body: [number, number][]; // osa kabelu
  plus: [number, number][];
  minus: [number, number][];
  sw: number;
  stitek: Obdelnik & { radky: string[] };
  pojistka: { x: number; y: number };
}

const cesta = (b: [number, number][]) => b.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const prekryv = (a: Obdelnik, b: Obdelnik) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const usekJakoObdelnik = (u: Usek, pul: number): Obdelnik => ({
  x: Math.min(u.x1, u.x2) - pul,
  y: Math.min(u.y1, u.y2) - pul,
  w: Math.abs(u.x2 - u.x1) + 2 * pul,
  h: Math.abs(u.y2 - u.y1) + 2 * pul,
});

function rozvrhni(projekt: Projekt, kabely: KabelSchematu[], t: Texts) {
  const maxSloupec = Math.max(...projekt.komponenty.map((c) => c.sloupec));
  const maxRadek = Math.max(...projekt.komponenty.map((c) => c.radek));
  const boxy = new Map<string, Box>();
  for (const c of projekt.komponenty) {
    const x = OKRAJ + c.sloupec * KROK_X + (c.sloupec === maxSloupec ? NAVIC_POSLEDNI : 0);
    boxy.set(c.id, { x, y: OKRAJ + c.radek * KROK_Y });
  }
  const sirka = OKRAJ * 2 + maxSloupec * KROK_X + NAVIC_POSLEDNI + BOX_W;
  const vyska = OKRAJ * 2 + maxRadek * KROK_Y + BOX_H;
  const stred = (id: string) => boxy.get(id)!.y + BOX_H / 2;

  // Vývody: odchozí kabely na pravé hraně, příchozí na levé, seřazené podle polohy druhého konce.
  const port = new Map<string, { y1: number; y2: number }>();
  const rozmisti = (ids: string[], box: string) => {
    const n = ids.length;
    const krok = Math.min(20, (BOX_H - 20) / Math.max(1, n - 1));
    return new Map(ids.map((id, i) => [id, stred(box) + (i - (n - 1) / 2) * krok]));
  };
  const vystupy = new Map<string, Map<string, number>>();
  const vstupy = new Map<string, Map<string, number>>();
  for (const c of projekt.komponenty) {
    const ven = kabely.filter((k) => k.od === c.id).sort((a, b) => stred(a.do) - stred(b.do));
    const dovnitr = kabely.filter((k) => k.do === c.id).sort((a, b) => stred(a.od) - stred(b.od));
    vystupy.set(c.id, rozmisti(ven.map((k) => k.id), c.id));
    vstupy.set(c.id, rozmisti(dovnitr.map((k) => k.id), c.id));
  }
  for (const k of kabely) {
    const y1 = vystupy.get(k.od)!.get(k.id)!;
    let y2 = vstupy.get(k.do)!.get(k.id)!;
    // Jediný vstup a vývod zdroje v dosahu cílové krabičky: vést rovně, bez zbytečného zalomení.
    const cil = boxy.get(k.do)!;
    if (vstupy.get(k.do)!.size === 1 && y1 >= cil.y + 14 && y1 <= cil.y + BOX_H - 14) y2 = y1;
    port.set(k.id, { y1, y2 });
  }

  // Svislé úseky: kabely ze stejného zdroje se nekříží (nahoru jde nejdřív horní, dolů nejdřív spodní).
  const odbocka = new Map<string, number>();
  for (const c of projekt.komponenty) {
    const ven = kabely.filter((k) => k.od === c.id && port.get(k.id)!.y1 !== port.get(k.id)!.y2);
    const nahoru = ven.filter((k) => port.get(k.id)!.y2 < port.get(k.id)!.y1).sort((a, b) => port.get(a.id)!.y1 - port.get(b.id)!.y1);
    const dolu = ven.filter((k) => port.get(k.id)!.y2 > port.get(k.id)!.y1).sort((a, b) => port.get(b.id)!.y1 - port.get(a.id)!.y1);
    const zaklad = boxy.get(c.id)!.x + BOX_W + ODBOCKA;
    nahoru.forEach((k, i) => odbocka.set(k.id, zaklad + i * KROK_ODBOCKY));
    dolu.forEach((k, i) => odbocka.set(k.id, zaklad + i * KROK_ODBOCKY));
  }

  const kresby: Kresba[] = kabely.map((k) => {
    const { y1, y2 } = port.get(k.id)!;
    const x1 = boxy.get(k.od)!.x + BOX_W;
    const x2 = boxy.get(k.do)!.x;
    const prurez = k.vysledek?.stav === "ok" ? k.vysledek.prurez : null;
    const sw = tloustka(prurez);
    const o = sw / 2 + 2.5;
    let body: [number, number][];
    let plus: [number, number][];
    let minus: [number, number][];
    if (y1 === y2) {
      body = [
        [x1, y1],
        [x2, y2],
      ];
      plus = [
        [x1, y1 - o],
        [x2, y2 - o],
      ];
      minus = [
        [x1, y1 + o],
        [x2, y2 + o],
      ];
    } else {
      const mx = odbocka.get(k.id)!;
      const s = Math.sign(y2 - y1);
      body = [
        [x1, y1],
        [mx, y1],
        [mx, y2],
        [x2, y2],
      ];
      plus = [
        [x1, y1 - o],
        [mx + s * o, y1 - o],
        [mx + s * o, y2 - o],
        [x2, y2 - o],
      ];
      minus = [
        [x1, y1 + o],
        [mx - s * o, y1 + o],
        [mx - s * o, y2 + o],
        [x2, y2 + o],
      ];
    }
    const radky =
      k.vysledek === null
        ? [t["stitek.solar"] ?? ""]
        : k.vysledek.stav === "ok"
          ? [`${fmt(k.vysledek.prurez, 2)}${NBSP}mm²`, `${fmt(k.vysledek.pojistka, 0)}${NBSP}A`]
          : [t["stitek.chyba"] ?? "?"];
    const w = Math.max(...radky.map((r) => r.length)) * 8.6 + 16;
    const h = radky.length * RADEK + 10;
    return { k, body, plus, minus, sw, stitek: { x: 0, y: 0, w, h, radky }, pojistka: { x: x1, y: y1 - o } };
  });

  // Štítky: první volné místo na kabelu (mimo krabičky, cizí kabely a jiné štítky).
  const prekazky: Obdelnik[] = [...boxy.values()].map((b) => ({ x: b.x - 4, y: b.y - 4, w: BOX_W + 8, h: BOX_H + 8 }));
  const useky = kresby.flatMap((d) =>
    d.body.slice(1).map((b, i) => ({ id: d.k.id, r: usekJakoObdelnik({ x1: d.body[i]![0], y1: d.body[i]![1], x2: b[0], y2: b[1] }, d.sw + 3) })),
  );
  const polozene: Obdelnik[] = [];
  for (const d of kresby) {
    const { w, h } = d.stitek;
    const kandidati: [number, number][] = [];
    const segs = d.body.slice(1).map((b, i) => [d.body[i]!, b] as const);
    // nejdřív poslední úsek (u spotřebiče), pak ostatní; na každém úseku víc poloh
    for (const [a, b] of [...segs].reverse())
      for (const f of [0.5, 0.35, 0.65, 0.2, 0.8]) {
        const cx = a[0] + (b[0] - a[0]) * f;
        const cy = a[1] + (b[1] - a[1]) * f;
        kandidati.push([cx, cy]);
        if (a[0] === b[0]) kandidati.push([cx + w / 2 + d.sw, cy], [cx - w / 2 - d.sw, cy]);
      }
    const volne = kandidati.find(([cx, cy]) => {
      const r = { x: cx - w / 2, y: cy - h / 2, w, h };
      if (r.x < 2 || r.y < 2 || r.x + w > sirka - 2 || r.y + h > vyska - 2) return false;
      return (
        !prekazky.some((p) => prekryv(p, r)) &&
        !polozene.some((p) => prekryv(p, r)) &&
        !useky.some((u) => u.id !== d.k.id && prekryv(u.r, r))
      );
    });
    const [cx, cy] = volne ?? kandidati[0]!;
    d.stitek.x = cx - w / 2;
    d.stitek.y = cy - h / 2;
    polozene.push({ x: d.stitek.x - 3, y: d.stitek.y - 3, w: w + 6, h: h + 6 });
  }
  return { boxy, kresby, sirka, vyska };
}

const REZIMY: RezimSchematu[] = ["den", "noc", "jizda"];

export function ZiveSchema({ t, projekt = projektR1, vychozi = "K6" }: { t: Texts; projekt?: Projekt; vychozi?: string | null }) {
  const kabely = useMemo(() => navrhSchematu(projekt), [projekt]);
  const { boxy, kresby, sirka, vyska } = useMemo(() => rozvrhni(projekt, kabely, t), [projekt, kabely, t]);
  const [rezim, setRezim] = useState<RezimSchematu>("den");
  const [vybrany, setVybrany] = useState<string | null>(vychozi);

  const nazev = (id: string) => projekt.komponenty.find((c) => c.id === id)?.nazev ?? id;
  const aktivniKomponenty = new Set(kabely.filter((k) => k.rezimy.includes(rezim)).flatMap((k) => [k.od, k.do]));
  const rezimText = (r: RezimSchematu) => t[`rezim.${r}`] ?? r;
  const detail = kabely.find((k) => k.id === vybrany) ?? null;

  const klavesa = (id: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setVybrany(id);
    }
  };

  return (
    <div className="sch">
      <SegmentedControl
        legend={t["rezim.legend"]}
        value={rezim}
        onChange={setRezim}
        options={REZIMY.map((r) => ({ value: r, label: rezimText(r), sub: t[`rezim.${r}.sub`] }))}
      />
      <p className="sch__posun cx-muted">{t["posun"]}</p>
      <div className="sch__ram" role="region" aria-label={t["ramec"]} tabIndex={0}>
        <svg className="sch__svg" viewBox={`0 0 ${sirka} ${vyska}`} width={sirka} height={vyska} role="group" aria-labelledby="sch-titulek">
          <title id="sch-titulek">{fill(t["svg.title"], { rezim: rezimText(rezim) })}</title>
          {kresby.map((d) => {
            const { k } = d;
            const aktivni = k.rezimy.includes(rezim);
            const zvoleny = k.id === vybrany;
            const ok = k.vysledek?.stav === "ok" ? k.vysledek : null;
            const dur = `${(PERIODA / rychlost(k.proudA)).toFixed(3)}s`;
            const hodnoty = ok ? fill(t["kabel.hodnoty"], { prurez: fmt(ok.prurez, 2), pojistka: fmt(ok.pojistka, 0) }) : (k.popis ?? "");
            const label =
              fill(t["kabel.a11y"], { id: k.id, od: nazev(k.od), do: nazev(k.do), hodnoty }) + (aktivni ? "" : ` ${t["kabel.neaktivni"]}`);
            return (
              <g
                key={k.id}
                className={`sch-kabel${aktivni ? " sch-kabel--aktivni" : ""}${zvoleny ? " sch-kabel--zvoleny" : ""}${k.vysledek === null ? " sch-kabel--solar" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={zvoleny}
                aria-label={label}
                onClick={() => setVybrany(k.id)}
                onKeyDown={klavesa(k.id)}
                style={{ ["--sch-dur" as string]: dur }}
              >
                <path className="sch-kabel__hit" d={cesta(d.body)} />
                <g className="sch-kabel__cary">
                  <path className="sch-kabel__minus" d={cesta(d.minus)} strokeWidth={d.sw} />
                  <path className="sch-kabel__plus" d={cesta(d.plus)} strokeWidth={d.sw} />
                  <path className="sch-kabel__tok" d={cesta(d.plus)} strokeWidth={Math.max(1.5, d.sw * 0.55)} />
                  <path className="sch-kabel__tok sch-kabel__tok--zpet" d={cesta(d.minus)} strokeWidth={Math.max(1.5, d.sw * 0.55)} />
                </g>
                {ok ? (
                  <rect className="sch-kabel__pojistka" x={d.pojistka.x - 9} y={d.pojistka.y - 6} width={18} height={12} rx={3} />
                ) : null}
                <g className="sch-stitek" transform={`translate(${d.stitek.x.toFixed(1)} ${d.stitek.y.toFixed(1)})`}>
                  <rect width={d.stitek.w} height={d.stitek.h} rx={6} />
                  {d.stitek.radky.map((r, i) => (
                    <text key={i} x={d.stitek.w / 2} y={5 + RADEK * (i + 1) - 4} textAnchor="middle" fontSize={PISMO}>
                      {r}
                    </text>
                  ))}
                </g>
              </g>
            );
          })}
          {projekt.komponenty.map((c) => {
            const b = boxy.get(c.id)!;
            const I = IKONY[c.typ] ?? IconPlug;
            const radky = zalom(c.nazev, 12).slice(0, 4);
            const y0 = b.y + BOX_H / 2 - ((radky.length - 1) * RADEK) / 2 + 5;
            return (
              <g key={c.id} className={`sch-komp${aktivniKomponenty.has(c.id) ? "" : " sch-komp--klid"}`}>
                <rect x={b.x} y={b.y} width={BOX_W} height={BOX_H} rx={10} />
                <I x={b.x + 9} y={b.y + BOX_H / 2 - 12} width={24} height={24} className="sch-komp__ikona" />
                {radky.map((r, i) => (
                  <text key={i} x={b.x + 40} y={y0 + i * RADEK} fontSize={PISMO}>
                    {r}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="sch__legenda">
        <li>
          <i className="sch__vzor sch__vzor--plus" aria-hidden="true" /> {t["legenda.plus"]}
        </li>
        <li>
          <i className="sch__vzor sch__vzor--minus" aria-hidden="true" /> {t["legenda.minus"]}
        </li>
        <li>
          <i className="sch__vzor sch__vzor--pojistka" aria-hidden="true" /> {t["legenda.pojistka"]}
        </li>
        <li>{t["legenda.tloustka"]}</li>
        <li>{t["legenda.tok"]}</li>
      </ul>
      <div className="sch__detail" aria-live="polite">
        {detail ? <Detail k={detail} t={t} nazev={nazev} rezim={rezim} rezimText={rezimText} delka={projekt.kabely.find((x) => x.id === detail.id)?.delkaM} /> : <p>{t["detail.vyber"]}</p>}
      </div>
    </div>
  );
}

function Detail({
  k,
  t,
  nazev,
  rezim,
  rezimText,
  delka,
}: {
  delka: number | undefined;
  k: KabelSchematu;
  t: Texts;
  nazev: (id: string) => string;
  rezim: RezimSchematu;
  rezimText: (r: RezimSchematu) => string;
}) {
  const ok = k.vysledek?.stav === "ok" ? k.vysledek : null;
  return (
    <>
      <h3 className="sch__detail-nadpis">{fill(t["detail.nadpis"], { id: k.id, od: nazev(k.od), do: nazev(k.do) })}</h3>
      {k.rezimy.includes(rezim) ? null : <p className="sch__detail-pozn">{fill(t["detail.neaktivni"], { rezim: rezimText(rezim) })}</p>}
      {k.vysledek === null ? (
        <p>{t["detail.solar"]}</p>
      ) : ok ? (
        <dl className="sch__dl">
          <div>
            <dt>{t["detail.proud"]}</dt>
            <dd>
              {fmt(ok.proud)}
              {NBSP}A
            </dd>
          </div>
          <div>
            <dt>{t["detail.prurez"]}</dt>
            <dd>
              {fmt(ok.prurez, 2)}
              {NBSP}mm²
            </dd>
          </div>
          <div>
            <dt>{t["detail.pojistka"]}</dt>
            <dd>
              {fmt(ok.pojistka, 0)}
              {NBSP}A
            </dd>
          </div>
          {delka !== undefined ? (
            <div>
              <dt>{t["detail.delka"]}</dt>
              <dd>
                {fmt(delka)}
                {NBSP}m
              </dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <p>{t["detail.chyba"]}</p>
      )}
      <p className="sch__detail-rezimy">
        <strong>{t["detail.rezimy"]}:</strong> {k.rezimy.map(rezimText).join(", ")}
      </p>
      {k.popis ? (
        <p>
          <strong>{t["detail.popis"]}:</strong> {k.popis}
        </p>
      ) : null}
    </>
  );
}
