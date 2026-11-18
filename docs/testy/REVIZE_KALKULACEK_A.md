# Revize kalkulaček A: spotřebiče, baterie, soběstačnost, solár

Datum: 18. 11. 2026. Revize pohledem elektrikáře i laika na lokální alfě (http://127.0.0.1:4321/cs/), stránky procházené Playwrightem se zadáním v `?s=`, k tomu kód v `apps/web/src/components/kalk/*.tsx` a `packages/engine/src/alfa.ts`. Kód se neměnil.

Závažnost: **blok** = vede k chybnému nákupu nebo nebezpečnému zapojení, **vážné** = laik dostane matoucí nebo nekonzistentní výsledek, **drobné** = text, výchozí hodnota, kosmetika.

Vyzkoušená zadání: výchozí stav, všechny typické příklady, malá víkendovka (lednice + světla, 12 V, 100 Ah), celoroční s indukcí (indukce 2 000 W, bojler, absorpční lednice, 24 V), zima Praha prosinec 400 Wp / 300 Ah / 2 500 Wh / 24 V, léto Praha 400 Wp / 100 Ah, Mnichov leden s přípojkou, pole 2 × 3 panely na regulátoru 100/30.

---

## 1. Spotřebiče a vaření (`/cs/kalkulacka-spotrebicu/`)

### Blok

**S1. Vaření se nepočítá do denní spotřeby, takže baterie vyjde malá.**
Postup: příklad „Víkend v létě“ → nahoře 411 Wh/den, dole v sekci „Kolik toho uvaříte“ indukce 1 000 W × 15 min. Do kalkulačky baterie odejde jen 411 Wh. Vaření (asi 280 Wh z baterie na jídlo) v denní bilanci chybí. Indukci lze navíc zadat i jako řádek z katalogu, takže existují dvě místa pro tutéž věc a jen jedno se počítá dál. Stejný typ chyby, na jaký si Radek stěžoval u průřezu.
Návrh: sekce vaření má mít vstup „jídel za den“ a její Wh se přičtou do „Spotřeby za den“ (nebo se z ní stane řádek seznamu), aby se indukce zadávala jen na jednom místě.

### Vážné

**S2. Hláška „měnič nepotřebujete“ odporuje vaření pod ní.**
Postup: výchozí řádky bez 230 V (např. „Víkend v létě“) → zelená hláška „Nic neběží na 230 V, takže měnič nepotřebujete.“ Hned pod ní sekce vaření počítá indukci přes měnič (dělí 0,9) a ukazuje varování o 150 A přes měnič.
Návrh: hlášku `BEZ_MENICE` vynechat, když je vyplněné vaření, nebo vaření zahrnout do seznamu spotřebičů (viz S1).

**S3. „Litrů vody k varu“ ignoruje změněné předpoklady (chyba enginu).**
Postup: Předpoklady → účinnost indukce 50 % → „Ohřát zadanou vodu“ ukáže 220 Wh/l, ale „Litrů vody k varu“ zůstane 9 l (počítá s 85 %; správně asi 5 l). `kolikUvarim` volá `ohrevVody({ litry: 1 })` s výchozími účinnostmi.
Návrh: předávat do `ohrevVody` uvnitř `kolikUvarim` zadané `ucinnostVareni` a `ucinnostMenice`.

**S4. „Na plnou baterii X jídel“ nepočítá s tím, že baterie zároveň napájí lednici a ostatní.**
Postup: 100 Ah, 2 000 W × 30 min → „1 jídlo“, „běžel by 0,5 hodiny“, přitom nahoře je 440 Wh denní spotřeby ze stejné baterie. Kapacita je navíc samostatný vstup (výchozí 200 Ah), nepřebírá se z kroku Baterie ani nenavazuje na spotřebu nahoře.
Návrh: počítat „kolik jídel denně zbude po ostatní spotřebě“ a kapacitu převzít z cesty.

**S5. Varování na proud je až nad 150 A, běžný BMS má 100 A.**
Postup: příklad „Práce na cestě“ (kávovar 1 260 W) → „Proud, když běží všechno“ asi 120 A, žádné varování. Vlastní lekce `vareni-na-indukci` přitom říká, že běžná 100Ah baterie má trvalý proud 100 A.
Návrh: zeptat se na trvalý proud BMS (výchozí 100 A) a varovat při jeho překročení, 150 A nechat jen jako hranici pro 24 V.

**S6. „Spotřebiče na 230 V: tolik musí měnič zvládnout“ sčítá všechno a odporuje kalkulačce měniče.**
Postup: indukce 2 000 W + bojler 660 W + absorpční lednice 190 W → 2 850 W „musí měnič zvládnout“. Kalkulačka měniče se ptá, co běží současně, a počítá rozběh. Seznam 230V spotřebičů se do měniče nepřenese (měnič z cesty bere jen napětí).
Návrh: text změnit na „když by běželo všechno najednou“ a přidat odkaz do kalkulačky měniče s předvyplněnými 230V spotřebiči.

**S7. Nesmyslné spotřebiče na baterii bez hlášky.**
Postup: z katalogu „Absorpční lednice, provoz na 230 V“ 190 W × 19 h → 4 011 Wh/den z baterie, bez varování. Stejně tiše projde přímotop 900 W, střešní klimatizace 950 W, bojler 230 V nebo absorpční lednice na 12 V.
Návrh: u skupin absorpční chlazení, topení a ohřev vody na 230 V zobrazit hlášku „z baterie se to nevyplatí, jen na přípojce nebo plynu“.

### Drobné

- **S8.** Blok „Předpoklady výpočtu“ (účinnost měniče) je až ve vaření, ale mění i denní spotřebu nahoře; texty `sp.predpoklad` a `va.predpoklad` mají natvrdo „90 %“ a „85 %“, i když je uživatel změní. Návrh: předpoklady přesunout pod nadpis stránky a čísla do textu doplňovat ze stavu.
- **S9.** Výchozí účinnost indukce 85 %, ale lekce `vareni-na-indukci` uvádí naměřených 75–78 %. Návrh: výchozí hodnotu snížit na 80 %, nebo to v předpokladu výslovně zmínit.
- **S10.** Lednice: výchozí 45 W × 8 h, příklady 6 h, katalog 12 h. Notebook: výchozí 60 W, katalog 30 W. Výchozí součet je 640 Wh, kalkulačky baterie a soběstačnosti ale začínají na 800 Wh. Návrh: sjednotit výchozí hodnoty podle katalogu.
- **S11.** Položka z katalogu bez hodin (indukce, kávovar, notebook…) vyprázdní celý výsledek, dokud se hodiny nedoplní. Návrh: počítat s 0 h a u řádku ukázat typickou hodnotu (např. „indukce asi 0,5 h“).
- **S12.** „Vařič by běžel asi {h} hodiny“: tvar je pevný („6 hodiny“). Návrh: tvar podle čísla.

---

## 2. Velikost baterie (`/cs/kalkulacka-baterie/`)

### Vážné

**B1. „Převzato z předchozího kroku“ se ukáže, i když uživatel nic nespočítal.**
Postup: nová relace → otevřít `/cs/kalkulacka-sobestacnosti/` (nic neměnit) → `/cs/kalkulacka-baterie/`. Ukáže se zelené „Převzato“ s 800 Wh a 200 Ah, což jsou jen výchozí hodnoty soběstačnosti. Soběstačnost i baterie ukládají do cesty své výchozí hodnoty hned při otevření (`useUlozDoCesty` bez kontroly, že jde o zadání uživatele).
Návrh: do cesty ukládat jen hodnoty, které uživatel změnil nebo převzal, a ne výchozí stav.

**B2. „Kapacita mé baterie“ se předvyplní doporučenou kapacitou, ne tou, kterou mám.**
Postup: baterie spočítá „Potřebujete 210 Ah“ a do cesty uloží `ah = 210`. Při dalším otevření (bez `?s=`) se 210 vloží do pole „Kapacita mé baterie“ a porovnání ukáže „Máte 210 Ah“. Jeden klíč `ah` tak nese dvě různé veličiny (doporučená a skutečná).
Návrh: v cestě rozlišit `ahPotreba` a `ahMam`, do „mé baterie“ brát jen `ahMam`.

**B3. Baterie se navrhuje jen podle Wh, proud se nekontroluje.**
Postup: spotřebiče s indukcí 2 000 W na 12 V (174 A) → Wh do baterie → doporučení třeba 210 Ah bez slova o tom, že baterie musí dát 174 A trvale. Lekce o indukci přitom upozorňuje, že 100 A BMS to nevydrží.
Návrh: převzít z cesty „Proud, když běží všechno“ a vypsat „BMS musí dát trvale aspoň X A“.

**B4. Výsledek „210 Ah“ nevede k nákupu.**
Postup: výchozí zadání → 210 Ah (při 24 V např. 110 Ah). Takové baterie se neprodávají a laik neví, jestli koupit 200, 230, 280 Ah nebo dvě baterie paralelně.
Návrh: k výsledku přidat nejbližší běžné velikosti (100 / 150 / 200 / 230 / 280 / 300 Ah) a energii ve Wh, aby šlo porovnat 12V a 24V nabídky.

**B5. Stejná baterie vydrží podle dvou kalkulaček různě dlouho.**
Postup: baterie 200 Ah, 800 Wh/den → „Vydrží 2,9 dne“. Soběstačnost se stejnými hodnotami a 0 Wp → „Bez přípojky vydržíte 2 dny“ (počítá jen celé dny do prvního vybití).
Návrh: v soběstačnosti ukázat i desetinné dny (nebo „2 dny a část třetího“), aby čísla seděla.

### Drobné

- **B6.** „Kolik dní bez nabíjení: 3 dní“: jednotka má pevný tvar. Návrh: použít `dnu()` jako ve výsledku.
- **B7.** „Využitelná kapacita“ je tu hlavní vstup, ve spotřebičích a soběstačnosti je schovaná v „Předpokladech“. Návrh: všude stejně v Předpokladech.
- **B8.** Chybí poznámka k zimě: LiFePO4 pod 0 °C nejde nabíjet a v mrazu má méně kapacity, což u „dní bez nabíjení“ hraje roli. Návrh: krátká poznámka s odkazem na lekci `nabijeni-lifepo4-v-zime`.
- **B9.** Laik neví, kolik „dní bez nabíjení“ zvolit. Návrh: pod posuvník krátká vodítka (víkend se solárem 1–2, zima bez soláru 3–5).

---

## 3. Soběstačnost (`/cs/kalkulacka-sobestacnosti/`)

### Vážné

**N1. Chybí hlavní výstup: kolik Wp (a Ah) koupit, a to pro léto i zimu.**
Postup: výchozí stav (Praha, červenec, 200 Wp, 800 Wh) → „26 dní“ a 12 měsíců „solár nestačí“, ale nikde není, kolik Wp by stačilo. „Co pomůže“ zkouší jen +100 Wp a +100 Ah. Výchozí měsíc je červenec, takže první dojem je letní.
Návrh: přidat výstup „Na tento měsíc potřebujete aspoň X Wp“ (z `WhDenne / (kWhNaKWpDen × ztráty)`) a řádek „celoročně / duben–září“ podle nejhoršího měsíce sezóny.

**N2. S přípojkou výsledek tvrdí „bez přípojky“ a nádrž ukazuje zbytek, i když byla baterie prázdná.**
Postup: příklad „Zima na horách“ (Mnichov, leden, kemp každých 7 dní) → „Bez přípojky vydržíte 3 dny“ a nádrž „Baterie po 30 dnech 41 %“. Ve skutečnosti je baterie každý týden 4 dny prázdná (je to vidět jen v grafu). Když se baterie mezi přípojkami nevybije, nadpis zní „Bez přípojky vydržíte: celý měsíc“, přestože se přípojka používá.
Návrh: s přípojkou ukázat „Prázdná baterie: X dní z 30“ a nádrž nahradit nejnižším stavem.

**N3. Příklad „Zima na horách“ nevyvolá zimní varování a chybí upozornění na nabíjení v mrazu.**
Postup: Mnichov leden má 1,0 kWh/kWp, hláška `ZIMA_MALO_SLUNCE` se dává až pod 1, takže v zimním příkladu se neukáže. Kalkulačka také počítá s nabíjením ze soláru a boosteru v lednu, přitom LiFePO4 pod 0 °C nejde nabíjet bez vyhřívání.
Návrh: hranici dát na ≤ 1,5 a pro listopad až únor přidat hlášku o nabíjení LiFePO4 pod 0 °C s odkazem na lekci.

**N4. „Co pomůže nejvíc“ říká „nepomůže“ i tam, kde to pomůže, a stejně tak tam, kde už není co řešit.**
Postup: Mnichov leden → „Spotřeba o 10 % menší: v tomto měsíci nepomůže“, přitom schodek klesne o 93 Wh/den (počítají se jen celé dny do prvního vybití). Praha červenec 400 Wp → u všech variant „nepomůže“, protože se baterie stejně nevybije.
Návrh: ukazovat i změnu bilance ve Wh/den, a když baterie vydrží, napsat „už vydržíte, není potřeba“.

**N5. Při otevření stránka zapíše do cesty své výchozí hodnoty** (viz B1). Wp v cestě pochází jen ze soběstačnosti samotné. Kalkulačka solárů výkon pole (`WpPole`) neukládá, ačkoli `HodnotyCesty.wp` je popsaný jako „z kroku 3“.
Návrh: solár ukládá `WpPole` do cesty a soběstačnost nic neukládá, dokud uživatel nic nezmění.

**N6. Průměrný den skrývá zatažené dny, „celý měsíc“ slibuje víc, než platí.**
Postup: Praha červenec 400 Wp, 100 Ah, 410 Wh → „celý měsíc“, „V pořádku“. Simulace opakuje 30× průměrný den, takže řada 3–4 zatažených dnů se neprojeví nikdy.
Návrh: přidat řádek „Při 3 zatažených dnech za sebou (výroba 20 %) baterie klesne na X %“.

### Drobné

- **N7.** U měsíců je štítek „solár stačí / nestačí“, ale bilance obsahuje i jízdu. Návrh: „stačí / nestačí“ bez slova solár.
- **N8.** Booster se počítá pevně 70 % proudu bez ohledu na nabití, kalkulačka boosteru nad 90 % počítá jen 20 % a koeficient tu není v Předpokladech vidět. Návrh: ukázat koeficient v Předpokladech a zmínit rozdíl.
- **N9.** Při „vydrží celý měsíc“ se zároveň zobrazí zelený stav a žlutá hláška „chybí za den X Wh“, když je bilance záporná, ale baterie velká. Návrh: hlášku přeformulovat na „baterie se pomalu vybíjí, vydrží asi Y dní“.
- **N10.** Text `sb.predpoklad` má natvrdo „Využijete 90 % kapacity“, i když je pole změněné. Návrh: doplňovat ze stavu.
- **N11.** Soběstačnost bere zadané Wp celé, i když by regulátor z kalkulačky solárů výkon omezil (viz P2). Návrh: až bude solár v cestě, omezit Wp nabíjecím proudem regulátoru.

---

## 4. Zapojení solárních panelů (`/cs/kalkulacka-solaru/`)

### Vážné

**P1. Chybí napětí baterie (12/24 V), takže kalkulačka pustí zapojení, které nenabíjí.**
Postup: 1 panel 150 Wp (Vmp 18,2 V), série 1 → „Zapojení vychází pro zadaný regulátor.“ Na 24V baterii (25,6 až 28,8 V) MPPT s takovým panelem nenabije vůbec. Na 12 V je to na hraně: horký panel má Vmp asi 15–16 V a MPPT potřebuje zhruba napětí baterie + 5 V, aby se rozběhl.
Návrh: přidat volbu 12/24 V a hlášku, když je Vmp pole za tepla nižší než napětí baterie + 5 V.

**P2. Nekontroluje se nabíjecí proud regulátoru, takže předimenzované pole projde.**
Postup: 2 × 3 panely po 150 Wp = 900 Wp na regulátoru 100/30 → jediné „Pozor“ je o pojistkách větví. 900 Wp / 12,8 V je asi 70 A, regulátor ale dá 30 A. Více než polovina panelů je zbytečná a laik se to nedozví.
Návrh: přidat vstup „nabíjecí proud regulátoru“ (to druhé číslo v 100/30) a hlášku, když je WpPole / U baterie víc než tento proud.

**P3. Pole „Max. proud panelů do regulátoru“ svádí k zadání nabíjecího proudu.**
Postup: nápověda u napětí říká „u regulátoru 100/30 je to 100 V“ a výchozí proud je 30 A. Laik proto zadá 30 z označení 100/30. To je ale nabíjecí proud, ne maximální Isc panelů (u Victronu 100/30 je to 35 A).
Návrh: přejmenovat na „Max. zkratový proud panelů (Isc) podle štítku regulátoru“ a v nápovědě výslovně napsat, že to není druhé číslo z 100/30.

**P4. Stránka neodpoví, co koupit, a nenavazuje na cestu.**
Postup: stránka je v kroku „Nabíjení“, ale nic nepřebírá ani neukládá (žádné `useUlozDoCesty`), nemá odkaz do soběstačnosti a neříká, jaký regulátor zvolit (napětí a proud) ani kolik Wp je potřeba.
Návrh: k výsledku přidat „Doporučený regulátor: aspoň X V / Y A“ a odkaz do soběstačnosti s předvyplněným WpPole.

### Drobné

- **P5.** Hláška `POJISTKA_VETVE` neříká, jakou pojistku. Návrh: vypsat doporučenou hodnotu (typicky 1,25–1,56 × Isc, nejvýš podle „max series fuse“ ze štítku panelu).
- **P6.** Koeficient Voc se v datasheetech často uvádí v mV/K. Zadání −60 skončí obecnou chybou rozsahu. Návrh: nápověda s převodem (−60 mV/K ÷ 22,3 V ≈ −0,27 %/K), případně přepínač jednotky.
- **P7.** Nápověda ke koeficientu uvádí „např. −0,29“, výchozí hodnota je −0,35. Návrh: sjednotit.
- **P8.** Hodnoty napětí a proudu jsou ve výsledku dvakrát (karty i pruhy „Rezerva regulátoru“ se stejnými popisky). Návrh: v pruzích ukázat rezervu v % místo opakování čísel.
- **P9.** Chybí kontrola za tepla (Vmp při 60–70 °C), která je pro 12V sady s 36článkovými panely podstatnější než mráz. Návrh: přidat „Vmp v létě“ jako druhou kontrolu k P1.

---

## Napříč kalkulačkami

- **X1 (vážné).** Cesta ukládá výchozí hodnoty a jeden klíč používá pro různé veličiny (`ah` = potřebná i vlastněná, `wh` = spočítaná i výchozí). Viz B1, B2, N5.
- **X2 (vážné).** Stejná veličina se počítá jinak: dny výdrže (B5), booster (N8), proudová hranice 150 A proti BMS 100 A (S5), výkon měniče jako součet proti souběhu (S6).
- **X3 (drobné).** Texty předpokladů mají natvrdo čísla, která jdou změnit (S8, N10), a různé výchozí hodnoty pro tutéž věc (S10).
