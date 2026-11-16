---
id: K-VODIC-0036
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Proud nad rozsahem kalkulačky (nad 200 A) znamená hlavní vedení od baterie; k němu patří pojistka u baterie s dostatečnou vypínací schopností, typicky Class T, a návrh má udělat odborník."
hodnota: 200
jednotka: "A (mez rozsahu kalkulačky v2)"
rozsah: null
podminky: "Hláška HLAVNI_VEDENI v kalkulačce verze 2: žádná pojistka z FUSES (bez 300 A, nejvýš 250 A) nesplní f ≥ 1,25 × I, tj. I > 250 / 1,25 = 200 A. Vypínací schopnost: automobilové pojistky Littelfuse 1000 A (ATOF, MINI, MAXI) a 2000 A (MIDI, MEGA) při 32 V; Class T Littelfuse JLLN 20 kA DC (35–1200 A). Požadavek „aspoň jedna pojistka s vypínací schopností ≥ zkratovému proudu baterie“ uvádí Victron výslovně pro lithiové baterie; ABYC E-11 požaduje vypínací schopnost hlavního jističe podle CCA olověné baterie. „Návrh odborníkem“ je rozhodnutí Radka."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6 (DC obvod má hlavní pojistku baterie, pak odbočky); 4.6.1 Interrupt rating and fuse selection for lithium systems (lithiové baterie dávají velmi vysoký zkratový proud; aspoň jedna pojistka musí mít vypínací schopnost ≥ předpokládanému zkratovému proudu, „mandatory safety requirement“; T pojistka s velmi vysokou vypínací schopností; tabulka: Class T 125–300 V, 20 kA); 4.7 (systém má vždy obsahovat hlavní pojistku)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "TABLE V-A (s. 49): minimální vypínací schopnost hlavního jističe 12 V a 24 V podle CCA baterie: do 650 CCA 1500 A, 651–1100 CCA 3000 A, nad 1100 CCA 5000 A; 11.12.1.7.2.3 (jistič s vypínací schopností podle TABLE V), pozn. 1 (pojistka před jističem)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: Class T Fuses JLLN Series (Revised 07/14/2022), kopie components.ru"
    url: "https://cdn.components.ru/media/PDF/8146417.pdf"
    misto: "s. 2 Specifications: DC 160 V (1–60 A), 125 V (70–1200 A); Interrupting Rating DC 50 kA (1–30 A), 20 kA (35–1200 A); UL 248-15 Class T"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse (Revised 04/08/2024) a MIDI (Revised 09/13/2023)"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "MEGA s. 1: Interrupting Rating 2000 A @ 32 V DC; MIDI (https://static.chipdip.ru/lib/675/DOC038675898.pdf) s. 1: 2000 A @ 32 VDC"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, hláška HLAVNI_VEDENI (docs/KALKULACKA_PRUREZU.md, docs/ROZHODNUTI.md 16. 11. 2026)"
    url: "docs/KALKULACKA_PRUREZU.md"
    misto: "kapitola Verze 2, Výpočet, body 4 a 11"
    datum-overeni: 2026-11-16
vypocet: "Mez: největší pojistka v FUSES v2 = 250 A; 250 / 1,25 = 200,0 A. Při proudu nad 200 A hláška HLAVNI_VEDENI. Poměr vypínacích schopností: Class T JLLN 20 000 A / MEGA 2000 A = 10×."
pouzito-v: [kalkulacka-prurez, lekce-pojistka]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 1. kole ověření pro hlášku HLAVNI_VEDENI.

Co je doloženo: hlavní pojistka u baterie (Victron 4.6, 4.7; ABYC 11.12.1.2 vzdálenost, K-VODIC-0013), požadavek na vypínací schopnost (Victron 4.6.1 pro lithium, ABYC TABLE V-A pro jističe podle CCA) a že Class T má vypínací schopnost řádově vyšší než MEGA/MIDI (Littelfuse JLLN 20 kA proti 2 kA).

Co doloženo není: že Class T je jediná vhodná volba. Victron připouští i jiné typy s dostatečnou vypínací schopností. Proto „typicky Class T“. Zkratový proud konkrétní baterie (lithium vs. olovo) jsem v datasheetech baterií nehledal; to by byla samostatná karta.

ABYC TABLE V-A se týká jističů, ne pojistek; jako doklad „vypínací schopnost se volí podle baterie“ ji beru jen podpůrně. Blue Sea Systems (články o Class T) blokuje automatické stažení.
