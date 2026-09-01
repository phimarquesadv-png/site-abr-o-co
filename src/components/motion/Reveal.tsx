"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em segundos. Use para escalonar irmãos manualmente. */
  delay?: number;
  /** Distância vertical de entrada, em pixels. Padrão do projeto: 24. */
  distancia?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Entrada em scroll: fade + translate curto, uma vez só.
 *
 * `once: true` é regra do projeto — elemento que re-anima toda vez que passa
 * pela viewport cansa o leitor e atrapalha quem está relendo um trecho.
 * Anima apenas `opacity` e `transform`, que o compositor resolve sem relayout.
 */
export default function Reveal({
  children,
  delay = 0,
  distancia = 24,
  className,
  as = "div",
}: Props) {
  const menosMovimento = useReducedMotion();
  const Componente = motion[as];

  if (menosMovimento) {
    const Estatico = as;
    return <Estatico className={className}>{children}</Estatico>;
  }

  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y: distancia }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  );
}
