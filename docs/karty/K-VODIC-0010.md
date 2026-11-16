---
id: K-VODIC-0010
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka vybírá pojistku z řady jmenovitých hodnot automobilových pojistek 1 až 250 A (1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250 A); 300 A v řadě není, protože MEGA 300 A je jen ochrana proti zkratu."
hodnota: null
jednotka: "A"
rozsah: [1, 250]
podminky: "Nožové pojistky (ISO 8820-3: ATOF 1–40 A, MINI 2–30 A, MAXI 20–80 A) a šroubovací (ISO 8820-5: MIDI 30–125 A pro přetížení, MEGA 40–250 A pro přetížení). Jen ochrana proti zkratu: MIDI 150–200 A, MEGA 300–500 A. MEGA 40 a 60 A Littelfuse uvádí jako „not mentioned in ISO standards“. Proud, pro který žádná hodnota řady nesplní f ≥ 1,25 × I (I > 200 A), kalkulačka nepočítá a hlásí hlavní vedení (K-VODIC-0036). Který typ pojistky pro kterou hodnotu: K-VODIC-0029 až 0033 a docs/karty/POJISTKY_RODINY.md (zatím bez rozhodnutí)."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 2 Ratings: 1, 2, 3, 4, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 A; s. 1 Complies with SAE J1284, ISO 8820-3"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MAXI Blade Fuses Rated 32V (Revised 10/26/2022), kopie Enika.eu"
    url: "https://www.enika.eu/data/files/produkty/komponenty/jisteni/Littelfuse_MAXI_32V_Datasheet_2022.pdf"
    misto: "s. 2 Ratings: 20, 25, 30, 35, 40, 50, 60, 70, 80 A; s. 1 ISO 8820-3"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MIDI, Clear MIDI, One-Hole MIDI Style Bolt-down Fuse Rated 32V (Revised 09/13/2023), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/675/DOC038675898.pdf"
    misto: "s. 2 Ratings: 30, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200 A; Note 1 Short Circuit Protector only (150–200 A); s. 1 ISO 8820-5:2015"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: 40–250 A SLO-BLO pro trvalý proud, 300–500 A jen ochrana proti zkratu; ISO 8820-5. s. 2 Ratings: 40, 60, 80, 100, 125, 150, 175, 200, 225, 250, 300 … 500 A; pozn. 1 Not mentioned in ISO standards (40, 60 A); pozn. 2 Short Circuit Protector only (300–500 A)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, řada FUSES bez 300 A, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 o výpočtu verze 2 („bez 300 A, mez rozsahu z tabulky pojistek“); docs/KALKULACKA_PRUREZU.md, tabulka Změny proti v1"
    datum-overeni: 2026-11-16
vypocet: "Každá hodnota řady doložena aspoň jednou rodinou pro přetížení: 1 ATOF; 2, 3, 5, 7,5, 10, 15 ATOF a MINI; 20, 25, 30 ATOF, MINI, MAXI (30 i MIDI); 35 ATOF a MAXI; 40 ATOF, MAXI, MIDI, MEGA; 50, 70 MAXI a MIDI; 60, 80 MAXI, MIDI, MEGA; 100, 125 MIDI a MEGA; 150, 175, 200, 225, 250 MEGA. Mez rozsahu: 250 / 1,25 = 200,0 A."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) Řada bez 300 A podle verze 2 (Radek 16. 11. 2026); důvod (MEGA 300 A jen zkrat) je v tvrzení. (2) Hodnoty 50 a 70 A doloženy datasheety MIDI (zdroj dohledal ověřovatel, otevřel jsem ho) a MAXI. (3) Do podmínek doplněna omezení „jen proti zkratu“ (MIDI 150–200 A, MEGA ≥ 300 A) a MEGA 40/60 A mimo ISO. (4) Mez rozsahu už není text „nad 240 A“, ale z tabulky: nad 200 A (hláška HLAVNI_VEDENI). Poměr 1,25 je dočasný do rozhodnutí o rodinách (K-VODIC-0011).

ISO 8820-3 a -5 jsem neotevřel (placené). Hodnota 4 A (ATOF, MINI) v řadě kalkulačky není; to je volba řady, ne chyba.
