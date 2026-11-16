---
id: K-VODIC-0022
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Do auta se používá automobilový kabel – ohebné lanko z mnoha tenkých drátků (v obchodech často značené FLRY); tvrdý drát z domovní instalace od vibrací praská."
hodnota: null
jednotka: null
rozsah: null
podminky: "Vozidla, karavany, lodě – prostředí s vibracemi a pohybem."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2.5: vodiče musí být lanko z mědi podle TABLE XII; poznámka u 11.16.3.7: pájením se lanko mění v plný vodič a ohýbání může způsobit jeho zlomení"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.1 Cable selection: nepoužívat neohebné kabely ani kabely s hrubými dráty, plné vodiče se nedoporučují; 4.5 Cable runs: napnuté kabely a vibrace vozidla uvolňují spoje"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "Conductor: Cu-ETP1, multi wire, flexible (acc. to ISO 6722-1); Application: single-conductor automotive cable for electric installations in vehicles"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0022-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Požadavek na ohebné lanko je doložen ABYC i Victron. Explicitní věta „plný drát od vibrací praská“ v otevřených zdrojích přesně není; ABYC to říká nepřímo (zlomení plného úseku vodiče při ohybu) a Victron doporučení zdůvodňuje kontaktem a uvolňováním spojů. Mechanismus (únava materiálu) je fyzikálně správný.

FLRY je typové označení podle ISO 6722 / DIN 72551-6 (F = vozidlový, L = vodič, R = redukovaná izolace, Y = PVC). „Často značené FLRY“ odpovídá trhu, ale jsou i jiné automobilové kabely (FLRYW, FLY, FL91Y…).
