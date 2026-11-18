// Kalkulačka soběstačnosti (oddíl G v docs/KALKULACKY_ALFA.md). Počítá engine, data měst z @caravanix/data.
// Vizualizace jen převádějí výstup enginu na tvar (výška, šířka pruhu), nic nepočítají.
import type { CSSProperties } from "react";
import { sobestacnost, type Soustava } from "@caravanix/engine";
import { solarMesta } from "@caravanix/data";
import { BarList, IconBattery, IconBolt, IconPlug, IconSolarPanel, IconSun, ResultCard, SegmentedControl, TankGauge } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, Hlaska, NBSP, Predpoklady, Priklady, Sdileni, cislo, dnu, fill, fmt, useStavVUrl, useUlozDoCesty, Prevzato, OdkazNaSpotrebice, type Texts } from "./spolecne.tsx";

const cele = (n: number | undefined) => (n === undefined ? undefined : String(Math.round(n)));
const VYCHOZI = {
  m: "praha",
  mes: 7 as number,
  wp: "200",
  st: "0",
  ah: "200",
  u: 12 as number,
  wh: "800",
  wl: "",
  wj: "",
  wz: "",
  jh: "0",
  ja: "30",
  pr: "0",
  ztr: String(Math.round(solarMesta.vychoziZtraty * 100)),
  vy: "90",
};

const MESICE = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

const IKONA_POMOCI = { BATERIE_100AH: IconBattery, PANELY_100WP: IconSolarPanel, BOOSTER_10A: IconBolt, SPOTREBA_MINUS_10: IconPlug } as const;

