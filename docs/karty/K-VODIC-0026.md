---
id: K-VODIC-0026
trida: C
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Výsledek kalkulačky je nejmenší průřez, který pro zadané uložení splní úbytek i max. pojistku; silnější kabel nevadí, pokud se vejde do svorek spotřebiče a držáku pojistky, slabší ano."
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
    misto: "příručka Jak kalkulačku použít, bod 4; kód: idx = MM.findIndex(ok) – první vyhovující průřez; verze 2 stejně: docs/KALKULACKA_PRUREZU.md, Výpočet bod 6"
    datum-overeni: 2026-11-16
vypocet: "Kontrola ověřovatele (v1): 120 W, 12 V, 4 m, 3 %, vlastní mínus → požadováno 3,89 mm², zvoleno 4 mm². Verze 2 (uložení vedle sebe, ρ 0,0191): Areq = 0,0191 × 4 × 2 × 10 / 0,36 = 4,24 mm² → 6 mm², pojistka 15 A ≥ 1,25 × 10 A, max. pojistka 6 mm² 40 A. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0026-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

Elektricky platí (menší odpor, menší úbytek a oteplení). Výhrady, které věta neříká: silnější kabel se nemusí vejít do svorek spotřebiče (např. Secop svorky, Victron doporučuje průřez v manuálu) a je těžší a dražší. Výměna kabelu za silnější **neopravňuje** ke zvětšení pojistky nad potřebu spotřebiče, pokud spotřebič nebo jeho přívodní kabel tenčí vodič obsahují. Doporučuji doplnit do textu lekce.

**1. vrácení: co se změnilo.** Karta věcně seděla, text webu tvrdil víc („Silnější kabel **nikdy** nevadí“). Výjimka se svorkami je teď přímo v tvrzení, slovo „nikdy“ text používat nesmí. „Nejmenší bezpečný průřez“ upřesněno na „nejmenší průřez, který pro zadané uložení splní úbytek i max. pojistku“ (verze 2, bod 6 výpočtu); „bezpečný“ by sliboval víc, než kalkulačka kontroluje (např. kvalitu spojů).
