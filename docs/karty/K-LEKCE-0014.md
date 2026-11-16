---
id: K-LEKCE-0014
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Parkovací klimatizace na 12/24 V s chladicím výkonem 2 000 W (Dometic CoolAir RTX 2000) odebírá při plném chlazení až asi 720 W (60 A při 12 V, 30 A při 24 V); střešní klimatizace na 230 V se srovnatelným chlazením (Dometic FreshJet 2200, 2 050 W podle ISO 5151) odebírá 4,1 A, tedy asi 940 VA. Spotřebu určuje chladicí výkon a účinnost kompresoru, ne napětí."
hodnota: 720
jednotka: "W (max. příkon RTX 2000 při chlazení, 60 A × 12 V)"
rozsah: [720, 943]
podminky: "Údaje výrobce: chladicí výkon podle ISO 5151, proud max. při chlazení. RTX 2000 v režimu Eco 8–9,5 A při 24 V (stránky výrobce se liší). U 230 V jednotky je 4,1 A × 230 V zdánlivý příkon (VA); činný příkon v datech není. Napájení 230 V z baterie přes měnič přidá ztrátu asi 10 % (K-VODIC-0019)."
zdroje:
  - typ: datasheet
    nazev: "Dometic: CoolAir RTX 2000, 12 V (9105306215) a 24 V (9600010208), technická data na webu výrobce"
    url: "https://www.dometic.com/en/professional/product/dometic-coolair-rtx-2000-9105306215"
    misto: "Technical data: Input voltage 12 V DC; Cooling Capacity ISO 5151 2000 W; Current consumption min cooling 5 A, max cooling 60 A. Varianta 24 V (https://www.dometic.com/en/professional/product/dometic-coolair-rtx-2000-9600010208): 2000 W, 5–30 A, Eco 9,5 A (popis) / 8 A (Highlights)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Dometic: FreshJet FJ1700, FJ2200, FJ3200, návod k obsluze, technická data (kopie manualslib.de)"
    url: "https://www.manualslib.de/manual/532344/Dometic-Freshjet-Fj1700.html?page=46"
    misto: "Technische Daten, FreshJet 2200: Kühlleistung Kompressor 2200 W, Kühlleistung nach ISO 5151 2050 W, Nennspannung 230 V / 50 Hz, Stromaufnahme Kühlen 4,1 A"
    datum-overeni: 2026-11-16
vypocet: "RTX 2000: 60 A × 12 V = 720 W; 30 A × 24 V = 720 W. FreshJet 2200: 4,1 A × 230 V = 943 VA; přes měnič 90 % asi 1 048 W z baterie (horní odhad, VA ≥ W). Chlazení na watt příkonu: RTX 2000 ÷ 720 ≈ 2,8; FreshJet 2050 ÷ 943 ≈ 2,2. Přepočteno v Pythonu."
pouzito-v: [lekce-9-klimatizace-12v, kalkulacka-spotrebice, katalog-spotrebicu]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Nález k zásadě (test podstatnosti):** zásada v zadání říká „Stejné chlazení znamená stejné watty… ušetří se pouze ztráta měniče, obvykle kolem 10 %.“ Data Dometic ukazují, že konkrétní 12/24V parkovací klimatizace (kompresor s proměnnými otáčkami) má na stejné chlazení menší příkon než starší 230V střešní jednotka: rozdíl je víc než 10 %. Neplyne z napětí, ale z účinnosti kompresoru. Fyzikální jádro zásady platí (12 V samo nic nešetří, teče víc ampér), ale věta „ušetří se pouze ztráta měniče“ je v porovnání konkrétních výrobků nepřesná (bod 3 testu: může čtenáře splést). Bezpečnosti se to netýká. Navrhuji znění: „Napětí samo nic neušetří, rozhoduje účinnost kompresoru; 12V jednotka ušetří ztrátu měniče, kolem 10 %, a víc jen tehdy, když má účinnější kompresor.“ Rozhodne mistr; zadání neměním.

Nejistoty: činný příkon FreshJet 2200 v datech není (jen proud); výrobce na webu uvádí u starší verze i 950 W (sekundární výpis, neotevřel jsem). Údaje RTX z webové stránky výrobce, ne z PDF datasheetu; Eco proud se mezi stránkami liší (8 / 9,5 A). Do katalogu spotřebičů jsou tyto hodnoty jen orientační, typická spotřeba za hodinu (střídání kompresoru) v datech není.
