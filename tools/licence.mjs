// Brána licencí závislostí (rozhodnutí Radka 16. 11. 2026):
// - produkční závislosti (vše, co jde do webu): jen MIT, BSD, Apache-2.0, OFL-1.1;
// - vývojové závislosti (nástroje, do webu nejdou): navíc MPL-2.0;
// - cokoli jiného jen s výjimkou v docs/licence/VYJIMKY_ZAVISLOSTI.json, kterou schválil Radek.
// Použití: node tools/licence.mjs [--vypis-kandidatu]
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const POVOLENE = new Set(["MIT", "BSD-2-Clause", "BSD-3-Clause", "Apache-2.0", "OFL-1.1"]);
const POVOLENE_VYVOJ = new Set([...POVOLENE, "MPL-2.0"]);
const VYJIMKY_SOUBOR = "docs/licence/VYJIMKY_ZAVISLOSTI.json";

function balicky(jenProdukcni) {
  const out = execSync(`npm ls --all --parseable ${jenProdukcni ? "--omit=dev" : ""}`, {
    encoding: "utf8",
    maxBuffer: 1e8,
  });
  const vysledek = new Map();
  for (const dir of out.trim().split(/\r?\n/)) {
    let pkg;
    try {
      pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    } catch {
      continue;
    }
    if (pkg.name === "caravanix" || pkg.name?.startsWith("@caravanix/")) continue; // vlastní kód
    const licence = typeof pkg.license === "string" ? pkg.license : JSON.stringify(pkg.license ?? pkg.licenses ?? null);
    vysledek.set(`${pkg.name}@${pkg.version}`, { nazev: pkg.name, verze: pkg.version, licence });
  }
  return vysledek;
}

const vyjimky = JSON.parse(readFileSync(VYJIMKY_SOUBOR, "utf8"));
const schvalena = (b) =>
  vyjimky.some((v) => v.balicek === b.nazev && v.licence === b.licence && v.schvaleno === true);

const produkcni = balicky(true);
const vsechny = balicky(false);
const chyby = [];
const kandidati = [];

for (const [id, b] of produkcni) {
  if (!POVOLENE.has(b.licence)) chyby.push(`produkční ${id}: ${b.licence} (v produkčním buildu nepovoleno)`);
}
for (const [id, b] of vsechny) {
  if (produkcni.has(id)) continue;
  if (POVOLENE_VYVOJ.has(b.licence)) continue;
  if (schvalena(b)) continue;
  chyby.push(`vývojová ${id}: ${b.licence} (chybí schválená výjimka)`);
  kandidati.push({ balicek: b.nazev, licence: b.licence });
}

if (process.argv.includes("--vypis-kandidatu")) {
  const uniq = [...new Map(kandidati.map((k) => [k.balicek + k.licence, k])).values()];
  console.log(JSON.stringify(uniq, null, 2));
  process.exit(0);
}

console.log(`Licence: ${produkcni.size} produkčních, ${vsechny.size - produkcni.size} vývojových balíčků.`);
if (chyby.length) {
  for (const c of chyby) console.log("  ✗ " + c);
  process.exit(1);
}
console.log("  ✓ všechny licence v pořádku");
