import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variante?: "solido" | "contorno" | "claro";
  className?: string;
};

const base =
  "group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm transition-colors duration-300 motion-reduce:transition-none";

const variantes = {
  solido: "bg-azul text-white hover:bg-azul-escuro",
  contorno:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  claro:
    "border border-white/35 text-white hover:border-white hover:bg-white hover:text-azul",
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
