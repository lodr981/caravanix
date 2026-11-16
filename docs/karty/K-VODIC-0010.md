---
id: K-VODIC-0010
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka nabízí jen pojistky Littelfuse pro ochranu proti přetížení: nožové ATOF 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A, šroubovací MIDI 40, 50, 60, 70, 80, 100, 125 A a MEGA 150, 175, 200, 225, 250 A, a ukáže rodinu; MINI, MAXI a 35 A nenabízí a pojistky, které jsou podle výrobce jen ochranou proti zkratu (MIDI 150–200 A, MEGA 300 A a víc), nikdy."
hodnota: null
jednotka: "A"
rozsah: [1, 250]
podminky: "ATOF (ISO 8820-3) má v datasheetu 1–40 A, kalkulačka bere 1–30 A bez 4 A; MIDI (ISO 8820-5) chrání proti přetížení 30–125 A, kalkulačka bere 40–125 A; MEGA (ISO 8820-5) chrání proti přetížení 40–250 A, kalkulačka bere 150–250 A (MEGA 40 a 60 A Littelfuse uvádí jako „not mentioned in ISO standards“). Hodnota se volí podle tabulky dovoleného trvalého proudu (K-VODIC-0038); proud nad 199,9 A kalkulačka nepočítá a hlásí hlavní vedení (K-VODIC-0036). Výběr rodin a hodnot je rozhodnutí Radka."
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
    nazev: "Radek: pojistky podle tabulek Littelfuse, rodiny a nabízené hodnoty, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 (2. kolo) „Rodiny: nožová ATOF 1–30 A, šroubovací MIDI 40–125 A, MEGA 150–250 A; kalkulačka ukáže rodinu. MINI, MAXI a 35 A nenabízet; zkratové ochrany (MIDI 150–200 A, MEGA ≥ 300 A) nikdy.“; docs/KALKULACKA_PRUREZU.md, Verze 2, Nové datové tabulky"
    datum-overeni: 2026-11-16
vypocet: "Nabízené hodnoty v datasheetech: ATOF s. 2 obsahuje 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A (všech 10); MIDI s. 2 obsahuje 40, 50, 60, 70, 80, 100, 125 A (všech 7, žádná s poznámkou Short Circuit Protector only); MEGA s. 2 obsahuje 150, 175, 200, 225, 250 A (všech 5, bez poznámek 1 a 2). Celkem 22 hodnot, seřazeno vzestupně, každá jen v jedné rodině; shoda se souborem packages/data/src/pojistky.json zkontrolována v Node (počet, pořadí, rodina)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0010-2026-11-16-kolo3.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) Řada bez 300 A podle verze 2 (Radek 16. 11. 2026); důvod (MEGA 300 A jen zkrat) je v tvrzení. (2) Hodnoty 50 a 70 A doloženy datasheety MIDI (zdroj dohledal ověřovatel, otevřel jsem ho) a MAXI. (3) Do podmínek doplněna omezení „jen proti zkratu“ (MIDI 150–200 A, MEGA ≥ 300 A) a MEGA 40/60 A mimo ISO. (4) Mez rozsahu už není text „nad 240 A“, ale z tabulky: nad 200 A (hláška HLAVNI_VEDENI). Poměr 1,25 je dočasný do rozhodnutí o rodinách (K-VODIC-0011).

ISO 8820-3 a -5 jsem neotevřel (placené). Hodnota 4 A (ATOF, MINI) v řadě kalkulačky není; to je volba řady, ne chyba.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta byla `overeno` pro řadu FUSES 1–250 A (23 hodnot, bez rodin). Radek ve 2. kole určil rodiny a nabízené hodnoty (22 hodnot: bez 35 A, bez MINI a MAXI). Tvrzení se mění, stav zpět na `navrh`. Zdroje (datasheety ATOF, MAXI, MIDI, MEGA) zůstávají; MAXI je teď jen doklad, proč se nenabízí. Mez rozsahu už není 250 / 1,25 = 200 A, ale I30 MEGA 250 A = 199,889 A (K-VODIC-0038).

**Poznámka mistra (16. 11. 2026):** tvrzení je v2 (Littelfuse ATOF/MIDI/MEGA ve výpočtu). Ve v1.1 platí seznam FUSES z v1 bez 300 A; karta se přepíše podle zadání v docs/STAV.md. Rodina pojistky je ve v1.1 jen informativní v nákupním lístku.
