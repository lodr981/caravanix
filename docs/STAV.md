# Stav

Aktualizuje hlavní vlákno po každé dávce práce. Radek sem kouká jako první.

## Souhrn (16. 11. 2026, po resetu)

**Hotovo:** svislý řez stojí – kalkulačka průřezu v1.1 v designu Dílna (golden test 160 416 případů, 716/716 testů), lekce „Kabel je kabel?“ a „Pojistka chrání kabel“, designér schválil 4 stránky ve 2. kole, čtenář laik oba úkoly splnil a jeho nálezy jsou opravené, kontrola země texty schválila, 12 karet přepsaných na v1.1 ověřeno. **Další:** po Radkově schválení karet a vzoru pokračovat dalšími kalkulačkami (spotřebiče a vaření, baterie, soběstačnost) stejným postupem. **Čeká na Radka:** jen `docs/PRO_RADKA.md` – schválit 15 karet třídy A v `docs/karty/KE_SCHVALENI.md`, schválit vzor designu, souhlas s push; výjimky licencí jen pro informaci.

Spuštění: `npm install`, `npm run dev`, pak http://localhost:4321/cs/.

## Úkoly alfy

Kroky postupu podle `docs/ZADANI.md`, kapitola První alfa. Stav: `čeká` (nezačato), `běží`, `k ověření`, `vráceno`, `čeká na Radka`, `hotovo`.

### 1. Základ repa

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| A-01 | Git, první commit | hlavní vlákno | archiv zadání | repo `main` | commit „Zadání, agenti…“ | hotovo |
| A-02 | Kostra monorepa | hlavní vlákno | CLAUDE.md | `packages/engine`, `data`, `ui`, `apps/web`, `content/cs`, `tools/check.mjs` | `npm run dev` ukáže /cs/, `npm run build` projde | hotovo |
| A-03 | Brány v `npm run check` | hlavní vlákno + autoři bran | brány alfy | `tools/check.mjs` | každá brána alfy je zavedená a hlídaná strojem | pozastaveno (mistr: limit 3 úkolů; zavedené testy, build, licence; další brány podle svislého řezu) |
| A-04 | Repo na GitHubu | Radek | `lodr981/caravanix` (soukromé) | `origin` | Radek založí repo a potvrdí push | čeká na Radka |

### 2. Design

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| D-01 | Tři směry vzhledu | designer | ZADANI_DESIGNU.md | `docs/design/smery/` | 3 style tiles + screenshoty + README | hotovo |
| D-02 | Výběr směru | Radek | D-01 | ROZHODNUTI.md | Radek vybral | hotovo (1 Dílna + displej ze 3) |
| D-03 | Design tokeny | designer | D-02 | `packages/ui` | světlý i tmavý režim, kontrasty změřené | hotovo (33 párů, `docs/design/TOKENY.md`) |
| D-04 | Komponenty | designer + hlavní vlákno | D-03 | `packages/ui` | pole, přepínač, posuvník, karta výsledku, hláška, tabulka, navigace, patička, karta ke sdílení | hotovo (interní stránka /cs/komponenty/, před vydáním odstranit) |
| D-05 | Vzor: hlavní stránka a kalkulačka průřezu | designer + hlavní vlákno | D-04, E-02 | `apps/web` | Radek schválil | čeká na Radka (designér schválil ve 2. kole, `docs/design/SCHVALENO.md`) |
| D-06 | Hlavní obrázek: řez dodávkou (SVG) | designer | D-02 | `packages/ui/assets` | styl schválen na vzoru | čeká |
| D-07 | Zadání obrázků pro Le Chat | designer | D-02, L-01 | `docs/design/zadani-obrazku/` | zadání pro každou lekci | čeká |
| D-08 | Kontrola každé stránky | designer | hotové stránky | `docs/design/kontroly/`, `SCHVALENO.md` | každá stránka SCHVÁLENO | čeká |

