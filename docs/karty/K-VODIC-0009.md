---
id: K-VODIC-0009
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Maximální pojistka pro daný průřez je navíc omezena praktickými stropy, které stanovil autor kalkulačky (CAPN pro samostatně vedený kabel, CAPH ve svazku), např. 2,5 mm² nejvýš 20 A. Ve v1.1 je strop ve všech průřezech nižší než zatížitelnost × koeficient uložení (1,0 / 0,7), max. pojistku tedy určuje strop; u 120 mm² samostatně ji omezuje největší pojistka řady (250 A)."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Měděné automobilové lanko FLRY 105 °C, okolí do 30 °C (K-VODIC-0003 až 0005). CAPN (mm² → A): 0,5→7,5; 0,75→10; 1→15; 1,5→15; 2,5→20; 4→30; 6→40; 10→60; 16→80; 25→100; 35→125; 50→150; 70→200; 95→250; 120→300. CAPH: 0,5→7,5; 0,75→10; 1→10; 1,5→15; 2,5→20; 4→25; 6→35; 10→50; 16→60; 25→80; 35→100; 50→125; 70→150; 95→200; 120→225. Mezi body log-log interpolace. Max. pojistka v1.1 = největší hodnota z řady FUSES (1–250 A, bez 300 A, K-VODIC-0010) ≤ min(AMP × k, strop), k = 1,0 samostatně (CAPN), 0,7 ve svazku (CAPH). Kde strop rozhoduje: samostatně je CAPN pod AMP × 1,0 ve všech 15 průřezech a po výběru z řady pojistek mění výsledek u 0,5; 0,75; 1,5; 2,5; 4; 6; 10; 25; 35; 50 a 70 mm²; u 1, 16 a 95 mm² by bez stropu vyšla stejná pojistka; u 120 mm² omezuje řada FUSES (250 A), ne strop (300 A). Ve svazku je CAPH pod AMP × 0,7 ve všech 15 průřezech, ale po výběru z řady pojistek dává v bodech řady MM stejný výsledek jako AMP × 0,7; mezi body (plochy AWG) výsledek snižuje. Hodnoty stropů nejsou převzaty z normy ani z tabulky výrobce; jsou to rozhodnutí odborníka (praxe autoelektriky)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: stropy CAPN a CAPH (logika v1 schválená 11. 11. 2026, v1.1 16. 11. 2026)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „5 % úbytek a stropy CAPN/CAPH jsou rozhodnutí odborníka (Radek).“; řádek „Kalkulačka průřezu v1.1 … platí výpočet v1 (… CAPN/CAPH)“; docs/reset/KALKULACKA_V1_1.md, Základ („stropy CAPN a CAPH (praxe autoelektriky) platí jako rozhodnutí odborníka“); pole CAPN a CAPH a funkce maxFuse() v docs/reference/kalkulacka-prurezu-v1.html"
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
vypocet: "CAPN / AMP: 0,625; 0,667; 0,789; 0,625; 0,625; 0,714; 0,741; 0,822; 0,816; 0,775; 0,791; 0,758; 0,816; 0,856; 0,872 (vše < 1,0). CAPH / AMP: 0,625; 0,667; 0,526; 0,625; 0,625; 0,595; 0,648; 0,685; 0,612; 0,620; 0,633; 0,631; 0,612; 0,685; 0,654 (vše < 0,7). Max. pojistka v1.1 se stropem / bez stropu: samostatně 0,5 7,5/10; 0,75 10/15; 1 15/15; 1,5 15/20; 2,5 20/30; 4 30/40; 6 40/50; 10 60/70; 16 80/80; 25 100/125; 35 125/150; 50 150/175; 70 200/225; 95 250/250; 120 250/250 A. Ve svazku ve všech 15 bodech stejně se stropem i bez: 7,5; 10; 10; 15; 20; 25; 35; 50; 60; 80; 100; 125; 150; 200; 225 A. Plochy AWG ve svazku se stropem / bez: AWG 16 10/15; 14 15/20; 12 20/25; 6 50/60; 4 70/80; 2 80/100; 2/0 125/150 A (ostatní stejně). Hustá mřížka 5 001 průřezů 0,5–120 mm²: strop mění výsledek samostatně v 4 676, ve svazku v 2 400 bodech. Příklad 2,5 mm²: samostatně i ve svazku 20 A (strop 20 A; bez stropu 30 / 20 A). Přepočteno v Node (reference v1 se změnami v1.1)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0009-2026-11-16-v11.md
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Věta „CAPH dnes v žádném bodě výsledek nemění (rozhoduje koeficient svazku 0,53)“ byla z verze 2 a ve v1.1 neplatí. Nahradila ji věta, co platí ve v1.1: strop je ve všech průřezech pod AMP × k (1,0 / 0,7). Samostatně mění strop výsledek u 11 z 15 průřezů. Ve svazku dává v bodech řady stejnou pojistku jako AMP × 0,7, mezi body (AWG) ji snižuje. U 120 mm² samostatně omezuje řada pojistek bez 300 A. Uložení „vedle sebe / kostra / svazek“ z verze 2 je nahrazené „samostatně / ve svazku“. Max. pojistky jsou přepočtené pro řadu FUSES v1.1. Zdroj zůstává rozhodnutí odborníka. Stav `navrh`, `overil` vynulováno.

