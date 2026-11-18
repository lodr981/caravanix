// Blokové (jednopólové) schéma elektroinstalace pro tisk a pro elektrikáře. Doplněk k obrázkovému živému schématu.
// Nic nepočítá: průřezy, proudy a pojistky dává engine (navrhSchematu → KabelSchematu), topologii dává projekt
// (navrhZapojeni s uplne: true: zdroje → regulátor/booster/nabíječka → přípojnice ← baterie; z přípojnice skříňka a měnič).
// Kód jen převádí data na technický výkres se značkami blízkými IEC 60617. Barvy jen z tokenů (--cx-*), písmo nikdy pod 15 px
// (viewBox se nezmenšuje pod svou šířku, rámeček jde posouvat do strany).
//
// Texty dodává stránka z content/cs/blokove-schema.json a předá je v `t`, např.:
//   import tb from "../../../../../content/cs/blokove-schema.json";
//   const z = navrhZapojeni({ ...vstup, uplne: true });
//   <BlokoveSchema client:visible t={tb} projekt={z.projekt} kabely={navrhSchematu(z.projekt)} />
import { useId, useRef, type ReactNode } from "react";
import type { KomponentaProjektu, Projekt } from "@caravanix/data";
import type { KabelSchematu } from "@caravanix/engine";
import { Button, formatDecimal } from "@caravanix/ui";
import "./BlokoveSchema.css";

type Texts = Record<string, string>;
type PrvekTyp = KabelSchematu["prvky"][number]["typ"];

export interface BlokoveSchemaProps {
  t: Texts;
  projekt: Projekt;
  kabely: KabelSchematu[];
  /** Datum do razítka (už naformátované), výchozí dnešní. */
  datum?: string;
}

const NBSP = " ";
const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP);
const fill = (text: string | undefined, vars: Record<string, string>) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

// Mřížka výkresu v jednotkách viewBoxu (1 jednotka = 1 px při plné velikosti).
const PISMO = 15;
const RADEK = 19;
const G = 32; // svislá vzdálenost vodiče + a − jedné větve
const HOP = 7; // poloměr přemostění křížení bez spoje
const W = 1580;
const Y0 = 120;
const HL = 130; // výška řádku větve se zdrojem nebo měničem
const HC = 66; // výška řádku okruhu z pojistkové skříňky
const X_ZDROJ = 90;
const X_BLOK = 430;
const BLOK_W = 76;
const X_PLUS = 720;
const X_MINUS = 754;
const X_SKR_L = 990;
const X_SKR_R = 1130;
const X_RAIL_P = 1014;
const X_RAIL_M = 1036;
const X_POJ_SKR = 1090;
const X_ZATEZ = 1370;
const RAZ_W = 540;
const RAZ_RADEK = 30;

/** Rozdělí text do řádků podle přibližného počtu znaků. */
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
  return radky.slice(0, 3);
}

/** Vodorovný vodič zleva doprava, s přemostěním (obloučkem) v místech křížení bez spoje. */
function vodic(x1: number, x2: number, y: number, mosty: number[] = []) {
  let d = `M${x1} ${y}`;
  for (const m of [...mosty].sort((a, b) => a - b)) if (m > x1 + HOP && m < x2 - HOP) d += ` H${m - HOP} A${HOP} ${HOP} 0 0 1 ${m + HOP} ${y}`;
  return `${d} H${x2}`;
}

const Tecka = ({ x, y }: { x: number; y: number }) => <circle className="bs-tecka" cx={x} cy={y} r={4.5} />;

const Text = ({ x, y, children, anchor = "middle", tucne = false, className }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; tucne?: boolean; className?: string }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={PISMO} fontWeight={tucne ? 700 : undefined} className={className}>
    {children}
  </text>
);

/** Pojistka (obdélník s čarou) na vodorovném vodiči, hodnota pod značkou mezi vodiči + a −. */
function Pojistka({ x, y, hodnota }: { x: number; y: number; hodnota: string }) {
  return (
    <g className="bs-znacka">
      <rect x={x - 15} y={y - 6} width={30} height={12} />
      <line x1={x - 15} y1={y} x2={x + 15} y2={y} />
      <Text x={x} y={y + 23} className="bs-hodnota">
        {hodnota}
      </Text>
    </g>
  );
}

/** Spínací kontakt (vypínač, odpojovač) na vodiči: mezera a šikmý nůž. */
function Kontakt({ x, y }: { x: number; y: number }) {
  return (
    <g className="bs-znacka">
      <rect className="bs-maska" x={x - 13} y={y - 3} width={26} height={6} />
      <line x1={x - 13} y1={y} x2={x + 11} y2={y - 13} />
      <line x1={x + 13} y1={y - 6} x2={x + 13} y2={y} />
    </g>
  );
}

