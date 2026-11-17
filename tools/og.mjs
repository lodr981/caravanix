// Náhledy odkazů (og:image) pro stránky kalkulaček: karta výsledku 1200 × 630 z výchozího příkladu.
// Čísla počítá engine, kartu kreslí shareImageSvg z packages/ui; PNG vyrobí Chromium z Playwrightu.
// Spuštění: node tools/og.mjs  (výstup apps/web/public/og/*.png)
import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import * as E from "../packages/engine/src/index.ts";
import { shareImageSvg } from "../packages/ui/src/shareImage.ts";

const t = JSON.parse(readFileSync(new URL("../content/cs/kalkulacky-alfa.json", import.meta.url), "utf8"));
const NB = " ";
const f = (x, d = 0) => x.toLocaleString("cs-CZ", { maximumFractionDigits: d }).replace(/\s/g, NB);
const pata = t["spol.kartaPaticka"];
const url = (s) => `caravanix · ${s}`;

const sb = E.sobestacnost({ mesto: "praha", mesic: 7, panelyWp: 200, kapacitaAh: 200, napeti: 12, WhDenne: 800 });
const ba = E.potrebnaBaterie({ WhDenne: 800, dnyAutonomie: 3, napeti: 12 });
const sp = E.bilanceSpotrebicu({ napeti: 12, polozky: [{ prikonW: 45, hodinDenne: 12, na230V: false }, { prikonW: 10.2, hodinDenne: 4, na230V: false }, { prikonW: 30, hodinDenne: 6, na230V: true }] });
const bo = E.nabitiZJizdy({ napeti: 12, proudBoosteruA: 30, hodinJizdyDenne: 3, kapacitaAh: 200, startProc: 30, koeficient: 0.85 });
const me = E.navrhMenice({ napeti: 12, spotrebice: [{ prikonW: 1260 }, { prikonW: 30 }] });
const so = E.zapojeniPanelu({ panel: { Voc: 22.3, Isc: 8.69, Vmp: 18.2, Imp: 8.25, Wp: 150, koefVocProcNaK: -0.35 }, serie: 2, paralel: 1, regulator: { maxVstupV: 100, maxVstupA: 30 } });
const pr = E.navrhVodice({ napeti: 12, rezim: "P", hodnota: 60, delka: 5, ubytekProc: 3, zpetny: 2, prostredi: "n" });

const karty = {
  "kalkulacka-sobestacnosti": { title: t["sb.h1"], inputs: `Praha · červenec · 200 Wp · 200 Ah · 800 Wh/den`, primary: { label: t["sb.dnyLabel"], value: f(sb.dnyBezPripojky), unit: "dní" }, secondary: [{ label: t["sb.vyroba"], value: f(sb.vyrobaWhDen), unit: "Wh" }, { label: t["sb.bilance"], value: f(sb.bilanceWhDen).replace(/^-/, "−"), unit: "Wh" }] },
  "kalkulacka-baterie": { title: t["ba.h1"], inputs: "800 Wh/den · 3 dny · 12 V", primary: { label: t["ba.kapacita"], value: f(ba.AhZaokrouhleno), unit: "Ah" } },
  "kalkulacka-spotrebicu": { title: t["sp.h1"], inputs: "Lednice · světla · notebook", primary: { label: t["sp.denne"], value: f(sp.WhDenne), unit: "Wh" }, secondary: [{ label: "Ah", value: f(sp.AhDenne), unit: "Ah" }] },
  "kalkulacka-boosteru": { title: t["bo.h1"], inputs: "30 A · 3 h po dálnici · 200 Ah z 30 %", primary: { label: t["bo.denne"], value: f(bo.WhDenne), unit: "Wh" }, secondary: [{ label: t["bo.prumer"], value: f(bo.prumernyProudA, 1), unit: "A" }, { label: t["bo.konec"], value: f(bo.konecProc), unit: "%" }] },
  "kalkulacka-menice": { title: t["me.h1"], inputs: "Kávovar · notebook", primary: { label: t["me.trvaly"], value: f(me.trvalyVykonW), unit: "W" }, secondary: [{ label: t["me.proud"], value: f(me.proudZBaterie), unit: "A" }] },
  "kalkulacka-solaru": { title: t["so.h1"], inputs: "2 × 150 Wp do série · −20 °C · regulátor 100 V", primary: { label: t["so.vocMraz"], value: f(so.VocMraz, 1), unit: "V" }, secondary: [{ label: t["so.vykon"], value: f(so.WpPole), unit: "Wp" }] },
  "kalkulacka-prurezu": { title: "Průřez kabelu a pojistka", inputs: "Lednice 60 W · 5 m · 12 V", primary: { label: "Průřez kabelu", value: f(pr.prurez, 2), unit: "mm²" }, secondary: [{ label: "Pojistka", value: f(pr.pojistka, 1), unit: "A" }] },
};

const out = new URL("../apps/web/public/og/", import.meta.url);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [slug, k] of Object.entries(karty)) {
  const svg = shareImageSvg({ ...k, brand: "Caravanix", footer: pata, url: url(slug.replace("kalkulacka-", "")) });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: new URL(`${slug}.png`, out).pathname.replace(/^\/([A-Za-z]:)/, "$1"), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log("og:", slug);
}
await browser.close();
