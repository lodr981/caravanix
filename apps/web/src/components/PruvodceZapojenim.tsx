// Průvodce zapojením (docs/KALKULACKY_ALFA.md, kapitola H): uživatel naklikne baterii, nabíjení a spotřebiče,
// engine (navrhZapojeni + navrhSchematu) sestaví schéma s průřezy a pojistkami. Komponenta nic nepočítá,
// jen sčítá metry a kusy z výsledků enginu do nákupního seznamu a skládá odkazy do kalkulaček.
import { useMemo } from "react";
import { navrhSchematu, navrhZapojeni, VYCHOZI_DELKA_SPOTREBICE, VYCHOZI_DELKY, type SpotrebicZapojeni } from "@caravanix/engine";
import { Button, ExamplePicker, IconArrowRight, IconBattery, IconBolt, IconFridge, IconInverter, IconSnow, IconSun, IconVan, Notice, SegmentedControl } from "@caravanix/ui";
import { ZiveSchema } from "./ZiveSchema.tsx";
import { CisloPosuvnik, NBSP, Prevzato, Sdileni, cislo, fill, fmt, useStavVUrl, type Texts } from "./kalk/spolecne.tsx";
import "./PruvodceZapojenim.css";

/** Nabídka spotřebičů 12 V. Příkony z katalogu spotřebičů (K-SPOTR), zásuvka a světla jako v projektu R1. */
const NABIDKA: (SpotrebicZapojeni & { katalog: string })[] = [
  { id: "lednice", typ: "lednice", nazev: "", prikonW: 45, ubytekProc: 3, rezimy: ["den", "noc", "jizda", "kemp"], katalog: "lednice-kompresor" },
  { id: "svetla", typ: "svetla", nazev: "", prikonW: 10.2, ubytekProc: 10, rezimy: ["noc", "kemp"], katalog: "6 × led-bodovka" },
  { id: "cerpadlo", typ: "cerpadlo", nazev: "", prikonW: 41, ubytekProc: 5, rezimy: ["den", "noc", "kemp"], katalog: "cerpadlo" },
  { id: "zasuvka", typ: "zasuvka", nazev: "", prikonW: 60, ubytekProc: 5, rezimy: ["den", "noc", "jizda", "kemp"], katalog: "R1" },
  { id: "topeni", typ: "topeni", nazev: "", prikonW: 80, ubytekProc: 5, rezimy: ["den", "noc", "kemp"], katalog: "topeni-nafta-start" },
  { id: "ventilator", typ: "ventilator", nazev: "", prikonW: 12, ubytekProc: 5, rezimy: ["den", "noc", "kemp"], katalog: "ventilator-strecha" },
  { id: "televize", typ: "televize", nazev: "", prikonW: 15, ubytekProc: 5, rezimy: ["noc", "kemp"], katalog: "televize-12v" },
  { id: "internet", typ: "internet", nazev: "", prikonW: 35, ubytekProc: 3, rezimy: ["den", "noc", "kemp"], katalog: "satelitni-internet" },
  { id: "vyhrivani", typ: "vyhrivani", nazev: "", prikonW: 38, ubytekProc: 5, rezimy: ["noc", "kemp"], katalog: "vyhrivani-nadrze" },
];

const VYCHOZI = {
  u: 12 as number,
  ah: "100",
  sol: true,
  wp: "200",
  boo: true,
  ba: "30",
  nab: false,
  na: "15",
  men: false,
  mw: "1000",
  sp: ["lednice", "svetla", "cerpadlo", "zasuvka"] as string[],
  d: {} as Record<string, string>,
};
type Stav = typeof VYCHOZI;

/** Vzorové sestavy na start (stejné hodnoty jako v příkladech kalkulaček). */
const SESTAVY: { id: string; ikona: typeof IconSun; stav: Partial<Stav> }[] = [
  { id: "vikend", ikona: IconSun, stav: { u: 12, ah: "100", sol: true, wp: "200", boo: true, ba: "30", nab: false, men: false, sp: ["lednice", "svetla", "cerpadlo", "zasuvka"] } },
  { id: "cestovatel", ikona: IconVan, stav: { u: 12, ah: "200", sol: true, wp: "400", boo: true, ba: "50", nab: true, na: "20", men: true, mw: "1000", sp: ["lednice", "svetla", "cerpadlo", "zasuvka", "ventilator", "internet"] } },
  { id: "zima", ikona: IconSnow, stav: { u: 12, ah: "300", sol: true, wp: "300", boo: true, ba: "50", nab: true, na: "30", men: true, mw: "2000", sp: ["lednice", "svetla", "cerpadlo", "zasuvka", "topeni", "vyhrivani"] } },
];

