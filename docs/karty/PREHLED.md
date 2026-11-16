# Přehled karet tvrzení

Generováno rešeršérem 16. 11. 2026. Karty z kalkulačky průřezu (`docs/reference/kalkulacka-prurezu-v1.html`, úkol K-01). Všechny jsou ve stavu `navrh` a čekají na ověřovatele (K-02). Třída A po ověření schvaluje Radek.

Souhrn: 28 karet, z toho A: 12, B: 11, C: 5.

| ID | Třída | Tvrzení | Stav |
| --- | --- | --- | --- |
| [K-VODIC-0001](K-VODIC-0001.md) | B | Kalkulačka počítá s měrným odporem mědi ρ = 0,0175 Ω·mm²/m jako hodnotou při 20 °C. | navrh |
| [K-VODIC-0002](K-VODIC-0002.md) | B | V režimu „Ve svazku / motorový prostor“ kalkulačka počítá s ρ = 0,0216 Ω·mm²/m, což odpovídá mědi zahřáté přibližně na 80 °C. | navrh |
| [K-VODIC-0003](K-VODIC-0003.md) | A | Zatížitelnost jednožilového měděného kabelu ve vzduchu při okolí 30 °C podle DIN VDE 0298-4 je: 0,5 mm² 12 A, 0,75 mm² 15 A, 1 mm² 19 A, 1,5 mm² 24 A, 2,5 mm² 32 A, 4 mm² 42 A, 6 mm² 54 A, 10 mm² 73 A, 16 mm² 98 A, 25 mm² 129 A, 35 mm² 158 A, 50 mm² 198 A, 70 mm² 245 A, 95 mm² 292 A, 120 mm² 344 A. | navrh |
| [K-VODIC-0004](K-VODIC-0004.md) | A | Kabel ve svazku s dalšími nebo v teplém motorovém prostoru se hůř chladí; kalkulačka proto v režimu „Ve svazku / motorový prostor“ snižuje zatížitelnost na 70 %. | navrh |
| [K-VODIC-0005](K-VODIC-0005.md) | A | Automobilové kabely snesou obvykle 105 °C, takže hodnoty zatížitelnosti pro PVC 70 °C mají rezervu. | navrh |
| [K-VODIC-0006](K-VODIC-0006.md) | B | Kabel CCA (hliník poměděný) má vyšší odpor než měď: zhruba o 55–60 % vyšší měrný odpor, tj. vodivost asi o 35–37 % nižší. | navrh |
| [K-VODIC-0007](K-VODIC-0007.md) | A | Pokud kabel je CCA, nestačí počítat s průřezem o stupeň větším ve všech velikostech: pro stejný úbytek napětí potřebuje CCA asi 1,6× větší průřez, a od 25 mm² výš už jeden stupeň řady 1,6× nedává. | navrh |
| [K-VODIC-0008](K-VODIC-0008.md) | B | Rychlý vzorec pro 12 V a vlastní mínusový vodič: délka [m] ≈ 10 × průřez [mm²] ÷ proud [A] pro úbytek 3 %, nebo ≈ 34 × průřez ÷ proud pro 10 %; poloviční proud dovolí dvojnásobnou délku. | navrh |
| [K-VODIC-0009](K-VODIC-0009.md) | A | Maximální pojistka pro daný průřez je navíc omezena praktickými stropy z autoelektriky (CAPN pro kabel vedený samostatně, CAPH ve svazku nebo motorovém prostoru), např. 2,5 mm² = 20 A. | navrh |
| [K-VODIC-0010](K-VODIC-0010.md) | B | Kalkulačka vybírá pojistku z řady běžných jmenovitých hodnot automobilových pojistek 1 až 300 A (1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250, 300 A). | navrh |
| [K-VODIC-0011](K-VODIC-0011.md) | B | Pojistka se volí jako nejbližší hodnota z řady, která je alespoň 1,1× proud spotřebiče, aby zbytečně nepálila. | navrh |
| [K-VODIC-0012](K-VODIC-0012.md) | A | Pojistka chrání kabel, ne spotřebič: nesmí být vyšší, než kabel snese, jinak se tenký kabel při přetížení přehřeje, taví se izolace a hrozí požár. | navrh |
| [K-VODIC-0013](K-VODIC-0013.md) | A | Pojistka patří na plusový vodič co nejblíž k baterii, ideálně do 20 cm; kdyby byla u spotřebiče, zkrat mezi baterií a pojistkou nic nezastaví. | navrh |
| [K-VODIC-0014](K-VODIC-0014.md) | A | Pokud se kabel větví na tenčí, každá tenčí odbočka potřebuje vlastní, menší pojistku. | navrh |
| [K-VODIC-0015](K-VODIC-0015.md) | A | Spotřebiče s velkým rozběhovým proudem (kompresor, motor, měnič) mohou potřebovat pomalou pojistku; kabel se pak dimenzuje na tuto pojistku. | navrh |
| [K-VODIC-0016](K-VODIC-0016.md) | B | Dovolený úbytek napětí: 3 % pro elektroniku, kompresorovou lednici, měnič a nabíječku, 5 % pro běžné spotřebiče a 10 % pro světla a nekritické spotřebiče; elektronika, lednice i měnič při nízkém napětí vypínají a hlásí chyby. | navrh |
| [K-VODIC-0017](K-VODIC-0017.md) | B | U 12 V tečou za stejný výkon velké proudy: 120 W je 10 A, 1 200 W už 100 A (proud = příkon ÷ napětí). | navrh |
| [K-VODIC-0018](K-VODIC-0018.md) | B | AWG velikosti nesedí přesně na mm² a čím menší číslo AWG, tím silnější kabel; např. 12 AWG má 3,3 mm², tedy méně než 4 mm². | navrh |
| [K-VODIC-0019](K-VODIC-0019.md) | B | Měnič má účinnost asi 90 %, takže na 1 000 W výstupu bere z baterie spíš 1 100 W; do kalkulačky je lepší zadat vyšší příkon. | navrh |
| [K-VODIC-0020](K-VODIC-0020.md) | C | Pro proudy nad asi 150 A (velké měniče) je vhodné zvážit přechod na 24 V: proud se sníží na polovinu a kabely mohou být tenčí; na 12 V jsou kabely velmi drahé a těžké. | navrh |
| [K-VODIC-0021](K-VODIC-0021.md) | A | Koncovky se krimpují správnými kleštěmi a přetahují smršťovací bužírkou; zkroucené dráty s izolepou mají velký přechodový odpor, hřejí se a časem odhoří. | navrh |
| [K-VODIC-0022](K-VODIC-0022.md) | A | Do auta se používá automobilový kabel – ohebné lanko z mnoha tenkých drátků (v obchodech často značené FLRY); tvrdý drát z domovní instalace od vibrací praská. | navrh |
| [K-VODIC-0023](K-VODIC-0023.md) | C | Mínus přes kostru je v autě běžný, ale každý spoj na kostře přidává odpor; bod musí být očištěný na holý kov a u lednice, měniče a nabíječky je lepší vlastní mínusový kabel. Kalkulačka počítá s mínusem přes kostru bez odporu spojů. | navrh |
| [K-VODIC-0024](K-VODIC-0024.md) | A | Kabel se vede chráněný, mimo ostré hrany a pohyblivé díly, a průchodky plechem vždy přes gumovou průchodku. | navrh |
| [K-VODIC-0025](K-VODIC-0025.md) | C | Délka je skutečná trasa kabelu od baterie (nebo pojistkové skříňky) ke spotřebiči, ne vzdušná čára; kalkulačka sama počítá s tím, že proud teče tam i zpět; k délce je dobré přičíst 10–20 % na ohyby a rezervu. | navrh |
| [K-VODIC-0026](K-VODIC-0026.md) | C | Výsledek kalkulačky je nejmenší bezpečný průřez; silnější kabel nevadí, slabší ano. | navrh |
| [K-VODIC-0027](K-VODIC-0027.md) | C | Kalkulačka je orientační pomůcka; u lodí, karavanů s certifikací a pevných instalací platí příslušné normy. | navrh |
| [K-VODIC-0028](K-VODIC-0028.md) | B | Úbytek napětí v kabelu je ΔU = ρ × L × k × I ÷ A (k = 2 pro vlastní mínus, 1 přes kostru) a ztráta (teplo v kabelu) je P = ΔU × I; na dlouhém nebo tenkém kabelu se ztrácí napětí a kabel se hřeje. | navrh |

