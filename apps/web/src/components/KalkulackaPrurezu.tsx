// Kalkulačka průřezu a pojistky (React ostrůvek). Počítá výhradně engine (@caravanix/engine, verze 1.1);
// tady je jen ovládání, formátování a stav v URL. Texty přicházejí z content/cs/kalkulacka-prurezu.json.
import { useEffect, useMemo, useState } from "react";
import {
  MM,
  mamKabel,
  navrhSVyrobcem,
  navrhVodice,
  type KodHlasky,
  type Napeti,
  type Prostredi,
  type Rezim,
  type UbytekProc,
  type VstupVodice,
  type Zpetny,
} from "@caravanix/engine";
import { RezKabelu, ZatizeniKabelu, dalsiStupen } from "./VizualizaceKabelu.tsx";
import { Priklady, Sdileni } from "./kalk/spolecne.tsx";
import { doporuceniVyrobcu } from "@caravanix/data";
import { Button, Notice, NumberField, ResultCard, SegmentedControl, Slider, formatDecimal, parseDecimal, type Status } from "@caravanix/ui";

type Texts = Record<string, string>;

const NBSP = " ";
const DELKA_MIN = 0.2;
const DELKA_MAX = 20;

/** Doplní {klíč} v textu. */
function fill(text: string | undefined, vars: Record<string, string>): string {
  return (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}

/** Číslo s desetinnou čárkou a nezlomitelnými mezerami (tisíce i před jednotkou řeší volající). */
const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP);

const DRUH: Record<KodHlasky, Status> = {
  ROZHODL_UBYTEK: "ok",
  ROZHODLO_OTEPLENI: "ok",
  MINUS_PRES_KOSTRU: "warn",
  NAD_150A_12V: "warn",
  NAD_150A_MENIC: "warn",
  MENIC_OD_1000W: "warn",
  NEPLATNY_VSTUP: "warn",
  HLAVNI_VEDENI: "block",
  ANI_120_NESTACI: "block",
};

interface Stav {
  /** spotrebic = jaký kabel potřebuji, kabel = co unese můj kabel („Mám kabel“). */
  ucel: "spotrebic" | "kabel";
  /** Průřez kabelu v režimu „Mám kabel“ [mm²]. */
  mamPrurez: number;
  /** Typický spotřebič s doporučením výrobce (id z doporuceni-vyrobcu.json), "" = žádný. */
  vyrobce: string;
  napeti: Napeti;
  rezim: Rezim;
  hodnota: string;
  delka: number;
  ubytekProc: UbytekProc;
  zpetny: Zpetny;
  prostredi: Prostredi;
}

/** Pořadí zobrazení hlášek (navrhuje designér): nejdřív blok, pak varování, nakonec vysvětlení „co rozhodlo“. */
const ZAVAZNOST: Record<Status, number> = { block: 0, warn: 1, ok: 2 };
const podleZavaznosti = (kody: readonly KodHlasky[]) => [...kody].sort((a, b) => ZAVAZNOST[DRUH[a]] - ZAVAZNOST[DRUH[b]]);

const VYCHOZI: Stav = { ucel: "spotrebic", mamPrurez: 2.5, vyrobce: "", napeti: 12, rezim: "P", hodnota: "60", delka: 5, ubytekProc: 3, zpetny: 2, prostredi: "n" };

// ---------- stav v URL (sdílení odkazem) ----------

function zUrl(search: string): Stav {
  const q = new URLSearchParams(search);
  const s = { ...VYCHOZI };
  const u = q.get("u");
  if (u === "12" || u === "24") s.napeti = Number(u) as Napeti;
  const r = q.get("r");
  if (r === "P" || r === "I") s.rezim = r;
  const v = q.get("v");
  if (v !== null && parseDecimal(v) !== null) s.hodnota = v;
  const l = q.get("l");
  const lp = l === null ? null : parseDecimal(l);
  if (lp !== null && lp >= DELKA_MIN && lp <= DELKA_MAX) s.delka = Math.round(lp * 10) / 10;
  const d = q.get("d");
  if (d === "3" || d === "5" || d === "10") s.ubytekProc = Number(d) as UbytekProc;
  const z = q.get("z");
  if (z === "1" || z === "2") s.zpetny = Number(z) as Zpetny;
  const p = q.get("p");
  if (p === "n" || p === "h") s.prostredi = p;
  if (q.get("k") === "1") s.ucel = "kabel";
  const y = q.get("y");
  if (y && doporuceniVyrobcu.polozky.some((x) => x.id === y)) s.vyrobce = y;
  const a = q.get("a");
  const ap = a === null ? null : parseDecimal(a);
  if (ap !== null && MM.includes(ap)) s.mamPrurez = ap;
  return s;
}

