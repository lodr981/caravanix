# Nález: packages/data/src/odpor-vodicu.json (verze 2026-11-16)

- Ověřovatel: overovatel, 16. 11. 2026
- **Verdikt: SEDÍ**

## Co jsem ověřil

1. **Struktura:** 15 položek, průřezy přesně v pořadí `MM` (0,5 … 120 mm²), pole `prurez`, `odporOhmKm`, `rho`, `karta` podle `docs/KALKULACKA_PRUREZU.md`, Verze 2, „Nové datové tabulky“.
2. **0,5–70 mm² (karta K-VODIC-0001):** datasheet FLRY-A/FLRY-B (Manex, kopie https://static.chipdip.ru/lib/604/DOC035604408.pdf, staženo 16. 11. 2026, MD5 d6edca92c8023c47b7fa11512314a1a0), PDF s. 2, tabulka FLRY-B, sloupec „Resistance at 20 °C (max.)“ v mΩ/m. Textová vrstva tabulky je rozházená, proto jsem průřez a odpor pároval podle svislé souřadnice slova (PyMuPDF). Každý řádek se shodoval na 0,0 pt: 0,50 → 37,1; 0,75 → 24,7; 1,00 → 18,5; 1,50 → 12,7; 2,50 → 7,6; 4,00 → 4,71; 6,00 → 3,14; 10,00 → 1,82; 16,00 → 1,16; 25,00 → 0,743; 35,00 → 0,527; 50,00 → 0,368; 70,00 → 0,259. Všech 13 hodnot `odporOhmKm` se shoduje.
3. **95 a 120 mm² (karta K-VODIC-0037):** Lapp T11 (kopie Miltronic Denmark, s. 1026, MD5 9b6eb475a6fb9e6e8a20e9d9c0eda271), řádky 95 a 120, sloupec „of bare copper wire – Class 5 + 6“: 0,206 a 0,161 Ω/km (čteno podle souřadnic, sloupec x ≈ 509 pt pod nadpisem „Class 5 + 6“ u „bare“). Totéž v kopii Lapp USA s. 141. Nezávisle: Bayka, tabulka Conductor Resistance „acc. to EN 60228“, třída 5, měď holá: 95 mm² 0,206, 120 mm² 0,161 Ω/km (pocínovaná 0,21 a 0,164). Obě hodnoty `odporOhmKm` se shodují.
4. **`rho` = odporOhmKm × prurez / 1000, 4 desetinná místa** (Python, Decimal, zaokrouhlení polovina nahoru):

| průřez | odpor | přesně | zaokr. | v souboru |
| --- | --- | --- | --- | --- |
| 0,5 | 37,1 | 0,01855 | 0,0186 | 0,0186 |
| 0,75 | 24,7 | 0,018525 | 0,0185 | 0,0185 |
| 1 | 18,5 | 0,0185 | 0,0185 | 0,0185 |
| 1,5 | 12,7 | 0,01905 | 0,0191 | 0,0191 |
| 2,5 | 7,6 | 0,019 | 0,0190 | 0,019 |
| 4 | 4,71 | 0,01884 | 0,0188 | 0,0188 |
| 6 | 3,14 | 0,01884 | 0,0188 | 0,0188 |
| 10 | 1,82 | 0,0182 | 0,0182 | 0,0182 |
| 16 | 1,16 | 0,01856 | 0,0186 | 0,0186 |
| 25 | 0,743 | 0,018575 | 0,0186 | 0,0186 |
| 35 | 0,527 | 0,018445 | 0,0184 | 0,0184 |
| 50 | 0,368 | 0,0184 | 0,0184 | 0,0184 |
| 70 | 0,259 | 0,01813 | 0,0181 | 0,0181 |
| 95 | 0,206 | 0,01957 | 0,0196 | 0,0196 |
| 120 | 0,161 | 0,01932 | 0,0193 | 0,0193 |

5. **Pole `karta`:** 0,5–70 mm² → K-VODIC-0001, 95 a 120 mm² → K-VODIC-0037. Správně.

**Nesouhlasící položky: žádné.**

## Upozornění (není chyba dat)

- 1,5 mm² je přesně na polovině (0,01905). Polovina nahoru dává 0,0191 (v souboru), bankéřské zaokrouhlení 0,0190. Navíc v JavaScriptu `12.7 * 1.5 / 1000` = 0,019049999999999997 a `toFixed(4)` vrátí „0.0190“. Engine a golden test proto mají `rho` číst ze souboru, ne přepočítávat v plovoucí čárce; kdo bude soubor kontrolovat skriptem, musí počítat v desítkové aritmetice. Specifikace způsob zaokrouhlení neuvádí; hodnota 0,0191 je konzervativnější (vyšší odpor).