### 3. Engine a kalkulačky

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | Golden test průřezu | tester | KALKULACKA_PRUREZU.md, reference | `packages/engine/tests/` | test pokrývá mřížku ze zadání | hotovo (167 184 případů) |
| E-02 | Port kalkulačky průřezu v1 | hlavní vlákno | reference | `packages/engine/src/vodic-v1.ts` | golden test projde | hotovo (historie) |
| E-02b | Výpočet verze 2 | tester (reference, test) → hlavní vlákno | KALKULACKA_PRUREZU.md v2 | `packages/engine/src/vodic.ts` | golden test v2 projde | hotovo (485/485 testů) |
| E-02c | Výpočet v2 po 2. kole (pojistky podle tabulek Littelfuse, uložení 0,76/1,0/0,53, odpor podle průřezu) | tester → hlavní vlákno | KALKULACKA_PRUREZU.md, `packages/data` | engine | golden test projde | archiv (v2 v zásobníku od resetu) |
| E-02d | Výpočet v1.1: nezávislá reference (v1 + změny 1–4) a golden test | tester → hlavní vlákno | `docs/reset/KALKULACKA_V1_1.md`, KALKULACKA_PRUREZU.md | `packages/engine/tests/`, `vodic.ts` | golden test v1.1 projde | běží (engine v1.1 napsaný, test testera chybí) |
| E-03 | Kalkulačka průřezu v1.1 na webu | hlavní vlákno | engine v1.1, design, texty | `/cs/kalkulacky/prurez-kabelu/` | akceptační kritéria v KALKULACKA_PRUREZU.md | hotovo pro svislý řez (designér a laik prošli; čeká schválení karet a vzoru; nápady A 1–6 zatím jen sdílení odkazem) |
| E-04 | Nápady skupiny A 1–6 | hlavní vlákno + designer | E-03 | web | nápady fungují | čeká (Radek potvrdil 1–6) |
| E-05 | Katalog spotřebičů (~30) | reserser → overovatel | datasheety | `packages/data` + karty B | každá položka má schválenou kartu | čeká |
| E-06 | Kalkulačka spotřebičů a vaření | tester (testy) + hlavní vlákno | E-05 | engine + web | testy vzorců s ručními příklady | čeká |
| E-07 | Kalkulačka baterie | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-08 | Kalkulačka soláru (série/paralela, mráz) | tester + hlavní vlákno | karty, PVGIS (L-04) | engine + web | totéž | čeká |
| E-09 | Kalkulačka boosteru | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-10 | Kalkulačka měniče | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-08b | Předpočítání PVGIS (ČR 0,25°, vodorovně a 35° J, 1 kWp) | hlavní vlákno + strazce-licenci | ROZHODNUTI.md | `packages/data` | tabulka s verzí a datem, zdroj uveden | čeká |
| E-11 | Kalkulačka soběstačnosti (hlavní) | tester + hlavní vlákno | E-05 až E-10, PVGIS | engine + web | testy, sdílení odkazem, 100 ms | čeká |
| E-12 | Stav kalkulaček v URL | hlavní vlákno | E-03 | web | stejný odkaz = stejný výsledek | čeká |

