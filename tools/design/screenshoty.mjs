// Screenshoty a automatická kontrola stránky webu (kontrolní seznam designéra, kapitola 7 zadání).
// Spuštění (po `npm run build`):  node tools/design/screenshoty.mjs /cs/komponenty/ komponenty
// Výstup: docs/design/kontroly/<název>/<název>-<šířka>-<režim>.jpg
// Varianty: 360, 768 a 1280 px ve světlém i tmavém režimu, plus 360 px při 200% zvětšení (CSS šířka 180 px).
// Kontroluje: vodorovné přetečení, písmo pod 15 px (v patičce pod 14 px), tenké řezy, dotykové cíle pod 48 × 48 px,
// mezery mezi cíli pod 8 px, načtení písma, tabulkové číslice a to, že uložený režim platí už při prvním vykreslení.
// Statický server je součástí skriptu (servíruje apps/web/dist), nic dalšího se nespouští.
import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIST = join(ROOT, "apps", "web", "dist");
const route = process.argv[2] ?? "/cs/";
const name = process.argv[3] ?? (route.replace(/\//g, "-").replace(/^-|-$/g, "") || "uvod");
const OUT = join(ROOT, "docs", "design", "kontroly", name);
mkdirSync(OUT, { recursive: true });

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json" };
const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    let f = join(DIST, p);
    if ((await stat(f).catch(() => null))?.isDirectory()) f = join(f, "index.html");
    const body = await readFile(f);
    res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("404");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const variants = [
  { w: 360, h: 800, scheme: "light", tag: "360-svetly" },
  { w: 360, h: 800, scheme: "dark", tag: "360-tmavy" },
  { w: 768, h: 1024, scheme: "light", tag: "768-svetly" },
  { w: 768, h: 1024, scheme: "dark", tag: "768-tmavy" },
  { w: 1280, h: 900, scheme: "light", tag: "1280-svetly" },
  { w: 1280, h: 900, scheme: "dark", tag: "1280-tmavy" },
  { w: 180, h: 400, scheme: "light", tag: "360-zoom200", dpr: 2 },
];

const browser = await chromium.launch();
let problems = 0;

for (const v of variants) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: v.dpr ?? 1, colorScheme: v.scheme, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const report = await page.evaluate(() => {
    const out = [];
    const de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) out.push(`vodorovné přetečení: ${de.scrollWidth} > ${de.clientWidth}`);
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (!r.width || cs.position === "absolute" || cs.position === "fixed" || el.closest(".cx-visually-hidden, .cx-table thead")) continue;
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        out.push(`přetéká: <${el.tagName.toLowerCase()} class="${el.getAttribute("class") ?? ""}"> ${Math.round(r.left)}–${Math.round(r.right)}`);
        break;
      }
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (seen.has(el)) continue;
      seen.add(el);
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || el.closest("[hidden], .cx-visually-hidden, .cx-skip")) continue;
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      const fs = parseFloat(cs.fontSize);
      const min = el.closest("footer") && el.closest(".cx-footer__meta") ? 14 : 15;
      if (fs < min - 0.01) out.push(`malé písmo ${fs.toFixed(1)} px: „${n.textContent.trim().slice(0, 40)}“`);
      if (+cs.fontWeight < 400) out.push(`tenký řez ${cs.fontWeight}: „${n.textContent.trim().slice(0, 40)}“`);
    }
    const sel = "button, .cx-seg__face, input:not([type=radio]), .cx-nav a, .cx-footer a, .cx-brand, a.cx-btn";
    const targets = [...document.querySelectorAll(sel)]
      .map((el) => [el, el.getBoundingClientRect()])
      .filter(([el, r]) => r.width && getComputedStyle(el).visibility !== "hidden");
    for (const [el, r] of targets)
      if (r.width < 47.5 || r.height < 47.5) out.push(`malý dotykový cíl ${Math.round(r.width)}×${Math.round(r.height)}: ${el.textContent.trim().slice(0, 30) || el.id || el.className}`);
    for (let i = 0; i < targets.length; i++)
      for (let j = i + 1; j < targets.length; j++) {
        const [a, ra] = targets[i], [b, rb] = targets[j];
        if (a.contains(b) || b.contains(a)) continue;
        const dx = Math.max(rb.left - ra.right, ra.left - rb.right);
        const dy = Math.max(rb.top - ra.bottom, ra.top - rb.bottom);
        if (dx < 7.5 && dy < 7.5) out.push(`cíle blíž než 8 px (${Math.round(Math.max(dx, dy))} px): ${a.textContent.trim().slice(0, 20) || a.className} / ${b.textContent.trim().slice(0, 20) || b.className}`);
      }
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;font-variant-numeric:tabular-nums;font-size:40px";
    document.body.append(probe);
    probe.textContent = "1111111111";
    const w1 = probe.getBoundingClientRect().width;
    probe.textContent = "0000000000";
    const w0 = probe.getBoundingClientRect().width;
    probe.remove();
    if (Math.abs(w1 - w0) > 0.5) out.push("písmo nemá tabulkové číslice");
    if (!document.fonts.check('16px "IBM Plex Sans"') || ![...document.fonts].some((f) => f.status === "loaded")) out.push("písmo IBM Plex Sans se nenačetlo");
    const want = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    if (de.getAttribute("data-theme") !== want) out.push(`data-theme ${de.getAttribute("data-theme")} neodpovídá zařízení (${want})`);
    if (!document.querySelector("[data-cx-theme-toggle]")?.getBoundingClientRect().width) out.push("přepínač režimu není vidět");
    return out;
  });
  report.push(...consoleErrors.map((e) => `chyba v konzoli: ${e.slice(0, 120)}`));
  const file = `${name}-${v.tag}.jpg`;
  await page.screenshot({ path: join(OUT, file), fullPage: true, type: "jpeg", quality: 72 });
  const uniq = [...new Set(report)];
  console.log(`${uniq.length ? "PROBLÉM" : "ok     "} ${file}${uniq.length ? "\n   - " + uniq.join("\n   - ") : ""}`);
  problems += uniq.length;
  await ctx.close();
}

