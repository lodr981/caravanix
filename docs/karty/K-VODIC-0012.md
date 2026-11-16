---
id: K-VODIC-0012
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pojistka chrání kabel, ne spotřebič: nesmí být vyšší, než kabel snese, jinak se tenký kabel při přetížení přehřeje, taví se izolace a hrozí požár."
hodnota: null
jednotka: null
rozsah: null
podminky: "Stejnosměrné obvody 12/24 V s baterií. „Kabel snese“ = zatížitelnost vodiče v daném uložení (K-VODIC-0003, -0004, -0009)."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6 DC Fuses and circuit breakers: pojistka chrání vodiče před nadproudem a zkratem, který může způsobit přehřátí nebo požár; odstavec Current rating: u jednoho spotřebiče pojistka podle nižšího z proudu spotřebiče a zatížitelnosti kabelu, u více spotřebičů podle zatížitelnosti kabeláže"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.5.2 a 11.12.1.4: pojistka větve nesmí překročit 150 % zatížitelnosti vodiče (TABLE IV)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "IEC 60364-4-43 / HD 60364-4-43:2010, čl. 433.1 – text neotevřen, jen odkaz (zmíněno v Lapp T12, s. 1)"
    url: ""
    misto: "čl. 433.1 (koordinace jistícího prvku a zatížitelnosti vodiče)"
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

Hlavní myšlenka je doložena návodem Victron a normou ABYC E-11.

**Nález (rozdíl mezi zdroji):** ABYC E-11 dovoluje pojistku až 150 % zatížitelnosti vodiče; Victron a IEC 60364-4-43 jsou přísnější (do zatížitelnosti). Reference je přísnější než ABYC – v pořádku na bezpečné straně.

Victron uvádí, že pojistka chrání „vodiče a zařízení“ – formulace „chrání kabel, ne spotřebič“ je didaktické zjednodušení (pojistka může omezit škody i ve spotřebiči, ale dimenzuje se podle kabelu). Doporučuji v textu „pojistka chrání hlavně kabel“.

ABYC E-11 je vydání 2003 (veřejná kopie). Novější revize (2025) jsem neotevřel.
