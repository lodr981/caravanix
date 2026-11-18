# Čtenář laik: přestavba dodávky na obytnou, spotřeba, zapojení a otázky

- **Persona:** majitel dodávky, kterou přestavuje na obytnou (blízko personě Jana). Elektřině rozumí málo. Chce vědět, co koupit, jak to zapojit a jak dlouho vydrží bez kempu. Notebook (okno 1280 × 900).
- **Úkoly:** 1) denní spotřeba v létě a v zimě a její přenos do kalkulačky baterie a soběstačnosti a zpět; 2) v průvodci zapojení sestavit vlastní instalaci (200 Ah, 300 Wp, booster 30 A, měnič 1 000 W, nabíječka z kempu, topení), projít obrázkové i blokové schéma, tabulku kabelů a nákupní seznam; 3) v Častých otázkách najít „proč mi vypadává chránič“, „můžu dát dvě baterie vedle sebe“, „v jakém pořadí zapojovat“ a dojít do lekce.
- **Cesta:** /cs/kalkulacka-spotrebicu/ (vzor „Zima na horách“, sezónní hodiny u topení a nádrže) → „Použít v kalkulačce baterie“ → zpět „Spočítat podrobně“ → „Použít v kalkulačce soběstačnosti“ → /cs/zapojeni/ → /cs/otazky/ (hledání) → 3 lekce.
- **Datum:** 18. 11. 2026, web http://127.0.0.1:4321/cs/ (vývojový server)

## Výsledek

```
S POTÍŽEMI  (asi 30 kroků)
- zasekl jsem se: spotřebiče – vzor „Zima na horách“ ukáže „Spotřeba za den – léto 928 Wh“ a všechny tři sezóny stejně
- zasekl jsem se: soběstačnost – převezme zimních 928 Wh, ale počítá s Prahou v červenci („vydržíte 10 dní“)
- zasekl jsem se: zapojení – „Dvě paralelně“ nepřidá pojistku ke každé baterii, kterou chce lekce
- zasekl jsem se: otázky – „pořadí zapojení“, „v jakém pořadí zapojovat“, „vyhazuje jistič v kempu“: „Nic nenalezeno“
- nerozuměl jsem: FV, FI/LS, W1–W14, Ω, „nulový a ochranný vodič“, „přednostním zapojením sítě“, „křížem“ (bez obrázku)
- nevěřil jsem: pojistce 7,5 A (tabulka a seznam), když schéma u zásuvky ukazuje 8 A
```

Spotřebu, baterii, schéma i nákupní seznam jsem nakonec dostal. Přenos spotřeby tam i zpět funguje: po návratu ze soběstačnosti jsem měl svůj seznam spotřebičů zpátky. Léto a zimu ale musím přenášet zvlášť a s měsícem v soběstačnosti si je musím spárovat sám. Kde přesně má být která pojistka, z obrázkového schématu nepoznám. Pomohlo až blokové schéma.

## Nálezy podle závažnosti