Text webu (patička) nesmí tvrdit, že jde o hodnoty z normy. Má říkat „praktické stropy autora kalkulačky“ (praxe autoelektriky).

Drobnost (nepodstatná, jen poznámka): CAPN má 1 mm² stejně jako 1,5 mm² (15 A). Při AMP 19 A × 1,0 je to pod zatížitelností kabelu, tedy na bezpečné straně.

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** (1) Formulace „hodnoty běžné v autoelektrice“ nahrazena „praktické stropy, které stanovil autor kalkulačky“; zdroj je `rozhodnuti-odbornika`, Radek schválil 16. 11. 2026 (docs/ROZHODNUTI.md). Tím odpadá neověřitelný původ „z autoelektriky“. (2) Nález k logice (CAPN nad 0,8 × AMP, CAPH nad 0,532 × AMP) verze 2 řeší koeficienty uložení: max. pojistka je min(AMP × k, strop), takže strop nikde nepřekročí AMP × k. Výpočet v kartě to rozepisuje pro všechna čtyři uložení. (3) Příklad 2,5 mm² = 20 A upřesněn: platí pro uložení vedle sebe a kostra, ve svazku a motorovém prostoru vychází 15 A.

Text webu (patička) nesmí tvrdit, že jde o hodnoty z normy nebo „běžné v autoelektrice“; má říkat „praktické stropy autora kalkulačky“.

Drobnost k potvrzení zůstává: 1 mm² má CAPN 15 A jako 1,5 mm². Ve verzi 2 to u uložení vedle sebe dává 15 A pro 1 mm² (AMP × 0,8 = 15,2 A), tedy těsně pod zatížitelností.

**2. kolo Radka 16. 11. 2026: co se změnilo.** CAPH se týká jen svazku (motorový prostor se nepočítá). Přepočet s koeficientem 0,53 a nabízenými pojistkami ukázal, že CAPH dnes výsledek nikde nemění; Radek rozhodl, že CAPH zůstává jako pojistka pro budoucí změny koeficientů (předáno v zadání úkolu od hlavního vlákna; v docs/ROZHODNUTI.md jsem tuto větu doslova nenašel, je tam jen „CAPN pro první dva režimy, CAPH pro svazek“ – k doplnění Radkem). To je teď v tvrzení. Tvrzení se mění (CAPH bez motorového prostoru, nová věta), stav zpět na `navrh`. Formulace „kostra vždy CAPN, kromě 120 mm²“ z kola 2 vypuštěna (ověřovatel ji označil za nepřesnou).

**Poznámka mistra (16. 11. 2026):** stropy CAPN a CAPH platí ve v1.1 jako rozhodnutí odborníka. Věta „CAPH dnes nic nemění (rozhoduje 0,53)“ je z v2 a ve v1.1 (svazek 0,7) neplatí; karta se přepíše podle zadání v docs/STAV.md. Otázka „doplnit větu o CAPH do ROZHODNUTI.md“ se zavírá: v1.1 to řeší („stropy CAPN a CAPH platí jako rozhodnutí odborníka“).

Poznámka ověřovatele (v1.1, SEDÍ S POZNÁMKOU): Počty bodů platí pro logaritmickou mřížku (doplnit slovo „logaritmicky“).
