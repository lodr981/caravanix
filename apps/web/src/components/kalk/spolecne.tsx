// Společné části kalkulaček alfy: stav v URL (sdílení odkazem), číselné pole, formátování, hlášky, sdílení.
import { useEffect, useState, type ReactNode } from "react";
import {
  Button,
  ExamplePicker,
  IconBattery,
  IconBolt,
  IconBulb,
  IconCable,
  IconCalendar,
  IconDrop,
  IconFlame,
  IconFridge,
  IconInverter,
  IconPlug,
  IconPot,
  IconSnow,
  IconSolarPanel,
  IconSun,
  IconVan,
  IconLink,
  IconShare,
  Notice,
  NumberField,
  Slider,
  formatDecimal,
  parseDecimal,
  shareImageSvg,
  type ShareImageInput,
  type Status,
} from "@caravanix/ui";

export type Texts = Record<string, string>;
export const NBSP = " ";

/** Číslo s desetinnou čárkou a nezlomitelnými mezerami. */
export const fmt = (x: number, d = 1) => formatDecimal(x, d).replace(/ /g, NBSP).replace(/^-/, "−");

/** Doplní {klíč} v textu. */
export const fill = (text: string | undefined, vars: Record<string, string> = {}) =>
  (text ?? "").replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

/**
 * Stav kalkulačky uložený v adrese jako JSON v parametru `s`. Stránka je předgenerovaná s výchozím stavem,
 * stav z adresy se načte až v prohlížeči. Neznámé nebo poškozené hodnoty se nahradí výchozími.
 */
