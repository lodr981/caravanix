---
id: K-VYROBCE-0003
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Dometic pro vestavné kompresorové lednice CRX 50–140 (aktuální krátký návod) předepisuje při 12 V průřez 4 mm² do 4 m, 6 mm² do 6 m a 10 mm² nad 6 m kabelu, při 24 V přímku od 2 mm² (0 m) do asi 18 mm² (28 m), a pojistku 10 A při 12 V a 7,5 A při 24 V."
hodnota: null
jednotka: "mm², m"
rozsah: null
podminky: "Hodnoty odečtené z grafů (Fig. 13 a 14), ne z tabulky; přesnost odečtu 24 V asi ±1 mm². Osa l/m = délka kabelu, návod neříká výslovně, zda jedna cesta; obr. 15 (starší návod) i Secop měří od baterie k lednici, proto beru jednu cestu. Pro propojení tažné vozidlo–karavan obr. 14 uvádí ≥ 2,5 mm²."
zdroje:
  - typ: navod
    nazev: "Dometic CRX 50/65/80/110/140: Short Installation and Operation Manual (crx0110e, 9105306572)"
    url: "https://media.dometic.com/externalassets/crx0110e_9105306572_74849.pdf"
    misto: "PDF str. 7: Fig. 13 DC 24 V (Ø/mm² proti l/m, přímka z 2 mm² při 0 m do asi 18 mm² při 28 m); Fig. 14 DC 12 V (schod: 4 mm² do 4 m, 6 mm² 4–6 m, 10 mm² od 6 m; u propojení auto–karavan ≥ Ø 2,5 mm²). PDF str. 8: schéma připojení s pojistkou 10 A (12 V), 7,5 A (24 V). Str. 13: Observe the required cable cross-sections and fuses."
    datum-overeni: 2026-11-18
vypocet: "12 V schod: 4 mm²/4 m, 6 mm²/6 m → délka/průřez 1 m/mm², smyčka R = 0,0175 × 2 × 1 = 0,035 Ω (stejně jako Secop); 10 mm²/8 m → 0,028 Ω. Při jmenovitém proudu CRX 50 5,0 A (K-VYROBCE-0004) úbytek 0,175 V = 1,5 %; při pojistce 10 A 0,35 V = 2,9 %; při rozběhu kompresoru 20 A (Secop, K-VYROBCE-0001) 0,70 V = 5,8 %. 24 V: sklon asi 0,57 mm²/m + 2 mm²; např. 10 m → 7,7 mm², R = 0,0175 × 20 / 7,7 = 0,045 Ω; při 2,6 A 0,12 V = 0,5 %, při pojistce 7,5 A 0,34 V = 1,4 %."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0003-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Oficiální PDF Dometicu, grafy jsou obrázky; hodnoty jsem odečetl z vykreslené strany 7 (200 dpi). Schod pro 12 V je přesně tabulka Secop (1 m na 1 mm²), jen začíná na 4 mm² (Secop dovoluje 2,5 mm² do 2,5 m). Dometic tedy převzal dimenzování výrobce kompresoru a zaokrouhlil nahoru. Krátký návod důvod neuvádí; starší úplný návod (K-VYROBCE-0004) ho dává v tabulce poruch: „Cable cross section too small“ při startu s napětím pod vypínacím.

Pojistka: krátký návod 10 A (12 V), starší úplný návod „nejméně 15 A“. Pro průřez nepodstatné; pro kalkulačku by platil aktuální návod konkrétního modelu.
