---
id: K-VYROBCE-0005
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Shurflo pro čerpadlo 4008 (RV By-Pass) uvádí minimální průřez pro úbytek 10 % na okruhu 12 V / 10 A podle celkové délky (od zdroje k čerpadlu a zpět): 0–7,6 m 16 AWG (1,3 mm²), 7,6–15,2 m 14 AWG (2,1 mm²), 15,2–21,3 m 12 AWG (3,3 mm²), 21,3–33,5 m 10 AWG (5,3 mm²); doporučuje 12 AWG, okruh nejméně 10 A, spínač 15 A a pojistku podle štítku."
hodnota: 10
jednotka: "A (návrhový proud tabulky)"
rozsah: null
podminky: "Délka = tam i zpět (celková délka vodičů). Čerpadlo 4008, 12 V, vypínací tlak 55 psi; proud podle tlaku 2,8 A (0 psi) až 7,5 A (55 psi, těsně před vypnutím tlakovým spínačem). Hodnota pojistky jen na štítku čerpadla, v návodu není."
zdroje:
  - typ: navod
    nazev: "SHURflo: 4008 RV By-Pass Pump, Installation & Maintenance Manual (kopie u výrobce vozů Forest River)"
    url: "https://www.forestriverinc.com/brochures/0000/0000WaterPumpShurfloManual.pdf"
    misto: "Str. 1, sekce Installation Preparation: Wire Size is 16 GA MINIMUM, 12GA is recommended; Minimum power requirement is a 10 Amp circuit. Sekce Electrical: tabulka Minimum Wire Size for a 10% voltage drop on a 12VDC, 10 Amp Circuit. Length is the distance from the power source to pump and back to ground (Feet/Meters/AWG/mm²); pojistka podle štítku; 15-Amp switch. Str. 3, Typical Performance: 0 psi 2,8 A … 50 psi 6,8 A, 55 psi 7,5 A."
    datum-overeni: 2026-11-18
vypocet: "Úbytek při 10 A, ρ 0,0175: 1,3 mm²/7,6 m R = 0,102 Ω → 1,02 V = 8,5 %; 2,1 mm²/15,2 m 0,127 Ω → 10,6 %; 3,3 mm²/21,3 m 0,113 Ω → 9,4 %; 5,3 mm²/33,5 m 0,111 Ω → 9,2 %. Tedy asi 10 % při 10 A. Při max. provozním proudu 7,5 A je to 6,4–8,0 %, při typickém 5,1 A (30 psi) 4,4–5,4 %."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0005-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Shurflo nedimenzuje přísněji v procentech (10 % je stejné jako naše nejvolnější volba), ale (1) na 10 A okruhu, tj. na jištění, ne na provozní proud, (2) s minimem 16 AWG bez ohledu na délku a doporučením 12 AWG. Pozor na délku: v tabulce je celková délka tam i zpět. Kdo ji zadá do kalkulačky jako délku jedné cesty, dostane dvojnásobnou rezervu; naopak kdo z kalkulačky (jedna cesta) porovnává s tabulkou, musí délku zdvojit.

Trail King 7 návod v rozpočtu nenalezen; podle K-SPOTR-0005 max. 4,5 A. Oficiální adresa návodu 4008 (Pentair, dokument 911-1008) nenalezena, použita kopie výrobce vozů.