// Cesta k elektrice: výsledky kroků (spotřeba → baterie → nabíjení → měnič → zapojení) si prohlížeč pamatuje
// jen po dobu relace (sessionStorage, žádné cookies). Další krok je převezme, když nepřišel odkaz se zadáním.
const KLIC_CESTY = "caravanix.cesta";
export interface HodnotyCesty {
  /** Napětí soustavy [V]. */
  u?: number;
  /** Spotřeba za den [Wh] z kroku 1. */
  wh?: number;
  /** Potřebná kapacita baterie [Ah] spočítaná v kroku 2. */
  ahPotreba?: number;
  /** Kapacita baterie, kterou uživatel má nebo zvolil [Ah]. */
  ahMam?: number;
  /** Výkon panelů [Wp] z kroku 3. */
  wp?: number;
  /** Proud boosteru [A]. */
  ba?: number;
  /** Zátěž na 230 V, kterou měnič musí trvale utáhnout [W] (kalkulačka měniče). */
  zatez230?: number;
  /** Proud z baterie, když běží všechno najednou [A] (kalkulačka spotřebičů). */
  proudVse?: number;
}
export function ctiCestu(): HodnotyCesty {
  try {
    const h = JSON.parse(sessionStorage.getItem(KLIC_CESTY) ?? "{}") as HodnotyCesty;
    return h && typeof h === "object" ? h : {};
  } catch {
    return {};
  }
}
/** Uloží výsledek kroku do cesty (jen konečná kladná čísla) – jen když uživatel něco zadal (`aktivni`), nikdy výchozí stav. */
export function useUlozDoCesty(h: HodnotyCesty, aktivni: boolean) {
  const klic = JSON.stringify(h);
  useEffect(() => {
    if (!aktivni) return;
    try {
      const ciste = Object.fromEntries(Object.entries(h).filter(([, v]) => typeof v === "number" && Number.isFinite(v) && v > 0));
      sessionStorage.setItem(KLIC_CESTY, JSON.stringify({ ...ctiCestu(), ...ciste }));
    } catch {
      // úložiště nedostupné: cesta se jen nepřenese
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [klic, aktivni]);
}

/**
 * Stav kalkulačky v adrese (?s=JSON). Bez odkazu se zadáním lze převzít hodnoty z předchozích kroků cesty
 * (`zCesty`); třetí hodnota říká, že se převzala nějaká jiná než výchozí hodnota (kalkulačka to oznámí);
 * čtvrtá, že stav pochází od uživatele (převzatý nebo změněný) – jen takový se ukládá do cesty.
 */
export function useStavVUrl<T extends object>(
  vychozi: T,
  zCesty?: (c: HodnotyCesty) => Partial<T>,
): [T, (zmena: Partial<T>) => void, boolean, boolean] {
  const [stav, setStav] = useState<T>(vychozi);
  const [nacteno, setNacteno] = useState(false);
  const [prevzato, setPrevzato] = useState(false);
  useEffect(() => {
    const opravit = (z: Partial<T>) => {
      const opraveny = { ...vychozi };
      let zmena = false;
      for (const k of Object.keys(vychozi) as (keyof T)[]) {
        if (k in z && z[k] !== undefined && typeof z[k] === typeof vychozi[k]) {
          opraveny[k] = z[k] as T[keyof T];
          if (JSON.stringify(z[k]) !== JSON.stringify(vychozi[k])) zmena = true;
        }
      }
      return { opraveny, zmena };
    };
    try {
      const s = new URLSearchParams(location.search).get("s");
      if (s) {
        setStav(opravit(JSON.parse(s) as Partial<T>).opraveny);
      } else if (zCesty) {
        const { opraveny, zmena } = opravit(zCesty(ctiCestu()));
        if (zmena) {
          setStav(opraveny);
          setPrevzato(true);
        }
      }
    } catch {
      // poškozený odkaz: zůstane výchozí stav
    }
    setNacteno(true);
  }, []);
  useEffect(() => {
    if (!nacteno) return;
    const q = new URLSearchParams({ s: JSON.stringify(stav) });
    history.replaceState(null, "", `?${q.toString()}${location.hash}`);
  }, [stav, nacteno]);
  const aktivni = prevzato || JSON.stringify(stav) !== JSON.stringify(vychozi);
  return [stav, (zmena) => setStav((p) => ({ ...p, ...zmena })), prevzato, aktivni];
}

/** Oznámení, že kalkulačka převzala hodnoty z předchozího kroku cesty. */
export function Prevzato({ t, ukaz }: { t: Texts; ukaz: boolean }) {
  if (!ukaz) return null;
  return (
    <Notice kind="ok" word={t["spol.prevzatoSlovo"] ?? ""}>
      <p>{t["spol.prevzato"]}</p>
    </Notice>
  );
}

/** Číselné pole s textovou hodnotou ve stavu (přijímá čárku i tečku). */
export function Cislo(props: {
  label: ReactNode;
  value: string;
  onChange: (raw: string) => void;
  unit?: string;
  hint?: ReactNode;
  min: number;
  max: number;
  chyba: string;
}) {
  const n = parseDecimal(props.value);
  const spatne = props.value.trim() !== "" && !(n !== null && n >= props.min && n <= props.max);
  return (
    <NumberField
      label={props.label}
      unit={props.unit}
      value={props.value}
      onValueChange={(raw) => props.onChange(raw)}
      hint={props.hint}
      error={spatne ? fill(props.chyba, { min: fmt(props.min, 2), max: fmt(props.max, 2) }) : undefined}
    />
  );
}

/** Text pole → číslo pro engine (neplatné → NaN, engine pak vrátí NEPLATNY_VSTUP). */
export const cislo = (raw: string) => {
  const n = parseDecimal(raw);
  return n !== null && Number.isFinite(n) ? n : Number.NaN;
};

export function Hlaska({ kind, word, children }: { kind: Status; word: string; children: ReactNode }) {
  return (
    <Notice kind={kind} word={word}>
      <p>{children}</p>
    </Notice>
  );
}

/** Data karty výsledku ke sdílení (bez značky, patičky a adresy – ty doplní komponenta). */
export type KartaVysledku = Pick<ShareImageInput, "title" | "inputs" | "primary" | "secondary">;

/** Převede SVG kartu na PNG (1200 × 630) v prohlížeči. */
async function kartaPng(svg: string): Promise<Blob | null> {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 630;
  c.getContext("2d")?.drawImage(img, 0, 0);
  return new Promise((r) => c.toBlob((b) => r(b), "image/png"));
}

/** Sdílení: odkaz na výsledek a obrázek výsledku (uložit, nebo poslat přes systémové sdílení). */
export function Sdileni({ t, karta }: { t: Texts; karta?: KartaVysledku | null }) {
  const [stav, setStav] = useState<"" | "odkaz" | "obrazek" | "chyba">("");
  const obrazek = async (sdilet: boolean) => {
    if (!karta) return;
    try {
      const svg = shareImageSvg({ ...karta, brand: "Caravanix", footer: t["spol.kartaPaticka"] ?? "", url: location.host + location.pathname });
      const png = await kartaPng(svg);
      if (!png) throw new Error("png");
      const soubor = new File([png], "caravanix-vysledek.png", { type: "image/png" });
      if (sdilet && navigator.canShare?.({ files: [soubor] })) {
        await navigator.share({ files: [soubor], title: karta.title, text: location.href });
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(png);
        a.download = soubor.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      setStav("obrazek");
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") setStav("chyba");
    }
  };
  const [lzeSdiletSoubor, setLzeSdiletSoubor] = useState(false);
  useEffect(() => {
    try {
      setLzeSdiletSoubor(!!navigator.canShare?.({ files: [new File([""], "x.png", { type: "image/png" })] }));
    } catch {
      setLzeSdiletSoubor(false);
    }
  }, []);
  return (
    <>
      <div className="cx-btns">
        {karta && lzeSdiletSoubor ? (
          <Button icon={<IconShare className="cx-icon" />} onClick={() => obrazek(true)}>
            {t["spol.sdiletObrazek"]}
          </Button>
        ) : null}
        <Button
          variant="secondary"
          icon={<IconLink className="cx-icon" />}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              setStav("odkaz");
            } catch {
              setStav("chyba");
            }
          }}
        >
          {t["spol.kopirovat"]}
        </Button>
        {karta ? (
          <Button variant="secondary" onClick={() => obrazek(false)}>
            {t["spol.ulozitObrazek"]}
          </Button>
        ) : null}
      </div>
      <div role="status">
        {stav === "odkaz" ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["spol.zkopirovano"]}</Hlaska> : null}
        {stav === "obrazek" ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["spol.obrazekHotovo"]}</Hlaska> : null}
        {stav === "chyba" ? <Hlaska kind="warn" word={t["spol.pozor"]!}>{t["spol.sdileniChyba"]}</Hlaska> : null}
      </div>
    </>
  );
}

