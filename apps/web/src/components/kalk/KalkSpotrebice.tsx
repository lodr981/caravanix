// Kalkulačka spotřebičů a vaření (oddíly A a B v docs/KALKULACKY_ALFA.md). Počítá engine.
import { bilanceSpotrebicu, kolikUvarim, ohrevVody, type Soustava } from "@caravanix/engine";
import { spotrebice as katalog } from "@caravanix/data";
import type { ReactNode } from "react";
import { BarList, Button, IconBulb, IconDrop, IconFlame, IconFridge, IconPlug, IconPot, IconSnow, ResultCard, SegmentedControl } from "@caravanix/ui";
import { ChybaVstupu, Cislo, CisloPosuvnik, Hlaska, Priklady, NBSP, Predpoklady, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./spolecne.tsx";

interface Radek {
  n: string; // název (jen pro uživatele)
  w: string; // příkon W
  h: string; // hodin denně
  ac: boolean; // na 230 V
  sk: string; // skupina z katalogu (jen pro ikonu), u vlastního spotřebiče prázdná
}

/** Ikona skupiny spotřebiče (vždy vedle názvu). */
const IKONA_SKUPINY: Record<string, (p: { className?: string }) => ReactNode> = {
  chlazeni: IconFridge,
  klimatizace: IconSnow,
  topeni: IconFlame,
  vareni: IconPot,
  voda: IconDrop,
  elektronika: IconBulb,
};
const ikonaSkupiny = (sk: string) => {
  const I = IKONA_SKUPINY[sk] ?? IconPlug;
  return <I className="cx-icon" />;
};

const VYCHOZI = {
  u: 12 as number,
  r: [
    { n: "Lednice", w: "45", h: "8", ac: false, sk: "chlazeni" },
    { n: "Světla", w: "20", h: "4", ac: false, sk: "elektronika" },
    { n: "Notebook", w: "60", h: "3", ac: true, sk: "elektronika" },
  ] as Radek[],
  ah: "200",
  pw: "1000",
  min: "20",
  litry: "1",
  um: "90",
  uv: "85",
  vy: "90",
};

export function KalkSpotrebice({ t }: { t: Texts }) {
  const [s, set] = useStavVUrl(VYCHOZI);
  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const zmenRadek = (i: number, z: Partial<Radek>) => set({ r: s.r.map((r, j) => (j === i ? { ...r, ...z } : r)) });

  const ucinnostMenice = cislo(s.um) / 100;
  const bil = bilanceSpotrebicu({
    napeti,
    ucinnostMenice,
    polozky: s.r.map((r) => ({ prikonW: cislo(r.w), hodinDenne: cislo(r.h), na230V: r.ac })),
  });
  const voda = ohrevVody({ litry: cislo(s.litry), ucinnostVareni: cislo(s.uv) / 100, ucinnostMenice });
  const uvarim = kolikUvarim({ kapacitaAh: cislo(s.ah), napeti, prikonW: cislo(s.pw), minutNaJidlo: cislo(s.min), ucinnostMenice, vyuzitelnost: cislo(s.vy) / 100 });

  return (
    <div className="kalk">
      <Priklady t={t} kalkulacka="spotrebice" vychozi={VYCHOZI} stav={s} nastav={set} />
      <section className="kalk-blok" aria-labelledby="sp-h">
        <h2 id="sp-h">{t["sp.h2"]}</h2>
        <SegmentedControl
          legend={t["spol.napeti"]}
          value={String(napeti) as "12" | "24"}
          onChange={(v) => set({ u: Number(v) })}
          options={[
            { value: "12", label: `12${NBSP}V` },
            { value: "24", label: `24${NBSP}V` },
          ]}
        />
        <ol className="kalk-seznam">
          {s.r.map((r, i) => (
            <li key={i} className="kalk-polozka">
              <div className="cx-field">
                <label className="cx-label kalk-polozka__nazev" htmlFor={`sp-n-${i}`}>
                  <span className="kalk-polozka__ikona">{ikonaSkupiny(r.sk)}</span>
                  {t["sp.nazev"]}
                </label>
                <div className="cx-input">
                  <input id={`sp-n-${i}`} type="text" value={r.n} onChange={(e) => zmenRadek(i, { n: e.target.value })} />
                </div>
              </div>
              <Cislo label={t["sp.prikon"]} unit="W" value={r.w} onChange={(w) => zmenRadek(i, { w })} min={0} max={10000} chyba={t["spol.rozsah"]!} />
              <Cislo label={t["sp.hodin"]} unit="h" value={r.h} onChange={(h) => zmenRadek(i, { h })} min={0} max={24} chyba={t["spol.rozsah"]!} hint={r.h.trim() === "" ? t["sp.hodinPrazdne"] : undefined} />
              <label className="kalk-check">
                <input type="checkbox" checked={r.ac} onChange={(e) => zmenRadek(i, { ac: e.target.checked })} />
                <span>{t["sp.na230"]}</span>
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
          <Button variant="secondary" onClick={() => set({ r: [...s.r, { n: "", w: "", h: "", ac: false, sk: "" }] })}>
            {t["sp.pridat"]}
          </Button>
        </div>
        <div className="cx-field">
          <label className="cx-label" htmlFor="sp-katalog">
            {t["sp.zKatalogu"]}
          </label>
          <div className="cx-input">
            <select
              id="sp-katalog"
              value=""
              onChange={(e) => {
                const k = katalog.polozky.find((x) => x.id === e.target.value);
                if (!k) return;
                const cislo = (x: number) => String(x).replace(".", ",");
                set({ r: [...s.r, { n: k.nazev, w: cislo(k.prikonW), h: k.hodinDenne === null ? "" : cislo(k.hodinDenne), ac: k.napajeni === "230V", sk: k.skupina }] });
              }}
            >
              <option value="">{t["sp.zKataloguVyber"]}</option>
              {katalog.polozky.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nazev} ({String(k.prikonW).replace(".", ",")} W)
                </option>
              ))}
            </select>
          </div>
          <p className="cx-hint">
            <a href="/cs/spotrebice/">{t["sp.katalogOdkaz"]}</a>
          </p>
        </div>
        <p className="cx-hint">{t["sp.predpoklad"]}</p>

        {bil.stav === "ok" ? (
          <ResultCard
            title={t["sp.vysledek"]}
            primary={{ label: t["sp.denne"], value: fmt(bil.WhDenne, 0), unit: "Wh", note: fill(t["sp.ah"], { ah: fmt(bil.AhDenne, 1) }) }}
            secondary={[
              { label: t["sp.proud"], value: fmt(bil.proudSoucasne, 1), unit: "A", note: t["sp.proudNote"] },
              { label: t["sp.vykon230"], value: fmt(bil.vykon230V, 0), unit: "W", note: t["sp.vykon230Note"] },
            ]}
          >
            <BarList
              caption={t["sp.rozpis"]}
              rows={bil.polozky.map((p, i) => ({
                label: s.r[i]?.n.trim() || fill(t["sp.bezNazvu"], { n: String(i + 1) }),
                icon: ikonaSkupiny(s.r[i]?.sk ?? ""),
                value: `${fmt(p.WhZBaterie, 0)}${NBSP}Wh`,
                share: p.WhZBaterie / Math.max(1, ...bil.polozky.map((x) => x.WhZBaterie)),
                tone: "copper" as const,
              }))}
            />
            <div className="cx-notices">
              {bil.hlasky.includes("NAD_150A") ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {t["sp.NAD_150A"]} <a href="/cs/kalkulacka-prurezu/">{t["spol.naPrurez"]}</a>
                </Hlaska>
              ) : null}
              {bil.hlasky.includes("BEZ_MENICE") ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["sp.BEZ_MENICE"]}</Hlaska> : null}
              <p className="cx-hint">
                <a href={`/cs/kalkulacka-baterie/?s=${encodeURIComponent(JSON.stringify({ wh: String(Math.round(bil.WhDenne)), u: napeti }))}`}>{t["sp.naBaterii"]}</a>
              </p>
            </div>
          </ResultCard>
        ) : (
          <ChybaVstupu t={t} pole={bil.pole} />
        )}
      </section>

      <section className="kalk-blok" aria-labelledby="va-h">
        <h2 id="va-h">{t["va.h2"]}</h2>
        <p>{t["va.lead"]}</p>
        <div className="kalk-mrizka kalk-mrizka--posuvniky">
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.kapacita"]!} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} od={50} do={600} krok={10} min={1} max={2000} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.prikon"]!} unit="W" value={s.pw} onChange={(pw) => set({ pw })} od={300} do={2500} krok={50} min={1} max={10000} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.minut"]!} unit="min" value={s.min} onChange={(min) => set({ min })} od={5} do={120} krok={5} min={1} max={600} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.litry"]!} unit="l" value={s.litry} onChange={(litry) => set({ litry })} od={0.5} do={10} krok={0.5} min={0.1} max={50} />
        </div>
        <p className="cx-hint">{t["va.predpoklad"]}</p>
        <Predpoklady t={t}>
          <Cislo label={t["pred.um"]} unit="%" value={s.um} onChange={(um) => set({ um })} min={50} max={100} chyba={t["spol.rozsah"]!} />
          <Cislo label={t["pred.uv"]} unit="%" value={s.uv} onChange={(uv) => set({ uv })} min={30} max={100} chyba={t["spol.rozsah"]!} />
          <Cislo label={t["pred.vy"]} unit="%" value={s.vy} onChange={(vy) => set({ vy })} min={50} max={100} chyba={t["spol.rozsah"]!} />
        </Predpoklady>
        {uvarim.stav === "ok" && voda.stav === "ok" ? (
          <ResultCard
            title={t["va.vysledek"]}
            primary={{ label: t["va.jidel"], value: fmt(uvarim.jidel, 0), unit: t["va.jidelJednotka"], note: fill(t["va.jidelNote"], { wh: fmt(uvarim.WhNaJidlo, 0) }) }}
            secondary={[
              { label: t["va.vody"], value: fmt(uvarim.litruVody, 0), unit: "l", note: t["va.vodyNote"] },
              { label: t["va.ohrev"], value: fmt(voda.WhZBaterie, 0), unit: "Wh", note: fill(t["va.ohrevNote"], { litry: fmt(cislo(s.litry), 1), teplo: fmt(voda.WhTeplo, 0) }) },
            ]}
          >
            <div className="cx-notices">
              <p className="cx-hint">{fill(t["va.hodin"], { h: fmt(uvarim.hodinChodu, 1), wh: fmt(uvarim.WhVyuzitelne, 0) })}</p>
              {uvarim.hlasky.includes("PROUD_VELKY") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["va.PROUD_VELKY"]}</Hlaska> : null}
            </div>
          </ResultCard>
        ) : (
          <ChybaVstupu t={t} pole={uvarim.stav === "chyba" ? uvarim.pole : voda.stav === "chyba" ? voda.pole : ""} />
        )}
      </section>
      <Sdileni t={t} />
    </div>
  );
}
