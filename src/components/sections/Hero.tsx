"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import VideoSede from "@/components/ui/VideoSede";
import TextReveal from "@/components/motion/TextReveal";
import { site } from "@/content/site";

export default function Hero() {
  const menosMovimento = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Vídeo do projeto da sede como fundo. Um véu de papel por cima mantém
          o texto legível: quase opaco no celular, gradiente da esquerda para a
          direita em telas largas — o prédio aparece onde o texto não está. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <VideoSede
          src="/sede/hero.mp4"
          poster="/sede/projeto.jpg"
          className="h-full w-full"
          prioridade
        />
        <div className="absolute inset-0 bg-paper/85 md:bg-linear-to-r md:from-paper md:via-paper/85 md:to-paper/15" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-paper to-transparent" />
      </div>

      <Container className="relative pt-40 pb-20 md:pt-52 md:pb-28">
        <motion.p
          initial={menosMovimento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rotulo text-muted"
        >
          Escritório de negócios · Visão tributária
        </motion.p>

        {/* A assinatura da marca é o próprio título. Está no timbrado e resume
            o posicionamento melhor do que qualquer frase nova. */}
        <TextReveal
          as="h1"
          delayInicial={0.15}
          className="mt-8 max-w-4xl text-ink text-[clamp(2.8rem,8vw,6rem)] leading-[1.02] tracking-[-0.035em]"
          linhas={["Negócio antes", "do tributo."]}
        />

        <motion.div
          initial={menosMovimento ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl"
        >
          <p className="text-lg leading-relaxed text-muted">
            Lemos a operação antes de ler o tributo. É essa ordem que permite
            enxergar onde a carga pesa sem precisar pesar, e transformar isso em
            resultado que aparece no caixa.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Botao href="/atuacao/">Conhecer a atuação</Botao>
            <Botao href="/contato/" variante="contorno">
              Fale conosco
            </Botao>
          </div>
        </motion.div>
      </Container>

      {/* Filete com as três praças, como no rodapé do timbrado. */}
      <Container className="relative">
        <motion.div
          initial={menosMovimento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-x-10 gap-y-2 border-t border-paper-3 pt-6"
        >
          {site.escritorios.map((e) => (
            <span key={e.cidade} className="rotulo text-muted">
              {e.cidade}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
