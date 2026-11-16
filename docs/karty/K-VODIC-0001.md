---
id: K-VODIC-0001
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka počítá úbytek s měrným odporem mědi 0,0175 Ω·mm²/m (samostatně vedený kabel)."
hodnota: 0.0175
jednotka: "Ω·mm²/m"
rozsah: null
podminky: "Měď, stejnosměrný proud, režim „samostatně“ (plus a mínus vedle sebe nebo mínus přes kostru); ve svazku platí 0,0216 (K-VODIC-0002). Stejná hodnota pro všechny průřezy 0,5–120 mm² a pro plochy AWG. 0,0175 je o 1,5 % víc než ρ čisté žíhané mědi při 20 °C podle NIST (0,017241), tj. měď asi při 24 °C. Poznámka (v1.1): skutečné automobilové lanko FLRY-B má podle datasheetu při 20 °C efektivní ρ 0,0181–0,0191 Ω·mm²/m (podle průřezu). Rozdíl proti skutečnému lanku mění úbytek o desetiny procentního bodu a na rozhodnutí uživatele nemá vliv (Radek, v1.1)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: ρ 0,0175 v kalkulačce v1 (logika schválená 11. 11. 2026) a v1.1 (16. 11. 2026)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Kalkulačka průřezu v1.1 … platí výpočet v1 (ρ 0,0175 / 0,0216 …)“ a řádek „v1.1: ρ zůstává 0,0175 (K-VODIC-0001 jen poznámka)“; docs/reset/KALKULACKA_V1_1.md, Co se nemění; docs/KALKULACKA_PRUREZU.md, Verze 1.1, Beze změny z v1; kód reference v1: rho = hot ? 0.0216 : 0.0175"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables (1966), International Annealed Copper Standard"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9: 0,017 241 Ω·mm²/m při 20 °C; PDF s. 9 a 10: α20 = 0,003 93 /°C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru) – jen k poznámce o skutečném lanku"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "PDF s. 2, tabulka FLRY-B, sloupec „Resistance at 20 °C (max.) mΩ/m“, řádky 1 x 0,50 až 1 x 70,00"
    datum-overeni: 2026-11-16
vypocet: "0,0175 / 0,017241 = 1,0150 → teplota mědi 20 + 0,0150 / 0,00393 ≈ 23,8 °C. Skutečné lanko FLRY-B (efektivní ρ = odpor × průřez, 0,0181 až 0,0191): poměr k 0,0175 je 1,034 až 1,091. Úbytek, který kalkulačka spočítá přesně na hranici, by u skutečného lanka byl: 3 % → 3,10–3,27 %; 5 % → 5,17–5,46 %; 10 % → 10,34–10,91 %. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0001-2026-11-16-v11.md
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Karta tvrdila odpor podle průřezu z datasheetu FLRY-B (verze 2). Ve v1.1 platí jedno ρ 0,0175 pro samostatně vedený kabel (rozhodnutí Radka, v1 a v1.1), tvrzení je přepsané. Zdroj: rozhodnutí odborníka a NIST jako srovnání. Tabulka FLRY-B zůstává jen jako poznámka v `podminky`; `rozsah` a odkaz na `odpor-vodicu.json` jsou odstraněné (soubor patří k archivu v2). Stav `navrh`, `overil` vynulováno.

Poznámka k větě Radka „mění úbytek o desetiny procentního bodu“: platí pro volby 3 % a 5 % (nejvýš o 0,27 a 0,46 bodu). Při volbě 10 % je rozdíl nejvýš asi 0,9 bodu. Test podstatnosti: nepodstatné. Úbytek nerozhoduje o oteplení ani o pojistce (to dělá max. pojistka podle K-VODIC-0003, 0004 a 0009), takže kabel ani pojistka nebudou nebezpečnější. Uživatel s volbou 10 % navíc úbytek nepotřebuje přesně. Výpočet se nemění.

### Historie (před přepisem na v1.1)

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta tvrdila jedno ρ = 0,0191 (horní mez přes průřezy) a byla `overeno`. Radek ve 2. kole rozhodl, že kalkulačka bere odpor pro každý průřez zvlášť. Tvrzení je teď tabulka 13 hodnot z datasheetu FLRY-B, proto stav zpět na `navrh`. Hodnoty jsem znovu přečetl z čerstvě staženého PDF (stejný soubor jako v kole 1 a 2, shodný MD5) podle souřadnic slov. Každý průřez řady MM do 70 mm² v datasheetu je, žádný nechybí; každý má jediný řádek.

Pozor na zaokrouhlení u 1,5 mm²: 12,7 × 1,5 / 1000 = 0,01905 přesně. Zaokrouhlení „polovina nahoru“ dává 0,0191, zaokrouhlení v plovoucí čárce (Python `round`, JS `toFixed`) může dát 0,0190. V souboru je 0,0191 (konzervativní, vyšší odpor). Otázka pro Radka je v PREHLED.md.

Datasheet nese kontakt firmy Manex (PL), výrobce kabelu na listu výslovně uveden není. Druhý nezávislý výrobce (Caledonian) potvrzuje jeden bod (1,5 mm²).

**Poznámka mistra (16. 11. 2026):** ve v1.1 platí ρ 0,0175 (samostatně) a 0,0216 (ve svazku), ne odpor podle průřezu; tvrzení karty je proto pro v1.1 neplatné, přepíše se podle zadání v docs/STAV.md. Otázka zaokrouhlení ρ u 1,5 mm² (0,01905 → 0,0191) se zavírá: ve v1.1 se nepoužije. Rozdíl 0,0175 proti skutečnému lanku (0,0181–0,0191) mění úbytek o desetiny procentního bodu a rozhodnutí uživatele nemění (v1.1).
