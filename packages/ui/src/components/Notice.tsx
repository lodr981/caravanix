import type { ReactNode } from "react";
import { IconBlock, IconOk, IconWarn } from "../icons.tsx";

export type Status = "ok" | "warn" | "block";

export const STATUS_ICON = { ok: IconOk, warn: IconWarn, block: IconBlock } as const;

export type NoticeProps = {
  /** OK, varování, nebo blok. Stav se nikdy nesděluje jen barvou: vždy barva, ikona a slovo. */
  kind: Status;
  /** Slovo stavu, např. „V pořádku“, „Pozor“, „Stop“. Povinné. */
  word: ReactNode;
  /** Vysvětlení: co to znamená a co dělat. */
  children?: ReactNode;
  /** Ohlásit změnu čtečce (pro hlášky, které se mění podle zadání). Blok se ohlásí důrazněji. */
  live?: boolean;
  className?: string;
};

/** Hláška OK / varování / blok: barva, ikona a slovo. */
export function Notice({ kind, word, children, live, className }: NoticeProps) {
  const Icon = STATUS_ICON[kind];
  const role = live ? (kind === "block" ? "alert" : "status") : undefined;
  return (
    <div className={`cx-notice cx-notice--${kind}${className ? " " + className : ""}`} role={role}>
      <Icon className="cx-notice__icon" />
      <div className="cx-notice__body">
        <p className="cx-notice__word">{word}</p>
        {children ? <div className="cx-notice__text">{children}</div> : null}
      </div>
    </div>
  );
}
