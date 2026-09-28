"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { analise } from "@/content/atuacao";

/**
 * Três afirmações curtas, uma por pilar da Análise 360º. O texto de cada
 * pilar (de `atuacao.ts`) aparece embaixo, na íntegra.
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
  const n = linhas.reduce((t, l) => t + l.split(" ").length, 0);
  const antes = linhas.map((_, li) =>
    linhas.slice(0, li).reduce((t, l) => t + l.split(" ").length, 0),
  );

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-on-dark md:py-36">
      <Container>
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

        <Stagger className="mt-20 grid gap-10 border-t border-on-dark/15 pt-10 md:grid-cols-3 md:gap-12">
          {analise.pilares.map((p) => (
            <StaggerItem key={p.titulo}>
              <h3 className="text-lg text-on-dark">{p.titulo}</h3>
              <p className="mt-3 leading-relaxed text-on-dark-muted">
                {p.texto}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
