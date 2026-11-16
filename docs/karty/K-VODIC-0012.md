---
id: K-VODIC-0012
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce."
hodnota: null
jednotka: null
rozsah: null
podminky: "Stejnosměrné obvody 12/24 V s baterií. „Max. pojistka kabelu“ = max. pojistka kalkulačky pro daný průřez a uložení (K-VODIC-0003, -0004, -0009); vyšší pojistka kabel při přetížení nebo zkratu nechrání, kabel se může přehřát, tavit izolaci a hrozí požár. Pojistka může chránit i zařízení (Victron: „wires and equipment“). U jednoho spotřebiče: pojistka podle proudu spotřebiče (kalkulačka: nejmenší nabízená hodnota s dovoleným trvalým proudem při 30 °C ≥ proud, K-VODIC-0038) a podle návodu výrobce (např. Secop BD35F předepisuje 15 A pro 12 V), vždy nejvýš max. pojistka kabelu. U více spotřebičů na jednom kabelu podle zatížitelnosti kabeláže (Victron)."
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
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "oddíl Power supply: pojistka 15 A pro 12 V a 7,5 A pro 24 V v plusovém kabelu u baterie, povinná (příklad, kdy velikost pojistky určuje návod výrobce spotřebiče)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: rozhodnutí sporu po druhém vrácení, 16. 11. 2026 (platí znění ověřovatele)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Spory po druhém vrácení: platí znění ověřovatele. … 0012: „Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce.““"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-pojistka, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0012-2026-11-16-kolo2.md
schvalil: "Radek, 2026-11-16 (docs/RYCHLA_ALFA.md, krok 0)"
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Tvrzení „chrání kabel, ne spotřebič“ bylo v rozporu s Victronem (chrání „wires and equipment“). Nově „chrání hlavně kabel; velikost se řídí kabelem, ne spotřebičem“, jak navrhl ověřovatel. Victron v `misto` citován celý. Přidán Philippi (dohledal ověřovatel, otevřel jsem: PDF s. 3), který dokládá „podle průřezu, ne podle spotřebiče“ jako druhý nezávislý zdroj. Odkaz na IEC 60364-4-43 (neotevřený) vypuštěn, tvrzení na něm nestojí. Do důsledků doplněn i zkrat (Philippi i Victron).

Stejnou úpravu potřebuje nadpis v textech („Pojistka chrání kabel, ne spotřebič“) – patří autorovi textu.

ABYC E-11 dovoluje až 150 % zatížitelnosti; tvrzení je přísnější, tedy na bezpečné straně.

**Spor po 2. vrácení rozhodl Radek 16. 11. 2026.** Ověřovatel v kole 2 (NESEDÍ) ukázal, že věta „velikost se řídí kabelem, ne spotřebičem“ odporuje kalkulačce (pojistka se volí podle proudu spotřebiče), Victronu i návodu Secop. Platí znění, které Radek převzal: „Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce.“ Tvrzení je přesně toto, podmínky přepsané, přidán Secop a rozhodnutí sporu. Philippi („podle průřezu, ne podle spotřebiče“) zůstává jen jako zdroj pro horní mez. Stav `overeno`, `schvalil` podle rozhodnutí sporu; jako karta třídy A ještě projde schválením v KE_SCHVALENI.
