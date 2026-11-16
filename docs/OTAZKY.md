# Otázky

Agent sem zapíše nejasnost a pokračuje jinou prací. `[ČEKÁ NA RADKA]` = rozhoduje Radek, `[PRÁVNÍK]` = potřeba právníka. Vyřešenou otázku přesuň dolů do sekce Vyřešené i s odpovědí.

## Otevřené

### Nejdřív (blokuje další dávku)

- [ČEKÁ NA RADKA] **Směr designu:** 1 Dílna, 2 Krajina, nebo 3 Přístroj? Designer doporučuje 1 Dílna, případně s tmavým „displejem“ výsledku ze směru 3. Podklady: `docs/design/smery/README.md`, stránky `smer-*.html` (otevřít v prohlížeči) a `screenshoty/`.
- [ČEKÁ NA RADKA] **Akcent:** měď v tmavším, hnědějším odstínu (kvůli kontrastu 7 : 1), nebo jiný?
- [ČEKÁ NA RADKA] **Přepínač světlý/tmavý režim** viditelně v hlavičce, nebo jen podle nastavení zařízení?
- [ČEKÁ NA RADKA] **Repozitář na GitHubu:** adresa (URL) a souhlas s `git push`. Soukromý, nebo veřejný? Pozor: commity jsou podepsané e-mailem z lokálního nastavení gitu.

### Design a kalkulačka průřezu

- [ČEKÁ NA RADKA] Které nápady skupiny A u kalkulačky průřezu zařadit (`docs/KALKULACKA_PRUREZU.md`). Zvlášť obrácený režim „Mám kabel“.
- [ČEKÁ NA RADKA] Po výběru směru odstranit nepoužité fontové balíčky `@fontsource/*` (designer se ptá na souhlas).

### Karty kalkulačky průřezu (podrobně v `docs/karty/PREHLED.md`, sekce Otázky pro Radka)

Rešeršér našel místa, kde zdroje s textem nebo čísly reference úplně nesedí. Výpočet nikdo nemění; rozhoduje Radek. Nálezy ověřovatele jsou v `docs/karty/nalezy/`.

**Nálezy ověřovatele, které se týkají výpočtu (16. 11. 2026):**

- [ČEKÁ NA RADKA] Dvojice + a − vedle sebe (K-VODIC-0003): tabulka VDE platí pro „jednu zatíženou žílu“; pro dva dotýkající se jednožilové kabely v DC obvodu uvádí Lapp ×0,8. CAPN je nad 0,8 × AMP u 10, 16, 70, 95 a 120 mm². Hodnotu 12 A pro 0,5 mm² norma neuvádí (rozšíření od Lapp).
- [ČEKÁ NA RADKA] Svazek (K-VODIC-0004): pro jednožilové vodiče se podle Bayka a Lapp použije tab. 10, ne tab. 21; vychází ~0,53 místo 0,70. CAPH je nad 0,532 × AMP u všech průřezů kromě 1 mm².
- [ČEKÁ NA RADKA] Motorový prostor (K-VODIC-0004): režim počítá nejvýš s okolím 50 °C. Při 60 °C je faktor 0,50; Prysmian pro motorový prostor uvádí kabely třídy C (125 °C) a D (150 °C).
- [ČEKÁ NA RADKA] Pojistka 1,1 × proud (K-VODIC-0011): podle tabulek Littelfuse MEGA nestačí ani při 20 °C u MEGA 40, 60 a 150–250 A (potřeba až 1,40×), těsně ani u ATOF 20 a 30 A.
- [ČEKÁ NA RADKA] Pojistka 300 A (K-VODIC-0010): kalkulačka ji nabídne pro 227–273 A, ale MEGA 300 A je podle výrobce jen zkratová ochrana. Hláška „nad 240 A“ neodpovídá skutečné mezi 272,7 A.
- [ČEKÁ NA RADKA] ρ = 0,0175 (K-VODIC-0001, SEDÍ): proti reálnému lanku FLRY-B (0,0181–0,0191) je o 2–9 % nekonzervativní.
- Rychlý vzorec 10 × A ÷ I (K-VODIC-0008): platí jen pro kabel vedený samostatně; ve svazku vychází délka o 23 % delší (na nebezpečnou stranu). Opraví se v novém textu u kalkulačky.

