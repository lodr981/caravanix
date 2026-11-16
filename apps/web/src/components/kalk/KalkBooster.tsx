// Kalkulačka boosteru (oddíl E v docs/KALKULACKY_ALFA.md). Počítá engine.
import { nabitiZJizdy, type Soustava } from "@caravanix/engine";
import { ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, Hlaska, NBSP, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

const VYCHOZI = { u: 12 as number, a: "30", h: "2" };

export function KalkBooster({ t }: { t: Texts }) {
  const [s, set] = useStavVUrl(VYCHOZI);
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const v = nabitiZJizdy({ napeti, proudBoosteruA: cislo(s.a), hodinJizdyDenne: cislo(s.h) });
  return (
    <div className="kalk">
      <section className="kalk-blok kalk-mrizka">
        <SegmentedControl
          legend={t["spol.napeti"]}
          value={String(napeti) as "12" | "24"}
          onChange={(x) => set({ u: Number(x) })}
          options={[
            { value: "12", label: `12${NBSP}V` },
            { value: "24", label: `24${NBSP}V` },
          ]}
        />
        <Cislo label={t["bo.proud"]} unit="A" value={s.a} onChange={(a) => set({ a })} min={1} max={100} chyba={t["spol.rozsah"]!} hint={t["bo.proudHint"]} />
        <Cislo label={t["bo.hodin"]} unit="h" value={s.h} onChange={(h) => set({ h })} min={0} max={24} chyba={t["spol.rozsah"]!} />
      </section>
      {v.stav === "ok" ? (
        <ResultCard
          title={t["bo.vysledek"]}
          primary={{ label: t["bo.denne"], value: fmt(v.WhDenne, 0), unit: "Wh", note: fill(t["bo.ah"], { ah: fmt(v.AhDenne, 0) }) }}
        >
          <div className="cx-notices">
            <Hlaska kind="warn" word={t["spol.pozor"]!}>
              {t["bo.LITHIUM_BOOSTER"]}
            </Hlaska>
            <p className="cx-hint">{t["bo.predpoklad"]}</p>
          </div>
        </ResultCard>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}
      <Sdileni t={t} />
    </div>
  );
}
