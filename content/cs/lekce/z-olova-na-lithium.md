---
titulek: "Z olova na lithium v hotovém obytňáku"
seoTitulek: "Výměna olověné baterie za LiFePO4 v obytňáku – Caravanix"
popis: "Co zkontrolovat, než v hotovém obytném voze vyměníte olověnou baterii za lithiovou LiFePO4: nabíječku v elektrobloku, solární regulátor, relé nebo booster, BMS v mrazu, pojistku u baterie a monitor stavu."
mytus: "„Vyndám olovo, dám lithium a hotovo.“"
zasada: "Lithiová baterie se do hotového vozu nemění kus za kus: každý nabíječ musí mít lithiový profil, z alternátoru se nabíjí přes booster, nabíjení v mrazu blokuje BMS a hned u baterie patří pojistka s dostatečnou vypínací schopností."
karty: [K-LEKCE-0019, K-LEKCE-0001, K-LEKCE-0002, K-LEKCE-0003, K-LEKCE-0004, K-LEKCE-0005, K-LEKCE-0010]
kalkulacka: "/cs/zapojeni/"
poradi: 11
---
Hotový obytňák s olověnou baterií funguje roky. Pak přijde lákavá nabídka: lithiová baterie LiFePO4, lehčí a s větší využitelnou kapacitou. Samotná výměna baterie zabere chvilku. Jenže kolem baterie je celý systém, který někdo nastavil na olovo. A ten se sám nepřenastaví.

## Kdo všechno baterii nabíjí

Než koupíte novou baterii, sepište si všechno, co obytnou baterii nabíjí. V hotovém voze to bývá:

- **nabíječka z 230 V**, často schovaná v elektrobloku (centrální jednotce s pojistkami a ovládacím panelem),
- **solární regulátor**, pokud máte panely na střeše,
- **alternátor** za jízdy, přes oddělovací relé nebo booster,
- případně **měnič s nabíječkou** nebo další nabíječ.

Každý z nich musí lithiovou baterii nabíjet správně. Stačí jeden špatně nastavený a baterii může přebít, nebo ji naopak nikdy nenabije do plna.

## Nabíjecí profil u každého nabíječe

Olověná a lithiová baterie chtějí jiné nabíjecí napětí. U každého nabíječe proto projděte návod:

- Má lithiový profil (LiFePO4)? Zapněte ho. Některé elektrobloky mají přepínač typu baterie, jiné ne.
- Profil chybí, ale napětí jde nastavit ručně? Nastavte hodnoty z návodu výrobce baterie. Například jeden výrobce udává pro baterii 12,8 V nabíjecí napětí 14,2 V a udržovací 13,5 V. Vaše baterie může mít jiné hodnoty, platí její návod.
- Teplotní kompenzaci napětí vypněte. Lithiová baterie ji podle výrobce nepotřebuje.
- Nabíječ nejde přepnout ani nastavit? Zeptejte se jeho výrobce, jestli s lithiem počítá. Když ne, patří vyměnit.

## Za jízdy: relé, nebo booster

Starší vozy nabíjejí obytnou baterii za jízdy přes oddělovací relé. To jen propojí obě baterie, když běží motor. Olověné baterii to stačilo. Lithiová má velmi malý vnitřní odpor a vzala by si z alternátoru, kolik dá. Alternátor by se přetížil.

Proto lithium z alternátoru nabíjejte přes booster, česky nabíječ DC-DC. Podrobně to vysvětluje lekce „Lithium rovnou z alternátoru?“. Booster nahrazuje relé. Původní relé pak nesmí baterie dál propojovat napřímo, jinak by booster obešlo. Velikost boosteru a to, kolik za jízdy nabije, spočítá kalkulačka boosteru.

## BMS a mráz

Lithiovou baterii hlídá elektronika BMS. Pod 0 °C se baterie LiFePO4 nenabíjí, a když výrobce udává vyšší dolní mez, platí ta. Olovu mráz při nabíjení tolik nevadil, proto na to staré nabíječe nemyslí.

Ověřte v datasheetu, že BMS vaší baterie umí zablokovat nabíjení při nízké teplotě. Spoléhat na to, že v mrazu nikdo nenabíjí, nestačí. Solární regulátor nebo nabíječka na přípojce nabíjí sám, i když u vozu nejste. Víc v lekci „V zimě nabíjím jako v létě?“.

## Pojistka u baterie

Lithiová baterie dá při zkratu tisíce ampér. Pojistka, která stačila u olova, nemusí takový proud bezpečně přerušit. Hned u baterie proto patří hlavní pojistka s dostatečnou vypínací schopností, typicky Class T. Proč, vysvětluje lekce „U baterie stačí obyčejná pojistka?“.

Starou olověnou baterii k nové lithiové paralelně nepřipojujte. Spojovat se smí jen stejné baterie.

## Monitor stavu baterie

Ukazatel napětí na panelu elektrobloku vám u lithia mnoho neřekne. Napětí lithiové baterie se během vybíjení mění jen málo, takže podle něj stav nabití špatně odhadnete. Spolehlivější je monitor s bočníkem (shuntem), který počítá, kolik ampérhodin do baterie vteklo a kolik z ní odteklo. Pokud ho máte, nastavte v něm podle návodu nový typ baterie a její kapacitu.

## Co se nemění

- **Spotřebiče.** Světla, lednice, čerpadlo i zásuvky 12 V fungují dál.
- **Kabely a pojistky ke spotřebičům.** Spotřebiče berou stejný proud jako dřív, takže jejich kabely i pojistky zůstávají.
- **Startovací baterie.** Výměna se týká jen obytné baterie. Startovací baterie motoru zůstává, jaká byla.

Pokud s lithiem zároveň přidáváte silný spotřebič, například měnič, je to nový obvod. Jeho kabel a pojistku spočítejte v kalkulačce průřezu.

## Postup v kostce

1. Sepište všechny nabíječe a ke každému najděte návod.
2. U každého nastavte lithiový profil, nebo napětí podle výrobce baterie. Teplotní kompenzaci vypněte.
3. Oddělovací relé nahraďte boosterem.
4. Ověřte, že BMS blokuje nabíjení v mrazu.
5. Hned u baterie dejte pojistku s dostatečnou vypínací schopností.
6. Přenastavte monitor stavu baterie.

Jak do sebe baterie, nabíječe a pojistky zapadají, ukazuje průvodce zapojením.

**Bezpečnost:** Před výměnou olověné baterie za LiFePO4 nastavte u každého nabíječe lithiový profil nebo napětí podle návodu výrobce baterie. Z alternátoru nabíjejte jen přes booster. Hned u baterie musí být hlavní pojistka s dostatečnou vypínací schopností a nabíjení v mrazu musí blokovat BMS.
