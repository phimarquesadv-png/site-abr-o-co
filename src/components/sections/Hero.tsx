"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import TextReveal from "@/components/motion/TextReveal";
import { site } from "@/content/site";

export default function Hero() {
  const menosMovimento = useReducedMotion();

  return (
    <section className="bg-paper">
      <Container className="pt-40 pb-20 md:pt-52 md:pb-28">
        <motion.p
          initial={menosMovimento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rotulo text-muted"
        >
          Consultoria tributária · Lucro Real
        </motion.p>

        {/* A assinatura da marca é o próprio título. Está no timbrado e resume
            o posicionamento melhor do que qualquer frase nova. */}
        <TextReveal
          as="h1"
          delayInicial={0.15}
          className="mt-8 max-w-4xl text-[clamp(2.8rem,8vw,6rem)] leading-[1.02] tracking-[-0.035em]"
          linhas={["Negócio antes", "do tributo."]}
        />

        <motion.div
          initial={menosMovimento ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl"
        >
          <p className="text-lg leading-relaxed text-muted">
            Atuamos exclusivamente com empresas no regime de Lucro Real, em duas
            frentes: o passivo que já existe e os créditos que ainda não foram
            aproveitados.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Botao href="/contato/">Solicitar diagnóstico</Botao>
            <Botao href="/produtos/" variante="contorno">
              Conhecer a atuação
            </Botao>
          </div>
        </motion.div>
      </Container>

      {/* Filete com as três praças, como no rodapé do timbrado. */}
      <Container>
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
