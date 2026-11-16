// Společné části kalkulaček alfy: stav v URL (sdílení odkazem), číselné pole, formátování, hlášky, sdílení.
import { useEffect, useState, type ReactNode } from "react";
import { Button, IconLink, Notice, NumberField, formatDecimal, parseDecimal, type Status } from "@caravanix/ui";

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
export function useStavVUrl<T extends object>(vychozi: T): [T, (zmena: Partial<T>) => void] {
  const [stav, setStav] = useState<T>(vychozi);
  const [nacteno, setNacteno] = useState(false);
  useEffect(() => {
    try {
      const s = new URLSearchParams(location.search).get("s");
      if (s) {
        const z = JSON.parse(s) as Partial<T>;
        const opraveny = { ...vychozi };
        for (const k of Object.keys(vychozi) as (keyof T)[]) {
          if (k in z && typeof z[k] === typeof vychozi[k]) opraveny[k] = z[k] as T[keyof T];
        }
        setStav(opraveny);
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
  return [stav, (zmena) => setStav((p) => ({ ...p, ...zmena }))];
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

/** Tlačítko „Kopírovat odkaz“ s potvrzením. */
export function Sdileni({ t }: { t: Texts }) {
  const [ok, setOk] = useState(false);
  return (
    <>
      <div className="cx-btns">
        <Button
          variant="secondary"
          icon={<IconLink className="cx-icon" />}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              setOk(true);
            } catch {
              setOk(false);
            }
          }}
        >
          {t["spol.kopirovat"]}
        </Button>
      </div>
      <div role="status">{ok ? <Hlaska kind="ok" word={t["spol.ok"]!}>{t["spol.zkopirovano"]}</Hlaska> : null}</div>
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
