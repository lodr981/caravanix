---
id: K-LEKCE-0028
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Klidové odběry (spotřebiče v pohotovosti, zpětný odběr nabíječů) baterii pomalu vybíjejí i ve stojícím voze; podle výrobce může už zbytkový proud 10 mA poškodit baterii 200 Ah, když systém zůstane vybitý déle než 8 dní. Při odstavení se baterie buď udržuje nabitá, nebo se (téměř) nabije do plna a DC systém se od ní odpojí (hlavním vypínačem, vyjmutím pojistky nebo odpojením plusu)."
hodnota: 10
jednotka: "mA"
rozsah: null
podminky: "Lithiová baterie 12,8 V s BMS (Victron Lithium NG); u jiných baterií platí návod jejich výrobce. Hodnoty 10 mA, 200 Ah a 8 dní jsou příklad výrobce, ne obecná mez."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Lithium NG battery 12,8 V manual, kap. 5 Operation"
    url: "https://www.victronenergy.com/media/pg/Lithium_NG_battery_12%2C8_V/en/operation.html"
    misto: "5.2.2: klidové proudy spotřebičů a zpětný odběr nabíječů baterii pomalu vybíjejí; 10 mA může poškodit baterii 200 Ah, když systém zůstane vybitý déle než 8 dní; odpojit vypínačem, vyjmutím pojistek nebo odpojením plusu; 5.4 bod 5: při skladování udržovat nabité, nebo (téměř) nabít a DC systém odpojit"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-16-hlavni-vypinac-a-klidovy-odber]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0028-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Doporučený stav nabití při skladování v procentech Victron u Lithium NG neuvádí („(téměř) plná“); lekce procenta neuvádí. Klidový odběr konkrétních přístrojů (regulátor, monitor) lekce číselně neuvádí, odkazuje na datasheet; jen měnič naprázdno je doložen v K-LEKCE-0015.
