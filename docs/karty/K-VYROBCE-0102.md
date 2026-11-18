---
id: K-VYROBCE-0102
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Victron Inverter Smart doporučuje bateriový kabel a pojistku: 12/1600 1 × 70 mm² do 5 m (5–10 m nedoporučeno), pojistka 250 A; 12/2000 1 × 70 mm² do 5 m (5–10 m nedoporučeno), 300 A; 12/3000 1 × 90 mm² do 5 m, 2 × 70 mm² 5–10 m, 400 A; jeden kabel musí unést jmenovitý proud pojistky bez přehřátí."
hodnota: null
jednotka: null
rozsah: null
podminky: "Phoenix Inverter Smart 12 V (v téže tabulce 24/1600 35 / 70 mm² 125 A, 24/2000 50 / 95 mm² 150 A, 24/3000 50 / 2 × 50 mm² 250 A). Délka kabelu 0–5 m a 5–10 m bez upřesnění; z výpočtu vychází jako jedna cesta. Pojistka je asi 2 × jmenovitý proud."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Inverter Smart Manual, rev 04 – 10/2026"
    url: "https://www.victronenergy.com/upload/documents/Inverter_Smart/106668-Inverter_VE_Direct__Smart_and_SUN-pdf-en.pdf"
    misto: "kap. 3.2.1 Battery connection, s. 5 (PDF s. 7): tabulka Cable cross section 0–5 m / 5–10 m / Fuse rating / Battery capacity a poznámka (*). Kap. 6.1, s. 17 (PDF s. 19): trvalý výkon 25 °C 1300 / 1600 / 2400 W, špička 3000 / 4000 / 6000 VA, max. účinnost 92 / 92 / 93 % (12 V), vstup 9,3–17 V. Kap. 4.3: výchozí podpěťové vypnutí 9,3 V"
    datum-overeni: 2026-11-18
vypocet: "In = výkon / (účinnost · 12 V): 12/1600 118 A, 12/2000 145 A, 12/3000 215 A. Úbytek obou vodičů na konci pásma (jedna cesta L, ρ 0,0175): 12/1600 70 mm² 5 m 2,5 %; 12/2000 70 mm² 5 m 3,0 %; 12/3000 90 mm² 5 m 3,5 %, 2 × 70 mm² 10 m 4,5 %. Na mezi vypnutí 9,3 V: 3,2 / 3,9 / 4,5–5,8 %. Při proudu pojistky: 5,2 / 6,2 / 6,5–8,3 %. Pojistka / In = 2,1 / 2,1 / 1,9."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0102-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra: 12/1600 se 70 mm² na 5 m dává přesně 2,5 % při jmenovitém výkonu, což je cíl z Wiring Unlimited (K-VYROBCE-0110); proto považuji délku za jednu cestu. U 12/1600 vede 70 mm² zjevně i pojistka 250 A (poznámka *: kabel musí unést proud pojistky). V rozvržení PDF je tabulka posunutá; hodnoty jsou přečtené z textové vrstvy po řádcích modelů.
