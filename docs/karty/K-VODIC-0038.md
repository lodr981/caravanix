---
id: K-VODIC-0038
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka volí pojistku podle tabulek dovoleného trvalého proudu Littelfuse: nejmenší nabízenou hodnotu (nožová ATOF 1–30 A, šroubovací MIDI 40–125 A, MEGA 150–250 A), jejíž dovolený trvalý proud při 30 °C okolí, odvozený lineární interpolací mezi sloupci 20 °C a 65 °C tabulky výrobce, je alespoň proud spotřebiče; nad 199,9 A žádná nabízená pojistka nestačí (hlavní vedení)."
hodnota: 199.889
jednotka: "A (největší proud, pro který kalkulačka ještě pojistku najde: I30 MEGA 250 A)"
rozsah: null
podminky: "Trvalý odběr, teplota okolí pojistky do 30 °C (stejná mez jako pro kabel). Nabízí se jen: ATOF 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A; MIDI 40, 50, 60, 70, 80, 100, 125 A; MEGA 150, 175, 200, 225, 250 A. MINI, MAXI a 35 A se nenabízejí; zkratové ochrany (MIDI 150–200 A, MEGA 300 A a víc) nikdy. I30 = I20 + (I65 − I20) × (30 − 20) / (65 − 20) je odvozená hodnota (interpolace je rozhodnutí Radka, tabulka výrobce sloupec 30 °C nemá). Tabulky jsou „typical derating“ s „Temperature Security Margin 20 %“, vodiče podle ISO 8820-3; výrobce upozorňuje, že se mohou lišit podle svorek a průřezu. Řádek ATOF 7,5 A je v tabulce zaokrouhlený na celé ampéry (K-VODIC-0029). Pojistka zároveň nesmí být vyšší než max. pojistka kabelu (K-VODIC-0012); tu hlídá výběr průřezu. U spotřebičů s rozběhovým proudem rozhoduje i časová charakteristika (K-VODIC-0015)."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3, Temperature Table „max. allowed current load [A] at ambient temperature (typical derating)“, sloupce 20 °C / 65 °C: 1 A 1/1; 2 A 2/2; 3 A 3/3; 5 A 5/4; 7,5 A 7/6; 10 A 10/8; 15 A 14/12; 20 A 18/15; 25 A 23/19; 30 A 27/23"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MIDI, Clear MIDI, One-Hole MIDI Style Bolt-down Fuse Rated 32V (Revised 09/13/2023), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/675/DOC038675898.pdf"
    misto: "s. 4, Temperature Table, sloupce 20 °C / 65 °C: 40 A 38/32; 50 A 50/45; 60 A 58/48; 70 A 70/59; 80 A 80/72; 100 A 100/85; 125 A 124/104; s. 1 a 2: 150–200 A „only for short circuit protection“"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 4, Temperature Table, sloupce 20 °C / 65 °C: 150 A 135/114; 175 A 149/125; 200 A 166/140; 225 A 175/148; 250 A 207/175 (pro kontrolu revize: 40 A 31/26, 60 A 43/36); s. 1 a 2: 300–500 A „only for short circuit protection“"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: pojistka podle tabulek Littelfuse, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Pojistka podle tabulek Littelfuse místo jednoho poměru: nejmenší jmenovitá hodnota, jejíž dovolený trvalý proud při 30 °C (lineární interpolace mezi sloupci 20 °C a 65 °C) je alespoň proud spotřebiče …“; docs/KALKULACKA_PRUREZU.md, Verze 2, Výpočet body 4 a 5"
    datum-overeni: 2026-11-16
vypocet: "Postup: (1) pro každou nabízenou hodnotu vzít I20 a I65 z tabulky výrobce (packages/data/src/pojistky.json); (2) I30 = I20 + (I65 − I20) × 10 / 45; (3) projít hodnoty od nejmenší a vzít první s I30 ≥ I; (4) žádná → HLAVNI_VEDENI. I30: ATOF 1 A 1,000; 2 A 2,000; 3 A 3,000; 5 A 4,778; 7,5 A 6,778; 10 A 9,556; 15 A 13,556; 20 A 17,333; 25 A 22,111; 30 A 26,111; MIDI 40 A 36,667; 50 A 48,889; 60 A 55,778; 70 A 67,556; 80 A 78,222; 100 A 96,667; 125 A 119,556; MEGA 150 A 130,333; 175 A 143,667; 200 A 160,222; 225 A 169,000; 250 A 199,889. I30 roste s jmenovitou hodnotou (žádná díra v řadě). Příklad 1: lednice 120 W na 12 V, I = 10 A. ATOF 10 A: 10 + (8 − 10) × 10/45 = 9,556 < 10, nestačí; ATOF 15 A: 14 + (12 − 14) × 10/45 = 13,556 ≥ 10 → pojistka 15 A ATOF. Příklad 2: I = 150 A: MIDI 125 A 119,556, MEGA 150 A 130,333, 175 A 143,667 nestačí; MEGA 200 A 160,222 ≥ 150 → 200 A MEGA. Příklad 3: I = 30 A: ATOF 30 A 26,111 nestačí → MIDI 40 A (36,667). Mez: I > 199,889 A → HLAVNI_VEDENI. Poměr jmenovitá ÷ I30: 1,000 až 1,331 (MEGA 225 A). Přepočteno v Pythonu, kontrola v Node proti pojistky.json."
pouzito-v: [kalkulacka-prurez, lekce-pojistka]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 2. kole Radka 16. 11. 2026 (pojistka podle tabulky místo poměru 1,25). Všechna čísla I20 a I65 v souboru `packages/data/src/pojistky.json` odkazují na tuto kartu.

Tabulky jsem přečetl z čerstvě stažených PDF (shodné MD5 s kopiemi z kol 1 a 2) podle souřadnic slov. Revize MEGA 04/08/2024 sedí se zadáním (40 A: 31 A při 20 °C, 60 A: 43 A). Web littelfuse.com vrací 403, proto kopie u distributorů; jde o tytéž dokumenty a revize jako v kartách 0010, 0029, 0032 a 0033.

Na co si dát pozor:
- I30 je odvozená hodnota, výrobce sloupec 30 °C nemá. Lineární interpolace mezi 20 a 65 °C je rozhodnutí Radka. U většiny řádků tabulka mezi 20 a 65 °C klesá zhruba lineárně, mezilehlé sloupce ale výrobce nedává, takže to ověřit nejde.
- Řádek ATOF 7,5 A je zaokrouhlený na celé ampéry (při −40 °C 8 A, tedy víc než jmenovitý proud). I30 = 6,778 A je tím zatížené.
- Spotřebič 30 A dostane MIDI 40 A (šroubovací), protože ATOF 30 A dovoluje při 30 °C jen 26,1 A. Spotřebič 5 A dostane 7,5 A (ATOF 5 A má I30 4,78 A).
- Littelfuse nevysvětluje, co znamená „Temperature Security Margin is 20%“ (zda je rezerva v tabulce). Čísla beru jako „max. allowed current load“.
