---
id: K-VODIC-0021
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Koncovky se krimpují správnými kleštěmi a přetahují smršťovací bužírkou; zkroucené dráty s izolepou mají velký přechodový odpor, hřejí se a časem odhoří."
hodnota: null
jednotka: null
rozsah: null
podminky: "Spoje vodičů 12/24 V, kabelová oka, faston, dutinky."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.3.8: lisovací konektory se nasazují kleštěmi určenými pro daný konektor; 11.16.3.6: kroucené spojky (wire nuts) se nesmí používat; 11.16.3.9: dříky ok chránit izolační bužírkou nebo návlekem proti zkratu"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.3 Cable connections a 4.4 Crimp terminals: oka a koncovky lisovat speciálními (ráčnovými) kleštěmi, u neizolovaných ok doplnit izolaci, po zalisování zkouška tahem"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.5 Connection resistance: špatný spoj s vysokým odporem vytváří teplo (P = I²R), u malého napětí může vést k poškození nebo požáru"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "IEC 60352-2 Solderless connections – Crimped connections – text neotevřen, jen odkaz"
    url: ""
    misto: ""
    datum-overeni: 2026-11-16
vypocet: "Ilustrace (ne ze zdroje): přechodový odpor 10 mΩ při 20 A ztrácí P = 20² × 0,01 = 4 W v jediném bodě."
pouzito-v: [lekce-kabel, montazni-postup]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0021-2026-11-16.md
schvalil: "Radek, 2026-11-16 (docs/RYCHLA_ALFA.md, krok 0)"
---

Poznámky rešeršéra:

Krimpování správnými kleštěmi a izolace koncovky: doloženo ABYC i Victron. „Smršťovací bužírka“ konkrétně: ABYC mluví o izolačních bariérách nebo návlecích, Victron o „doplnění izolace“ – smršťovací bužírka je jeden ze způsobů, zdroj ji jmenovitě nepředepisuje.

„Zkroucené dráty s izolepou časem odhoří“: přímý zákaz kroucených spojů je v ABYC (wire nuts), mechanismus (přechodový odpor → teplo → požár) ve Victron 2.5. Formulace „odhoří“ je zkratka, kterou zdroje nepoužívají; fyzikálně je oprávněná.

Výpočet v poli vypocet je jen ilustrační příklad, není ze zdroje a v kalkulačce se nepoužívá.
