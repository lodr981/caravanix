---
id: K-VYROBCE-0001
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Secop (dříve Danfoss) pro elektroniku kompresoru BD35F.2 předepisuje průřez napájecího kabelu podle délky baterie–elektronika: 12 V 2,5 / 4 / 6 / 10 mm² do 2,5 / 4 / 6 / 10 m, 24 V do 5 / 8 / 12 / 20 m; pojistku 15 A co nejblíž baterii; ochranu baterie 10,4 V vyp. / 11,7 V zap. (24 V: 22,8 / 24,2 V); rozběhový proud 20 A."
hodnota: null
jednotka: "mm², m"
rozsah: null
podminky: "Délka = vzdálenost baterie–elektronická jednotka (jedna cesta), plus i minus vedené kabelem. Elektronika 101N0226 pro kompresory BD35F.2 a BD35K.2, 12/24 V DC. Ochrana baterie měří napětí na svorkách + a − elektroniky, tedy za úbytkem v kabelu."
zdroje:
  - typ: navod
    nazev: "Secop: Instructions, Electronic Unit for BD35F.2, BD35K.2 Compressors, 101N0226, 12/24V DC (04/2025, DES.I.102.L1.02)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f2_bd35k2_electronic_unit_101n0226_12-24vdc_04-2025_desi102l102.pdf"
    misto: "Jediný list. Fig. 2 Wire Dimensions DC: 2,5 mm² (AWG 13) 12 V 2,5 m / 24 V 5 m; 4 mm² (12) 4 / 8 m; 6 mm² (10) 6 / 12 m; 10 mm² (8) 10 / 20 m; poznámka *Length between battery and electronic unit. Fig. 3 Standard battery protection settings: 12 V cut-out 10,4 V, cut-in 11,7 V; 24 V 22,8 / 24,2 V. Odstavec Power supply: 15A fuse for 12V and for 24V circuits is mandatory, co nejblíž baterii; hlavní vypínač min. 20 A; rozměry z Fig. 2 dodržet; vyhnout se dalším spojům, aby úbytek napětí neovlivnil nastavení ochrany baterie. Technical data: Start current 20A, Output power 100W."
    datum-overeni: 2026-11-18
vypocet: "12 V: v každém řádku délka/průřez = 1 m/mm², smyčka tam i zpět R = 0,0175 × 2 × 1 = 0,035 Ω bez ohledu na řádek. Úbytek: při 8,7 A (max. proud BD50F, viz K-VYROBCE-0002) 0,30 V = 2,5 %; při 10,3 A 0,36 V = 3 %; při pojistce 15 A 0,53 V = 4,4 %; při rozběhu 20 A 0,70 V = 5,8 %. 24 V: délka/průřez = 2 m/mm², R = 0,070 Ω; při polovičním proudu 4,35 A 0,30 V = 1,3 %; při 10 A rozběhu (polovina) 0,70 V = 2,9 %. Tabulka tedy drží stejný absolutní úbytek (asi 0,3 V v plném chodu, 0,7 V při rozběhu) na 12 i 24 V."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0001-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Zdroj je originální PDF výrobce kompresoru, text vytažen z PDF (pdftotext). Návod k původní elektronice BD35F (101N0210/0212/0630) se otevřít nepodařilo (404 nebo blokováno); tabulka v datasheetu BD50F (K-VYROBCE-0002) je ale shodná, takže ji považuji za platnou pro celou řadu BD35F/BD50F.

Proč je průřez větší než z naší kalkulačky: Secop nedimenzuje na provozní příkon lednice (u 45 W lednice 3,75 A), ale na proud blízký pojistce a rozběhu (tabulka odpovídá 3 % při 10 A, nebo 5,8 % při rozběhových 20 A). Důvod uvádí sám: úbytek v kabelu nesmí ovlivnit ochranu baterie, která měří napětí na svorkách elektroniky. Při rozběhu s poddimenzovaným kabelem napětí na svorkách spadne pod 10,4 V a kompresor se vypne, i když baterie má dost (chybový kód 1, opakované starty).

Pozor: u 24 V předepisuje tento návod pojistku 15 A, datasheet BD50F 7,5 A. Rozdíl nepodstatný pro průřez.
