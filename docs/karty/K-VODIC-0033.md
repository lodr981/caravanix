---
id: K-VODIC-0033
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Šroubovací pojistka Littelfuse MEGA chrání proti přetížení jen v hodnotách 40–250 A (300–500 A jsou podle výrobce jen ochrana proti zkratu); v rozsahu 80–250 A má mít jmenovitý proud alespoň 1,29× trvalý proud obvodu při 20 °C okolí a 1,52× při 65 °C, hodnoty 40 a 60 A ještě víc (při 20 °C 1,29 a 1,40)."
hodnota: 1.29
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.29, 1.67]
podminky: "Littelfuse MEGA a MEGA Clear Top 32 V (0298). Pro přetížení 40, 60, 80, 100, 125, 150, 175, 200, 225, 250 A (všechny v řadě FUSES v2); 40 a 60 A „Not mentioned in ISO standards“. 300–500 A „Short Circuit Protector only“. Typical derating, Temperature Security Margin 20 %."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: použití na baterie, alternátory a silné svazky s velkým rozběhovým proudem; 40–250 A pro trvalý proud; 300–500 A „only for short circuit protection“; Interrupting Rating 2000 A @ 32 V DC; ISO 8820-5. s. 2: poznámky 1 (Not mentioned in ISO standards: 40 a 60 A) a 2 (Short Circuit Protector only: 300–500 A). s. 3: 100 % → min. 14 400 s (40–250 A). s. 4: Temperature Table (−40, 0, 20, 65, 85, 110, 125 °C): 40 A 36/33/31/26/23/20/17; 60 A 50/45/43/36/32/27/24; 225 A 205/186/175/148/135/115/100; 250 A 243/220/207/175/158/134/117."
    datum-overeni: 2026-11-16
vypocet: "20 °C: 40 A 1,290; 60 A 1,395; 80 A 1,096; 100 A 1,099; 125 A 1,078; 150 A 1,111; 175 A 1,174; 200 A 1,205; 225 A 1,286; 250 A 1,208. Max 80–250 A = 1,286 (225 A); se 40 a 60 A = 1,395. 65 °C: 40 A 1,538; 60 A 1,667; 80 A 1,311; 100 A 1,316; 125 A 1,276; 150 A 1,316; 175 A 1,400; 200 A 1,429; 225 A 1,520; 250 A 1,429. Kontrola v2 (f ≥ 1,25 × I): při 20 °C nevyhoví 40 A (32 / 31 A), 60 A (48 / 43 A) a 225 A (180 / 175 A); při 65 °C nevyhoví žádná hodnota. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

MEGA je z rodin v tomto úkolu jediná, která chrání proti přetížení v pásmu 150–250 A. Má ale nejhorší poměr: ani při 20 °C nestačí poměr 1,25 z verze 2 u 225 A. Na rozdíl od nožových pojistek MEGA nedává plný jmenovitý proud ani při −40 °C u 40, 60, 200, 225 a 250 A.
