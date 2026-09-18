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
      {/* O monograma animado da marca (vídeo institucional) como presença na
          primeira tela. O fundo do vídeo é branco; `mix-blend-multiply` faz
          esse branco sumir sobre o papel e deixa só o azul em movimento.
          Só em telas largas — no celular ele cairia em cima do texto. */}
      <motion.div
        aria-hidden
        initial={menosMovimento ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-0 top-28 hidden w-[26rem] mix-blend-multiply lg:block"
      >
        <VideoSede
          src="/marca/monograma.mp4"
          poster="/marca/monograma.jpg"
          className="aspect-square w-full"
          prioridade
        />
      </motion.div>

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
            enxergar onde a carga pesa sem precisar pesar — e transformar isso
            em resultado que aparece no caixa.
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
