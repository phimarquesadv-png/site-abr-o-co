"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Transição entre páginas: fade curto no conteúdo a cada mudança de rota.
 *
 * Curto de propósito (0,35s). Transição de página longa é a animação que mais
 * irrita em uso repetido — quem navega três páginas seguidas paga o custo três
 * vezes e não ganha nada.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const rota = usePathname();
  const menosMovimento = useReducedMotion();

  if (menosMovimento) return <>{children}</>;

  return (
    <motion.div
      key={rota}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
