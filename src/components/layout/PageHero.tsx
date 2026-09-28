"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import TextReveal from "@/components/motion/TextReveal";

/**
 * Topo padrão das páginas internas: claro, como o timbrado. Ao rolar, o
 * conjunto se dissolve e sobe um pouco, como no Hero da home.
 */
export default function PageHero({
  rotulo,
  titulo,
  descricao,
}: {
  rotulo: string;
  titulo: string[];
  descricao?: string;
}) {
  const menosMovimento = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -32]);

  return (
    <section ref={ref} className="bg-paper">
      <Container className="pt-32 pb-8 md:pt-40 md:pb-10">
        <motion.div style={menosMovimento ? undefined : { opacity, y }}>
          <Rotulo>{rotulo}</Rotulo>
          <TextReveal
            as="h1"
            delayInicial={0.1}
            className="mt-7 max-w-4xl text-ink text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04] tracking-[-0.03em]"
            linhas={titulo}
          />
          {descricao ? (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {descricao}
            </p>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
