// Kalkulačka boosteru (oddíl E v docs/KALKULACKY_ALFA.md, realistický model 17. 11. 2026). Počítá engine.
// Booster nejede celou jízdu naplno: do 90 % nabití průměrně koeficient × jmenovitý proud (podle stylu jízdy),
// nad 90 % jen 0,2 (K-BOOST-0001, 0002, podklad docs/karty/BOOSTER_REALNE.md).
import { nabitiZJizdy, type Soustava } from "@caravanix/engine";
import { BarList, IconBattery, IconBolt, ResultCard, SegmentedControl, TankGauge } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, Hlaska, Priklady, NBSP, Sdileni, cislo, fill, fmt, useStavVUrl, useUlozDoCesty, Prevzato, type Texts } from "./spolecne.tsx";

/** Průměrný podíl jmenovitého proudu do 90 % nabití podle stylu jízdy (rozsah karty K-BOOST-0001: 0,5–0,9). */
const KOEFICIENT = { dalnice: 0.85, smisene: 0.7, mesto: 0.5 } as const;
type Styl = keyof typeof KOEFICIENT;

const cele = (n: number | undefined) => (n === undefined ? undefined : String(Math.round(n)));
const VYCHOZI = { u: 12 as number, uv: 12 as number, a: "30", h: "2", styl: "smisene", zn: false, ah: "100", st: "30", alt: "", mx: "", wh: "" };

