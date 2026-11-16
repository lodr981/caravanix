// Generátor design tokenů: z packages/ui/src/tokens.ts složí packages/ui/src/tokens.css
// a tabulku kontrastů do docs/design/TOKENY.md (mezi značky KONTRASTY:START a KONTRASTY:END).
// Spuštění: node tools/design/tokeny.mjs   (Node 23.6+ čte TypeScript bez překladu)
// Když některý pár nesplní minimum, skript vypíše chybu a skončí kódem 1 (tokens.css se pak nezapíše).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { color, contrastPairs, contrastRatio, cssVarName, typography, space, size, radius, shadow, motion, font } from "../../packages/ui/src/tokens.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CSS_OUT = join(ROOT, "packages", "ui", "src", "tokens.css");
const MD_OUT = join(ROOT, "docs", "design", "TOKENY.md");

// Zaokrouhlení dolů, ať poměr nikdy nepřikrášlíme.
const fmt = (r) => (Math.floor(r * 100) / 100).toFixed(2).replace(".", ",");

// ---------- kontrasty ----------
const failures = [];
const rows = contrastPairs.map((p) => {
  const cells = ["light", "dark"].map((mode) => {
    const t = color[mode];
    const r = contrastRatio(t[p.fg], t[p.bg]);
    if (r < p.min) failures.push(`${p.label} (${mode === "light" ? "světlý" : "tmavý"}): ${fmt(r)} < ${String(p.min).replace(".", ",")}  [${p.fg} ${t[p.fg]} na ${p.bg} ${t[p.bg]}]`);
    return { r, hexFg: t[p.fg], hexBg: t[p.bg], ok: r >= p.min };
  });
  return { ...p, cells };
});

// ---------- CSS ----------
const vars = (obj, name = cssVarName) => Object.entries(obj).map(([k, v]) => `  ${name(k)}: ${v};`).join("\n");
const colorBlock = (mode) => `${vars(color[mode])}\n${vars(shadow[mode], (k) => `--cx-shadow-${k}`)}\n  color-scheme: ${mode};`;

const css = `/* Vygenerováno: node tools/design/tokeny.mjs z packages/ui/src/tokens.ts. Ručně neupravovat. */
:root {
${colorBlock("light")}
  --cx-font: ${font.family};
${vars(typography.size, (k) => `--cx-fs-${k}`)}
${vars(typography.lineHeight, (k) => `--cx-lh-${k}`)}
${vars(typography.tracking, (k) => `--cx-tracking-${k}`)}
  --cx-measure: ${typography.measure};
${vars(space, (k) => `--cx-space-${k}`)}
  --cx-tap: ${size.tap};
  --cx-tap-gap: ${size.tapGap};
  --cx-content: ${size.content};
  --cx-gutter: ${size.gutter};
${vars(radius, (k) => `--cx-radius-${k}`)}
  --cx-motion-fast: ${motion.fast};
  --cx-motion-base: ${motion.base};
  --cx-motion-result: ${motion.result};
  --cx-ease: ${motion.ease};
}

/* Tmavý režim: podle zařízení, pokud si člověk výslovně nevybral světlý. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${colorBlock("dark").replace(/^/gm, "  ")}
  }
}

/* Tmavý režim vybraný přepínačem. */
:root[data-theme="dark"] {
${colorBlock("dark")}
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --cx-motion-fast: 0ms;
    --cx-motion-base: 0ms;
    --cx-motion-result: 0ms;
  }
}
`;

// ---------- Markdown ----------
const swatch = (hex) => `\`${hex}\``;
const table = [
  "| Pár | Popředí | Pozadí | Min. | Světlý | Tmavý |",
  "| --- | --- | --- | --- | --- | --- |",
  ...rows.map((r) => {
    const [l, d] = r.cells;
    const c = (x) => `${fmt(x.r)}${x.ok ? "" : " **NESPLŇUJE**"}`;
    return `| ${r.label} | \`${r.fg}\` ${swatch(l.hexFg)} / ${swatch(d.hexFg)} | \`${r.bg}\` ${swatch(l.hexBg)} / ${swatch(d.hexBg)} | ${String(r.min).replace(".", ",")} | ${c(l)} | ${c(d)} |`;
  }),
].join("\n");

const block = `<!-- KONTRASTY:START (vygenerováno: node tools/design/tokeny.mjs) -->
Vzorec WCAG 2.x, poměr zaokrouhlený dolů. Hodnoty v tabulce jsou světlý / tmavý režim.

${table}

Výsledek: ${failures.length ? `**${failures.length} párů nesplňuje minimum.**` : "všechny páry splňují minimum."}
<!-- KONTRASTY:END -->`;

let md = existsSync(MD_OUT) ? readFileSync(MD_OUT, "utf8") : "# Design tokeny\n\n## Kontrasty\n\n<!-- KONTRASTY:START -->\n<!-- KONTRASTY:END -->\n";
md = md.replace(/<!-- KONTRASTY:START[\s\S]*?<!-- KONTRASTY:END -->/, block);
writeFileSync(MD_OUT, md);

if (failures.length) {
  console.error("Kontrast nesplňuje minimum:\n  " + failures.join("\n  "));
  process.exit(1);
}
writeFileSync(CSS_OUT, css);
console.log(`tokens.css zapsán, ${rows.length} párů × 2 režimy splňuje minimum. Tabulka v docs/design/TOKENY.md.`);
