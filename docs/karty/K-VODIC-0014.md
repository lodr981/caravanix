---
id: K-VODIC-0014
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pokud se kabel větví na tenčí, každá tenčí odbočka potřebuje vlastní, menší pojistku."
hodnota: null
jednotka: null
rozsah: null
podminky: "Rozvod 12/24 V z baterie, kde za hlavní pojistkou následují tenčí vodiče k jednotlivým spotřebičům."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6, Location of the DC fuses: hlavní pojistka baterie, za ní větve, každý spotřebič má vlastní pojistku; Current rating: u více spotřebičů pojistka podle zatížitelnosti kabeláže"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.5.1: každý vodič větve musí mít jištění v místě připojení k hlavnímu rozvaděči, pokud ho nechrání hlavní jistič/pojistka"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "IEC 60364-4-43, čl. 433.2 (umístění ochrany při snížení zatížitelnosti, např. změně průřezu) – text neotevřen, jen odkaz"
    url: ""
    misto: "čl. 433.2"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-pojistka, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Zásada je doložena návodem Victron a ABYC E-11. Číslo článku IEC 60364-4-43 (433.2) uvádím z paměti obsahu normy, text jsem neotevřel – ověřovatel ať ho potvrdí, nebo ho z karty vyškrtne.

ABYC výslovně připouští, že odbočku může chránit i hlavní pojistka, pokud je dost malá pro tenčí vodič; formulace „každá tenčí odbočka potřebuje vlastní pojistku“ je tedy přísnější, bezpečná zjednodušená rada.