function Vyber(props: { id: string; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="cx-field">
      <label className="cx-label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="cx-input">
        <select id={props.id} value={props.value} onChange={(e) => props.onChange(e.target.value)}>
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function KalkSobestacnost({ t }: { t: Texts }) {
  const [s, set, prevzato, aktivni, zdroj] = useStavVUrl(VYCHOZI, (c) => ({
    u: c.u,
    wh: cele(c.wh),
    ah: cele(c.ahMam ?? c.ahPotreba),
    wp: cele(c.wp),
    wl: cele(c.whLeto),
    wj: cele(c.whJaroPodzim),
    wz: cele(c.whZima),
  }));
  // Spotřeba podle sezóny z kalkulačky spotřebičů: pak se pro každý měsíc použije jeho sezóna.
  const poSezonach = s.wl.trim() && s.wj.trim() && s.wz.trim() ? { leto: cislo(s.wl), jaroPodzim: cislo(s.wj), zima: cislo(s.wz) } : undefined;
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const v = sobestacnost({
    mesto: s.m,
    mesic: s.mes,
    panelyWp: cislo(s.wp),
    stineniProc: cislo(s.st),
    kapacitaAh: cislo(s.ah),
    napeti,
    WhDenne: cislo(s.wh),
    ...(poSezonach ? { WhDennePoSezonach: poSezonach } : {}),
    jizda: { hodinDenne: cislo(s.jh), proudBoosteruA: cislo(s.ja) },
    pripojkaKazdychDni: cislo(s.pr),
    ztratySystemu: cislo(s.ztr) / 100,
    vyuzitelnost: cislo(s.vy) / 100,
  });
  const r = { t, chyba: t["spol.rozsah"]! };

  useUlozDoCesty({ u: s.u, wh: cislo(s.wh), ahMam: cislo(s.ah), wp: cislo(s.wp) }, aktivni);
  return (
    <div className="kalk">
      <Prevzato t={t} ukaz={prevzato} text={zdroj === "spotrebice" ? fill(t["sp.prevzatoZeSpotrebicu"], { wh: fmt(cislo(s.wh), 0) }) : undefined} />
      <Priklady t={t} kalkulacka="sobestacnost" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok">
        <h2>{t["sb.h2kde"]}</h2>
        <div className="kalk-mrizka">
          <Vyber id="sb-m" label={t["sb.mesto"]!} value={s.m} onChange={(m) => set({ m })} options={solarMesta.mesta.map((m) => ({ value: m.id, label: m.nazev }))} />
          <Vyber id="sb-mes" label={t["sb.mesic"]!} value={String(s.mes)} onChange={(x) => set({ mes: Number(x) })} options={MESICE.map((n, i) => ({ value: String(i + 1), label: n }))} />
        </div>
        <h2>{t["sb.h2vybava"]}</h2>
        <SegmentedControl
          legend={t["spol.napeti"]}
          value={String(napeti) as "12" | "24"}
          onChange={(x) => set({ u: Number(x) })}
          options={[
            { value: "12", label: `12${NBSP}V` },
            { value: "24", label: `24${NBSP}V` },
          ]}
        />
        <div className="kalk-mrizka kalk-mrizka--posuvniky">
          {poSezonach ? (
            <div className="cx-field">
              <p className="cx-label">{t["sb.wh"]}</p>
              <p>{fill(t["sb.whSezony"], { l: fmt(poSezonach.leto, 0), j: fmt(poSezonach.jaroPodzim, 0), z: fmt(poSezonach.zima, 0) })}</p>
              <button type="button" className="cx-btn cx-btn--quiet" onClick={() => set({ wl: "", wj: "", wz: "" })}>
                <span>{t["sb.whJedna"]}</span>
              </button>
            </div>
          ) : (
          <CisloPosuvnik {...r} label={t["sb.wh"]!} unit="Wh" value={s.wh} onChange={(wh) => set({ wh })} od={100} do={3000} krok={50} min={1} max={50000} hint={t["sb.whHint"]} />
          )}
          <CisloPosuvnik {...r} label={t["sb.ah"]!} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} od={50} do={600} krok={10} min={10} max={2000} />
          <CisloPosuvnik {...r} label={t["sb.wp"]!} unit="Wp" value={s.wp} onChange={(wp) => set({ wp })} od={0} do={800} krok={10} min={0} max={5000} hint={t["sb.wpHint"]} />
          <CisloPosuvnik {...r} label={t["sb.stineni"]!} unit="%" value={s.st} onChange={(st) => set({ st })} od={0} do={90} krok={5} min={0} max={90} hint={t["sb.stineniHint"]} />
          <CisloPosuvnik {...r} label={t["sb.jizda"]!} unit="h" value={s.jh} onChange={(jh) => set({ jh })} od={0} do={8} krok={0.5} min={0} max={24} hint={t["sb.jizdaHint"]} />
          <CisloPosuvnik {...r} label={t["sb.booster"]!} unit="A" value={s.ja} onChange={(ja) => set({ ja })} od={0} do={60} krok={5} min={0} max={100} />
          <CisloPosuvnik {...r} label={t["sb.pripojka"]!} unit={t["sb.dni"]!} value={s.pr} onChange={(pr) => set({ pr })} od={0} do={30} krok={1} min={0} max={30} hint={t["sb.pripojkaHint"]} />
        </div>
        <OdkazNaSpotrebice t={t} kam="sobestacnost" stav={s} />
        <Predpoklady t={t}>
          <Cislo label={t["pred.ztr"]} unit="%" value={s.ztr} onChange={(ztr) => set({ ztr })} min={50} max={100} chyba={t["spol.rozsah"]!} hint={t["pred.ztrHint"]} />
          <Cislo label={t["pred.vy"]} unit="%" value={s.vy} onChange={(vy) => set({ vy })} min={50} max={100} chyba={t["spol.rozsah"]!} />
        </Predpoklady>
      </section>

      {v.stav === "ok" ? (
        <>
          <ResultCard
            title={t["sb.vysledek"]}
            primary={
              cislo(s.pr) > 0
                ? v.dnuPrazdna > 0
                  ? { label: t["sb.prazdnaLabel"], value: fmt(v.dnuPrazdna, 0), unit: dnu(v.dnuPrazdna, t), note: fill(t["sb.prazdnaNote"], { dny: String(v.prubeh.length) }) }
                  : { label: t["sb.prazdnaLabel"], value: t["sb.nikdy"]!, note: fill(t["sb.nikdyNote"], { po: s.pr }) }
                : v.vydrzi
                  ? { label: t["sb.dnyLabel"], value: t["sb.vydrzi"]!, note: t["sb.vydrziNote"] }
                  : {
                      label: t["sb.dnyLabel"],
                      value: fmt(v.dnyBezPripojky ?? 0, 0),
                      unit: dnu(v.dnyBezPripojky ?? 0, t),
                      note: v.dnyPresne !== null ? fill(t["sb.dnyPresne"], { d: fmt(v.dnyPresne, 1) }) : t["sb.dnyNote"],
                    }
            }
            secondary={[
              { label: t["sb.vyroba"], value: fmt(v.vyrobaWhDen, 0), unit: "Wh", note: t["sb.vyrobaNote"] },
              { label: t["sb.bilance"], value: fmt(v.bilanceWhDen, 0), unit: "Wh", note: t["sb.bilanceNote"] },
            ]}
            status={v.bilanceWhDen >= 0 || v.vydrzi ? { kind: "ok", word: t["spol.ok"] } : { kind: "warn", word: t["spol.pozor"] }}
          >
            <div className="kalk-vizual">
              <TankGauge
                size="lg"
                level={(v.prubeh[v.prubeh.length - 1] ?? 0) / 100}
                value={`${fmt(v.prubeh[v.prubeh.length - 1] ?? 0, 0)}${NBSP}%`}
                label={fill(t["sb.nadrzAria"], { dny: String(v.prubeh.length), proc: fmt(v.prubeh[v.prubeh.length - 1] ?? 0, 0) })}
                caption={
                  <>
                    <b>{fill(t["sb.nadrz"], { dny: String(v.prubeh.length) })}</b>
                    {t["sb.nadrzNote"]}
                  </>
                }
              />
              <BilanceDne t={t} vyroba={v.vyrobaWhDen} jizda={v.boosterWhDen} spotreba={cislo(s.wh)} />
            </div>
            <div className="cx-notices">
              {v.hlasky.includes("BILANCE_KLADNA") ? (
                <Hlaska kind="ok" word={t["spol.ok"]!}>{t["sb.BILANCE_KLADNA"]}</Hlaska>
              ) : (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>{fill(t["sb.BILANCE_ZAPORNA"], { wh: fmt(-v.bilanceWhDen, 0) })}</Hlaska>
              )}
              {v.hlasky.includes("ZIMA_MALO_SLUNCE") || v.upozorneni.includes("MALO_SLUNCE") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["sb.ZIMA_MALO_SLUNCE"]}</Hlaska> : null}
              <p className="cx-hint">{fill(t["sb.bezSlunce"], { proc: fmt(v.stavPo3DnechBezSlunceProc, 0) })}</p>
              {v.upozorneni.includes("MRAZ") ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {t["sb.MRAZ"]} <a href="/cs/lekce/nabijeni-lifepo4-v-zime/">{t["sb.MRAZodkaz"]}</a>
                </Hlaska>
              ) : null}
            </div>
          </ResultCard>

          <section className="kalk-blok" aria-labelledby="sb-wp">
            <h2 id="sb-wp">{t["sb.h2wp"]}</h2>
            <dl className="kalk-wp">
              {(
                [
                  ["sb.wpMesic", v.potrebaWp],
                  ["sb.wpSezona", v.potrebaWpSezona],
                  ["sb.wpRok", v.potrebaWpRok],
                ] as const
              ).map(([k, wp]) => (
                <div key={k}>
                  <dt>{t[k]}</dt>
                  <dd className="cx-num">{Number.isFinite(wp) ? (wp <= 0 ? t["sb.wpNic"] : `${fmt(Math.ceil(wp / 10) * 10, 0)}${NBSP}Wp`) : t["sb.wpNelze"]}</dd>
                </div>
              ))}
            </dl>
            <p className="cx-hint">{fill(t["sb.wpNote"], { wp: fmt(cislo(s.wp), 0) })}</p>
          </section>

          <section className="kalk-blok" aria-labelledby="sb-g1">
            <h2 id="sb-g1">{t["sb.h2prubeh"]}</h2>
            <div className="kalk-graf-ram">
              <div className="kalk-graf__osa" aria-hidden="true">
                <span style={{ top: "9px" }}>100{NBSP}%</span>
                <span style={{ top: "88px" }}>50{NBSP}%</span>
                <span style={{ top: "167px" }}>0{NBSP}%</span>
              </div>
              <div className="kalk-graf" role="img" aria-label={fill(t["sb.prubehAria"], { dny: String(v.prubeh.length) })}>
                {v.prubeh.map((p, i) => (
                  <span
                    key={i}
                    className={`kalk-graf__sloupec${p <= 0 ? " kalk-graf__sloupec--prazdna" : p < 20 ? " kalk-graf__sloupec--nizko" : ""}`}
                    style={{ "--v": `${Math.max(2, p)}%` } as CSSProperties}
                    title={`${i + 1}. ${t["sb.den"]}: ${fmt(p, 0)} %`}
                  />
                ))}
              </div>
              <div className="kalk-graf__dny" aria-hidden="true">
                {[1, 10, 20, v.prubeh.length]
                  .filter((d, i, a) => d <= v.prubeh.length && a.indexOf(d) === i)
                  .map((d) => (
                    <span key={d} style={{ left: `${((d - 0.5) / v.prubeh.length) * 100}%` }}>
                      {d}.{d === 1 ? `${NBSP}${t["sb.den"]}` : ""}
                    </span>
                  ))}
              </div>
            </div>
            <p className="cx-hint">{t["sb.prubehNote"]}</p>
          </section>

          <section className="kalk-blok" aria-labelledby="sb-g2">
            <h2 id="sb-g2">{t["sb.h2mesice"]}</h2>
            <Mesice t={t} bilance={v.bilancePoMesicich} zvoleny={s.mes} />
            <p className="cx-hint">{t["sb.mesiceNote"]}</p>
          </section>

          <section className="kalk-blok" aria-labelledby="sb-g3">
            <h2 id="sb-g3">{t["sb.h2pomoc"]}</h2>
            <CoPomuze t={t} varianty={v.coPomuze} zmena={v.zmenaBilance} vydrzi={v.vydrzi && cislo(s.pr) === 0} />
            <p className="cx-hint">{t["sb.pomocNote"]}</p>
          </section>
        </>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}
      <p className="cx-hint">{fill(t["sb.predpoklad"], { ztraty: fmt(cislo(s.ztr), 0), vy: fmt(cislo(s.vy), 0) })}</p>
      <Sdileni
        t={t}
        karta={
          v.stav === "ok"
            ? {
                title: t["sb.h1"]!,
                inputs: `${solarMesta.mesta.find((m) => m.id === s.m)?.nazev ?? ""} · ${MESICE[s.mes - 1]} · ${s.wp} Wp · ${s.ah} Ah · ${s.wh} Wh/den`,
                primary: v.vydrzi
                  ? { label: t["sb.dnyLabel"]!, value: t["sb.vydrzi"]! }
                  : { label: t["sb.dnyLabel"]!, value: fmt(v.dnyBezPripojky ?? 0, 0), unit: dnu(v.dnyBezPripojky ?? 0, t) },
                secondary: [
                  { label: t["sb.vyroba"]!, value: fmt(v.vyrobaWhDen, 0), unit: "Wh" },
                  { label: t["sb.bilance"]!, value: fmt(v.bilanceWhDen, 0), unit: "Wh" },
                ],
              }
            : null
        }
      />
    </div>
  );
}

