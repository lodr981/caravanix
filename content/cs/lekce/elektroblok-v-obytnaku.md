---
titulek: "Elektroblok: co v něm je a co k němu připojit?"
seoTitulek: "Elektroblok v obytňáku: booster, solár a lithium – Caravanix"
popis: "Co je elektroblok v hotovém obytňáku (Schaudt, Nordelettronica, CBE a další), co v něm je a jak k němu připojit booster, solár nebo lithiovou baterii. Kdy elektroblok obejít a proč se řídit návodem výrobce."
mytus: "„Booster, solár i novou baterii prostě připojím k elektrobloku.“"
zasada: "Elektroblok je srdce rozvodu 12 V v hotovém obytňáku. Co k němu připojíte a jak, určuje jeho návod a návod přidávaného přístroje. Měnič a další velké odběry vedou vlastním kabelem s pojistkou od baterie."
karty: [K-LEKCE-0042, K-LEKCE-0043, K-LEKCE-0019, K-LEKCE-0001, K-LEKCE-0006, K-LEKCE-0005, K-VODIC-0013, K-LEKCE-0025]
kalkulacka: "/cs/hotovy-obytnak/"
poradi: 23
---
Otevřete skříň pod šatníkem a najdete krabici s řadou pojistek, svazkem konektorů a nálepkou, které nikdo nerozumí. To je elektroblok. V hotovém obytňáku řídí skoro všechno, co jede na 12 V. Než k němu cokoli přidáte, vyplatí se vědět, co v něm je.

## Co je elektroblok

Elektroblok je ústředna elektroinstalace obytného vozu. Vyrábí je například Schaudt, Nordelettronica, CBE nebo Dometic, výrobci vozů je dodávají hotové a zapojené. Obvykle je ve skříni, pod sedadlem nebo v úložném prostoru, ovládací panel bývá nad dveřmi.

Jako příklad poslouží Schaudt EBL 501. Podle návodu výrobce obsahuje:

- **nabíječku z 230 V,** která nabíjí obytnou a často i startovací baterii,
- **booster nebo oddělovací relé** pro nabíjení za jízdy (starší typy mívají jen relé),
- **rozvod 12 V s pojistkami** pro světla, čerpadlo, lednici a další okruhy, v tomto příkladu každý výstup nejvýš 20 A,
- **hlavní vypínač 12 V** a hlídač baterie, který při nízkém napětí vypne spotřebiče,
- **vstup pro solární regulátor,** v tomto příkladu pro nabíjecí proud 14 A s pojistkou 15 A,
- měření hladiny vody a další drobnosti.

Jiné elektrobloky mají jiné hodnoty. Platí vždy návod toho vašeho.

## Na co nesahat

V elektrobloku jsou části pod 230 V. Výrobce výslovně zakazuje uživateli údržbu a opravy. Smíte vyměnit pojistku, a to jen:

- když je elektroblok bez napětí,
- když znáte a odstranili jste příčinu, proč se přepálila,
- za pojistku se stejnou hodnotou, jaká je na elektrobloku.

Pojistku nikdy nepřemosťujte ani neopravujte drátkem. Zásahy do 230 V části patří elektrotechnikovi, víc v lekci „Proč mi v kempu vypadává chránič?“.

## Lithiová baterie

Elektroblok nabíjí baterii podle nastaveného typu: gel, AGM, nebo lithium. Typ se nastavuje jednou, při každé výměně baterie. Novější elektrobloky lithiový profil mají, starší často ne. Nabíječka bez lithiového profilu nebo bez možnosti nastavit napětí podle výrobce baterie se k lithiové baterii nepřipojuje. Postup krok za krokem popisuje lekce „Z olova na lithium v hotovém obytňáku“.

## Booster

Elektrobloky s relé spojují za jízdy startovací a obytnou baterii napřímo. S lithiem to nejde: baterie by si vzala z alternátoru, co dá. Proto booster.

Výrobci boosterů mají pro vozy s elektroblokem vlastní schéma zapojení. U příkladu Votronic se plusové vedení ke startovací baterii rozpojí a booster se vloží do něj; zapojení podle tohoto schématu zajistí, že booster nic neobchází. Booster se v kombinaci s elektroblokem spouští signálem běhu motoru D+. Na boosteru nastavíte typ baterie, u lithia s teplotním čidlem na baterii.

Proč na signálu D+ tolik záleží, vysvětluje lekce „Euro 6: proč se za jízdy nenabíjí?“. Jak velký booster a kolik nabije, spočítá kalkulačka boosteru.

## Solár

Malý solár můžete připojit na solární vstup elektrobloku, pokud to jeho návod dovoluje a proud regulátoru nepřekročí, co vstup snese. Regulátor musí mít profil pro vaši baterii.

Větší solár potřebuje vlastní regulátor připojený přímo k baterii, s pojistkou u baterie. Platí pořadí: regulátor nejdřív k baterii, potom k panelům. Podrobně v lekci „Solár na střechu hotového vozu“.

## Kdy elektroblok obejít

„Obejít“ neznamená elektroblok vyhodit. Rozvod 12 V, pojistky a panel v něm zůstanou. Vlastní cestou od baterie ale vedou:

- **měnič 230 V** a další velké odběry, které by výstupy elektrobloku přetížily,
- **solární regulátor**, který dá víc, než snese solární vstup,
- **nabíjení lithia**, když ho nabíječka elektrobloku neumí: nabíječku elektrobloku pak nechte odpojit a lithium nabíjejte jinou nabíječkou s lithiovým profilem.

Každá taková cesta má vlastní kabel a pojistku hned u baterie. Průřez a pojistku spočítá kalkulačka průřezu.

## Typické chyby

- **Lithium na staré nabíječce** elektrobloku bez lithiového profilu.
- **Booster vedle relé**, které dál spojuje baterie napřímo.
- **Měnič na výstupu elektrobloku** místo vlastního kabelu od baterie.
- **Silnější pojistka v elektrobloku**, „protože ta původní pořád odcházela“.
- **Svépomocné opravy** uvnitř elektrobloku.

## Kontrolní seznam

- Máte návod ke svému elektrobloku a víte, který typ to je.
- V elektrobloku je nastavený typ baterie, kterou máte.
- Booster je zapojený podle schématu výrobce pro elektroblok a spouští se signálem D+.
- Solár nepřekračuje solární vstup, jinak má vlastní regulátor u baterie.
- Měnič a velké odběry mají vlastní kabel a pojistku od baterie.

Co v hotovém voze zkontrolovat a přenastavit, provede krok za krokem stránka pro hotový obytňák.

**Bezpečnost:** Uvnitř elektrobloku je 230 V: neopravujte ho, pojistky nepřemosťujte a měňte jen za stejnou hodnotu. Lithiovou baterii nenabíjejte nabíječkou bez lithiového profilu. Booster, solár a měnič připojujte podle návodu výrobce elektrobloku a přidávaného přístroje.
