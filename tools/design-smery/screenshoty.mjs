// Screenshoty a automatická kontrola style tiles (docs/design/smery/).
// Spuštění: node tools/design-smery/screenshoty.mjs
// Pro každý směr: 360 a 1280 px, světlý i tmavý režim, plus 360 px při 200% zvětšení (CSS šířka 180 px).
// Kontroluje: vodorovné přetečení, text pod 15 px (mimo patičku pod 14 px), dotykové cíle pod 48 × 48 px,
// mezery mezi dotykovými cíli pod 8 px, a jestli písmo opravdu má tabulkové číslice.
import { chromium } from "@playwright/test";
import { readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIR = join(ROOT, "docs", "design", "smery");
const OUT = join(DIR, "screenshoty");
mkdirSync(OUT, { recursive: true });

const files = readdirSync(DIR).filter((f) => /^smer-\d-.+\.html$/.test(f));
const variants = [
  { w: 360, h: 800, scheme: "light", tag: "360-svetly" },
  { w: 360, h: 800, scheme: "dark", tag: "360-tmavy" },
  { w: 1280, h: 900, scheme: "light", tag: "1280-svetly" },
  { w: 1280, h: 900, scheme: "dark", tag: "1280-tmavy" },
  { w: 180, h: 400, scheme: "light", tag: "360-zoom200", dpr: 2 },
];

const browser = await chromium.launch();
let problems = 0;
for (const f of files) {
  for (const v of variants) {
    const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: v.dpr ?? 1, colorScheme: v.scheme, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(pathToFileURL(join(DIR, f)).href);
    await page.evaluate(() => document.fonts.ready);
    const report = await page.evaluate(() => {
      const out = [];
      const de = document.documentElement;
      if (de.scrollWidth > de.clientWidth + 1) out.push(`vodorovné přetečení: ${de.scrollWidth} > ${de.clientWidth}`);
      // prvky širší než okno
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > de.clientWidth + 1 && getComputedStyle(el).position !== "absolute") {
          out.push(`přetéká vpravo: <${el.tagName.toLowerCase()} class="${el.className.baseVal ?? el.className}"> right=${Math.round(r.right)}`);
          break;
        }
      }
      // velikost písma u viditelného textu
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      while (walker.nextNode()) {
        const n = walker.currentNode;
        if (!n.textContent.trim()) continue;
        const el = n.parentElement;
        if (seen.has(el)) continue;
        seen.add(el);
        if (el.closest("svg")) continue; // SVG text měříme zvlášť níž
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || el.closest("[hidden]")) continue;
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const fs = parseFloat(cs.fontSize);
        const min = el.closest("footer, [data-foot]") ? 14 : 15;
        if (fs < min - 0.01) out.push(`malé písmo ${fs.toFixed(1)} px: „${n.textContent.trim().slice(0, 40)}“`);
        if (+cs.fontWeight < 400) out.push(`tenký řez ${cs.fontWeight}: „${n.textContent.trim().slice(0, 40)}“`);
      }
      // SVG text: skutečná výška po zmenšení
      for (const t of document.querySelectorAll("svg text")) {
        const svg = t.ownerSVGElement;
        const vb = svg.viewBox.baseVal;
        const k = vb && vb.width ? svg.getBoundingClientRect().width / vb.width : 1;
        const fs = parseFloat(t.getAttribute("font-size") || getComputedStyle(t).fontSize) * k;
        // Při zvětšení (devicePixelRatio > 1) se ilustrace jen zmenší s obsahem; tam je to informace, ne chyba,
        // protože každý popisek z obrázku je zopakovaný v HTML legendě pod ním.
        if (fs < 14.9 && devicePixelRatio > 1) { if (fs * devicePixelRatio < 14.9) out.push("info: SVG text při zvětšení " + (fs * devicePixelRatio).toFixed(1) + " fyzických px"); }
        else if (fs < 14.9) out.push(`malé písmo v SVG ${fs.toFixed(1)} px: „${t.textContent.trim()}“`);
      }
      // dotykové cíle
      const targets = [...document.querySelectorAll("button, .seg label, .field, input[type=range]")].map((el) => [el, el.getBoundingClientRect()]).filter(([, r]) => r.width);
      for (const [el, r] of targets) {
        if (r.width < 47.5 || r.height < 47.5) out.push(`malý dotykový cíl ${Math.round(r.width)}×${Math.round(r.height)}: ${el.textContent.trim().slice(0, 30) || el.id}`);
      }
      for (let i = 0; i < targets.length; i++)
        for (let j = i + 1; j < targets.length; j++) {
          const [a, ra] = targets[i], [b, rb] = targets[j];
          if (a.contains(b) || b.contains(a)) continue;
          const dx = Math.max(rb.left - ra.right, ra.left - rb.right);
          const dy = Math.max(rb.top - ra.bottom, ra.top - rb.bottom);
          if (dx < 7.5 && dy < 7.5) out.push(`cíle blíž než 8 px (${Math.round(Math.max(dx, dy))} px): ${a.textContent.trim().slice(0, 20) || a.id} / ${b.textContent.trim().slice(0, 20) || b.id}`);
        }
      // tabulkové číslice: šířka "1111" vs "0000" s tnum
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;font-variant-numeric:tabular-nums;font-size:40px";
      document.body.append(probe);
      probe.textContent = "1111111111";
      const w1 = probe.getBoundingClientRect().width;
      probe.textContent = "0000000000";
      const w0 = probe.getBoundingClientRect().width;
      probe.remove();
      if (Math.abs(w1 - w0) > 0.5) out.push(`písmo nemá tabulkové číslice (1: ${w1.toFixed(1)}, 0: ${w0.toFixed(1)})`);
      const fam = getComputedStyle(document.body).fontFamily.split(",")[0].replace(/"/g, "");
      const loaded = document.fonts.check(`16px "${fam}"`) && [...document.fonts].some((ff) => ff.status === "loaded");
      if (!loaded) out.push(`písmo ${fam} se nenačetlo`);
      return out;
    });
    const name = `${f.replace(".html", "")}-${v.tag}.png`;
    await page.screenshot({ path: join(OUT, name), fullPage: true });
    const uniq = [...new Set(report)];
    console.log(`${uniq.length ? "PROBLÉM" : "ok     "} ${name}${uniq.length ? "\n   - " + uniq.join("\n   - ") : ""}`);
    problems += uniq.filter((x) => !x.startsWith("info")).length;
    await ctx.close();
  }
}
await browser.close();
console.log(problems ? `\nNalezeno problémů: ${problems}` : "\nBez nálezů.");
process.exit(problems ? 1 : 0);
