// Čtení a formátování čísel v polích. Pole přijímá desetinnou čárku i tečku a mezery jako oddělovač tisíců.

/**
 * Přečte číslo zadané člověkem. Přijímá „2,5“, „2.5“, „1 200“, „ 3 “ i „−1“ (typografické mínus).
 * Vrací null, když vstup není jedno číslo (prázdný, „2,5,1“, „abc“, „1.200,5“).
 */
export function parseDecimal(input: string): number | null {
  const s = input
    .trim()
    .replace(/[\s  ]/g, "")
    .replace(/−/g, "-")
    .replace(",", ".");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Naformátuje číslo podle jazyka (výchozí čeština: desetinná čárka, mezera mezi tisíci). */
export function formatDecimal(value: number, maxFractionDigits = 2, locale = "cs-CZ"): string {
  return value.toLocaleString(locale, { maximumFractionDigits: maxFractionDigits, minimumFractionDigits: 0 });
}
