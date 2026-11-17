// Kalkulačka velikosti baterie (oddíl C v docs/KALKULACKY_ALFA.md). Počítá engine.
// Nádrž a pruhy jen převádějí výstup enginu na tvar.
import { potrebnaBaterie, vydrzBaterie, type Soustava } from "@caravanix/engine";
import { BarList, IconBattery, ResultCard, SegmentedControl, TankGauge } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, NBSP, Priklady, Sdileni, cislo, dnu, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

const VYCHOZI = { u: 12 as number, wh: "800", dny: "3", ah: "200", vy: "90" };

/** Dělicí čárky po dnech (jen do 14 dní, víc by splynulo). */
const dilkyDnu = (dny: number) => (dny > 1 && dny <= 14 ? Array.from({ length: Math.floor(dny) }, (_, i) => (i + 1) / dny) : []);

export function KalkBaterie({ t }: { t: Texts }) {
  const [s, set] = useStavVUrl(VYCHOZI);
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const vyuzitelnost = cislo(s.vy) / 100;
  const potreba = potrebnaBaterie({ WhDenne: cislo(s.wh), dnyAutonomie: cislo(s.dny), napeti, vyuzitelnost });
  const vydrz = vydrzBaterie({ kapacitaAh: cislo(s.ah), napeti, vyuzitelnost, WhDenne: cislo(s.wh) });
  const r = { t, chyba: t["spol.rozsah"]! };

  return (
    <div className="kalk">
      <Priklady t={t} kalkulacka="baterie" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok">
        <div className="kalk-mrizka kalk-mrizka--posuvniky">
          <SegmentedControl
            legend={t["spol.napeti"]}
            value={String(napeti) as "12" | "24"}
            onChange={(v) => set({ u: Number(v) })}
            options={[
              { value: "12", label: `12${NBSP}V`, sub: t["ba.12sub"] },
              { value: "24", label: `24${NBSP}V`, sub: t["ba.24sub"] },
            ]}
          />
          <CisloPosuvnik {...r} label={t["ba.spotreba"]!} unit="Wh" value={s.wh} onChange={(wh) => set({ wh })} od={100} do={3000} krok={50} min={1} max={50000} hint={t["ba.spotrebaHint"]} />
          <Cislo label={t["ba.vyuzitelnost"]} unit="%" value={s.vy} onChange={(vy) => set({ vy })} min={50} max={100} chyba={t["spol.rozsah"]!} hint={t["ba.vyuzitelnostHint"]} />
        </div>
      </section>

      <section className="kalk-blok" aria-labelledby="ba-h1">
        <h2 id="ba-h1">{t["ba.h2potreba"]}</h2>
        <CisloPosuvnik {...r} label={t["ba.dny"]!} unit={t["ba.dnyJednotka"]!} value={s.dny} onChange={(dny) => set({ dny })} od={0.5} do={14} krok={0.5} min={0.5} max={14} />
        {potreba.stav === "ok" ? (
          <ResultCard
            title={t["ba.vysledek"]}
            primary={{ label: t["ba.kapacita"], value: fmt(potreba.AhZaokrouhleno, 0), unit: "Ah", note: fill(t["ba.kapacitaNote"], { ah: fmt(potreba.Ah, 1), wh: fmt(potreba.WhPotreba, 0) }) }}
          >
            {(() => {
              const mam = cislo(s.ah);
              const nej = Math.max(potreba.AhZaokrouhleno, Number.isFinite(mam) ? mam : 0, 1);
              return (
                <BarList
                  caption={t["ba.porovnani"]}
                  rows={[
                    { label: t["ba.potrebujete"], icon: <IconBattery className="cx-icon" />, value: `${fmt(potreba.AhZaokrouhleno, 0)}${NBSP}Ah`, share: potreba.AhZaokrouhleno / nej, tone: "copper" },
                    ...(Number.isFinite(mam)
                      ? [{ label: t["ba.mate"], icon: <IconBattery className="cx-icon" />, value: `${fmt(mam, 0)}${NBSP}Ah`, share: mam / nej, tone: "muted" as const }]
                      : []),
                  ]}
                />
              );
            })()}
          </ResultCard>
        ) : (
          <ChybaVstupu t={t} pole={potreba.pole} />
        )}
      </section>

      <section className="kalk-blok" aria-labelledby="ba-h2">
        <h2 id="ba-h2">{t["ba.h2vydrz"]}</h2>
        <CisloPosuvnik {...r} label={t["ba.mamAh"]!} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} od={50} do={600} krok={10} min={1} max={2000} />
        {vydrz.stav === "ok" ? (
          <ResultCard
            title={t["ba.vysledek"]}
            primary={{ label: t["ba.vydrzi"], value: fmt(vydrz.dny, 1), unit: dnu(Math.round(vydrz.dny * 10) / 10, t), note: fill(t["ba.vydrziNote"], { h: fmt(vydrz.hodin, 0) }) }}
          >
            <TankGauge
              size="lg"
              level={1}
              dividers={dilkyDnu(vydrz.dny)}
              label={fill(t["ba.nadrzAria"], { dny: fmt(vydrz.dny, 1) })}
              caption={
                <>
                  <b>{fill(t["ba.nadrz"], { ah: fmt(cislo(s.ah), 0) })}</b>
                  {dilkyDnu(vydrz.dny).length ? t["ba.nadrzDilek"] : t["ba.nadrzBezDilku"]}
                </>
              }
            />
          </ResultCard>
        ) : (
          <ChybaVstupu t={t} pole={vydrz.pole} />
        )}
      </section>
      <p className="cx-hint">{t["ba.predpoklad"]}</p>
      <Sdileni t={t} />
    </div>
  );
}
