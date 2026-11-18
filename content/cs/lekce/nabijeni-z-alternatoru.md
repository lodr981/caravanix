---
titulek: "Lithium rovnou z alternátoru?"
seoTitulek: "Booster: nabíjení LiFePO4 z alternátoru – Caravanix"
popis: "Proč se lithiová baterie v obytné dodávce nabíjí z alternátoru přes booster (nabíječ DC-DC) a co s tím má chytrý alternátor. S kalkulačkou boosteru."
mytus: "„Lithium nabiju rovnou z alternátoru.“"
zasada: "Lithiovou baterii nabíjejte z alternátoru vždy přes booster: omezí proud, aby se alternátor nepřetížil, a vyrovná nízké a kolísavé napětí chytrého alternátoru."
karty: [K-LEKCE-0001]
kalkulacka: "/cs/kalkulacka-boosteru/"
obrazek: { cesta: "scena-alternator/v2", alt: "Unavená usměvavá obytná dodávka se zpocenou maskou jede po venkovské silnici, nad ní měděný blesk" }
poradi: 3
---
Se startovací olověnou baterií to fungovalo roky: alternátor dobíjel, baterie brala, kolik chtěla, a všichni byli spokojení. Lithiová baterie LiFePO4 je ale jiný strávník. Sní toho mnohem víc a sama od stolu neodejde.

## Proč lithium alternátor přetíží

Lithiová baterie má velmi malý vnitřní odpor. Proto přijme mnohem větší nabíjecí proud než olověná. Když ji spojíte s alternátorem napřímo, vezme si z něj, co dá, a alternátor přetíží. Výrobci baterií i nabíječů proto výslovně píší, že přetížení alternátoru je potřeba zabránit.

## Co dělá booster

Booster, česky nabíječ DC-DC, stojí mezi startovací a obytnou baterií. Dělá dvě věci:

- **omezí proud** na hodnotu, kterou nastavíte, a nikdy ji nepřekročí, takže se alternátor nepřetíží,
- **vyrovná napětí**, aby obytná baterie dostala správné nabíjecí napětí i tehdy, když ho alternátor dává málo.

## Chytrý alternátor

Vozy s normou Euro 5 a 6 mají často chytrý alternátor. Řídí ho elektronika vozu: napětí mění podle potřeby, pro nabíjení obytné baterie bývá příliš nízké, a když vůz proud nepotřebuje, alternátor se vypne. Obytná baterie připojená napřímo by se tak nabíjela špatně. Booster si s kolísavým napětím poradí.

## Kolik nabijete za jízdy

Kolik ampérhodin vám booster dodá za den, spočítá kalkulačka boosteru z jeho proudu a z hodin za volantem. Stejné údaje o jízdě zadáte i do kalkulačky soběstačnosti a uvidíte, o kolik dní déle vydržíte bez přípojky.

## Typické chyby

- **Lithium na původním oddělovacím relé.** Relé spojí baterie napřímo, takže proud nic neomezuje. Když booster přidáte, relé nesmí obytnou baterii dál propojovat se startovací, jinak by booster obešlo.
- **Booster s olověným profilem.** Booster je nabíječ a potřebuje profil pro lithium. Jak ho nastavit, popisuje lekce „Z olova na lithium v hotovém obytňáku“.
- **Slabý kabel na vstupu boosteru.** Ubere napětí a booster pak nabíjí méně nebo se vypíná. Kabel a pojistku pro vstup i výstup spočítejte zvlášť v kalkulačce průřezu.
- **Booster přepnutý na nucené nabíjení.** Co to udělá se startovací baterií ve stojícím voze, vysvětluje lekce „Proč se startovací baterie vybíjí?“.

## Kontrolní seznam

- Mezi alternátorem a lithiovou baterií je booster, žádné přímé spojení.
- Původní relé baterie napřímo nespojuje.
- Booster má profil pro lithium nebo napětí podle výrobce baterie.
- Kabel a pojistka na vstupu i výstupu boosteru jsou podle kalkulačky průřezu.
- Proud boosteru jste nastavili tak, aby ho alternátor zvládl, a víte, kolik za jízdy nabije.

## Příklad z praxe

Jana vymění v hotovém obytňáku olověnou baterii za lithiovou. Původní relé by teď spojilo lithium s alternátorem napřímo. Místo relé proto nechá zapojit booster s lithiovým profilem a v kalkulačce boosteru si ověří, že za běžný den jízdy baterii dobije. Za jízdy se teď nabíjí správně i tehdy, když elektronika vozu napětí alternátoru sníží.

**Bezpečnost:** Lithiovou baterii LiFePO4 nikdy nepřipojujte k alternátoru napřímo. Z alternátoru ji nabíjejte vždy přes booster, který omezí proud. Platí to i pro vozy s chytrým alternátorem.
