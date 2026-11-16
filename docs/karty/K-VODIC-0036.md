---
id: K-VODIC-0036
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Nad 200 A (největší pojistka řady 250 A ÷ 1,25) kalkulačka nepočítá a hlásí: „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“ Nad 150 A navíc: „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“"
hodnota: 200
jednotka: "A (mez rozsahu kalkulačky v1.1)"
rozsah: null
podminky: "Hláška HLAVNI_VEDENI v kalkulačce v1.1 (změna 2): žádná pojistka z řady FUSES (bez 300 A, K-VODIC-0010) není ≥ 1,25 × proud (K-VODIC-0011), tedy proud nad 250 ÷ 1,25 = 200 A; při 200 A přesně kalkulačka ještě počítá s pojistkou 250 A. Hláška NAD_150A_MENIC (změna 3) při proudu nad 150 A při jakémkoli napětí; druhá věta stojí na K-VODIC-0033. Znění obou hlášek rozhodl Radek (v1.1). Proč Class T: hlavní pojistka u baterie musí mít vypínací schopnost alespoň zkratový proud baterie (Victron výslovně pro lithiové baterie, ABYC E-11 pro hlavní jistič podle CCA olověné baterie); Littelfuse ATOF má 1000 A, MIDI a MEGA 2000 A při 32 V DC, Class T Littelfuse JLLN 20 kA DC (35–1200 A). Class T je volba z rozhodnutí Radka; Victron připouští i jiné typy s dostatečnou vypínací schopností."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: kalkulačka průřezu v1.1, změny 2 a 3 (mez 200 A, znění hlášek)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádky 2026-11-16 „v1.1, změna 2: … mez rozsahu = největší pojistka ÷ 1,25 = 200 A; nad mezí hláška „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.““ a „v1.1, změna 3: nad 150 A navíc hláška …“; docs/KALKULACKA_PRUREZU.md, Verze 1.1, Čtyři změny body 2 a 3 a Pořadí hlášek"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6 (DC obvod má hlavní pojistku baterie, pak odbočky); 4.6.1 Interrupt rating and fuse selection for lithium systems (aspoň jedna pojistka musí mít vypínací schopnost ≥ předpokládanému zkratovému proudu, „mandatory safety requirement“; T pojistka s velmi vysokou vypínací schopností; tabulka: Class T 125–300 V, 20 kA); 4.7 (systém má vždy obsahovat hlavní pojistku)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "TABLE V-A (s. 49): minimální vypínací schopnost hlavního jističe 12 V a 24 V podle CCA baterie: do 650 CCA 1500 A, 651–1100 CCA 3000 A, nad 1100 CCA 5000 A; 11.12.1.7.2.3, pozn. 1"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: Class T Fuses JLLN Series (Revised 07/14/2022), kopie components.ru"
    url: "https://cdn.components.ru/media/PDF/8146417.pdf"
    misto: "s. 2 Specifications: DC 160 V (1–60 A), 125 V (70–1200 A); Interrupting Rating DC 50 kA (1–30 A), 20 kA (35–1200 A); UL 248-15 Class T"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: ATOF (Revised 08/18/2022), MIDI (Revised 09/13/2023) a MEGA (Revised 04/08/2024)"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "MEGA s. 1: Interrupting Rating 2000 A @ 32 V DC; MIDI (https://static.chipdip.ru/lib/675/DOC038675898.pdf) s. 1: 2000 A @ 32 VDC; ATOF (https://static.chipdip.ru/lib/614/DOC034614307.pdf) s. 1: 1000 A @ 32 VDC"
    datum-overeni: 2026-11-16
vypocet: "Mez: 250 ÷ 1,25 = 200 A. Kontrola v Node (reference v1 se změnami v1.1): I = 199,99 A → pojistka 250 A; I = 200 A → 250 A (1,25 × 200 = 250); I = 200,0001 A → HLAVNI_VEDENI. Hláška nad 150 A: I = 150 A ne, I = 150,01 A ano (podmínka I > 150). Poměr vypínacích schopností: Class T JLLN 20 000 A / MEGA 2000 A = 10×; MEGA / ATOF = 2000 / 1000 = 2×."
pouzito-v: [kalkulacka-prurez, lekce-pojistka]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0036-2026-11-16-v11.md
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Mez rozsahu je teď 250 ÷ 1,25 = 200 A, už ne tabulka MEGA 250 A (199,888… A, verze 2). Tvrzení cituje znění hlášky HLAVNI_VEDENI od Radka (v1.1). Přibyla hláška nad 150 A (NAD_150A_MENIC) s odkazem na K-VODIC-0033. Zdroje k vypínací schopnosti a Class T (Victron, ABYC, Littelfuse) zůstávají jako doklad, proč Class T. „Typicky Class T, ne povinnost“ uzavřel mistr: znění rozhodl Radek. Stav `navrh`, `overil` vynulováno.

Co doloženo není (beze změny): zkratový proud konkrétní baterie. ABYC TABLE V-A se týká jističů, ne pojistek, je jen podpůrný zdroj.

### Historie (před přepisem na v1.1)

Nová karta po 1. kole ověření pro hlášku HLAVNI_VEDENI.

Co je doloženo: hlavní pojistka u baterie (Victron 4.6, 4.7; ABYC 11.12.1.2 vzdálenost, K-VODIC-0013), požadavek na vypínací schopnost (Victron 4.6.1 pro lithium, ABYC TABLE V-A pro jističe podle CCA) a že Class T má vypínací schopnost řádově vyšší než MEGA/MIDI (Littelfuse JLLN 20 kA proti 2 kA).

Co doloženo není: že Class T je jediná vhodná volba. Victron připouští i jiné typy s dostatečnou vypínací schopností. Proto „typicky Class T“. Zkratový proud konkrétní baterie (lithium vs. olovo) jsem v datasheetech baterií nehledal; to by byla samostatná karta.

ABYC TABLE V-A se týká jističů, ne pojistek; jako doklad „vypínací schopnost se volí podle baterie“ ji beru jen podpůrně. Blue Sea Systems (články o Class T) blokuje automatické stažení.

**1. vrácení (kolo 2) a 2. kolo Radka 16. 11. 2026: co se změnilo.** (1) Podle nálezu kola 2: vypínací schopnost ATOF (1000 A @ 32 VDC) má teď zdroj (datasheet ATOF s. 1, ověřeno ve staženém PDF). MINI a MAXI z podmínek vypuštěny: kalkulačka je po 2. kole nenabízí. (2) Mez rozsahu už není 250 / 1,25 = 200 A, ale plyne z tabulky: I30 MEGA 250 A = 199,889 A (K-VODIC-0038). Tvrzení, hodnota a výpočet upravené. Stav `navrh`.

Hlavní vlákno 16. 11. 2026: mez 199,889 A je zaokrouhlená nahoru, přesně 1799/9 = 199,888… A (stejně jako K-VODIC-0038); vráceno do 4. kola ověření.

**Poznámka mistra (16. 11. 2026):** ve v1.1 je mez rozsahu 250 ÷ 1,25 = 200 A (ne tabulka MEGA 199,888… A) a text hlášky „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“ Otázka „Class T typicky, ne povinnost“ se zavírá: znění hlášky rozhodl Radek ve v1.1. Přepis podle zadání v docs/STAV.md.
