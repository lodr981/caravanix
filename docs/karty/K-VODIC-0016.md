---
id: K-VODIC-0016
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Dovolený úbytek napětí: 3 % pro elektroniku, kompresorovou lednici, měnič a nabíječku, 5 % pro běžné spotřebiče a 10 % pro světla a nekritické spotřebiče; elektronika, lednice i měnič při nízkém napětí vypínají a hlásí chyby."
hodnota: 3
jednotka: "%"
rozsah: [2.5, 10]
podminky: "Úbytek vztažený k jmenovitému napětí 12 nebo 24 V, součet úbytku na plusovém i mínusovém vodiči. 3 % a 10 % jsou meze ABYC E-11 (a Philippi). Zařazení lednice, měniče a nabíječky pod 3 % je výklad položky „electronic equipment“ / „circuits where voltage drop must be kept to a minimum“; ABYC je výslovně nejmenuje. 5 % je rozhodnutí odborníka (Radek), žádná norma ani výrobce ho neuvádí. Victron pro systém s měničem doporučuje přísnějších 2,5 %."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2.7: hlavní napáječe, ventilátory podpalubí, elektronika, navigační světla a obvody, kde má být úbytek minimální: max. 3 %; osvětlení (mimo navigační) a nekritické obvody: max. 10 %"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Philippi: katalog Absicherung (oddíl Bordnetzschutz und Spannungsabfall)"
    url: "https://www.philippi-online.de/cdn/shop/files/Absicherung_26.pdf"
    misto: "PDF s. 3: úbytek nesmí překročit 10 %; u bezpečnostně důležitých spotřebičů (hlavní přívod rozvaděče, navigační světla, ventilátory a čerpadla podpalubí) 3 %"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: 5 % úbytek pro běžné spotřebiče, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 „5 % úbytek a stropy CAPN/CAPH jsou rozhodnutí odborníka (Radek)“"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7: doporučení úbytek nejvýš 2,5 %; 2.8: nižší napětí u měniče může spustit alarm podpětí"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "Fig. 3: standardní ochrana baterie 12 V cut-out 10,4 V, cut-in 11,7 V (24 V: 22,8 / 24,2 V); chybový kód 1 Battery protection cut-out; Fig. 2: max. délky kabelu 2,5 mm² 2,5 m, 4 mm² 4 m, 6 mm² 6 m, 10 mm² 10 m (12 V)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Votronic: Broschüre Wechselrichter 2025"
    url: "https://www.votronic.de/download/103/produktbroschueren/20019/broschuere-wechselrichter2025_low.pdf"
    misto: "PDF s. 8, Allgemeine technische Daten: Batterieunterspannung min. 10,5 V (lastabhängig, dynam.)"
    datum-overeni: 2026-11-16
vypocet: "12 V: 2,5 % = 0,30 V, 3 % = 0,36 V, 5 % = 0,6 V, 10 % = 1,2 V. Rezerva k vypnutí lednice Secop (10,4 V) při baterii 12,0 V: s 3 % úbytku je u kompresoru 11,64 V, s 10 % 10,8 V. Tabulka Secop (12 V): L/A = 1 m/mm²; při ρ = 0,0175 a 3 % odpovídá proudu 0,36/(2 × 0,0175 × 1) = 10,3 A, při ρ = 0,0191 (v2) 9,4 A."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) 5 % má zdroj `rozhodnuti-odbornika`, Radek schválil 16. 11. 2026. (2) Do podmínek výslovně: zařazení lednice, měniče a nabíječky pod 3 % je výklad ABYC, ne jeho text; Victron u měniče radí přísnějších 2,5 %. (3) Strana Votronic opravena na PDF s. 8 (podle nálezu ověřovatele). (4) Přidán Philippi jako druhý zdroj pro 3 % a 10 %.

Pro „nabíječku“ samostatný zdroj nemám; u nabíjení je úbytek problém hlavně proto, že se baterie nedobije (Victron 2.8).
