---
id: K-VODIC-0017
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "U 12 V tečou za stejný výkon velké proudy: 120 W je 10 A, 1 200 W už 100 A (proud = příkon ÷ napětí)."
hodnota: 100
jednotka: "A"
rozsah: null
podminky: "Jmenovité napětí 12 V, stejnosměrný příkon. Při nižším skutečném napětí baterie je proud vyšší (např. 1 200 W při 11,5 V ≈ 104 A)."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.2 Power: P = U × I; výkon je na všech napětích stejný"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka, oddíl Proč na průřezu záleží; kód: I = v / U"
    datum-overeni: 2026-11-16
vypocet: "I = P/U: 120/12 = 10 A; 1 200/12 = 100 A; 1 200/11,5 = 104,3 A. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Prostý výpočet. Kalkulačka počítá s jmenovitým napětím 12/24 V; při vybité baterii nebo pod zátěží je napětí nižší a proud o několik procent vyšší. Pro měnič viz K-VODIC-0019.