## Nálezy, kde zdroj nesouhlasí s referencí

Výpočet kalkulačky jsem neměnil a nenavrhuji jeho změnu. Jsou to nálezy k rozhodnutí.

| Karta | Nález |
| --- | --- |
| K-VODIC-0001 | Reálné lanko FLRY-B má podle datasheetu při 20 °C odpor o 4–9 % vyšší, než odpovídá ρ = 0,0175 (Victron počítá s ≈ 0,0189). Úbytek může být o tolik vyšší, než kalkulačka ukáže. |
| K-VODIC-0002 | 0,0216 odpovídá mědi při ~80 °C; patička teplotu neuvádí a zdroj čísla jsem nenašel. |
| K-VODIC-0004 | Faktor 0,7 odpovídá buď svazku 3 obvodů, nebo okolí 50 °C, ne oběma současně (pak ~0,50). V praxi rozhoduje CAPH (0,53–0,68 VDE), takže rezerva je větší, ale u 1 mm² těsná. |
| K-VODIC-0005 | ISO 6722-1 třída B má podle náhledu normy 100 °C, výrobci FLRY uvádějí 105 °C; existují i automobilové kabely třídy A (85 °C). |
| K-VODIC-0006 | „O asi 60 % horší vodivost“ je správně jen ve smyslu „o 60 % vyšší odpor“. Vodivost CCA je nižší o 35–37 %, ne o 60 %. |
| K-VODIC-0007 | „Průřez o stupeň větší“ pro CCA stačí jen u menších průřezů; od 25 mm² chybí 12–26 % průřezu, zatížitelnost CCA nedoložena. |
| K-VODIC-0010 | Littelfuse MEGA 300 A a výš je jen ochrana proti zkratu; kalkulačka 300 A nabízí jako běžnou pojistku. Hodnoty 50 a 70 A jsem v otevřených datasheetech nedoložil. |
| K-VODIC-0011 | Pravidlo 1,1× je na hraně tabulek výrobce při 20 °C; v teple (65 °C) Littelfuse dovoluje jen ~75 % jmenovitého proudu, tj. potřeba ~1,33×. Patička říká „nad“, kód „alespoň“. |
| K-VODIC-0013 | „Do 20 cm“ nemá oporu v otevřených zdrojích; ABYC E-11 říká 175 mm (7 palců). |
| K-VODIC-0016 | 5 % pro „běžné“ spotřebiče nemá zdroj (ABYC zná jen 3 a 10 %); Victron doporučuje přísnějších 2,5 %. |
| K-VODIC-0019 | Votronic dimenzuje měnič hrubším pravidlem „výkon ÷ 10 = proud z 12 V“ (1 000 W → 100 A ≈ 1 200 W), konzervativnější než 1 100 W v hlášce. |

