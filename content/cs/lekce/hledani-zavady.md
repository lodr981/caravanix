---
titulek: "Nástavba je mrtvá. Kde začít hledat?"
seoTitulek: "Nástavba nejde, vypadává, nenabíjí: hledání závady s multimetrem – Caravanix"
popis: "Postup krok za krokem, když v obytném voze nejde 12 V, elektrika občas vypadne nebo se baterie nenabíjí: napětí na baterii, BMS, pojistky, vypínač, spoje, kostra a nabíječe. A kdy zavolat elektrikáře."
mytus: "„Nejde nic, takže je odpálená elektronika a půjde to do servisu.“"
zasada: "Hledejte od baterie ke spotřebiči a měřte napětí: na pólech baterie, za pojistkou, za vypínačem, na spotřebiči. Pojistku měňte jen bez napětí, za stejnou hodnotu a až když znáte příčinu."
karty: [K-LEKCE-0030, K-LEKCE-0031, K-LEKCE-0021, K-LEKCE-0026, K-LEKCE-0025, K-VODIC-0012, K-VODIC-0021]
kalkulacka: "/cs/zapojeni/"
poradi: 18
---
Večer v kempu cvaknete vypínačem a nic. Světla nesvítí, čerpadlo mlčí, panel je černý. Nejčastěji to není drahá porucha, ale přepálená pojistka, vypnutý vypínač, uvolněný spoj nebo baterie, kterou odpojila její vlastní elektronika. Najdete to sami, když budete postupovat po pořádku a měřit, ne hádat.

## Co budete potřebovat

- **Multimetr**, i ten nejlevnější. Přepněte ho na stejnosměrné napětí (značka V s rovnou čarou). Černý hrot patří do zdířky COM, červený do zdířky V.
- **Schéma nebo návod k vozu a k elektrobloku** (centrální jednotce s pojistkami a ovládacím panelem). Výrobce v něm obvykle má tabulku poruch.
- **Náhradní pojistky** stejných hodnot, jaké ve voze máte.

V celém postupu stačí měřit napětí, proud měřit nemusíte.

Než začnete: když cítíte spálený plast, kabel je horký nebo se z něj kouří, vypněte hlavní vypínač a dál nehledejte. Co dělat potom, popisuje lekce „Kde to vlastně hoří?“. Na instalaci 230 V nesahejte, ta patří elektrotechnikovi.

## Krok 1: napětí přímo na pólech baterie

Černý hrot na mínus baterie, červený na plus. Měřte přímo na pólech, ne na kabelových okách.

- **Napětí žádné nebo skoro žádné** u lithiové baterie znamená, že ji odpojil její BMS (elektronika, která baterii hlídá). Dělá to při hlubokém vybití, přetížení, zkratu nebo přehřátí. V mrazu blokuje jen nabíjení, baterie dál napájí. Pokračujte oddílem „Když baterii odpojil BMS“.
- **Napětí nízké**: baterie je vybitá. Hledejte, proč se nenabíjí (krok 6), a na co se vybila. U lithia vám napětí o stavu nabití mnoho neřekne, spolehlivější je monitor s bočníkem (lekce „Kolik mi zbývá v baterii?“).
- **Napětí v pořádku**: baterie žije a chyba je dál po cestě.

U olověné startovací baterie platí: když klidové napětí klesne pod 12,4 V, je třeba ji dobít. Víc v lekci „Proč se startovací baterie vybíjí?“.

## Když baterii odpojil BMS

Podle návodu výrobce se BMS po zkratu obnoví sám po krátké prodlevě, po přehřátí, jakmile baterie vychladne. Po hlubokém vybití baterii obvykle probudí až nabíjení. Postup:

1. Vypněte spotřebiče, hlavně měnič.
2. Nechte baterii vychladnout, pokud byla teplá.
3. Připojte nabíjení: přípojku 230 V, nebo nastartujte motor, když máte booster. Některá nabíječka baterii bez napětí na svorkách neprobudí, protože si myslí, že žádná baterie není připojená. Jak baterii probudit, popisuje návod baterie.
4. Pokud baterie stála dlouho hluboce vybitá, například celou zimu, neprobouzejte ji. Výrobce takovou baterii obnovovat zakazuje. Obraťte se na prodejce.

V mrazu BMS blokuje nabíjení, ale ne vybíjení. Baterie se tak v zimě může vybít do nuly, i když svítí slunce. Víc v lekci „V zimě nabíjím jako v létě?“.

## Krok 2: hlavní pojistka a hlavní vypínač

Černý hrot nechte na mínusu baterie. Červeným měřte postupně za hlavní pojistkou a za hlavním vypínačem. Kde napětí zmizí, tam je chyba.

Výrobce elektrobloku uvádí, že porucha napájení má nejčastěji na svědomí vadnou pojistku. Pro výměnu platí:

