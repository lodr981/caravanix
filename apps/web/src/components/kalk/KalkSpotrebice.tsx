// Kalkulačka spotřebičů a vaření (oddíly A, B a J v docs/KALKULACKY_ALFA.md). Počítá engine.
// J: sezóny, střída, použití × minuty, trvalé odběry, žrouti a proklik zpět do baterie / soběstačnosti.
import { bilanceSpotrebicu, kolikUvarim, ohrevVody, SEZONY, type PolozkaSpotrebice, type Sezona, type Soustava } from "@caravanix/engine";
import { spotrebice as katalog } from "@caravanix/data";
import { useEffect, useState, type ReactNode } from "react";
import { BarList, Button, IconBulb, IconDrop, IconFlame, IconFridge, IconPlug, IconPot, IconSnow, Notice, ResultCard, SegmentedControl } from "@caravanix/ui";
import {
  ADRESA_NAVRATU,
  ChybaVstupu,
  Cislo,
  CisloPosuvnik,
  Hlaska,
  Priklady,
  NBSP,
  Predpoklady,
  Sdileni,
  adresaNavratu,
  cislo,
  ctiNavrat,
  fill,
  fmt,
  jeNavrat,
  useStavVUrl,
  useUlozDoCesty,
  Prevzato,
  type Navrat,
  type Texts,
} from "./spolecne.tsx";

interface Radek {
  n: string; // název (jen pro uživatele)
  w: string; // příkon W
  h: string; // hodin denně (stejně ve všech sezónách)
  ac: boolean; // na 230 V
  sk: string; // skupina z katalogu (jen pro ikonu), u vlastního spotřebiče prázdná
  f: string; // forma zadání: "h" hodiny za den, "p" použití × minuty (prázdné = "h")
  st: string; // střída [%], prázdné = 100 %
  ss: boolean; // hodiny se liší podle sezóny
  hl: string; // hodin v létě
  hj: string; // hodin na jaře a na podzim
  hz: string; // hodin v zimě
  po: string; // použití za den
  mi: string; // minut na jedno použití
}
interface Trvaly {
  n: string;
  w: string;
}

/** Klíč sezóny ve stavu (krátký kvůli adrese) → sezóna enginu. */
const SEZONA: Record<string, Sezona> = { l: "leto", j: "jaroPodzim", z: "zima" };
const KLIC_SEZONY: Record<Sezona, "hl" | "hj" | "hz"> = { leto: "hl", jaroPodzim: "hj", zima: "hz" };

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

/** Nový řádek: hodiny ve všech sezónách stejné (předvyplněné jednou hodnotou). */
const novyRadek = (z: Partial<Radek>): Radek => {
  const h = z.h ?? "";
  return { n: "", w: "", h, ac: false, sk: "", f: "h", st: "100", ss: false, hl: h, hj: h, hz: h, po: "", mi: "", ...z };
};

const VYCHOZI = {
  u: 12 as number,
  se: "l",
  r: [
    novyRadek({ n: "Lednice", w: "45", h: "8", sk: "chlazeni" }),
    novyRadek({ n: "Světla", w: "20", h: "4", sk: "elektronika" }),
    novyRadek({ n: "Notebook", w: "60", h: "3", ac: true, sk: "elektronika" }),
  ] as Radek[],
  tr: [] as Trvaly[],
  ah: "200",
  pw: "1000",
  min: "20",
  litry: "1",
  jd: "0",
  bms: "100",
  um: "90",
  uv: "85",
  vy: "90",
};
type Stav = typeof VYCHOZI;

