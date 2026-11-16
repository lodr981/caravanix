// Kalkulačka zapojení solárních panelů (oddíl F v docs/KALKULACKY_ALFA.md). Počítá engine.
import { zapojeniPanelu } from "@caravanix/engine";
import { ResultCard } from "@caravanix/ui";
import { ChybaVstupu, Cislo, Hlaska, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

const VYCHOZI = {
  voc: "22,5",
  isc: "10,5",
  vmp: "18,5",
  imp: "9,8",
  wp: "180",
  koef: "-0,29",
  serie: "2",
  paralel: "1",
  tmin: "-20",
  rv: "100",
  ra: "30",
};

export function KalkSolar({ t }: { t: Texts }) {
  const [s, set] = useStavVUrl(VYCHOZI);
  const v = zapojeniPanelu({
    panel: { Voc: cislo(s.voc), Isc: cislo(s.isc), Vmp: cislo(s.vmp), Imp: cislo(s.imp), Wp: cislo(s.wp), koefVocProcNaK: cislo(s.koef) },
    serie: cislo(s.serie),
    paralel: cislo(s.paralel),
    tMin: cislo(s.tmin),
    regulator: { maxVstupV: cislo(s.rv), maxVstupA: cislo(s.ra) },
  });
  const pole = (k: keyof typeof VYCHOZI, label: string, unit: string, min: number, max: number, hint?: string) => (
    <Cislo label={label} unit={unit} value={s[k]} onChange={(x) => set({ [k]: x } as Partial<typeof VYCHOZI>)} min={min} max={max} chyba={t["spol.rozsah"]!} hint={hint} />
  );
  return (
    <div className="kalk">
      <section className="kalk-blok">
        <h2>{t["so.h2panel"]}</h2>
        <p className="cx-hint">{t["so.panelHint"]}</p>
        <div className="kalk-mrizka">
          {pole("wp", t["so.wp"]!, "Wp", 1, 1000)}
          {pole("voc", t["so.voc"]!, "V", 1, 100)}
          {pole("isc", t["so.isc"]!, "A", 0.1, 30)}
          {pole("vmp", t["so.vmp"]!, "V", 1, 100)}
          {pole("imp", t["so.imp"]!, "A", 0.1, 30)}
          {pole("koef", t["so.koef"]!, "%/K", -1, 0, t["so.koefHint"])}
        </div>
        <h2>{t["so.h2zapojeni"]}</h2>
        <div className="kalk-mrizka">
          {pole("serie", t["so.serie"]!, t["so.ks"]!, 1, 10, t["so.serieHint"])}
          {pole("paralel", t["so.paralel"]!, t["so.ks"]!, 1, 10, t["so.paralelHint"])}
          {pole("tmin", t["so.tmin"]!, "°C", -40, 25, t["so.tminHint"])}
          {pole("rv", t["so.rv"]!, "V", 10, 500, t["so.rvHint"])}
          {pole("ra", t["so.ra"]!, "A", 1, 200)}
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
          <div className="cx-notices">
            {v.hlasky.includes("VOC_NAD_MAX") ? <Hlaska kind="block" word={t["spol.stop"]!}>{t["so.VOC_NAD_MAX"]}</Hlaska> : null}
            {v.hlasky.includes("ISC_NAD_MAX") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["so.ISC_NAD_MAX"]}</Hlaska> : null}
            {v.hlasky.includes("POJISTKA_VETVE") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["so.POJISTKA_VETVE"]}</Hlaska> : null}
            {!v.hlasky.length ? <p className="cx-hint">{t["so.ok"]}</p> : null}
          </div>
        </ResultCard>
      ) : (
        <ChybaVstupu t={t} pole={v.pole} />
      )}
      <Sdileni t={t} />
    </div>
  );
}
