---
id: K-VYROBCE-0006
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Lilie (německý dodavatel tlakových čerpadel do obytných vozů, řady Soft a Smart) uvádí průřez pro 10% úbytek na okruhu 12 V / 10 A podle celkové délky od zdroje k čerpadlu a zpět: 0–7,5 m 1,5 mm², 7,5–20 m 2,5 mm², 20–30 m 4,0 mm²; minimum 1,5 mm², doporučeno 2,5 nebo 4,0 mm²; spínač 15 A, pojistka podle typového štítku."
hodnota: 10
jednotka: "A (návrhový proud tabulky)"
rozsah: null
podminky: "Délka = celková (tam i zpět). Tlaková membránová čerpadla Lilie 12 V pro karavany; přerušovaný provoz (např. 20 min v kuse). Hodnota pojistky jen na štítku."
zdroje:
  - typ: navod
    nazev: "Lilie GmbH & Co. KG: Bedienungsanleitung Druck-Pumpen (Stand 29.09.2015), hostováno českým prodejcem"
    url: "https://padabo-at.wpjshop.cz/data/files/old/14509_Shurflo%20Bedienung.pdf"
    misto: "Tištěná str. 1 (PDF str. 1): Der Kabelquerschnitt sollte mindestens 1,5 mm² betragen. 2,5 mm² oder 4,0 mm² wird empfohlen. Tištěná str. 5 (PDF str. 2), Elektrischer Anschluss: tabulka Angaben zum Kabelquerschnitt bei 10% Spannungsabfall für Verschaltung mit 12VDC/10 Ampere; Als Länge dient die Gesamtlänge von der Stromquelle bis zur Pumpe und zur Erdung; Schalter für 15 Ampere; Sicherung entsprechend Typenschild. Tištěná str. 6: schéma Siehe Pumpenetikett für die Sicherungsgröße."
    datum-overeni: 2026-11-18
vypocet: "Při 10 A, ρ 0,0175: 1,5 mm²/7,5 m R = 0,0875 Ω → 0,88 V = 7,3 %; 2,5 mm²/20 m 0,140 Ω → 1,40 V = 11,7 %; 4,0 mm²/30 m 0,131 Ω → 1,31 V = 10,9 %. Tedy asi 10 % při 10 A celkové délky."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0006-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Tabulka je metrický přepis tabulky Shurflo (K-VYROBCE-0005), Lilie čerpadla vyrábí podle svých zadání u světových výrobců. Soubor na serveru českého prodejce se jmenuje „Shurflo Bedienung“, obsahem je ale návod Lilie. Stejný princip jako Shurflo: návrhový proud = 10 A okruh (jištění), ne provozní proud, a minimum 1,5 mm².
