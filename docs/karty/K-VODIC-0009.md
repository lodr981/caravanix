---
id: K-VODIC-0009
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Maximální pojistka pro daný průřez je navíc omezena praktickými stropy z autoelektriky (CAPN pro kabel vedený samostatně, CAPH ve svazku nebo motorovém prostoru), např. 2,5 mm² = 20 A."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Měděné automobilové lanko. CAPN (mm² → A): 0,5→7,5; 0,75→10; 1→15; 1,5→15; 2,5→20; 4→30; 6→40; 10→60; 16→80; 25→100; 35→125; 50→150; 70→200; 95→250; 120→300. CAPH: 0,5→7,5; 0,75→10; 1→10; 1,5→15; 2,5→20; 4→25; 6→35; 10→50; 16→60; 25→80; 35→100; 50→125; 70→150; 95→200; 120→225. Mezi body log-log interpolace."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek – praktické stropy pojistek z autoelektriky, logika kalkulačky schválená 11. 11. 2026"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "pole CAPN a CAPH v kódu; funkce maxFuse(); patička „Max. pojistka je navíc omezena hodnotami běžnými v autoelektrice (např. 2,5 mm² = 20 A)“"
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
vypocet: "Srovnání se zatížitelností VDE (AMP): CAPN/AMP = 0,63 (0,5; 1,5; 2,5 mm²) až 0,87 (120 mm²); CAPH/(0,7 × AMP) = 0,75 (1 mm²) až 0,98 (10 a 95 mm²). Ve všech 15 bodech je CAP ≤ AMP × k, takže maxFuse() je v tabulkových bodech vždy dán CAP. Přepočteno skriptem Node z polí reference."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Karta zachycuje Radkovo rozhodnutí z praxe (stav `navrh`, po ověření schvaluje Radek). Ověřil jsem jen vnitřní konzistenci: stropy jsou ve všech bodech pod zatížitelností VDE (i snížené na 70 %), tedy na bezpečné straně, a jsou monotónní (neklesají s průřezem).

Pro srovnání: ABYC E-11 dovoluje jištění až 150 % zatížitelnosti vodiče, IEC 60364-4-43 čl. 433.1 jištění do zatížitelnosti vodiče (In ≤ Iz). CAPN/CAPH jsou přísnější než obojí.

Drobnost: 1 mm² má CAPN 15 A, stejně jako 1,5 mm²; CAPH je pro 0,75 i 1 mm² shodně 10 A. Není to chyba, jen to stojí za potvrzení.

Nenašel jsem veřejný výrobní zdroj (např. tabulku výrobce automobilových kabelů s doporučenými pojistkami), se kterým by šlo CAPN/CAPH řádek po řádku porovnat.
