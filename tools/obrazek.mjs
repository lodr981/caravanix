// Rastrové obrázky přes Mistral (Agents API, nástroj image_generation; docs/design/VIZUAL.md).
// Použití: node tools/obrazek.mjs <nazev> "<prompt>" [pocet=4]
// Výstup: apps/web/public/obrazky/<nazev>/v<n>.png, .webp (1200 a 600 px) a meta.json (prompt, datum, model),
// řádek do docs/licence/EVIDENCE.md. Klíč MISTRAL_API_KEY z prostředí nebo ze souboru .env.
// Nikdy: loga, skutečné výrobky, technické zapojení, lidé podobní skutečným osobám, text v obrázku.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const API = "https://api.mistral.ai/v1";
const MODEL = "mistral-medium-latest";
const MAX_POCET = 4;

const [nazev, prompt, pocetArg] = process.argv.slice(2);
if (!nazev || !prompt || !/^[a-z0-9-]+$/.test(nazev)) {
  console.error('Použití: node tools/obrazek.mjs <nazev-a-z0-9-> "<prompt>" [pocet 1–4]');
  process.exit(1);
}
const pocet = Math.min(MAX_POCET, Math.max(1, Number(pocetArg ?? 4) || 4));

let klic = process.env.MISTRAL_API_KEY;
if (!klic && existsSync(".env")) klic = readFileSync(".env", "utf8").match(/^MISTRAL_API_KEY=(.+)$/m)?.[1]?.trim();
if (!klic) {
  console.error("Chybí MISTRAL_API_KEY – rastrové obrázky přeskočte (docs/design/VIZUAL.md).");
  process.exit(2);
}
const hlavicky = { Authorization: `Bearer ${klic}`, "Content-Type": "application/json" };

async function api(cesta, telo) {
  const r = await fetch(`${API}${cesta}`, { method: "POST", headers: hlavicky, body: JSON.stringify(telo) });
  if (!r.ok) throw new Error(`${cesta}: HTTP ${r.status} ${await r.text()}`);
  return r.json();
}

const ZAKAZY =
  " Style constraints: no text, no letters, no logos, no brand names, no real products, no electrical wiring or technical details, no real or recognizable people.";

const agent = await api("/agents", {
  model: MODEL,
  name: "Caravanix ilustrace",
  instructions: "Use the image generation tool to create exactly one image for each request. Do not add text to images.",
  tools: [{ type: "image_generation" }],
});

const slozka = `apps/web/public/obrazky/${nazev}`;
mkdirSync(slozka, { recursive: true });
const meta = { nazev, prompt, model: `${MODEL} + image_generation (FLUX1.1 [pro] Ultra podle Mistralu)`, datum: new Date().toISOString().slice(0, 10), varianty: [] };

for (let i = 1; i <= pocet; i++) {
  const odpoved = await api("/conversations", { agent_id: agent.id, inputs: prompt + ZAKAZY });
  const soubor = odpoved.outputs
    ?.flatMap((o) => (Array.isArray(o.content) ? o.content : []))
    .find((c) => c.type === "tool_file" && c.file_id);
  if (!soubor) {
    console.error(`varianta ${i}: obrázek v odpovědi chybí`);
    continue;
  }
  const r = await fetch(`${API}/files/${soubor.file_id}/content`, { headers: { Authorization: `Bearer ${klic}` } });
  if (!r.ok) throw new Error(`stažení ${soubor.file_id}: HTTP ${r.status}`);
  const png = Buffer.from(await r.arrayBuffer());
  const zaklad = `${slozka}/v${i}`;
  writeFileSync(`${zaklad}.png`, png);
  await sharp(png).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${zaklad}-1200.webp`);
  await sharp(png).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${zaklad}-600.webp`);
  meta.varianty.push({ soubor: `v${i}`, file_id: soubor.file_id });
  console.log(`varianta ${i}: ${zaklad}.png`);
}

writeFileSync(`${slozka}/meta.json`, JSON.stringify(meta, null, 2) + "\n");
appendFileSync(
  "docs/licence/EVIDENCE.md",
  `| apps/web/public/obrazky/${nazev}/ | AI obrázek (Mistral) | vygeneroval Caravanix, prompt v meta.json | výstup patří uživateli (podmínky Mistralu); čistě AI obrázek v EU nemá autorskou ochranu | ${meta.datum} | ${meta.varianty.length} varianty; bez log, výrobků a osob |\n`,
);
console.log(`hotovo: ${meta.varianty.length} variant v ${slozka}`);
