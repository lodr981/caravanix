---
id: K-VODIC-0013
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Pojistka patří na plusový vodič co nejblíž k baterii, nejvýš 17,5 cm od ní (měřeno po vodiči); kdyby byla u spotřebiče, zkrat mezi baterií a pojistkou nic nezastaví."
hodnota: 17.5
jednotka: "cm"
rozsah: null
podminky: "Vodič připojený k baterii nebo jinému zdroji, mínus přes kostru nebo vlastní vodič. 17,5 cm = 7 palců podle ABYC E-11 11.12.1.2 (lodě, měřeno po vodiči od místa připojení ke zdroji). Výjimky ABYC (vodiče startéru; vodič celý v chráničce až 1,83 m) se do textu pro laiky nepřenášejí. Hodnotu z EN 1648-2 (obytná auta) se doložit nepodařilo."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.2 Overcurrent Protection Device Location (s. 25): do 7 palců (175 mm) od místa připojení ke zdroji, měřeno po vodiči; výjimky 1 (vodiče startéru), 2 (vodič přímo na pólu baterie v chráničce: co nejblíž, max. 72 palců / 1,83 m), 3 (jiný zdroj v chráničce: max. 40 palců); obdobně 11.12.1.1.1 pro nabíjecí zdroje (s. 24)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "oddíl Power supply: pojistka v plusovém vodiči co nejblíž k baterii (15 A pro 12 V, 7,5 A pro 24 V)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Philippi: katalog Absicherung"
    url: "https://www.philippi-online.de/cdn/shop/files/Absicherung_26.pdf"
    misto: "PDF s. 1, oddíl Absicherung von Kleinverbrauchern bis 25 A: jističe montovat co nejblíž k bateriím"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6, odstavec Location of the DC fuses: pojistka je v plusovém kabelu; obvod má hlavní pojistku baterie, za ní odbočky ke spotřebičům"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "EN 1648-2:2012 (veřejný náhled SIST EN 1648-2:2012, iteh) – obsah normy; hodnota neotevřena"
    url: "https://cdn.standards.iteh.ai/samples/32406/3bb723d55d6e4bef909692d1849d35be/SIST-EN-1648-2-2012-EN-.pdf"
    misto: "obsah: kap. 6 Overcurrent protection (s. 10), 6.3 Installation of fuses; text kapitoly 6 v náhledu není"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: texty průřezu – pojistka u baterie „co nejblíž, nejvýš 17,5 cm“ podle ABYC E-11, 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 o textech průřezu"
    datum-overeni: 2026-11-16
vypocet: "7 palců × 2,54 cm = 17,78 cm; ABYC uvádí zaokrouhleně 175 mm = 17,5 cm (o 0,28 cm přísněji). 72 palců × 25,4 mm = 1 829 mm."
pouzito-v: [kalkulacka-prurez, lekce-pojistka, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0013-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** „Ideálně do 20 cm“ nahrazeno „co nejblíž, nejvýš 17,5 cm“ podle ABYC E-11 a Radkova rozhodnutí 16. 11. 2026; `rozsah` [17,5; 20] zrušen. Přidán Philippi (co nejblíž k bateriím, dohledal ověřovatel, otevřel jsem: PDF s. 1) a výjimka 1 ABYC (startér) do `misto`.

**EN 1648-2:** Veřejný náhled vydání 2012 (SIST) ukazuje, že norma má kapitolu 6 Overcurrent protection s článkem 6.3 Installation of fuses, ale text kapitoly v náhledu není. Platné je vydání 2018 (SIS: SS-EN 1648-2:2018 nahrazuje 2012), jeho text je placený. Zda EN 1648-2 uvádí vzdálenost od baterie a jakou, **nevím**. Číslo z normy proto v kartě není.

Text pro laiky: číslo 17,5 cm je z normy pro lodě (ABYC). Pro obytná auta je to opora, ne povinnost; autor textu by neměl psát „podle normy pro obytná vozidla“.
