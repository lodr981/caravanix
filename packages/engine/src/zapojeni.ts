// Průvodce zapojením: z výběru komponent sestaví projekt pro živé schéma (docs/KALKULACKY_ALFA.md, kapitola H).
// Počítá jen proudy jednotlivých kabelů a velikost regulátoru. Průřezy a pojistky pak dává navrhSchematu
// (kalkulačka průřezu v1.1), rozložení je jen logická poloha komponent (sloupec, řádek).
import type { KabelProjektu, KomponentaProjektu, Projekt, RezimSchematu } from "@caravanix/data";
import { jmenoviteNapeti, navrhMenice, type Chyba, type Soustava } from "./alfa.ts";

/** Běžné jmenovité proudy regulátorů MPPT [A]. */
export const RADA_MPPT = [10, 15, 20, 30, 40, 50, 60, 70, 85, 100] as const;
/** Ztráta boosteru: vstupní proud je o 10 % větší než výstupní (stejný předpoklad jako projekt R1). */
export const ZTRATA_BOOSTERU = 1.1;
/** Nejvýš spotřebičů ve schématu (víc se do kresby nevejde čitelně). */
export const MAX_SPOTREBICU = 8;

export interface SpotrebicZapojeni {
  id: string;
  /** Typ pro ikonu ve schématu (lednice, svetla, cerpadlo, zasuvka, …). */
  typ: string;
  nazev: string;
  prikonW: number;
  /** Dovolený úbytek napětí: 3 % elektronika a lednice, 5 % běžné, 10 % světla. */
  ubytekProc: 3 | 5 | 10;
  rezimy: RezimSchematu[];
}

export interface VstupZapojeni {
  napeti: Soustava;
  baterieAh: number;
  /** Výkon solárních panelů [Wp], 0 = bez soláru. */
  solarWp: number;
  /** Jmenovitý (výstupní) proud boosteru [A], 0 = bez boosteru. */
  boosterA: number;
  /** Nabíjecí proud nabíječky z 230 V [A], 0 = bez nabíječky. */
  nabijeckaA: number;
  /** Trvalý výkon měniče [W], 0 = bez měniče. */
  menicW: number;
  spotrebice: SpotrebicZapojeni[];
  /** Délky tras podle id kabelu [m]; chybějící doplní výchozí. */
  delky?: Record<string, number>;
  /** Názvy komponent podle id (texty dodává web). */
  nazvy?: Record<string, string>;
}

export type HlaskaZapojeni = "REGULATOR_NAD_100A" | "MENIC_NAD_150A";

export interface Zapojeni {
  stav: "ok";
  projekt: Projekt;
  /** Zvolený regulátor MPPT [A] (nejbližší vyšší z řady), null bez soláru. */
  regulatorA: number | null;
  /** Proud z panelů přepočtený na baterii [A], null bez soláru. */
  proudSolaruA: number | null;
  /** Proud měniče z baterie [A], null bez měniče. */
  proudMeniceA: number | null;
  hlasky: HlaskaZapojeni[];
}

/** Výchozí délky tras [m] podle id kabelu (typická malá dodávka jako R1). */
export const VYCHOZI_DELKY: Record<string, number> = {
  "regulator-baterie": 1.5,
  "startovaci-booster": 4,
  "booster-baterie": 1,
  "nabijecka-baterie": 1,
  "baterie-rozvod": 0.5,
  "baterie-menic": 1,
};
export const VYCHOZI_DELKA_SPOTREBICE = 3;

const chyba = (pole: string): Chyba => ({ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole });
const vRozsahu = (v: unknown, min: number, max: number) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
const nulaNeboVRozsahu = (v: unknown, min: number, max: number) => v === 0 || vRozsahu(v, min, max);

