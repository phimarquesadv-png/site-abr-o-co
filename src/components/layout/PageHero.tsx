"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
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
  const yGrafismo = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper">
      {/* Grafismo da marca: as ripas da fachada em render branco, à direita,
          esmaecendo para o texto. Fundo branco do arquivo some sobre o papel
          por `mix-blend-multiply`. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] mix-blend-multiply lg:block"
        style={menosMovimento ? undefined : { y: yGrafismo }}
      >
        <Image
          src="/grafismo/ripas-3d.webp"
          alt=""
          fill
          sizes="60vw"
          className="grafismo-mascara object-cover object-left"
        />
      </motion.div>
      <Container className="relative pt-32 pb-8 md:pt-40 md:pb-10">
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
