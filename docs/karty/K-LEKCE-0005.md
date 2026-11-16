---
id: K-LEKCE-0005
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Hned u lithiové baterie musí být hlavní pojistka, jejíž vypínací schopnost je aspoň tak velká jako zkratový proud baterie (typicky Class T); ostatní pojistky a odbočky jsou až za ní. Nožová, MIDI ani MEGA pojistka (vypínací schopnost 1 000–2 000 A) na to u běžné lithiové baterie nestačí."
hodnota: null
jednotka: null
rozsah: null
podminky: "Lithiová (LiFePO4) baterie, zkratový proud řádově tisíce A (K-LEKCE-0004). Vypínací schopnost: ATOF 1 000 A, MIDI a MEGA 2 000 A při 32 V DC, Class T Littelfuse JLLN 20 kA DC. Umístění u baterie podle K-VODIC-0013. Hláška kalkulačky průřezu nad 200 A je K-VODIC-0036; tato karta je obecné pravidlo pro lekci 4 a blok K2."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4.6 a 4.6.1"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6: hlavní pojistka baterie, za ní odbočky; 4.6.1: aspoň jedna pojistka musí mít vypínací schopnost ≥ předpokládanému zkratovému proudu (povinný bezpečnostní požadavek), jinak může selhat katastrofálně; tabulka: Class T 20 kA"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: Class T JLLN; ATOF; MIDI; MEGA (zdroje a místa jako v K-VODIC-0036)"
    url: "https://cdn.components.ru/media/PDF/8146417.pdf"
    misto: "JLLN s. 2: Interrupting Rating DC 20 kA (35–1200 A); ATOF 1000 A @ 32 VDC; MIDI a MEGA 2000 A @ 32 VDC"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: kalkulačka průřezu v1.1, hláška HLAVNI_VEDENI („pojistka Class T u baterie“)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16, v1.1 změna 2"
    datum-overeni: 2026-11-16
vypocet: "Zkratový proud 12,8 V baterie se 2 m kabelu 35 mm² ≈ 7 100 A (K-LEKCE-0004) > MEGA 2 000 A > ATOF 1 000 A; < Class T 20 000 A."
pouzito-v: [lekce-4-pojistka-u-baterie, lekce-10-kde-to-hori, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Karta převzala zdroje z K-VODIC-0036 (schválená) a K-VODIC-0013; nové je jen to, že pravidlo platí obecně (lekce, K2), ne jen nad 200 A v kalkulačce. Pokud hlavní vlákno uzná, že K-VODIC-0036 pravidlo pro lekci pokrývá, může tuto kartu vypustit.

„Class T“ je volba Radka; Victron připouští i jiný typ s dostatečnou vypínací schopností (proto „typicky“). Pojistky MRBF (10 kA při 14 V podle prodejců) jsem nehledal v datasheetu.
