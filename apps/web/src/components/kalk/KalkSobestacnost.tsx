// Kalkulačka soběstačnosti (oddíl G v docs/KALKULACKY_ALFA.md). Počítá engine, data měst z @caravanix/data.
import { sobestacnost, type Soustava } from "@caravanix/engine";
import { solarMesta } from "@caravanix/data";
import { ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, Hlaska, NBSP, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

const VYCHOZI = {
  m: "praha",
  mes: 7 as number,
  wp: "200",
  st: "0",
  ah: "200",
  u: 12 as number,
  wh: "800",
  jh: "0",
  ja: "30",
  pr: "0",
};

const MESICE = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

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
  const [s, set] = useStavVUrl(VYCHOZI);
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const v = sobestacnost({
    mesto: s.m,
    mesic: s.mes,
    panelyWp: cislo(s.wp),
    stineniProc: cislo(s.st),
    kapacitaAh: cislo(s.ah),
    napeti,
    WhDenne: cislo(s.wh),
    jizda: { hodinDenne: cislo(s.jh), proudBoosteruA: cislo(s.ja) },
    pripojkaKazdychDni: cislo(s.pr),
  });

  return (
    <div className="kalk">
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
        <div className="kalk-mrizka">
          <Cislo label={t["sb.wh"]} unit="Wh" value={s.wh} onChange={(wh) => set({ wh })} min={1} max={50000} chyba={t["spol.rozsah"]!} hint={t["sb.whHint"]} />
          <Cislo label={t["sb.ah"]} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} min={10} max={2000} chyba={t["spol.rozsah"]!} />
          <Cislo label={t["sb.wp"]} unit="Wp" value={s.wp} onChange={(wp) => set({ wp })} min={0} max={5000} chyba={t["spol.rozsah"]!} hint={t["sb.wpHint"]} />
          <Cislo label={t["sb.stineni"]} unit="%" value={s.st} onChange={(st) => set({ st })} min={0} max={90} chyba={t["spol.rozsah"]!} hint={t["sb.stineniHint"]} />
          <Cislo label={t["sb.jizda"]} unit="h" value={s.jh} onChange={(jh) => set({ jh })} min={0} max={24} chyba={t["spol.rozsah"]!} hint={t["sb.jizdaHint"]} />
          <Cislo label={t["sb.booster"]} unit="A" value={s.ja} onChange={(ja) => set({ ja })} min={0} max={100} chyba={t["spol.rozsah"]!} />
          <Cislo label={t["sb.pripojka"]} unit={t["sb.dni"]} value={s.pr} onChange={(pr) => set({ pr })} min={0} max={30} chyba={t["spol.rozsah"]!} hint={t["sb.pripojkaHint"]} />
        </div>
      </section>

      {v.stav === "ok" ? (
        <>
          <ResultCard
            title={t["sb.vysledek"]}
            primary={
              v.vydrzi
                ? { label: t["sb.dnyLabel"], value: t["sb.vydrzi"]!, note: t["sb.vydrziNote"] }
                : { label: t["sb.dnyLabel"], value: fmt(v.dnyBezPripojky ?? 0, 0), unit: t["sb.dni"], note: t["sb.dnyNote"] }
            }
            secondary={[
              { label: t["sb.vyroba"], value: fmt(v.vyrobaWhDen, 0), unit: "Wh", note: t["sb.vyrobaNote"] },
              { label: t["sb.bilance"], value: fmt(v.bilanceWhDen, 0), unit: "Wh", note: t["sb.bilanceNote"] },
            ]}
            status={v.bilanceWhDen >= 0 || v.vydrzi ? { kind: "ok", word: t["spol.ok"] } : { kind: "warn", word: t["spol.pozor"] }}
          >
            <div className="cx-notices">
              {v.hlasky.includes("BILANCE_KLADNA") ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["sb.BILANCE_KLADNA"]}</Hlaska> : null}
              {v.hlasky.includes("ZIMA_MALO_SLUNCE") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["sb.ZIMA_MALO_SLUNCE"]}</Hlaska> : null}
            </div>
          </ResultCard>

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
                  <span key={i} className={p <= 0 ? "kalk-graf__sloupec kalk-graf__sloupec--prazdna" : "kalk-graf__sloupec"} style={{ height: `${Math.max(2, p)}%` }} title={`${i + 1}. ${t["sb.den"]}: ${fmt(p, 0)} %`} />
                ))}
              </div>
              <div className="kalk-graf__dny" aria-hidden="true">
                <span>1.{NBSP}{t["sb.den"]}</span>
                <span>
                  {v.prubeh.length}.{NBSP}{t["sb.den"]}
                </span>
              </div>
            </div>
            <p className="cx-hint">{t["sb.prubehNote"]}</p>
          </section>

          <section className="kalk-blok" aria-labelledby="sb-g2">
            <h2 id="sb-g2">{t["sb.h2mesice"]}</h2>
            <ul className="kalk-mesice">
              {v.bilancePoMesicich.map((b, i) => (
                <li key={i} className={b >= 0 ? "kalk-mesice--plus" : "kalk-mesice--minus"}>
                  <span>{MESICE[i]}</span>
                  <b className="cx-num">
                    {b >= 0 ? "+" : "−"}
                    {fmt(Math.abs(b), 0)}
                    {NBSP}Wh
                  </b>
                  <span className="cx-hint">{b >= 0 ? t["sb.staci"] : t["sb.nestaci"]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="kalk-blok" aria-labelledby="sb-g3">
            <h2 id="sb-g3">{t["sb.h2pomoc"]}</h2>
            <ol className="kalk-pomoc">
              {v.coPomuze.map((c) => (
                <li key={c.varianta}>
                  <b>{t[`sb.${c.varianta}`]}</b>{" "}
                  {c.prinosDni > 0 ? fill(t["sb.prinos"], { dny: fmt(c.prinosDni, 0) }) : t["sb.bezPrinosu"]}
                </li>
              ))}
            </ol>
            <p className="cx-hint">{t["sb.pomocNote"]}</p>
          </section>
        </>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}
      <p className="cx-hint">{fill(t["sb.predpoklad"], { ztraty: fmt(solarMesta.vychoziZtraty * 100, 0) })}</p>
      <Sdileni t={t} />
    </div>
  );
}
