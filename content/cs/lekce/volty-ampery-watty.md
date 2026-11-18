---
titulek: "Volty, ampéry, watty a Ah bez strachu"
seoTitulek: "Volty, ampéry, watty, Ah a Wh v obytňáku pro laiky – Caravanix"
popis: "Co jsou volty, ampéry, watty, ampérhodiny a watthodiny, jak je přepočítat (P = U × I, Wh = W × h) a proč na 12 V tečou velké proudy. Příklady z obytné dodávky: lednice, baterie, měnič."
mytus: "„Watty, ampéry, to je jedno, hlavně ať to svítí.“"
zasada: "Výkon ve wattech je napětí krát proud. Spotřebu a obsah baterie počítejte ve watthodinách, protože ampérhodiny bez napětí nic neřeknou. Na 12 V teče na stejný výkon mnohem větší proud než na 230 V, a podle proudu se volí kabel a pojistka."
karty: [K-VODIC-0017, K-LEKCE-0018, K-VODIC-0019, K-VODIC-0020, K-LEKCE-0013, K-LEKCE-0017]
kalkulacka: "/cs/kalkulacka-spotrebicu/"
poradi: 21
---
Na lednici stojí watty, na baterii ampérhodiny, na pojistce ampéry a na měniči zase watty. Kdo se v tom ztratí, není sám. Stačí přitom pět pojmů a dva vzorce. Pak už každé číslo na štítku do sebe zapadne.

## Pět pojmů

Pomůže přirovnání k vodě v hadici.

- **Volt (V)** je napětí, tedy tlak vody. Obytná baterie má jmenovitě 12 V, přesněji lithiová 12,8 V. Zásuvka v kempu má 230 V.
- **Ampér (A)** je proud, tedy kolik vody hadicí proteče. Podle proudu se volí kabel a pojistka.
- **Watt (W)** je výkon, tedy kolik práce voda za chvíli udělá. Na spotřebičích je nejčastěji právě výkon.
- **Watthodina (Wh)** je energie: výkon krát doba. Tolik „vody“ spotřebič za den spotřebuje.
- **Ampérhodina (Ah)** je náboj: proud krát doba. Výrobci baterií jím udávají kapacitu.

## První vzorec: výkon = napětí × proud

P = U × I, tedy watty = volty × ampéry. Obráceně: ampéry = watty ÷ volty.

Příklad: spotřebič 120 W na 12 V bere 120 ÷ 12 = 10 A. Lednice 60 W na 12 V bere 5 A.

Kalkulačky Caravanixu u lithia počítají s 12,8 V, protože lithiová 12V baterie má čtyři články po 3,2 V. Výsledky jsou proto o kousek nižší, než kdybyste dělili dvanáctkou.

## Druhý vzorec: energie = výkon × doba

Wh = W × h. Žárovka 10 W svítící 5 hodin spotřebuje 10 × 5 = 50 Wh. Lednice 60 W neběží pořád, kompresor se zapíná a vypíná. Kdyby za den běžela dohromady 10 hodin, spotřebuje 60 × 10 = 600 Wh.

Takhle sečtete všechny spotřebiče a víte, kolik energie za den potřebujete. Přesně to dělá kalkulačka spotřebičů.

## Ampérhodiny a watthodiny

Kapacita baterie v ampérhodinách se na watthodiny přepočte napětím: Wh = Ah × V.

- Lithiová baterie 100 Ah, 12,8 V: 100 × 12,8 = 1 280 Wh.
- Lithiová baterie 100 Ah, 25,6 V (24V systém): 100 × 25,6 = 2 560 Wh.

Obě mají na štítku 100 Ah, ale druhá nese dvakrát víc energie. Proto ampérhodiny bez napětí nic neřeknou. Ještě víc to platí u powerbanek a nabíjecích stanic, které jsou uvnitř na jiném napětí než 12 V. Porovnávejte proto vždy watthodiny.

Ani celou kapacitu nevyužijete. Z lithiové baterie kalkulačky počítají s 90 %, v mrazu méně. Z olověné se kvůli životnosti využívá jen část (lekce „Olovo, AGM, gel, nebo lithium?“).

## Proč 12 V znamená velké proudy

Stejný výkon na nižším napětí potřebuje větší proud. Varná konvice 1 200 W:

- na 230 V bere 1 200 ÷ 230, tedy asi 5 A,
- na 12 V by brala 1 200 ÷ 12 = 100 A.

Asi dvacetkrát větší proud potřebuje mnohem silnější kabel. Tenký kabel by se hřál a ztrácel napětí. Proto se velké spotřebiče ve voze napájejí přes měnič tlustými kabely přímo od baterie a proto u velkých odběrů dává smysl 24V systém: na stejný výkon teče poloviční proud. Kolem 150 A a výš se vyplatí 24 V zvážit.

## Měnič bere víc, než dává

Měnič mění 12 V z baterie na 230 V a část energie při tom ztratí. Kalkulačky počítají s účinností 90 %. Měnič, který dává spotřebiči 1 000 W, tak z baterie bere asi 1 100 W.

Indukční vařič 2 000 W přes měnič bere z 12,8V baterie asi 174 A. Takový proud musí unést nejen kabel, ale i baterie: běžná 100Ah baterie s vestavěným BMS mívá trvalý proud 100 A. Víc v lekci „Kolik uvařím na indukci?“.

## Jak číst štítky

- **Spotřebič:** watty, někdy ampéry. Ampéry na 12V spotřebiči jsou proud, který poteče kabelem.
- **Spotřebič na 230 V:** watty, nebo ampéry na 230 V. Pro baterii je přepočtěte přes watty a připočtěte ztrátu měniče.
- **Baterie:** Ah a napětí. Vynásobte je a máte Wh.
- **Pojistka:** ampéry. Pojistka chrání kabel a volí se podle něj (lekce „Pojistka chrání kabel“).

## Typické chyby

- **Sčítat ampérhodiny baterií s různým napětím.**
- **Počítat spotřebu v ampérech** místo ve watthodinách za den.
- **Zapomenout na ztrátu měniče** a jeho spotřebu naprázdno.
- **Brát z krabice měniče špičkový výkon** místo trvalého (lekce „Měnič 3 000 W za pár stovek?“).
- **Vybrat kabel podle wattů**, ne podle proudu a délky.

## Kontrolní seznam

- U každého spotřebiče znáte watty a kolik hodin denně běží.
- Sečetli jste watthodiny za den.
- Kapacitu baterie znáte ve watthodinách.
- U velkých spotřebičů znáte proud z baterie.
- Kabel a pojistku máte spočítané podle proudu a délky.

Spotřebu za den vám sečte kalkulačka spotřebičů, kabel k ní kalkulačka průřezu.

**Bezpečnost:** Kabel a pojistku volte podle proudu, ne podle wattů: na 12 V teče na stejný výkon asi dvacetkrát větší proud než na 230 V. Proud z baterie nesmí trvale překročit trvalý proud baterie z jejího datasheetu.
