---
id: K-VODIC-0006
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kabel CCA (hliník poměděný) má vyšší odpor než měď: zhruba o 55–60 % vyšší měrný odpor, tj. vodivost asi o 35–37 % nižší."
hodnota: 1.59
jednotka: "násobek odporu mědi (CCA 10 % Cu)"
rozsah: [1.54, 1.59]
podminky: "Drát CCA podle ASTM B566 s 10 % nebo 15 % mědi (objemově), při 20 °C, vztaženo k IACS (100 % = 0,017241 Ω·mm²/m). Levné kabely z e-shopů nemusí odpovídat ASTM B566 a mohou být horší."
zdroje:
  - typ: datasheet
    nazev: "MWS Wire: Copper Clad Aluminum and Other Clad Metals (podle ASTM B-566)"
    url: "https://mwswire.com/wp-content/uploads/2024/03/MWS-copper-clad-aluminum-other-clad-metals.pdf"
    misto: "tabulka Clad Metals: CCA 10 % 62,9 % IACS, CCA 15 % 64,4 % IACS"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Ulbrich: Lite Weight CCA & SPCCA Capability Sheet (2020)"
    url: "https://www.ulbrich.com/uploads/data-sheets/Ulbrich-Lite-Weight-Copper-Clad-Aluminum-Data-Sheet.pdf"
    misto: "tabulka vlastností: CCA 10 % 62,85 % IACS, 2,74 × 10⁻⁸ Ω·m; CCA 15 % 64,42 % IACS, 2,67 × 10⁻⁸ Ω·m; měď 1,68 × 10⁻⁸ Ω·m"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ASTM B566 Standard Specification for Copper-Clad Aluminum Wire – text normy neotevřen"
    url: ""
    misto: "třídy 10A/10H/15A/15H (10 a 15 % mědi objemově)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka, oddíl mm² vs. AWG: „Ten má o asi 60 % horší vodivost.“"
    datum-overeni: 2026-11-16
vypocet: "Odpor CCA / odpor Cu = 1 / IACS: 1/0,629 = 1,590 (+59 %), 1/0,644 = 1,553 (+55 %). Vodivost: 62,9 % IACS = o 37 % nižší; 64,4 % = o 36 % nižší. ρ CCA 10 % = 0,017241/0,629 = 0,0274 Ω·mm²/m (shoda s Ulbrich 2,74 × 10⁻⁸ Ω·m). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Nález k formulaci (pro Radka a autora textů):** věta reference „má o asi 60 % horší vodivost“ se dá číst dvojím způsobem:
- „odpor je o 60 % vyšší“ (tj. vodivost je 1/1,6 = 63 % mědi) – to **sedí** se zdroji (+55 až +59 %);
- „vodivost je o 60 % nižší“ (tj. jen 40 % mědi) – to je **špatně**, vodivost je nižší jen o 35–37 %.
Doporučuji formulaci typu „má zhruba o 60 % vyšší odpor (vede asi o třetinu hůř)“. Tuto změnu textu neprovádím, rozhodne Radek / autor-zeme.

Hodnoty platí pro CCA vyrobený podle ASTM B566. U neznačených levných kabelů může být podíl mědi i průřez nižší, proto je vhodné v textu doporučit kontrolu (magnet nereaguje, ale CCA se pozná podle stříbřitého jádra po seškrábnutí).
Zatížitelnost (oteplení) CCA kabelu tato karta neřeší – viz K-VODIC-0007.
