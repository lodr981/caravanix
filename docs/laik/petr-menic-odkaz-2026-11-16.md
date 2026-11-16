# Čtenář laik: Petr (24), měnič 1 500 W / 12 V / 2 m a odkaz kamarádovi

- **Persona:** Petr, 24 let, telefon (okno 390 × 844), spěchá, text přeskakuje, výsledek chce poslat kamarádovi.
- **Úkol:** „Zjistěte kabel pro měnič 1 500 W na 12 V, 2 m od baterie, a pošlete kamarádovi odkaz na výsledek.“
- **Datum:** 16. 11. 2026, web http://localhost:4321/cs/ (vývojový server)

## Splnil jsem úkol: ano, s drobnými potížemi

Výsledek: kabel **70 mm²**, pojistka **175 A**. Odkaz jsem zkopíroval tlačítkem „Kopírovat odkaz na výsledek“ a po otevření v nové kartě ukázal stejný výsledek. Zabralo to asi minutu.

## Kroky

1. Úvodní stránka: hned vidím „Kalkulačky“ a hnědé tlačítko „Průřez kabelu a pojistka“. Klepnul jsem.
2. Nahoře žlutý rámeček, přeskočil jsem. 12 V už je vybráno.
3. V „Příkon spotřebiče“ jsem přepsal 60 na **1500**. Vyskočila číselná klávesnice, dobré.
4. Délka: posuvník. Klepnul jsem prstem zhruba na začátek, dal mi 1,3 m, tak jsem 7× klepl „+ 0,1“ na **2 m**.
5. „Co napájím“: měnič je jmenovaný u první volby („Elektronika, lednice, měnič“), ta už byla vybraná. Zbytek jsem nechal.
6. Sjel jsem na „Výsledek“: **70 mm²**, pojistka **175 A u baterie, na plusu**, žluté „Pozor“.
7. Ještě níž tlačítko **„Kopírovat odkaz na výsledek“**. Pod ním se objevilo „Odkaz je zkopírovaný. Otevře stejný výsledek.“
8. Odkaz jsem otevřel v nové kartě (jako kamarád): stejný výsledek 70 mm², 175 A.

## Kde jsem se zasekl

- **Délka posuvníkem na telefonu.** Trefit prstem 2 m nejde, posuvník jde od 0,2 do 20 m. Musel jsem doklepávat po 0,1. U jiné délky (třeba 7,5 m z 1,3 m) bych klepal desítkykrát. Chci tam prostě napsat „2“.
- **Tlačítko na odkaz je daleko.** Výsledek je vidět, ale tlačítko na sdílení je až pod tabulkou detailů a dvěma barevnými rámečky. Nejdřív jsem ho nenašel a hledal ikonu sdílení nahoře u výsledku.
- **Jen kopírovat, ne sdílet.** Na telefonu bych čekal klasické „Sdílet“ (WhatsApp, Messenger). Takhle musím přepnout do chatu a vložit ručně. Šlo to, ale je to krok navíc.
- **Potvrzení o zkopírování** je malým šedým písmem pod tlačítkem. Málem jsem ho přehlédl a klepl znovu.
- **Odkaz vede na localhost** (`http://localhost:4321/...`). Kamarád by ho u sebe neotevřel. Chápu, že je to zkušební verze na jednom počítači, ale jako uživatel bych to nepoznal a poslal bych nefunkční odkaz.

## Čemu jsem nerozuměl, která slova neznám

- **„Pozor“ a „V pořádku“ zároveň.** V tmavém rámečku je „Pozor“, pod tabulkou zelené „V pořádku“ a pak zase žluté „Pozor“. Tak je to v pořádku, nebo ne? Musel jsem číst, a to jsem nechtěl.
- **Žluté „Pozor“ u měniče:** mám počítat s účinností a zadat raději vyšší příkon. O kolik vyšší? 1 600? 2 000? Neříká to. Nevím, jestli můj výsledek 70 mm² platí, nebo mám počítat znovu.
- **AWG 2/0 (67,4 mm²)**: nevím, co to je. 67,4 je menší než 70, tak stačí, nebo nestačí?
- **mm²**: 70 mm² mi nic neříká. Je to kabel tlustý jako prst? Jako palec? Obrázek nebo „průměr asi tolik a tolik mm“ by pomohl.
- **úbytek napětí**, **zpětný vodič**, **přes kostru**, **ve svazku**, **FLRY**: přeskočil jsem, ale netuším.
- „Rozhodlo oteplení kabelu a velikost pojistky“: nevím, co mi tím chcete říct.

## Čemu jsem nevěřil a proč

- **70 mm² na 2 m mi přijde obří.** Na telefonu to číslo bez srovnání působí přehnaně. Nevím, jestli je to správně, nebo jsem něco špatně zadal. Věta typu „měnič 1 500 W bere z baterie kolem 125 A, proto tak silný kabel“ by mě přesvědčila. (Proud 125 A tam je, ale v tabulce pod výsledkem, nespojil jsem si to.)
- **Žlutý rámeček nahoře**, že čísla neprošla schválením (a nějaký „Radek“). Kdybych to kamarádovi posílal jako radu, tohle mě zarazí.
- Kamarádovi bych poslal jen holý odkaz. On uvidí „Pozor“ a nebude vědět proč. U odkazu není žádný text typu „Měnič 1 500 W, 2 m: kabel 70 mm², pojistka 175 A“.

## Co by mi pomohlo

- Délka jako políčko, kam napíšu číslo (s číselnou klávesnicí jako u wattů).
- Tlačítko „Sdílet výsledek“ hned pod velkým číslem, na telefonu se systémovým sdílením.
- Jednoznačný verdikt: buď „V pořádku“, nebo „Pozor“ s jednou větou, co přesně udělat. U měniče rovnou říct, o kolik zvýšit příkon, nebo to započítat samo.
- Ke zkopírovanému odkazu přidat krátký text výsledku, aby kamarád věděl, o co jde, ještě než klikne.
- AWG schovat, nebo napsat, že je to americké značení.

## Poznámka k testu

Ve vývojovém režimu se dole uprostřed zobrazuje plovoucí lišta Astra, která na telefonu překrývá text u spodního okraje. V hotovém webu tam asi nebude.
