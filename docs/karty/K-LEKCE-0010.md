---
id: K-LEKCE-0010
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Paralelně spojujte jen stejné baterie: stejný typ, model a kapacita, stejné stáří (ideálně jedna dodávka). Olověnou a lithiovou baterii napřímo nespojujte."
hodnota: null
jednotka: null
rozsah: null
podminky: "Obytná baterie z více kusů zapojených paralelně (i do série). Výrobci se liší v tom, kolik odchylky připustí (Victron: v paralelu různé kapacity dovoluje, v sérii stejná kapacita a stáří do 3 let); zásada drží přísnější variantu. Olovo a lithium jde kombinovat jen přes zařízení, které je odděluje (např. booster), ne pevným spojením pólů. Hláška K2 (varování)."
zdroje:
  - typ: navod
    nazev: "Rolls: 12V & 24V LFP Lithium-Ion Battery Operating Manual"
    url: "https://cdn.shopify.com/s/files/1/0782/2077/files/ROLLS-12V-24V-LFP-OPERATING-MANUAL.pdf"
    misto: "s. 4 a 8 (Connecting in parallel, Caution): „Do not connect different batches, types, old and new batteries in parallel.“; „Do not mix old and new batteries.“; rozdíl napětí před spojením < 15 mV"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 4.5.6 Battery banks consisting of different batteries"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/installation.html"
    misto: "4.5.6: v bance by ideálně měly být všechny baterie stejné kapacity, stáří a modelu; spojení starších a novějších vede k nevyváženosti"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [k2, lekce-mytus-stara-baterie]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

„Olovo s lithiem napřímo nespojovat“ dokládá Rolls jen obecně („different types“). Výslovnou větu o olověné baterii mají návody menších výrobců LiFePO4 (výsledky vyhledávání, nepoužívám jako zdroj); Victron v otevřené kapitole olovo nezmiňuje. Pro varování to stačí; kdyby měla být hláška blok, doporučuji ještě jeden výslovný zdroj (návod výrobce baterie prodávané v ČR, např. Carbest).

Lekce 3–10 tuto kartu přímo nepotřebují; je pro tabulku mýtů („Starou baterii přidám k nové.“) a K2.