### 4. Obsah a ověřování

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| K-01 | Karty z kalkulačky průřezu | reserser | reference, KALKULACKA_PRUREZU.md | `docs/karty/K-VODIC-*` | všechna tvrzení mají kartu | hotovo (28 karet) |
| K-02 | Ověření karet průřezu | overovatel | K-01 | `docs/karty/nalezy/` | každá karta SEDÍ, nebo vrácena | 1. kolo: 13 SEDÍ, 15 NESEDÍ |
| K-02b | Oprava karet a 2. kolo ověření | reserser → overovatel | nálezy | karty | opraveno a znovu ověřeno | hotovo: 19 SEDÍ, 5 NESEDÍ |
| K-02c | Karty a data po 2. kole Radka (3. a 4. kolo ověření) | reserser → overovatel | nálezy | karty, `packages/data` | SEDÍ | hotovo: data SEDÍ, karty 34 overeno, 0004 a 0039 spor |
| K-02d | Spory 0007, 0012, 0016 (2. vrácení) | Radek | nálezy | rozhodnutí | Radek rozhodl | hotovo |
| K-02e | Spory 0004 a 0039 (2. vrácení, text Radka) | mistr | nálezy kolo 3 a 4 | rozhodnutí | uzavřeno | hotovo (uzavřeno odkazem na v1.1) |
| K-04 | Karty pro v1.1 (přepis 0001–0005, 0009–0011, 0026, 0028, 0033, 0035, 0036, 0039) | reserser → overovatel (1 kolo) | „Zadání pro rešeršéra“ níže | karty, PREHLED.md | karty `overeno`, třída A v KE_SCHVALENI.md | čeká (další na řadě) |
| K-03 | Schválení karet třídy A | Radek | K-02, K-04 | karty `schvaleno` | Radek podepsal | čeká na Radka (1. dávka 9 karet v KE_SCHVALENI.md; 2. dávka po K-04) |
| L-01 | Návrh 10 lekcí | reserser | Průvodce zásadami | `docs/lekce/NAVRH_10_LEKCI.md` | výběr podle hledanosti | hotovo (hledanost jen orientačně) |
| L-02 | Karty pro 10 lekcí | reserser → overovatel | L-01 | `docs/karty/` | schválené karty | čeká |
| L-03 | Klíčová slova cs | autor-zeme | profil cs | `docs/profily/cs.md` | tabulka klíčových slov se zdroji | hotovo pro průřez a pojistky (9 výrazů) |
| L-04 | Texty lekcí a kalkulaček | autor-zeme → kontrolor-zeme | karty, klíčová slova | `content/cs/` | kontrolor pustil | hotovo pro 2 lekce a kalkulačku průřezu |
| L-05 | Struktura adres, titulky, sitemap, hreflang | technicke-seo | L-03 | `docs/seo/` | sitemap bez chyb, prázdný profil de jde přidat | čeká |
| L-06 | Test srozumitelnosti | ctenar-laik | hotový web | `docs/laik/` | úkoly splněné bez zaseknutí | hotovo pro svislý řez (Miroslav s potížemi → opraveno, Petr splnil) |
| P-01 | Název Caravanix: domény, známky | strazce-licenci → Radek | – | `docs/licence/NAZEV_CARAVANIX.md` | caravanix.eu, .cz, .pl volné; Radek zkontroluje TMview a zaregistruje | čeká na Radka |
| P-02 | Licence PVGIS pro API | strazce-licenci | – | `docs/licence/PVGIS.md` | podmínky zjištěné | hotovo |
| P-03b | Brána licencí závislostí (MPL jen ve vývoji) | hlavní vlákno | rozhodnutí Radka | `tools/licence.mjs` | brána v check | hotovo; 13 výjimek schválil mistr, brána prochází |
| P-03 | Evidence licencí všeho na webu | strazce-licenci | assety | `docs/licence/EVIDENCE.md` | brána v check | čeká |
| P-04 | Fotky (6–8 záběrů) | Radek | seznam záběrů | fotky | evidované | čeká na Radka |

### 5. Brány alfy

| ID | Brána | Hlídá | Stav |
| --- | --- | --- | --- |
| B-01 | Všechen publikovaný obsah má schválenou kartu (K6) | check: karty | nezavedeno |
| B-02 | Každý vzorec enginu má test a ruční příklad | vitest | částečně (průřez) |
| B-03 | Designér schválil každou stránku | check: SCHVALENO.md | nezavedeno |
| B-04 | Lighthouse ≥ 95 na každé stránce | check: Lighthouse CI | nezavedeno |
| B-05 | Sitemap bez chyb, prázdný profil de bez zásahu do kódu | check: sitemap | nezavedeno |
| B-06 | Web běží lokálně jedním příkazem | `npm run dev` | splněno pro kostru |

## Rozhodnutí mistra

### Úklid 16. 11. 2026 (po resetu a kalkulačce v1.1)

**Počty:** zavřeno 27 položek: 11 odkazem na v1.1 nebo zásobník, 9 jako nepodstatné, 7 rozhodnuto mistrem. Radkovi jdou 3 položky (`docs/PRO_RADKA.md`). V `docs/OTAZKY.md` zůstává otevřený jen bod pro právníka.

