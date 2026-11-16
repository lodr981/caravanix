# Otázky

Agent sem zapíše nejasnost a pokračuje jinou prací. `[ČEKÁ NA RADKA]` = rozhoduje Radek, `[PRÁVNÍK]` = potřeba právníka. Vyřešenou otázku přesuň dolů do sekce Vyřešené i s odpovědí.

## Otevřené

- [PRÁVNÍK] Rešerše ochranné známky před betou s platbami (v `docs/ZASOBNIK.md`, alfu neblokuje).

Rozhodnutí pro Radka jsou jen v `docs/PRO_RADKA.md` (nejvýš 5).

## Vyřešené

Úklid mistra (16. 11. 2026, po resetu a v1.1). Podrobně `docs/STAV.md`, Rozhodnutí mistra.

- **Schválit 9 karet třídy A:** přesunuto do `docs/PRO_RADKA.md` (bod 1); seznam v `docs/karty/KE_SCHVALENI.md` upraven pro v1.1 (0005 stažena k přepisu, 0035 přidána).
- **Výjimky licencí vývojových nástrojů (13 balíčků):** schválil mistr podle resetu (`strazce-licenci.md`: vývojové nástroje s licencí OSI jsou v pořádku); brána licencí prochází. Pro informaci Radkovi v `docs/PRO_RADKA.md` (bod 3).
- **Důsledky výběru pojistky podle I30 (0038):** odpadá, v1.1 volí pojistku ≥ 1,25 × proud ze seznamu FUSES; tabulky Littelfuse jsou v zásobníku.
- **Zaokrouhlení ρ pro 1,5 mm²:** odpadá, v1.1 počítá s ρ 0,0175 / 0,0216.
- **Spor teplé místo (0039):** uzavřen v1.1, Radek dal nové znění textu bez příkladů; karta se přepíše na kabel 105 °C.
- **Spor svazek (0004):** uzavřen v1.1 (koeficient 0,7 ze základu 1,37); 4 a více obvodů je v zásobníku, vydání normy 2023-06 se v kartě opraví.
- **95 a 120 mm², pocínovaná lanka (0037):** odpadá, odpor podle průřezu je v zásobníku.
- **Push na GitHub:** přesunuto do `docs/PRO_RADKA.md` (bod 2).

Radkovy odpovědi, druhé kolo (16. 11. 2026), zapsané v `docs/ROZHODNUTI.md`:

- **Karty třídy A:** 0003 a 0004 se zatím neschvalují (mění se koeficienty); 9 dalších ke schválení přes `docs/karty/KE_SCHVALENI.md`.
- **Spory 0007, 0012, 0016:** platí znění ověřovatele (CCA nedohledáno, NEC dává hodnoty hliníku, CCA nepoužívat; pojistka nesmí být vyšší než max. pojistka kabelu, u jednoho spotřebiče podle jeho proudu a návodu; 5 % žádný z citovaných zdrojů pro vozidla neuvádí, zůstává jako rozhodnutí odborníka).
- **Typ pojistky:** podle tabulek Littelfuse při 30 °C (interpolace 20/65 °C), rodiny ATOF 1–30 A, MIDI 40–125 A, MEGA 150–250 A; MINI, MAXI, 35 A a zkratové ochrany se nenabízejí. Tím odpadá problém 225 A pro 160–180 A.
- **Koeficienty uložení:** 0,76 vedle sebe, 1,0 přes kostru, 0,53 svazek nejvýš 3 obvody, motorový prostor se nepočítá, okolí do 30 °C. CAPH zůstává jako pojistka pro budoucí změny.
- **Odpor vodiče:** tabulka podle průřezu (FLRY-B do 70 mm², IEC 60228 pro 95 a 120 mm²). Teplý přepočet se ve v2 nepoužije.
- **Odpor pro plochu AWG:** větší ρ ze dvou sousedních průřezů tabulky.
- **Design:** obrácená měď tlačítka v tmavém režimu schválena; přepínač se dvěma stavy.
- **axe-core (MPL 2.0):** povolen jen ve vývojových závislostech; pravidlo v `CLAUDE.md`, brána `node tools/licence.mjs`.
- **Název a repozitář:** Caravanix držíme, domény a TMview řeší Radek; repo zakládá Radek.
- **ρ 0,0191 pro 95 a 120 mm²:** nahrazeno tabulkou odporu podle průřezu.
- **Strop CAPH ve v2 nic nemění:** v pořádku, zůstává.

- **Golden test v2 po 2. kole, dotazy testera** (hlavní vlákno; numerika a rozhraní, ne výpočet): pořadí operací u I30 i ΔU je závazné tak, jak je zapsané v zadání (engine ho dodržuje, skupina „přesně na I30“ zůstává); neplatný vstup má přednost před `motor` (bod 1 před bodem 2); chybový výsledek nese jen svůj kód; ρ(a) se bere z pole `rho` tabulky (zaokrouhlené), ne z odporOhmKm; u `NEPLATNY_VSTUP` se proud nevrací; +∞ odfiltruje UI. Pro informaci: CAPH u svazku nic nemění (v pořádku podle rozhodnutí) a pořadí `SVAZEK_NEJVYS_3_OBVODY` × `NAD_150A_12V` nejde otestovat, protože svazek nad 150 A vždy skončí `ANI_120_NESTACI`.

Radkovy odpovědi, první kolo (16. 11. 2026):

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
