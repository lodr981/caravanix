// Podpisový prvek 4 (docs/design/VIZUAL.md): řez obytnou dodávkou po vrstvách (elektro, voda, topení).
// Nic nepočítá: tloušťku kabelů dává engine (navrhSchematu, průřez z kalkulačky v1.1), výrobu panelů a stav baterie
// dává výsledek kalkulačky soběstačnosti (sobestacnost). Kód jen převádí data na kresbu. Obrysy vozu jsou vlastní,
// nejde o žádný skutečný model. Barvy jen z tokenů (--cx-*), takže kresba funguje ve světlém i tmavém režimu.
import { useId, useMemo, useState } from "react";
import { projektR1 } from "@caravanix/data";
import { navrhSchematu, type Sobestacnost } from "@caravanix/engine";
import { SegmentedControl, formatDecimal } from "@caravanix/ui";
import "./RezDodavkou.css";

type Texts = Record<string, string>;
type Vrstva = "elektro" | "voda" | "topeni";
const VRSTVY: Vrstva[] = ["elektro", "voda", "topeni"];
const NBSP = " ";
/** Spotřebiče R1, které se rozsvítí, když baterie po 1. dni není prázdná. */
const SPOTREBICE = ["lednice", "svetla", "cerpadlo", "zasuvka"];
const fmt = (x: number, d = 0) => formatDecimal(x, d).replace(/ /g, NBSP);
const fill = (text: string | undefined, vars: Record<string, string>) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

// Kresba ve viewBoxu 1210 × 548. Popisky mají 17 px, takže zůstanou nad 15 px i při zmenšení na 1065 px šířky;
// na užším rámečku se popisky v kresbě skryjí a stejné údaje ukáže seznam pod obrázkem (CSS, container query).
const W = 1210;
const H = 548;
const PISMO = 17;
const RADEK = 21;
const ZNAK = 9.4; // přibližná šířka znaku pro velikost rámečku popisku

type Bod = [number, number];
const cesta = (b: Bod[]) => b.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

/** Trasy kabelů R1 v kresbě (jen rozložení; tloušťka je z výpočtu). */
const TRASY: Record<string, Bod[]> = {
  K1: [[790, 104], [982, 104], [982, 323], [974, 323]],
  K2: [[936, 340], [936, 350]],
  K3: [[100, 378], [100, 396], [790, 396], [790, 373], [812, 373]],
  K4: [[878, 373], [898, 373]],
  K5: [[904, 350], [904, 346], [890, 346], [890, 250], [942, 250], [942, 222]],
  K6: [[918, 214], [790, 214], [790, 340], [772, 340]],
  K7: [[942, 170], [942, 141], [350, 141]],
  K8: [[918, 186], [692, 186], [692, 378], [686, 378]],
  K9: [[918, 200], [758, 200], [758, 248]],
};

/** Tloušťka čáry z průřezu: úměrná průměru vodiče (odmocnina plochy), stejně jako v živém schématu. */
const tloustka = (prurez: number | null) => (prurez === null ? 2.5 : 1 + 1.4 * Math.sqrt(prurez));

interface Popisek {
  id: string;
  kotva: Bod;
  x: number;
  y: number;
  hodnota?: string;
}

function rozmer(p: Popisek, t: Texts) {
  const radky = [t[`dil.${p.id}`] ?? p.id, ...(p.hodnota ? [p.hodnota] : [])];
  const w = Math.round(Math.max(...radky.map((r) => r.length)) * ZNAK + 18);
  const h = radky.length * RADEK + 10;
  return { radky, w, h };
}

/** Konec vodicí čáry na okraji rámečku popisku, nejblíž kotvě. */
function konec(p: Popisek, w: number, h: number): Bod {
  const [ax, ay] = p.kotva;
  if (ax < p.x) return [p.x, Math.min(Math.max(ay, p.y + 6), p.y + h - 6)];
  if (ax > p.x + w) return [p.x + w, Math.min(Math.max(ay, p.y + 6), p.y + h - 6)];
  const x = Math.min(Math.max(ax, p.x + 8), p.x + w - 8);
  return [x, ay < p.y ? p.y : p.y + h];
}

