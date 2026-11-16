---
id: K-LEKCE-0013
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Proud odebíraný z baterie nesmí trvale překročit trvalý vybíjecí proud baterie (BMS) z jejího datasheetu; běžná 100Ah baterie s vestavěným BMS mívá 100 A, takže indukce 2 000 W přes měnič (asi 174 A z 12,8 V) ji přetíží."
hodnota: 100
jednotka: "A (trvalý vybíjecí proud, Battle Born BB10012, 12 V 100 Ah)"
rozsah: [100, 200]
podminky: "Proud z baterie = příkon ÷ účinnost měniče ÷ 12,8 V (K-VODIC-0019, K-LEKCE-0018). Rozsah: Battle Born BB10012 100 A trvale (200 A 30 s); Victron Smart 12,8/100 s externím BMS max. 200 A trvale, doporučeno ≤ 100 A. Rozhoduje datasheet konkrétní baterie; při více paralelních bateriích se trvalý proud sčítá jen podle návodu výrobce (Rolls: paralelní zapojení proudovou mez nezvyšuje)."
zdroje:
  - typ: datasheet
    nazev: "Battle Born Batteries: BB10012 100 Ah 12 V LiFePO4 Deep Cycle Battery, data sheet"
    url: "https://battlebornbatteries.com/cdn/shop/files/BB10012_Data_Sheet.pdf"
    misto: "s. 1, Internal BMS: 100 Amps Continuous, 200 Amps Surge for 30 Seconds, 1/2 Second Surge for Loads over 200 Amps"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Victron Energy: Lithium Battery 12,8 V & 25,6 V Smart, datasheet"
    url: "https://www.victronenergy.de/upload/documents/Datasheet-12,8-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf"
    misto: "s. 2, Discharge: Maximum continuous discharge current 12,8/100 200 A, 12,8/200 400 A; Recommended continuous discharge current ≤ 100 A / ≤ 200 A"
    datum-overeni: 2026-11-16
vypocet: "2 000 W ÷ 0,9 ÷ 12,8 V = 173,6 A (bez měniče 2 000 ÷ 12,8 = 156,3 A). 173,6 A > 100 A (BB10012) i > 100 A doporučených u Victron 12,8/100. Přepočteno v Pythonu."
pouzito-v: [lekce-6-vareni-na-indukci, kalkulacka-vareni, kalkulacka-menic, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0013-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Zásada v zadání („musí ho unést BMS, kabel i měnič“) potřebuje číslo z datasheetu konkrétní baterie, kalkulačka ho nemůže znát předem. Karta dokládá pravidlo a typickou hodnotu 100 A pro 100Ah baterii s vestavěným BMS, aby lekce mohla ukázat, že 2 000 W z jedné takové baterie nejde.

Druhý údaj Rolls („Using batteries in parallel does not increase the current limit“, návod s. 8) je v podmínkách jen jako upozornění; Battle Born naopak paralelní spojení bez omezení povoluje. Proto „podle návodu výrobce“.

Třída A podle návrhu lekcí (kontrola proudu BMS v K2). Kalkulačka vaření dnes hlásí `PROUD_VELKY` až nad 150 A; mez BMS z datasheetu nemá jako vstup. Zda přidat vstup „trvalý proud baterie“, je změna výpočtu (Radek), ne věc karty.
