# Revize kalkulaček B: logika, vstupy, návaznosti (18. 11. 2026)

Revize z pohledu elektrikáře i laika. Kód se neměnil. Ověřeno na běžícím webu (http://127.0.0.1:4321, Playwright) a čtením `apps/web/src/components/**`, `packages/engine/src/{alfa,vodic,vyrobci,zapojeni,schema}.ts`, `content/cs/*.json`.
Stav v URL je `?s=<JSON>` (kalkulačky alfy, průvodce), u průřezu parametry `u,r,v,l,d,z,p,y`.

Závažnost: **blok** = vede k chybnému nákupu nebo nebezpečné instalaci, případně stránka v běžném postupu nefunguje; **vážné** = výsledek si odporuje nebo nevede k rozhodnutí; **drobné** = text, kosmetika, okrajový případ.

Radkův příklad (60 W a k tomu měnič 2000 W, kalkulačka počítá obojí) řeší hlavní vlákno. Stejný vzor, kdy jedna veličina vstupuje dvakrát nebo dva vstupy říkají totéž různě, se objevuje i jinde: viz P2, P5, M3, Z1, Z4 a Z8.

---

## 1. Kalkulačka průřezu (`/cs/kalkulacka-prurezu/`)

### Blok

**P1. Měnič nebo booster na 12 V jde vybrat i u soustavy 24 V a kalkulačka bez varování počítá.**
Postup: `?u=24&r=P&v=2000&l=1&d=3&z=2&p=n&y=dometic-dpsi2012` (dále obdobně `y=victron-orion-12-12-30` při `u=24`).
Špatně: Dometic DPSI2012 i Orion 12/12 jsou jen pro 12 V. Kalkulačka napíše „Návod výrobce: pro toto napětí neuvádí“, pak „Použijte 35 mm² · 125 A“ a zelené „V pořádku“. Skupina se přitom jmenuje „Měniče 12 V → 230 V“. Laik z toho vyčte, že si ke 24V baterii může koupit měnič na 12 V.
Oprava: pokud položka výrobce nemá tabulku pro zvolené napětí a jde o zařízení pevně na 12 V (měnič, booster), zobrazit blokující hlášku „Tento model je pro 12 V, k soustavě 24 V nepatří“ a výpočet nenabízet.

**P2. Dvě volby „Co napájíte“ / „Co napájím“ si mohou odporovat.**
Postup: vyberte „Měnič Victron Phoenix 12/800“, takže se nastaví úbytek 3 %. Potom ve skupině „Co napájím“ klepněte na „Světla a nekritické spotřebiče“ (10 %).
Špatně: výběr zařízení a volba úbytku jsou dvě nezávislé odpovědi na stejnou otázku. Zůstane zvolený měnič, ale s úbytkem 10 %, což je pro měnič nepřípustné (vypne se na podpětí). Je to stejný vzor jako Radkův případ 60 W + měnič: jedna věc se zadává dvakrát a obě hodnoty se používají.
Oprava: při zvoleném zařízení úbytek zamknout na hodnotu výrobce, nebo skupinu úbytku přejmenovat (např. „Jak citlivý je spotřebič“) a při změně zařízení zrušit.

### Vážné

**P3. Výchozí příklad „lednice 60 W na 5 m“ dává 2,5 mm² / 7,5 A. Stejná stránka pro lednici Secop na 5 m předepisuje 6 mm² / 15 A.**
Postup: otevřete stránku bez parametrů (`page.lead` výslovně píše „lednice 60 W na 5 m“). Pak vyberte „Kompresorová lednice Secop“.
Špatně: první výsledek, který laik uvidí, je podle vlastního oddílu „Proč víc“ téže stránky pro lednici poddimenzovaný (lednice pak „cvaká a nechladí“).
Oprava: jako výchozí příklad použít spotřebič bez rozběhu (např. zásuvku 12 V 60 W), nebo rovnou předvybrat Secop.

**P4. Při převzetí průřezu výrobce zůstávají podrobnosti a hlášky spočítané pro tenčí kabel.**
Postup: `?u=12&r=P&v=45&l=5&d=3&z=2&p=n&y=secop-bd35f-bd50f`.
Špatně: hlavní výsledek je 6 mm² a lišta zatížení ukazuje „z 40 A“. Pod tím ale „Max. pojistka pro tento kabel 20 A“, „Max. délka kabelu 6,9 m“, ztráta a hláška „kabel 2,5 mm² může být dlouhý až 6,9 m“. Tyto údaje platí pro 2,5 mm². Jedna karta tak tvrdí dvě různé věci.
Oprava: tabulku podrobností a hlášky ROZHODL_* počítat z výsledného průřezu (`sv`), nebo je při rozhodnutí výrobce nadepsat „výpočet z příkonu (2,5 mm²)“.

**P5. U měniče kalkulačka radí přidat 10 %, i když už počítá s jeho jmenovitým výkonem.**
Postup: vyberte „Dometic DPSI1012 (1000 W)“ nebo jakýkoli měnič od 1000 W.
Špatně: hláška MENIC_OD_1000W radí „zadejte příkon asi o 10 % vyšší“. Kalkulačka měniče přitom účinnost do proudu už započítává (1000 W → 86,8 A), kdežto průřez počítá 1000/12 = 83,3 A. Pro stejný měnič tak vycházejí dva různé proudy. Hláška se navíc spouští jen v režimu P (100 A v režimu I ji nevyvolá) a u jakéhokoli spotřebiče od 1000 W.
Oprava: u zvoleného měniče účinnost a jmenovité napětí 12,8 V započítat automaticky stejně jako v `navrhMenice` a hlášku zobrazovat jen u vlastního spotřebiče.

**P6. Pojistka u měniče je menší, než předepisuje výrobce, a kalkulačka výrobce „opravuje“.**
Postup: `?u=12&r=P&v=1000&l=1&d=3&z=2&p=n&y=dometic-dpsi1012`.
Špatně: výrobce chce 35 mm² a 200 A. Kalkulačka napíše „Použijte 35 mm² · 125 A“ a varuje, že pojistka výrobce je větší, než kabel snese. Pojistka 125 A u měniče 1000 W se špičkou kolem 2000 W (asi 170 A) bude při rozběhu přepalovat. Laik navíc dostane dvě protichůdné rady.
Oprava: pojistku měniče dimenzovat na špičku výrobce, nebo převzít pojistku výrobce, pokud k ní výrobce udává průřez, a hlášku `pojistkaNadKabel` u měničů přeformulovat („výrobce počítá s krátkodobou špičkou“).

**P7. Výchozí prostředí „Samostatně“ odporuje nápovědě „když nevíte, zvolte Ve svazku“.**
Postup: otevřete stránku a podívejte se na „Kudy kabel povede“.
Špatně: předvybraná je méně bezpečná volba, přestože text u druhé volby říká, že při nejistotě se má zvolit ona. Průvodce zapojením počítá vždy s „n“ (viz Z6).
Oprava: výchozí hodnotu nastavit na „h“, nebo nápovědu přesunout k výchozí volbě.

### Drobné

- **P8.** Text „Proč víc“ u boosteru Orion (`duvod: jmenovity`) mluví o měniči („Měnič se při poklesu napětí vypne…“). Oprava: přidat samostatný důvod pro booster.
- **P9.** Booster Orion je označený „vstup i výstup“ a předvyplní 30 A, jenže vstupní proud je asi 33–36 A. Průvodce (Z5) přitom počítá 1,1×. Oprava: pro vstup předvyplnit 1,1 × 30 A.
- **P10.** Přepnutí P → I dělí 12 V (`h / s.napeti`), měnič a průvodce počítají s 12,8 V. 60 W tak vyjde 5 A tady a 4,7 A jinde. Oprava: sjednotit napětí pro přepočet napříč webem.
- **P11.** Přepnutí 12 → 24 V v režimu „Proud“ ponechá ampéry, takže spotřebič má najednou dvojnásobný výkon. Oprava: v režimu I při změně napětí hodnotu přepočítat, nebo upozornit.
- **P12.** Lišta zatížení ukazuje „Blízko hranice kabelu“ už při 67 % max. pojistky, což laika zbytečně straší. Oprava: hranice pásem sladit s pravidlem 1,25× (80 %).
- **P13.** Režim „Co unese můj kabel“ nepočítá s rozběhem ani s doporučením výrobce: 2,5 mm² na 3 m „unese“ lednici, kterou Secop na této délce nepovolí. Oprava: pod výsledek přidat poznámku „lednice, čerpadla a měniče: viz doporučení výrobce“.

---

## 2. Kalkulačka měniče (`/cs/kalkulacka-menice/`)

### Blok

**M1. Pouhé otevření stránky uloží výchozí kávovar do cesty a průvodce zapojením pak zapne měnič 960 W.**
Postup: nová relace, otevřete `/cs/kalkulacka-menice/` a nic neměňte. Potom otevřete `/cs/zapojeni/`.
Špatně: `sessionStorage caravanix.cesta = {"mw":960}`. Průvodce ukáže „Převzato“ a zaškrtne měnič 960 W, i když uživatel žádný měnič nechce. Stejně se ukládají výchozí hodnoty spotřebičů (`wh`) a soběstačnosti (`wp`).
Oprava: do cesty ukládat jen hodnoty, které uživatel změnil nebo potvrdil (příklad, vlastní zadání), nikdy výchozí stav.

**M2. Měnič, který baterie nemůže dodat, dostane jen varování.**
Postup: `?s={"u":12,"r":[{"n":"Indukce","w":"3500","r":"1","sou":true}],...}`.
Špatně: výsledek je 303,8 A z baterie, jen s hláškou „Pozor … zvažte 24 V“. Kalkulačka průřezu pro stejný proud vrací chybu (HLAVNI_VEDENI) a průvodce „Nelze“. Kalkulačka se neptá na baterii (kapacita, max. vybíjecí proud BMS), takže neodhalí ani měnič 2000 W na baterii 100 Ah s BMS 100 A.
Oprava: přidat vstup „Baterie (Ah) / max. proud BMS“ převzatý z cesty a nad 200 A, nebo nad proudem BMS, zobrazit blokující hlášku.

### Vážné

**M3. Volba „Běží současně s ostatními“ neumí běžný případ: lednice na 230 V běží pořád a k ní fén nebo konvice.**
Postup: indukce 3500 W současně, lednice 230 V 100 W s rozběhem 5× „samostatně“.
Špatně: výsledek je špička 3500 W, protože se lednice nepočítá. Kdyby byla „současně“, nesčítá se zase její rozběh s indukcí správně. Jediný zaškrtávač neumí vyjádřit „běží pořád + jedno z velkých“. Laik nepochopí, co znamená „samostatně“.
Oprava: místo zaškrtávače použít dvě skupiny: „běží pořád“ a „velké spotřebiče, vždy jen jeden naráz“. Trvalý výkon = pořád + největší z velkých.

**M4. Výsledek neřekne, co koupit.**
Špatně: „Trvalý výkon aspoň 960 W“ a k tomu „Rezervu si zvolte sami“. Laik koupí měnič 1000 W, který poběží na hraně. Chybí i informace, že cena a velikost měniče na krabici bývá ve špičkovém výkonu (VA), ne trvalém.
Oprava: přidat řádek „Hledejte měnič s trvalým výkonem od X W (nejbližší běžná velikost) a čistou sinusovkou“ a krátké vysvětlení VA a W.

**M5. Odkaz „Zkontrolovat kabel v kalkulačce průřezu“ předává proud zátěže, ne měniče.**
Postup: výchozí stav → odkaz `r=I&v=83,3&l=1.5`.
Špatně: kalkulačka průřezu sama hlásá (vyr.menicMalo), že kabel měniče se počítá na jeho trvalý výkon, ne na zátěž. Odkaz z měniče dělá přesný opak. Délka 1,5 m je navíc pevná a uživatel o ní neví.
Oprava: v kalkulačce měniče zadat (nebo zaokrouhlit nahoru na řadu) skutečný výkon měniče a do průřezu posílat ten, případně i s předvybraným modelem.

**M6. „Hodin zapnutý denně“ a „spotřeba naprázdno“ neovlivní žádný hlavní výsledek.**
Špatně: obě pole jen doplní poznámku pod „Proud z baterie“ („naprázdno spotřebuje 40 Wh za den“). Energie spotřebičů na 230 V za den se nepočítá a nepřenáší do baterie ani do cesty. Laik neví, proč pole vyplňuje.
Oprava: buď počítat denní Wh (spotřebiče × hodiny / účinnost + naprázdno) a předat je do cesty, nebo pole přesunout do „Předpokladů“.

### Drobné

- **M7.** Výchozí „Kávovar 900 W“ nesedí na příklad „Kávovar na kapsle 1260 W“ (stejný spotřebič, dvě hodnoty). Oprava: výchozí stav vzít z prvního příkladu.
- **M8.** Při přepnutí 24 V se mění jen proud a výsledek nijak neupozorní, že je potřeba měnič 24 V → 230 V, ne 12 V. Oprava: k výsledku doplnit „měnič pro vstup {u} V“.
- **M9.** Měnič nebere napětí z cesty správně: `zCesty` bere `u`, ale stránka `u` neukládá. Z průvodce dostane „Spotřebiče na 230 V = výkon měniče“, takže kalkulace je kruhová (Z8).

---

## 3. Kalkulačka boosteru (`/cs/kalkulacka-boosteru/`)

### Vážné

**B1. Chybí alternátor a napětí vozu. Booster 60 A na 24 V projde bez hlášky.**
Postup: `?s={"u":24,"a":"60","h":"2","styl":"dalnice","zn":true,"ah":"50","st":"20"}`.
Špatně: booster 60 A × 25,6 V je asi 1,5 kW, ze 14V alternátoru tedy přes 110 A. Běžný alternátor dodávky (120–180 A) to s provozem vozu neutáhne. Volba „24 V“ navíc mlčky předpokládá 24V vůz. Ve 12V dodávce s 24V obytnou baterií je potřeba booster 12/24 se zhruba dvojnásobným vstupním proudem.
Oprava: přidat vstupy „Napětí vozu 12/24 V“ a „Alternátor (A)“ a hlásit, když vstupní proud boosteru přesáhne asi 50 % alternátoru.

**B2. Booster větší, než baterie snese, se nehlídá.**
Postup: stejné zadání, 60 A do 50 Ah (1,2 C).
Špatně: žádné upozornění. LiFePO4 má typicky doporučený nabíjecí proud 0,5 C a BMS ho může odpojit.
Oprava: při zadané kapacitě hlásit proud boosteru nad 0,5 C (nebo nad maximum BMS).

**B3. Výsledek nevede k rozhodnutí: nesrovnává se se spotřebou.**
Špatně: „Dobije 538 Wh“, ale nevíme, jestli to stačí. Hodnota `wh` z cesty se nepřevezme a booster do cesty nic neuloží, takže průvodce pak má vždy výchozích 30 A.
Oprava: převzít `wh` z cesty a ukázat „pokryje X % denní spotřeby“; proud boosteru uložit do cesty.

### Drobné

- **B4.** Hláška „Převzato“ se ukáže i tehdy, když se z cesty převzalo jen `u = 12` (stejné jako výchozí) nebo `ah` při vypnutém „Znám kapacitu“, a nic viditelného se nezměnilo. Oprava: „Převzato“ ukazovat jen při skutečné změně viditelné hodnoty.
- **B5.** Při 0 h jízdy ukazuje oranžovou kartu s nulami a varováním o lithiu. Oprava: při 0 h zobrazit „Bez jízdy booster nenabíjí“.
- **B6.** Varování LITHIUM_BOOSTER svítí vždy jako „Pozor“, i když uživatel booster už má. Je to informace, ne varování. Oprava: změnit druh na informaci, nebo text přesunout do úvodu.

---

## 4. Průvodce zapojením (`/cs/zapojeni/`)

### Blok

**Z1. Kabely k lednici a čerpadlu v tabulce, ve schématu i v nákupním seznamu jsou tenčí, než předepisuje výrobce.**
Postup: vzor „Celoročně a v zimě“.
Špatně: lednice 1,5 mm² / 5 A na 3 m (Secop chce na 3 m 4 mm² / 15 A), čerpadlo 0,75 mm² / 5 A (Lilie i Shurflo chtějí nejméně 1,5 mm² a okruh 10 A). Na 24 V vychází lednice i čerpadlo 0,5 mm² / 3 A. Oddíl „Výrobce může chtít silnější kabel“ je jen odkaz, nákupní seznam zůstává poddimenzovaný. Laik koupí podle seznamu.
Oprava: v průvodci pro lednici a čerpadlo rovnou použít `navrhSVyrobcem` s typickým modelem (stejně jako na stránce průřezu) a do seznamu dát výsledný průřez.

**Z2. Kabel baterie → pojistková skříňka dimenzovaný na součet malých spotřebičů (0,5 mm² / 5 A).**
Postup: `?s={"u":24,...,"sp":["lednice","cerpadlo"]}` (vyjde 3,6 A, 0,5 mm², 5 A). Při 12 V a jedné lednici 3,8 A, 0,5 mm².
Špatně: hlavní přívod skříňky se dimenzuje na kapacitu skříňky nebo na budoucí rozšíření, ne na dnešní dva spotřebiče. 0,5 mm² jako hlavní přívod je i mechanicky nevhodný. Navíc pojistka přívodu (5 A) je menší než součet pojistek okruhů (5 + 3 A), takže hlavní pojistka přepálí dřív než pojistka okruhu.
Oprava: přívod skříňky dimenzovat nejméně na součet pojistek okruhů (nebo na jmenovitý proud skříňky) a s minimálním průřezem, např. 6 mm².

**Z3. Průvodce → kalkulačka spotřebičů otevře rovnou chybu „Stop“.**
Postup: libovolný vzor → „Kolik energie spotřebiče sní za den“.
Špatně: odkaz posílá `h: ""`, takže stránka hned ukáže „Zkontrolujte pole hodin denně“. Všechny položky mají navíc `sk: "elektronika"` (i lednice a čerpadlo).
Oprava: předat typické hodiny z katalogu (stejné jako v příkladech spotřebičů) a správnou skupinu.

### Vážné

**Z4. Měnič se nezkontroluje proti baterii a nabíjení proti kapacitě.**
Postup: `?s={"u":12,"ah":"100",...,"ba":"60","nab":true,"na":"40","men":true,"mw":"3000"}`.
Špatně: 100 Ah baterie s měničem 3000 W (260 A) a nabíjením 60 + 40 + 20 A (1,2 C) projde bez hlášky na baterii. Nápověda tvrdí „Na průřezy kabelů kapacita nemá vliv“. U měniče je jen „Nelze… Zkraťte trasu“, což u 260 A nepomůže (problém je pojistka nad 250 A, ne délka).
Oprava: přidat kontrolu „proud měniče > max. vybíjecí proud baterie/BMS (typicky 1 C)“ a „součet nabíjecích proudů > 0,5 C“. U chyby měniče nad 200 A napsat „měnič je pro 12 V moc velký: 24 V nebo menší měnič“.

**Z5. Booster na 24 V předpokládá 24V vůz a odkazuje na Orion 12/12.**
Postup: 24 V + booster 30 A.
Špatně: vstup startovací → booster = 33 A, jenže ve 12V dodávce je to asi 66 A. Kabel 10 mm² / 50 A je pak poddimenzovaný. Oddíl výrobce nabízí „Victron Orion 12/12-30“, který k 24V baterii nepatří (kalkulačka průřezu pak píše „neuvádí“). Model se vybírá jen podle `ba === "30"`, napětí se nekontroluje.
Oprava: přidat volbu „napětí vozu“ (12/24), vstupní proud počítat × U_bat/U_vozu × 1,1 a odkaz na Orion 12/12 zobrazit jen při 12/12.

**Z6. Model měniče pro kontrolu výrobce se vybírá podle VA, takže bývá slabší než zadaný měnič.**
Postup: vzor „Celoročně“ (2000 W) → „Kabel k měniči podle návodu Victron“.
Špatně: `menicModel` hledá `w >= menicW` v hodnotách 500/800/1200/1600/2000, což jsou VA. 2000 W tak dostane Smart 12/2000, který má trvale 1600 W, a 1500 W dostane 12/1600 (1300 W). Navíc průvodce vždy počítá „samostatně“ (`p: "n"`), i když průřez radí „ve svazku“ (P7).
Oprava: vybírat podle trvalého výkonu modelu (`navrh.hodnota`), a když žádný nestačí, odkaz nezobrazovat.

**Z7. Pojistka 7,5 A se zobrazuje jako „8 A“.**
Postup: vzor „Celoročně“, okruh „Zásuvka 12 V a USB (60 W)“.
Špatně: tabulka i nákupní seznam „8 A: 1 ks“, protože `fmt(ok.pojistka, 0)` zaokrouhlí 7,5 na 8. Pojistka 8 A v řadě nožových pojistek neexistuje.
Oprava: pojistky formátovat s jedním desetinným místem, když nejsou celé, tedy stejně jako na stránce průřezu.

**Z8. Předání do kalkulačky měniče je kruhové a výsledek kalkulačky měniče se vrací jako výkon měniče.**
Postup: průvodce s měničem 2000 W → „Jak velký měnič“.
Špatně: do kalkulačky měniče přijde jeden „spotřebič“ 2000 W, takže výsledek je „měnič aspoň 2000 W“ a nic se nedozvíme. Opačným směrem cesta vezme `trvalyVykonW` (minimum zátěže, např. 960 W) a průvodce s ním dimenzuje kabel. Podle pravidla průřezu se ale kabel počítá na výkon skutečného měniče.
Oprava: v cestě rozlišit „zátěž na 230 V“ a „výkon měniče“; průvodce ať při převzetí zaokrouhlí nahoru na běžnou velikost a odkaz do kalkulačky měniče ať posílá jen napětí.

**Z9. Výstup neobsahuje hodnotu hlavní pojistky ani hlavního kabelu baterie.**
Špatně: v seznamu je „Hlavní pojistka … (typicky Class T)“ bez hodnoty, přestože je to nejdražší a nejdůležitější položka. Měnič má 225 A a nabíjení až 100 A. Laik neví, co koupit.
Oprava: navrhnout hodnotu hlavní pojistky (nejméně největší z odběrů a nabíjení × 1,25, nejvýš podle BMS a kabelu) a průřez kabelu baterie → hlavní vypínač.

### Drobné

- **Z10.** Vzory „stejné hodnoty jako v příkladech kalkulaček“ nesedí. „Zima“ má v průvodci 300 Ah / 300 Wp / měnič 2000 W, v soběstačnosti 200 Ah / 200 Wp a ve spotřebičích žádný spotřebič na 230 V. Booster 50 A je v průvodci, 30 A v soběstačnosti. Oprava: sjednotit, nebo komentář v kódu a texty opravit.
- **Z11.** Pojistka měniče 225 A při trvalých 174 A nechává malou rezervu na rozběh (špička 2× = asi 350 A po sekundy). U velkých měničů je to na hraně. Oprava: u měniče počítat pojistku s ohledem na špičku nebo odkázat na tabulku výrobce.
- **Z12.** Hláška MENIC_NAD_150A a CHYBA_KABELU se u měniče 3000 W zobrazí obě a radí si navzájem (24 V / zkraťte trasu). Oprava: při chybě kabelu měniče zobrazit jen jednu hlášku s konkrétní radou.

---

## 5. Hotový obytňák (`/cs/hotovy-obytnak/`)

### Vážné

**H1. Volba „Olověnou obytnou baterii“ nemá žádný účinek.**
Postup: zaškrtněte jen „Co ve voze máte: olověnou baterii“.
Špatně: postup zůstane prázdný. `mam.olovo` není v žádné podmínce `kdy`, takže laik má pocit, že stránka nefunguje.
Oprava: navázat na ni kroky (např. „olovo + chci.menic“ → olověná baterie velký měnič neutáhne, „olovo + chci.vydrz“ → využitelná kapacita jen asi 50 %).

**H2. Olověná baterie + měnič neupozorní, že to nepůjde.**
Postup: „olovo“ + „Zásuvku 230 V (měnič)“ bez lithia.
Špatně: krok „Vyberte měnič“ bez zmínky, že AGM 95 Ah při 1000 W (asi 90 A) rychle padá pod napětí a životnost klesá. Chybí i odkaz na kapacitu baterie u měniče.
Oprava: pro `mam.olovo+chci.menic` (bez `chci.lithium`) přidat krok „Olověná baterie a měnič: počítejte nejvýš asi s 300–500 W, jinak lithium“.

**H3. Postup nepředává nic do kalkulaček ani do průvodce.**
Špatně: odkazy vedou na prázdné kalkulačky a tlačítko „Sestavit zapojení“ otevře průvodce s výchozí víkendovkou (LiFePO4, booster 30 A). Neví o elektrobloku, relé ani stávajícím soláru, takže laik nedostane odpověď na otázku „co koupit“.
Oprava: zaškrtnuté volby převádět do stavu průvodce (např. `mam.solar` → solár zapnutý, `mam.elektroblok` → nabíječka zapnutá, `chci.menic` → měnič).

### Drobné

- **H4.** „chci.booster“ bez lithia dává krok „Relé nahraďte boosterem“ s odůvodněním jen pro lithium. Pro olovo s klasickým alternátorem relé stačí. Oprava: rozlišit text podle `chci.lithium`.
- **H5.** „mam.solar + chci.solar“ nepřipomene, že přidané panely mohou přetížit stávající regulátor. Oprava: přidat krok „zkontrolujte max. vstup regulátoru“ s odkazem na kalkulačku soláru.
- **H6.** „mam.elektroblok + chci.lithium“ (typicky Schaudt EBL) nemá vlastní krok, i když starší elektrobloky lithiový profil neumějí a nabíječka je v nich vestavěná. Oprava: přidat krok pro tuto kombinaci.

---

## Souhrn nejzávažnějších

1. Cesta ukládá výchozí stavy: samotné otevření kalkulačky měniče zapne v průvodci měnič 960 W (M1).
2. Průvodce kupuje poddimenzované kabely k lednici, čerpadlu a pojistkové skříňce (Z1, Z2) a odkaz do spotřebičů končí chybou (Z3).
3. Měniče a booster na 12 V jdou v průřezu použít na 24 V se zeleným „V pořádku“ (P1). Booster ani průvodce neznají napětí vozu ani alternátor (B1, Z5).
4. Nikde se nehlídá baterie: měnič nad BMS, nabíjení nad 0,5 C, 3500 W na 12 V je jen „Pozor“ (M2, B2, Z4).
5. Dvojí zadání téže veličiny: „Co napájíte“ vs. „Co napájím“ (P2), zátěž vs. výkon měniče mezi kalkulačkami (M5, Z8), dva různé proudy pro stejný měnič (P5).
