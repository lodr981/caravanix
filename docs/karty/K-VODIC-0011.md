---
id: K-VODIC-0011
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pojistka se volí jako nejbližší hodnota z řady, která je alespoň 1,1× proud spotřebiče, aby zbytečně nepálila."
hodnota: 1.1
jednotka: "násobek proudu spotřebiče"
rozsah: [1.1, 1.33]
podminky: "Trvalý odběr, pojistka při okolí kolem 20 °C. Při vyšší teplotě okolí (motorový prostor, uzavřená skříň) a u spotřebičů s rozběhovým proudem potřebuje pojistka větší rezervu."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses (rev. 08/18/2022)"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3: Time-Current Characteristics – 110 % jmenovitého proudu: bez přerušení (∞ / 360 000 s); Temperature Table (typical derating, Temperature Security Margin 20 %): 20 A → 18 A při 20 °C, 15 A při 65 °C; 40 A → 37 A při 20 °C, 31 A při 65 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA Fuse Rated 32V (rev. 04/08/2024)"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 3: 100 % jmenovitého proudu min. 14 400 s; s. 4 Temperature Table: 100 A → 91 A při 20 °C, 76 A při 65 °C; 40 A → 31 A při 20 °C"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "kód: fuse = FUSES.find(f => f >= I*1.1); příručka: „alespoň o 10 % výš, aby zbytečně nepálila“; patička: „nejbližší vyšší hodnota nad 1,1× proudu“"
    datum-overeni: 2026-11-16
vypocet: "Příklad 20 A: kalkulačka zvolí 20 A pro proud do 20/1,1 = 18,18 A. Littelfuse ATOF 20 A dovoluje trvale 18 A při 20 °C (poměr 1,11) a 15 A při 65 °C (poměr 1,33). Příklad MEGA 100 A: kalkulačka do 90,9 A; dovoleno 91 A při 20 °C (1,10), 76 A při 65 °C (1,32). MEGA 40 A: kalkulačka do 36,4 A; dovoleno 31 A při 20 °C (poměr 1,29)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Pravidlo 1,1× odpovídá zhruba hranici, kterou výrobce pojistek dovoluje při 20 °C (ATOF: 0,90 × jmenovitá hodnota). Je to spíše dolní mez než rezerva.

**Nález pro Radka (výpočet neměním):** podle tabulek Littelfuse by v teplém prostředí (65 °C) bylo potřeba asi 1,33×, a u MEGA 40 A dokonce 1,29× už při 20 °C. Důsledek není bezpečnostní (kabel chrání strop CAP), ale pojistka může u trvalé zátěže blízko hranice „zbytečně pálit“ – což tvrzení reference slibuje opak. Zvážit text „alespoň o 10 %, v teple a u motorů víc“.

Drobnost ve formulaci: patička říká „nad 1,1× proudu“, kód používá „alespoň“ (≥). Pro shodu textu s výpočtem by mělo být „alespoň 1,1×“.

Norma IEC 60364-4-43 čl. 433.1 požaduje jen I_B ≤ I_n (proud zátěže ≤ jmenovitý proud jistícího prvku), konkrétní rezervu nedává (neotevřeno, jen odkaz).