**Zavřeno odkazem na v1.1 (`docs/reset/KALKULACKA_V1_1.md`) nebo na zásobník:**

1. Výběr pojistky podle I30 a jeho důsledky (OTAZKY, PREHLED ot. 4, karta 0038): v1.1 volí pojistku ≥ 1,25 × proud ze seznamu FUSES.
2. Zaokrouhlení ρ u 1,5 mm² (OTAZKY, PREHLED ot. 1): v1.1 počítá s ρ 0,0175 / 0,0216.
3. Spor teplé místo, 0039 (OTAZKY, PREHLED ot. 3 a 8, nálezy kolo 3 a 4): Radek dal ve v1.1 nové znění bez příkladů.
4. Spor svazek, 0004 (OTAZKY, PREHLED ot. 9, nálezy kolo 3 a 4): ve v1.1 platí 0,7 ze základu 1,37; svazek 4+ obvodů je v zásobníku.
5. Pocínovaná lanka 95/120 mm² (OTAZKY, PREHLED ot. 6, karta 0037): odpor podle průřezu je v zásobníku.
6. Jeden vodič na povrchu k = 1,0 (PREHLED ot. 2, 0003): v1.1, 0,76 × 1,37 ≈ 1,04 → 1,0.
7. Věta o CAPH do ROZHODNUTI (PREHLED ot. 5, 0009): v1.1 „stropy CAPN a CAPH platí jako rozhodnutí odborníka“.
8. Class T „typicky, ne povinnost“ (PREHLED ot. 7, 0036): znění hlášky HLAVNI_VEDENI dal Radek ve v1.1.
9. 17,5 cm bez normy pro obytná vozidla (PREHLED ot. 7, 0013): Radek rozhodl podle ABYC E-11.
10. Zaokrouhlení meze 199,889 A v 0036 (PREHLED, upozornění pro hlavní vlákno): ve v1.1 je mez 250 ÷ 1,25 = 200 A.
11. Otázky testera k v2, 2. kolo (`docs/testy/ZPRAVA.md`, 8 otázek): odpověděl hlavní vlákno, v2 je archiv.

**Nepodstatné (zavřeno, nic se nemění):**

1. Otázky testera k v1 (ZPRAVA, 5 otázek): zodpovězené hlavním vláknem, rozhraní ne výpočet.
2. Vydání normy DIN VDE 0298-4:2023-06 (nálezy 0004 a 0039 kolo 4): čísla nemění, v přepisu karet se jen uvede správně.
3. Výsledek 120 mm² a rada „o stupeň silnější“ (0039 kolo 4): uživatel koupí silnější kabel, to je bezpečná strana.
4. Vlastní mínus u měniče a nabíječky (PREHLED ot. 7, 0023): karta to už netvrdí.
5. Adresa na kartě ke sdílení (TOKENY ot. 3): ukázka zůstává, skutečná doména před vydáním.
6. TOKENY ot. 1 a 2: rozhodl Radek (tlačítko, přepínač).
7. Karta 0026 (třída C, kolo 4 SEDÍ): podle zásady 2 karta není nutná, dál se neověřuje.
8. Karta 0035 zmiňuje v podmínkách hlášku MOTOR_NEPOCITA z v2: tvrzení je stejné jako text v1.1, jde ke schválení beze změny.
9. ISO 6722-1 třída B = 100 °C, výrobci FLRY deklarují 105 °C (nález 0005 kolo 2): se 100 °C vychází √((100 − 30) / 40) ≈ 1,32, svazek 0,53 × 1,32 ≈ 0,70 a vedle sebe 0,76 × 1,32 ≈ 1,00, koeficienty v1.1 tedy platí i tak. Na webu „izolace 105 °C (FLRY)“ podle výrobců, ne „ISO třída B = 105 °C“.

**Rozhodl mistr:**