/** Pruhy výroby a spotřeby za den: délka pruhu je jen poměr k největší z hodnot. */
function BilanceDne({ t, vyroba, jizda, spotreba }: { t: Texts; vyroba: number; jizda: number; spotreba: number }) {
  const nej = Math.max(vyroba, jizda, spotreba, 1);
  return (
    <BarList
      caption={t["sb.pomer"]}
      rows={[
        { label: t["sb.zeSlunce"], icon: <IconSun className="cx-icon" />, value: `${fmt(vyroba, 0)}${NBSP}Wh`, share: vyroba / nej, tone: "copper" },
        ...(jizda > 0 ? [{ label: t["sb.zJizdy"], icon: <IconBolt className="cx-icon" />, value: `${fmt(jizda, 0)}${NBSP}Wh`, share: jizda / nej, tone: "accent" as const }] : []),
        { label: t["sb.spotreba"], icon: <IconPlug className="cx-icon" />, value: `${fmt(spotreba, 0)}${NBSP}Wh`, share: spotreba / nej, tone: "muted" },
      ]}
    />
  );
}

/** Bilance po měsících jako pruhy od středové osy: přebytek doprava, schodek doleva; vždy i číslo a slovo. */
function Mesice({ t, bilance, zvoleny }: { t: Texts; bilance: number[]; zvoleny: number }) {
  const nej = Math.max(1, ...bilance.map((b) => Math.abs(b)));
  return (
    <ul className="kalk-mesice">
      {bilance.map((b, i) => (
        <li
          key={i}
          className={`${b >= 0 ? "kalk-mesice--plus" : "kalk-mesice--minus"}${i + 1 === zvoleny ? " kalk-mesice--zvoleny" : ""}`}
          aria-current={i + 1 === zvoleny ? "true" : undefined}
        >
          <span className="kalk-mesice__mesic">{MESICE[i]}</span>
          <span className="kalk-mesice__osa" aria-hidden="true">
            <i style={{ "--w": `${(Math.abs(b) / nej) * 50}%` } as CSSProperties} />
          </span>
          <b className="cx-num kalk-mesice__hodnota">
            {b >= 0 ? "+" : "−"}
            {fmt(Math.abs(b), 0)}
            {NBSP}Wh
          </b>
          <span className="kalk-mesice__slovo">{b >= 0 ? t["sb.staci"] : t["sb.nestaci"]}</span>
        </li>
      ))}
    </ul>
  );
}