// Přepínač režimu: volba se uloží, platí hned po načtení (bez bliknutí) a stejná volba jako zařízení se smaže.
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, colorScheme: "light", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + route);
  const out = [];
  await page.click("[data-cx-theme-toggle]");
  if ((await page.evaluate(() => localStorage.getItem("cx-theme"))) !== "dark") out.push("po kliknutí se volba dark neuložila");
  // Při dalším načtení: barva pozadí musí být tmavá už v prvním snímku (měřeno při DOMContentLoaded, před load).
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      window.__firstBg = getComputedStyle(document.body).backgroundColor;
      window.__firstTheme = document.documentElement.getAttribute("data-theme");
    });
  });
  await page.reload();
  const first = await page.evaluate(() => [window.__firstTheme, window.__firstBg]);
  if (first[0] !== "dark" || first[1] === "rgb(246, 244, 240)") out.push(`po načtení se ukázal špatný režim: ${first.join(", ")}`);
  await page.click("[data-cx-theme-toggle]");
  if ((await page.evaluate(() => localStorage.getItem("cx-theme"))) !== null) out.push("volba shodná se zařízením se nesmazala");
  if ((await page.evaluate(() => document.documentElement.getAttribute("data-theme"))) !== "light") out.push("druhé kliknutí nevrátilo světlý režim");
  const cookies = await ctx.cookies();
  if (cookies.length) out.push(`stránka nastavila cookie: ${cookies.map((c) => c.name).join(", ")}`);
  console.log(`${out.length ? "PROBLÉM" : "ok     "} přepínač režimu (uložení, bez bliknutí, návrat k zařízení, žádná cookie)${out.length ? "\n   - " + out.join("\n   - ") : ""}`);
  problems += out.length;
  await ctx.close();
}

await browser.close();
server.close();
console.log(problems ? `\nNalezeno problémů: ${problems}` : "\nBez nálezů.");
process.exit(problems ? 1 : 0);