export function navrhZapojeni(vstup: VstupZapojeni): Zapojeni | Chyba {
  const v = (vstup ?? {}) as VstupZapojeni;
  if (v.napeti !== 12 && v.napeti !== 24) return chyba("napeti");
  if (!vRozsahu(v.baterieAh, 10, 2000)) return chyba("baterieAh");
  if (!nulaNeboVRozsahu(v.solarWp, 10, 3000)) return chyba("solarWp");
  if (!nulaNeboVRozsahu(v.boosterA, 5, 100)) return chyba("boosterA");
  if (!nulaNeboVRozsahu(v.nabijeckaA, 2, 100)) return chyba("nabijeckaA");
  if (!nulaNeboVRozsahu(v.menicW, 50, 5000)) return chyba("menicW");
  if (!Array.isArray(v.spotrebice) || v.spotrebice.length > MAX_SPOTREBICU) return chyba("spotrebice");
  const idcka = new Set<string>();
  for (let i = 0; i < v.spotrebice.length; i++) {
    const s = v.spotrebice[i]!;
    if (typeof s?.id !== "string" || s.id === "" || idcka.has(s.id)) return chyba(`spotrebice[${i}].id`);
    idcka.add(s.id);
    if (!vRozsahu(s.prikonW, 0.1, 3000)) return chyba(`spotrebice[${i}].prikonW`);
    if (s.ubytekProc !== 3 && s.ubytekProc !== 5 && s.ubytekProc !== 10) return chyba(`spotrebice[${i}].ubytekProc`);
  }
  const delky = v.delky ?? {};
  for (const [id, d] of Object.entries(delky)) if (!vRozsahu(d, 0.1, 100)) return chyba(`delky.${id}`);
  const delka = (id: string, vychozi: number) => delky[id] ?? vychozi;
  const nazev = (id: string) => v.nazvy?.[id] ?? id;
  const U = jmenoviteNapeti(v.napeti);
  const hlasky: HlaskaZapojeni[] = [];

  // Zdroje vlevo: každý zdroj má svůj řádek.
  const komponenty: KomponentaProjektu[] = [];
  const kabely: KabelProjektu[] = [];
  let radek = 0;

  let regulatorA: number | null = null;
  let proudSolaruA: number | null = null;
  if (v.solarWp > 0) {
    const proud = v.solarWp / U;
    const nejvetsi = RADA_MPPT[RADA_MPPT.length - 1] as number;
    const regulator: number = RADA_MPPT.find((a) => a >= proud) ?? nejvetsi;
    proudSolaruA = proud;
    regulatorA = regulator;
    if (proud > nejvetsi) hlasky.push("REGULATOR_NAD_100A");
    komponenty.push({ id: "panel", typ: "panel", nazev: nazev("panel"), sloupec: 0, radek });
    komponenty.push({ id: "regulator", typ: "mppt", nazev: nazev("regulator"), sloupec: 1, radek });
    kabely.push({ id: "panel-regulator", od: "panel", do: "regulator", druh: "solar", rezimy: ["den"] });
    // Kabel z regulátoru se dimenzuje na jmenovitý proud regulátoru (víc regulátor nedá).
    kabely.push({
      id: "regulator-baterie",
      od: "regulator",
      do: "baterie",
      proudA: regulator,
      delkaM: delka("regulator-baterie", VYCHOZI_DELKY["regulator-baterie"]!),
      ubytekProc: 3,
      rezimy: ["den"],
    });
    radek++;
  }
  if (v.boosterA > 0) {
    komponenty.push({ id: "startovaci", typ: "startovaci", nazev: nazev("startovaci"), sloupec: 0, radek });
    komponenty.push({ id: "booster", typ: "booster", nazev: nazev("booster"), sloupec: 1, radek });
    kabely.push({
      id: "startovaci-booster",
      od: "startovaci",
      do: "booster",
      proudA: v.boosterA * ZTRATA_BOOSTERU,
      delkaM: delka("startovaci-booster", VYCHOZI_DELKY["startovaci-booster"]!),
      ubytekProc: 3,
      rezimy: ["jizda"],
    });
    kabely.push({
      id: "booster-baterie",
      od: "booster",
      do: "baterie",
      proudA: v.boosterA,
      delkaM: delka("booster-baterie", VYCHOZI_DELKY["booster-baterie"]!),
      ubytekProc: 3,
      rezimy: ["jizda"],
    });
    radek++;
  }
  if (v.nabijeckaA > 0) {
    komponenty.push({ id: "sit", typ: "sit", nazev: nazev("sit"), sloupec: 0, radek });
    komponenty.push({ id: "nabijecka", typ: "nabijecka", nazev: nazev("nabijecka"), sloupec: 1, radek });
    kabely.push({ id: "sit-nabijecka", od: "sit", do: "nabijecka", druh: "ac", rezimy: ["kemp"] });
    kabely.push({
      id: "nabijecka-baterie",
      od: "nabijecka",
      do: "baterie",
      proudA: v.nabijeckaA,
      delkaM: delka("nabijecka-baterie", VYCHOZI_DELKY["nabijecka-baterie"]!),
      ubytekProc: 3,
      rezimy: ["kemp"],
    });
    radek++;
  }

  const n = v.spotrebice.length;
  const vystupu = (n > 0 ? 1 : 0) + (v.menicW > 0 ? 1 : 0);
  const vyska = Math.max(radek, n, vystupu, 1);
  const radekBaterie = Math.floor((vyska - 1) / 2);
  komponenty.push({ id: "baterie", typ: "baterie", nazev: nazev("baterie"), sloupec: 2, radek: radekBaterie });

  const vsechnyRezimy: RezimSchematu[] = ["den", "noc", "jizda", "kemp"];
  if (n > 0) {
    komponenty.push({ id: "rozvod", typ: "rozvod", nazev: nazev("rozvod"), sloupec: 3, radek: radekBaterie });
    // Hlavní vedení ke skříňce: všechny spotřebiče najednou (nejhorší případ).
    const soucet = v.spotrebice.reduce((a, s) => a + s.prikonW, 0);
    kabely.push({
      id: "baterie-rozvod",
      od: "baterie",
      do: "rozvod",
      prikonW: soucet,
      delkaM: delka("baterie-rozvod", VYCHOZI_DELKY["baterie-rozvod"]!),
      ubytekProc: 3,
      rezimy: vsechnyRezimy.filter((r) => v.spotrebice.some((s) => s.rezimy.includes(r))),
    });
    v.spotrebice.forEach((s, i) => {
      komponenty.push({ id: s.id, typ: s.typ, nazev: s.nazev, sloupec: 4, radek: i });
      kabely.push({
        id: `rozvod-${s.id}`,
        od: "rozvod",
        do: s.id,
        prikonW: s.prikonW,
        delkaM: delka(`rozvod-${s.id}`, VYCHOZI_DELKA_SPOTREBICE),
        ubytekProc: s.ubytekProc,
        rezimy: s.rezimy,
      });
    });
  }

  let proudMeniceA: number | null = null;
  if (v.menicW > 0) {
    const m = navrhMenice({ napeti: v.napeti, spotrebice: [{ prikonW: v.menicW }] });
    if (m.stav !== "ok") return chyba("menicW");
    proudMeniceA = m.proudZBaterie;
    if (m.hlasky.includes("NAD_150A")) hlasky.push("MENIC_NAD_150A");
    // Měnič přímo z baterie s vlastní pojistkou, ne přes pojistkovou skříňku.
    komponenty.push({ id: "menic", typ: "menic", nazev: nazev("menic"), sloupec: 3, radek: n > 0 ? radekBaterie + 1 : radekBaterie });
    kabely.push({
      id: "baterie-menic",
      od: "baterie",
      do: "menic",
      proudA: proudMeniceA,
      delkaM: delka("baterie-menic", VYCHOZI_DELKY["baterie-menic"]!),
      ubytekProc: 3,
      rezimy: ["den", "noc", "kemp"],
    });
  }

  const projekt: Projekt = {
    id: "vlastni",
    nazev: nazev("projekt"),
    poznamka: "",
    napeti: v.napeti,
    komponenty,
    kabely,
  };
  return { stav: "ok", projekt, regulatorA, proudSolaruA, proudMeniceA, hlasky };
}
