import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
  /** Text tlačítka. Povinný: ikona nikdy nestojí sama. */
  children: ReactNode;
  /** primary = tmavá měď (jedno hlavní na obrazovce), secondary = obrys, quiet = text s podtržením */
  variant?: "primary" | "secondary" | "quiet";
  /** Ikona před textem (dekorativní). */
  icon?: ReactNode;
  /** Když je zadané, vykreslí se odkaz <a> ve vzhledu tlačítka. */
  href?: string;
  /** Roztáhnout na celou šířku. */
  block?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({ children, variant = "primary", icon, href, block, className, type, ...rest }: ButtonProps) {
  const cls = ["cx-btn", `cx-btn--${variant}`, block ? "cx-btn--block" : "", className ?? ""].filter(Boolean).join(" ");
  const inner = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type ?? "button"} {...rest}>
      {inner}
    </button>
  );
}
