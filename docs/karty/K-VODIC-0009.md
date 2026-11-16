---
id: K-VODIC-0009
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Maximální pojistka pro daný průřez je navíc omezena praktickými stropy, které stanovil autor kalkulačky (CAPN pro uložení vedle sebe a mínus přes kostru, CAPH pro svazek), např. 2,5 mm² nejvýš 20 A. CAPH dnes v žádném bodě výsledek nemění (rozhoduje koeficient svazku 0,53) a zůstává jako pojistka pro budoucí změny koeficientů."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Měděné automobilové lanko. CAPN (mm² → A): 0,5→7,5; 0,75→10; 1→15; 1,5→15; 2,5→20; 4→30; 6→40; 10→60; 16→80; 25→100; 35→125; 50→150; 70→200; 95→250; 120→300. CAPH: 0,5→7,5; 0,75→10; 1→10; 1,5→15; 2,5→20; 4→25; 6→35; 10→50; 16→60; 25→80; 35→100; 50→125; 70→150; 95→200; 120→225. Mezi body log-log interpolace. Max. pojistka ve verzi 2 (2. kolo) = největší nabízená hodnota (ATOF 1–30, MIDI 40–125, MEGA 150–250 A) ≤ min(AMP × k, strop); strop rozhoduje jen tam, kde je nižší než AMP × k (K-VODIC-0004). „2,5 mm² nejvýš 20 A“ je strop; max. pojistka kalkulačky je pro 2,5 mm² ve svazku 15 A. Hodnoty nejsou převzaty z normy ani z tabulky výrobce."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: stropy CAPN a CAPH, schváleno 16. 11. 2026 (logika v1 schválená 11. 11. 2026, v2 beze změny); 2. kolo: CAPN pro první dva režimy, CAPH pro svazek"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 „5 % úbytek a stropy CAPN/CAPH jsou rozhodnutí odborníka (Radek)“; řádek 2. kola „Uložení kabelu: … CAPN pro první dva režimy, CAPH pro svazek.“; docs/KALKULACKA_PRUREZU.md, Verze 2, Tabulky beze změny (CAPN, CAPH) a Výpočet bod 5; pole CAPN a CAPH v docs/reference/kalkulacka-prurezu-v1.html"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "Table 12-1 sloupec A – srovnávací horní mez (VDE 0298-4 tab. 11)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.5.2 – srovnání: jištění větve smí být až 150 % zatížitelnosti vodiče podle TABLE IV"
    datum-overeni: 2026-11-16
vypocet: "CAPN/AMP: 0,625; 0,667; 0,789; 0,625; 0,625; 0,714; 0,741; 0,822; 0,816; 0,775; 0,791; 0,758; 0,816; 0,856; 0,872. CAPH/AMP: 0,625; 0,667; 0,526; 0,625; 0,625; 0,595; 0,648; 0,685; 0,612; 0,620; 0,633; 0,631; 0,612; 0,685; 0,654. Verze 2, 2. kolo, max. pojistka se stropem a bez něj (nabízené hodnoty z packages/data/src/pojistky.json): svazek (k 0,53, CAPH): AMP × 0,53 < CAPH ve všech bodech kromě 1 mm² (10,07 proti 10,0), i tam vyjde 10 A s CAPH i bez něj → CAPH výsledek nemění v žádném z 15 bodů řady MM, v žádné z 15 ploch AWG ani na husté mřížce 5 000 průřezů 0,5–120 mm². Vedle sebe (k 0,76, CAPN): v bodech MM strop výsledek nemění, mění ho mezi body (např. AWG 14 = 2,08 mm²). Kostra (k 1,0, CAPN): strop rozhoduje u 0,5; 0,75; 1,5; 2,5; 4; 6; 10; 25; 35; 50; 70 mm². Příklad 2,5 mm²: vedle sebe a kostra 20 A (strop CAPN 20 A), svazek 15 A (16,96 → 15). Přepočteno v Pythonu nezávislou implementací kapitoly „Verze 2: co platí“."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) Formulace „hodnoty běžné v autoelektrice“ nahrazena „praktické stropy, které stanovil autor kalkulačky“; zdroj je `rozhodnuti-odbornika`, Radek schválil 16. 11. 2026 (docs/ROZHODNUTI.md). Tím odpadá neověřitelný původ „z autoelektriky“. (2) Nález k logice (CAPN nad 0,8 × AMP, CAPH nad 0,532 × AMP) verze 2 řeší koeficienty uložení: max. pojistka je min(AMP × k, strop), takže strop nikde nepřekročí AMP × k. Výpočet v kartě to rozepisuje pro všechna čtyři uložení. (3) Příklad 2,5 mm² = 20 A upřesněn: platí pro uložení vedle sebe a kostra, ve svazku a motorovém prostoru vychází 15 A.

Text webu (patička) nesmí tvrdit, že jde o hodnoty z normy nebo „běžné v autoelektrice“; má říkat „praktické stropy autora kalkulačky“.

Drobnost k potvrzení zůstává: 1 mm² má CAPN 15 A jako 1,5 mm². Ve verzi 2 to u uložení vedle sebe dává 15 A pro 1 mm² (AMP × 0,8 = 15,2 A), tedy těsně pod zatížitelností.

**2. kolo Radka 16. 11. 2026: co se změnilo.** CAPH se týká jen svazku (motorový prostor se nepočítá). Přepočet s koeficientem 0,53 a nabízenými pojistkami ukázal, že CAPH dnes výsledek nikde nemění; Radek rozhodl, že CAPH zůstává jako pojistka pro budoucí změny koeficientů (předáno v zadání úkolu od hlavního vlákna; v docs/ROZHODNUTI.md jsem tuto větu doslova nenašel, je tam jen „CAPN pro první dva režimy, CAPH pro svazek“ – k doplnění Radkem). To je teď v tvrzení. Tvrzení se mění (CAPH bez motorového prostoru, nová věta), stav zpět na `navrh`. Formulace „kostra vždy CAPN, kromě 120 mm²“ z kola 2 vypuštěna (ověřovatel ji označil za nepřesnou).
