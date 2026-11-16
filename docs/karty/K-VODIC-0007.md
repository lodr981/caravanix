---
id: K-VODIC-0007
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pokud kabel je CCA, nestačí počítat s průřezem o stupeň větším ve všech velikostech: pro stejný úbytek napětí potřebuje CCA asi 1,6× větší průřez, a od 25 mm² výš už jeden stupeň řady 1,6× nedává."
hodnota: 1.59
jednotka: "potřebný násobek průřezu"
rozsah: [1.54, 1.59]
podminky: "Úbytek napětí, CCA 10–15 % mědi podle ASTM B566, řada průřezů kalkulačky (0,5 až 120 mm²). Zatížitelnost (oteplení) CCA kabelů není v otevřených zdrojích uvedena."
zdroje:
  - typ: datasheet
    nazev: "MWS Wire: Copper Clad Aluminum and Other Clad Metals"
    url: "https://mwswire.com/wp-content/uploads/2024/03/MWS-copper-clad-aluminum-other-clad-metals.pdf"
    misto: "tabulka Clad Metals: CCA 10 % 62,9 % IACS"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Ulbrich: Lite Weight CCA & SPCCA Capability Sheet"
    url: "https://www.ulbrich.com/uploads/data-sheets/Ulbrich-Lite-Weight-Copper-Clad-Aluminum-Data-Sheet.pdf"
    misto: "CCA 10 % 62,85 % IACS"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka: „Hledejte OFC / čistou měď, nebo počítejte s průřezem o stupeň větším.“; pole MM"
    datum-overeni: 2026-11-16
vypocet: "Potřebný poměr průřezů pro stejný odpor = 1/IACS = 1,55–1,59. Poměr sousedních průřezů řady MM: 1,5→2,5 1,67; 2,5→4 1,60; 4→6 1,50; 6→10 1,67; 10→16 1,60; 16→25 1,56; 25→35 1,40; 35→50 1,43; 50→70 1,40; 70→95 1,36; 95→120 1,26. Stupeň stačí (≥ 1,59) jen u 1,5→2,5, 2,5→4, 6→10, 10→16; u 4→6 (1,50) a 16→25 (1,56) těsně nestačí; od 25 mm² výš chybí 12–26 %. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Nález pro Radka:** rada reference „počítejte s průřezem o stupeň větším“ platí pro úbytek napětí jen u menších průřezů. U velkých průřezů (měnič, hlavní kabel baterie), kde se CCA kabely z e-shopů prodávají nejčastěji, by bylo potřeba až o dva stupně víc.

Ještě závažnější je oteplení: hliník má horší tepelné vlastnosti a slabší mechanické spoje (oka lisovaná na CCA). Zatížitelnost CCA kabelu ani doporučení výrobců pro jištění CCA kabelu jsem nenašel. Bezpečnější rada je CCA pro silové obvody nepoužívat vůbec; to je ale nové doporučení, ne obsah reference – rozhodne Radek.

Tvrzení na kartě je přeformulované z reference, aby bylo ověřitelné. Původní věta reference je v poli zdroje.

Chybí druhý nezávislý primární zdroj k bezpečnostní části (zatížitelnost CCA).
