// Kalkulačka zapojení solárních panelů (oddíl F v docs/KALKULACKY_ALFA.md). Počítá engine.
import { zapojeniPanelu } from "@caravanix/engine";
import { BarList, IconSolarPanel, ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, Hlaska, NBSP, Priklady, Sdileni, cislo, fill, fmt, useStavVUrl, useUlozDoCesty, Prevzato, type Texts } from "./spolecne.tsx";

const VYCHOZI = {
  voc: "22,3",
  isc: "8,69",
  vmp: "18,2",
  imp: "8,25",
  wp: "150",
  koef: "-0,35",
  serie: "2",
  paralel: "1",
  tmin: "-20",
  rv: "100",
  ra: "30",
  rn: "30",
  rd: "5",
  u: 12 as number,
};

export function KalkSolar({ t }: { t: Texts }) {
  const [s, set, prevzato, aktivni] = useStavVUrl(VYCHOZI, (c) => ({ u: c.u }));
  const napeti = s.u === 24 ? 24 : 12;
  const v = zapojeniPanelu({
    panel: { Voc: cislo(s.voc), Isc: cislo(s.isc), Vmp: cislo(s.vmp), Imp: cislo(s.imp), Wp: cislo(s.wp), koefVocProcNaK: cislo(s.koef) },
    serie: cislo(s.serie),
    paralel: cislo(s.paralel),
    tMin: cislo(s.tmin),
    regulator: { maxVstupV: cislo(s.rv), maxVstupA: cislo(s.ra), nabijeciProudA: cislo(s.rn), minRozdilV: cislo(s.rd) },
    napeti,
  });
  useUlozDoCesty({ u: napeti, wp: v.stav === "ok" ? v.WpPole : undefined }, aktivni);
  const pole = (k: Exclude<keyof typeof VYCHOZI, "u">, label: string, unit: string, min: number, max: number, hint?: string) => (
    <Cislo label={label} unit={unit} value={s[k]} onChange={(x) => set({ [k]: x } as Partial<typeof VYCHOZI>)} min={min} max={max} chyba={t["spol.rozsah"]!} hint={hint} />
  );
  const posuvnik = (k: Exclude<keyof typeof VYCHOZI, "u">, label: string, unit: string, od: number, doo: number, krok: number, min: number, max: number, hint?: string) => (
    <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={label} unit={unit} value={s[k]} onChange={(x) => set({ [k]: x } as Partial<typeof VYCHOZI>)} od={od} do={doo} krok={krok} min={min} max={max} hint={hint} />
  );
  const nSerie = Math.round(cislo(s.serie));
  const nParalel = Math.round(cislo(s.paralel));
  return (
    <div className="kalk">
      <Prevzato t={t} ukaz={prevzato} />
      <Priklady t={t} kalkulacka="solar" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok">
        <h2>{t["so.h2panel"]}</h2>
        <p className="cx-hint">{t["so.panelHint"]}</p>
        <div className="kalk-mrizka">
          {posuvnik("wp", t["so.wp"]!, "Wp", 50, 500, 10, 1, 1000)}
          {pole("voc", t["so.voc"]!, "V", 1, 100)}
          {pole("isc", t["so.isc"]!, "A", 0.1, 30)}
          {pole("vmp", t["so.vmp"]!, "V", 1, 100)}
          {pole("imp", t["so.imp"]!, "A", 0.1, 30)}
          {pole("koef", t["so.koef"]!, "%/K", -1, 0, t["so.koefHint"])}
        </div>
        <h2>{t["so.h2zapojeni"]}</h2>
        <div className="kalk-mrizka kalk-mrizka--posuvniky">
          {posuvnik("serie", t["so.serie"]!, t["so.ks"]!, 1, 6, 1, 1, 10, t["so.serieHint"])}
          {posuvnik("paralel", t["so.paralel"]!, t["so.ks"]!, 1, 6, 1, 1, 10, t["so.paralelHint"])}
        </div>
        {nSerie >= 1 && nSerie <= 10 && nParalel >= 1 && nParalel <= 10 ? (
          <figure className="kalk-pole">
            <div className="kalk-pole__mrizka" aria-hidden="true">
              {Array.from({ length: nParalel }, (_, p) => (
                <div key={p} className="kalk-pole__vetev">
                  {Array.from({ length: nSerie }, (_, i) => (
                    <span key={i} className="kalk-pole__panel">
                      <IconSolarPanel className="cx-icon" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <figcaption className="cx-hint">{fill(t["so.schema"], { s: String(nSerie), p: String(nParalel) })}</figcaption>
          </figure>
        ) : null}
        <div className="kalk-mrizka kalk-mrizka--posuvniky">
          {posuvnik("tmin", t["so.tmin"]!, "°C", -30, 10, 1, -40, 25, t["so.tminHint"])}
        </div>
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
          {pole("rv", t["so.rv"]!, "V", 10, 500, t["so.rvHint"])}
          {pole("rn", t["so.rn"]!, "A", 1, 200, t["so.rnHint"])}
          {pole("ra", t["so.ra"]!, "A", 1, 200, t["so.raHint"])}
          {pole("rd", t["so.rd"]!, "V", 0, 30, t["so.rdHint"])}
        </div>
        <p className="cx-hint">{t["so.ruzne"]}</p>
      </section>
      {v.stav === "ok" ? (
        <ResultCard
          title={t["so.vysledek"]}
          primary={{ label: t["so.vocMraz"], value: fmt(v.VocMraz, 1), unit: "V", note: fill(t["so.vocMrazNote"], { max: fmt(cislo(s.rv), 0) }) }}
          secondary={[
            { label: t["so.vykon"], value: fmt(v.WpPole, 0), unit: "Wp", note: fill(t["so.vykonNote"], { vmp: fmt(v.VmpPole, 1), imp: fmt(v.ImpPole, 1) }) },
            { label: t["so.iscPole"], value: fmt(v.IscPole, 1), unit: "A", note: fill(t["so.iscNote"], { max: fmt(cislo(s.ra), 0) }) },
          ]}
          status={
            v.blok
              ? { kind: "block", word: t["spol.stop"] }
              : v.hlasky.length
                ? { kind: "warn", word: t["spol.pozor"] }
                : { kind: "ok", word: t["spol.ok"] }
          }
        >
          {(() => {
            const rv = cislo(s.rv);
            const ra = cislo(s.ra);
            const skalaV = Math.max(v.VocMraz, rv) * 1.15;
            const skalaA = Math.max(v.IscPole, ra) * 1.15;
            return (
              <BarList
                caption={t["so.rezerva"]}
                rows={[
                  {
                    label: t["so.vocMraz"],
                    value: `${fmt(v.VocMraz, 1)}${NBSP}V`,
                    share: v.VocMraz / skalaV,
                    tone: v.hlasky.includes("VOC_NAD_MAX") ? "block" : "ok",
                    mark: { at: rv / skalaV, label: fill(t["so.vocMrazNote"], { max: fmt(rv, 0) }) },
                  },
                  {
                    label: t["so.iscPole"],
                    value: `${fmt(v.IscPole, 1)}${NBSP}A`,
                    share: v.IscPole / skalaA,
                    tone: v.hlasky.includes("ISC_NAD_MAX") ? "warn" : "ok",
                    mark: { at: ra / skalaA, label: fill(t["so.iscNote"], { max: fmt(ra, 0) }) },
                  },
                ]}
              />
            );
          })()}
          <div className="cx-notices">
            {v.hlasky.includes("VOC_NAD_MAX") ? <Hlaska kind="block" word={t["spol.stop"]!}>{t["so.VOC_NAD_MAX"]}</Hlaska> : null}
            {v.hlasky.includes("ISC_NAD_MAX") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["so.ISC_NAD_MAX"]}</Hlaska> : null}
            {v.hlasky.includes("POJISTKA_VETVE") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["so.POJISTKA_VETVE"]}</Hlaska> : null}
            {v.vmpNizke ? (
              <Hlaska kind="block" word={t["spol.stop"]!}>{fill(t["so.VMP_NIZKE"], { vmp: fmt(v.VmpPole, 1), u: String(napeti), rd: s.rd })}</Hlaska>
            ) : null}
            {v.regulatorOmezi && v.maxWpRegulatoru !== null ? (
              <Hlaska kind="warn" word={t["spol.pozor"]!}>
                {fill(t["so.REGULATOR_OMEZI"], { wp: fmt(v.WpPole, 0), max: fmt(v.maxWpRegulatoru, 0), a: fmt(cislo(s.rn), 0), u: String(napeti) })}
              </Hlaska>
            ) : null}
            {!v.hlasky.length && !v.regulatorOmezi && !v.vmpNizke ? <p className="cx-hint">{t["so.ok"]}</p> : null}
            <p className="cx-hint">
              <a href={`/cs/kalkulacka-sobestacnosti/?s=${encodeURIComponent(JSON.stringify({ u: napeti, wp: String(v.WpPole) }))}`}>{t["so.naSobestacnost"]}</a>
            </p>
          </div>
        </ResultCard>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}
      <Sdileni
        t={t}
        karta={
          v.stav === "ok"
            ? {
                title: t["so.h1"]!,
                inputs: `${s.serie} × ${s.paralel} · ${s.wp} Wp · ${s.tmin} °C · ${s.rv} V`,
                primary: { label: t["so.vocMraz"]!, value: fmt(v.VocMraz, 1), unit: "V" },
                secondary: [
                  { label: t["so.vykon"]!, value: fmt(v.WpPole, 0), unit: "Wp" },
                  { label: t["so.iscPole"]!, value: fmt(v.IscPole, 1), unit: "A" },
                ],
              }
            : null
        }
      />
    </div>
  );
}