**Rešeršér:**

- [ČEKÁ NA RADKA] ρ = 0,0216 (K-VODIC-0002): odkud pochází? Odpovídá mědi při ~80 °C. Zapsat jako rozhodnutí odborníka?
- [ČEKÁ NA RADKA] CCA (K-VODIC-0006, 0007): „o asi 60 % horší vodivost“ platí jen jako „o ~60 % vyšší odpor“ (vodivost je o ~35 % nižší). Rada „o stupeň větší“ u silných kabelů nestačí. Přeformulovat, nebo CCA nedoporučovat?
- [ČEKÁ NA RADKA] Pojistka „do 20 cm“ (K-VODIC-0013): zdroj nenalezen, ABYC uvádí 175 mm. Ponechat 20 cm, nebo upravit?
- [ČEKÁ NA RADKA] Pojistka ≥ 1,1 × proud (K-VODIC-0011): v teple by podle tabulek Littelfuse bylo potřeba víc. Doplnit text?
- [ČEKÁ NA RADKA] Pojistka 300 A (K-VODIC-0010): MEGA 300 A je podle výrobce jen zkratová ochrana. Upozornit? (Změna hlášek = změna logiky.)
- [ČEKÁ NA RADKA] Svazek / motorový prostor 70 % (K-VODIC-0004): odpovídá buď svazku, nebo horku, ne oběma současně. Upozornit v textu?
- [ČEKÁ NA RADKA] 5 % úbytek (K-VODIC-0016) a stropy CAPN/CAPH (K-VODIC-0009) potvrdit jako rozhodnutí odborníka.
- [ČEKÁ NA RADKA] Odpor reálného lanka (K-VODIC-0001): stačí poznámka v textu?

### Název a licence

- [ČEKÁ NA RADKA] **Název Caravanix:** caravanix.com a .de jsou obsazené (od 2014 a 2018, držitel neznámý); .cz, .pl, .net, .app volné; .eu nezjištěno. Známky se nepodařilo strojově prohledat. Ruční hledání v TMview (postup v `docs/licence/NAZEV_CARAVANIX.md`), nebo rešerše u patentového zástupce? Registrovat volné domény (placené)? Zvážit jiné jméno, dokud je změna levná?
- [PRÁVNÍK] Rešerše známky ve třídách 9, 12, 35, 41, 42 a rozlišovací způsobilost jména se základem „caravan“ (`docs/licence/NAZEV_CARAVANIX.md`).
- [ČEKÁ NA RADKA] **PVGIS:** předpočítat výnosy do statické tabulky místo živého API (API se nesmí volat z prohlížeče)? Pro jaké území a jak hustou mřížku (jen ČR, nebo Evropa)?
- [ČEKÁ NA RADKA] Potvrdit technologie: Astro s React ostrůvky, TypeScript, npm workspaces. Kostra na nich stojí a funguje.

## Vyřešené

- **PVGIS, licence pro API** (16. 11. 2026, `strazce-licenci`): data i API jsou zdarma bez omezení použití, podmínkou je uvést zdroj (PVGIS, JRC Evropské komise, odkaz). Komerční použití se nezakazuje. API 5.3: bez klíče, 30 volání/s na IP, volání z prohlížeče není dovolené. Podrobně `docs/licence/PVGIS.md`. Zbývá rozhodnutí o předpočítání (viz výše).
- **Rozhraní enginu průřezu, dotazy testera** (16. 11. 2026, hlavní vlákno; jde o rozhraní, ne o výpočet):
  - kód „rozhodlo“ je v `hlasky` první, stejně jako v referenci, a zároveň v poli `rozhodlo`: ano, tak je to zamýšlené;
  - proud u `ANI_120_NESTACI` se nevrací ani neporovnává, protože ho reference neukazuje;
  - příkon v režimu P je zadaná hodnota;
  - `Infinity` se chová jako v referenci; nesmyslné vstupy odfiltruje UI při převodu textu na číslo (test ošklivých vstupů v UI napíše tester u E-03);
  - `@types/node` doinstalováno (MIT).
