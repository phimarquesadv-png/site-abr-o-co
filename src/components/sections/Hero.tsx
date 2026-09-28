"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import VideoSede from "@/components/ui/VideoSede";
import TextReveal from "@/components/motion/TextReveal";

/**
 * Primeira tela: rótulo, assinatura da marca e dois botões. Nada mais.
 *
 * Ao rolar, o vídeo desce mais devagar que a página (parallax curto) e o
 * texto se dissolve, entregando a tela para a tarja de empresas. Com menos movimento, tudo fica parado.
 */
export default function Hero() {
  const menosMovimento = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacidadeTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yTexto = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const estatico = { y: 0, opacity: 1 };

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper">
      {/* Vídeo do projeto da sede como fundo. Um véu de papel por cima mantém
          o texto legível: quase opaco no celular, gradiente da esquerda para a
          direita em telas largas: o prédio aparece onde o texto não está. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={menosMovimento ? undefined : { y: yVideo }}
      >
        <VideoSede
          src="/sede/hero.mp4"
          poster="/sede/hero.jpg"
          className="h-full w-full opacity-90"
          prioridade
        />
        <div className="absolute inset-0 bg-paper/85 md:bg-linear-to-r md:from-paper md:via-paper/85 md:to-paper/15" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-paper to-transparent" />
      </motion.div>

      <Container className="relative pt-40 pb-28 md:pt-56 md:pb-40">
        <motion.div
          style={
            menosMovimento ? estatico : { opacity: opacidadeTexto, y: yTexto }
          }
        >
          <motion.p
            initial={menosMovimento ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="rotulo text-muted"
          >
            Escritório de negócios · Visão tributária
          </motion.p>

          {/* A assinatura da marca é o próprio título. Está no timbrado e
              resume o posicionamento melhor do que qualquer frase nova. */}
          <TextReveal
            as="h1"
            delayInicial={0.15}
            className="mt-8 max-w-4xl text-ink text-[clamp(3rem,9vw,7rem)] leading-[1.0] tracking-[-0.04em]"
            linhas={["Negócio antes", "do tributo."]}
          />

          <motion.div
            initial={menosMovimento ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 flex flex-wrap gap-3"
          >
            <Botao href="/atuacao/">Conhecer a atuação</Botao>
            <Botao href="/contato/" variante="contorno">
              Fale conosco
            </Botao>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
