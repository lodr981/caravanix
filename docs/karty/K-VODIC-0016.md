---
id: K-VODIC-0016
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Dovolený úbytek napětí: 3 % pro elektroniku, kompresorovou lednici, měnič a nabíječku, 5 % pro běžné spotřebiče a 10 % pro světla a nekritické spotřebiče; elektronika, lednice i měnič při nízkém napětí vypínají a hlásí chyby."
hodnota: 3
jednotka: "%"
rozsah: [2.5, 10]
podminky: "Úbytek vztažený k jmenovitému napětí 12 nebo 24 V, součet úbytku na plusovém i mínusovém vodiči."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2.7: obvody, kde musí být úbytek minimální (elektronika, navigační světla, hlavní napáječe), max. 3 %; osvětlení a nekritické obvody max. 10 %"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7: doporučení úbytek nejvýš 2,5 %; 2.8: nízké napětí u měniče může spustit alarm podpětí"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "Fig. 3: standardní ochrana baterie 12 V cut-out 10,4 V, cut-in 11,7 V (24 V: 22,8 / 24,2 V); Fig. 2: max. délky kabelu 2,5 mm² 2,5 m, 4 mm² 4 m, 6 mm² 6 m, 10 mm² 10 m (12 V)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Votronic: Broschüre Wechselrichter 2025"
    url: "https://www.votronic.de/download/103/produktbroschueren/20019/broschuere-wechselrichter2025_low.pdf"
    misto: "PDF s. 9, Allgemeine technische Daten: Batterieunterspannung min. 10,5 V (lastabhängig)"
    datum-overeni: 2026-11-16
vypocet: "12 V: 3 % = 0,36 V, 5 % = 0,6 V, 10 % = 1,2 V. Rezerva k vypnutí lednice Secop (10,4 V) při baterii 12,0 V: s 3 % úbytku je u kompresoru 11,64 V, s 10 % 10,8 V. Tabulka Secop (12 V): L/A = 1 m/mm²; při ρ = 0,0175 a 3 % to odpovídá proudu 0,36/(2 × 0,0175 × 1) = 10,3 A."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Hodnoty 3 % a 10 % jsou přímo v ABYC E-11. Hodnota **5 % pro „běžné“ spotřebiče nemá v otevřených zdrojích oporu** – je to mezistupeň reference (rozhodnutí odborníka). Victron doporučuje přísnějších 2,5 % (pro systém s měničem).

Vypínání při nízkém napětí je doloženo pro kompresorovou lednici (Secop BD35F: 10,4 V) a měnič (Votronic: 10,5 V; Victron obecně). Secop navíc pro 12 V předepisuje maximální délky kabelu, které dobře odpovídají 3% kritériu.

Pro „nabíječku“ jsem samostatný zdroj nenašel; u nabíjení je úbytek problém spíš proto, že baterie se nedobije (Victron 2.8).