/** Bočník (rezistor) na vodiči. */
function Bocnik({ x, y }: { x: number; y: number }) {
  return (
    <g className="bs-znacka">
      <rect x={x - 17} y={y - 6} width={34} height={12} />
    </g>
  );
}

/** Baterie mezi vodičem + (y) a − (y + G), přívody zprava; počet článků 1 nebo 2. */
function Baterie({ x, y, clanky = 2 }: { x: number; y: number; clanky?: 1 | 2 }) {
  const desky = clanky === 2 ? [8, 13, 19, 24] : [12, 20];
  return (
    <g className="bs-znacka">
      <line x1={x} y1={y} x2={x} y2={y + desky[0]!} />
      <line x1={x} y1={y + desky[desky.length - 1]!} x2={x} y2={y + G} />
      {desky.map((d, i) => (
        <line key={i} className={i % 2 ? "bs-deska-kratka" : "bs-deska"} x1={x - (i % 2 ? 8 : 17)} y1={y + d} x2={x + (i % 2 ? 8 : 17)} y2={y + d} />
      ))}
      <Text x={x - 26} y={y + 10} className="bs-pol">
        +
      </Text>
    </g>
  );
}

/** Blok měniče (čtverec s úhlopříčkou a značkami vstupu a výstupu) nebo blok s textem. */
function Blok({ x, y, vlevo, vpravo, text }: { x: number; y: number; vlevo?: string; vpravo?: string; text?: string }) {
  const top = y - 14;
  const h = G + 28;
  return (
    <g className="bs-znacka bs-blok">
      <rect x={x - BLOK_W / 2} y={top} width={BLOK_W} height={h} />
      {text ? (
        <Text x={x} y={top + h / 2 + 5} tucne>
          {text}
        </Text>
      ) : (
        <>
          <line x1={x - BLOK_W / 2} y1={top + h} x2={x + BLOK_W / 2} y2={top} />
          <Text x={x - BLOK_W / 2 + 15} y={top + 21}>
            {vlevo}
          </Text>
          <Text x={x + BLOK_W / 2 - 15} y={top + h - 9}>
            {vpravo}
          </Text>
        </>
      )}
    </g>
  );
}

/** Spotřebič mezi vodičem + a −: světlo (kruh s křížkem), motor (kruh s M), jinak obecná zátěž (obdélník). */
function Zatez({ x, y, typ }: { x: number; y: number; typ: string }) {
  const sy = y + G / 2;
  const motor = ["lednice", "cerpadlo", "ventilator"].includes(typ);
  return (
    <g className="bs-znacka">
      <line x1={x} y1={y} x2={x} y2={sy - 12} />
      <line x1={x} y1={sy + 12} x2={x} y2={y + G} />
      {typ === "svetla" ? (
        <>
          <circle cx={x} cy={sy} r={12} />
          <line x1={x - 8.5} y1={sy - 8.5} x2={x + 8.5} y2={sy + 8.5} />
          <line x1={x - 8.5} y1={sy + 8.5} x2={x + 8.5} y2={sy - 8.5} />
        </>
      ) : motor ? (
        <>
          <circle cx={x} cy={sy} r={12} />
          <Text x={x} y={sy + 5.5}>
            M
          </Text>
        </>
      ) : (
        <rect x={x - 10} y={sy - 12} width={20} height={24} />
      )}
    </g>
  );
}

/** Tři čárky přes jednopólovou čáru: vedení se třemi vodiči (L, N, PE). */
function Carky({ x, y }: { x: number; y: number }) {
  return (
    <g className="bs-znacka">
      {[-7, 0, 7].map((d) => (
        <line key={d} x1={x + d - 5} y1={y + 8} x2={x + d + 5} y2={y - 8} />
      ))}
    </g>
  );
}

/** Zásuvka 230 V na konci jednopólové čáry. */
function Zasuvka({ x, y }: { x: number; y: number }) {
  return (
    <g className="bs-znacka">
      <path d={`M${x + 4} ${y - 14} A14 14 0 0 0 ${x + 4} ${y + 14}`} />
      <line x1={x + 4} y1={y - 14} x2={x + 4} y2={y + 14} />
    </g>
  );
}