function Popisky({ seznam, t }: { seznam: Popisek[]; t: Texts }) {
  return (
    <g className="rez-popisky">
      {seznam.map((p) => {
        const { radky, w, h } = rozmer(p, t);
        const [ex, ey] = konec(p, w, h);
        return (
          <g key={p.id} className="rez-popisek">
            <path className="rez-popisek__cara" d={`M${p.kotva[0]} ${p.kotva[1]} L${ex} ${ey}`} />
            <circle className="rez-popisek__bod" cx={p.kotva[0]} cy={p.kotva[1]} r={3.5} />
            <rect x={p.x} y={p.y} width={w} height={h} rx={7} />
            {radky.map((r, i) => (
              <text key={i} x={p.x + 9} y={p.y + 5 + RADEK * (i + 1) - 5} fontSize={PISMO} className={i ? "rez-popisek__hodnota" : undefined}>
                {r}
              </text>
            ))}
          </g>
        );
      })}
    </g>
  );
}

export function RezDodavkou({ t, vysledek = null, priklad }: { t: Texts; vysledek?: Sobestacnost | null; priklad?: string }) {
  const [vrstva, setVrstva] = useState<Vrstva>("elektro");
  const uid = useId().replace(/:/g, "");
  const kabely = useMemo(() => navrhSchematu(projektR1), []);

  // Převod výstupu kalkulačky na kresbu (nic se nepočítá znovu).
  const stav = vysledek ? (vysledek.prubeh[0] ?? null) : null; // % kapacity na konci 1. dne
  const vyroba = vysledek ? vysledek.vyrobaWhDen : null;
  const zapnuto = stav === null || stav > 0;
  const zare = vyroba === null ? 0.6 : Math.min(1, Math.max(0.15, vyroba / 1000)); // 1 000 Wh za den = plný jas kresby
  const hladina = stav === null ? 0.7 : Math.min(1, Math.max(0, stav / 100));

  const hodnotaVyroby = vyroba === null ? undefined : fill(t["hodnota.vyroba"], { vyroba: fmt(vyroba) });
  const hodnotaBaterie = stav === null ? undefined : fill(t["hodnota.baterie"], { stav: fmt(stav) });
  const hodnotaSpotrebice = vysledek ? t[zapnuto ? "hodnota.zapnuto" : "hodnota.vypnuto"] : undefined;

  const popisky: Record<Vrstva, Popisek[]> = {
    elektro: [
      { id: "panel", kotva: [700, 98], x: 560, y: 6, hodnota: hodnotaVyroby },
      { id: "svetla", kotva: [400, 141], x: 290, y: 44 },
      { id: "startovaci", kotva: [100, 322], x: 12, y: 196 },
      { id: "rozvod", kotva: [966, 196], x: 1012, y: 170 },
      { id: "regulator", kotva: [974, 330], x: 1012, y: 290 },
      { id: "baterie", kotva: [978, 380], x: 1012, y: 362, hodnota: hodnotaBaterie },
      { id: "booster", kotva: [845, 350], x: 808, y: 226 },
      { id: "zasuvka", kotva: [742, 261], x: 500, y: 238 },
      { id: "cerpadlo", kotva: [668, 396], x: 540, y: 500 },
      { id: "lednice", kotva: [736, 398], x: 672, y: 500 },
    ],
    voda: [
      { id: "cista", kotva: [560, 320], x: 340, y: 222 },
      { id: "bojler", kotva: [482, 354], x: 336, y: 336 },
      { id: "drez", kotva: [610, 258], x: 590, y: 168 },
      { id: "seda", kotva: [560, 421], x: 300, y: 500 },
      { id: "cerpadlo", kotva: [668, 396], x: 600, y: 500 },
    ],
    topeni: [
      { id: "topeni", kotva: [370, 423], x: 250, y: 500 },
      { id: "palivo", kotva: [705, 421], x: 590, y: 500 },
      { id: "vzduch", kotva: [382, 370], x: 330, y: 236 },
    ],
  };

  const nazevVrstvy = (v: Vrstva) => t[`vrstva.${v}`] ?? v;
  const sw = (id: string) => {
    const k = kabely.find((x) => x.id === id);
    return tloustka(k?.vysledek?.stav === "ok" ? k.vysledek.prurez : null);
  };
  const tridaVrstvy = (v: Vrstva) => `rez-vrstva rez-vrstva--${v}${v === vrstva ? " rez-vrstva--aktivni" : ""}`;

  return (
    <div className={`rez rez--${vrstva}`}>
      <SegmentedControl
        legend={t["vrstva.legend"]}
        value={vrstva}
        onChange={setVrstva}
        options={VRSTVY.map((v) => ({ value: v, label: nazevVrstvy(v), sub: t[`vrstva.${v}.sub`] }))}
      />
      <div className="rez__ram">
        <svg
          className={`rez__svg${zapnuto ? "" : " rez__svg--vybito"}`}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby={`${uid}-t ${uid}-d`}
          style={{ ["--rez-zare" as string]: zare.toFixed(2) }}
        >
          <title id={`${uid}-t`}>{fill(t["svg.title"], { vrstva: nazevVrstvy(vrstva) })}</title>
          <desc id={`${uid}-d`}>{t["svg.desc"]}</desc>

          {/* Vůz: vlastní obrys (vysoká střecha, kabina vlevo), podběhy kol */}
          <line className="rez-zem" x1={0} y1={484} x2={W} y2={484} />
          <path
            className="rez-karoserie"
            d="M40 425 L40 335 Q40 300 72 296 L150 285 L250 150 Q262 120 300 118 L985 118 Q1000 118 1000 133 L1000 425 Q1000 440 985 440 L873 440 A44 44 0 0 0 787 440 L253 440 A44 44 0 0 0 167 440 L55 440 Q40 440 40 425 Z"
          />
          <path className="rez-sklo" d="M160 280 L248 160 Q256 140 280 138 L300 138 L300 280 Z" />
          <rect className="rez-interier" x={318} y={132} width={668} height={268} rx={4} />
          <line className="rez-podlaha" x1={150} y1={400} x2={986} y2={400} />
          {/* kabina: sedadlo a volant */}
          <path className="rez-nabytek" d="M250 400 L250 352 Q250 342 260 342 L300 342 L306 262 Q307 250 318 252 L318 400 Z" />
          <ellipse className="rez-obrys" cx={222} cy={262} rx={7} ry={26} transform="rotate(-35 222 262)" />
          {/* motorový prostor */}
          <rect className="rez-schranka" x={58} y={318} width={84} height={64} rx={6} />
          {/* kuchyňská linka, postel s garáží */}
          <rect className="rez-nabytek" x={470} y={290} width={312} height={110} rx={4} />
          <rect className="rez-deska" x={464} y={284} width={324} height={10} rx={3} />
          <path className="rez-drez" d="M580 286 L584 300 L636 300 L640 286" />
          <path className="rez-obrys" d="M610 286 L610 258 Q610 250 618 250 L628 250 L628 260" />
          <rect className="rez-nabytek" x={800} y={288} width={186} height={12} rx={3} />
          <rect className="rez-matrace" x={800} y={268} width={186} height={20} rx={8} />
          {/* kola */}
          {[210, 830].map((x) => (
            <g key={x} className="rez-kolo">
              <circle cx={x} cy={448} r={36} />
              <circle className="rez-kolo__disk" cx={x} cy={448} r={14} />
            </g>
          ))}

          {/* VRSTVA TOPENÍ */}
          <g className={tridaVrstvy("topeni")}>
            <path className="rez-vzduch" d={cesta([[380, 401], [380, 384], [790, 384], [790, 372]])} />
            <path className="rez-vzduch" d={cesta([[380, 384], [380, 372]])} />
            {[380, 790].map((x) => (
              <g key={x}>
                <rect className="rez-vyustka" x={x - 14} y={364} width={28} height={9} rx={2} />
                <path className="rez-teplo" d={`M${x - 8} 356 q4 -8 0 -16 q-4 -8 0 -16 M${x + 8} 356 q4 -8 0 -16 q-4 -8 0 -16`} />
              </g>
            ))}
            <path className="rez-palivo" d={cesta([[705, 421], [705, 434], [396, 434], [396, 423]])} />
            <path className="rez-vyfuk" d={cesta([[336, 423], [336, 436], [300, 436]])} />
            <rect className="rez-dil rez-dil--teplo" x={330} y={401} width={80} height={22} rx={5} />
            <rect className="rez-dil" x={665} y={403} width={80} height={18} rx={5} />
          </g>

          {/* VRSTVA VODA */}
          <g className={tridaVrstvy("voda")}>
            <path className="rez-trubka" d={cesta([[636, 378], [650, 378]])} />
            <path className="rez-trubka rez-trubka--tok" d={cesta([[668, 360], [668, 304], [506, 304], [506, 312]])} />
            <path className="rez-trubka rez-trubka--tok" d={cesta([[619, 304], [619, 286]])} />
            <path className="rez-trubka rez-trubka--teplo" d={cesta([[494, 312], [494, 296], [604, 296], [604, 286]])} />
            <path className="rez-trubka rez-trubka--seda" d={cesta([[643, 300], [643, 403]])} />
            <rect className="rez-nadrz" x={540} y={320} width={96} height={76} rx={6} />
            <rect className="rez-nadrz__voda" x={543} y={340} width={90} height={53} rx={4} />
            <rect className="rez-dil" x={482} y={312} width={48} height={84} rx={8} />
            <rect className="rez-nadrz rez-nadrz--seda" x={540} y={403} width={110} height={18} rx={5} />
          </g>

          {/* VRSTVA ELEKTRO */}
          <g className={tridaVrstvy("elektro")}>
            <g className="rez-panely">
              <ellipse className="rez-zare" cx={612} cy={100} rx={205} ry={20} />
              {[430, 615].map((x) => (
                <g key={x}>
                  <rect className="rez-panel" x={x} y={96} width={175} height={14} rx={2} />
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <line key={i} className="rez-panel__clanek" x1={x + i * 25} y1={97} x2={x + i * 25} y2={109} />
                  ))}
                </g>
              ))}
            </g>
            {Object.entries(TRASY).map(([id, body]) => (
              <path key={id} className={`rez-kabel${id === "K1" ? " rez-kabel--solar" : ""}`} d={cesta(body)} strokeWidth={sw(id)} />
            ))}
            {Object.entries(TRASY).map(([id, body]) => (
              <path key={`${id}-tok`} className="rez-kabel__tok" d={cesta(body)} strokeWidth={Math.max(1.5, sw(id) * 0.5)} />
            ))}
            {/* světla na stropě */}
            {[360, 460, 560, 660, 760, 860].map((x) => (
              <g key={x} className="rez-spotrebic">
                <ellipse className="rez-svit" cx={x} cy={150} rx={22} ry={13} />
                <path className="rez-svetlo" d={`M${x - 9} 138 L${x + 9} 138 L${x + 6} 145 L${x - 6} 145 Z`} />
              </g>
            ))}
            <rect className="rez-dil" x={70} y={330} width={60} height={46} rx={5} />
            <rect className="rez-dil" x={898} y={306} width={76} height={34} rx={5} />
            <rect className="rez-dil" x={812} y={350} width={66} height={46} rx={5} />
            <rect className="rez-dil" x={918} y={170} width={48} height={52} rx={5} />
            {[180, 194, 208].map((y) => (
              <rect key={y} className="rez-pojistka" x={928} y={y} width={28} height={8} rx={2} />
            ))}
            {/* baterie se stavem po 1. dni */}
            <rect className="rez-baterie" x={898} y={350} width={80} height={46} rx={5} />
            <rect className="rez-baterie__hladina" x={902} y={354 + 38 * (1 - hladina)} width={72} height={38 * hladina} rx={3} />
            {stav !== null ? (
              <text className="rez-baterie__text rez-jen-siroke" x={938} y={379} textAnchor="middle" fontSize={PISMO}>
                {`${fmt(stav)}${NBSP}%`}
              </text>
            ) : null}
            <g className="rez-spotrebic">
              <rect className="rez-dil rez-lednice" x={700} y={300} width={72} height={98} rx={6} />
              <rect className="rez-svit" x={708} y={310} width={56} height={40} rx={4} />
              <line className="rez-obrys" x1={704} y1={356} x2={768} y2={356} />
            </g>
            <g className="rez-spotrebic">
              <rect className="rez-dil" x={742} y={248} width={32} height={26} rx={4} />
              <circle className="rez-svit" cx={758} cy={261} r={5} />
            </g>
            <g className="rez-spotrebic">
              <rect className="rez-dil" x={650} y={360} width={36} height={36} rx={18} />
              <circle className="rez-svit" cx={668} cy={378} r={6} />
            </g>
          </g>

          <Popisky seznam={popisky[vrstva]} t={t} />
        </svg>
      </div>
      <div className="rez__seznam">
        <h3 className="rez__seznam-nadpis">{fill(t["seznam.nadpis"], { vrstva: nazevVrstvy(vrstva) })}</h3>
        <ul>
          {popisky[vrstva].map((p) => (
            <li key={p.id}>
              <span>{t[`dil.${p.id}`]}</span>
              {p.hodnota ? <span className="rez__hodnota">{p.hodnota}</span> : null}
              {!p.hodnota && hodnotaSpotrebice && SPOTREBICE.includes(p.id) ? <span className="rez__hodnota">{hodnotaSpotrebice}</span> : null}
            </li>
          ))}
        </ul>
      </div>
      {vrstva === "elektro" ? (
        <p className="rez__legenda cx-muted">
          <svg width="40" height="12" aria-hidden="true">
            <line x1="2" y1="3" x2="38" y2="3" className="rez-kabel" strokeWidth={2} />
            <line x1="2" y1="9" x2="38" y2="9" className="rez-kabel" strokeWidth={5} />
          </svg>
          {t["legenda.kabel"]}
        </p>
      ) : null}
      {priklad ? <p className="rez__priklad cx-muted">{priklad}</p> : null}
    </div>
  );
}
