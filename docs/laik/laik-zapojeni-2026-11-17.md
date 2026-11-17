# Čtenář laik: majitel staršího obytňáku, solár a lithiová baterie

- **Persona:** majitel staršího obytňáku, elektřině rozumí málo. Chce přidat solár a lithiovou baterii a neví, kde začít. Notebook (okno 1366 × 900).
- **Úkol:** „Zjistit, jakou baterii, solár a kabely potřebuju a co mám koupit.“
- **Cesta:** úvod → „Jak postupovat“ → krok 1 Spotřeba → krok 2 Baterie → krok 3 Nabíjení → krok 5 Zapojení (průvodce /cs/zapojeni/) → nákupní seznam. Krok 4 (měnič) jsem přeskočil, 230 V nepotřebuji. Krok 6 jsem jen otevřel.
- **Datum:** 17. 11. 2026, web http://localhost:4321/cs/ (vývojový server)

## Výsledek

```
S POTÍŽEMI  (asi 14 kroků)
- zasekl jsem se: krok 1 → 2 – tlačítko „Další krok: Baterie“ zahodilo mých 411 Wh a ukázalo 800 Wh
- zasekl jsem se: krok 2 → 3 → 5 – každý další krok začíná s cizími čísly, průvodce zapojení zase od 100 Ah a 200 Wp
- zasekl jsem se: krok 3 Nabíjení – kolik Wp soláru mám koupit, se nedozvím, jen kolik dní vydržím
- nerozuměl jsem: Wp, MPPT, LiFePO4, BMS, booster, mm², Class T, „podle návodu regulátoru“
- nevěřil jsem: nákupnímu seznamu – lekce chce hlavní pojistku Class T u baterie, v seznamu není
```

Nákupní seznam jsem nakonec dostal (baterie, panely, regulátor, booster, skříňka, vypínač, metry kabelu, pojistky). Nevím ale, jestli patří k mé spotřebě: průvodce zapojení si moje čísla z kroků 1–3 nevzal a já jsem baterii a panely přepisoval ručně.

## Nálezy podle závažnosti

1. **Hlavní pojistka u baterie v nákupním seznamu chybí.** Lekce „U baterie stačí obyčejná pojistka?“ (odkaz přímo pod seznamem) říká, že hned u lithiové baterie „musí být hlavní pojistka … typicky Class T“. V seznamu pojistek je jen 2 A až 50 A, Class T ani „hlavní pojistka“ tam není, jen „Hlavní vypínač u baterie“. Podle seznamu bych ji nekoupil. Nevím, komu věřit.
2. **„Další krok“ zahodí, co jsem zadal.** V kroku 1 jsem klepl na „Víkend v létě“ a vyšlo 411 Wh. Velké tlačítko dole „Další krok: Baterie“ otevřelo baterii s **800 Wh** a výsledkem 210 Ah. Správných 110 Ah jsem dostal jen přes menší odkaz „Spočítat, jak velkou baterii potřebujete“ uprostřed stránky. Dva odkazy na stejný krok dávají různý výsledek a já si toho málem nevšiml.
3. **Krok 3 a průvodce zapojení začínají s cizími čísly.** Soběstačnost ukazovala 800 Wh a 200 Ah, ne moje. Průvodce zapojení začal se 100 Ah a 200 Wp. U baterie píše „Kolik baterie potřebujete, spočítá kalkulačka baterie“, ale výsledek odtamtud nepřevezme. Krokovník slibuje „na konci máte schéma a nákupní seznam“, takže jsem čekal, že se čísla nesou s sebou.
4. **Kolik soláru koupit, jsem se nedozvěděl.** Krok 3 „Stačí solár a booster?“ odpovídá jen „Bez přípojky vydržíte 26 dní“ a „solár nestačí“ ve všech 12 měsících (s cizími 800 Wh). Bez tlačítka nebo věty „potřebujete asi X Wp“. Musel bych zkoušet „Panely o 100 Wp víc“ a hádat. Zelená čísla „+5 dní“ u tří různých rad mi nepomohla vybrat.
5. **Kabel od panelů k regulátoru nemám.** V tabulce i po klepnutí na kabel: „Nepočítá se. Kabel od panelů se volí podle návodu regulátoru.“ Regulátor ještě nemám, návod taky ne. V nákupním seznamu tento kabel chybí úplně, i když panely na střeše jsou to hlavní, co přidávám.
6. **„Máte 200 Ah“ v kroku 2.** Baterii nemám, teprve ji kupuji. Stránka mi předvyplnila „Kapacita mé baterie 200 Ah“ a srovnání „Potřebujete 110 Ah / Máte 200 Ah“. Chvíli jsem si myslel, že tam něco mám zadané špatně.
7. **Slova, kterým nerozumím:** „Wp“ (výkon panelů), „Regulátor MPPT 20 A“, „LiFePO4“, „booster“ a „alternátor“ (mám starý vůz, nevím, jestli se mě to týká), „trvalým proudem baterie (BMS) z jejího datasheetu“, „mm²“, „Class T“, „vypínací schopnost“. Na úvodu se tím hned vystřelí v kartách lekcí. Vysvětlení slov na místě jsem nenašel.
8. **Pořadí kroků 5 a 6 mě mátlo.** Krok 5 „Zapojení“ už dal kabely a pojistky ke všemu. Krok 6 „Kabely a pojistky“ začíná znovu „lednice 60 W na 5 m“. Nevím, jestli musím krok 6 projít pro každý spotřebič zvlášť, nebo je hotovo.
9. **Nákupní seznam je neúplný na nákup.** „K tomu lisovací oka a držáky“ bez počtu a velikosti. „Pojistková skříňka aspoň pro 4 okruhů“ (špatná čeština). U kabelu nevím, jaký typ kabelu chtít v obchodě, jen průřez. U baterie, regulátoru a boosteru žádný parametr navíc, podle čeho vybírat.
10. **Krok 3 vede jinam, než čekám.** V krokovníku je „3 Nabíjení“, ale otevře se „Soběstačnost“ a kalkulačky soláru a boosteru jsou schované dole v „Další kalkulačky k tomuto kroku“. Pod nadpisem „Zapojení soláru“ na úvodu je otázka na sérii a mráz, to jsem jako začátečník neřešil.

## Co pomohlo

- Sekce **„Jak postupovat“** na úvodu se šesti očíslovanými kroky. Konečně někdo řekl, kde začít. Krokovník nahoře na každé stránce („Krok 2 z 6“) jsem rád viděl.
- **Typické příklady** (Víkend v létě, Práce na cestě, Zima na horách) a **katalog spotřebičů** s watty. Sám bych příkony nevěděl.
- **Vzory v průvodci zapojení** (Víkendovka, Na cesty, Celoročně) a schéma, které se samo překreslí. Tabulka „Odkud → kam“ s průřezem a pojistkou je jasná.
- **Nákupní seznam rozdělený na komponenty, kabely a pojistky** a věta „Půlka metrů červeně (plus), půlka černě (mínus)“. Tlačítko „Vytisknout seznam“.
- Opakované „nechte zkontrolovat elektrikářem“ mě uklidnilo, že to nemusím mít dokonalé.