/** Přepínač zdroje: společný kontakt vpravo, vstup z měniče na čáře, druhý vstup (přípojka) pod ní. */
function Prepinac({ x, y, t }: { x: number; y: number; t: Texts }) {
  return (
    <g className="bs-znacka">
      <rect className="bs-maska" x={x - 14} y={y - 3} width={28} height={6} />
      <line x1={x + 14} y1={y} x2={x - 12} y2={y + 12} />
      <line x1={x - 14} y1={y} x2={x - 14} y2={y - 6} />
      <line x1={x - 14} y1={y + 20} x2={x - 30} y2={y + 20} />
      <line x1={x - 14} y1={y + 20} x2={x - 14} y2={y + 14} />
      <Text x={x - 34} y={y + 25} anchor="end">
        {t["prepinac.zdroj"]}
      </Text>
    </g>
  );
}

/** Zdroj vlevo podle typu komponenty; vrací kresbu a zda jde o jednopólovou (AC) čáru. */
function Zdroj({ k, y, t }: { k: KomponentaProjektu; y: number; t: Texts }) {
  if (k.typ === "sit")
    return (
      <g className="bs-znacka">
        <circle cx={X_ZDROJ} cy={y + G / 2} r={18} />
        <Text x={X_ZDROJ} y={y + G / 2 + 5}>
          ~
        </Text>
      </g>
    );
  if (k.typ === "startovaci") return <Baterie x={X_ZDROJ + 20} y={y} clanky={1} />;
  return <Blok x={X_ZDROJ} y={y} text={t["blok.pv"]} />;
}

/** Názvy komponent pod značkou (na střed), nejvýš 3 řádky. */
function Nazev({ x, y, text, anchor = "middle", max = 22 }: { x: number; y: number; text: string; anchor?: "start" | "middle"; max?: number }) {
  return (
    <g className="bs-nazev">
      {zalom(text, max).map((r, i) => (
        <Text key={i} x={x} y={y + i * RADEK} anchor={anchor}>
          {r}
        </Text>
      ))}
    </g>
  );
}

