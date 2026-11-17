# Kontrola: `/cs/kalkulacka-baterie/` – zatraktivnění kalkulaček (17. 11. 2026)

**Verdikt: SCHVÁLENO** (designér, 1. kolo; drobnosti opravené přímo v kódu)

Co se změnilo (podklad `docs/design/INSPIRACE.md`):

- Typické příklady, posuvníky u spotřeby, dní bez nabíjení a kapacity.
- Potřebná baterie: pruhy „Potřebujete / Máte“ (čísla z enginu a ze zadání).
- Výdrž: nádrž s dílky po dnech (do 14 dní), popisek „Jeden dílek je jeden den spotřeby“.

Automatická kontrola (`tools/design/screenshoty.mjs`, 7 variant: 360 / 768 / 1280 px světlý i tmavý, 360 px při 200 %): **bez nálezů** (přetečení, okraj, písmo, řezy, cíle 48 px a mezery, kontrast vykreslených barev, tabulkové číslice, režim bez bliknutí). Obrázky prohlédnuty nástrojem Read.

- [x] Do 3 vteřin je jasné, co stránka dělá; příklady nabízejí rozumné zadání.
- [x] Hlavní výsledek zůstává největší a nejkontrastnější prvek (displej); vizualizace jsou až pod ním a menší.
- [x] Pravidla kapitoly 2: popisky nad poli, `inputmode="decimal"`, tlačítka − / + mají přístupný název, ikony jen vedle textu, stav barvou + ikonou + slovem.
- [x] Animace jen změna velikosti pruhů a nádrže (200 ms), při omezeném pohybu vypnuté.
- [x] Žádné cizí logo, vlastní SVG ikony.

---

# Kontrola: kalkulačka velikosti baterie (`/cs/kalkulacka-baterie/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu, commit 39cb75e + pracovní kopie)

Screenshoty `kalkulacka-baterie-*.jpg` (`node tools/design/screenshoty.mjs /cs/kalkulacka-baterie/ kalkulacka-baterie` po `npm run build`): 360 / 768 / 1280 px, světlý i tmavý režim, 360 px při 200 %. Automatické kontroly po opravách bez nálezů ve všech 7 variantách (přetečení, okraj stránky, písmo, tenké řezy, dotykové cíle a mezery, kontrast vykreslených barev, tabulkové číslice, písmo, režim bez bliknutí, žádná cookie).

## Kontrolní seznam

- [x] Do 3 vteřin je jasné, co stránka dělá a co zadat (nadpis, věta pod ním, popisky nad poli).
- [x] Hlavní výsledek je největší a nejkontrastnější prvek (tmavý displej s velkým číslem).
- [x] Pravidla kapitoly 2: písmo, kontrast nástrojem (texty alespoň 7 : 1), cíle 48 × 48 px a mezery 8 px, popisky nad poli, stav barvou + ikonou + slovem.
- [x] Nic nepřetéká ani při 200 % (po opravách).
- [x] Tmavý režim je stejně čitelný.
- [x] Animace jen roztmívání čísla, při omezeném pohybu vypnuté.
- [x] Žádné cizí logo ani fotka.
- [x] Česká typografie (nezlomitelné mezery u jednotek, desetinná čárka, „uvozovky“).
- [x] Působí klidně, ne prázdně ani přeplácaně; drží vzor kalkulačky průřezu (rámec `KalkStranka.astro`).

## Co jsem opravil

Na stránce nic; automatické kontroly byly bez nálezů už v 1. běhu. Přepínač napětí se dvěma řádky (12 V / 4 články, 12,8 V) je čitelný v obou režimech, dva oddělené výsledky („Jakou baterii potřebuji“, „Kolik vydrží moje baterie“) mají každý vlastní nadpis a pole.

Společné opravy rámce kalkulaček (platí pro všech šest stránek):

- Mřížky `.kalk`, `.kalk-blok`, `.kalk-mrizka`, `.kalk-seznam`, `.kalk-polozka` mají sloupec `minmax(0, 1fr)`; dřív se sloupec `auto` roztáhl podle nejširšího obsahu a při 200 % stránka přetékala (`KalkStranka.astro`).
- Výběr (select) v `.cx-input` má vlastní styl v `packages/ui`: výška 48 px, písmo 20 px tučně jako číselná pole, šipka, fokus rámečku, šířka nejvýš 22 rem.
- Hláška v úzkém sloupci (pod 20 rem) láme dlouhá slova (`packages/ui`), při 200 % už nevyčnívá z karty výsledku.
- Nástroj `tools/design/screenshoty.mjs`: zaškrtávátko uvnitř popisku měří jako celý popisek (ten je dotykovým cílem, aspoň 48 px vysoký) a kontroly čekají na doběhnutí animací po hydrataci (jinak měřil roztmívané číslo jako kontrast 2,55 : 1).
