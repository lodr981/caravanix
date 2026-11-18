---
id: K-LEKCE-0049
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "U vozů Euro 6 s chytrým alternátorem kolísá napětí podle jízdního stavu zhruba mezi 12,6 a 15,5 V; booster spouštěný jen podle napětí (bez D+) se pro ně nehodí, protože potřebuje vysoké a stálé napětí (příklad: zapnutí nad 13,3 V). Booster se proto spouští signálem D+ (běh motoru); pak mu stačí nižší napětí (příklad: zvýšení nabíjecího výkonu nad 11,70 V, vypnutí až pod 11,20 V). Připojení řídicího vstupu na zapalování (svorka 15) je jen nouzové řešení: při stojícím motoru se zapnutým zapalováním může startovací baterii silně vybít."
hodnota: null
jednotka: "V"
rozsah: [12.6, 15.5]
podminky: "Prahová napětí jsou údaje Votronic VCC 1212-30; jiné boostery mají vlastní (Victron Orion XS v K-LEKCE-0020). Lekce je uvádí jen jako příklad."
zdroje:
  - typ: navod
    nazev: "Votronic: Lade-Wandler VCC 1212-30, Montage- und Bedienungsanleitung"
    url: "https://www.bergische-wohnmobile.de/media/a4/51/d0/1693387251/Votronic%20Ladewandler%2030%20Amp%20Ladebooster.pdf"
    misto: "s. 1: Euro 6 a 6+, napětí chytrého alternátoru 12,6–15,5 V; s. 8 svorka D+: řízení D+ nutné pro Euro 6 se správou energie, start-stop, rekuperací; nouzově svorka 15, pak může startovací baterii při stojícím motoru silně vybít; zvýšení nabíjecího výkonu nad 11,70 V, snížení pod 11,40 V, vypnutí (při trvalém D+) pod 11,20 V se zpožděním 30 s; s. 7: s D+ stačí na přístroji min. 11,7 V; bez D+ jen spouštění napětím (zvýšení nad 13,30 V), předpoklad krátké silné kabely a nechytrý alternátor (ne Euro 6); s. 7: spouštění napětím nevhodné pro chytré alternátory (Euro 6)"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-27-euro6-alternator-a-d-plus]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Kde v konkrétním voze odebrat D+, je v podkladech výrobce vozu pro nástavbáře; ty jsem v rozpočtu nehledal. Lekce radí zjistit to v podkladech výrobce vozu nebo u autoelektrikáře a neuvádí konkrétní místo.