/** Jednotka dní ve správném tvaru: 1 den, 2–4 dny, 5 a víc dní, desetinné číslo dne. */
export const dnu = (n: number, t: Texts) =>
  !Number.isInteger(n) ? t["jedn.dne"] : n === 1 ? t["jedn.den"] : n >= 2 && n <= 4 ? t["jedn.dny"] : t["jedn.dni"];

/** Rozbalitelný blok předpokladů (výchozí hodnoty, které jde změnit). */
export function Predpoklady({ t, children }: { t: Texts; children: ReactNode }) {
  return (
    <details className="kalk-predpoklady">
      <summary>{t["spol.predpoklady"]}</summary>
      <p className="cx-hint">{t["spol.predpokladyHint"]}</p>
      <div className="kalk-mrizka">{children}</div>
    </details>
  );
}

/** Chybový stav: který vstup je špatně. */
export function ChybaVstupu({ t, pole }: { t: Texts; pole: string }) {
  return (
    <Hlaska kind="block" word={t["spol.stop"]!}>
      {fill(t["spol.neplatny"], { pole: t[`pole.${pole.replace(/\[\d+\]/g, "")}`] ?? pole })}
    </Hlaska>
  );
}

/**
 * Posuvník a pole pro přesné číslo jako jedna veličina (vzor: délka v kalkulačce průřezu).
 * Posuvník pokrývá běžné použití (`od`–`do`), pole dovolí celý rozsah (`min`–`max`). Hodnota je ve stavu jako text.
 */
export function CisloPosuvnik(props: {
  t: Texts;
  label: string;
  value: string;
  onChange: (raw: string) => void;
  unit: string;
  /** Rozsah posuvníku a krok tlačítek − / +. */
  od: number;
  do: number;
  krok: number;
  /** Platný rozsah pole (stejný jako kontroluje engine). */
  min: number;
  max: number;
  hint?: ReactNode;
  chyba: string;
}) {
  const { t } = props;
  const n = parseDecimal(props.value);
  const naPosuvniku = n === null ? props.od : Math.min(props.do, Math.max(props.od, n));
  const desetin = (String(props.krok).split(".")[1] ?? "").length;
  const krokText = fmt(props.krok, desetin);
  const jedn = `${krokText}${NBSP}${props.unit}`;
  return (
    <div className="kalk-posuvnik">
      <Slider
        label={props.label}
        value={naPosuvniku}
        onChange={(v) => props.onChange(formatDecimal(v, desetin).replace(/\s/g, ""))}
        min={props.od}
        max={props.do}
        step={props.krok}
        formatValue={(v) => `${n !== null && (n < props.od || n > props.do) ? fmt(n, 2) : fmt(v, desetin)}${NBSP}${props.unit}`}
        decrement={{ text: `−${NBSP}${krokText}`, label: fill(t["spol.mene"], { co: props.label, o: jedn }) }}
        increment={{ text: `+${NBSP}${krokText}`, label: fill(t["spol.vice"], { co: props.label, o: jedn }) }}
      />
      <Cislo
        label={
          <>
            {t["spol.presne"]}
            <span className="cx-visually-hidden">: {props.label}</span>
          </>
        }
        unit={props.unit}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        chyba={props.chyba}
        hint={props.hint}
      />
    </div>
  );
}

// ---------- typické příklady ----------

