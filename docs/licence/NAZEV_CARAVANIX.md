# Název Caravanix: domény, ochranné známky, podobné firmy

Zpracoval `strazce-licenci`, 16. 11. 2026. Jen čtení veřejných zdrojů, nic se neregistrovalo, nikde se nepřihlašovalo. Nejsem právník: níže jsou zjištění, ne právní rada.

## Shrnutí

| Oblast | Zjištění | Riziko |
| --- | --- | --- |
| Domény | `.com` a `.de` jsou obsazené (registrátor IONOS), `.cz`, `.pl`, `.net`, `.app` podle RDAP volné, `.eu` nezjištěno | střední: hlavní mezinárodní a německá doména nejsou k dispozici |
| Ochranné známky | v databázích se nepodařilo vyhledat (JavaScript, CAPTCHA, blokace); webové vyhledávání žádnou známku „Caravanix“ nenašlo | **neznámé**, dokud rešerši neudělá člověk nebo zástupce |
| Firmy a produkty | žádná firma ani produkt „Caravanix“ v oboru karavanů nebo elektra nenalezena | nízké podle dostupných zdrojů |

Celkově: **střední riziko, hlavně kvůli neověřeným známkám a obsazeným .com/.de.** Před registrací domén a známky a před jakoukoli placenou částí je nutná rešerše známek člověkem.

## Domény

Ověřeno přes RDAP (veřejné registrační údaje), 16. 11. 2026. Odpověď 404 znamená, že registr doménu nezná, tedy pravděpodobně volná. Funkčnost endpointů u `.cz` a `.pl` jsem ověřil na známých doménách (seznam.cz, allegro.pl vrátily záznam).

