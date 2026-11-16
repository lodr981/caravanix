---
id: K-LEKCE-0018
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Jmenovité napětí článku LiFePO4 je 3,2 V; 12V baterie má 4 články v sérii (12,8 V), 24V baterie 8 článků (25,6 V). S těmito napětími kalkulačky přepočítávají Ah na Wh a W na A."
hodnota: 3.2
jednotka: "V na článek"
rozsah: null
podminky: "LiFePO4 (LFP). Jmenovité napětí je střední hodnota pro výpočet energie; skutečné napětí při vybíjení klesá až ke konci vybíjení (Victron 11,2 V u 12,8 V, 22,4 V u 25,6 V). Funkce jmenoviteNapeti(12) = 12,8, (24) = 25,6."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Lithium Battery 12,8 V & 25,6 V Smart, datasheet"
    url: "https://www.victronenergy.de/upload/documents/Datasheet-12,8-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf"
    misto: "s. 1: „A single LFP cell has a nominal voltage of 3.2 V. A 12.8 V battery consists of 4 cells connected in series and a 25.6 V battery consists of 8 cells connected in series.“; s. 2: Nominal voltage 12,8 V / 25,6 V; End of discharge voltage 11,2 V / 22,4 V"
    datum-overeni: 2026-11-16
vypocet: "4 × 3,2 = 12,8 V; 8 × 3,2 = 25,6 V; 200 Ah × 12,8 V = 2 560 Wh."
pouzito-v: [kalkulacka-spotrebice, kalkulacka-vareni, kalkulacka-baterie, kalkulacka-menic, kalkulacka-booster, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Jeden datasheet výrobce stačí, jde o běžně známou hodnotu.

Poznámka k použití: proud z baterie počítaný s 12,8 V je o něco menší, než bude při téměř vybité baterii (11,2–12 V). U proudu pro kabel a pojistku to vychází na nebezpečnější stranu asi o 7–14 %; kalkulačka průřezu ale bere proud od uživatele a hláška NAD_150A je orientační. Votronic proto dává hrubší pravidlo výkon ÷ 10 (K-VODIC-0019). Pro energii (Wh, Ah) je 12,8 V správně. Nechávám jako poznámku pro mistra, nic neměním.