export function KalkBooster({ t }: { t: Texts }) {
  const [s, set, prevzato, aktivni] = useStavVUrl(VYCHOZI, (c) => ({
    u: c.u,
    uv: c.u,
    wh: cele(c.wh),
    ...(c.ahMam ?? c.ahPotreba ? { zn: true, ah: cele(c.ahMam ?? c.ahPotreba) } : {}),
  }));
  const napetiVozu = (s.uv === 24 ? 24 : 12) as Soustava;
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const styl: Styl = s.styl === "dalnice" || s.styl === "mesto" ? s.styl : "smisene";
  const v = nabitiZJizdy({
    napeti,
    proudBoosteruA: cislo(s.a),
    hodinJizdyDenne: cislo(s.h),
    koeficient: KOEFICIENT[styl],
    ...(s.zn ? { kapacitaAh: cislo(s.ah), startProc: cislo(s.st) } : {}),
    napetiVozu,
    ...(s.alt.trim() ? { alternatorA: cislo(s.alt) } : {}),
    ...(s.mx.trim() ? { maxNabijeciA: cislo(s.mx) } : {}),
    ...(s.wh.trim() ? { spotrebaWhDen: cislo(s.wh) } : {}),
  });

  useUlozDoCesty({ u: napeti, ba: cislo(s.a) }, aktivni);
  return (
    <div className="kalk">
      <Prevzato t={t} ukaz={prevzato} />
      <Priklady t={t} kalkulacka="booster" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok kalk-mrizka kalk-mrizka--posuvniky">
        <SegmentedControl
          legend={t["bo.napetiObytne"]}
          value={String(napeti) as "12" | "24"}
          onChange={(x) => set({ u: Number(x) })}
          options={[
            { value: "12", label: `12${NBSP}V` },
            { value: "24", label: `24${NBSP}V` },
          ]}
        />
        <SegmentedControl
          legend={t["bo.napetiVozu"]}
          hint={t["bo.napetiVozuHint"]}
          value={String(napetiVozu) as "12" | "24"}
          onChange={(x) => set({ uv: Number(x) })}
          options={[
            { value: "12", label: `12${NBSP}V`, sub: t["bo.vuz12"] },
            { value: "24", label: `24${NBSP}V`, sub: t["bo.vuz24"] },
          ]}
        />
        <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["bo.proud"]!} unit="A" value={s.a} onChange={(a) => set({ a })} od={10} do={60} krok={5} min={1} max={100} hint={t["bo.proudHint"]} />
        <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["bo.hodin"]!} unit="h" value={s.h} onChange={(h) => set({ h })} od={0} do={8} krok={0.5} min={0} max={24} />
        <SegmentedControl
          legend={t["bo.styl"]}
          hint={t["bo.stylHint"]}
          value={styl}
          onChange={(x) => set({ styl: x })}
          options={[
            { value: "dalnice", label: t["bo.styl.dalnice"], sub: t["bo.styl.dalniceSub"] },
            { value: "smisene", label: t["bo.styl.smisene"], sub: t["bo.styl.smiseneSub"] },
            { value: "mesto", label: t["bo.styl.mesto"], sub: t["bo.styl.mestoSub"] },
          ]}
        />
        <Cislo label={t["bo.alt"]} unit="A" value={s.alt} onChange={(alt) => set({ alt })} min={20} max={500} chyba={t["spol.rozsah"]!} hint={t["bo.altHint"]} />
        <Cislo label={t["bo.mx"]} unit="A" value={s.mx} onChange={(mx) => set({ mx })} min={1} max={1000} chyba={t["spol.rozsah"]!} hint={t["bo.mxHint"]} />
        <Cislo label={t["bo.wh"]} unit="Wh" value={s.wh} onChange={(wh) => set({ wh })} min={1} max={50000} chyba={t["spol.rozsah"]!} hint={t["bo.whHint"]} />
        <label className="kalk-check">
          <input type="checkbox" checked={s.zn} onChange={(e) => set({ zn: e.target.checked })} />
          <span>{t["bo.znamStav"]}</span>
        </label>
        {s.zn ? (
          <>
            <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["bo.kapacita"]!} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} od={50} do={400} krok={10} min={10} max={2000} />
            <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["bo.start"]!} unit="%" value={s.st} onChange={(st) => set({ st })} od={0} do={100} krok={5} min={0} max={100} hint={t["bo.startHint"]} />
          </>
        ) : null}
      </section>

      {v.stav === "ok" ? (
        <ResultCard
          title={t["bo.vysledek"]}
          primary={{ label: t["bo.denne"], value: fmt(v.WhDenne, 0), unit: "Wh", note: fill(t["bo.ah"], { ah: fmt(v.AhDenne, 0) }) }}
          secondary={[
            { label: t["bo.prumer"], value: fmt(v.prumernyProudA, 1), unit: "A", note: fill(t["bo.prumerNote"], { a: fmt(cislo(s.a), 0) }) },
            ...(v.konecProc !== null ? [{ label: t["bo.konec"], value: fmt(v.konecProc, 0), unit: "%", note: fill(t["bo.konecNote"], { st: fmt(cislo(s.st), 0) }) }] : []),
          ]}
        >
          <div className="kalk-vizual">
            {v.konecProc !== null ? (
              <TankGauge
                level={v.konecProc / 100}
                label={fill(t["bo.nadrzAria"], { st: fmt(cislo(s.st), 0), konec: fmt(v.konecProc, 0) })}
                value={`${fmt(v.konecProc, 0)}${NBSP}%`}
                caption={t["bo.nadrz"]}
              />
            ) : null}
            <BarList
              caption={t["bo.srovnani"]}
              rows={[
                { label: t["bo.naplno"], value: `${fmt(v.naivniAh, 0)}${NBSP}Ah`, share: 1, tone: "muted", icon: <IconBolt className="cx-icon" /> },
                { label: t["bo.skutecne"], value: `${fmt(v.AhDenne, 0)}${NBSP}Ah`, share: v.naivniAh > 0 ? v.AhDenne / v.naivniAh : 0, tone: "copper", icon: <IconBattery className="cx-icon" /> },
              ]}
            />
          </div>
          <div className="cx-notices">
            {v.hlasky.includes("DOBITO_DO_PLNA") ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["bo.DOBITO_DO_PLNA"]}</Hlaska> : null}
            {cislo(s.h) === 0 ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["bo.BEZ_JIZDY"]}</Hlaska> : null}
            {v.podilSpotrebyProc !== null && cislo(s.h) > 0 ? (
              <Hlaska kind={v.podilSpotrebyProc >= 100 ? "ok" : "warn"} word={t[v.podilSpotrebyProc >= 100 ? "spol.ok" : "spol.pozor"]!}>
                {fill(t["bo.podil"], { proc: fmt(Math.min(v.podilSpotrebyProc, 999), 0), wh: fmt(cislo(s.wh), 0) })}
              </Hlaska>
            ) : null}
            {v.nadAlternator ? (
              <Hlaska kind="warn" word={t["spol.pozor"]!}>{fill(t["bo.NAD_ALTERNATOR"], { a: fmt(v.vstupniProudA, 0), alt: fmt(cislo(s.alt), 0) })}</Hlaska>
            ) : null}
            {v.nadNabijeci ? (
              <Hlaska kind="warn" word={t["spol.pozor"]!}>{fill(t["bo.NAD_NABIJECI"], { a: fmt(cislo(s.a), 0), mx: fmt(cislo(s.mx), 0) })}</Hlaska>
            ) : null}
            <p className="cx-hint">{fill(t["bo.vstup"], { a: fmt(v.vstupniProudA, 0), uv: String(napetiVozu), u: String(napeti) })}</p>
            <p className="cx-hint">{t["bo.LITHIUM_BOOSTER"]}</p>
          </div>
        </ResultCard>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}

      <section className="kalk-blok" aria-labelledby="bo-proc">
        <h2 id="bo-proc">{t["bo.procH2"]}</h2>
        <ol className="kalk-pomoc">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i}>{t[`bo.proc${i}`]}</li>
          ))}
        </ol>
        <p className="cx-hint">{t["bo.mereni"]}</p>
        <p className="cx-hint">{t["bo.predpoklad"]}</p>
      </section>
      <Sdileni
        t={t}
        karta={
          v.stav === "ok"
            ? {
                title: t["bo.h1"]!,
                inputs: `${s.a} A · ${s.h} h · ${t[`bo.styl.${styl}`]}`,
                primary: { label: t["bo.denne"]!, value: fmt(v.WhDenne, 0), unit: "Wh" },
                secondary: [
                  { label: "Ah", value: fmt(v.AhDenne, 0), unit: "Ah" },
                  { label: t["bo.prumer"]!, value: fmt(v.prumernyProudA, 1), unit: "A" },
                  ...(v.konecProc !== null ? [{ label: t["bo.konec"]!, value: fmt(v.konecProc, 0), unit: "%" }] : []),
                ],
              }
            : null
        }
      />
    </div>
  );
}
