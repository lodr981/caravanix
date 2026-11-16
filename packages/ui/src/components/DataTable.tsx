import type { ReactNode } from "react";

export type DataColumn = {
  key: string;
  header: ReactNode;
  /** Text záhlaví pro úzké okno, kde se řádek skládá pod sebe (výchozí: header, pokud je to text). */
  shortHeader?: string;
  /** Čísla zarovnat vpravo (tabulkové číslice platí v tabulce vždy). */
  numeric?: boolean;
};

export type DataTableProps = {
  /** Titulek tabulky (caption). Povinný kvůli přístupnosti. */
  caption: ReactNode;
  columns: DataColumn[];
  rows: Record<string, ReactNode>[];
  /** Klíč sloupce, který je záhlavím řádku (th scope="row"). Výchozí první sloupec. */
  rowHeader?: string;
  /** Klíč řádku, který se má zvýraznit (např. vybraný průřez). */
  highlightIndex?: number;
  /** Poznámka pod tabulkou (zdroj, vysvětlivky). */
  note?: ReactNode;
};

/**
 * Tabulka. Na úzkém okně (pod 34 rem, tedy i 360 px při 200% zvětšení) se každý řádek skládá pod sebe
 * s popiskem sloupce u hodnoty; nic se neposouvá do strany. Role jsou uvedené výslovně, aby tabulka
 * zůstala tabulkou pro čtečky i po změně zobrazení.
 */
export function DataTable({ caption, columns, rows, rowHeader, highlightIndex, note }: DataTableProps) {
  const headKey = rowHeader ?? columns[0]?.key;
  const text = (c: DataColumn) => c.shortHeader ?? (typeof c.header === "string" ? c.header : "");
  return (
    <figure className="cx-table">
      <table role="table">
        <caption>{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((c) => (
              <th key={c.key} role="columnheader" scope="col" className={c.numeric ? "cx-table__num" : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((r, i) => (
            <tr key={i} role="row" className={i === highlightIndex ? "cx-table__hl" : undefined} aria-current={i === highlightIndex ? "true" : undefined}>
              {columns.map((c) =>
                c.key === headKey ? (
                  <th key={c.key} role="rowheader" scope="row" data-label={text(c)} className={c.numeric ? "cx-table__num" : undefined}>
                    {r[c.key]}
                  </th>
                ) : (
                  <td key={c.key} role="cell" data-label={text(c)} className={c.numeric ? "cx-table__num" : undefined}>
                    {r[c.key]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <figcaption className="cx-table__note">{note}</figcaption> : null}
    </figure>
  );
}
