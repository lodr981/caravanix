// Kalkulačka měniče (oddíl D v docs/KALKULACKY_ALFA.md). Počítá engine.
import { navrhMenice, type Soustava } from "@caravanix/engine";
import { BarList, Button, IconInverter, ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, Hlaska, Priklady, NBSP, Predpoklady, Sdileni, cislo, fill, fmt, useStavVUrl, useUlozDoCesty, Prevzato, type Texts } from "./spolecne.tsx";

interface Radek {
  n: string;
  w: string;
  r: string; // rozběhový násobek
  sou: boolean; // běží pořád (true), nebo velký spotřebič – z velkých vždy jen jeden naráz (false)
}

const VYCHOZI = {
  u: 12 as number,
  r: [
    { n: "Kávovar na kapsle", w: "1260", r: "1", sou: false },
    { n: "Notebook", w: "30", r: "1", sou: true },
  ] as Radek[],
  nap: "10",
  hod: "4",
  um: "90",
  bms: "100",
};

export function KalkMenic({ t }: { t: Texts }) {
  const [s, set, prevzato, aktivni] = useStavVUrl(VYCHOZI, (c) => ({ u: c.u }));
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const zmen = (i: number, z: Partial<Radek>) => set({ r: s.r.map((r, j) => (j === i ? { ...r, ...z } : r)) });
  const v = navrhMenice({
    napeti,
    ucinnostMenice: cislo(s.um) / 100,
    spotrebice: s.r.map((r) => ({ prikonW: cislo(r.w), rozbehNasobek: cislo(r.r), porad: r.sou })),
    spotrebaNaprazdnoW: cislo(s.nap),
    hodinZapnutoDenne: cislo(s.hod),
    model: "porad-jeden",
    maxProudBmsA: cislo(s.bms),
  });
  // Do průřezu jde trvalý výkon měniče (kabel se počítá na měnič, ne na zátěž), délku si uživatel upraví.
  const odkazPrurez = v.stav === "ok" ? `/cs/kalkulacka-prurezu/?u=${napeti}&r=P&v=${Math.ceil(v.trvalyVykonW)}&l=1.5&d=3&z=2&p=n` : "";

  useUlozDoCesty({ u: napeti, zatez230: v.stav === "ok" ? v.trvalyVykonW : undefined }, aktivni);
  return (
    <div className="kalk">
      <Prevzato t={t} ukaz={prevzato} />
      <Priklady t={t} kalkulacka="menic" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok">
        <SegmentedControl
          legend={t["spol.napeti"]}
          value={String(napeti) as "12" | "24"}
          onChange={(x) => set({ u: Number(x) })}
          options={[
            { value: "12", label: `12${NBSP}V` },
            { value: "24", label: `24${NBSP}V` },
          ]}
        />
        <Cislo label={t["sp.bms"]} unit="A" value={s.bms} onChange={(bms) => set({ bms })} min={1} max={1000} chyba={t["spol.rozsah"]!} hint={t["sp.bmsHint"]} />
        <h2>{t["me.h2"]}</h2>
        <p className="cx-hint">{t["me.h2Hint"]}</p>
        <ol className="kalk-seznam">
          {s.r.map((r, i) => (
            <li key={i} className="kalk-polozka">
              <div className="cx-field">
                <label className="cx-label" htmlFor={`me-n-${i}`}>
                  {t["sp.nazev"]}
                </label>
                <div className="cx-input">
                  <input id={`me-n-${i}`} type="text" value={r.n} onChange={(e) => zmen(i, { n: e.target.value })} />
                </div>
              </div>
              <Cislo label={t["sp.prikon"]} unit="W" value={r.w} onChange={(w) => zmen(i, { w })} min={0} max={10000} chyba={t["spol.rozsah"]!} />
              <Cislo label={t["me.rozbeh"]} unit="×" value={r.r} onChange={(x) => zmen(i, { r: x })} min={1} max={10} chyba={t["spol.rozsah"]!} hint={t["me.rozbehHint"]} />
              <label className="kalk-check">
                <input type="checkbox" checked={r.sou} onChange={(e) => zmen(i, { sou: e.target.checked })} />
                <span>{t["me.soucasne"]}</span>
              </label>
              {s.r.length > 1 ? (
                <Button variant="quiet" onClick={() => set({ r: s.r.filter((_, j) => j !== i) })}>
                  {t["sp.odebrat"]}
                </Button>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="cx-btns">
          <Button variant="secondary" onClick={() => set({ r: [...s.r, { n: "", w: "", r: "1", sou: true }] })}>
            {t["sp.pridat"]}
          </Button>
        </div>
        <Predpoklady t={t}>
          <Cislo label={t["pred.um"]} unit="%" value={s.um} onChange={(um) => set({ um })} min={50} max={100} chyba={t["spol.rozsah"]!} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["me.naprazdno"]!} unit="W" value={s.nap} onChange={(nap) => set({ nap })} od={0} do={50} krok={1} min={0} max={200} hint={t["me.naprazdnoHint"]} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["me.hodin"]!} unit="h" value={s.hod} onChange={(hod) => set({ hod })} od={0} do={24} krok={0.5} min={0} max={24} />
        </Predpoklady>
      </section>
      {v.stav === "ok" ? (
        <ResultCard
          title={t["me.vysledek"]}
          primary={{ label: t["me.trvaly"], value: fmt(v.trvalyVykonW, 0), unit: "W", note: t["me.trvalyNote"] }}
          secondary={[
            { label: t["me.spicka"], value: fmt(v.spickaW, 0), unit: "W", note: t["me.spickaNote"] },
            { label: t["me.proud"], value: fmt(v.proudZBaterie, 1), unit: "A", note: fill(t["me.proudNote"], { wh: fmt(v.WhNaprazdno, 0) }) },
          ]}
        >
          <BarList
            caption={t["me.pomer"]}
            rows={[
              { label: t["me.trvaly"], icon: <IconInverter className="cx-icon" />, value: `${fmt(v.trvalyVykonW, 0)}${NBSP}W`, share: v.trvalyVykonW / Math.max(v.trvalyVykonW, v.spickaW, 1), tone: "copper" },
              { label: t["me.spicka"], value: `${fmt(v.spickaW, 0)}${NBSP}W`, share: v.spickaW / Math.max(v.trvalyVykonW, v.spickaW, 1), tone: "muted" },
            ]}
          />
          <div className="cx-notices">
            {v.nadMezKabelu ? (
              <Hlaska kind="block" word={t["spol.stop"]!}>{fill(t["me.NAD_200A"], { u: String(napeti) })}</Hlaska>
            ) : v.hlasky.includes("NAD_150A") ? (
              <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["me.NAD_150A"]}</Hlaska>
            ) : null}
            {v.nadBms ? (
              <Hlaska kind="warn" word={t["spol.pozor"]!}>{fill(t["sp.NAD_BMS"], { a: fmt(v.proudZBaterie, 0), bms: fmt(cislo(s.bms), 0) })}</Hlaska>
            ) : null}
            <p>{fill(t["me.koupit"], { w: fmt(v.trvalyVykonW, 0), u: String(napeti) })}</p>
            <p className="cx-hint">
              {t["me.ODKAZ_PRUREZ"]} <a href={odkazPrurez}>{t["me.odkazText"]}</a>
            </p>
            <p className="cx-hint">{t["me.predpoklad"]}</p>
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
                title: t["me.h1"]!,
                inputs: s.r.map((r) => r.n || `${r.w} W`).join(" · "),
                primary: { label: t["me.trvaly"]!, value: fmt(v.trvalyVykonW, 0), unit: "W" },
                secondary: [
                  { label: t["me.spicka"]!, value: fmt(v.spickaW, 0), unit: "W" },
                  { label: t["me.proud"]!, value: fmt(v.proudZBaterie, 0), unit: "A" },
                ],
              }
            : null
        }
      />
    </div>
  );
}
