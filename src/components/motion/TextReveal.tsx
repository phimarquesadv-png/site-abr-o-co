"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  /** Uma entrada por linha. A quebra é decidida aqui, não pelo navegador. */
  linhas: string[];
  className?: string;
  delayInicial?: number;
  as?: "h1" | "h2" | "p";
};

/**
 * Revelação de texto linha a linha, com máscara.
 *
 * Cada linha vive dentro de um contêiner com `overflow: hidden`; o texto sobe
 * de baixo da máscara. Passamos as linhas prontas em vez de medir o texto em
 * runtime — medir causa um salto de layout no primeiro quadro, que é
 * exatamente o CLS que a gente quer evitar.
 */
export default function TextReveal({
  linhas,
  className,
  delayInicial = 0,
  as = "h1",
}: Props) {
  const menosMovimento = useReducedMotion();
  const Tag = as;

  if (menosMovimento) {
    return (
      <Tag className={className}>
        {linhas.map((linha, i) => (
          <span key={i} className="block">
            {linha}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag className={className} initial="oculto" animate="visivel">
      {linhas.map((linha, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            variants={{
              oculto: { y: "110%" },
              visivel: { y: "0%" },
            }}
            transition={{
              duration: 0.85,
              delay: delayInicial + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {linha}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