export function BlokoveSchema({ t, projekt, kabely, datum }: BlokoveSchemaProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const U = String(projekt.napeti);
  const komp = (cid: string) => projekt.komponenty.find((c) => c.id === cid);
  const nazev = (cid: string) => komp(cid)?.nazev ?? cid;
  const delkaM = (kid: string) => projekt.kabely.find((k) => k.id === kid)?.delkaM;

  // Topologie: přípojnice (nebo baterie, když přípojnice není), větve do ní a z ní.
  const baterie = projekt.komponenty.find((c) => c.typ === "baterie");
  const busId = projekt.komponenty.find((c) => c.typ === "sbernice")?.id ?? baterie?.id ?? "";
  const doBusu = kabely.filter((k) => k.do === busId && komp(k.od)?.typ !== "baterie");
  const kabelBaterie = kabely.find((k) => k.do === busId && komp(k.od)?.typ === "baterie");
  const zBusu = [...kabely.filter((k) => k.od === busId && komp(k.do)?.typ === "rozvod"), ...kabely.filter((k) => k.od === busId && komp(k.do)?.typ !== "rozvod")];

  // Označení W1, W2… v pořadí kresby (vlevo shora dolů, baterie, vpravo); nekreslené kabely na konec.
  const poradi: KabelSchematu[] = [];
  const pridej = (k: KabelSchematu | undefined) => {
    if (k && !poradi.includes(k)) poradi.push(k);
  };
  for (const k of doBusu) {
    pridej(kabely.find((u) => u.do === k.od));
    pridej(k);
  }
  pridej(kabelBaterie);
  for (const k of zBusu) {
    pridej(k);
    for (const c of kabely.filter((c) => c.od === k.do)) pridej(c);
  }
  for (const k of kabely) pridej(k);
  const wId = (k: KabelSchematu) => `W${poradi.indexOf(k) + 1}`;

  const pojistkaA = (k: KabelSchematu) => (k.vysledek?.stav === "ok" ? fill(t["pojistka"], { a: fmt(k.vysledek.pojistka, 0) }) : t["pojistka.odbornik"]!);
  const popis = (k: KabelSchematu) => {
    const w = wId(k);
    if (k.druh === "solar") return fill(t["kabel.solar"], { w });
    if (k.druh === "ac") return fill(t["kabel.ac"], { w });
    if (k.vysledek?.stav !== "ok") return fill(t["kabel.chyba"], { w });
    const d = delkaM(k.id);
    const prurez = fmt(k.vysledek.prurez, 1);
    return d !== undefined ? fill(t["kabel.dc"], { w, prurez, delka: fmt(d, 1) }) : fill(t["kabel.dcBezDelky"], { w, prurez });
  };
  const pojistkyNa = (k: KabelSchematu, x1: number, x2: number) => {
    if (k.druh !== null) return [];
    const p: number[] = [];
    // Z přípojnice: pojistka až za přípojnicí −, aby se značka nekřížila s ní.
    if (k.pojistkaU === "od" || k.pojistkaU === "obe") p.push(x1 === X_PLUS ? X_MINUS + 44 : x1 + 34);
    if (k.pojistkaU === "do" || k.pojistkaU === "obe") p.push(x2 - 34);
    return p;
  };
  const ma = (k: KabelSchematu, typ: PrvekTyp) => k.prvky.some((p) => p.typ === typ);

  const kresba: ReactNode[] = [];
  const tecky: { x: number; y: number }[] = [];
  let ymin = Infinity;
  let ymax = -Infinity;
  const naBus = (y: number) => {
    ymin = Math.min(ymin, y);
    ymax = Math.max(ymax, y + G);
    tecky.push({ x: X_PLUS, y }, { x: X_MINUS, y: y + G });
  };

  /** Dvojice vodičů + a − mezi x1 a x2 s popisem a pojistkami. */
  const dvojice = (key: string, k: KabelSchematu | null, x1: number, x2: number, y: number, o: { mostyPlus?: number[]; mostyMinus?: number[]; x1Minus?: number; x2Minus?: number; popisX?: number; popisPod?: boolean; bezPojistek?: boolean } = {}) => {
    kresba.push(
      <g key={key} className="bs-vetev">
        <path className="bs-vodic bs-vodic--plus" d={vodic(x1, x2, y, o.mostyPlus)} />
        <path className="bs-vodic bs-vodic--minus" d={vodic(o.x1Minus ?? x1, o.x2Minus ?? x2, y + G, o.mostyMinus)} />
        {k && !o.bezPojistek ? pojistkyNa(k, x1, x2).map((px) => <Pojistka key={px} x={px} y={y} hodnota={pojistkaA(k)} />) : null}
        {k ? (
          <Text x={o.popisX ?? (x1 + x2) / 2} y={o.popisPod ? y + G + 24 : y - 11} className="bs-popis">
            {popis(k)}
          </Text>
        ) : null}
      </g>,
    );
  };
  /** Jednopólová čára 230 V se třemi čárkami. */
  const jednopol = (key: string, k: KabelSchematu, x1: number, x2: number, y: number, popisX: number, carkyX: number) => {
    kresba.push(
      <g key={key} className="bs-vetev">
        <path className="bs-vodic bs-vodic--ac" d={vodic(x1, x2, y)} />
        <Carky x={carkyX} y={y} />
        <Text x={popisX} y={y - 14} className="bs-popis">
          {popis(k)}
        </Text>
      </g>,
    );
  };

  // Levá strana: zdroje a měniče nabíjení.
  let yl = Y0;
  doBusu.forEach((k, i) => {
    const y = yl;
    const conv = komp(k.od);
    const vstup = kabely.find((u) => u.do === k.od);
    const zdroj = vstup ? komp(vstup.od) : undefined;
    const typ = conv?.typ ?? "";
    // Blok měniče nabíjení.
    kresba.push(
      <g key={`b${i}`}>
        {typ === "mppt" ? (
          <Blok x={X_BLOK} y={y} text={t["blok.mppt"]} />
        ) : typ === "nabijecka" ? (
          <Blok x={X_BLOK} y={y} vlevo="~" vpravo="=" />
        ) : (
          <Blok x={X_BLOK} y={y} vlevo="=" vpravo="=" />
        )}
        <Nazev x={X_BLOK} y={y + G + 14 + 22} text={nazev(k.od)} />
      </g>,
    );
    // Kabel z měniče na přípojnici: mínus přemosťuje přípojnici +.
    dvojice(`k${i}`, k, X_BLOK + BLOK_W / 2, X_PLUS, y, { x2Minus: X_MINUS, mostyMinus: [X_PLUS], popisX: (X_BLOK + BLOK_W / 2 + X_PLUS - 30) / 2 });
    naBus(y);
    if (vstup && zdroj) {
      kresba.push(
        <g key={`z${i}`}>
          <Zdroj k={zdroj} y={y} t={t} />
          <Nazev x={X_ZDROJ} y={y + G + 14 + 22} text={nazev(zdroj.id)} />
        </g>,
      );
      const x1 = zdroj.typ === "startovaci" ? X_ZDROJ + 20 : zdroj.typ === "sit" ? X_ZDROJ + 18 : X_ZDROJ + BLOK_W / 2;
      const x2 = X_BLOK - BLOK_W / 2;
      if (vstup.druh === "ac") {
        const fils = ma(vstup, "chranic-jistic");
        jednopol(`v${i}`, vstup, x1, x2, y + G / 2, fils ? 300 : (x1 + x2) / 2 - 30, x2 - 30);
        if (fils)
          kresba.push(
            <g key={`f${i}`} className="bs-znacka bs-blok">
              <rect x={156} y={y + G / 2 - 16} width={58} height={32} />
              <Text x={185} y={y + G / 2 + 5}>
                {t["blok.fils"]}
              </Text>
            </g>,
          );
      } else {
        const fv = ma(vstup, "odpojovac-fv");
        dvojice(`v${i}`, vstup, x1, x2, y, { popisX: fv ? 300 : undefined });
        if (fv)
          kresba.push(
            <g key={`o${i}`}>
              <Kontakt x={178} y={y} />
              <Kontakt x={178} y={y + G} />
              <line className="bs-spojeni" x1={178} y1={y - 6} x2={178} y2={y + G - 6} />
            </g>,
          );
      }
    }
    yl += HL;
  });

  // Baterie vlevo dole: hlavní vedení s hlavní pojistkou a vypínačem v plusu a bočníkem v mínusu.
  if (baterie) {
    const y = yl;
    kresba.push(
      <g key="bat">
        <Baterie x={X_BLOK} y={y} />
        <Nazev x={X_BLOK} y={y + G + 14 + 22} text={baterie.nazev} />
      </g>,
    );
    if (kabelBaterie) {
      dvojice("kbat", kabelBaterie, X_BLOK, X_PLUS, y, { x2Minus: X_MINUS, mostyMinus: [X_PLUS], popisPod: true, popisX: 610 });
      const hlavni = kabelBaterie.prvky.find((p) => p.typ === "hlavni-pojistka");
      if (hlavni)
        kresba.push(<Pojistka key="hp" x={490} y={y} hodnota={hlavni.hodnotaA !== undefined ? fill(t["pojistka"], { a: fmt(hlavni.hodnotaA, 0) }) : t["pojistka.odbornik"]!} />);
      if (ma(kabelBaterie, "vypinac")) kresba.push(<Kontakt key="vyp" x={560} y={y} />);
      if (ma(kabelBaterie, "bocnik")) kresba.push(<Bocnik key="boc" x={630} y={y + G} />);
    } else {
      // Bez přípojnice je baterie sama přípojnicí: jen přívody bez kabelu.
      dvojice("kbat", null, X_BLOK, X_PLUS, y, { x2Minus: X_MINUS, mostyMinus: [X_PLUS] });
    }
    naBus(y);
    yl += HL;
  }
  const levyDole = yl - HL + G + 14 + 22 + 2 * RADEK;

  // Pravá strana: pojistková skříňka s okruhy, měnič se zásuvkami 230 V, jiné odběry.
  let yr = Y0;
  zBusu.forEach((k, i) => {
    const cil = komp(k.do);
    const deti = kabely.filter((c) => c.od === k.do);
    if (cil?.typ === "rozvod") {
      const n = Math.max(deti.length, 1);
      const y0 = yr;
      const yN = y0 + (n - 1) * HC;
      const top = y0 - 30;
      const bottom = yN + G + 30;
      kresba.push(
        <g key={`r${i}`}>
          <rect className="bs-skrin" x={X_SKR_L} y={top} width={X_SKR_R - X_SKR_L} height={bottom - top} />
          <Text x={X_SKR_L} y={top - 10} anchor="start" className="bs-nazev">
            {cil.nazev}
          </Text>
          <line className="bs-lista" x1={X_RAIL_P} y1={y0} x2={X_RAIL_P} y2={yN} />
          <line className="bs-lista" x1={X_RAIL_M} y1={y0 + G} x2={X_RAIL_M} y2={yN + G} />
        </g>,
      );
      // Přívod skříňky: + na lištu +, − přemosťuje lištu + (je-li víc okruhů) a končí na liště −.
      dvojice(`kr${i}`, k, X_PLUS, X_RAIL_P, y0, { x1Minus: X_MINUS, x2Minus: X_RAIL_M, mostyPlus: [X_MINUS], mostyMinus: n > 1 ? [X_RAIL_P] : [], popisX: (X_MINUS + X_SKR_L) / 2 + 12 });
      tecky.push({ x: X_RAIL_P, y: y0 }, { x: X_RAIL_M, y: y0 + G });
      naBus(y0);
      deti.forEach((c, j) => {
        const y = y0 + j * HC;
        const spotrebic = komp(c.do);
        tecky.push({ x: X_RAIL_P, y }, { x: X_RAIL_M, y: y + G });
        kresba.push(
          <g key={`c${i}-${j}`} className="bs-vetev">
            <path className="bs-vodic bs-vodic--plus" d={vodic(X_RAIL_P, X_ZATEZ, y, [X_RAIL_M])} />
            <path className="bs-vodic bs-vodic--minus" d={vodic(X_RAIL_M, X_ZATEZ, y + G)} />
            {c.druh === null && c.pojistkaU !== "zadna" ? <Pojistka x={X_POJ_SKR} y={y} hodnota={pojistkaA(c)} /> : null}
            <Text x={(X_SKR_R + X_ZATEZ) / 2} y={y - 11} className="bs-popis">
              {popis(c)}
            </Text>
            <Zatez x={X_ZATEZ} y={y} typ={spotrebic?.typ ?? ""} />
            <Nazev x={X_ZATEZ + 26} y={y + 10} text={nazev(c.do)} anchor="start" max={20} />
          </g>,
        );
      });
      yr = bottom + 70;
    } else {
      const y = yr;
      const typ = cil?.typ ?? "";
      const xb = X_SKR_L + BLOK_W / 2;
      if (deti.length > 0 || typ === "menic") {
        kresba.push(
          <g key={`m${i}`}>
            <Blok x={xb} y={y} vlevo="=" vpravo="~" />
            <Nazev x={xb} y={y + G + 14 + 22} text={nazev(k.do)} />
          </g>,
        );
        dvojice(`kr${i}`, k, X_PLUS, X_SKR_L, y, { x1Minus: X_MINUS, mostyPlus: [X_MINUS], popisX: (X_MINUS + X_SKR_L) / 2 + 12 });
        deti.forEach((c, j) => {
          const ly = y + G / 2 + j * HC;
          const prep = ma(c, "prepinac");
          jednopol(`a${i}-${j}`, c, X_SKR_L + BLOK_W, X_ZATEZ - 4, ly, prep ? 1268 : 1220, X_SKR_L + BLOK_W + 36);
          if (prep) kresba.push(<Prepinac key={`p${i}-${j}`} x={1196} y={ly} t={t} />);
          kresba.push(
            <g key={`s${i}-${j}`}>
              <Zasuvka x={X_ZATEZ - 4} y={ly} />
              <Nazev x={X_ZATEZ + 26} y={ly + 5} text={nazev(c.do)} anchor="start" max={20} />
            </g>,
          );
        });
        yr += Math.max(HL, deti.length * HC + 70);
      } else {
        // Odběr přímo z přípojnice bez dalšího rozvodu.
        dvojice(`kr${i}`, k, X_PLUS, X_ZATEZ, y, { x1Minus: X_MINUS, mostyPlus: [X_MINUS], popisX: (X_MINUS + X_SKR_L) / 2 + 12 });
        kresba.push(
          <g key={`l${i}`}>
            <Zatez x={X_ZATEZ} y={y} typ={typ} />
            <Nazev x={X_ZATEZ + 26} y={y + 10} text={nazev(k.do)} anchor="start" max={20} />
          </g>,
        );
        yr += HC + 20;
      }
      naBus(y);
    }
  });
  const pravyDole = yr - 40;

  if (!Number.isFinite(ymin)) {
    ymin = Y0;
    ymax = Y0 + G;
  }
  const busTop = Math.min(ymin, Y0) - 24;
  const busBottom = ymax + 24;

  // Legenda a razítko pod kresbou.
  const yPaticka = Math.max(levyDole, pravyDole, busBottom) + 40;
  const razX = W - 20 - RAZ_W;
  const razY = yPaticka;
  const H = razY + Math.max(5 * RAZ_RADEK, 3 * 42 + 50) + 24;
  const dnes = datum ?? new Date().toLocaleDateString("cs-CZ").replace(/ /g, NBSP);
  const legenda: [ReactNode, string][] = [
    [<Pojistka x={20} y={0} hodnota="" />, t["legenda.pojistka"]!],
    [
      <>
        <line className="bs-vodic" x1={0} y1={0} x2={40} y2={0} />
        <Kontakt x={20} y={0} />
      </>,
      t["legenda.vypinac"]!,
    ],
    [
      <>
        <line className="bs-vodic" x1={0} y1={0} x2={40} y2={0} />
        <Bocnik x={20} y={0} />
      </>,
      t["legenda.bocnik"]!,
    ],
    [
      <g transform="translate(0 -16)">
        <line className="bs-vodic" x1={20} y1={0} x2={40} y2={0} />
        <line className="bs-vodic" x1={20} y1={G} x2={40} y2={G} />
        <Baterie x={20} y={0} />
      </g>,
      t["legenda.baterie"]!,
    ],
    [
      <g className="bs-znacka">
        <rect x={2} y={-17} width={34} height={34} />
        <line x1={2} y1={17} x2={36} y2={-17} />
      </g>,
      t["legenda.menic"]!,
    ],
    [
      <g transform="translate(0 -16)">
        <Zatez x={20} y={0} typ="cerpadlo" />
      </g>,
      t["legenda.zatez"]!,
    ],
    [
      <>
        <line className="bs-vodic" x1={0} y1={0} x2={40} y2={0} />
        <Carky x={20} y={0} />
      </>,
      t["legenda.ac"]!,
    ],
  ];

  // Tisk: skryje vše kromě tohoto schématu (sourozence všech předků) a tiskne ve světlém režimu.
  function vytisknout() {
    const root = ref.current;
    if (!root) return;
    const skryte: Element[] = [];
    let el: Element = root;
    while (el !== document.body && el.parentElement) {
      for (const s of Array.from(el.parentElement.children))
        if (s !== el && !s.hasAttribute("data-bs-skryt")) {
          s.setAttribute("data-bs-skryt", "");
          skryte.push(s);
        }
      el = el.parentElement;
    }
    const html = document.documentElement;
    const tema = html.getAttribute("data-theme");
    html.setAttribute("data-theme", "light");
    root.setAttribute("data-tisk", "");
    const uklid = () => {
      for (const s of skryte) s.removeAttribute("data-bs-skryt");
      root.removeAttribute("data-tisk");
      if (tema === null) html.removeAttribute("data-theme");
      else html.setAttribute("data-theme", tema);
      window.removeEventListener("afterprint", uklid);
    };
    window.addEventListener("afterprint", uklid);
    window.print();
  }

  const titulek = fill(t["svg.titulek"], { nazev: projekt.nazev });
  return (
    <div className="bs" ref={ref}>
      <div className="bs__ovladani">
        <Button variant="secondary" onClick={vytisknout}>
          {t["tisk"]}
        </Button>
        <p className="cx-hint">{t["tiskHint"]}</p>
      </div>
      <p className="cx-hint bs__posun">{t["posun"]}</p>
      <div className="bs__ram" tabIndex={0} role="region" aria-label={t["ram"]}>
        <svg className="bs__svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ minWidth: W }} role="img" aria-labelledby={`${id}-t ${id}-d`}>
          <title id={`${id}-t`}>{titulek}</title>
          <desc id={`${id}-d`}>{fill(t["svg.popis"], { u: U })}</desc>
          <rect className="bs-papir" x={0} y={0} width={W} height={H} />
          <rect className="bs-ramecek" x={8} y={8} width={W - 16} height={H - 16} />

          {/* Přípojnice + a − */}
          <Text x={(X_PLUS + X_MINUS) / 2} y={busTop - 34} tucne>
            {t["sbernice"]}
          </Text>
          <Text x={X_PLUS} y={busTop - 10} tucne className="bs-pol">
            {t["plus"]}
          </Text>
          <Text x={X_MINUS} y={busTop - 10} tucne>
            {t["minus"]}
          </Text>
          <line className="bs-bus bs-bus--plus" x1={X_PLUS} y1={busTop} x2={X_PLUS} y2={busBottom} />
          <line className="bs-bus" x1={X_MINUS} y1={busTop} x2={X_MINUS} y2={busBottom} />

          {kresba}
          {tecky.map((p, i) => (
            <Tecka key={i} x={p.x} y={p.y} />
          ))}

          {/* Legenda */}
          <g className="bs-legenda">
            <Text x={30} y={yPaticka + 4} anchor="start" tucne>
              {t["legenda.h"]}
            </Text>
            {legenda.map(([znacka, text], i) => {
              const sl = i % 3;
              const rd = Math.floor(i / 3);
              const x = 30 + sl * 300;
              const y = yPaticka + 40 + rd * 42;
              return (
                <g key={i}>
                  <g transform={`translate(${x} ${y})`}>{znacka}</g>
                  <Text x={x + 54} y={y + 5} anchor="start">
                    {text}
                  </Text>
                </g>
              );
            })}
            <Text x={30} y={yPaticka + 40 + 3 * 42 + 6} anchor="start" className="bs-popis">
              {t["legenda.popis"]}
            </Text>
          </g>

          {/* Razítko */}
          <g className="bs-razitko">
            <rect x={razX} y={razY} width={RAZ_W} height={5 * RAZ_RADEK} />
            {[1, 2, 3, 4].map((r) => (
              <line key={r} x1={razX} y1={razY + r * RAZ_RADEK} x2={razX + RAZ_W} y2={razY + r * RAZ_RADEK} />
            ))}
            <line x1={razX + 120} y1={razY + RAZ_RADEK} x2={razX + 120} y2={razY + 4 * RAZ_RADEK} />
            <Text x={razX + 10} y={razY + 21} anchor="start" tucne>
              {t["razitko.vykres"]}
            </Text>
            {[
              [t["razitko.nazev"], projekt.nazev],
              [t["razitko.napeti"], fill(t["razitko.napetiHodnota"], { u: U })],
              [t["razitko.datum"], dnes],
            ].map(([k, v], r) => (
              <g key={r}>
                <Text x={razX + 10} y={razY + (r + 1) * RAZ_RADEK + 21} anchor="start" className="bs-tlumene">
                  {k}
                </Text>
                <Text x={razX + 130} y={razY + (r + 1) * RAZ_RADEK + 21} anchor="start">
                  {v}
                </Text>
              </g>
            ))}
            <Text x={razX + 10} y={razY + 4 * RAZ_RADEK + 21} anchor="start" tucne className="bs-pozor">
              {t["razitko.podklad"]}
            </Text>
          </g>
        </svg>
      </div>

      <TabulkaKabelu t={t} projekt={projekt} poradi={poradi} wId={wId} nazev={nazev} />
    </div>
  );
}

