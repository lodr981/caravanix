---
id: K-VODIC-0025
trida: C
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Délka je skutečná trasa kabelu od baterie (nebo pojistkové skříňky) ke spotřebiči, ne vzdušná čára; kalkulačka sama počítá s tím, že proud teče tam i zpět; k délce je dobré přičíst 10–20 % na ohyby a rezervu."
hodnota: null
jednotka: "%"
rozsah: [10, 20]
podminky: "Vstup „Délka kabelu [m], jedna cesta“."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2 (vzorec úbytku): L = délka vodiče od plusového připojení zdroje ke spotřebiči a zpět k mínusovému připojení"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.1: tabulka maximálního proudu používá celkovou délku kabelu (plus + mínus)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka Jak kalkulačku použít, bod 2; kód Lc = L × ret"
    datum-overeni: 2026-11-16
vypocet: "Kalkulačka: Lc = L × 2 pro vlastní mínus, L × 1 přes kostru."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0025-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Počítání délky tam i zpět je doloženo ABYC i Victron. Hodnota „10–20 % na ohyby a rezervu“ je praktická rada reference bez zdroje (rozhodnutí odborníka) – proto třída C. Použije se i v nákupním lístku (nápad A4 v KALKULACKA_PRUREZU.md).