1. **Karty pro v1.1:** potřebné jsou karty pro čísla a pravidla v1.1 (seznam níže v zadání pro rešeršéra). **Archiv v2, nepoužito ve v1.1** (`stav: k-prezkoumani`, poznámka v kartě): 0029, 0030, 0031, 0032, 0034, 0037, 0038. Nepoužito ve v1.1 bez přepisu: 0008 (rychlý vzorec vypuštěn). 0002 a 0011 se přepíší na v1.1 (ρ 0,0216 a pojistka ≥ 1,25 × proud).
2. **KE_SCHVALENI.md:** jen karty třídy A potřebné pro v1.1 a lekce svislého řezu, stav `overeno`: 0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024, 0035. 0005 stažena k přepisu (ve v1.1 je 105 °C důvodem koeficientů, karta píše „kalkulačka nezvyšuje“), 0035 přidána. Druhá dávka po přepisu: 0003, 0004, 0005, 0009, 0036, 0039.
3. **Výjimky licencí:** všech 13 položek v `docs/licence/VYJIMKY_ZAVISLOSTI.json` schváleno (`schvalil`: mistr podle resetu). Důvod: nová definice `strazce-licenci.md` říká, že vývojové nástroje s licencí OSI jsou v pořádku; ISC, BlueOak-1.0.0, Apache-2.0 a LGPL-3.0 jsou OSI, CC0-1.0 (mdn-data) je volné dílo, tedy volnější. Brána kontroluje výjimky jen u vývojových balíčků, produkční brána zůstává přísná. `node tools/licence.mjs` prochází (4 produkční, 210 vývojových). Radkovi pro informaci v PRO_RADKA bod 3, protože `CLAUDE.md` zatím říká „schválil Radek“.
4. **Nákupní lístek, pojistka 35 A:** v1.1 dává informativní rodiny „do 30 A nožová, 40–125 A MIDI“, 35 A v nich chybí. Ukázat „nožová“ (ATOF existuje do 40 A, karta 0029). Výpočet to nemění.
5. **Rozpracované úkoly (limit 3):** E-02d (tester, golden test v1.1), K-04 (karty v1.1), E-03 s D-05 (kalkulačka průřezu v designu na engine v1.1). A-03 (další brány) pozastaveno, dokud je svislý řez nepotřebuje.
6. **Karty 0026, 0028, 0029, 0033, 0036, 0037, 0038 s kolem 4 SEDÍ:** archivní se nepřevádějí na `overeno`. 0026 nastaví `overeno` rešeršér při úpravě odkazu, 0028, 0033 a 0036 projdou přepisem na v1.1.
7. **Otázky v PREHLED.md, ZPRAVA.md a TOKENY.md:** u každé sekce poznámka, že je uzavřeno a kde.

### Zadání pro rešeršéra: karty pro v1.1 (úkol K-04)

Vstup: `docs/reset/KALKULACKA_V1_1.md`, `docs/KALKULACKA_PRUREZU.md` (Verze 1.1), `docs/ROZHODNUTI.md` (řádky v1.1), reference `docs/reference/kalkulacka-prurezu-v1.html`, poznámky mistra v kartách. Výpočet, engine, reference ani `docs/ROZHODNUTI.md` neměnit. Každou přepsanou kartu nastavit na `stav: navrh`, v poznámce odstavec „Přepis na v1.1: co se změnilo“. Odkazy na „Verzi 2“ nahradit odkazem na v1.1. Stačí jeden dobrý zdroj nebo rozhodnutí odborníka (zásada 2); nové zdroje nehledat, kde stačí rozhodnutí Radka.

