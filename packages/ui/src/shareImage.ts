// Karta výsledku ke sdílení jako SVG 1200 × 630 (podpisový prvek 2 v docs/design/VIZUAL.md).
// Čistá funkce: dostane už naformátované texty z výsledku enginu, vrací SVG řetězec.
// Stejná funkce slouží v prohlížeči (obrázek ke stažení a sdílení) i při sestavení (náhledy odkazů).
import { color } from "./tokens.ts";

export interface ShareValue {
  label: string;
  value: string;
  unit?: string;
}

export interface ShareImageInput {
  brand: string;
  /** Název kalkulačky, např. „Soběstačnost“. */
  title: string;
  /** Krátké shrnutí zadání, např. „Praha · červenec · 200 Wp · 100 Ah“. */
  inputs: string;
  primary: ShareValue;
  secondary?: ShareValue[];
  /** Upozornění dole, např. „Podklad, ne revize.“ */
  footer: string;
  url: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FONT = "'IBM Plex Sans', 'Segoe UI', Arial, sans-serif";

export function shareImageSvg(d: ShareImageInput): string {
  const c = color.dark;
  const sec = (d.secondary ?? []).slice(0, 3);
  const sloupce = sec
    .map((v, i) => {
      const x = 80 + i * 340;
      return `<text x="${x}" y="470" font-size="26" fill="${c.displayMuted}" font-family="${FONT}">${esc(v.label)}</text>
<text x="${x}" y="530" font-size="56" font-weight="700" fill="${c.displayText}" font-family="${FONT}">${esc(v.value)}<tspan font-size="30" fill="${c.displayAccent}" dx="8">${esc(v.unit ?? "")}</tspan></text>`;
    })
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${c.displayBg}"/>
<rect x="0" y="0" width="1200" height="8" fill="${c.copper}"/>
<circle cx="96" cy="84" r="18" fill="none" stroke="${c.displayAccent}" stroke-width="5"/>
<circle cx="96" cy="84" r="6" fill="${c.displayAccent}"/>
<text x="128" y="96" font-size="34" font-weight="700" fill="${c.displayText}" font-family="${FONT}">${esc(d.brand)}</text>
<text x="1120" y="96" font-size="28" text-anchor="end" fill="${c.displayMuted}" font-family="${FONT}">${esc(d.title)}</text>
<text x="80" y="168" font-size="28" fill="${c.displayMuted}" font-family="${FONT}">${esc(d.inputs)}</text>
<text x="80" y="232" font-size="30" fill="${c.displayMuted}" font-family="${FONT}">${esc(d.primary.label)}</text>
<text x="80" y="370" font-size="150" font-weight="700" fill="${c.displayText}" font-family="${FONT}">${esc(d.primary.value)}<tspan font-size="64" fill="${c.displayAccent}" dx="16">${esc(d.primary.unit ?? "")}</tspan></text>
<line x1="80" y1="410" x2="1120" y2="410" stroke="${c.displayMuted}" stroke-opacity="0.5" stroke-width="2"/>
${sloupce}
<text x="80" y="596" font-size="24" fill="${c.displayMuted}" font-family="${FONT}">${esc(d.footer)}</text>
<text x="1120" y="596" font-size="24" text-anchor="end" fill="${c.displayAccent}" font-family="${FONT}">${esc(d.url)}</text>
</svg>`;
}