function TabulkaKabelu({ t, projekt, poradi, wId, nazev }: { t: Texts; projekt: Projekt; poradi: KabelSchematu[]; wId: (k: KabelSchematu) => string; nazev: (id: string) => string }) {
  const nic = t["tab.nic"]!;
  const prurez = (k: KabelSchematu) =>
    k.druh === "solar" ? t["tab.prurezSolar"] : k.druh === "ac" ? t["tab.prurezAc"] : k.vysledek?.stav === "ok" ? fill(t["tab.prurezMm"], { x: fmt(k.vysledek.prurez, 1) }) : t["tab.prurezChyba"];
  const delka = (k: KabelSchematu) => {
    const d = projekt.kabely.find((x) => x.id === k.id)?.delkaM;
    return d !== undefined ? fill(t["tab.delkaM"], { x: fmt(d, 1) }) : nic;
  };
  const pojistka = (k: KabelSchematu) => {
    const hlavni = k.prvky.find((p) => p.typ === "hlavni-pojistka");
    if (hlavni) return hlavni.hodnotaA !== undefined ? fill(t["tab.pojistkaHlavni"], { a: fmt(hlavni.hodnotaA, 0) }) : t["tab.pojistkaHlavniOdbornik"];
    if (k.druh !== null || k.pojistkaU === "zadna") return nic;
    if (k.vysledek?.stav !== "ok") return t["tab.prurezChyba"];
    const a = fmt(k.vysledek.pojistka, 0);
    return fill(t[k.pojistkaU === "od" ? "tab.pojistkaOd" : k.pojistkaU === "do" ? "tab.pojistkaDo" : "tab.pojistkaObe"], { a });
  };
  const poznamka = (k: KabelSchematu) => {
    const casti: string[] = [];
    if (k.druh === "solar") casti.push(t["tab.solar"]!);
    else if (k.druh === "ac") casti.push(t["tab.ac"]!);
    else if (k.vysledek?.stav !== "ok") casti.push(t["tab.chyba"]!);
    if (k.proudA !== null) casti.push(fill(t["tab.proud"], { i: fmt(k.proudA, 1) }));
    for (const p of k.prvky) if (p.typ !== "hlavni-pojistka") casti.push(t[`prvek.${p.typ}`] ?? p.typ);
    return casti.join(", ");
  };
  return (
    <div className="bs__tabulka cx-table">
      <table>
        <caption>{t["tab.caption"]}</caption>
        <thead>
          <tr>
            {["kabel", "odkud", "kam", "prurez", "delka", "pojistka", "poznamka"].map((s) => (
              <th key={s} scope="col">
                {t[`tab.${s}`]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {poradi.map((k) => (
            <tr key={k.id}>
              <th scope="row">{wId(k)}</th>
              <td>{nazev(k.od)}</td>
              <td>{nazev(k.do)}</td>
              <td className="bs-cislo">{prurez(k)}</td>
              <td className="bs-cislo">{delka(k)}</td>
              <td>{pojistka(k)}</td>
              <td>{poznamka(k)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
