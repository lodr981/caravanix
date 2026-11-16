---
id: K-VODIC-0029
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Nožová pojistka Littelfuse ATOF (1–40 A) smí podle tabulky výrobce trvale nést při 20 °C okolí nejvýš asi 90 % jmenovitého proudu; její jmenovitý proud má proto být alespoň 1,11× trvalý proud obvodu, při 65 °C okolí alespoň 1,33×."
hodnota: 1.11
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.11, 1.33]
podminky: "Littelfuse ATOF / ATO Ag 32 V, hodnoty 1–40 A (z řady FUSES v2: 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 A). Teplota okolí pojistky 20 °C (1,11) nebo 65 °C (1,33); při 85 °C až 1,50. Tabulka je „typical derating“ s „Temperature Security Margin 20%“ a vodiči podle ISO 8820-3; výrobce upozorňuje, že skutečné podmínky (svorky, průřez) ji mohou změnit. Hodnoty 1–4 A jsou v tabulce zaokrouhlené na celé ampéry."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3, Temperature Table „max. allowed current load [A] at ambient temperature (typical derating)“, sloupce −40, 0, 20, 65, 85, 110, 125 °C; např. 20 A: 20/19/18/15/14/12/10; 30 A: 30/29/27/23/21/18/15; 40 A: 40/39/37/31/28/24/20. s. 1: popis „protecting low-voltage circuits“, Complies with SAE J1284, ISO 8820-3; Interrupting Rating 1000 A @ 32 VDC. s. 3 Time-Current: 110 % → 360 000 s / ∞ jen pro 1–30 A, pro 35 a 40 A při 100 %."
    datum-overeni: 2026-11-16
vypocet: "Poměr = jmenovitý ÷ dovolený proud. 20 °C: 1 A 1,000; 2 A 1,000; 3 A 1,000; 5 A 1,000; 7,5 A 1,071; 10 A 1,000; 15 A 1,071; 20 A 1,111; 25 A 1,087; 30 A 1,111; 35 A 1,000; 40 A 1,081 → max 1,111. 65 °C: 5 A 1,250; 7,5 A 1,250; 10 A 1,250; 15 A 1,250; 20 A 1,333; 25 A 1,316; 30 A 1,304; 35 A 1,207; 40 A 1,290 → max 1,333. 85 °C max 1,500 (3 A, 7,5 A). Kontrola v2 (f ≥ 1,25 × I): při 20 °C vyhoví všechny hodnoty; při 65 °C ne u 20 A (16 A proti 15 A), 25 A (20 / 19), 30 A (24 / 23), 40 A (32 / 31). Přepočteno v Pythonu (scripts/pojistky.py ve scratchpadu rešeršéra)."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Podklad k rozhodnutí o typu pojistky (`docs/karty/POJISTKY_RODINY.md`). Výpočet nemění.

Web Littelfuse vrací 403, použil jsem kopii datasheetu u distributora (stejná revize, kterou cituje K-VODIC-0010/0011). Tabulku jsem vytáhl `pdftotext -layout` a zkontroloval po řádcích.

Pozor: „Temperature Security Margin is 20%“ výrobce nevysvětluje. Neříkám, zda je v tabulce 20% rezerva už započtena.
