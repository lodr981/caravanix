# Změny CLAUDE.md (reset 16. 11. 2026)

Hlavní vlákno: zapracuj do `CLAUDE.md`. Uvedené sekce nahraď, ostatní nech, jak jsou, včetně úprav, které v nich už jsou (například pravidlo pro licence vývojových nástrojů).

## Nová sekce hned pod úvodem: Zdravý rozum

Cíl alfy je **hotová, bezpečná a hezká věc**, ne dokonalá dokumentace. Nad prací stojí subagent `mistr`. Jeho **test podstatnosti** (`.claude/agents/mistr.md`) rozhoduje, co se řeší. Nepodstatné se zapíše jako poznámka a nic se nemění. Rozhodnuté se znovu neotevírá bez konkrétního nebezpečného případu.

## Nahradit sekci „Co schvaluje Radek“

Radek dostává nejvýš jednou denně soubor `docs/PRO_RADKA.md` s nejvýš 5 rozhodnutími. Každé má doporučení mistra a výchozí volbu. Schvaluje jen:

1. směr a vzor designu,
2. karty třídy A, a to najednou v přehledu `docs/karty/KE_SCHVALENI.md`,
3. změny výpočtu kalkulaček,
4. placené služby a cokoli nevratného.

Všechno ostatní rozhodne mistr. Na odpověď Radka se nečeká: práce pokračuje na něčem jiném.

## Nahradit zásadu 2 v „Nedotknutelných zásadách“

2. **Karta je potřeba jen pro čísla, která vstupují do výpočtu, a pro bezpečnostní pravidla.** Stačí jeden dobrý zdroj nebo rozhodnutí odborníka. Vysvětlující texty a tipy kartu nepotřebují, kontroluje je kontrolor země.

## Nahradit „Pravidla autonomie“, body 4 a 9 doplnit

4. Ověřuje se jednou. Druhé vrácení čehokoli rozhoduje mistr, ne Radek (kromě karet třídy A).
10. Nejvýš 3 rozpracované úkoly najednou. Nejdřív dokončit, pak začít.
11. Nejdřív svislý řez: kalkulačka průřezu v designu, se 2 lekcemi, testy a schválením. Teprve potom další kalkulačky a lekce.
12. Úkol, který se točí déle než dvě dávky práce, mistr zmenší, nebo ho dá do zásobníku.

## Veto

Veto mají jen tři: **tester** (padající test), **designer** (stránka, která neprojde kontrolním seznamem, a nejvýš 2 kola, potom rozhodne mistr) a **strážce licencí** (soubor na webu bez licence). Ověřovatel a kontrolor země veto nemají, jejich spory rozhoduje mistr.
