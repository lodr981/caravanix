---
id: K-VODIC-0026
trida: C
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Výsledek kalkulačky je nejmenší bezpečný průřez; silnější kabel nevadí, slabší ano."
hodnota: null
jednotka: null
rozsah: null
podminky: "Pojistka zůstává volená podle proudu spotřebiče a zatížitelnosti kabelu; silnější kabel musí mechanicky pasovat do svorek spotřebiče a pojistkového držáku."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: silnější kabel = menší úbytek a méně tepla; 4.1: správná tloušťka kabelu je důležitá, příliš tenký kabel má přímý negativní vliv"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka Jak kalkulačku použít, bod 4; kód: idx = MM.findIndex(ok) – první vyhovující průřez"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Elektricky platí (menší odpor, menší úbytek a oteplení). Výhrady, které věta neříká: silnější kabel se nemusí vejít do svorek spotřebiče (např. Secop svorky, Victron doporučuje průřez v manuálu) a je těžší a dražší. Výměna kabelu za silnější **neopravňuje** ke zvětšení pojistky nad potřebu spotřebiče, pokud spotřebič nebo jeho přívodní kabel tenčí vodič obsahují. Doporučuji doplnit do textu lekce.
