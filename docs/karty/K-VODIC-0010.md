---
id: K-VODIC-0010
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka volí pojistku z řady 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250 A; 300 A v řadě není, protože pojistka MEGA 300 A je podle výrobce jen ochrana proti zkratu."
hodnota: null
jednotka: "A"
rozsah: [1, 250]
podminky: "Řada FUSES z reference v1 bez 300 A (v1.1, změna 2), 23 hodnot. Pojistka se volí jako nejbližší hodnota z řady alespoň 1,25 × proud (K-VODIC-0011); největší pojistka 250 A dává mez rozsahu 250 ÷ 1,25 = 200 A (K-VODIC-0036). Stejná řada platí pro max. pojistku kabelu (K-VODIC-0009). Rodina pojistky je jen informativní (nákupní lístek), výpočet nemění: do 30 A nožová, 35 A také nožová (rozhodnutí mistra), 40–125 A šroubovací MIDI, nad 125 A (150–250 A) MEGA. Hodnoty řady existují v těchto rodinách Littelfuse: nožová ATOF 1–40 A (bez 4 A ve řadě kalkulačky), MIDI pro přetížení 30–125 A (150–200 A jen zkrat), MEGA pro přetížení 40–250 A (300–500 A jen zkrat). Výběr hodnot řady je rozhodnutí Radka (v1, v1.1)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: řada FUSES v1 (11. 11. 2026) a v1.1, změna 2 (16. 11. 2026)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „v1.1, změna 2: 300 A ze seznamu pojistek pryč; mez rozsahu = největší pojistka ÷ 1,25 = 200 A …“; řádek „v1.1 … Informativní rodina pojistky podle hodnoty (do 30 A nožová, 40–125 A MIDI, nad 125 A MEGA) smí být v nákupním lístku, výpočet nemění.“; docs/KALKULACKA_PRUREZU.md, Verze 1.1, Čtyři změny bod 2; pole FUSES v docs/reference/kalkulacka-prurezu-v1.html"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Mistr: 35 A v nákupním lístku jako nožová pojistka"
    url: "docs/STAV.md"
    misto: "Zadání pro rešeršéra: karty pro v1.1 (úkol K-04), bod 7"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: 40–250 A pro trvalý proud, 300–500 A „only for short circuit protection“; s. 2 Ratings 40–500 A, pozn. 2 Short Circuit Protector only (300–500 A)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 2 Ratings: 1, 2, 3, 4, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 A; s. 1 ISO 8820-3"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MIDI, Clear MIDI, One-Hole MIDI Style Bolt-down Fuse Rated 32V (Revised 09/13/2023), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/675/DOC038675898.pdf"
    misto: "s. 2 Ratings: 30, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200 A; Note 1 Short Circuit Protector only (150–200 A)"
    datum-overeni: 2026-11-16
vypocet: "Řada FUSES v1 (24 hodnot) bez 300 A = 23 hodnot, vzestupně, největší 250 A; 250 / 1,25 = 200 A. Rodiny (informativně): nožová 1–35 A (11 hodnot, všechny v ATOF s. 2), MIDI 40–125 A (7 hodnot, všechny v MIDI s. 2 bez poznámky 1), MEGA 150–250 A (5 hodnot, všechny v MEGA s. 2 bez poznámek 1 a 2); 11 + 7 + 5 = 23. Kontrola v Node: I = 200 A → 250 A; I = 200,0001 A → žádná pojistka (HLAVNI_VEDENI)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0010-2026-11-16-v11.md
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Tvrzení verze 2 (jen ATOF / MIDI / MEGA ve výpočtu, 22 hodnot bez 35 A, výběr podle tabulky I30) je nahrazené řadou FUSES v1.1: 23 hodnot včetně 35 A, bez 300 A. Důvod, proč 300 A chybí, je převzatý z K-VODIC-0033: MEGA 300 A je podle Littelfuse jen ochrana proti zkratu. Rodina pojistky je jen informativní údaj pro nákupní lístek (35 A nožová podle rozhodnutí mistra), výpočet nemění. MAXI datasheet je vypuštěný, ve v1.1 nemá úlohu. Stav `navrh`, `overil` vynulováno.

Poznámka k 35 A: podle tabulky Littelfuse ATOF (K-VODIC-0029, archiv) snese ATOF 35 A trvale 35 A při 20 °C a 29 A při 65 °C. Kalkulačka ho volí jen pro proud do 28 A (35 ÷ 1,25), takže vyhoví. ISO 8820-3 a -5 jsem neotevřel (placené).

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** (1) Řada bez 300 A podle verze 2 (Radek 16. 11. 2026); důvod (MEGA 300 A jen zkrat) je v tvrzení. (2) Hodnoty 50 a 70 A doloženy datasheety MIDI (zdroj dohledal ověřovatel, otevřel jsem ho) a MAXI. (3) Do podmínek doplněna omezení „jen proti zkratu“ (MIDI 150–200 A, MEGA ≥ 300 A) a MEGA 40/60 A mimo ISO. (4) Mez rozsahu už není text „nad 240 A“, ale z tabulky: nad 200 A (hláška HLAVNI_VEDENI). Poměr 1,25 je dočasný do rozhodnutí o rodinách (K-VODIC-0011).

ISO 8820-3 a -5 jsem neotevřel (placené). Hodnota 4 A (ATOF, MINI) v řadě kalkulačky není; to je volba řady, ne chyba.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta byla `overeno` pro řadu FUSES 1–250 A (23 hodnot, bez rodin). Radek ve 2. kole určil rodiny a nabízené hodnoty (22 hodnot: bez 35 A, bez MINI a MAXI). Tvrzení se mění, stav zpět na `navrh`. Zdroje (datasheety ATOF, MAXI, MIDI, MEGA) zůstávají; MAXI je teď jen doklad, proč se nenabízí. Mez rozsahu už není 250 / 1,25 = 200 A, ale I30 MEGA 250 A = 199,889 A (K-VODIC-0038).

**Poznámka mistra (16. 11. 2026):** tvrzení je v2 (Littelfuse ATOF/MIDI/MEGA ve výpočtu). Ve v1.1 platí seznam FUSES z v1 bez 300 A; karta se přepíše podle zadání v docs/STAV.md. Rodina pojistky je ve v1.1 jen informativní v nákupním lístku.
