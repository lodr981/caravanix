---
id: K-LEKCE-0007
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Napětí naprázdno (Voc) panelů zapojených do série při nejnižší teplotě v místě, kde vůz stojí, nesmí překročit maximální vstupní napětí regulátoru; v mrazu je Voc vyšší než na štítku (štítek platí pro 25 °C)."
hodnota: null
jednotka: null
rozsah: null
podminky: "VocMraz = počet v sérii × Voc × (1 + koef. Voc [%/K] ÷ 100 × (tMin − 25)), viz K-LEKCE-0008. Maximum regulátoru z jeho datasheetu (např. 75 V nebo 100 V u Victron SmartSolar 75/xx a 100/xx). Hláška VOC_NAD_MAX v kalkulačce soláru je blok."
zdroje:
  - typ: navod
    nazev: "Victron Energy: SmartSolar MPPT 75/10 up to 100/20, manual"
    url: "https://www.victronenergy.com/media/pg/Manual_SmartSolar_MPPT_75-10_up_to_100-20/en/installation.html"
    misto: "4.3 PV array: maximální napětí naprázdno PV nesmí překročit 75 V nebo 100 V podle modelu; při počtu panelů v sérii počítat s Voc; při teplotě okolí pod 25 °C je Voc vyšší. Kap. 8.5.6 (troubleshooting.html): při překročení regulátor přestane nabíjet a hlásí chybu 33"
    datum-overeni: 2026-11-16
vypocet: "Příklad: 4 panely Victron 150 W (Voc 22,3 V, −0,35 %/K, K-LEKCE-0008) v sérii na regulátor 100 V. Při 25 °C 4 × 22,3 = 89,2 V (vejde se); při −20 °C 89,2 × 1,1575 = 103,2 V (nad 100 V → blok). Tři panely: 77,4 V. Přepočteno v Pythonu."
pouzito-v: [lekce-8-panely-serie-paralela, kalkulacka-solar, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Jeden návod výrobce regulátoru stačí. Příklad ukazuje, proč na tom záleží: sestava, která podle štítku „vejde“ (89 V pod 100 V), v mrazu limit překročí.

Návod Victron uvádí, že regulátor při překročení přestane nabíjet (chyba 33); že ho přepětí poškodí, v textu, který jsem otevřel, výslovně není. Proto tvrzení říká jen „nesmí překročit“ (maximum výrobce), bez popisu následků. Výchozí tMin −20 °C v kalkulačce je předpoklad zadání (uživatel ho změní).
