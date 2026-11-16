---
id: K-SOLAR-0001
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Průměrný denní výnos vodorovného panelu bez ztrát systému v kWh na 1 kWp pro každé město a měsíc je číselně roven dlouhodobému měsíčnímu průměru globálního záření na vodorovnou plochu v kWh/m²/den z NASA POWER (2001–2025), zaokrouhlenému na 0,1; hodnoty jsou v packages/data/src/solar-mesta.json."
hodnota: null
jednotka: "kWh/kWp/den"
rozsah: [0.6, 7.1]
podminky: "Panel vodorovně, bez stínění, bez ztrát systému (ty nese K-SOLAR-0002). Přibližné hodnoty pro okolí města: satelitní data v mřížce 1° × 1° (asi 110 × 75 km), ne konkrétní místo. Dlouhodobý průměr; jednotlivý měsíc v konkrétním roce se může lišit (zvlášť v zimě, inverze, sníh na panelu)."
zdroje:
  - typ: clanek
    nazev: "NASA POWER (Prediction Of Worldwide Energy Resources), Climatology API v2.10.1, parametr ALLSKY_SFC_SW_DWN (All Sky Surface Shortwave Downward Irradiance), komunita RE, zdroj dat SYN1DEG (CERES)"
    url: "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=14.42&latitude=50.08&format=JSON"
    misto: "Odpověď JSON, properties.parameter.ALLSKY_SFC_SW_DWN, hodnoty JAN–DEC v kWh/m²/den; header.range „January 2001 - December 2025“. Pro další města stejný dotaz se souřadnicemi níže."
    datum-overeni: 2026-11-16
vypocet: "1) Pro každé město dotaz na NASA POWER se souřadnicemi centra (šířka, délka): Praha 50,08 / 14,42; Brno 49,20 / 16,61; Ostrava 49,83 / 18,29; České Budějovice 48,97 / 14,47; Liberec 50,77 / 15,06; Mnichov 48,14 / 11,58; Vídeň 48,21 / 16,37; Krakov 50,06 / 19,94; Split 43,51 / 16,44; Benátky 45,44 / 12,32. Období dat 2001–2025 (25 let). 2) Převod: výkon panelu v kWp je definován při STC, tj. ozáření 1 kW/m². Panel 1 kWp na vodorovné ploše tedy bez ztrát vyrobí za den tolik kWh, kolik kWh/m² za den dopadne na vodorovnou plochu: 1 kWh/m² / 1 kW/m² × 1 kWp = 1 kWh. Hodnota v kWh/m²/den je proto číselně rovna kWh/kWp/den. Ztráty (teplota článků, regulátor, nečistoty, kabely) nejsou zahrnuty, nese je K-SOLAR-0002. 3) Zaokrouhlení na 0,1 polovinou nahoru (Math.round(x × 10) / 10 v Node, na čtyřmístných vstupech nenastal případ přesně na polovině). Kontrola: roční součet Praha ≈ 1 083 kWh/m², u Prahy běžně uváděný řád kolem 1 100 kWh/m² za rok."
pouzito-v: [kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Proč tento zdroj.** NASA POWER dává pro libovolné místo na světě dlouhodobý měsíční průměr globálního záření na vodorovnou plochu přímo v kWh/m²/den, s jasným obdobím (2001–2025) a jedním stejným postupem pro všechna města. API jsem použil jen při rešerši k odečtení hodnot; aplikace na něj nesahá (rozhodnutí Radka: v alfě bez PVGIS a bez živých dat). Druhý zdroj jsem nehledal; roční součty (asi 1 080–1 200 kWh/m² ve střední Evropě, 1 400–1 500 na Jadranu) odpovídají běžně uváděnému řádu.

**Na co si dát pozor.**
- **Liberec má stejné hodnoty jako Praha.** Data mají rozlišení 1° a obě souřadnice spadají do stejné buňky mřížky (ověřeno dotazy na délky 14,9 až 15,5 – vždy stejné hodnoty). Liberec je ve skutečnosti spíš o něco méně slunečný (hory, oblačnost), takže hodnota může být mírně optimistická. Pro alfu, kde jde o přibližné průměry, to považuji za nepodstatné; když bude potřeba jemnější rozlišení, je vhodnější PVGIS nebo Global Solar Atlas (ručně odečtené).
- Satelitní data mohou v zimě nadhodnocovat při sněhové pokrývce a inverzích; zimní měsíce (kolem 0,6–1 kWh/kWp/den ve střední Evropě) berte jako horní odhad.
- Vodorovný panel je pro obytňák typický. Nakloněný panel by v zimě vyrobil víc, v létě o něco méně; to tato data neřeší.
- Kód země `zeme` je podle zvyku zadání (`cs` pro Česko); ostatní země dostaly ISO kódy `de`, `at`, `pl`, `hr`, `it`. Ať je ověří autor dat (Česko je v ISO 3166 `cz`, `cs` je kód jazyka).
