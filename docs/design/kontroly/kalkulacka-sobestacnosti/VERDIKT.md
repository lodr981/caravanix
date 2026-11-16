# Kontrola: kalkulačka soběstačnosti (`/cs/kalkulacka-sobestacnosti/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu, commit 39cb75e + pracovní kopie)

Screenshoty `kalkulacka-sobestacnosti-*.jpg` (`node tools/design/screenshoty.mjs /cs/kalkulacka-sobestacnosti/ kalkulacka-sobestacnosti` po `npm run build`): 360 / 768 / 1280 px, světlý i tmavý režim, 360 px při 200 %. Automatické kontroly po opravách bez nálezů ve všech 7 variantách (přetečení, okraj stránky, písmo, tenké řezy, dotykové cíle a mezery, kontrast vykreslených barev, tabulkové číslice, písmo, režim bez bliknutí, žádná cookie).

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

1. **Výběry Místo a Měsíc:** byly nestylované (výška asi 25 px, malé písmo prohlížeče, pod pravidlem 48 px) a dlouhý název města („České Budějovice“) roztáhl při 200 % stránku o 26 px → styl selectu v `packages/ui` (48 px, 20 px tučně, šipka, fokus), šířka nejvýš 22 rem.
2. **Graf průběhu baterie:** sloupce bez měřítka → osa 100 / 50 / 0 %, vodorovná čára 50 %, popisky „1. den“ a „30. den“ pod grafem (čísla a existující klíč `sb.den`, žádný nový text), obrys grafu v barvě `--cx-border` (grafika alespoň 3 : 1 i v tmavém režimu). Dny s **prázdnou baterií** byly 3 px vysoké a skoro neviditelné → pevný pruh 6 px v barvě bloku (světlý režim tmavě červená, tmavý světle růžová), jasně odlišený od měděných sloupců. Na úzkém displeji mezera mezi sloupci 1 px, při 200 % nepřetéká.
3. **Bilance po měsících:** při 200 % hodnota „−688 Wh“ přetékala (mřížka `1fr auto`) → řádek se zalomí (měsíc, hodnota, „solár nestačí“). Stav nese okraj barvou i slovo „stačí / nestačí“.
4. **Mřížka polí ve dvou sloupcích:** na desktopu dvojice zarovnané nahoru, nápovědy pod poli nerozhazují řádky; na mobilu jeden sloupec.

Společné opravy rámce kalkulaček (platí pro všech šest stránek):

- Mřížky `.kalk`, `.kalk-blok`, `.kalk-mrizka`, `.kalk-seznam`, `.kalk-polozka` mají sloupec `minmax(0, 1fr)`; dřív se sloupec `auto` roztáhl podle nejširšího obsahu a při 200 % stránka přetékala (`KalkStranka.astro`).
- Výběr (select) v `.cx-input` má vlastní styl v `packages/ui`: výška 48 px, písmo 20 px tučně jako číselná pole, šipka, fokus rámečku, šířka nejvýš 22 rem.
- Hláška v úzkém sloupci (pod 20 rem) láme dlouhá slova (`packages/ui`), při 200 % už nevyčnívá z karty výsledku.
- Nástroj `tools/design/screenshoty.mjs`: zaškrtávátko uvnitř popisku měří jako celý popisek (ten je dotykovým cílem, aspoň 48 px vysoký) a kontroly čekají na doběhnutí animací po hydrataci (jinak měřil roztmívané číslo jako kontrast 2,55 : 1).

## Nálezy pro autora a hlavní vlákno (neměnil jsem)

- **Stav „Pozor“ bez vysvětlení:** při záporné bilanci v létě (výchozí stav: Praha, červenec) ukazuje karta výsledku jen „Pozor“ s ikonou, bez věty; hláška `ZIMA_MALO_SLUNCE` se v létě neukáže. Laik neví, na co si dát pozor. Doplnit hlášku pro zápornou bilanci (například „Baterie se každý den vybije víc, než ji dobijete.“) – text pro `autor-zeme`, zobrazení v `KalkSobestacnost.tsx`.
- **Graf bez slovní legendy pro prázdnou baterii:** pruh je odlišený tvarem i barvou a počet dní je ve výsledku, slovní vysvětlení ale chybí. Do `sb.prubehNote` doplnit například „Nízký červený pruh: baterie je prázdná.“
- Bilance po měsících: zvolený měsíc není v seznamu zvýrazněný (návrh na příští kolo, nebrání vydání).
