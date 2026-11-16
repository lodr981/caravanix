---
id: K-VODIC-0018
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "AWG velikosti nesedí přesně na mm² a čím menší číslo AWG, tím silnější kabel; např. 12 AWG má 3,3 mm², tedy méně než 4 mm²."
hodnota: 3.31
jednotka: "mm²"
rozsah: null
podminky: "Plný kruhový vodič podle definice AWG (ASTM B258). Lanko stejného AWG má podobný, ne nutně stejný průřez. Tabulka AWG kalkulačky: 20 = 0,52; 18 = 0,82; 16 = 1,31; 14 = 2,08; 12 = 3,31; 10 = 5,26; 8 = 8,37; 6 = 13,3; 4 = 21,2; 2 = 33,6; 1 = 42,4; 1/0 = 53,5; 2/0 = 67,4; 3/0 = 85; 4/0 = 107 mm²."
zdroje:
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables, kap. 2 The American Wire Gage"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "oddíl 2.2 Characteristics of the American Wire Gage (tištěná s. 6): 4/0 = 0,4600 in, č. 36 = 0,0050 in, poměr sousedních průměrů ³⁹√92; tabulka 1 (tištěná s. 12)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ASTM B258 Standard Specification for Standard Nominal Diameters and Cross-Sectional Areas of AWG Sizes – text neotevřen, jen odkaz"
    url: ""
    misto: ""
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.1 Cable selection: AWG je jiné značení než mm², převodní tabulka na konci kapitoly"
    datum-overeni: 2026-11-16
vypocet: "d(n) = 0,127 mm × 92^((36 − n)/39); A = π d²/4. Výsledky: 20 → 0,518; 18 → 0,823; 16 → 1,309; 14 → 2,081; 12 → 3,309; 10 → 5,261; 8 → 8,366; 6 → 13,302; 4 → 21,151; 2 → 33,631; 1 → 42,408; 1/0 (n = 0) → 53,475; 2/0 (n = −1) → 67,431; 3/0 → 85,029; 4/0 → 107,219 mm². Všechny hodnoty pole AWG reference sedí po zaokrouhlení. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Tabulka AWG v kalkulačce je správná. Tvrzení „čím menší číslo, tím silnější“ plyne přímo z definice.

Kalkulačka správně volí AWG s plochou alespoň takovou, jakou výpočet vyžaduje (a navíc kontroluje max. pojistku přes interpolaci). Upozornění: kabely z e-shopů značené AWG mívají skutečný průřez menší (a často jsou CCA) – to už tvrzení reference neříká.
