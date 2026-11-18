---
titulek: "Euro 6: proč se za jízdy nenabíjí?"
seoTitulek: "Chytrý alternátor Euro 6, signál D+ a booster – Caravanix"
popis: "Proč se v dodávce Euro 5 a 6 obytná baterie za jízdy nenabíjí: chytrý alternátor, signál D+, proč oddělovací relé nestačí a jak nastavit booster."
mytus: "„Alternátor přece nabíjí, tak stačí relé jako v dřívějších dodávkách.“"
zasada: "Chytrý alternátor nedává stálé napětí. Obytnou baterii za jízdy nabíjí booster, který se spouští signálem běhu motoru D+, ne relé a ne samotné napětí."
karty: [K-LEKCE-0049, K-LEKCE-0001, K-LEKCE-0020, K-LEKCE-0043, K-LEKCE-0019]
kalkulacka: "/cs/kalkulacka-boosteru/"
poradi: 27
---
Najedete tři sta kilometrů, zastavíte na noc a panel ukazuje, že obytná baterie skoro nepřibrala. Alternátor je v pořádku, kabely taky. Jen máte novější dodávku a ta šetří palivo i na alternátoru.

## Co je chytrý alternátor

Starší auto mělo alternátor, který za jízdy dával pořád zhruba stejné napětí. Vozy s normou Euro 5 a 6 mají často chytrý alternátor. Řídí ho elektronika vozu:

- **napětí mění podle jízdy**, podle výrobce boosterů zhruba mezi 12,6 a 15,5 V,
- **při brzdění** napětí zvedne a nabíjí víc, tomu se říká rekuperace,
- **když vůz proud nepotřebuje**, alternátor stáhne nebo se vypne.

Startovací baterii to vyhovuje. Obytné baterii ne: dostává nízké a kolísavé napětí, a tak se nabíjí jen málo.

## Proč relé nestačí

Oddělovací relé za jízdy spojí startovací a obytnou baterii napřímo. To má dva problémy:

- **Napětí.** Relé nic nevyrovná. Když alternátor dává nízké napětí, dostane ho i obytná baterie.
- **Proud.** Lithiová baterie si z alternátoru vezme, co dá, a alternátor přetíží. Proto se lithium z alternátoru nabíjí vždy přes booster. Víc v lekci „Lithium rovnou z alternátoru?“.

Relé spínané napětím má navíc problém poznat, jestli motor běží. Napětí chytrého alternátoru je někdy nižší než u stojícího auta s plnou baterií.

## Co je signál D+

D+ je signál „motor běží“. U starších aut to byla svorka na alternátoru, u novějších vozů ho obvykle dává elektronika vozu na místě určeném pro nástavbáře. Kde ho najdete ve vašem voze, je v podkladech výrobce vozu, nebo vám to řekne autoelektrikář.

D+ potřebuje víc přístrojů: booster, absorpční lednice na 12 V nebo elektroblok.

## Booster spouštěný signálem D+

Booster umí poznat běh motoru dvěma způsoby:

- **podle napětí**: zapne, když napětí na startovací baterii stoupne. U příkladu Votronic nad 13,3 V. U chytrého alternátoru to nefunguje spolehlivě, protože napětí často tak vysoko nevystoupá. Výrobce tento režim pro Euro 6 výslovně nedoporučuje.
- **podle signálu D+**: zapne, když motor běží, a pak nabíjí i z nižšího napětí. U příkladu Votronic zvyšuje nabíjecí výkon nad 11,7 V a vypne se až pod 11,2 V.

Pro Euro 6 proto vždy signál D+. Zapalování místo D+ je jen nouzové řešení: když stojíte se zapnutým zapalováním a motor neběží, booster může startovací baterii silně vybít.

## Nastavení boosteru

- **Profil baterie.** U lithia lithiový profil nebo napětí podle výrobce baterie. U některých boosterů je pro lithium povinné teplotní čidlo na baterii.
- **Spouštění.** Vstup D+ zapojený, detekce běhu motoru zapnutá. Nucené nabíjení nechte vypnuté, jinak booster bere ze startovací baterie i ve stojícím voze. Víc v lekci „Proč se startovací baterie vybíjí?“.
- **Proud.** Tolik, kolik zvládne alternátor a kabel. Kolik za jízdy nabije, spočítá kalkulačka boosteru.
- **Kabel a pojistky** na vstupu i výstupu spočítá kalkulačka průřezu.

Ve voze s elektroblokem zapojte booster podle schématu výrobce boosteru pro elektroblok, aby původní relé baterie napřímo nespojovalo. Podrobně v lekci „Elektroblok: co v něm je a co k němu připojit?“.

## Když za jízdy nabíjí jen pár ampér

1. Změřte, jestli na vstupu D+ boosteru je při běžícím motoru napětí.
2. Podívejte se, jestli booster neomezuje výkon kvůli nízkému napětí na vstupu. Slabý nebo dlouhý kabel ke startovací baterii ubere napětí.
3. Ověřte, že je baterie skoro plná. Plná baterie si bere málo, to je v pořádku.
4. Zkontrolujte, že původní relé neobchází booster.

## Typické chyby

- **Původní relé** a nová lithiová baterie.
- **Booster spouštěný napětím** u vozu Euro 6.
- **Vstup D+ na zapalování** a vybitá startovací baterie po noci se zapnutým rádiem.
- **Nucené nabíjení** zapnuté natrvalo.
- **Tenký kabel** na vstupu boosteru.

## Kontrolní seznam

- Víte, jestli má váš vůz chytrý alternátor.
- Mezi alternátorem a obytnou baterií je booster, ne jen relé.
- Booster se spouští signálem D+ z místa určeného výrobcem vozu.
- Profil boosteru odpovídá vaší baterii.
- Nucené nabíjení je vypnuté.

**Bezpečnost:** Lithiovou baterii nikdy nenabíjejte z alternátoru přes relé ani napřímo, vždy přes booster. U chytrého alternátoru spouštějte booster signálem D+; připojení na zapalování může vybít startovací baterii. Nucené nabíjení nenechávejte zapnuté.