| Doména | Stav | Podrobnosti | Zdroj |
| --- | --- | --- | --- |
| caravanix.com | **obsazená** | registrace 12. 9. 2014, expirace 12. 9. 2027, registrátor IONOS SE, stav „client transfer prohibited“, DNS ns1089.ui-dns.* | [RDAP Verisign](https://rdap.verisign.com/com/v1/domain/caravanix.com) |
| caravanix.de | **obsazená** | stav aktivní, poslední změna 8. 9. 2018, DNS ns1042.ui-dns.* (IONOS); držitele DENIC veřejně nezobrazuje | [RDAP DENIC](https://rdap.denic.de/domain/caravanix.de) |
| caravanix.cz | volná (404) | | [RDAP CZ.NIC](https://rdap.nic.cz/domain/caravanix.cz) |
| caravanix.pl | volná (404) | | [RDAP NASK](https://rdap.dns.pl/domain/caravanix.pl) |
| caravanix.net | volná (404) | | [RDAP Verisign](https://rdap.verisign.com/net/v1/domain/caravanix.net) |
| caravanix.app | volná (404) | | [RDAP Google Registry](https://pubapi.registry.google/rdap/domain/caravanix.app) |
| caravanix.eu | **nezjištěno** | EURid nemá veřejný RDAP dostupný tímto nástrojem a [WHOIS EURid](https://whois.eurid.eu/) je stránka v JavaScriptu; dál jsem neobcházel | — |

**Kdo a k čemu používá .com a .de:** nezjištěno. Oba weby při načtení vracejí chybu TLS, archiv (web.archive.org) mi není dostupný a vyhledávání „caravanix“ nevrátilo žádnou stránku z těchto domén. Obě domény jsou u IONOS, ale s jinými sadami DNS, takže nelze říct, zda mají stejného držitele. Doména .com je držena nepřetržitě od roku 2014 a prodlužována, což ukazuje na aktivního držitele (třeba jen domain parking nebo rezervace jména).

Pozn.: „volná“ podle RDAP platí k datu zjištění. Doména může být v ochranné lhůtě nebo ji kdokoli zaregistruje dřív. Registraci rozhoduje Radek (`CLAUDE.md`, pravidlo 9: žádné registrace bez souhlasu).

## Ochranné známky

Hledaný výraz „Caravanix“ a podobně znějící (Caravanex, Karavanix, Caravanixx). Relevantní třídy podle Niceského třídění: 9 (software, elektrické přístroje, kabely, baterie), 35 (online obchod), 42 (SaaS, návrh), případně 12 (vozidla a jejich díly) a 41 (vzdělávání, příručky).

| Databáze | Výsledek | Poznámka |
| --- | --- | --- |
| [TMview](https://www.tmdn.org/tmview/) (pokrývá EUIPO, ÚPV, DPMA, UPRP a další) | **neprověřeno** | aplikace v JavaScriptu; přímé dotazy na API server odmítl („Request Rejected“) |
| [EUIPO eSearch plus](https://euipo.europa.eu/eSearch/) | **neprověřeno** | spojení odmítnuto / JavaScript |
| [WIPO Global Brand Database](https://branddb.wipo.int/) | **neprověřeno** | vyžaduje CAPTCHA (ALTCHA); podle pravidel jsem ji neobcházel |
| [ÚPV ČR, databáze známek](https://isdv.upv.gov.cz/) | **neprověřeno** | HTTP 403 pro automatický přístup |
| [DPMAregister](https://register.dpma.de/DPMAregister/marke/einsteiger) | **neprověřeno** | formulář bez přihlášení a bez CAPTCHA, ale vyžaduje odeslání formuláře v prohlížeči; nástroj to neumí |
| [UPRP e-Wyszukiwarka](https://ewyszukiwarka.pue.uprp.gov.pl/) | **neprověřeno** | stránka vrátila prázdný obsah (zřejmě aplikace v JavaScriptu) |
| Webové vyhledávání „Caravanix“ + trademark / Marke / ochranná známka / znak towarowy | nic nenalezeno | nepřímý ukazatel, rešerši nenahrazuje |

**Úvaha k riziku (ne právní rada):** Prvek „caravan“ je pro obor popisný, takže se dá čekat hodně známek s „Caravan…“ (např. „Caravan Biologix“, „CaravanX“). Rozlišovací je hlavně koncovka „-ix“. Riziko záměny je nejvyšší u známek typu „CARAVANIX“, „KARAVANIX“, „CARAVANEX“ ve třídách 9, 12, 35, 42. Obsazené .com a .de mohou znamenat, že držitel jméno chrání i známkou; to je potřeba ověřit nejdřív.

**Jak to ověřit ručně (pro Radka, cca 15 minut, bez přihlášení):** TMview v prohlížeči, hledat „caravanix“ a pak „caravan*ix“ / „karavan*“ s filtrem tříd 9, 12, 35, 41, 42 a teritorií EU, CZ, DE, PL, AT, WO. Výsledky (i nulové) zapsat sem s datem.

## Podobné firmy a produkty

Webové vyhledávání 16. 11. 2026 (dotazy „Caravanix“, „caravanix Wohnmobil“, „Karavanix / Caravanex / Caravanixx“):

- **Žádná firma ani produkt s názvem Caravanix** v oboru karavanů, obytných vozů nebo elektra nenalezena.
- Podobná, ale odlišná jména: [CaravanX](https://caravanx.org/) (logistika, Egypt), Caravan Biologix (biotechnologie, USA), Explorex Caravans (výrobce karavanů, Austrálie). Ani jedno nepůsobí v EU v našem oboru.
- Obecně je v oboru mnoho jmen se základem „Carava…/Cara…“ (např. Caraworld, Carafax, Caravanium). Jméno Caravanix tak bude ve vyhledávání soupeřit s popisným slovem „caravan“; pro SEO je to spíš úkol pro `technicke-seo`.

## Co ověřit u právníka nebo patentového zástupce

- [PRÁVNÍK] Rešerše shodných a podobných známek „Caravanix“ ve třídách 9, 12, 35, 41, 42 pro EU, ČR, DE, PL (a případně mezinárodní přihlášky), včetně fonetické podobnosti (Karavanix, Caravanex) a dřívějších nezapsaných práv (obchodní firmy, užívaná označení).
- [PRÁVNÍK] Zda obsazená caravanix.com a caravanix.de (držitel neznámý) představují riziko střetu, a zda má smysl držitele kontaktovat.
- [PRÁVNÍK] Zda a v jakých třídách přihlásit vlastní známku (EUIPO jedna přihláška pro celou EU, nebo jen ÚPV) a kdy, vzhledem k plánu DE a PL a k placeným výstupům (kabelové sady jsou zboží třídy 9).
- [PRÁVNÍK] Rozlišovací způsobilost jména s popisným základem „caravan“.

## Otázky pro Radka

- [ČEKÁ NA RADKA] Udělat ruční vyhledávání v TMview (postup výše) a dát mi výsledky, nebo rovnou rešerši u patentového zástupce?
- [ČEKÁ NA RADKA] Zaregistrovat teď volné caravanix.cz, .pl, .eu (pokud volná) a případně .app, aby je nikdo nezabral? Je to placené a v alfě nic nevyžaduje, ale jméno je levné ochránit.
- [ČEKÁ NA RADKA] Pro němčinu bude chybět caravanix.de a pro angličtinu caravanix.com. Stačí `caravanix.eu/de/...` (nebo `.app`) s jazykovými prefixy, nebo zvážit jiné jméno, dokud je projekt v alfě a změna je levná?