const cele = (n: number | undefined) => (n === undefined ? undefined : String(Math.round(n)));
const kod = (o: unknown) => encodeURIComponent(JSON.stringify(o));

export function PruvodceZapojenim({ t, ts }: { t: Texts; ts: Texts }) {
  // Bez odkazu se zadáním převezme výsledky předchozích kroků cesty (baterie, panely, měnič).
  const [s, set, prevzato] = useStavVUrl<Stav>(VYCHOZI, (c) => ({
    u: c.u,
    ah: cele(c.ah),
    ...(c.wp ? { sol: true, wp: cele(c.wp) } : {}),
    ...(c.mw ? { men: true, mw: cele(c.mw) } : {}),
  }));
  const napeti = s.u === 24 ? 24 : 12;
  const vybrane = NABIDKA.filter((x) => s.sp.includes(x.id)).map((x) => ({ ...x, nazev: fill(t[`sp.${x.id}`], { w: fmt(x.prikonW, x.prikonW % 1 ? 1 : 0) }) }));
  const delky: Record<string, number> = {};
  for (const [id, raw] of Object.entries(s.d ?? {})) {
    const n = cislo(raw);
    if (Number.isFinite(n)) delky[id] = n;
  }

  const vstup = {
    napeti: napeti as 12 | 24,
    baterieAh: cislo(s.ah),
    solarWp: s.sol ? cislo(s.wp) : 0,
    boosterA: s.boo ? cislo(s.ba) : 0,
    nabijeckaA: s.nab ? cislo(s.na) : 0,
    menicW: s.men ? cislo(s.mw) : 0,
    spotrebice: vybrane,
    delky,
  };
  const z = useMemo(() => {
    const nazvy: Record<string, string> = {
      panel: fill(t["k.panel"], { wp: fmt(vstup.solarWp, 0) }),
      startovaci: t["k.startovaci"] ?? "",
      booster: fill(t["k.booster"], { a: fmt(vstup.boosterA, 0) }),
      sit: t["k.sit"] ?? "",
      nabijecka: fill(t["k.nabijecka"], { a: fmt(vstup.nabijeckaA, 0) }),
      baterie: fill(t["k.baterie"], { ah: fmt(vstup.baterieAh, 0), u: String(napeti) }),
      rozvod: t["k.rozvod"] ?? "",
      menic: fill(t["k.menic"], { w: fmt(vstup.menicW, 0) }),
      projekt: t["k.projekt"] ?? "",
    };
    const v = navrhZapojeni({ ...vstup, nazvy });
    if (v.stav !== "ok") return v;
    // Název regulátoru až z výsledku enginu (velikost z řady).
    const komponenty = v.projekt.komponenty.map((c) => (c.id === "regulator" ? { ...c, nazev: fill(t["k.regulator"], { a: fmt(v.regulatorA ?? 0, 0) }) } : c));
    return { ...v, projekt: { ...v.projekt, komponenty } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(vstup), t]);
  const kabely = useMemo(() => (z.stav === "ok" ? navrhSchematu(z.projekt) : []), [z]);

  const nazev = (id: string) => (z.stav === "ok" ? (z.projekt.komponenty.find((c) => c.id === id)?.nazev ?? id) : id);
  const vychoziDelka = (id: string) => VYCHOZI_DELKY[id] ?? VYCHOZI_DELKA_SPOTREBICE;
  const nastavDelku = (id: string, raw: string) => set({ d: { ...s.d, [id]: raw } });
  const prepni = (id: string) => {
    const sp = s.sp.includes(id) ? s.sp.filter((x) => x !== id) : [...s.sp, id];
    set({ sp: NABIDKA.map((x) => x.id).filter((x) => sp.includes(x)) });
  };

  // Nákupní seznam: metry kabelu podle průřezu (plus i mínus) a pojistky podle hodnoty – jen součty výsledků enginu.
  const metry = new Map<number, number>();
  const pojistky = new Map<number, number>();
  let chyba = false;
  let pocetKabelu = 0;
  for (const k of kabely) {
    if (k.vysledek === null) continue;
    if (k.vysledek.stav !== "ok") {
      chyba = true;
      continue;
    }
    const d = z.stav === "ok" ? (z.projekt.kabely.find((x) => x.id === k.id)?.delkaM ?? 0) : 0;
    metry.set(k.vysledek.prurez, (metry.get(k.vysledek.prurez) ?? 0) + 2 * d);
    pojistky.set(k.vysledek.pojistka, (pojistky.get(k.vysledek.pojistka) ?? 0) + 1);
    pocetKabelu++;
  }
  const serad = (m: Map<number, number>) => [...m.entries()].sort((a, b) => a[0] - b[0]);

  const prurezOdkaz = (id: string, vyrobce?: string) => {
    const k = kabely.find((x) => x.id === id);
    const p = z.stav === "ok" ? z.projekt.kabely.find((x) => x.id === id) : undefined;
    if (!k || !p || k.proudA === null || p.delkaM === undefined) return null;
    const q = new URLSearchParams({ u: String(napeti), r: "I", v: fmt(k.proudA, 1).replace(NBSP, ""), l: String(p.delkaM), d: String(p.ubytekProc ?? 3), z: "2", p: "n" });
    if (vyrobce) q.set("y", vyrobce);
    return `/cs/kalkulacka-prurezu/?${q.toString()}`;
  };
  // Kabely, u kterých výrobci obvykle chtějí silnější průřez než výpočet z příkonu (karty K-VYROBCE):
  // odkaz do kalkulačky průřezu s typickým modelem. Měnič: nejbližší vyšší model Victron podle výkonu.
  const menicModel = [
    { w: 500, id: "victron-phoenix-12-500" },
    { w: 800, id: "victron-phoenix-12-800" },
    { w: 1200, id: "victron-phoenix-12-1200" },
    { w: 1600, id: "victron-smart-12-1600" },
    { w: 2000, id: "victron-smart-12-2000" },
  ].find((m) => m.w >= vstup.menicW)?.id;
  const kontrolyVyrobce = [
    { kabel: "rozvod-lednice", vyrobce: "secop-bd35f-bd50f", text: t["vyr.lednice"] },
    { kabel: "rozvod-cerpadlo", vyrobce: "lilie", text: t["vyr.cerpadlo"] },
    { kabel: "baterie-menic", vyrobce: napeti === 12 ? menicModel : undefined, text: t["vyr.menic"] },
    { kabel: "booster-baterie", vyrobce: s.ba === "30" ? "victron-orion-12-12-30" : undefined, text: t["vyr.booster"] },
  ]
    .filter((x) => x.vyrobce && kabely.some((k) => k.id === x.kabel))
    .map((x) => ({ ...x, href: prurezOdkaz(x.kabel, x.vyrobce) }))
    .filter((x) => x.href !== null);

  const kalkOdkazy = [
    { href: `/cs/kalkulacka-spotrebicu/?s=${kod({ u: napeti, ah: s.ah, r: vybrane.map((x) => ({ n: x.nazev, w: String(x.prikonW).replace(".", ","), h: "", ac: false, sk: "elektronika" })) })}`, text: t["kalk.spotrebice"], ikona: IconFridge },
    { href: `/cs/kalkulacka-baterie/?s=${kod({ u: napeti, ah: s.ah })}`, text: t["kalk.baterie"], ikona: IconBattery },
    ...(s.sol ? [{ href: `/cs/kalkulacka-sobestacnosti/?s=${kod({ u: napeti, ah: s.ah, wp: s.wp })}`, text: t["kalk.sobestacnost"], ikona: IconSun }] : []),
    ...(s.boo ? [{ href: `/cs/kalkulacka-boosteru/?s=${kod({ u: napeti, a: s.ba, ah: s.ah, zn: true })}`, text: t["kalk.booster"], ikona: IconBolt }] : []),
    ...(s.men ? [{ href: `/cs/kalkulacka-menice/?s=${kod({ u: napeti, r: [{ n: t["kalk.menicRadek"], w: s.mw, r: "1", sou: true }] })}`, text: t["kalk.menic"], ikona: IconInverter }] : []),
  ];

  const aktivniSestava = SESTAVY.find((x) => Object.entries(x.stav).every(([k, v]) => JSON.stringify(s[k as keyof Stav]) === JSON.stringify(v)))?.id ?? null;

  return (
    <div className="zap">
      <Prevzato t={t} ukaz={prevzato} />
      <ExamplePicker
        title={t["sestavy.h"]}
        hint={t["sestavy.hint"]}
        items={SESTAVY.map((x) => ({ id: x.id, label: t[`sestavy.${x.id}`] ?? x.id, description: t[`sestavy.${x.id}Popis`], icon: <x.ikona className="cx-icon" /> }))}
        activeId={aktivniSestava}
        onSelect={(id) => {
          const x = SESTAVY.find((y) => y.id === id);
          if (x) set({ ...VYCHOZI, ...x.stav, d: {} });
        }}
      />

      <div className="zap-kroky">
        <section className="zap-krok" aria-labelledby="zap-k1">
          <h2 id="zap-k1">
            <span className="zap-cislo">1</span> {t["k1.h"]}
          </h2>
          <SegmentedControl
            legend={t["napeti"]}
            value={String(napeti) as "12" | "24"}
            onChange={(x) => set({ u: Number(x) })}
            options={[
              { value: "12", label: `12${NBSP}V`, sub: t["napeti12"] },
              { value: "24", label: `24${NBSP}V`, sub: t["napeti24"] },
            ]}
          />
          <CisloPosuvnik t={t} chyba={t["rozsah"]!} label={t["baterie"]!} unit="Ah" value={s.ah} onChange={(ah) => set({ ah })} od={50} do={400} krok={10} min={10} max={2000} hint={t["baterieHint"]} />
        </section>

        <section className="zap-krok" aria-labelledby="zap-k2">
          <h2 id="zap-k2">
            <span className="zap-cislo">2</span> {t["k2.h"]}
          </h2>
          <p className="cx-hint">{t["k2.hint"]}</p>
          <label className="kalk-check">
            <input type="checkbox" checked={s.sol} onChange={(e) => set({ sol: e.target.checked })} />
            <span>{t["solar"]}</span>
          </label>
          {s.sol ? <CisloPosuvnik t={t} chyba={t["rozsah"]!} label={t["solarWp"]!} unit="Wp" value={s.wp} onChange={(wp) => set({ wp })} od={50} do={800} krok={50} min={10} max={3000} /> : null}
          <label className="kalk-check">
            <input type="checkbox" checked={s.boo} onChange={(e) => set({ boo: e.target.checked })} />
            <span>{t["booster"]}</span>
          </label>
          {s.boo ? <CisloPosuvnik t={t} chyba={t["rozsah"]!} label={t["boosterA"]!} unit="A" value={s.ba} onChange={(ba) => set({ ba })} od={10} do={60} krok={5} min={5} max={100} hint={t["boosterHint"]} /> : null}
          <label className="kalk-check">
            <input type="checkbox" checked={s.nab} onChange={(e) => set({ nab: e.target.checked })} />
            <span>{t["nabijecka"]}</span>
          </label>
          {s.nab ? <CisloPosuvnik t={t} chyba={t["rozsah"]!} label={t["nabijeckaA"]!} unit="A" value={s.na} onChange={(na) => set({ na })} od={5} do={60} krok={5} min={2} max={100} /> : null}
        </section>

        <section className="zap-krok" aria-labelledby="zap-k3">
          <h2 id="zap-k3">
            <span className="zap-cislo">3</span> {t["k3.h"]}
          </h2>
          <fieldset className="zap-spotrebice">
            <legend className="cx-label">{t["spotrebice"]}</legend>
            {NABIDKA.map((x) => {
              const plno = !s.sp.includes(x.id) && s.sp.length >= 8;
              return (
                <label key={x.id} className="kalk-check">
                  <input type="checkbox" checked={s.sp.includes(x.id)} disabled={plno} onChange={() => prepni(x.id)} />
                  <span>{fill(t[`sp.${x.id}`], { w: fmt(x.prikonW, x.prikonW % 1 ? 1 : 0) })}</span>
                </label>
              );
            })}
            <p className="cx-hint">{t["spotrebiceHint"]}</p>
          </fieldset>
          <label className="kalk-check">
            <input type="checkbox" checked={s.men} onChange={(e) => set({ men: e.target.checked })} />
            <span>{t["menic"]}</span>
          </label>
          {s.men ? <CisloPosuvnik t={t} chyba={t["rozsah"]!} label={t["menicW"]!} unit="W" value={s.mw} onChange={(mw) => set({ mw })} od={300} do={3000} krok={100} min={50} max={5000} hint={t["menicHint"]} /> : null}
        </section>
      </div>

      {z.stav === "ok" ? (
        <>
          <section className="zap-vysledek" aria-labelledby="zap-k4">
            <h2 id="zap-k4">
              <span className="zap-cislo">4</span> {t["k4.h"]}
            </h2>
            <p className="cx-muted">{t["k4.lead"]}</p>
            <ZiveSchema key={z.projekt.kabely.map((k) => k.id).join()} t={ts} projekt={z.projekt} vychozi={null} />
            {z.hlasky.includes("REGULATOR_NAD_100A") ? (
              <Notice kind="warn" word={t["pozor"]}>
                <p>{t["REGULATOR_NAD_100A"]}</p>
              </Notice>
            ) : null}
            {z.hlasky.includes("MENIC_NAD_150A") ? (
              <Notice kind="warn" word={t["pozor"]}>
                <p>{t["MENIC_NAD_150A"]}</p>
              </Notice>
            ) : null}
            {chyba ? (
              <Notice kind="block" word={t["blok"]}>
                <p>{t["CHYBA_KABELU"]}</p>
              </Notice>
            ) : null}
          </section>

          <section className="zap-tabulka" aria-labelledby="zap-kabely">
            <h2 id="zap-kabely">{t["kabely.h"]}</h2>
            <p className="cx-hint">{t["kabely.hint"]}</p>
            <div className="zap-tabulka__ram" role="region" aria-labelledby="zap-kabely" tabIndex={0}>
              <table className="zap-tab">
                <thead>
                  <tr>
                    <th scope="col">{t["kabely.trasa"]}</th>
                    <th scope="col">{t["kabely.proud"]}</th>
                    <th scope="col">{t["kabely.delka"]}</th>
                    <th scope="col">{t["kabely.prurez"]}</th>
                    <th scope="col">{t["kabely.pojistka"]}</th>
                  </tr>
                </thead>
                <tbody>
                  {kabely.map((k) => {
                    const ok = k.vysledek?.stav === "ok" ? k.vysledek : null;
                    const odkaz = prurezOdkaz(k.id);
                    return (
                      <tr key={k.id}>
                        <th scope="row">
                          {nazev(k.od)} → {nazev(k.do)}
                        </th>
                        <td className="cx-num" data-label={t["kabely.proud"]}>{k.proudA === null ? "–" : `${fmt(k.proudA, 1)}${NBSP}A`}</td>
                        <td data-label={t["kabely.delka"]}>
                          {k.vysledek === null ? (
                            "–"
                          ) : (
                            <span className="zap-delka">
                              <input
                                type="text"
                                inputMode="decimal"
                                aria-label={fill(t["kabely.delkaAria"], { od: nazev(k.od), do: nazev(k.do) })}
                                value={s.d[k.id] ?? fmt(vychoziDelka(k.id), 1)}
                                onChange={(e) => nastavDelku(k.id, e.target.value)}
                              />
                              <span aria-hidden="true">m</span>
                            </span>
                          )}
                        </td>
                        <td className="cx-num" data-label={t["kabely.prurez"]}>
                          {k.vysledek === null ? (
                            <span className="cx-muted">{t[k.druh === "ac" ? "kabely.ac" : "kabely.solar"]}</span>
                          ) : ok ? (
                            odkaz ? (
                              <a href={odkaz} title={t["kabely.detail"]}>
                                {fmt(ok.prurez, 2)}
                                {NBSP}mm²
                              </a>
                            ) : (
                              `${fmt(ok.prurez, 2)}${NBSP}mm²`
                            )
                          ) : (
                            <strong>{t["kabely.chyba"]}</strong>
                          )}
                        </td>
                        <td className="cx-num" data-label={t["kabely.pojistka"]}>{ok ? `${fmt(ok.pojistka, 0)}${NBSP}A` : "–"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {kontrolyVyrobce.length > 0 ? (
            <section className="zap-vyrobce" aria-labelledby="zap-vyrobce-h">
              <h2 id="zap-vyrobce-h">{t["vyr.h"]}</h2>
              <p>{t["vyr.lead"]}</p>
              <ul className="zap-odkazy">
                {kontrolyVyrobce.map((x) => (
                  <li key={x.kabel}>
                    <a className="zap-odkaz" href={x.href!}>
                      <span>{x.text}</span>
                      <IconArrowRight className="cx-icon zap-odkaz__sipka" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="zap-seznam" aria-labelledby="zap-seznam-h">
            <h2 id="zap-seznam-h">{t["seznam.h"]}</h2>
            <div className="zap-seznam__sloupce">
              <div>
                <h3>{t["seznam.komponenty"]}</h3>
                <ul>
                  <li>{nazev("baterie")}</li>
                  {s.sol ? <li>{nazev("panel")}</li> : null}
                  {s.sol && z.regulatorA !== null ? <li>{nazev("regulator")}</li> : null}
                  {s.sol ? <li>{t["seznam.solarKabel"]}</li> : null}
                  {s.boo ? <li>{nazev("booster")}</li> : null}
                  {s.nab ? <li>{nazev("nabijecka")}</li> : null}
                  {s.men ? <li>{fill(t["seznam.menic"], { w: fmt(vstup.menicW, 0) })}</li> : null}
                  {vybrane.length ? <li>{fill(t["seznam.rozvod"], { n: String(vybrane.length) })}</li> : null}
                  <li>
                    <a href="/cs/lekce/pojistka-u-baterie/">{t["seznam.hlavniPojistka"]}</a>
                  </li>
                  <li>{t["seznam.hlavni"]}</li>
                </ul>
              </div>
              <div>
                <h3>{t["seznam.kabel"]}</h3>
                <ul>
                  {serad(metry).map(([p, m]) => (
                    <li key={p}>{fill(t["seznam.kabelRadek"], { prurez: fmt(p, 2), m: fmt(m, 1) })}</li>
                  ))}
                </ul>
                <p className="cx-hint">{t["seznam.rezerva"]}</p>
              </div>
              <div>
                <h3>{t["seznam.pojistky"]}</h3>
                <ul>
                  {serad(pojistky).map(([a, n]) => (
                    <li key={a}>{fill(t["seznam.pojistkaRadek"], { a: fmt(a, 0), n: String(n) })}</li>
                  ))}
                  <li>{fill(t["seznam.drzaky"], { n: String(pocetKabelu) })}</li>
                  <li>{fill(t["seznam.oka"], { n: String(4 * pocetKabelu) })}</li>
                </ul>
                <p className="cx-hint">{t["seznam.pojistkyHint"]}</p>
              </div>
            </div>
            <p className="cx-hint">{t["seznam.podklad"]}</p>
            <div className="cx-btns">
              <Button variant="secondary" onClick={() => window.print()}>
                {t["seznam.tisk"]}
              </Button>
            </div>
          </section>

          <section className="zap-slovnik" aria-labelledby="zap-slovnik-h">
            <h2 id="zap-slovnik-h">{t["slovnik.h"]}</h2>
            <dl>
              {["lifepo4", "bms", "wp", "mppt", "booster", "mm2", "pojistka", "classT"].map((k) => (
                <div key={k}>
                  <dt>{t[`slovnik.${k}`]}</dt>
                  <dd>{t[`slovnik.${k}Text`]}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="zap-dal" aria-labelledby="zap-dal-h">
            <h2 id="zap-dal-h">{t["dal.h"]}</h2>
            <p className="cx-muted">{t["dal.lead"]}</p>
            <ul className="zap-odkazy">
              {kalkOdkazy.map((o) => (
                <li key={o.href}>
                  <a className="zap-odkaz" href={o.href}>
                    <o.ikona className="cx-icon" />
                    <span>{o.text}</span>
                    <IconArrowRight className="cx-icon zap-odkaz__sipka" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <Sdileni t={t} />
        </>
      ) : (
        <Notice kind="block" word={t["blok"]}>
          <p>{fill(t["chybaVstupu"], { pole: t[`pole.${z.pole.split(/[.[]/)[0]}`] ?? z.pole })}</p>
        </Notice>
      )}
    </div>
  );
}