- Pojistku měňte jen bez napětí.
- Novou dejte až ve chvíli, kdy víte, proč se stará přepálila, a příčinu jste odstranili.
- Použijte stejnou hodnotu, jaká je uvedená u držáku nebo v návodu. Větší pojistka by nechala kabel přehřát, protože pojistka chrání kabel (lekce „Pojistka chrání kabel“).
- Pojistku nikdy nepřemosťujte drátem ani neopravujte.

## Krok 3: panel a elektroblok

Elektrobloky mají na ovládacím panelu hlavní vypínač 12 V pro obytný prostor. Snadno se vypne omylem. Některé mají i funkci, která obytnou baterii odpojí, třeba při uskladnění. Než otevřete jedinou krabici, zkontrolujte panel a tabulku poruch v návodu.

## Krok 4: spoje

Uvolněný nebo zoxidovaný spoj se chová zrádně: bez zátěže ukáže plné napětí, se zátěží napětí spadne a spotřebič vypadne. Proto měřte, když spotřebič běží:

- Oba hroty dejte na plusový vodič, jeden před spoj a druhý za něj. Na dobrém spoji multimetr ukáže skoro nulu. Čím víc ukazuje, tím horší je spoj.
- Stejně změřte spoje na mínusu.
- Spoj, který je na dotek teplý, je vadný.

Špatně zalisované oko nebo kroucený spoj vyměňte za nové oko zalisované kleštěmi (lekce „Jaký kabel na 12 V“).

## Krok 5: mínus a kostra

Nefunguje jen jeden spotřebič? Změřte napětí přímo na jeho svorkách. Pak dejte černý hrot na mínus baterie a červený na mínusovou svorku spotřebiče. Má tam být skoro nula. Pokud ne, je přerušený mínus nebo špatný kostřicí bod. Jak má mínus vypadat, vysvětluje lekce „Mínus přes kostru, nebo kabelem?“.

## Krok 6: baterie se nenabíjí

Změřte napětí baterie bez nabíjení a pak s nabíjením. Když nabíjení běží, napětí musí stoupnout. Pokud nestoupne, prověřte jednotlivé zdroje:

- **Za jízdy:** pojistky boosteru a pojistku v přívodu D+ (signálu běhu motoru). Návod elektrobloku ji uvádí jako první příčinu, když se za jízdy nenabíjí startovací baterie.
- **Ze soláru:** stín, sníh nebo špína na panelu, vypnutý vypínač soláru, pojistka mezi regulátorem a baterií.
- **Z kempu:** jistič a chránič ve voze a ve sloupku (lekce „Proč mi v kempu vypadává chránič?“).
- **U lithia v mrazu** nabíjení blokuje BMS. To je v pořádku.

## Elektrika občas sama vypadne

Když vše funguje a pak náhle zhasne, typicky jde o jedno z toho:

- BMS odpojí baterii při velkém odběru, například když naběhne měnič s kávovarem. Proud musí unést i baterie, ne jen kabel.
- Uvolněný spoj, který se při otřesech nebo zátěži rozpojuje (krok 4).
- Vybitá baterie, které pod zátěží spadne napětí.

## Kdy zavolat elektrikáře

- Porucha je na 230 V. Zásahy do 230 V instalace vozu svěřte elektrotechnikovi (lekce „Postavím obytňák a STK nic neřeší?“).
- Pojistka se znovu přepálí a příčinu nenajdete.
- Kabel nebo spoj se hřeje, zapáchá nebo je opálený.
- BMS baterii nepustí ani po nabíjení podle návodu.
- Chyba je uvnitř elektrobloku. Desku neopravujte, kontaktujte servis výrobce.

## Typické chyby

- **Větší pojistka**, „aby už nepadala“. Pak se místo pojistky spálí kabel.
- **Měření bez zátěže.** Vadný spoj bez zátěže vypadá jako dobrý.
- **Hledání uprostřed.** Začněte u baterie a postupujte ke spotřebiči.
- **Nabíjení baterie, která stála celou zimu hluboce vybitá.**

## Kontrolní seznam

- Napětí přímo na pólech baterie.
- Za hlavní pojistkou a za hlavním vypínačem.
- Hlavní vypínač 12 V na panelu.
- Pojistka spotřebiče a jeho napětí na svorkách.
- Spoje na plusu i mínusu pod zátěží.
- Napětí baterie s nabíjením a bez něj.

Jak má zapojení vypadat, aby se v něm chyby hledaly snadno, ukazuje průvodce zapojením.

**Bezpečnost:** Stačí měřit napětí. Pojistku měňte jen bez napětí, za stejnou hodnotu a až po odstranění příčiny; nikdy ji nepřemosťujte. Baterii, která stála dlouho hluboce vybitá, neprobouzejte. Porucha na 230 V patří elektrotechnikovi.
