---
id: K-VODIC-0013
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Pojistka patří na plusový vodič co nejblíž k baterii, ideálně do 20 cm; kdyby byla u spotřebiče, zkrat mezi baterií a pojistkou nic nezastaví."
hodnota: 20
jednotka: "cm"
rozsah: [17.5, 20]
podminky: "Vodič připojený k baterii (nebo jinému zdroji), mínus spojený s kostrou nebo vlastním vodičem."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.2: jistící prvek do 7 palců (175 mm) od místa připojení ke zdroji, měřeno po vodiči; výjimka: vodič připojený přímo na pól baterie a celý v chráničce/krytu → co nejblíž, max. 72 palců (1,83 m)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "oddíl Power supply: elektronika se připojuje přímo na póly baterie; pojistka v plusovém vodiči co nejblíž k baterii (15 A pro 12 V, 7,5 A pro 24 V)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6, odstavec Location of the DC fuses: pojistka je v plusovém kabelu; každý spotřebič připojený k baterii má vlastní pojistku"
    datum-overeni: 2026-11-16
vypocet: "7 palců × 25,4 mm = 177,8 mm (ABYC uvádí zaokrouhleně 175 mm)."
pouzito-v: [kalkulacka-prurez, lekce-pojistka, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Zásada „na plusu, co nejblíž baterii“ je doložena třemi zdroji (norma ABYC, návod Secop, návod Victron).

**Nález pro Radka:** konkrétní hodnota „do 20 cm“ nemá v otevřených zdrojích oporu. ABYC E-11 požaduje 175 mm (7 palců), tedy o něco méně; ISO 10133 / ISO 13297 (lodě) a EN 1648-2 (obytná vozidla) jsem neotevřel, nevím, zda uvádějí 200 mm. Doporučuji buď „do 17 cm“, nebo „co nejblíž, nejvýš asi 20 cm“ s odkazem na zdroj, který 20 cm opravdu uvádí – rozhodne Radek.

Výjimka ABYC (vodič v chráničce až 1,83 m) je specifická pro lodě; do textu pro laiky bych ji nepřenášel.