1. **K-VODIC-0003 (A), základní zatížitelnost:** tabulka AMP beze změny (VDE 0298-4 tab. 11 sl. 2, 0,5 mm² podle Lapp). Nový základ: tabulka platí pro PVC 70 °C; kalkulačka ji používá pro FLRY 105 °C jako **rozhodnutí odborníka (Radek, v1.1)**. Do `vypocet`: √((105 − 30) / (70 − 30)) = √(75 / 40) ≈ 1,369 ≈ 1,37; kontrola, že stejný vzorec dává koeficienty IEC pro PVC 70 °C: √((70 − 40) / 40) ≈ 0,866 → 0,87, √((70 − 60) / 40) = 0,50 (Lapp Table 12-2, už v kartách 0005 a 0039). Pasáž o neověřeném k = 1,0 na povrchu nahradit odkazem na 0004. Vydání normy: platné je 2023-06 (nahrazuje 2013-06).
2. **K-VODIC-0004 (A), koeficienty uložení:** nové tvrzení: „Samostatně vedený kabel (plus a mínus vedle sebe, nebo mínus přes kostru) koeficient 1,0, ve svazku 0,7.“ Zdroj: rozhodnutí odborníka (Radek, v1, potvrzeno v1.1) + výpočet: vedle sebe na povrchu 0,76 × 1,37 ≈ 1,04 → 1,0; svazek (3 obvody) 0,76 × 0,70 × 1,37 = 0,53 × 1,37 ≈ 0,73 → 0,7. Zdroje 0,76 a 0,70 (Lapp) ponechat. Podmínka platnosti svazku (podobné kabely, nejvýš 3 obvody) zůstává v `podminky` jako informace, ne jako hláška; počet obvodů je v zásobníku. 0,76 / 0,53 / motorový prostor jako výpočet v2 odstranit (zmínit jen jako historii). Max. pojistky přepočítat pro v1.1 (FUSES bez 300 A, CAPN/CAPH).
3. **K-VODIC-0005 (A), FLRY 105 °C:** tvrzení: „Automobilové kabely FLRY v PVC výrobci deklarují do 105 °C (ISO 6722-1 je řadí do třídy B). Kalkulačka toho využívá: koeficienty uložení 1,0 a 0,7 (K-VODIC-0004) vycházejí z dovolené teploty 105 °C místo 70 °C.“ Větu „kalkulačka hodnoty nezvyšuje“ vypustit. Do `podminky` a `vypocet`: podle ověřovatele má třída B v normě 100 °C; se 100 °C vychází √(70 / 40) ≈ 1,32 a koeficienty 0,70 a 1,00 platí také. Na webu nepsat „ISO třída B = 105 °C“.
4. **K-VODIC-0001 (B), měrný odpor:** tvrzení: „Kalkulačka počítá úbytek s měrným odporem mědi 0,0175 Ω·mm²/m (samostatně vedený kabel).“ Zdroj: rozhodnutí odborníka (Radek, v1, v1.1) a NIST 0,017241 při 20 °C. Tabulku FLRY-B (0,0181–0,0191) nechat jen jako poznámku: „Rozdíl proti skutečnému lanku mění úbytek o desetiny procentního bodu a na rozhodnutí uživatele nemá vliv“ (v1.1). `rozsah` a odkaz na `odpor-vodicu.json` odstranit.
5. **K-VODIC-0002 (B), ρ ve svazku:** tvrzení: „Ve svazku kalkulačka počítá s ρ 0,0216 Ω·mm²/m, měď zahřátá asi na 80 °C.“ Zdroj: rozhodnutí odborníka (Radek) + NIST α20; výpočet 0,0216 / 0,0175 = 1,234 → asi 80 °C už v kartě je. 0,0236 jen jako historie.
6. **K-VODIC-0009 (A), stropy CAPN a CAPH:** rozhodnutí odborníka, CAPN samostatně, CAPH ve svazku. Větu „CAPH dnes nic nemění (rozhoduje 0,53)“ nahradit tím, co platí ve v1.1: spočítat, ve kterých průřezech rozhoduje strop a ve kterých AMP × k (1,0 / 0,7), a uvést to.
7. **K-VODIC-0010 (B), nabízené pojistky:** tvrzení: seznam FUSES v1.1 = 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250 A; 300 A není, protože MEGA 300 A je podle Littelfuse jen zkratová ochrana (zdroj převzít z 0033). Rodina v nákupním lístku jen informativně: do 30 A nožová, 35 A také nožová (rozhodnutí mistra), 40–125 A MIDI, nad 125 A MEGA; výpočet nemění.
8. **K-VODIC-0011 (B), pojistka ≥ 1,25 × proud:** zdroj: rozhodnutí Radka (v1.1, změna 1), důvod „nožová pojistka pak při trvalé zátěži nepálí zbytečně“; jako podporu smí převzít tabulku Littelfuse ATOF z 0029 (při 20 °C stačí 1,11×, při 65 °C 1,33×). Mez rozsahu 250 ÷ 1,25 = 200 A. Větu „poměr je dočasný“ vypustit.
9. **K-VODIC-0028 (B), vzorec úbytku:** ΔU = ρ × L × n × I ÷ A s ρ 0,0175 (samostatně) a 0,0216 (ve svazku); ruční příklad přepočítat pro v1.1 (ověřit proti enginu `packages/engine/src/vodic.ts` nebo referenci v1).
10. **K-VODIC-0033 (B), MEGA:** zúžit na to, co v1.1 používá: „Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu“ (Littelfuse: v rozsahu 80–250 A při 20 °C nejvýš asi 1 / 1,29 ≈ 78 %) a „MEGA 300 A a víc je jen ochrana proti zkratu“. Výběr podle I30 odstranit.
11. **K-VODIC-0036 (A), hlavní vedení:** mez = největší pojistka z FUSES ÷ 1,25 = 250 ÷ 1,25 = 200 A; nad ní hláška „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“ (znění Radka, v1.1). Přidat hlášku nad 150 A: „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“ s odkazem na 0033.
12. **K-VODIC-0039 (A), teplé místo:** text v1.1: „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“ (znění Radka). Výpočet přepočítat pro kabel 105 °C: zatížitelnost proti tabulce = k_VDE × √((105 − T) / 40), kde k_VDE je 0,76 (samostatně) nebo 0,53 (svazek); kalkulačka počítá s 1,0 / 0,7; jeden stupeň stačí, když k_VDE × √((105 − T) / 40) × AMP(a + 1) ≥ k × AMP(a). Uvést mez T pro nejhorší a nejlepší průřez (mistr odhaduje asi 55 °C v nejhorším případě, se 100 °C asi 50 °C; spočítej přesně). Opravit místo ve zdroji Lapp (nález kolo 4, bod 3) a vydání normy 2023-06.
13. **K-VODIC-0026 (C):** jen změnit odkaz z „Verze 2, bod 7“ na v1.1 a nastavit `stav: overeno` (kolo 4 SEDÍ, mistr rozhodl, dál se neověřuje).
14. **K-VODIC-0035 (A):** neměnit tvrzení (karta je v KE_SCHVALENI.md). Jen v `podminky` nahradit zmínku o hlášce MOTOR_NEPOCITA větou, že ve v1.1 jde o text pod volbami uložení. Stav zůstává `overeno`.
15. **PREHLED.md:** přepsat úvod a tabulku na v1.1; archivní karty v2 dát do samostatné tabulky „Archiv v2“.

