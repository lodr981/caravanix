---
id: K-LEKCE-0008
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Napětí naprázdno panelu roste s klesající teplotou lineárně podle teplotního součinitele Voc z datasheetu panelu (např. Victron BlueSolar mono −0,35 %/K); s tímto součinitelem je Voc při −20 °C asi o 16 % vyšší než na štítku."
hodnota: -0.35
jednotka: "%/K (teplotní součinitel Voc, Victron BlueSolar mono)"
rozsah: null
podminky: "Štítkové Voc platí při STC (25 °C článku, 1000 W/m²). Výpočet v kalkulačce soláru: VocMraz = serie × Voc × (1 + koefVocProcNaK ÷ 100 × (tMin − 25)). Teplota článku za mrazivého rána se blíží teplotě vzduchu. Součinitel se zadává z datasheetu konkrétního panelu."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: BlueSolar Monocrystalline Panels, datasheet"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-BlueSolar-Monocrystalline-Panels-EN.pdf"
    misto: "s. 1, tabulka: Temperature coefficient of Voc −0,35 %/°C (všechny modely 20–360 W); Temperature coefficient of Isc +0,04 %/°C; Electrical data under STC (pozn. 1: 1000 W/m², 25 °C); např. 150W-12V: Voc 22,3 V, Isc 8,69 A"
    datum-overeni: 2026-11-16
vypocet: "Faktor při −20 °C: 1 + (−0,35 ÷ 100) × (−20 − 25) = 1,1575 (+15,75 %); při −40 °C 1,2275. Panel 22,3 V → 25,8 V při −20 °C. Přepočteno v Pythonu."
pouzito-v: [lekce-8-panely-serie-paralela, kalkulacka-solar]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0008-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Jeden datasheet stačí: kalkulačka bere součinitel jako vstup z datasheetu uživatelova panelu, karta dokládá vzorec a typickou hodnotu pro výchozí hodnotu nebo příklad. Typickou hodnotu pro jiné výrobce jsem druhým datasheetem neověřoval; když bude potřeba výchozí hodnota, doporučuji −0,35 %/K z tohoto zdroje (větší nárůst Voc, bezpečnější strana).
