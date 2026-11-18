// Doporučení výrobců k průřezu napájecího kabelu (docs/KALKULACKA_PRUREZU.md, oddíl „Doporučení výrobce“,
// Radek 18. 11. 2026). Výrobci dimenzují na rozběhový proud, proud jištění nebo jmenovitý výkon zařízení
// a hlídají napětí na svorkách; proto chtějí silnější kabel než výpočet z provozního příkonu.
// Výsledný průřez = větší z výpočtu (v1.1) a z tabulky výrobce; výpočet sám se nemění.
import type { DoporuceniVyrobce } from "@caravanix/data";
import { MM, maxFuse, navrhVodice, type VstupVodice, type VysledekVodice } from "./vodic.ts";

export type { DoporuceniVyrobce, RadekTabulkyVyrobce } from "@caravanix/data";

export type VysledekVyrobce =
  | { stav: "ok"; prurez: number; delkaTabulkyM: number; maxDelkaM: number; pojistkaA: number | null }
  | { stav: "mimo-tabulku"; delkaTabulkyM: number; maxDelkaM: number; pojistkaA: number | null }
  | { stav: "bez-tabulky" };

/** Průřez podle tabulky výrobce pro délku jedné cesty `delka` a zpětný vodič (2 = vlastní mínus, 1 = kostra). */
export function prurezPodleVyrobce(p: DoporuceniVyrobce, napeti: 12 | 24, delka: number, zpetny: 1 | 2): VysledekVyrobce {
  const tab = p.tabulky[String(napeti) as "12" | "24"];
  if (!tab || tab.length === 0 || !Number.isFinite(delka) || delka <= 0) return { stav: "bez-tabulky" };
  const delkaTabulkyM = p.delka === "celkova" ? delka * zpetny : delka;
  const serazena = [...tab].sort((a, b) => a.prurez - b.prurez);
  const maxDelkaM = Math.max(...serazena.map((r) => r.maxDelkaM));
  const pojistkaA = p.pojistkaA?.[String(napeti) as "12" | "24"] ?? null;
  const radek = serazena.find((r) => r.maxDelkaM >= delkaTabulkyM && r.prurez >= (p.minPrurez ?? 0));
  if (!radek) return { stav: "mimo-tabulku", delkaTabulkyM, maxDelkaM, pojistkaA };
  return { stav: "ok", prurez: radek.prurez, delkaTabulkyM, maxDelkaM, pojistkaA };
}

export interface VysledekSVyrobcem {
  vypocet: VysledekVodice;
  vyrobce: VysledekVyrobce;
  /** Doporučený průřez = větší z výpočtu a výrobce [mm²]; null, když výpočet nenašel kabel. */
  prurez: number | null;
  /** Rozhodl výrobce (jeho průřez je větší než výpočet). */
  rozhodlVyrobce: boolean;
  /** Pojistka: předepsaná výrobcem, smí-li ji výsledný kabel nést; jinak z výpočtu. */
  pojistka: number | null;
  /** Pojistka výrobce je větší, než výsledný kabel snese – platí návod výrobce a odborník. */
  pojistkaNadKabel: boolean;
  /** Úbytek napětí na výsledném průřezu [V] a [%] (úbytek je nepřímo úměrný průřezu). */
  ubytekV: number | null;
  ubytekProc: number | null;
  /** Největší pojistka, kterou výsledný kabel snese [A]. */
  maxPojistka: number | null;
}

export function navrhSVyrobcem(vstup: VstupVodice, p: DoporuceniVyrobce): VysledekSVyrobcem {
  const vypocet = navrhVodice(vstup);
  const vyrobce = prurezPodleVyrobce(p, vstup.napeti, vstup.delka, vstup.zpetny);
  if (vypocet.stav !== "ok")
    return { vypocet, vyrobce, prurez: null, rozhodlVyrobce: false, pojistka: null, pojistkaNadKabel: false, ubytekV: null, ubytekProc: null, maxPojistka: null };
  const pv = vyrobce.stav === "ok" ? vyrobce.prurez : 0;
  const prurez = Math.max(vypocet.prurez, pv);
  const k = vstup.prostredi === "h" ? 0.7 : 1.0;
  const pojistkaVyrobce = vyrobce.stav === "bez-tabulky" ? null : vyrobce.pojistkaA;
  const unese = maxFuse(prurez, k);
  const pojistkaNadKabel = pojistkaVyrobce !== null && pojistkaVyrobce > unese;
  const pojistka = pojistkaVyrobce !== null && !pojistkaNadKabel ? Math.max(pojistkaVyrobce, vypocet.pojistka) : vypocet.pojistka;
  const ubytekV = (vypocet.ubytekV * vypocet.prurez) / prurez;
  return {
    vypocet,
    vyrobce,
    prurez,
    rozhodlVyrobce: pv > vypocet.prurez,
    pojistka,
    pojistkaNadKabel,
    ubytekV,
    ubytekProc: (ubytekV / vstup.napeti) * 100,
    maxPojistka: unese,
  };
}

/** Kontrola dat: průřezy z řady MM, kladné délky. Vrací seznam chyb (prázdný = v pořádku). */
export function zkontrolujDoporuceni(seznam: readonly DoporuceniVyrobce[]): string[] {
  const chyby: string[] = [];
  for (const p of seznam)
    for (const [u, tab] of Object.entries(p.tabulky))
      for (const r of tab ?? []) {
        if (!(MM as readonly number[]).includes(r.prurez)) chyby.push(`${p.id} ${u} V: průřez ${r.prurez} není v řadě`);
        if (!(r.maxDelkaM > 0)) chyby.push(`${p.id} ${u} V: délka ${r.maxDelkaM}`);
      }
  return chyby;
}
