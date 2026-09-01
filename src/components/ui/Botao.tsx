import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variante?: "solido" | "contorno" | "claro";
  className?: string;
};

const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 motion-reduce:transition-none";

const variantes = {
  solido: "bg-brass text-white hover:bg-brass-bright",
  contorno:
    "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink hover:text-paper",
  claro:
    "border border-on-dark/25 text-on-dark hover:border-on-dark/70 hover:bg-on-dark hover:text-ink",
};

export default function Botao({
  href,
  children,
  variante = "solido",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${base} ${variantes[variante]} ${className}`}>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        →
      </span>
    </Link>
  );
}
