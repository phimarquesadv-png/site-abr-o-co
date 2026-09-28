"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";

/**
 * Três afirmações curtas, uma por pilar da Análise 360º. O texto completo
 * de cada pilar fica em Atuação.
 */
const linhas = [
  "Segurança na tese.",
  "Dupla checagem no número.",
  "Resultado no caixa.",
];

function Palavra({
  texto,
  progresso,
  inicio,
  fim,
}: {
  texto: string;
  progresso: MotionValue<number>;
  inicio: number;
  fim: number;
}) {
  const opacity = useTransform(progresso, [inicio, fim], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {texto}
    </motion.span>
  );
}

/**
 * Manifesto em scroll: as palavras se acendem uma a uma conforme o leitor
 * desce, do apagado ao branco. É o ritmo de leitura ditado pela mão do
 * leitor, não por um timer. Com menos movimento, o texto já vem inteiro.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const menosMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 20%"],
  });
  const yGrafismo = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const n = linhas.reduce((t, l) => t + l.split(" ").length, 0);
  const antes = linhas.map((_, li) =>
    linhas.slice(0, li).reduce((t, l) => t + l.split(" ").length, 0),
  );

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-on-dark md:py-36">
      {/* Grafismo da marca em traço: as ripas em linha branca sobre o
          escuro (`mix-blend-screen` some com o preto do arquivo). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 hidden h-full w-[50%] opacity-30 mix-blend-screen lg:block"
        style={menosMovimento ? undefined : { y: yGrafismo }}
      >
        <Image
          src="/grafismo/ripas-2d-branco.webp"
          alt=""
          fill
          sizes="60vw"
          className="object-contain object-right-top"
        />
      </motion.div>
      <Container className="relative">
        <Reveal>
          <Rotulo claro>Como trabalhamos</Rotulo>
        </Reveal>

        <div
          ref={ref}
          className="mt-10 max-w-5xl text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.06] tracking-[-0.03em] text-on-dark"
          aria-label={linhas.join(" ")}
        >
          {linhas.map((linha, li) => (
            <p key={linha} className="flex flex-wrap gap-x-[0.28em]">
              {linha.split(" ").map((palavra, pi) => {
                const i = antes[li] + pi;
                return menosMovimento ? (
                  <span key={`${li}-${pi}`} className="inline-block">
                    {palavra}
                  </span>
                ) : (
                  <Palavra
                    key={`${li}-${pi}`}
                    texto={palavra}
                    progresso={scrollYProgress}
                    inicio={i / n}
                    fim={Math.min(1, (i + 1.2) / n)}
                  />
                );
              })}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
