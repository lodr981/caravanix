---
titulek: "Kolik mi zbývá v baterii?"
seoTitulek: "Monitor baterie s bočníkem (shunt): zapojení a nastavení – Caravanix"
popis: "Proč voltmetr u lithiové baterie LiFePO4 neřekne, kolik energie zbývá, jak funguje monitor baterie s bočníkem (shuntem), kam bočník patří a co nastavit."
mytus: "„Voltmetr ukazuje pěkné napětí, tak je baterie skoro plná.“"
zasada: "U LiFePO4 napětí o stavu nabití skoro nic neřekne. Spolehlivý je monitor s bočníkem, za kterým jsou všechny mínusy, a pravidelně nabitá baterie, aby se mohl srovnat na 100 %."
karty: [K-LEKCE-0026, K-LEKCE-0023, K-VODIC-0014, K-VODIC-0023]
kalkulacka: "/cs/kalkulacka-baterie/"
poradi: 15
---
U olověné baterie se dalo podle napětí docela dobře odhadnout, kolik v ní zbývá. Lithiová baterie LiFePO4 je pokerový hráč: tváří se pořád stejně a karty neukáže, dokud není skoro konec.

## Proč voltmetr nestačí

Napětí LiFePO4 je po většinu vybíjení téměř stejné. Výrobce baterií uvádí, že baterie nabitá na 80 % a na 30 % může ukázat skoro stejné napětí. Napětí navíc klesá pod zátěží a stoupá při nabíjení a v klidu. Výrazně se mění až u úplně plné a skoro prázdné baterie.

Voltmetr vám tedy řekne, že baterie „ještě jede“, ale ne, jestli vydrží do rána. Pěkné číslo na voltmetru proto nic neslibuje: stejné napětí může mít baterie skoro plná i poloprázdná.

## Jak počítá monitor s bočníkem

Monitor baterie funguje jako počítadlo na čerpací stanici. Bočník (anglicky shunt) je přesný kovový pásek, kterým teče veškerý proud baterie. Monitor na něm měří proud dovnitř i ven a sčítá ampérhodiny. Z toho a ze zadané kapacity spočítá stav nabití v procentech a odhadne, na jak dlouho baterie vystačí.

Počítadlo ale časem ujíždí. Monitor se proto musí pravidelně **synchronizovat**: když pozná, že je baterie plná, nastaví si 100 %. Baterii, která se pořád nabíjí jen napůl, monitor po čase ukazuje čím dál nepřesněji.

## Kam bočník patří

Bočník patří do **hlavního mínusu**, mezi mínusový pól baterie a mínusovou přípojnici:

1. Mínusový pól baterie: na něm je **jen** kabel k bočníku.
2. Bočník.
3. Mínusová přípojnice: sem patří **všechny** mínusy spotřebičů, nabíječů, regulátoru, boosteru i měniče.
4. Spojení mínusu s kostrou vozu je také na straně přípojnice, tedy za bočníkem.

Co je připojené přímo na mínusový pól baterie, monitor nevidí. Bočník se vybírá podle největšího proudu, který jím poteče; údaj je v jeho datasheetu.

Monitor potřebuje ještě tenký napájecí a měřicí vodič na plus baterie. I ten je odbočka a potřebuje vlastní malou pojistku podle návodu monitoru.

## Co nastavit

Hodnoty berte z návodu monitoru a od výrobce baterie. Nastavuje se hlavně:

- **kapacita baterie** v ampérhodinách, podle štítku,
- **napětí „nabito“**: nad ním monitor považuje baterii za plnou,
- **koncový proud**: nabíjecí proud, pod který musí klesnout, aby byla baterie plná,
- **doba**, po kterou musí obě podmínky platit,
- u lithia případně další volby, které návod uvádí pro LiFePO4.

Po instalaci baterii nabijte do plna a monitor **synchronizujte ručně**. Do té doby jeho procenta nic neznamenají.

## Typické chyby

- **Lednice nebo měnič na mínusovém pólu baterie.** Monitor jejich odběr nepočítá a ukazuje víc, než v baterii je.
- **Kostra spojená s mínusem před bočníkem.** Proud spotřebičů, které vedou mínus přes kostru, pak bočník obejde.
- **Baterie se nikdy nenabije do plna.** Monitor se nesynchronizuje a procenta ujíždějí.
- **Špatná kapacita.** Zadáte větší kapacitu, než baterie má, a monitor slibuje energii, která v baterii není.

## Kontrolní seznam

- Na mínusovém pólu baterie je jen kabel k bočníku.
- Všechny mínusy a spojení s kostrou jsou na přípojnici za bočníkem.
- Napájecí vodič monitoru má pojistku.
- Kapacita a nabíjecí hodnoty odpovídají návodu.
- Po instalaci jste baterii nabili a monitor synchronizovali.

## Příklad z praxe

Monitor ukazuje skoro plnou baterii, a přesto BMS v noci baterii odpojí. Při kontrole se ukáže, že kompresorová lednice je připojená vlastními kabely přímo na póly baterie, jak předepisuje výrobce, a její mínus vede mimo bočník. Lednice tak „jí načerno“. Mínus lednice patří na přípojnici za bočník. Plus může zůstat u baterie s vlastní pojistkou.

Jak velkou baterii potřebujete, aby vydržela bez nabíjení, spočítá kalkulačka baterie.

**Bezpečnost:** Všechny mínusy spotřebičů a nabíječů patří na přípojnici za bočník, na mínusovém pólu baterie je jen kabel k bočníku. S kostrou se mínus spojuje jedním kabelem blízko baterie, dimenzovaným aspoň na hodnotu hlavní pojistky. Napájecí vodič monitoru jistěte vlastní pojistkou.
