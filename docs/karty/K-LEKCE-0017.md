---
id: K-LEKCE-0017
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Z LiFePO4 baterie počítáme s využitím 90 % jmenovité kapacity (předpoklad zadání): výrobci dovolují vybít až 100 % (Battle Born) a životnost udávají při 80 % (Victron: 2 500 cyklů); v mrazu je využitelná kapacita menší."
hodnota: 0.9
jednotka: "podíl jmenovité kapacity (výchozí vyuzitelnost)"
rozsah: [0.8, 1.0]
podminky: "LiFePO4 při 25 °C, vybíjení do 1C. Kalkulačky vaření, baterie a soběstačnosti ji ukáží a dovolí změnit (vyuzitelnost 0,5–1). V mrazu Victron Smart 12,8/100: 80 Ah při 0 °C, 50 Ah při −20 °C. Pro olověné baterie tato hodnota neplatí (kalkulačky alfy počítají jen s LiFePO4)."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Lithium Battery 12,8 V & 25,6 V Smart, datasheet"
    url: "https://www.victronenergy.de/upload/documents/Datasheet-12,8-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf"
    misto: "s. 2: Cycle life (capacity ≥ 80 % of nominal): 80 % DoD 2500 cycles, 70 % DoD 3000, 50 % DoD 5000; Nominal capacity @ 25 °C / 0 °C / −20 °C (12,8/100: 100 / 80 / 50 Ah); End of discharge voltage 11,2 V"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Battle Born Batteries: BB10012 data sheet"
    url: "https://battlebornbatteries.com/cdn/shop/files/BB10012_Data_Sheet.pdf"
    misto: "s. 1, Features: 100% Depth of Discharge; 3,000–5,000 Deep Discharge Cycles"
    datum-overeni: 2026-11-16
vypocet: "200 Ah × 12,8 V × 0,9 = 2 304 Wh (příklad zadání); s 0,8: 2 048 Wh; s 1,0: 2 560 Wh."
pouzito-v: [kalkulacka-vareni, kalkulacka-baterie, kalkulacka-sobestacnost, lekce-6-vareni-na-indukci]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0017-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

90 % je kompromis mezi 80 % (při kterém Victron udává životnost) a 100 % (které Battle Born dovoluje). Žádný z otevřených zdrojů přímo „90 %“ neuvádí; je to předpoklad ze zadání, uvnitř rozsahu výrobců. Netýká se bezpečnosti (BMS baterii při podpětí odpojí sám), jen odhadu energie. Nepodstatné, nechávám.

Na co si dát pozor: v zimě je skutečně dostupná kapacita výrazně nižší (Victron při 0 °C 80 %). Kalkulačka soběstačnosti to nepočítá; lekce 5 to může zmínit jako text, číslo je v kartě.