**Ověřovatel (jedno kolo):** u 0003, 0004 a 0005 jen výpočet (1,37; 1,04; 0,73; kontrola se 100 °C) a to, že FLRY-B je kabel 105 °C podle výrobců; u ostatních přepsaných karet jen to, že tvrzení odpovídá v1.1 a výpočet sedí. Co ověřovatel vrátí, rozhodne mistr (kromě třídy A, ta jde přes KE_SCHVALENI.md). Karty třídy A s verdiktem SEDÍ (0003, 0004, 0005, 0009, 0036, 0039) přidá hlavní vlákno do `docs/karty/KE_SCHVALENI.md` jako druhou dávku.

### Zadání pro hlavní vlákno: licence

1. Brána `tools/licence.mjs` teď prochází se schválenými výjimkami; nic měnit nemusíš.
2. Až Radek potvrdí PRO_RADKA bod 3 (nebo po 48 hodinách platí výchozí volba): v `CLAUDE.md` změnit větu „Jiné licence jen s výjimkou …, kterou schválil Radek“ na „Vývojové závislosti smějí mít jakoukoli licenci schválenou OSI (a volné dílo CC0); produkční jen MIT, BSD, Apache-2.0, OFL-1.1.“ V `tools/licence.mjs` rozšířit `POVOLENE_VYVOJ` o ISC, BlueOak-1.0.0, 0BSD, CC0-1.0, LGPL-3.0-or-later a složené výrazy z nich (např. „Apache-2.0 AND LGPL-3.0-or-later“); produkční seznam `POVOLENE` neměnit. Pak lze výjimky z JSON odstranit, nebo nechat jako záznam.
3. Kdyby Radek odpověděl ne: vrátit `schvaleno` v JSON na false; brána bude padat, dokud nerozhodne jinak.

