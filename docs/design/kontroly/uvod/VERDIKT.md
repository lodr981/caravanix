# Kontrola: `/cs/` – zatraktivnění kalkulaček (17. 11. 2026)

**Verdikt: SCHVÁLENO** (designér, 1. kolo; drobnosti opravené přímo v kódu)

Co se změnilo (podklad `docs/design/INSPIRACE.md`):

- Hlavní kalkulačka (soběstačnost) má vlastní větší kartu: štítek „Začněte tady“, ikona, větší nadpis, primární tlačítko se šipkou a tmavý „displej“ s tokem energie slunce → panel → baterie → vůz (dekorativní, `aria-hidden`; pod 26 rem skrytý, nic nesděluje).
- Ostatní karty mají ikonu v kroužku měkké mědi vedle názvu a sekundární tlačítko, na desktopu ve třech sloupcích.
- Opraveno během kontroly: ikony z `@caravanix/ui` v Astro musí dostat `className` (ne `class`), jinak se na ně neuplatní styl; při 200 % přetékala šipka v tlačítku → pod 26 rem skrytá.

Automatická kontrola (`tools/design/screenshoty.mjs`, 7 variant: 360 / 768 / 1280 px světlý i tmavý, 360 px při 200 %): **bez nálezů** (přetečení, okraj, písmo, řezy, cíle 48 px a mezery, kontrast vykreslených barev, tabulkové číslice, režim bez bliknutí). Obrázky prohlédnuty nástrojem Read.

- [x] Do 3 vteřin je jasné, co stránka dělá; příklady nabízejí rozumné zadání.
- [x] Hlavní výsledek zůstává největší a nejkontrastnější prvek (displej); vizualizace jsou až pod ním a menší.
- [x] Pravidla kapitoly 2: popisky nad poli, `inputmode="decimal"`, tlačítka − / + mají přístupný název, ikony jen vedle textu, stav barvou + ikonou + slovem.
- [x] Animace jen změna velikosti pruhů a nádrže (200 ms), při omezeném pohybu vypnuté.
- [x] Žádné cizí logo, vlastní SVG ikony.

---

# Kontrola: úvodní stránka (`/cs/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu)

Screenshoty `uvod-*.jpg` (360 / 768 / 1280 px, světlý i tmavý, 360 px při 200 %), `node tools/design/screenshoty.mjs --rez`. Automatické kontroly po opravách bez nálezů, kontrast všech textů alespoň 7 : 1.

## Kontrolní seznam

- [x] Do 3 vteřin je jasné, k čemu web je (nadpis, úvodní věta, karta kalkulačky s tlačítkem).
- [x] Hlavní výsledek: stránka výsledek nemá; nejvýraznější je hlavní akce (tlačítko kalkulačky).
- [x] Pravidla kapitoly 2.
- [x] Nic nepřetéká ani při 200 % (po opravě).
- [x] Tmavý režim je stejně čitelný.
- [x] Bez animací. Žádné cizí logo ani fotka. Česká typografie v pořádku.
- [x] Klidné, ne prázdné (pro rozcestník interní alfy).

## Co jsem opravil

1. Mezera mezi sekcemi „Kalkulačky“ a „Příručka“ byla dvojnásobná (asi 150 px) → sjednocené odsazení sekcí.
2. Seznam lekcí: odrážky s pomlčkou a řádky přes 140 znaků → styl `cx-linklist` (odkaz jako název, zásada pod ním, šířka nejvýš 36 em).
3. Karta kalkulačky přes celou šířku 1 200 px s krátkým obsahem → nejvýš 40 rem.
4. Při 200 % zasahoval nadpis H2 do okraje → položky mřížky `minmax(0, 1fr)`, nadpisy `overflow-wrap: break-word` (Chromium česky nedělí slova). Odstavce mají `text-wrap: pretty` (žádné osamocené „se“ na posledním řádku).
5. Navigace přesunutá do layoutu (stejná na všech stránkách).

## Zbývá / nálezy

- Text tlačítka v kartě opakuje nadpis karty („Průřez kabelu a pojistka“ dvakrát pod sebou). Pro autora: vlastní klíč, například „Spočítat průřez“ (`content/cs/web.json`, neměnil jsem).
- Úvod je rozcestník alfy. Vzor hlavní stránky (`ZADANI_DESIGNU.md`, krok 4) schvaluje Radek; tato kontrola ho nenahrazuje.

## 2. kolo (16. 11. 2026, commit bfaf300): SCHVÁLENO

Tlačítko v kartě kalkulačky je teď „Spočítat průřez“ a už neopakuje nadpis karty; můj nález z 1. kola je vyřízený. Screenshoty výše přepsané, automatické kontroly bez nálezů, kontrast alespoň 7 : 1. Nic jsem neopravoval.

## 3. kolo (16. 11. 2026, commit 39cb75e): SCHVÁLENO

Kontrola nové úvodní stránky se sedmi kalkulačkami a navigací „Kalkulačky“ / „Příručka“. Screenshoty `uvod-*.jpg` přepsané (`node tools/design/screenshoty.mjs /cs/ uvod uvod` po `npm run build`), automatické kontroly ve všech 7 variantách bez nálezů.

Co jsem opravil:

1. **200 %:** karty kalkulaček zasahovaly do pravého okraje o 11 px (mřížka `.karty` bez sloupce `minmax(0, 1fr)`) → opraveno.
2. **Karty ve dvou sloupcích:** v řádku s různě dlouhým textem se volné místo rozdělilo mezi nadpis, text a tlačítko (text „visel“ uprostřed karty) → řádky karty `auto 1fr auto`, odstavec bez okrajů; tlačítka v jednom řádku karet jsou ve stejné výšce.

Zbývá (nebrání vydání alfy): Soběstačnost je hlavní kalkulačka, ale vizuálně je rovnocenná ostatním šesti; na vzor hlavní stránky zvážit větší první kartu přes celou šířku.
