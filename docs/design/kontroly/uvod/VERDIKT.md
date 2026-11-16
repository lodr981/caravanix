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