export interface Priklad {
  id: string;
  nazev: string;
  popis?: string;
  /** Volitelná ikona podle názvu (viz IKONY_PRIKLADU). */
  ikona?: string;
  stav: Record<string, unknown>;
}

/** Ikony, které smí příklad uvést v poli `ikona` (vlastní SVG z @caravanix/ui). */
export const IKONY_PRIKLADU: Record<string, (p: { className?: string }) => ReactNode> = {
  slunce: IconSun,
  vlocka: IconSnow,
  dodavka: IconVan,
  baterie: IconBattery,
  panel: IconSolarPanel,
  zasuvka: IconPlug,
  menic: IconInverter,
  kabel: IconCable,
  blesk: IconBolt,
  lednice: IconFridge,
  plamen: IconFlame,
  hrnec: IconPot,
  kapka: IconDrop,
  zarovka: IconBulb,
  kalendar: IconCalendar,
};

// Soubor s příklady dodává hlavní vlákno; glob vrátí prázdný objekt, když soubor chybí (pak se nic nezobrazí).
const prikladySoubor = import.meta.glob<{ default: Record<string, Priklad[]> }>("../../../../../content/cs/priklady.json", { eager: true });
const vsechnyPriklady: Record<string, Priklad[]> = Object.values(prikladySoubor)[0]?.default ?? {};

export const prikladyPro = (kalkulacka: string): Priklad[] => {
  const p = vsechnyPriklady[kalkulacka];
  return Array.isArray(p) ? p.filter((x) => x && typeof x.id === "string" && typeof x.nazev === "string" && x.stav && typeof x.stav === "object") : [];
};

/** Převede hodnotu z příkladu na typ výchozí hodnoty (čísla → text s desetinnou čárkou, řádky seznamu podle vzoru). */
function prevedHodnotu(vzor: unknown, h: unknown): unknown {
  if (typeof vzor === "string") {
    if (typeof h === "number" && Number.isFinite(h)) return formatDecimal(h, 4).replace(/\s/g, "");
    return typeof h === "string" ? h : undefined;
  }
  if (typeof vzor === "number") {
    const n = typeof h === "string" ? parseDecimal(h) : h;
    return typeof n === "number" && Number.isFinite(n) ? n : undefined;
  }
  if (typeof vzor === "boolean") return typeof h === "boolean" ? h : undefined;
  if (Array.isArray(vzor)) {
    if (!Array.isArray(h) || !h.length) return undefined;
    const radek = vzor[0] as Record<string, unknown> | undefined;
    if (!radek) return h;
    return h.map((r) => {
      const o: Record<string, unknown> = { ...radek };
      for (const k of Object.keys(radek)) {
        const v = r && typeof r === "object" ? prevedHodnotu(radek[k], (r as Record<string, unknown>)[k]) : undefined;
        o[k] = v === undefined ? (typeof radek[k] === "string" ? "" : radek[k]) : v;
      }
      return o;
    });
  }
  return undefined;
}

/** Stav kalkulačky z příkladu: výchozí stav + hodnoty příkladu (neznámé klíče a špatné typy se ignorují). */
export function stavZPrikladu<T extends object>(vychozi: T, p: Priklad): T {
  const novy = { ...vychozi };
  for (const k of Object.keys(vychozi) as (keyof T)[]) {
    if (!(k in p.stav)) continue;
    const v = prevedHodnotu(vychozi[k], p.stav[k as string]);
    if (v !== undefined) novy[k] = v as T[keyof T];
  }
  return novy;
}

const ikonaPrikladu = (nazev?: string) => {
  const I = nazev ? IKONY_PRIKLADU[nazev] : undefined;
  return I ? <I className="cx-icon" /> : undefined;
};

/** Řada typických příkladů nad formulářem. Zvýrazní příklad, kterému odpovídá aktuální zadání. */
export function Priklady<T extends object>(props: { t: Texts; kalkulacka: string; vychozi: T; stav: T; nastav: (s: T) => void }) {
  const seznam = prikladyPro(props.kalkulacka);
  if (!seznam.length) return null;
  const aktivni = seznam.find((p) => JSON.stringify(stavZPrikladu(props.vychozi, p)) === JSON.stringify(props.stav))?.id ?? null;
  return (
    <ExamplePicker
      title={props.t["spol.priklady"]}
      hint={props.t["spol.prikladyHint"]}
      items={seznam.map((p) => ({ id: p.id, label: p.nazev, description: p.popis, icon: ikonaPrikladu(p.ikona) }))}
      activeId={aktivni}
      onSelect={(id) => {
        const p = seznam.find((x) => x.id === id);
        if (p) props.nastav(stavZPrikladu(props.vychozi, p));
      }}
    />
  );
}