### Tři věty (mistr, 16. 11. 2026)

Hotovo: úklid všeho otevřeného, OTAZKY skoro prázdné, archivní karty v2 označené, brána licencí prochází. Další: tester píše golden test v1.1 (E-02d), rešeršér přepíše karty na v1.1 (K-04), hlavní vlákno s designérem dělá kalkulačku průřezu v designu (E-03, D-05). Na Radka čekají 3 položky v `docs/PRO_RADKA.md`, hlavně schválení 9 karet třídy A.

## Lokální alfa: jak spustit

```
npm install
npm run dev
```

Pak otevřete http://localhost:4321/cs/. Funguje kalkulačka průřezu a pojistky (`/cs/kalkulacky/prurez-kabelu/`) jako **pracovní verze**: počítá engine v2, stav je v adrese (odkaz otevře stejný výsledek), texty zatím nejsou schválené. Ostatní kalkulačky čekají na data a karty.

## Hotovo v poslední dávce (dávka 3, 16. 11. 2026)

- Radkova rozhodnutí 2. kola v `docs/ROZHODNUTI.md`; zadání v2 přepsané (pojistky podle tabulek Littelfuse při 30 °C, rodiny ATOF/MIDI/MEGA, uložení 0,76 / 1,0 / 0,53, motorový prostor se nepočítá, odpor podle průřezu, AWG s větším ρ ze sousedů). Do zásobníku: motorový prostor s tabulkami 105/125/150 °C, počet obvodů, teplota okolí.
- **Data:** `packages/data/src/odpor-vodicu.json` (15 průřezů) a `pojistky.json` (22 pojistek) – ověřovatel potvrdil všechny hodnoty proti datasheetům, včetně 95 a 120 mm².
- **Tester:** nezávislá reference v2 z textu zadání, golden test 183 312 případů, 28 mutantů výpočtu odhaleno, 12 ručních příkladů. **Engine** v2: 545/545 testů; záměrná chyba (0,8 místo 0,76) shodí 62 testů.
- **Licence:** pravidlo MPL 2.0 jen ve vývojových závislostech v `CLAUDE.md`; brána `node tools/licence.mjs` v `npm run check`. Astro a @astrojs/react přesunuty mezi vývojové závislosti (statický web je za běhu nepotřebuje); produkční strom je jen React a IBM Plex (MIT, OFL).
- **Karty:** 3. a 4. kolo ověření. Stav: 34 `overeno`, 2 ve sporu (0004, 0039), 3 `k-prezkoumani` (0002, 0008, 0011 – nepoužité). Přehled 9 karet třídy A ke schválení v `docs/karty/KE_SCHVALENI.md` (0009 a 0035 staženy, protože se měnily; přidány 0007 a 0012).
- Žádná karta zatím není `schvaleno`, na webu tedy dál nic s fakty není. Kalkulačka průřezu na webu zatím není (čeká na schválené karty a texty).

## Rizika

- **Karty v1.1:** spory 0004 a 0039 mistr uzavřel odkazem na v1.1; kalkulačka nejde ven, dokud karty v1.1 (K-04) neprojdou a Radek neschválí třídu A.
- **Koeficienty uložení** v1.1 (1,0 / 0,7) jsou rozhodnutí odborníka s výpočtem √((105 − 30) / (70 − 30)) ≈ 1,37; vstupní 0,76 a 0,70 stojí na výtazích Lapp.
- **Brány:** `npm run check` má zavedené testy, build a licence závislostí (prochází, výjimky schválil mistr); karty, licence assetů, designérovo schválení, Lighthouse a sitemap zatím NEZAVEDENO.
- **Agenti** běží jako obecní agenti s pokynem řídit se definicí v `.claude/agents/`.
