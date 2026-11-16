---
id: K-VODIC-0012
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pojistka chrání hlavně kabel. Její velikost se řídí kabelem, ne spotřebičem: nesmí být vyšší, než kabel snese, jinak se kabel při přetížení nebo zkratu přehřeje, taví se izolace a hrozí požár."
hodnota: null
jednotka: null
rozsah: null
podminky: "Stejnosměrné obvody 12/24 V s baterií. „Kabel snese“ = max. pojistka kabelu v daném uložení (K-VODIC-0003, -0004, -0009). Pojistka může chránit i zařízení (Victron: „wires and equipment“); velikost se ale určuje podle kabelu, u jednoho spotřebiče podle nižšího z proudu spotřebiče a zatížitelnosti kabelu."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6 DC Fuses and circuit breakers: „The fuse protects wires and equipment against“ nadproudem a zkratem, které mohou způsobit přehřátí nebo požár; odstavec Current rating: u jednoho spotřebiče pojistka podle nižšího z proudu spotřebiče a zatížitelnosti kabelu, u více spotřebičů podle zatížitelnosti kabeláže"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Philippi: katalog Absicherung (oddíl Bordnetzschutz und Spannungsabfall)"
    url: "https://www.philippi-online.de/cdn/shop/files/Absicherung_26.pdf"
    misto: "PDF s. 3, rámeček „Bordnetzschutz und Spannungsabfall“: vedení se jistí kvůli přehřátí a požáru kabelu při zkratu; jmenovitý proud jističe se v zásadě určuje podle průřezu vedení, ne podle připojeného spotřebiče"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.4 a 11.12.1.5.2: jištění nesmí překročit 150 % zatížitelnosti vodiče (TABLE IV)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.8 The negative effects of cable voltage drop: zahřívání kabelů může tavit izolaci, v krajním případě požár"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-pojistka, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Tvrzení „chrání kabel, ne spotřebič“ bylo v rozporu s Victronem (chrání „wires and equipment“). Nově „chrání hlavně kabel; velikost se řídí kabelem, ne spotřebičem“, jak navrhl ověřovatel. Victron v `misto` citován celý. Přidán Philippi (dohledal ověřovatel, otevřel jsem: PDF s. 3), který dokládá „podle průřezu, ne podle spotřebiče“ jako druhý nezávislý zdroj. Odkaz na IEC 60364-4-43 (neotevřený) vypuštěn, tvrzení na něm nestojí. Do důsledků doplněn i zkrat (Philippi i Victron).

Stejnou úpravu potřebuje nadpis v textech („Pojistka chrání kabel, ne spotřebič“) – patří autorovi textu.

ABYC E-11 dovoluje až 150 % zatížitelnosti; tvrzení je přísnější, tedy na bezpečné straně.
