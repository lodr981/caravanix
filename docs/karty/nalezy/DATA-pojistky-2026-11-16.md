# Nález: packages/data/src/pojistky.json (verze 2026-11-16)

- Ověřovatel: overovatel, 16. 11. 2026
- **Verdikt: SEDÍ**

## Zdroje (otevřené kopie téže revize, littelfuse.com neobcházeno)

- ATOF Blade Fuses Rated 32V, Revised 08/18/2022 — https://static.chipdip.ru/lib/614/DOC034614307.pdf (MD5 6fbc51310f8aefb5772ad13f7e2913ac), s. 3 Temperature Table, sloupce −40/0/20/65/85/110/125 °C.
- MIDI Bolt-down Fuse Rated 32V, Revised 09/13/2023 — https://static.chipdip.ru/lib/675/DOC038675898.pdf (MD5 aa2956484ec138ff711823f4451aa772), s. 4 Temperature Table, sloupce **−20**/0/20/65/85/110/125 °C.
- MEGA and MEGA Clear Top Fuse Rated 32V, Revised 04/08/2024 — https://cdn.eicom.ru/media/PDF24/813744.pdf (MD5 c5852a06ab35c11b882e0ae52e2bead5), s. 4 Temperature Table, sloupce −40/0/20/65/85/110/125 °C.

Tabulky jsem četl podle souřadnic slov (PyMuPDF), sloupec 20 °C a 65 °C podle x-pozice hlavičky; legenda grafu, která leží ve stejné výšce (popisky „1A … 40A“ u x ≈ 356 pt), jsem vyřadil.

## Porovnání (I20 / I65 v A)

| rodina | jmen. | soubor I20/I65 | datasheet I20/I65 | shoda | I30 (bod 4) |
| --- | --- | --- | --- | --- | --- |
| ATOF | 1 | 1/1 | 1/1 | ano | 1,000 |
| ATOF | 2 | 2/2 | 2/2 | ano | 2,000 |
| ATOF | 3 | 3/3 | 3/3 | ano | 3,000 |
| ATOF | 5 | 5/4 | 5/4 | ano | 4,778 |
| ATOF | 7,5 | 7/6 | 7/6 | ano | 6,778 |
| ATOF | 10 | 10/8 | 10/8 | ano | 9,556 |
| ATOF | 15 | 14/12 | 14/12 | ano | 13,556 |
| ATOF | 20 | 18/15 | 18/15 | ano | 17,333 |
| ATOF | 25 | 23/19 | 23/19 | ano | 22,111 |
| ATOF | 30 | 27/23 | 27/23 | ano | 26,111 |
| MIDI | 40 | 38/32 | 38/32 | ano | 36,667 |
| MIDI | 50 | 50/45 | 50/45 | ano | 48,889 |
| MIDI | 60 | 58/48 | 58/48 | ano | 55,778 |
| MIDI | 70 | 70/59 | 70/59 | ano | 67,556 |
| MIDI | 80 | 80/72 | 80/72 | ano | 78,222 |
| MIDI | 100 | 100/85 | 100/85 | ano | 96,667 |
| MIDI | 125 | 124/104 | 124/104 | ano | 119,556 |
| MEGA | 150 | 135/114 | 135/114 | ano | 130,333 |
| MEGA | 175 | 149/125 | 149/125 | ano | 143,667 |
| MEGA | 200 | 166/140 | 166/140 | ano | 160,222 |
| MEGA | 225 | 175/148 | 175/148 | ano | 169,000 |
| MEGA | 250 | 207/175 | 207/175 | ano | 199,889 (přesně 1799/9) |

- **Výčet:** 22 položek, přesně nabízené hodnoty z kapitoly „Verze 2: co platí“ (ATOF 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30; MIDI 40–125; MEGA 150–250), žádná 4 A, 35 A, MINI, MAXI ani zkratová ochrana (MIDI 150–200 A mají v datasheetu poznámku 1 „Short Circuit Protector only“, MEGA 300–500 A poznámku 2; v souboru nejsou).
- **Pořadí:** vzestupně podle jmenovité hodnoty, každá hodnota v jedné rodině. I30 roste monotónně (žádná díra).
- **Pole `karta`:** všude K-VODIC-0038, která tyto hodnoty uvádí ve sloupcích 20/65 °C. Správně.

**Nesouhlasící položky: žádné.**

## Poznámky pro kartu a tester

- Největší I30 je 1799/9 = 199,8889 A (MEGA 250 A). Proud 199,889 A už nabízenou pojistku nemá (199,8889 < 199,889). Viz nález K-VODIC-0038.
- Tabulka MEGA neuvádí „Wire Cross Section … ISO 8820-3“ jako ATOF a MIDI, ale „Please contact Littelfuse for Details Regarding Derating Test Set-Up“. Na data to vliv nemá.
