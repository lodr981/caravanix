# Otázky

Agent sem zapíše nejasnost a pokračuje jinou prací. `[ČEKÁ NA RADKA]` = rozhoduje Radek, `[PRÁVNÍK]` = potřeba právníka. Vyřešenou otázku přesuň dolů do sekce Vyřešené i s odpovědí.

## Otevřené

- [ČEKÁ NA RADKA] **Push na GitHub:** Radek založí soukromé repo `github.com/lodr981/caravanix` a pošle souhlas s push. Do té doby vše jen lokálně.
- [ČEKÁ NA RADKA] **Typ pojistky:** po rešerši Littelfuse (`docs/karty/POJISTKY_RODINY.md`) rozhodnout poměry pro rodiny ATO/ATOF, MIDI, MEGA místo dočasného 1,25 ×. Je to změna výpočtu.
- [ČEKÁ NA RADKA] **Název:** caravanix.eu je k 16. 11. 2026 volná (WHOIS registru EURid: `Status: AVAILABLE`), .cz a .pl také. Jméno tedy držíme: Radek ručně zkontroluje TMview a zaregistruje .eu, .cz a .pl (podrobně `docs/licence/NAZEV_CARAVANIX.md`).
- [ČEKÁ NA RADKA] **Strop CAPH ve verzi 2 nic nemění** (zjistil tester): u svazku (0,53) a motorového prostoru (0,5) je amp × k vždy pod stropem CAPH, nebo vede na stejnou pojistku. CAPH tedy ve v2 nerozhoduje nikde. Jen pro informaci; pokud je to v pořádku, nic se nemění.
- [PRÁVNÍK] Rešerše ochranné známky před betou s platbami.

## Vyřešené

Radkovy odpovědi z 16. 11. 2026, zapsané v `docs/ROZHODNUTI.md`:

- **Směr designu:** 1 Dílna s tmavým „displejem“ výsledku ze směru 3; draze a klidně, ne rustikálně ani retro, jinak zpět ke směru 3.
- **Akcent:** tmavší, hnědější měď na text, odkazy a tlačítka (7 : 1); jasnější měď jen na velké plochy, ikony a ilustrace (3 : 1).
- **Světlý a tmavý režim:** výchozí podle zařízení, viditelný přepínač v hlavičce, volba v localStorage.
- **Fonty:** nepoužité `@fontsource/*` odstraněné (zůstává IBM Plex Sans).
- **Repozitář:** soukromý `github.com/lodr981/caravanix`; git v tomto repu používá GitHub noreply e-mail (i zpětně v dosavadních lokálních commitech).
- **Nápady skupiny A:** do alfy 1–6, nápad 7 až po schválení karet spotřebičů.
- **Výpočet kalkulačky průřezu:** vzniká verze 2 (ρ 0,0191 / 0,0236, čtyři volby uložení, pojistka ≥ 1,25 × do rešerše rodin, bez 300 A, mez rozsahu z tabulky, hláška „hlavní vedení“). Svazek počítá s ρ pro 80 °C; mínus přes kostru jen u volby „jeden vodič“. Popis v `docs/KALKULACKA_PRUREZU.md`.
- **ρ 0,0216, 5 % úbytek, CAPN/CAPH:** rozhodnutí odborníka (Radek).
- **Texty průřezu:** rychlý vzorec vypustit; CCA nedoporučovat; pojistka u baterie „co nejblíž, nejvýš 17,5 cm“ (ABYC E-11), rešeršér hledá i EN 1648-2; poznámka o odporu lanka není potřeba.
- **Název Caravanix:** držíme, pokud je volná caravanix.eu; jinak pět alternativ bez základu „caravan“. Právník až před betou s platbami.
- **PVGIS:** předpočítaná statická tabulka; alfa ČR v mřížce 0,25°, později Evropa 0,5°; vodorovně a 35° na jih; 1 kWp, ztráty 0 %, ztráty dopočítá engine; zdroj „PVGIS © Evropská unie“.
- **Technologie:** Astro s React ostrůvky, TypeScript, npm workspaces potvrzené.
- **PVGIS, licence pro API** (strazce-licenci): zdarma bez omezení použití s uvedením zdroje; API se nesmí volat z prohlížeče. Podrobně `docs/licence/PVGIS.md`.
- **Golden test v2, dotazy testera** (hlavní vlákno, rozhraní a numerika, ne výpočet): pořadí operací Areq = ρ × L × n × I / dU je závazné tak, jak je zapsané v zadání (engine ho dodržuje, sada „přesně na hraně“ zůstává); chybový výsledek nese jen svůj kód; proud u `NEPLATNY_VSTUP` se nevrací; +∞ odfiltruje UI.
- **Rozhraní enginu průřezu, dotazy testera** (hlavní vlákno; rozhraní, ne výpočet): kód „rozhodlo“ je v `hlasky` první a zároveň v poli `rozhodlo`; příkon v režimu P je zadaná hodnota; `Infinity` se chová jako v referenci a nesmyslné vstupy odfiltruje UI; `@types/node` doinstalováno.
