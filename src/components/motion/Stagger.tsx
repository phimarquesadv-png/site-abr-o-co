"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Lista que entra escalonada. Use `StaggerItem` nos filhos diretos.
 * Intervalo do projeto: 70ms entre itens — rápido o bastante para não
 * parecer que o site está carregando devagar.
 */
export function Stagger({
  children,
  className,
  intervalo = 0.07,
}: {
  children: ReactNode;
  className?: string;
  intervalo?: number;
}) {
  const menosMovimento = useReducedMotion();

  if (menosMovimento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        oculto: {},
        visivel: { transition: { staggerChildren: intervalo } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const menosMovimento = useReducedMotion();

  if (menosMovimento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        oculto: { opacity: 0, y: 20 },
        visivel: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
