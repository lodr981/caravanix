---
id: K-VYROBCE-0106
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Webasto Air Top 2000 STC 12 V se jistí pojistkou 15 A (24 V: 10 A, nejvýš 20 A) ve vodotěsném držáku u baterie; při startu potřebuje 75 W a napájení musí tento odběr snést bez poklesu napětí; průřez napájení výrobce dává svazkem kabelů, číslo v návodu není."
hodnota: null
jednotka: null
rozsah: null
podminky: "Air Top 2000 STC B/D, 12 V, napájení dodaným svazkem přímo z baterie nebo z centrální elektroinstalace; ne ze zásuvky zapalovače. Provozní napětí 10,5–16 V."
zdroje:
  - typ: navod
    nazev: "Webasto Thermo & Comfort N.A.: Air Top 2000 STC Installation Manual, P/N 5012634C, rev. 11/2021 (kopie u prodejce)"
    url: "https://www.vanlifeoutfitters.com/wp-content/uploads/2021/12/webasto-airtop-2000-stc-installation-manual.pdf"
    misto: "kap. 12.2 Supply Voltage Connection, s. 23: pojistka u baterie, 75 W při startu, Figure 27 F = 15 A (12 V) / 10 A (24 V). Legenda k Figure 36, s. 27: F1 15 A 12/24 V (20 A max.), plochá pojistka SAE J1284. Kap. 16 Technical Data, s. 37: provozní napětí 10,5–16 V, příkon 14–29 W"
    datum-overeni: 2026-11-18
vypocet: "Startovní proud 75 W / 12 V = 6,3 A; pojistka 15 A = 2,4 × startovní proud. Průřez v návodu není, odvozený úbytek proto nepočítám."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0106-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra: Pojistka je dimenzovaná na dodaný svazek a startovní odběr žhavicí svíčky, ne na provozní příkon 14–29 W (1,2–2,4 A). Kdo počítá jen z provozního příkonu, dostane pojistku 5 A a slabý kabel, na kterém topení při startu hlásí podpětí. Evropskou verzi návodu s tabulkou průřezů jsem v rozpočtu neotevřel.