function doUrl(s: Stav): string {
  const q = new URLSearchParams({
    u: String(s.napeti),
    r: s.rezim,
    v: s.hodnota.trim(),
    l: String(s.delka),
    d: String(s.ubytekProc),
    z: String(s.zpetny),
    p: s.prostredi,
  });
  if (s.vyrobce) q.set("y", s.vyrobce);
  if (s.ucel === "kabel") {
    q.set("k", "1");
    q.set("a", String(s.mamPrurez));
  }
  return `?${q.toString()}`;
}

// ---------- komponenta ----------

export function KalkulackaPrurezu({ t }: { t: Texts }) {
  const [s, setS] = useState<Stav>(VYCHOZI);
  const [nacteno, setNacteno] = useState(false);
  const [delkaText, setDelkaText] = useState(formatDecimal(VYCHOZI.delka, 1));

  // Stav z adresy až v prohlížeči (stránka je předgenerovaná s výchozím stavem).
  useEffect(() => {
    const z = zUrl(location.search);
    setS(z);
    setDelkaText(formatDecimal(z.delka, 1));
    setNacteno(true);
  }, []);
  useEffect(() => {
    if (!nacteno) return;
    history.replaceState(null, "", doUrl(s) + location.hash);
  }, [s, nacteno]);

  const set = <K extends keyof Stav>(k: K, v: Stav[K]) => setS((p) => ({ ...p, [k]: v }));
  const nastavDelku = (v: number) => {
    const d = Math.min(DELKA_MAX, Math.max(DELKA_MIN, Math.round(v * 10) / 10));
    set("delka", d);
    setDelkaText(formatDecimal(d, 1));
  };
  const delkaZadana = parseDecimal(delkaText);
  const delkaChyba = delkaText.trim() !== "" && !(delkaZadana !== null && delkaZadana >= DELKA_MIN && delkaZadana <= DELKA_MAX);

  const hodnota = parseDecimal(s.hodnota);
  // Nesmyslné vstupy (text, nekonečno) se do enginu nepouštějí jako čísla; engine je pak odmítne jako neplatné.
  const vstup: VstupVodice = {
    napeti: s.napeti,
    rezim: s.rezim,
    hodnota: hodnota !== null && Number.isFinite(hodnota) ? hodnota : Number.NaN,
    delka: s.delka,
    ubytekProc: s.ubytekProc,
    zpetny: s.zpetny,
    prostredi: s.prostredi,
  };
  const vysledek = useMemo(
    () => navrhVodice(vstup),
    [vstup.napeti, vstup.rezim, vstup.hodnota, vstup.delka, vstup.ubytekProc, vstup.zpetny, vstup.prostredi],
  );

  const polozkaVyrobce = doporuceniVyrobcu.polozky.find((x) => x.id === s.vyrobce) ?? null;
  const sv = useMemo(() => (polozkaVyrobce ? navrhSVyrobcem(vstup, polozkaVyrobce) : null), [polozkaVyrobce, vysledek]);
  const svOk = sv && sv.prurez !== null ? sv : null;
  const prurezVysl = vysledek.stav === "ok" ? (svOk?.prurez ?? vysledek.prurez) : 0;
  const pojistkaVysl = vysledek.stav === "ok" ? (svOk?.pojistka ?? vysledek.pojistka) : 0;
  const mam = useMemo(
    () => mamKabel({ napeti: s.napeti, prurez: s.mamPrurez, delka: s.delka, ubytekProc: s.ubytekProc, zpetny: s.zpetny, prostredi: s.prostredi }),
    [s.napeti, s.mamPrurez, s.delka, s.ubytekProc, s.zpetny, s.prostredi],
  );
  const tSdileni = {
    ...t,
    "spol.kopirovat": t["share.copy"] ?? "",
    "spol.zkopirovano": t["share.copied"] ?? "",
    "spol.ok": t["result.status.ok"] ?? "",
    "spol.pozor": t["result.status.warn"] ?? "",
  };
  const vstupyText = `${s.napeti} V · ${fmt(s.delka, 1)} m · ${s.ubytekProc} %`;
  const karta =
    s.ucel === "kabel"
      ? mam.stav === "ok"
        ? {
            title: t["mam.title"] ?? "",
            inputs: `${fmt(s.mamPrurez, 2)} mm² · ${vstupyText}`,
            primary: { label: t["mam.prikon"] ?? "", value: fmt(mam.maxPrikonW, 0), unit: "W" },
            secondary: [
              { label: t["mam.proud"] ?? "", value: fmt(mam.maxProud, 1), unit: "A" },
              { label: t["mam.pojistka"] ?? "", value: fmt(mam.maxPojistka, 1), unit: "A" },
            ],
          }
        : null
      : vysledek.stav === "ok"
        ? {
            title: t["page.h1"] ?? "",
            inputs: `${hodnota !== null ? fmt(hodnota, 0) : "–"} ${s.rezim === "P" ? "W" : "A"} · ${vstupyText}`,
            primary: { label: t["result.prurez"] ?? "", value: fmt(prurezVysl, 2), unit: "mm²" },
            secondary: [
              { label: t["result.pojistka"] ?? "", value: fmt(pojistkaVysl, 1), unit: "A" },
              { label: t["result.ubytek"] ?? "", value: fmt(vysledek.ubytekV, 2), unit: "V" },
            ],
          }
        : null;
  const sdileniKarta = <Sdileni t={tSdileni} karta={karta} />;

  // Značka na posuvníku: od jaké délky engine vrátí silnější kabel (nebo už kabel nenajde).
  const hranice = useMemo(
    () => (vysledek.stav === "ok" ? dalsiStupen(vstup, vysledek.prurez, DELKA_MAX) : null),
    [vysledek, vstup.napeti, vstup.rezim, vstup.hodnota, vstup.delka, vstup.ubytekProc, vstup.zpetny, vstup.prostredi],
  );
  const hraniceText =
    vysledek.stav !== "ok"
      ? undefined
      : hranice === null
        ? t["hranice.konec"]
        : hranice.prurez === null
          ? fill(t["hranice.chyba"], { delka: fmt(hranice.delka, 1) })
          : fill(t["hranice.note"], { delka: fmt(hranice.delka, 1), prurez: fmt(hranice.prurez, 2) });

  const jednotkaHodnoty = s.rezim === "P" ? t["value.unitP"]! : t["value.unitI"]!;
  const meta = fill(t["result.meta"], {
    u: String(s.napeti),
    hodnota: hodnota !== null ? `${fmt(hodnota, 2)}${NBSP}${jednotkaHodnoty}` : "–",
    delka: fmt(s.delka, 1),
    d: String(s.ubytekProc),
  });

  const hlaska = (kod: KodHlasky, vars: Record<string, string> = {}) => (
    <Notice key={kod} kind={DRUH[kod]} word={t[`result.status.${DRUH[kod]}`]}>
      <p>{fill(t[`msg.${kod}`], vars)}</p>
    </Notice>
  );

  return (
    <div className="kp">
      <p className="kp-souhrn">
        <a href="#vysledek">
          <span>
            {s.ucel === "kabel"
              ? mam.stav === "ok"
                ? fill(t["souhrn.mam"], { w: fmt(mam.maxPrikonW, 0), a: fmt(mam.maxPojistka, 1) })
                : t["souhrn.chyba"]
              : vysledek.stav === "ok"
              ? fill(t["souhrn.ok"], { prurez: fmt(prurezVysl, 2), pojistka: fmt(pojistkaVysl, 1) })
              : t["souhrn.chyba"]}
          </span>
          <span className="kp-souhrn-odkaz">{t["souhrn.link"]}</span>
        </a>
      </p>
      <Priklady
        t={{ "spol.priklady": t["priklady.title"] ?? "", "spol.prikladyHint": t["priklady.hint"] ?? "" }}
        kalkulacka="prurez"
        vychozi={VYCHOZI}
        stav={s}
        nastav={(z) => {
          // Přes adresu a zpět: hodnoty z příkladu projdou stejnou kontrolou jako odkaz.
          const ok = zUrl(doUrl(z));
          setS(ok);
          setDelkaText(formatDecimal(ok.delka, 1));
        }}
      />
      <form className="kp-form" onSubmit={(e) => e.preventDefault()} aria-label={t["form.legend"]}>
        <SegmentedControl
          legend={t["ucel.legend"]}
          value={s.ucel}
          onChange={(v) => set("ucel", v)}
          options={[
            { value: "spotrebic", label: t["ucel.spotrebic"], sub: t["ucel.spotrebicSub"] },
            { value: "kabel", label: t["ucel.kabel"], sub: t["ucel.kabelSub"] },
          ]}
        />
        <SegmentedControl
          legend={t["u.legend"]}
          value={String(s.napeti) as "12" | "24"}
          onChange={(v) => set("napeti", Number(v) as Napeti)}
          options={[
            { value: "12", label: t["u.12"], sub: t["u.12sub"] },
            { value: "24", label: t["u.24"], sub: t["u.24sub"] },
          ]}
        />
        {s.ucel === "kabel" ? (
          <div className="cx-field">
            <label className="cx-label" htmlFor="kp-mam-prurez">
              {t["mam.vyber"]}
            </label>
            <div className="cx-input">
              <select id="kp-mam-prurez" value={String(s.mamPrurez)} onChange={(e) => set("mamPrurez", Number(e.target.value))}>
                {MM.map((m) => (
                  <option key={m} value={String(m)}>
                    {fmt(m, 2)} mm²
                  </option>
                ))}
              </select>
            </div>
            <p className="cx-hint">{t["mam.vyberHint"]}</p>
          </div>
        ) : null}
        {s.ucel === "spotrebic" ? (<>
        <SegmentedControl
          legend={t["mode.legend"]}
          value={s.rezim}
          onChange={(v) => {
            // Při přepnutí převede zadanou hodnotu, aby spotřebič zůstal stejný.
            const h = parseDecimal(s.hodnota);
            const nova = h !== null && h > 0 ? (v === "I" ? h / s.napeti : h * s.napeti) : null;
            setS((p) => ({ ...p, rezim: v, hodnota: nova !== null ? formatDecimal(nova, v === "I" ? 2 : 0).replace(/\s/g, "") : p.hodnota }));
          }}
          options={[
            { value: "P", label: t["mode.P"], sub: t["mode.Psub"] },
            { value: "I", label: t["mode.I"], sub: t["mode.Isub"] },
          ]}
        />
        <NumberField
          label={s.rezim === "P" ? t["value.labelP"] : t["value.labelI"]}
          unit={jednotkaHodnoty}
          unitLabel={s.rezim === "P" ? t["value.unitLabelP"] : t["value.unitLabelI"]}
          value={s.hodnota}
          onValueChange={(raw) => set("hodnota", raw)}
          hint={t["value.hint"]}
          error={s.hodnota.trim() !== "" && !(hodnota !== null && hodnota > 0) ? t["value.error"] : undefined}
        />
        <div className="cx-field">
          <label className="cx-label" htmlFor="kp-vyrobce">
            {t["vyr.label"]}
          </label>
          <div className="cx-input">
            <select id="kp-vyrobce" value={s.vyrobce} onChange={(e) => set("vyrobce", e.target.value)}>
              <option value="">{t["vyr.zadny"]}</option>
              {(["lednice", "cerpadlo", "menic", "topeni", "booster"] as const).map((sk) => (
                <optgroup key={sk} label={t[`vyr.skupina.${sk}`]}>
                  {doporuceniVyrobcu.polozky
                    .filter((x) => x.skupina === sk)
                    .map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.nazev}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
          <p className="cx-hint">{t["vyr.hint"]}</p>
        </div>
        </>) : null}
        {/* Posuvník a pole v metrech jsou jedna veličina: nápověda k měření patří až pod pole, aby obě ovládání stála u sebe (designér, 2. kolo). */}
        <div className="kp-delka">
        <Slider
          label={t["len.label"]}
          value={s.delka}
          onChange={nastavDelku}
          marks={hranice && s.ucel === "spotrebic" ? [{ value: hranice.delka, label: hraniceText }] : undefined}
          min={DELKA_MIN}
          max={DELKA_MAX}
          step={0.1}
          formatValue={(v) => `${fmt(v, 1)}${NBSP}${t["len.unit"]}`}
          decrement={{ text: t["len.dec"]!, label: t["len.decLabel"]! }}
          increment={{ text: t["len.inc"]!, label: t["len.incLabel"]! }}
          note={s.ucel === "spotrebic" ? hraniceText : undefined}
        />
        <NumberField
          label={t["len.fieldLabel"]}
          unit={t["len.unit"]}
          value={delkaText}
          onValueChange={(raw, parsed) => {
            setDelkaText(raw);
            if (parsed !== null && parsed >= DELKA_MIN && parsed <= DELKA_MAX) set("delka", Math.round(parsed * 10) / 10);
          }}
          hint={t["len.note"]}
          error={delkaChyba ? t["len.fieldError"] : undefined}
        />
        </div>
        <SegmentedControl
          legend={t["drop.legend"]}
          hint={t["drop.hint"]}
          value={String(s.ubytekProc) as "3" | "5" | "10"}
          onChange={(v) => set("ubytekProc", Number(v) as UbytekProc)}
          options={[
            { value: "3", label: t["drop.3"], sub: t["drop.3sub"] },
            { value: "5", label: t["drop.5"], sub: t["drop.5sub"] },
            { value: "10", label: t["drop.10"], sub: t["drop.10sub"] },
          ]}
        />
        <SegmentedControl
          legend={t["ret.legend"]}
          value={String(s.zpetny) as "1" | "2"}
          onChange={(v) => set("zpetny", Number(v) as Zpetny)}
          options={[
            { value: "2", label: t["ret.2"], sub: t["ret.2sub"] },
            { value: "1", label: t["ret.1"], sub: t["ret.1sub"] },
          ]}
        />
        <SegmentedControl
          legend={t["env.legend"]}
          value={s.prostredi}
          onChange={(v) => set("prostredi", v)}
          options={[
            { value: "n", label: t["env.n"], sub: t["env.nsub"] },
            { value: "h", label: t["env.h"], sub: t["env.hsub"] },
          ]}
          hint={t["env.motor"]}
        />
      </form>

      <div className="kp-vysledek" id="vysledek" aria-live="polite">
        {s.ucel === "kabel" ? (
          mam.stav === "ok" ? (
            <>
              <ResultCard
                title={t["mam.title"]}
                meta={fill(t["mam.meta"], { prurez: fmt(s.mamPrurez, 2), delka: fmt(s.delka, 1), u: String(s.napeti), d: String(s.ubytekProc) })}
                primary={{ label: t["mam.prikon"], value: fmt(mam.maxPrikonW, 0), unit: "W", note: fill(t["mam.prikonNote"], { u: String(s.napeti) }) }}
                secondary={[
                  { label: t["mam.proud"], value: fmt(mam.maxProud, 1), unit: "A", note: t["mam.proudNote"] },
                  { label: t["mam.pojistka"], value: fmt(mam.maxPojistka, 1), unit: "A", note: t["mam.pojistkaNote"] },
                ]}
                status={{ kind: "ok", word: t["result.status.ok"] }}
              >
                <div className="kv-vizualizace">
                  <RezKabelu prurez={s.mamPrurez} t={t} />
                </div>
                {sdileniKarta}
              </ResultCard>
              <div className="cx-notices">
                <Notice kind="ok" word={t["result.status.ok"]}>
                  <p>{t[mam.rozhodlo === "ubytek" ? "mam.rozhodlUbytek" : "mam.rozhodloOteplen"]}</p>
                </Notice>
                {mam.hlasky.includes("MINUS_PRES_KOSTRU") ? hlaska("MINUS_PRES_KOSTRU") : null}
                <p className="cx-hint">{t["result.predpoklad"]}</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="kp-chyba-nadpis">{t["result.errorTitle"]}</h2>
              {hlaska("NEPLATNY_VSTUP")}
            </>
          )
        ) : vysledek.stav === "ok" ? (
          <>
            <ResultCard
              title={t["result.title"]}
              meta={meta}
              primary={{
                label: t["result.prurez"],
                value: fmt(prurezVysl, 2),
                unit: t["result.prurezUnit"],
                note: svOk?.rozhodlVyrobce
                  ? fill(t["vyr.prurezNote"], { vypocet: fmt(vysledek.prurez, 2) })
                  : vysledek.awg
                  ? fill(t["result.awg"], { awg: vysledek.awg.oznaceni, plocha: fmt(vysledek.awg.plocha, 2) })
                  : t["result.awgNone"],
              }}
              secondary={[
                {
                  label: t["result.pojistka"],
                  value: fmt(pojistkaVysl, 1),
                  unit: t["result.pojistkaUnit"],
                  note: t["result.pojistkaNote"],
                },
                {
                  label: t["result.ubytek"],
                  value: fmt(svOk?.ubytekV ?? vysledek.ubytekV, 2),
                  unit: t["result.ubytekUnit"],
                  note: fill(t["result.ubytekNote"], { proc: fmt(svOk?.ubytekProc ?? vysledek.ubytekProc, 1), u: String(s.napeti) }),
                },
              ]}
              status={{
                kind: vysledek.hlasky.some((h) => DRUH[h] === "warn") ? "warn" : "ok",
                word: vysledek.hlasky.some((h) => DRUH[h] === "warn") ? t["result.status.warn"] : t["result.status.ok"],
              }}
            >
              <div className="kv-vizualizace">
                <RezKabelu prurez={prurezVysl} t={t} />
                <ZatizeniKabelu proud={vysledek.proud} maxPojistka={svOk?.maxPojistka ?? vysledek.maxPojistka} t={t} />
              </div>
              <dl className="kp-det">
                <dt>{t["det.proud"]}</dt>
                <dd className="cx-num">{fmt(vysledek.proud, 2)}{NBSP}A</dd>
                <dt>{t["det.prikon"]}</dt>
                <dd className="cx-num">{fmt(vysledek.prikon, 0)}{NBSP}W</dd>
                <dt>{t["det.napeti"]}</dt>
                <dd className="cx-num">{fmt(vysledek.napetiUSpotrebice, 2)}{NBSP}V</dd>
                <dt>{t["det.ztrata"]}</dt>
                <dd className="cx-num">{fmt(vysledek.ztrata, 1)}{NBSP}W</dd>
                <dt>{t["det.maxPojistka"]}</dt>
                <dd className="cx-num">{fmt(vysledek.maxPojistka, 1)}{NBSP}A</dd>
                <dt>{t["det.maxDelka"]}</dt>
                <dd className="cx-num">{fmt(vysledek.maxDelka, 1)}{NBSP}m</dd>
              </dl>
              {sdileniKarta}
            </ResultCard>
            {sv && polozkaVyrobce ? (
              <section className="kp-vyrobce" aria-labelledby="kp-vyrobce-h">
                <h2 id="kp-vyrobce-h">{fill(t["vyr.h2"], { nazev: polozkaVyrobce.nazev })}</h2>
                <dl className="kp-vyrobce__srovnani">
                  <div>
                    <dt>{t["vyr.vypocet"]}</dt>
                    <dd className="cx-num">
                      {fmt(vysledek.prurez, 2)}
                      {NBSP}mm² · {fmt(vysledek.pojistka, 1)}
                      {NBSP}A
                    </dd>
                  </div>
                  <div>
                    <dt>{t["vyr.vyrobce"]}</dt>
                    <dd className="cx-num">
                      {sv.vyrobce.stav === "ok"
                        ? `${fmt(sv.vyrobce.prurez, 2)}${NBSP}mm²`
                        : t[sv.vyrobce.stav === "mimo-tabulku" ? "vyr.mimo" : "vyr.bez"]}
                      {sv.vyrobce.stav !== "bez-tabulky" && sv.vyrobce.pojistkaA !== null ? ` · ${fmt(sv.vyrobce.pojistkaA, 1)}${NBSP}A` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt>{t["vyr.pouzijte"]}</dt>
                    <dd className="cx-num kp-vyrobce__vysledek">
                      {fmt(prurezVysl, 2)}
                      {NBSP}mm² · {fmt(pojistkaVysl, 1)}
                      {NBSP}A
                    </dd>
                  </div>
                </dl>
                {sv.vyrobce.stav !== "bez-tabulky" ? (
                  <p className="cx-hint">
                    {fill(t[polozkaVyrobce.delka === "celkova" ? "vyr.delkaCelkova" : "vyr.delkaJedna"], {
                      d: fmt(sv.vyrobce.delkaTabulkyM, 1),
                      max: fmt(sv.vyrobce.maxDelkaM, 1),
                    })}
                  </p>
                ) : null}
                <p>{t[`vyr.duvod.${polozkaVyrobce.duvod}`]}</p>
                {sv.vyrobce.stav === "mimo-tabulku" ? <Notice kind="warn" word={t["result.status.warn"]}><p>{t["vyr.mimoText"]}</p></Notice> : null}
                {sv.pojistkaNadKabel ? <Notice kind="warn" word={t["result.status.warn"]}><p>{t["vyr.pojistkaNadKabel"]}</p></Notice> : null}
                <p className="cx-hint">{t["vyr.zdroj"]}</p>
              </section>
            ) : null}
            <div className="cx-notices">
              {podleZavaznosti(vysledek.hlasky).map((h) =>
                hlaska(h, { prurez: fmt(vysledek.prurez, 2), maxDelka: fmt(vysledek.maxDelka, 1) }),
              )}
              <p className="cx-hint">{t["result.predpoklad"]}</p>
            </div>
            <section className="kp-listek" aria-labelledby="kp-listek-h">
              <h2 id="kp-listek-h">{t["listek.h2"]}</h2>
              <p className="cx-hint">{meta}</p>
              <ul>
                <li>
                  {fill(t[s.zpetny === 2 ? "listek.kabel2" : "listek.kabel1"], {
                    prurez: fmt(prurezVysl, 2),
                    m: fmt(s.delka * s.zpetny, 1),
                    m1: fmt(s.delka, 1),
                  })}
                </li>
                <li>
                  {fill(t["listek.pojistka"], {
                    a: fmt(pojistkaVysl, 1),
                    rodina: t[pojistkaVysl <= 35 ? "listek.rodinaNozova" : pojistkaVysl <= 125 ? "listek.rodinaMidi" : "listek.rodinaMega"] ?? "",
                  })}
                </li>
                <li>{fill(t["listek.oka"], { prurez: fmt(prurezVysl, 2), ks: String(2 * s.zpetny) })}</li>
              </ul>
              <p className="cx-hint">{t["listek.rezerva"]}</p>
              <p className="cx-hint">{t["spol.kartaPaticka"]}</p>
              <div className="cx-btns">
                <Button variant="secondary" onClick={() => window.print()}>
                  {t["listek.tisk"]}
                </Button>
              </div>
            </section>
          </>
        ) : (
          <>
            <h2 className="kp-chyba-nadpis">{t["result.errorTitle"]}</h2>
            <div className="cx-notices">
              {podleZavaznosti(vysledek.hlasky).map((h) => hlaska(h, { proud: vysledek.proud !== undefined ? fmt(vysledek.proud, 1) : "" }))}
              {vysledek.hlasky.includes("HLAVNI_VEDENI") ? (
                <p className="cx-hint">
                  {t["hlavni.vysvetleni"]} <a href={t["hlavni.odkaz"]}>{t["hlavni.odkazText"]}</a>
                </p>
              ) : null}
            </div>
            {sdileniKarta}
          </>
        )}
      </div>
    </div>
  );
}