1. **Zimní spotřeba se v soběstačnosti počítá s letním sluncem.** Spotřebu jsem přepnul na „zima“ (928 Wh) a klepl na „Použít v kalkulačce soběstačnosti“. Tam zůstalo „Praha, červenec“ a velký výsledek „Bez přípojky vydržíte 10 dní“. Tabulka „Bilance po měsících“ pak bere zimních 928 Wh i v červnu a zimní měsíce zase bez topení. Nikde mi stránka neřekla, že mám přepnout měsíc. Kdybych nebyl pozorný, uvěřím 10 dnům v zimě.
2. **Vzor „Zima na horách“ ukazuje léto.** Po klepnutí na vzor je nahoře „Spotřeba za den – léto 928 Wh“ a pod tím „léto 928 Wh / jaro a podzim 928 Wh / zima 928 Wh“. Topení a vyhřívání nádrže tedy běží i v létě. Letní a zimní číslo jsem dostal až poté, co jsem u topení a nádrže sám našel a zaškrtl „Hodiny se liší podle sezóny“ (pak léto 384 Wh, zima 928 Wh). Do baterie se přenese vždy jen zvolená sezóna, takže léto a zimu musím přenést dvakrát.
3. **Dvě baterie: průvodce a lekce si odporují.** Lekce „Dvě baterie vedle sebe“ i odpověď v otázkách: „u lithia dejte pojistku ke každé baterii“. V průvodci jsem zvolil „Dvě paralelně“: schéma dál kreslí jednu baterii s jednou pojistkou 70 A a v seznamu pojistek žádná pojistka navíc není. V seznamu je „Baterie LiFePO4 100 Ah, 12 V“ a pod tím „Dvě stejné baterie“. Mám koupit dvě po 100 Ah, nebo dvě po 50 Ah?
4. **Kde sedí pojistka, z obrázkového schématu nepoznám.** Štítek „6 mm² / 40 A“ je uprostřed kabelu, ne u jednoho konce (kromě 150 A u baterie). Tabulka „Odkud → kam“ má sloupec Pojistka, ale ne „u kterého konce“. Pravidlo je až pod seznamem a je abstraktní: „Každá pojistka patří k tomu konci kabelu, odkud může téct proud do zkratu“. Teprve v blokovém schématu jsem viděl, že pojistky jsou u přípojnice a booster má dvě 50 A.
5. **Hodnota pojistky se liší: 7,5 A, nebo 8 A?** Pro „Zásuvka 12 V a USB“ píše tabulka i nákupní seznam „7,5 A“, obrázkové i blokové schéma „8 A“. Nevím, kterou koupit.
6. **Hledání v otázkách nenajde běžná laická slova.** „pořadí zapojení“ i „v jakém pořadí zapojovat“ vrátí „Nic nenalezeno. Zkuste jiné slovo.“, i když otázka „V jakém pořadí komponenty zapojit…“ existuje. Našlo ji až „co zapojit první“. „vyhazuje jistič v kempu“ a „proud v kempu vypadne“ také nic. „vypadává chránič“ vrátí 8 otázek, ta moje je až třetí, první je o nabíječce.
7. **Otázky a lekce o pořadí zapojení si odporují.** Odpověď v otázkách: „Hlavní pojistku vložte až nakonec, když je vše zkontrolované.“ Lekce v „Pořadí připojení“ má jako bod 1 „Baterie. Vložíte hlavní pojistku…“, teprve potom regulátor, booster a spotřebiče. Co je tedy poslední?
8. **Varování o BMS z čísla, které jsem nezadal.** Pole „Trvalý vybíjecí proud baterie (BMS)“ jsem nechal prázdné. Po přidání měniče se objeví „Pozor. Měnič a spotřebiče dohromady berou víc, než baterie podle zadání dá (100 A).“ Já žádných 100 A nezadal. Nevím, jestli mám problém, nebo ne. Podobně v kalkulačce baterie „Porovnání s vaší baterií: Máte 200 Ah“, když baterii ještě nemám.
9. **Nákupní seznam neříká, jaké pojistky a držáky koupit.** „2 A: 1 ks … 125 A: 1 ks, Držáky pojistek: 12 ks“. Které patří do pojistkové skříňky (ta má držáky v sobě?) a které do samostatného držáku? Jaký typ (nožová, MIDI, MEGA, ANL)? V otázkách existuje „Class T, MEGA, MIDI, ANL – kterou pojistku dát k lithiu?“, ale ze seznamu na ni odkaz nevede, jen u hlavní pojistky.
10. **Blokové schéma je pro mě šifra.** „FV“, „FI/LS“, „W1 · podle návodu“, „W5 · 230 V · elektrikář“, značky „=“ a „~“ v obdélníku. Legenda vysvětlí pojistku a baterii, ne FV, FI/LS ani co je W. V obrázkovém schématu je u baterie „Ω“ a u přípojky „FI“, legendu „Ω bočník monitoru baterie“ jsem našel až pod schématem. Na monitoru 1280 px je schéma oříznuté vpravo, spotřebiče vidím až po posunu.
11. **Odpověď o chrániči mi nepomohla, lekce ano.** Krátká odpověď: „U měniče s přednostním zapojením sítě záleží na tom, jak je v obou režimech zapojený nulový a ochranný vodič… příčinu nechte najít elektrotechnika.“ Nerozumím ani jedné z těch odborných frází. Postup „vypněte spotřebiče, zapínejte po jednom, zkuste jiný sloupek“, který opravdu můžu udělat sám, je až v lekci „Proč mi v kempu vypadává chránič?“. Odkaz se jmenuje jinak než lekce o zásuvkách („Lekce: …“ vs. bez „Lekce:“).
12. **Stránka otázek se tváří jako kalkulačka a krok.** Nahoře „Kalkulačka je ve zkušebním provozu“ a dole „6 Další krok: Kabely a pojistky“, i když tu nic nepočítám a v krokovníku tato stránka není. Počet „70 otázek“ jsem nepočítal, ale ze seznamu mi vyšlo 69.

## Co pomohlo

- **Přenos tam a zpět funguje.** „Použít v kalkulačce baterie / soběstačnosti“ přenese Wh s rámečkem „Převzato … Můžete ji tu klidně změnit.“ Odkaz „Spočítat podrobně v kalkulačce spotřebičů“ mi vrátil můj seznam a nabídl „Zpět do kalkulačky soběstačnosti bez změny“.
- **Řádek léto / jaro a podzim / zima** a „Největší žrouti, od největšího“: hned vidím, že v zimě mě nejvíc stojí vyhřívání nádrže.
- **Průvodce zapojení:** přepínač Den / Noc / Jízda / Kemp s tečkami, kudy teče proud. Věta „Měnič se připojuje přímo k baterii vlastním kabelem a pojistkou, ne přes pojistkovou skříňku.“ Hlavní pojistka Class T 150 A je teď v nákupním seznamu. Řádky „Přívodka 230 V, proudový chránič a jistič – zapojí elektrikář“.
- **Blokové schéma s pojistkami u přípojnice** a „Popis kabelu: označení · průřez · délka“: tady jsem konečně viděl, kde pojistka je.
- **Lekce „Dvě baterie vedle sebe“ a „Co zapojit první a co naposled?“:** srozumitelné, s typickými chybami a kontrolním seznamem. Vysvětlení „Křížem (diagonálně): plusový kabel … na plus jedné baterie, mínusový kabel na mínus druhé“. Lekce o chrániči rozlišuje, co smím sám a co patří elektrotechnikovi.
- **Slovníček pod průvodcem zapojení** (LiFePO4, BMS, Wp, MPPT, booster, mm², Class T).
