---
id: K-VODIC-0026
trida: C
stav: navrh
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
    misto: "4.5 Cable runs: silnější kabel = menší úbytek a méně tepla; 4.1: správná tloušťka kabelu je důležitá, příliš tenký kabel má přímý negativní vliv; 4.3 Cable connections: kabelová oka musí odpovídat tloušťce kabelu (opora pro výhradu ke svorkám)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "příručka Jak kalkulačku použít, bod 4; kód: idx = MM.findIndex(ok) – první vyhovující průřez; verze 2 stejně: docs/KALKULACKA_PRUREZU.md, Verze 2, Výpočet bod 7 (výběr průřezu: úbytek a maxFuse(a) ≥ pojistka; maxFuse je bod 6)"
    datum-overeni: 2026-11-16
vypocet: "Kontrola ověřovatele (v1): 120 W, 12 V, 4 m, 3 %, vlastní mínus → požadováno 3,89 mm², zvoleno 4 mm². Verze 2 po 2. kole (uložení par, k 0,76, ρ podle průřezu): 4 mm² ΔU = 0,0188 × 4 × 2 × 10 / 4 = 0,376 V > 0,36 V; 6 mm² ΔU = 0,2507 V ≤ 0,36 V → 6 mm², pojistka 15 A ATOF (I30 13,56 A ≥ 10 A), max. pojistka 6 mm² 40 A (min(54 × 0,76 = 41,0; CAPN 40)). Přepočteno v Pythonu (K-VODIC-0028)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Elektricky platí (menší odpor, menší úbytek a oteplení). Výhrady, které věta neříká: silnější kabel se nemusí vejít do svorek spotřebiče (např. Secop svorky, Victron doporučuje průřez v manuálu) a je těžší a dražší. Výměna kabelu za silnější **neopravňuje** ke zvětšení pojistky nad potřebu spotřebiče, pokud spotřebič nebo jeho přívodní kabel tenčí vodič obsahují. Doporučuji doplnit do textu lekce.

**1. vrácení: co se změnilo.** Karta věcně seděla, text webu tvrdil víc („Silnější kabel **nikdy** nevadí“). Výjimka se svorkami je teď přímo v tvrzení, slovo „nikdy“ text používat nesmí. „Nejmenší bezpečný průřez“ upřesněno na „nejmenší průřez, který pro zadané uložení splní úbytek i max. pojistku“ (verze 2, bod 7 výpočtu; v 1. vrácení chybně uvedeno „bod 6“); „bezpečný“ by sliboval víc, než kalkulačka kontroluje (např. kvalitu spojů).

**2. kolo Radka 16. 11. 2026:** přepočten jen kontrolní příklad v poli `vypocet` (odpor podle průřezu, 0,76, pojistka podle tabulky). Tvrzení se nemění, stav zůstává `overeno`; příklad je v seznamu ke kontrole ve 3. kole.

**Vrácení po 3. kole (nález K-VODIC-0026-2026-11-16-kolo3): co se změnilo.** Odkaz na Verzi 2 opraven z bodu 6 na **bod 7** (výběr průřezu; bod 6 je definice maxFuse), v `misto` i v poznámce 1. vrácení. Do zdroje Victron doplněn oddíl 4.3 (kabelová oka musí odpovídat tloušťce kabelu) jako opora výhrady ke svorkám (doporučení ověřovatele). Tvrzení i příklad beze změny (přepočet ověřovatele souhlasí). Stav z `overeno` na `navrh`, `overil` vynulováno.
