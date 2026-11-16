// Kalkulačka velikosti baterie (oddíl C v docs/KALKULACKY_ALFA.md). Počítá engine.
import { potrebnaBaterie, vydrzBaterie, type Soustava } from "@caravanix/engine";
import { ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, NBSP, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

const VYCHOZI = { u: 12 as number, wh: "800", dny: "3", ah: "200", vy: "90" };

export function KalkBaterie({ t }: { t: Texts }) {
  const [s, set] = useStavVUrl(VYCHOZI);
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const vyuzitelnost = cislo(s.vy) / 100;
  const potreba = potrebnaBaterie({ WhDenne: cislo(s.wh), dnyAutonomie: cislo(s.dny), napeti, vyuzitelnost });
  const vydrz = vydrzBaterie({ kapacitaAh: cislo(s.ah), napeti, vyuzitelnost, WhDenne: cislo(s.wh) });

  return (
    <div className="kalk">
      <section className="kalk-blok">
        <div className="kalk-mrizka">
          <SegmentedControl
            legend={t["spol.napeti"]}
            value={String(napeti) as "12" | "24"}
            onChange={(v) => set({ u: Number(v) })}
            options={[
              { value: "12", label: `12${NBSP}V`, sub: t["ba.12sub"] },
              { value: "24", label: `24${NBSP}V`, sub: t["ba.24sub"] },
            ]}
          />
          <Cislo label={t["ba.spotreba"]} unit="Wh" value={s.wh} onChange={(wh) => set({ wh })} min={1} max={50000} chyba={t["spol.rozsah"]!} hint={t["ba.spotrebaHint"]} />
          <Cislo label={t["ba.vyuzitelnost"]} unit="%" value={s.vy} onChange={(vy) => set({ vy })} min={50} max={100} chyba={t["spol.rozsah"]!} hint={t["ba.vyuzitelnostHint"]} />
        </div>
      </section>

      <section className="kalk-blok" aria-labelledby="ba-h1">
        <h2 id="ba-h1">{t["ba.h2potreba"]}</h2>
        <Cislo label={t["ba.dny"]} unit={t["ba.dnyJednotka"]} value={s.dny} onChange={(dny) => set({ dny })} min={0.5} max={14} chyba={t["spol.rozsah"]!} />
        {potreba.stav === "ok" ? (
          <ResultCard
            title={t["ba.vysledek"]}
            primary={{ label: t["ba.kapacita"], value: fmt(potreba.AhZaokrouhleno, 0), unit: "Ah", note: fill(t["ba.kapacitaNote"], { ah: fmt(potreba.Ah, 1), wh: fmt(potreba.WhPotreba, 0) }) }}
          />
        ) : (
          <ChybaVstupu t={t} pole={potreba.pole} />
        )}
      </section>

      <section className="kalk-blok" aria-labelledby="ba-h2">
        <h2 id="ba-h2">{t["ba.h2vydrz"]}</h2>
        <Cislo label={t["ba.mamAh"]} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} min={1} max={2000} chyba={t["spol.rozsah"]!} />
        {vydrz.stav === "ok" ? (
          <ResultCard
            title={t["ba.vysledek"]}
            primary={{ label: t["ba.vydrzi"], value: fmt(vydrz.dny, 1), unit: t["ba.dnyJednotka"], note: fill(t["ba.vydrziNote"], { h: fmt(vydrz.hodin, 0) }) }}
          />
        ) : (
          <ChybaVstupu t={t} pole={vydrz.pole} />
        )}
      </section>
      <p className="cx-hint">{t["ba.predpoklad"]}</p>
      <Sdileni t={t} />
    </div>
  );
}
