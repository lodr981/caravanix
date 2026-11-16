# Kontrola: kalkulačka měniče (`/cs/kalkulacka-menice/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu, commit 39cb75e + pracovní kopie)

Screenshoty `kalkulacka-menice-*.jpg` (`node tools/design/screenshoty.mjs /cs/kalkulacka-menice/ kalkulacka-menice` po `npm run build`): 360 / 768 / 1280 px, světlý i tmavý režim, 360 px při 200 %. Automatické kontroly po opravách bez nálezů ve všech 7 variantách (přetečení, okraj stránky, písmo, tenké řezy, dotykové cíle a mezery, kontrast vykreslených barev, tabulkové číslice, písmo, režim bez bliknutí, žádná cookie).

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

1. **Karta spotřebiče:** název spotřebiče ořezaný („Kávovar“, „Notebook“) → textové pole přes celou šířku sloupce.
2. **Zaškrtávátko „Běží současně s ostatními“:** stejná oprava jako u spotřebičů (nesmršťuje se, cílem je celý popisek).
3. **Odebrat:** zarovnání jako u spotřebičů; pole v kartě zarovnaná nahoru, takže nápověda pod „Rozběhem“ už neposouvá štítky sousedních polí.
4. **200 %:** sekce zasahovala do pravého okraje o 11 px (sloupec `auto`) → opraveno mřížkou rámce.

Společné opravy rámce kalkulaček (platí pro všech šest stránek):

- Mřížky `.kalk`, `.kalk-blok`, `.kalk-mrizka`, `.kalk-seznam`, `.kalk-polozka` mají sloupec `minmax(0, 1fr)`; dřív se sloupec `auto` roztáhl podle nejširšího obsahu a při 200 % stránka přetékala (`KalkStranka.astro`).
- Výběr (select) v `.cx-input` má vlastní styl v `packages/ui`: výška 48 px, písmo 20 px tučně jako číselná pole, šipka, fokus rámečku, šířka nejvýš 22 rem.
- Hláška v úzkém sloupci (pod 20 rem) láme dlouhá slova (`packages/ui`), při 200 % už nevyčnívá z karty výsledku.
- Nástroj `tools/design/screenshoty.mjs`: zaškrtávátko uvnitř popisku měří jako celý popisek (ten je dotykovým cílem, aspoň 48 px vysoký) a kontroly čekají na doběhnutí animací po hydrataci (jinak měřil roztmívané číslo jako kontrast 2,55 : 1).

## Nález pro autora (`content/cs/kalkulacky-alfa.json`, neměnil jsem)

- Nápověda „Rozběh“ se opakuje v každé kartě spotřebiče. Je krátká a čitelná, nevadí; jen zvážit, jestli by nestačila jednou nad seznamem.
