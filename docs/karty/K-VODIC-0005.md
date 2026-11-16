---
id: K-VODIC-0005
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Automobilové kabely snesou obvykle 105 °C, takže hodnoty zatížitelnosti pro PVC 70 °C mají rezervu."
hodnota: 105
jednotka: "°C"
rozsah: [85, 105]
podminky: "Platí pro automobilové kabely FLRY-A/FLRY-B v PVC izolaci třídy B podle ISO 6722-1, jak je výrobci deklarují (−40 až +105 °C). Starší nebo jiné kabely mohou být třídy A (85 °C). Nevztahuje se na domovní vodiče (CY, CYA, H07V-K) s PVC 70 °C."
zdroje:
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "Technical data: Insulation PVC, class B (acc. to ISO 6722-1); Temperature range −40 °C ÷ +105 °C (společně pro FLRY-A i FLRY-B)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Data sheet FLRY-B (ISO 6722-1, DIN 72551-6; kopie rcscomponents.kiev.ua, výrobce na listu neuveden)"
    url: "https://www.rcscomponents.kiev.ua/datasheets/flry-b-2datasheet.pdf"
    misto: "Technical data: Working temperature −40 °C ÷ 105 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLRY-B ISO 6722 1×25 mm²"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLRY-B/FLRY-B-ISO%206722-1C25.00.pdf"
    misto: "Standards: ISO 6722 Class B; Operating temperature −40 °C to 105 °C"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ISO 6722-1:2011, Table 1 Temperature class rating – text normy neotevřen"
    url: ""
    misto: "Table 1: třída A 85 °C, třída B 100 °C, třída C 125 °C (podle náhledu ve vyhledávání, stránku se nepodařilo otevřít)"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Tři datasheety FLRY uvádějí shodně −40 až +105 °C. Datasheety 1 a 2 mají shodnou strukturu i hodnoty (pravděpodobně stejný výrobce) – nejsou nezávislé. Caledonian je nezávislý.

**Nález:** podle náhledu ISO 6722-1:2011 má teplotní třída B horní mez 100 °C, ne 105 °C; 105 °C je údaj výrobců (pravděpodobně podle LV 112 / dřívější praxe). Tuto nesrovnalost jsem nedokázal rozhodnout, text normy jsem neotevřel. Formulace „obvykle 105 °C“ odpovídá datasheetům FLRY-B; existují ale automobilové kabely třídy A (85 °C), a ty by rezervu měly menší.

**K formulaci „hodnoty mají rezervu“:** tabulka VDE (K-VODIC-0003) je pro vodič s dovolenou teplotou 70 °C. Kabel s izolací pro 100–105 °C snese vyšší teplotu vodiče, proto při stejném proudu má rezervu. Teplotní třída ISO 6722 je ale definovaná pro 3 000 h stárnutí, ne pro neomezený trvalý provoz – to je vhodné v textu nepřehánět. Kvantifikaci rezervy (přepočet zatížitelnosti na 105 °C) jsem nedělal, není to v kalkulačce použito.

Třída A, protože tvrzení slouží jako zdůvodnění bezpečnostní rezervy.