// Seznam spotřebičů si prohlížeč pamatuje po dobu relace, aby se po návratu z baterie nemusel psát znovu.
const KLIC_SEZNAMU = "caravanix.spotrebice";
function ctiSeznam(): Partial<Stav> {
  try {
    const v = JSON.parse(sessionStorage.getItem(KLIC_SEZNAMU) ?? "{}") as Partial<Stav>;
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

/** Položka pro engine z řádku formuláře (prázdná pole → NaN, engine vrátí NEPLATNY_VSTUP). */
function polozka(r: Radek, sezona: Sezona): PolozkaSpotrebice {
  const zaklad = { prikonW: cislo(r.w), na230V: r.ac };
  if (r.f === "p") return { ...zaklad, pouzitiDenne: cislo(r.po), minutNaPouziti: cislo(r.mi) };
  const st = (r.st ?? "").trim() === "" ? undefined : cislo(r.st);
  if (!r.ss) return { ...zaklad, hodinDenne: cislo(r.h), stridaProc: st };
  return {
    ...zaklad,
    hodinDenne: cislo(r[KLIC_SEZONY[sezona]]),
    hodinSezona: { leto: cislo(r.hl), jaroPodzim: cislo(r.hj), zima: cislo(r.hz) },
    stridaProc: st,
  };
}

export function KalkSpotrebice({ t }: { t: Texts }) {
  const [obnoveno, setObnoveno] = useState(false);
  const [s, set, prevzato, aktivni] = useStavVUrl(VYCHOZI, (c) => {
    const ulozeny = ctiSeznam();
    if (Array.isArray(ulozeny.r) && ulozeny.r.length) setObnoveno(true);
    return { ...ulozeny, u: c.u ?? ulozeny.u };
  });
  // Odkud uživatel přišel (?zpet=baterie / sobestacnost): čte se až v prohlížeči.
  const [zpet, setZpet] = useState<Navrat | null>(null);
  useEffect(() => {
    const z = new URLSearchParams(location.search).get("zpet");
    if (jeNavrat(z)) setZpet(z);
  }, []);
  useEffect(() => {
    if (!aktivni) return;
    try {
      sessionStorage.setItem(KLIC_SEZNAMU, JSON.stringify({ u: s.u, se: s.se, r: s.r, tr: s.tr }));
    } catch {
      // úložiště nedostupné
    }
  }, [aktivni, s.u, s.se, s.r, s.tr]);

  const napeti = (s.u === 24 ? 24 : 12) as Soustava;
  const sezona = SEZONA[s.se] ?? "leto";
  // Řádky ze starších odkazů a z příkladů nemusí mít nová pole: doplní se výchozí (hodiny za den, 100 %).
  const radky = s.r.map((r) => novyRadek({ ...r, f: r.f === "p" ? "p" : "h", st: r.st ?? "100", ss: !!r.ss, hl: r.hl ?? r.h, hj: r.hj ?? r.h, hz: r.hz ?? r.h }));
  const trvale = Array.isArray(s.tr) ? s.tr : [];
  const prvniHodiny = radky.findIndex((r) => r.f !== "p"); // vysvětlení střídy jen u prvního řádku s hodinami
  const zmenRadek = (i: number, z: Partial<Radek>) => set({ r: radky.map((r, j) => (j === i ? { ...r, ...z } : r)) });
  const zmenTrvaly = (i: number, z: Partial<Trvaly>) => set({ tr: trvale.map((r, j) => (j === i ? { ...r, ...z } : r)) });

  const ucinnostMenice = cislo(s.um) / 100;
  const voda = ohrevVody({ litry: cislo(s.litry), ucinnostVareni: cislo(s.uv) / 100, ucinnostMenice });
  const uvarim = kolikUvarim({
    kapacitaAh: cislo(s.ah),
    napeti,
    prikonW: cislo(s.pw),
    minutNaJidlo: cislo(s.min),
    ucinnostMenice,
    ucinnostVareni: cislo(s.uv) / 100,
    vyuzitelnost: cislo(s.vy) / 100,
    jidelDenne: cislo(s.jd),
  });
  // Vaření se počítá do denní spotřeby (jedno místo pro indukci, revize 18. 11. 2026).
  const varim = uvarim.stav === "ok" && uvarim.WhVareniDenne > 0;
  const bil = bilanceSpotrebicu({
    napeti,
    ucinnostMenice,
    sezona,
    polozky: [...radky.map((r) => polozka(r, sezona)), ...trvale.map((r) => ({ prikonW: cislo(r.w), na230V: false, trvale: true }))],
    WhVareniDenne: uvarim.stav === "ok" ? uvarim.WhVareniDenne : 0,
    maxProudBmsA: cislo(s.bms),
  });
  const nazev = (i: number) =>
    i < radky.length
      ? radky[i]!.n.trim() || fill(t["sp.bezNazvu"], { n: String(i + 1) })
      : fill(t["sp.trvaleBar"], { n: trvale[i - radky.length]?.n.trim() || t["sp.trvaleBezNazvu"] || "" });
  // Spotřebiče, které z baterie nedávají smysl (topení, klimatizace, ohřev vody a chlazení na 230 V).
  const nevyplati = radky.filter((r) => r.ac && ["topeni", "klimatizace", "voda", "chlazeni"].includes(r.sk)).map((r) => r.n).filter(Boolean);
  const radky230 = radky.filter((r) => r.ac && cislo(r.w) > 0).map((r) => ({ n: r.n, w: r.w, r: "1", sou: true }));
  const whPrenos = bil.stav === "ok" ? String(Math.round(bil.WhDenneCelkem)) : "";
  const sezonaText = (z: Sezona) => t[`sp.sezona.${z}`] ?? z;

  useUlozDoCesty({ u: napeti, wh: bil.stav === "ok" ? bil.WhDenneCelkem : undefined, proudVse: bil.stav === "ok" ? bil.proudSoucasne : undefined }, aktivni);

  /** Odkaz s předanou spotřebou: adresa se složí až při kliknutí (uložený stav cílové kalkulačky je jen v prohlížeči). */
  const pouzit = (kam: Navrat, label: string, variant: "primary" | "secondary") => (
    <a
      className={`cx-btn cx-btn--${variant}`}
      href={`${ADRESA_NAVRATU[kam]}?${new URLSearchParams({ s: JSON.stringify({ wh: whPrenos, u: napeti }), z: "spotrebice" }).toString()}`}
      onClick={(e) => {
        e.preventDefault();
        location.href = adresaNavratu(kam, { wh: whPrenos, u: napeti });
      }}
    >
      <span>{label}</span>
    </a>
  );

  return (
    <div className="kalk">
      {zpet ? (
        <Notice kind="ok" word={t["sp.zpetSlovo"] ?? ""}>
          <p>{t[`sp.zpetLead.${zpet}`]}</p>
          <p className="cx-btns">
            <a
              className="cx-btn cx-btn--secondary"
              href={ADRESA_NAVRATU[zpet]}
              onClick={(e) => {
                const ulozeny = ctiNavrat(zpet);
                if (!ulozeny) return;
                e.preventDefault();
                location.href = `${ADRESA_NAVRATU[zpet]}?${new URLSearchParams({ s: JSON.stringify(ulozeny) }).toString()}`;
              }}
            >
              <span>{t[`sp.zpetBezZmeny.${zpet}`]}</span>
            </a>
          </p>
        </Notice>
      ) : null}
      <Prevzato t={t} ukaz={prevzato} text={obnoveno ? t["sp.obnoveno"] : undefined} />
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
        <SegmentedControl
          legend={t["sp.sezona"]}
          hint={t["sp.sezonaHint"]}
          value={(s.se in SEZONA ? s.se : "l") as "l" | "j" | "z"}
          onChange={(se) => set({ se })}
          options={[
            { value: "l", label: sezonaText("leto") },
            { value: "j", label: sezonaText("jaroPodzim") },
            { value: "z", label: sezonaText("zima") },
          ]}
        />
        <Cislo label={t["sp.bms"]} unit="A" value={s.bms} onChange={(bms) => set({ bms })} min={1} max={1000} chyba={t["spol.rozsah"]!} hint={t["sp.bmsHint"]} />
        <ol className="kalk-seznam">
          {radky.map((r, i) => (
            <li key={i} className="kalk-polozka kalk-polozka--spotrebic">
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
              <label className="kalk-check">
                <input type="checkbox" checked={r.ac} onChange={(e) => zmenRadek(i, { ac: e.target.checked })} />
                <span>{t["sp.na230"]}</span>
              </label>
              <div className="kalk-polozka__cas">
                <SegmentedControl
                  legend={t["sp.forma"]}
                  value={r.f as "h" | "p"}
                  onChange={(f) => zmenRadek(i, { f })}
                  options={[
                    { value: "h", label: t["sp.formaHodiny"]! },
                    { value: "p", label: t["sp.formaPouziti"]! },
                  ]}
                />
                {r.f === "p" ? (
                  <div className="kalk-polozka__pole">
                    <Cislo label={t["sp.pouziti"]} unit="×" value={r.po} onChange={(po) => zmenRadek(i, { po })} min={0} max={100} chyba={t["spol.rozsah"]!} />
                    <Cislo label={t["sp.minut"]} unit="min" value={r.mi} onChange={(mi) => zmenRadek(i, { mi })} min={0} max={1440} chyba={t["spol.rozsah"]!} hint={t["sp.pouzitiHint"]} />
                  </div>
                ) : (
                  <>
                    <div className="kalk-polozka__pole">
                      {r.ss ? (
                        SEZONY.map((z) => (
                          <Cislo
                            key={z}
                            label={fill(t["sp.hodinSezona"], { sezona: sezonaText(z) })}
                            unit="h"
                            value={r[KLIC_SEZONY[z]]}
                            onChange={(v) => zmenRadek(i, { [KLIC_SEZONY[z]]: v })}
                            min={0}
                            max={24}
                            chyba={t["spol.rozsah"]!}
                          />
                        ))
                      ) : (
                        <Cislo label={t["sp.hodin"]} unit="h" value={r.h} onChange={(h) => zmenRadek(i, { h })} min={0} max={24} chyba={t["spol.rozsah"]!} hint={r.h.trim() === "" ? t["sp.hodinPrazdne"] : undefined} />
                      )}
                      <Cislo label={t["sp.strida"]} unit="%" value={r.st} onChange={(st) => zmenRadek(i, { st })} min={0} max={100} chyba={t["spol.rozsah"]!} hint={i === prvniHodiny ? t["sp.stridaHint"] : undefined} />
                    </div>
                    <label className="kalk-check">
                      <input
                        type="checkbox"
                        checked={r.ss}
                        onChange={(e) => zmenRadek(i, e.target.checked ? { ss: true, hl: r.h, hj: r.h, hz: r.h } : { ss: false, h: r[KLIC_SEZONY[sezona]] })}
                      />
                      <span>{t["sp.podleSezony"]}</span>
                    </label>
                  </>
                )}
              </div>
              {radky.length > 1 ? (
                <Button variant="quiet" onClick={() => set({ r: radky.filter((_, j) => j !== i) })}>
                  {t["sp.odebrat"]}
                </Button>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="cx-btns">
          <Button variant="secondary" onClick={() => set({ r: [...radky, novyRadek({})] })}>
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
                // Vaření z katalogu nemá hodiny: zadává se počet použití × minuty (hodnoty doplní uživatel).
                set({
                  r: [
                    ...radky,
                    novyRadek({
                      n: k.nazev,
                      w: cislo(k.prikonW),
                      h: k.hodinDenne === null ? "" : cislo(k.hodinDenne),
                      ac: k.napajeni === "230V",
                      sk: k.skupina,
                      f: k.skupina === "vareni" && k.hodinDenne === null ? "p" : "h",
                    }),
                  ],
                });
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

        <h3 id="sp-tr">{t["sp.trvaleH"]}</h3>
        <p>{t["sp.trvaleLead"]}</p>
        {trvale.length ? (
          <ol className="kalk-seznam" aria-labelledby="sp-tr">
            {trvale.map((r, i) => (
              <li key={i} className="kalk-polozka kalk-polozka--trvaly">
                <div className="cx-field">
                  <label className="cx-label kalk-polozka__nazev" htmlFor={`sp-tn-${i}`}>
                    <span className="kalk-polozka__ikona">
                      <IconPlug className="cx-icon" />
                    </span>
                    {t["sp.trvaleNazev"]}
                  </label>
                  <div className="cx-input">
                    <input id={`sp-tn-${i}`} type="text" list="sp-trvale-navrhy" value={r.n} onChange={(e) => zmenTrvaly(i, { n: e.target.value })} />
                  </div>
                </div>
                <Cislo label={t["sp.trvalePrikon"]} unit="W" value={r.w} onChange={(w) => zmenTrvaly(i, { w })} min={0} max={10000} chyba={t["spol.rozsah"]!} hint={t["sp.trvalePrikonHint"]} />
                <Button variant="quiet" onClick={() => set({ tr: trvale.filter((_, j) => j !== i) })}>
                  {t["sp.odebrat"]}
                </Button>
              </li>
            ))}
          </ol>
        ) : null}
        <datalist id="sp-trvale-navrhy">
          {(t["sp.trvaleNavrhy"] ?? "").split("|").map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <div className="cx-btns">
          <Button variant="secondary" onClick={() => set({ tr: [...trvale, { n: "", w: "" }] })}>
            {t["sp.trvalePridat"]}
          </Button>
        </div>
        <p className="cx-hint">{fill(t["sp.predpoklad"], { um: s.um })}</p>

        {bil.stav === "ok" ? (
          <ResultCard
            title={t["sp.vysledek"]}
            primary={{
              label: fill(t["sp.denneSezona"], { sezona: sezonaText(sezona) }),
              value: fmt(bil.WhDenneCelkem, 0),
              unit: "Wh",
              note:
                (varim
                  ? fill(t["sp.ahSVarenim"], { ah: fmt(bil.AhDenneCelkem, 1), vareni: fmt(bil.WhVareni, 0) })
                  : fill(t["sp.ah"], { ah: fmt(bil.AhDenneCelkem, 1) })) + (bil.WhTrvale > 0 ? fill(t["sp.zToHoTrvale"], { wh: fmt(bil.WhTrvale, 0) }) : ""),
            }}
            secondary={[
              { label: t["sp.proud"], value: fmt(bil.proudSoucasne, 1), unit: "A", note: t["sp.proudNote"] },
              { label: t["sp.vykon230"], value: fmt(bil.vykon230V, 0), unit: "W", note: t["sp.vykon230Note"] },
            ]}
          >
            <dl className="kalk-wp kalk-sezony" aria-label={t["sp.sezonyPrehled"]}>
              {SEZONY.map((z) => (
                <div key={z} className={z === sezona ? "kalk-sezony--zvolena" : undefined} aria-current={z === sezona ? "true" : undefined}>
                  <dt>{sezonaText(z)}</dt>
                  <dd className="cx-num">
                    {fmt(bil.sezony[z].WhDenneCelkem, 0)}
                    {NBSP}Wh
                  </dd>
                </div>
              ))}
            </dl>
            <p className="cx-hint">{t["sp.sezonyNote"]}</p>
            <BarList
              caption={t["sp.zrouti"]}
              rows={bil.poradi.map((i) => {
                const p = bil.polozky[i]!;
                return {
                  label: nazev(i),
                  icon: i < radky.length ? ikonaSkupiny(radky[i]?.sk ?? "") : <IconPlug className="cx-icon" />,
                  value: `${fmt(p.WhZBaterie, 0)}${NBSP}Wh`,
                  share: p.WhZBaterie / Math.max(1, bil.polozky[bil.poradi[0]!]!.WhZBaterie),
                  tone: "copper" as const,
                };
              })}
            />
            <div className="cx-notices">
              {bil.hlasky.includes("NAD_150A") ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {t["sp.NAD_150A"]} <a href="/cs/kalkulacka-prurezu/">{t["spol.naPrurez"]}</a>
                </Hlaska>
              ) : null}
              {bil.nadBms ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {fill(t["sp.NAD_BMS"], { a: fmt(bil.proudSoucasne, 0), bms: fmt(cislo(s.bms), 0) })}
                </Hlaska>
              ) : null}
              {nevyplati.length > 0 ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {fill(t["sp.NEVYPLATI"], { co: nevyplati.join(", ") })}
                </Hlaska>
              ) : null}
              {bil.hlasky.includes("BEZ_MENICE") && !varim ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["sp.BEZ_MENICE"]}</Hlaska> : null}
              {radky230.length > 0 ? (
                <p className="cx-hint">
                  <a href={`/cs/kalkulacka-menice/?s=${encodeURIComponent(JSON.stringify({ u: napeti, r: radky230 }))}`}>{t["sp.naMenic"]}</a>
                </p>
              ) : null}
            </div>
            {bil.WhDenneCelkem >= 1 ? (
              <div className="kalk-proklik">
                <p className="cx-hint">{fill(t["sp.pouzitLead"], { wh: fmt(Math.round(bil.WhDenneCelkem), 0), sezona: sezonaText(sezona) })}</p>
                <div className="cx-btns">
                  {zpet ? (
                    pouzit(zpet, t[`sp.pouzit.${zpet}`]!, "primary")
                  ) : (
                    <>
                      {pouzit("baterie", t["sp.pouzit.baterie"]!, "secondary")}
                      {pouzit("sobestacnost", t["sp.pouzit.sobestacnost"]!, "secondary")}
                    </>
                  )}
                </div>
              </div>
            ) : null}
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
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.jidelDenne"]!} unit={t["va.jidelJednotka"]!} value={s.jd} onChange={(jd) => set({ jd })} od={0} do={6} krok={1} min={0} max={20} hint={t["va.jidelDenneHint"]} />
          <CisloPosuvnik t={t} chyba={t["spol.rozsah"]!} label={t["va.litry"]!} unit="l" value={s.litry} onChange={(litry) => set({ litry })} od={0.5} do={10} krok={0.5} min={0.1} max={50} />
        </div>
        <p className="cx-hint">{fill(t["va.predpoklad"], { vy: s.vy, uv: s.uv, um: s.um })}</p>
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
              { label: t["va.vody"], value: fmt(uvarim.litruVodyZadane, 0), unit: "l", note: t["va.vodyNote"] },
              { label: t["va.ohrev"], value: fmt(voda.WhZBaterie, 0), unit: "Wh", note: fill(t["va.ohrevNote"], { litry: fmt(cislo(s.litry), 1), teplo: fmt(voda.WhTeplo, 0) }) },
            ]}
          >
            <div className="cx-notices">
              <p className="cx-hint">{fill(t["va.hodin"], { h: fmt(uvarim.hodinChodu, 1), wh: fmt(uvarim.WhVyuzitelne, 0) })}</p>
              {uvarim.hlasky.includes("PROUD_VELKY") ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["va.PROUD_VELKY"]}</Hlaska> : null}
              {!uvarim.hlasky.includes("PROUD_VELKY") && uvarim.proudVareni > cislo(s.bms) ? (
                <Hlaska kind="warn" word={t["spol.pozor"]!}>
                  {fill(t["sp.NAD_BMS"], { a: fmt(uvarim.proudVareni, 0), bms: fmt(cislo(s.bms), 0) })}
                </Hlaska>
              ) : null}
            </div>
          </ResultCard>
        ) : (
          <ChybaVstupu t={t} pole={uvarim.stav === "chyba" ? uvarim.pole : voda.stav === "chyba" ? voda.pole : ""} />
        )}
      </section>
      <Sdileni
        t={t}
        karta={
          bil.stav === "ok"
            ? {
                title: t["sp.h1"]!,
                inputs: [sezonaText(sezona), ...radky.map((r) => r.n).filter(Boolean)].slice(0, 5).join(" · "),
                primary: { label: t["sp.denne"]!, value: fmt(bil.WhDenneCelkem, 0), unit: "Wh" },
                secondary: [
                  { label: "Ah", value: fmt(bil.AhDenneCelkem, 0), unit: "Ah" },
                  { label: t["sp.proud"]!, value: fmt(bil.proudSoucasne, 1), unit: "A" },
                ],
              }
            : null
        }
      />
    </div>
  );
}