/** Co pomůže nejvíc: pořadí a dny navíc z enginu, pruh jen ukazuje poměr k nejlepší variantě. */
function CoPomuze({
  t,
  varianty,
  zmena,
  vydrzi,
}: {
  t: Texts;
  varianty: { varianta: keyof typeof IKONA_POMOCI; prinosDni: number }[];
  zmena: Record<keyof typeof IKONA_POMOCI, number>;
  vydrzi: boolean;
}) {
  if (vydrzi) return <p>{t["sb.uzVydrzi"]}</p>;
  const nej = Math.max(1, ...varianty.map((c) => c.prinosDni));
  return (
    <BarList
      rows={varianty.map((c) => {
        const I = IKONA_POMOCI[c.varianta];
        return {
          label: (t[`sb.${c.varianta}`] ?? "").replace(/:\s*$/, ""),
          icon: <I className="cx-icon" />,
          value:
            c.prinosDni > 0
              ? `+${fmt(c.prinosDni, 0)}${NBSP}${dnu(c.prinosDni, t)}`
              : zmena[c.varianta] > 0
                ? fill(t["sb.jenWh"], { wh: fmt(zmena[c.varianta], 0) })
                : t["sb.bezPrinosu"],
          share: c.prinosDni / nej,
          tone: c.prinosDni > 0 ? ("ok" as const) : ("muted" as const),
        };
      })}
    />
  );
}
