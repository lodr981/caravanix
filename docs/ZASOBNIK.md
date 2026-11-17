# Zásobník

Co nepatří do aktuální fáze. Nestaví se, jen se zapisuje.

- Němčina, polština, angličtina (profily zemí de, pl, en)
- Návrh projektu (průvodce v devíti krocích), obrázková a technická schémata, tabulka kabelů, kusovník s odkazy, štítky, montážní postup, karta nastavení zařízení
- Stavba vlastní LiFePO4 baterie s JK BMS
- Ostrovní systém pro chatu
- Modul vody
- Účty, platby, kabelové sady a předzapojené desky
- Nápady skupiny B u kalkulačky průřezu (CCA, teplota okolí, 48 V, odpor kostry, pomalá pojistka)
- Lekce o nabíjení na stojanech pro elektromobily (až po ověření)
- Vlastní měření spotřebičů
- Kalkulačka průřezu: motorový prostor s tabulkami zatížitelnosti kabelů 105/125/150 °C
- Kalkulačka průřezu: volba počtu obvodů ve svazku (4 a víc)
- Kalkulačka průřezu: teplota okolí nad 30 °C jako vstup

## Kalkulačka průřezu v2, jen při konkrétním nebezpečném případu

(Reset 16. 11. 2026, `docs/reset/KALKULACKA_V1_1.md`.) Hotový kód a data zůstávají v repu jako archiv: `packages/engine/src/vodic-v2.ts`, `packages/data/src/odpor-vodicu.json`, `packages/data/src/pojistky.json`, karty K-VODIC-0029–0038.

- tabulky pojistek podle jednotlivých hodnot (Littelfuse, I30) a rodiny pojistek ve výpočtu
- koeficienty uložení 0,76 / 0,53 / 0,5
- tabulka odporu podle průřezu (FLRY-B, IEC 60228)
- tabulky kabelů pro 125/150 °C (motorový prostor)

## Pro právníka před betou s platbami

- Rešerše ochranné známky Caravanix (třídy 9, 12, 35, 41, 42) a rozlišovací způsobilost jména se základem „caravan“.

## Rastrové obrázky přes Mistral (odloženo 17. 11. 2026)

- `POST /v1/agents` vrací 403 „Creating agents is not available for this organization. Use Managed Agents instead.“ Buď povolit Agents API v účtu Mistral, nebo upravit `tools/obrazek.mjs` na Managed Agents.
- Připravené prompty (styl Dílna, plochá teplá ilustrace, měď jako akcent, bez textu, log, výrobků a zapojení): maskot = malá kulatá obytná dodávka s laskavým obličejem a měděným boxem na střeše; scéna k lekci o alternátoru = unavená dodávka na venkovské silnici, na střeše malá měděná postavička zvedá ruku „stop“; scéna k lekci o zimě = dodávka s pletenou měděnou šálou na zasněžené horské silnici.
