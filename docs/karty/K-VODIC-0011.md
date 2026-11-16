---
id: K-VODIC-0011
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pojistka se volí jako nejbližší hodnota z řady (K-VODIC-0010), která je alespoň 1,25× proud spotřebiče; nožová pojistka pak při trvalé zátěži nepálí zbytečně."
hodnota: 1.25
jednotka: "násobek proudu spotřebiče"
rozsah: null
podminky: "Trvalý odběr, řada FUSES v1.1 bez 300 A. Mez rozsahu: největší pojistka 250 A ÷ 1,25 = 200 A; nad ní kalkulačka pojistku nevolí a hlásí hlavní vedení (K-VODIC-0036). Pojistka musí zároveň být nejvýš max. pojistka kabelu (K-VODIC-0009); kalkulačka podle toho volí průřez. Podpora z tabulky výrobce (Littelfuse ATOF): při okolí pojistky 20 °C stačí poměr 1,11×, při 65 °C je potřeba až 1,33×; 1,25 tedy pokrývá běžnou teplotu s rezervou, ve velmi teplém místě (kolem 65 °C) ne u všech hodnot. U spotřebičů s rozběhovým proudem rozhoduje časová charakteristika pojistky (K-VODIC-0015)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: kalkulačka průřezu v1.1, změna 1 (pojistka ≥ 1,25 × proud místo 1,1×)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „v1.1, změna 1: pojistka ≥ 1,25 × proud (místo 1,1×).“; docs/reset/KALKULACKA_V1_1.md, Změny ve v1.1, bod 1 („Nožová pojistka pak při trvalé zátěži nepálí zbytečně.“); docs/KALKULACKA_PRUREZU.md, Verze 1.1, Čtyři změny bod 1"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru (podpora, převzato z K-VODIC-0029)"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3, Temperature Table „max. allowed current load [A] at ambient temperature (typical derating)“, sloupce 20 a 65 °C: 1 A 1/1; 2 A 2/2; 3 A 3/3; 5 A 5/4; 7,5 A 7/6; 10 A 10/8; 15 A 14/12; 20 A 18/15; 25 A 23/19; 30 A 27/23; 35 A 35/29; 40 A 37/31"
    datum-overeni: 2026-11-16
vypocet: "Kalkulačka zvolí pojistku f pro proud do f ÷ 1,25 = 0,8 f. Mez rozsahu 250 ÷ 1,25 = 200 A (I = 200 A → 250 A; I nad 200 A → hlavní vedení; kontrola v Node). ATOF podle tabulky výrobce, poměr jmenovitá ÷ dovolený proud: při 20 °C nejvýš 1,111 (20 A a 30 A), při 65 °C nejvýš 1,333 (4 A a 20 A). Nabízené nožové hodnoty: nejvyšší proud pro danou pojistku (0,8 f) proti dovolenému proudu při 20 °C vyhoví u všech (např. 20 A: 16 ≤ 18; 30 A: 24 ≤ 27; 35 A: 28 ≤ 35); při 65 °C nevyhoví u 20 A (16 > 15), 25 A (20 > 19) a 30 A (24 > 23), ostatní vyhoví. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Ve v1.1 pravidlo platí (změna 1, rozhodnutí Radka). Zdroj je teď rozhodnutí odborníka s důvodem „nožová pojistka pak při trvalé zátěži nepálí zbytečně“. Věta „poměr je dočasný“ je vypuštěná. Jako podpora zůstala tabulka Littelfuse ATOF (z K-VODIC-0029): při 20 °C stačí 1,11×, při 65 °C 1,33×. `rozsah` je odstraněný, hodnota 1,25 je jedna. Mez rozsahu je 200 A. Odkazy na verzi 2 (I30, rodiny ve výpočtu, K-VODIC-0038) jsou vypuštěné. Stav `navrh`, `overil` vynulováno.

Test podstatnosti, kde 1,25 nestačí: ATOF 20, 25 a 30 A při okolí pojistky kolem 65 °C a horním konci proudu (do 1 A nad dovolený proud). Dál MEGA 225 A už při 20 °C pro proud 175–180 A (tabulka MEGA: 175 A, K-VODIC-0033). Následek: pojistka může u trvalé zátěže zbytečně pálit, tedy komfort, ne bezpečnost. Kabel chrání max. pojistka (K-VODIC-0009), a ta se tím nemění. Nepodstatné, jen poznámka.

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** Verze 2 mění poměr z 1,1 na 1,25 (Radek 16. 11. 2026, dočasně do rozhodnutí o rodinách pojistek). Tvrzení i `hodnota` přepsány na 1,25, zdroj `rozhodnuti-odbornika`. Podle nálezu: `rozsah` rozšířen na [1,0; 1,4] (MEGA 60 A dává 1,40); v podmínkách výslovně, u kterých pojistek 1,25 při 20 °C nestačí (MEGA 40, 60, 225 A); opraven popis řádku 110 % u ATOF (platí jen pro 1–30 A). Text „alespoň“ odpovídá výpočtu (f ≥ 1,25 × I).

Důsledek nedostatečného poměru není bezpečnostní (kabel chrání max. pojistka podle K-VODIC-0009), ale pojistka může u trvalé zátěže blízko hranice zbytečně pálit, což tvrzení slibuje opak. Rozhodnutí o rodinách a teplotě: docs/karty/POJISTKY_RODINY.md.

**Nepoužito od 2. kola 16. 11. 2026.** Radek rozhodl volit pojistku podle tabulek Littelfuse (dovolený trvalý proud při 30 °C, interpolace mezi 20 a 65 °C) místo jednoho poměru 1,25 (docs/ROZHODNUTI.md, řádek „Pojistka podle tabulek Littelfuse místo jednoho poměru …“). Nová metoda: K-VODIC-0038. Karta zůstává jako historie ve stavu `k-prezkoumani`, neověřuje se. Text „aspoň 1,25 × proud“ se na webu nesmí použít.

**Poznámka mistra (16. 11. 2026):** ve v1.1 pravidlo platí (změna 1: pojistka ≥ 1,25 × proud, rozhodnutí Radka). Karta se přepíše na v1.1 podle zadání v docs/STAV.md; věta „poměr je dočasný“ odpadá.
