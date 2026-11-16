---
id: K-VODIC-0030
trida: B
stav: k-prezkoumani
plati-pro-zeme: [vse]
tvrzeni: "Nožová pojistka Littelfuse MINI (2–30 A) smí podle tabulky výrobce trvale nést při 20 °C okolí nejvýš asi 83–95 % jmenovitého proudu; její jmenovitý proud má proto být alespoň 1,20× trvalý proud obvodu, při 40 °C 1,25× a při 60 °C 1,39×."
hodnota: 1.2
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.2, 1.39]
podminky: "Littelfuse MINI 32 V (0297), 2–30 A (z řady FUSES v2: 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A). Tabulka má sloupce −40, −20, 0, 20, 40, 60, 80, 100 °C (jiné než ATOF, sloupec 65 °C chybí). Typical derating, Temperature Security Margin 20 %."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: MINI Blade Fuses Rated 32V, výtah z katalogu Littelfuse (katalog s. 7–8, značka REV11042021), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/755/DOC031755536.pdf"
    misto: "PDF s. 2 (katalog s. 8), Temperature Table „max. allowed current load [A] at ambient temperature (typical derating)“, např. 3 A: 3,0/2,8/2,7/2,5/2,4/2,2/2,0/1,8; 20 A: 20/19/18/17/16/15/14/12; 25 A: 25/24/22/21/20/18/17/15. PDF s. 1 (katalog s. 7): 2–30 A, 1000 A @ 32 VDC, SAE J2077, ISO 8820-3; Time-Current 110 % → 360 000 s / ∞."
    datum-overeni: 2026-11-16
vypocet: "Poměr = jmenovitý ÷ dovolený proud. 20 °C: 2 A 1,053; 3 A 1,200; 5 A 1,163; 7,5 A 1,172; 10 A 1,087; 15 A 1,154; 20 A 1,176; 25 A 1,190; 30 A 1,154 → max 1,200. 40 °C: max 1,250. 60 °C: max 1,389 (25 A). 80 °C: max 1,500. Kontrola v2 (f ≥ 1,25 × I): při 20 °C i 40 °C vyhoví všechny hodnoty, při 60 °C ne. Řádky 7,5 až 25 A jsem kvůli rozbitému textu ověřil podle souřadnic slov (PyMuPDF). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0030-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

Podklad k rozhodnutí o typu pojistky. MINI dává při 20 °C horší poměr než ATOF (1,20 proti 1,11), protože tabulka je v desetinách ampéru a klesá už od 0 °C. Pro kalkulačku je MINI alternativa k ATOF do 30 A.

Dokument je výtah z katalogu, ne samostatný datasheet s datem revize. Novější samostatný datasheet MINI (Revised 09/27/2024, kopie szlcsc.com) jsem neotevřel.

**2. kolo Radka 16. 11. 2026:** MINI se v kalkulačce nenabízí (rozhodnutí 16. 11. 2026). Karta zůstává jako podklad (srovnání rodin), tvrzení se nemění.

**Poznámka mistra (16. 11. 2026):** archiv v2, nepoužito ve v1.1 (docs/reset/KALKULACKA_V1_1.md; tabulky pojistek a odporu podle průřezu jsou v docs/ZASOBNIK.md). Dál se neověřuje ani neschvaluje. Zdroje z karty smí rešeršér převzít do karet v1.1.
