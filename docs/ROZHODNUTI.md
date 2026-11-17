# Rozhodnutí

Tento soubor mění jen Radek. Agenti ho čtou a řídí se jím.

| Datum | Rozhodnutí |
| --- | --- |
| 2026-11-16 | Caravanix je průvodce a podklad pro montáž, ne revize ani podepsaný projekt. |
| 2026-11-16 | Výpočty dělá deterministický engine, AI jen vede rozhovor a vysvětluje. |
| 2026-11-16 | Každé publikované tvrzení má kartu, ověřenou nezávislým ověřovatelem. Bezpečnostní karty (třída A) schvaluje Radek. |
| 2026-11-16 | První alfa: česká příručka a kalkulačky, lokálně na Radkově PC. Němčina, polština a angličtina následují, architektura s nimi počítá. |
| 2026-11-16 | Dvě cesty doporučení: Optimum a Levně. Bezpečnost a spolehlivost mají stejnou. |
| 2026-11-16 | Kalkulačka průřezu: logika schválená 11. 11. 2026 (reference v `docs/reference/`), v alfě dostane nový design a nápady skupiny A. |
| 2026-11-16 | Katalog spotřebičů z datasheetů a štítků typických modelů. Vlastní měření zatím ne. |
| 2026-11-16 | Technické obrázky jsou vlastní SVG. Scény a maskota generuje Radek v Le Chatu podle zadání designéra. Fotky vlastní. |
| 2026-11-16 | Vzhled luxusní, ale ne okázalý, pro lidi 20–80 let. Designér má právo veta. |
| 2026-11-16 | Odkazy do e-shopů zatím bez provize. |
| 2026-11-16 | Tým: hlavní vlákno a devět subagentů podle `CLAUDE.md`. Agenti zemí pracují s profilem země. |
| 2026-11-16 | Design: směr 1 Dílna s tmavým „displejem“ výsledku ze směru 3. Musí působit draze a klidně, ne rustikálně ani retro; jinak zpět ke směru 3. |
| 2026-11-16 | Akcent: tmavší, hnědější měď na text, odkazy a tlačítka (text na tlačítku alespoň 7 : 1). Jasnější měď jen na velké plochy, ikony a ilustrace (alespoň 3 : 1 proti pozadí). |
| 2026-11-16 | Světlý a tmavý režim: výchozí podle zařízení, viditelný přepínač v hlavičce, volba v localStorage, žádná cookie. |
| 2026-11-16 | Repozitář: soukromý `github.com/lodr981/caravanix`, commity s GitHub noreply e-mailem. Push až po Radkově souhlasu. |
| 2026-11-16 | Kalkulačka průřezu, nápady skupiny A: zařadit 1–6 (řez kabelem, zbarvení podle zatížení, posuvník se značkou, nákupní lístek, karta ke sdílení, „Mám kabel“). Nápad 7 až po schválení karet spotřebičů. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Kalkulačka průřezu, výpočet verze 2 (body 7–11 Radkových odpovědí, podrobně `docs/KALKULACKA_PRUREZU.md`): ρ 0,0191 a 0,0236, uložení se čtyřmi volbami (vedle sebe 0,8; mínus přes kostru 1,0; svazek 0,53; motorový prostor 0,5), pojistka ≥ 1,25 × proud do rešerše Littelfuse, bez 300 A, mez rozsahu z tabulky pojistek. Reference v1 zůstává jako historie. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Svazek počítá s ρ pro 80 °C (0,0236) jako motorový prostor. Mínus přes kostru jen u volby „jeden vodič“, svazek a motorový prostor vždy s vlastním mínusem. |
| 2026-11-16 | 5 % úbytek a stropy CAPN/CAPH jsou rozhodnutí odborníka (Radek). ρ 0,0216 (měď při ~80 °C) je rozhodnutí odborníka. |
| 2026-11-16 | Texty průřezu: rychlý vzorec 10 × A ÷ I vypustit; CCA nedoporučovat (asi o 60 % vyšší odpor, vodivost zhruba o třetinu nižší, do vozu jen čistá měď); pojistka u baterie „co nejblíž, nejvýš 17,5 cm“ podle ABYC E-11. |
| 2026-11-16 | Název Caravanix držíme, pokud je volná caravanix.eu (Radek pak ručně zkontroluje TMview a zaregistruje .eu, .cz, .pl; němčina na .eu/de/). Jinak pět alternativ s ověřenými doménami. Právník až před betou s platbami. |
| 2026-11-16 | ~~NAHRAZENO (PVGIS se v alfě nepoužívá, 16. 11. 2026)~~ PVGIS: předpočítaná statická tabulka, žádné živé API. Alfa: ČR v mřížce 0,25°, později Evropa 0,5°. Vodorovně (dodávka) a 35° na jih (chata), 1 kWp, ztráty 0 %; ztráty dopočítá engine z vlastních karet. Zdroj „PVGIS © Evropská unie“. |
| 2026-11-16 | Technologie potvrzené: Astro s React ostrůvky, TypeScript, npm workspaces. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Druhé kolo odpovědí nahrazuje body 8–10 prvního kola, kde se liší. Každé nové číslo dostane kartu a jde k ověřovateli; tester nejdřív upraví nezávislou referenci v2, potom se mění engine. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Karty K-VODIC-0003 a 0004 se zatím neschvalují (mění se koeficienty uložení). Zbylých 9 karet třídy A ke schválení přes `docs/karty/KE_SCHVALENI.md`. |
| 2026-11-16 | Spory po druhém vrácení: platí znění ověřovatele. 0007: „Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ CCA do vozu nepoužívat. 0012: „Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce.“ 0016: „Pro 12/24 V ve vozidle žádný z citovaných zdrojů 5 % neuvádí.“ 5 % zůstává jako rozhodnutí odborníka. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Pojistka podle tabulek Littelfuse místo jednoho poměru: nejmenší jmenovitá hodnota, jejíž dovolený trvalý proud při 30 °C (lineární interpolace mezi sloupci 20 °C a 65 °C) je alespoň proud spotřebiče, a zároveň nejvýš max. pojistka kabelu. Rodiny: nožová ATOF 1–30 A, šroubovací MIDI 40–125 A, MEGA 150–250 A; kalkulačka ukáže rodinu. MINI, MAXI a 35 A nenabízet; zkratové ochrany (MIDI 150–200 A, MEGA ≥ 300 A) nikdy. Mimo rozsah hláška „hlavní vedení“, mez z tabulek. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Uložení kabelu: plus a mínus vedle sebe 0,76 (výchozí, připevněné k povrchu); jeden vodič s mínusem přes kostru 1,0; svazek 0,53 nejvýš pro 3 obvody (pro víc hláška „Silové kabely veďte zvlášť, nebo svazek rozdělte.“, volba počtu obvodů ne). Motorový prostor se v alfě nepočítá (hláška o kabelu třídy C 125 °C nebo D 150 °C a tabulce jeho výrobce). Okolí do 30 °C; text „Vede-li kabel teplým místem (u topení, pod plechem na slunci), zvolte o stupeň silnější.“ CAPN pro první dva režimy, CAPH pro svazek; že CAPH dnes nikde nerozhoduje, je v pořádku, zůstává jako pojistka pro případ budoucích změn koeficientů. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Odpor vodiče: tabulka podle průřezu. Do 70 mm² horní mez z datasheetu FLRY-B, 95 a 120 mm² max. odpor třídy 5 podle IEC 60228 (Lapp T11): 0,206 a 0,161 Ω/km, tj. 0,0196 a 0,0193 Ω·mm²/m. Teplý přepočet na 80 °C se ve verzi 2 nepoužije. |
| 2026-11-16 | Design: tlačítko v tmavém režimu světlá měď s tmavým textem (8,51 : 1) schváleno. Přepínač režimu se dvěma stavy. |
| 2026-11-16 | Licence: MPL 2.0 (axe-core) povolena jen ve vývojových závislostech; v produkčních závislostech brána licencí selže. |
| 2026-11-16 | Caravanix držíme; domény .eu, .cz, .pl registruje a TMview kontroluje Radek. Repo `lodr981/caravanix` zakládá Radek, push až po jeho souhlasu. |
| 2026-11-16 | ~~NAHRAZENO verzí 1.1 (reset 16. 11. 2026)~~ Odpor pro plochu AWG (mimo průřezy tabulky): větší ρ ze dvou sousedních průřezů tabulky (konzervativní). |
| 2026-11-16 | **Reset práce:** nad prací stojí subagent `mistr` s testem podstatnosti (`.claude/agents/mistr.md`); Radek dostává nejvýš 5 rozhodnutí v `docs/PRO_RADKA.md` a karty třídy A najednou v `docs/karty/KE_SCHVALENI.md`. Nejdřív svislý řez (kalkulačka průřezu v designu, 2 lekce, testy, schválení). Pravidla v `CLAUDE.md` a `docs/reset/CLAUDE_ZMENY.md`. |
| 2026-11-16 | **Kalkulačka průřezu v1.1** (`docs/reset/KALKULACKA_V1_1.md`, nahrazuje výpočetní část obou kol odpovědí z 16. 11.): platí výpočet v1 (ρ 0,0175 / 0,0216, koeficienty 1,0 / 0,7, CAPN/CAPH). Zdůvodnění: VDE 0298-4 je pro PVC 70 °C, FLRY-B snese 105 °C, zatížitelnost roste s √((105 − 30) / (70 − 30)) ≈ 1,37; svazek 0,53 × 1,37 ≈ 0,73 → 0,7 platí; vedle sebe na povrchu 0,76 × 1,37 ≈ 1,04 → 1,0 platí. |
| 2026-11-16 | v1.1, změna 1: pojistka ≥ 1,25 × proud (místo 1,1×). |
| 2026-11-16 | v1.1, změna 2: 300 A ze seznamu pojistek pryč; mez rozsahu = největší pojistka ÷ 1,25 = 200 A; nad mezí hláška „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“ |
| 2026-11-16 | v1.1, změna 3: nad 150 A navíc hláška „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“ |
| 2026-11-16 | v1.1, změna 4: režim „Ve svazku / motorový prostor“ se jmenuje „Ve svazku“ (výpočet 0,7 a ρ 0,0216 beze změny); pod volbami text „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C nebo D) a dimenzujte podle tabulky jeho výrobce.“ |
| 2026-11-16 | v1.1, texty: u výsledku „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“; CCA podle znění ověřovatele, „do vozu jen čistou měď“; pojistka u baterie „co nejblíž, nejvýš 17,5 cm“ (ABYC E-11); rychlý vzorec 10 × A ÷ I vypustit. |
| 2026-11-16 | v1.1: ρ zůstává 0,0175 (K-VODIC-0001 jen poznámka). Karty 0003 a 0004 přepsat na základ v1.1 (rozhodnutí odborníka + výpočet), ověřovatel zkontroluje jen výpočet a třídu 105 °C u FLRY-B, pak do přehledu ke schválení. Verze 2 do zásobníku. Informativní rodina pojistky podle hodnoty (do 30 A nožová, 40–125 A MIDI, nad 125 A MEGA) smí být v nákupním lístku, výpočet nemění. |
| 2026-11-16 | PVGIS se v alfě nepoužívá (ani předpočítaný). Soběstačnost počítá s přibližnými měsíčními průměry výnosu soláru pro několik měst (tabulka v `packages/data`, zaokrouhlené hodnoty se zdrojem). Nahrazuje řádek o předpočítání PVGIS. |
| 2026-11-17 | Pojistka u baterie: na webu jen „co nejblíž k baterii“, bez číselné meze (nahrazuje „nejvýš 17,5 cm“). |
| 2026-11-17 | Lekce o kabelu nemá název „Kabel je kabel?“ (Radek: nesmysl). |
| 2026-11-17 | Přehledový katalog spotřebičů s typickými příkony (z datasheetů a štítků, se zdroji) a rychlá volba v kalkulačce spotřebičů. |
| 2026-11-17 | Booster: realistický model – do 90 % nabití průměrně 0,7 jmenovitého proudu (dá se změnit 0,5–0,9), nad 90 % 0,2; v soběstačnosti koeficient 0,7 (podklad `docs/karty/BOOSTER_REALNE.md`). |
| 2026-11-17 | Vizuální brána: podpisový prvek 1 (řez kabelem a zatížení) je lepší než konkurence (FarOutRide). |
| 2026-11-17 | Vizuální brána: řez dodávkou je lepší než konkurence a je hlavním obrázkem webu. |
| 2026-11-17 | Schváleno 10 karet třídy A pro lekce 3–10 (K-LEKCE-0001, 0002, 0003, 0005, 0006, 0007, 0009, 0010, 0011, 0013). |
| 2026-11-17 | Mistral: Radek povolí Agents API v účtu Mistral (skript `tools/obrazek.mjs` zůstává). |
| 2026-11-17 | Push do soukromého `github.com/lodr981/caravanix` povolen; `.claude/settings.json` z archivu rychlé alfy vloží Radek ručně. |
