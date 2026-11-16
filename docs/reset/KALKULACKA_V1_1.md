# Kalkulačka průřezu v1.1: uzavření debaty (Radek, 16. 11. 2026)

Tento soubor **nahrazuje body 7–10 z `ODPOVEDI_2026-11-16.md` a celé `ODPOVEDI_2026-11-16b.md`** v části o výpočtu. Design, licence, název a repozitář z nich platí dál.

## Základ: verze 1 platí

Výpočet z reference v1 (11. 11. 2026) zůstává. Důvod jednou větou: tabulka VDE 0298-4 je pro PVC kabel 70 °C, automobilový kabel FLRY-B (ISO 6722, třída B) snese 105 °C a zatížitelnost roste s odmocninou dovoleného oteplení:

√((105 − 30) / (70 − 30)) ≈ 1,37

Stejný vzorec dává přesně koeficienty IEC pro PVC 70 °C (0,87 při 40 °C, 0,50 při 60 °C). Proto:

- svazek: 0,53 × 1,37 ≈ 0,73 → koeficient 0,7 z v1 platí
- plus a mínus vedle sebe na povrchu: 0,76 × 1,37 ≈ 1,04 → koeficient 1,0 z v1 platí
- stropy CAPN a CAPH (praxe autoelektriky) platí jako rozhodnutí odborníka

Karty K-VODIC-0003 a 0004 přepiš na tento základ (rozhodnutí odborníka + výpočet výše). Ověřovatel zkontroluje jen výpočet a to, že FLRY-B je třída 105 °C. Pak jdou do přehledu ke schválení.

## Změny ve v1.1 (jen tyto čtyři)

1. **Pojistka ≥ 1,25 × proud** místo 1,1×. Nožová pojistka pak při trvalé zátěži nepálí zbytečně.
2. **300 A ze seznamu pojistek pryč** (MEGA 300 A je jen zkratová ochrana). Mez rozsahu se počítá jako největší pojistka ÷ 1,25 = 200 A, ne pevných 240 A. Nad mezí hláška: „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“
3. **Nad 150 A** navíc hláška: „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“
4. Režim **„Ve svazku / motorový prostor“ se přejmenuje na „Ve svazku“**. Výpočet zůstává (0,7, ρ 0,0216). Pod volbami bude text: „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C nebo D) a dimenzujte podle tabulky jeho výrobce.“

## Texty u kalkulačky

- U výsledku: „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“
- CCA: znění ověřovatele, doporučení „do vozu jen čistou měď“.
- Pojistka u baterie: „co nejblíž, nejvýš 17,5 cm“ (ABYC E-11).
- Rychlý vzorec 10 × A ÷ I vypustit.

## Co se nemění a do v1.1 nepatří

- ρ zůstává 0,0175. Rozdíl proti skutečnému lanku mění úbytek o desetiny procentního bodu a na rozhodnutí uživatele nemá vliv. V kartě K-VODIC-0001 jen poznámka.
- Do `docs/ZASOBNIK.md`, sekce „Kalkulačka průřezu v2, jen při konkrétním nebezpečném případu“, jdou: tabulky pojistek podle jednotlivých hodnot, rodiny pojistek ve výpočtu, koeficienty 0,76 / 0,53 / 0,5, tabulka odporu podle průřezu a tabulky kabelů pro 125/150 °C.
- Informativní zobrazení rodiny pojistky podle hodnoty (do 30 A nožová, 40–125 A MIDI, nad 125 A MEGA) se může přidat do nákupního lístku. Výpočet nemění.

## Testy

Tester upraví nezávislou referenci: v1 a změny 1–4. Golden test proti ní. Hotovo, když projde.
