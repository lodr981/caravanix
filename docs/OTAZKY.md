# Otázky

Agent sem zapíše nejasnost a pokračuje jinou prací. `[ČEKÁ NA RADKA]` = rozhoduje Radek, `[PRÁVNÍK]` = potřeba právníka. Vyřešenou otázku přesuň dolů do sekce Vyřešené i s odpovědí.

## Otevřené

- [ČEKÁ NA RADKA] **Push na GitHub:** Radek založí soukromé repo `github.com/lodr981/caravanix` a pošle souhlas s push. Do té doby vše jen lokálně.
- [ČEKÁ NA RADKA] **Typ pojistky** (podklad `docs/karty/POJISTKY_RODINY.md`, karty 0029–0034 jdou k ověření): nejhorší poměr jmenovitého proudu k trvalému proudu podle tabulek Littelfuse:

  | Rodina | Přetížení chrání | Poměr při 20 °C | Poměr při 65 °C |
  | --- | --- | --- | --- |
  | ATOF (nožová) | 1–40 A | 1,11 | 1,33 |
  | MINI (nožová) | 2–30 A | 1,20 | 1,39 (při 60 °C) |
  | MAXI (nožová) | 20–80 A | 1,08 | 1,29 |
  | MIDI | 30–125 A (150–200 A jen zkrat) | 1,07 | 1,25 |
  | MEGA | 40–250 A (300–500 A jen zkrat) | 1,29 pro 80–250 A; 1,40 s 40 a 60 A | 1,52; 1,67 s 40 a 60 A |

  Dočasných 1,25 × nestačí při 20 °C u MEGA 40, 60 a 225 A, při 65 °C u ATOF 20–40 A, MAXI 60 a 80 A a u všech MEGA. Rozsah 150–250 A pokrývá jen MEGA. Pravidlo „zatěžovat na 75 %“ (1,33) dává Littelfuse jen pro pojistky UL 248-14, ne pro automobilové. Rozhodnout: jaký poměr pro kterou rodinu a při jaké teplotě, a kterou rodinu kalkulačka doporučí pro který rozsah. Je to změna výpočtu.
- [ČEKÁ NA RADKA] **Koeficienty uložení podle Lapp** (rešeršér, karta 0004): 0,5 v motorovém prostoru je jen teplotní faktor (60 °C); pro dva dotýkající se vodiče při 60 °C by Lapp dal 0,8 × 0,5 = 0,40. 0,53 ve svazku platí pro 3 obvody; 4 obvody dají 0,49, 6 obvodů 0,43. Ponechat, nebo zpřísnit? (Změna výpočtu.)
- [ČEKÁ NA RADKA] **ρ 0,0191 pro 95 a 120 mm²:** datasheet FLRY-B má řádky jen do 70 mm². Ponechat jednu hodnotu pro všechny průřezy?
- [ČEKÁ NA RADKA] **Design, tlačítko v tmavém režimu:** hlavní tlačítko je světlá měď s tmavým textem (8,51 : 1), tedy obrácená role mědi proti světlému režimu. Souhlasíte?
- [ČEKÁ NA RADKA] **Design, přepínač režimu:** dva stavy (světlý / tmavý); k režimu zařízení se web vrátí, když zvolíte stejný režim, jaký má zařízení. Stačí, nebo chcete tři volby Světlý / Tmavý / Podle zařízení?
- [ČEKÁ NA RADKA] **Kontrola přístupnosti nástrojem:** axe-core má licenci MPL 2.0 (mimo povolený seznam MIT/BSD/Apache/OFL). Povolit výjimku pro vývojový nástroj (nejde do webu), nebo hledat jiný?
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
