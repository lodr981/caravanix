---
id: K-LEKCE-0009
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Při třech a více paralelních větvích panelů potřebuje každá větev vlastní pojistku: při poruše v jedné větvi do ní tečou proudy všech ostatních a překročí, co unese kabel větve a co snese panel (max. pojistka panelu ze štítku). Jedna nebo dvě větve pojistku na větvi nepotřebují."
hodnota: 3
jednotka: "počet paralelních větví, od kterého je pojistka na každé větvi"
rozsah: null
podminky: "Solární pole s paralelními větvemi (kabel větve dimenzovaný aspoň na 1,56 × Isc). Hláška POJISTKA_VETVE (varování) v kalkulačce soláru při paralel ≥ 3. Velikost pojistky větve podle Mersen: Isc × 1,56 (případně ÷ teplotní koeficient), nejvýš max. pojistka panelu ze štítku. Zdroj vychází z NEC 690.9(A) (USA); IEC 62548 jsem neotevřel."
zdroje:
  - typ: clanek
    nazev: "Mersen (výrobce pojistek): Photovoltaic Protection Note 5, Sizing Fuses for Photovoltaic Systems per the National Electrical Code (TT-PVPN5)"
    url: "https://www.mersen.com/sites/mersen_ca/files/2018-11/TT-PVPN5-Sizing-Fuses-of-Photovoltaic-Systems-per-NEC-Tech-Topic.pdf"
    misto: "s. 1–2, When to fuse, when not to fuse: jedna větev – pojistka není nutná (NEC 690.9(A) výjimka a); dvě paralelní větve – není nutná (výjimka b), každá větev dá nejvýš 1,25 × Isc; tři a více paralelních větví – pojistka nutná: porucha v jedné větvi dostane proudy všech ostatních (každá 1,25 × Isc), to překročí kabel dimenzovaný na 1,56 × Isc i max. pojistku panelu"
    datum-overeni: 2026-11-16
vypocet: "Příklad: panely Isc 8,69 A (Victron 150 W, K-LEKCE-0008), 3 paralelní větve: do vadné větve tečou 2 × 1,25 × 8,69 = 21,7 A > kabel na 1,56 × 8,69 = 13,6 A. U dvou větví 1 × 1,25 × 8,69 = 10,9 A < 13,6 A. Přepočteno v Pythonu."
pouzito-v: [lekce-8-panely-serie-paralela, kalkulacka-solar, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0009-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Zdroj je technická poznámka výrobce pojistek, která vykládá americký NEC 690.9(A). Evropská IEC 62548 (placená) má podle sekundárních zdrojů podobné pravidlo s porovnáním (počet větví − 1) × Isc proti max. pojistce panelu; text normy jsem neotevřel. Pro zásadu „od tří větví pojistka na každé“ to stačí: je to běžná praxe a sedí s výpočtem v příkladu.

Na co si dát pozor: u panelů s velkou max. pojistkou (štítek) může přesný výpočet podle (N − 1) × Isc vyjít tak, že ani tři větve pojistku nepotřebují. Zásada „od tří vždy“ je na bezpečné straně; nepodstatné.
