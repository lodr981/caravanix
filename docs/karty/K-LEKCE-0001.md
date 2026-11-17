---
id: K-LEKCE-0001
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Lithiovou (LiFePO4) baterii nabíjejte z alternátoru přes booster (nabíječ DC-DC), ne napřímo: booster omezí proud, aby se alternátor nepřetížil, a vyrovná nízké a kolísavé napětí chytrého alternátoru (Euro 5/6)."
hodnota: null
jednotka: null
rozsah: null
podminky: "Obytné vozidlo s alternátorem motoru a obytnou baterií LiFePO4. Platí i pro chytrý (řízený) alternátor vozidel Euro 5 a 6. Hláška LITHIUM_BOOSTER v kalkulačce boosteru (vždy), K2 blok."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 3.4 Charging from an alternator"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/system-design-and-bms-selection-guide.html"
    misto: "3.4: lithium má velmi malý vnitřní odpor a přijme mnohem větší nabíjecí proud; je třeba zabránit přetížení alternátoru; možnosti: alternátor s jmenovitým proudem aspoň 2× kapacita baterie a regulátorem řízeným teplotou, nebo zařízení omezující proud (nabíječ DC-DC), nebo BMS s alternátorovým vstupem s omezením proudu"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Orion XS 12/12-50A DC-DC battery charger manual, kap. 2 General"
    url: "https://www.victronenergy.com/media/pg/Orion_XS_12-12-50A_DC-DC_battery_charger/en/general.html"
    misto: "2.1: řízené nabíjení u vozidel s chytrým alternátorem Euro 5 nebo 6, který často dává příliš nízké nabíjecí napětí; u lithia chrání alternátor před přetížením, protože malá impedance lithiové baterie vede k velkému proudu alternátoru; proud nikdy nepřekročí nastavenou hodnotu. 2.2: chytrý alternátor řízený ECU má proměnné výstupní napětí a vypíná se, když není potřeba"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [lekce-3-lithium-z-alternatoru, kalkulacka-booster, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0001-2026-11-16.md
schvalil: "Radek, 2026-11-17 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Zdroj je výrobce baterií i boosterů (Victron); jeden výrobce stačí, oba dokumenty se shodují.

**Rozdíl proti zdroji (test podstatnosti):** Victron 3.4 připouští i nabíjení bez boosteru, když má alternátor aspoň dvojnásobek kapacity baterie (např. 400 A na 200 Ah) a regulátor s teplotní ochranou, nebo když BMS má alternátorový vstup s omezením proudu. Naše zásada „vždy přes booster“ je přísnější, tedy na bezpečné straně, a laik u dodávky parametry alternátoru obvykle nezná. Nepodstatné, nic neměním. Lekce může zmínit, že výjimky posoudí odborník.

Nedohledáno: dimenzování boosteru vůči alternátoru (návrh lekce 3 to uvádí jako možnou kartu). Výrobci v našich zdrojích číslo nedávají kromě pravidla 2× kapacita pro přímé nabíjení; lekce ho nepotřebuje, kalkulačka boosteru bere proud boosteru jako vstup.