## Co se nepodařilo doložit

- Texty norem jsem neotevřel (placené): DIN VDE 0298-4 (tab. 11, 17, 21), ISO 6722-1, ISO 8820-3/-5, ASTM B566, ASTM B258, IEC 60028, IEC 60228, IEC 60364-4-43, IEC 60352-2, EN 1648-1/-2, ISO 10133 / ISO 13297. V kartách jsou jen jako odkaz s poznámkou „neotevřeno“. Tabulky VDE jsem ověřil přes výtah Lapp T12 (dvě verze od jednoho výrobce, ne nezávislé).
- Druhý nezávislý primární zdroj chybí u třídy A: K-VODIC-0003 a -0004 (mimo Lapp jen samotná norma), K-VODIC-0007 (zatížitelnost CCA), K-VODIC-0024 (průchodka plechem).
- Původ čísla 0,0216 (K-VODIC-0002) a stropů CAPN/CAPH (K-VODIC-0009) – jen jako rozhodnutí odborníka.
- Číslo článku IEC 60364-4-43 433.2 v K-VODIC-0014 je z paměti, ověřovatel ať ho potvrdí nebo vyškrtne.
- ABYC E-11 jsem četl ve veřejné kopii vydání 2003; aktuální revizi (2025) ne.
- Blue Sea Systems (články o jištění) a stránky Littelfuse blokují automatické stažení; použil jsem kopie datasheetů Littelfuse u distributorů (chipdip.ru, eicom.ru).

## Otázky pro Radka

1. **ρ = 0,0216 (K-VODIC-0002):** odkud číslo pochází? Mám zapsat „rozhodnutí odborníka, odpovídá mědi při ~80 °C“?
2. **Text o CCA (K-VODIC-0006):** souhlasíš s přeformulováním na „má zhruba o 60 % vyšší odpor (vede asi o třetinu hůř)“?
3. **CCA o stupeň větší (K-VODIC-0007):** ponechat radu, upřesnit („u silných kabelů o dva stupně“), nebo radit CCA pro silové obvody nepoužívat?
4. **Pojistka do 20 cm (K-VODIC-0013):** ponechat 20 cm (a s jakým zdrojem), nebo psát „co nejblíž, do 17 cm“ podle ABYC?
5. **Pojistka 1,1× (K-VODIC-0011):** stačí v textu doplnit „v teple a u motorů víc“? A sjednotit „nad“ vs. „alespoň“?
6. **Pojistka 300 A (K-VODIC-0010):** má kalkulačka u 300 A upozornit na typ pojistky (MEGA 300 A je podle Littelfuse jen zkratová ochrana)? Jde o změnu hlášek, tedy o změnu logiky – jen na tvé rozhodnutí.
7. **Režim „svazek / motorový prostor“ (K-VODIC-0004):** stačí v textu upozornit, že kombinace svazku a horka je horší než 0,7, nebo to necháš na CAPH?
8. **Odpor reálného lanka (K-VODIC-0001):** stačí poznámka v textu, že skutečný úbytek může být o několik procent vyšší?
9. **5 % úbytek (K-VODIC-0016):** potvrdíš 5 % jako svoje rozhodnutí (zdroj typu „rozhodnutí odborníka“)?
10. **CAPN/CAPH (K-VODIC-0009):** potvrdíš hodnoty včetně 1 mm² = 15 A (stejně jako 1,5 mm²) a CAPH 10 A pro 0,75 i 1 mm²?
