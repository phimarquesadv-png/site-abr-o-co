"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import TextReveal from "@/components/motion/TextReveal";

export default function Hero() {
  const menosMovimento = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink text-on-dark">
      {/* Fundo: duas manchas de luz muito sutis. São gradientes CSS, não
          imagem — custo zero de rede e nenhum impacto no LCP. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 18%, rgba(180,136,76,0.18), transparent 70%), radial-gradient(50% 50% at 12% 82%, rgba(30,58,79,0.55), transparent 70%)",
        }}
      />

      <Container className="relative pt-40 pb-28 md:pt-52 md:pb-36">
        <motion.p
          initial={menosMovimento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-on-dark-muted"
        >
          Consultoria tributária · Lucro Real
        </motion.p>

        <TextReveal
          as="h1"
          delayInicial={0.15}
          className="mt-7 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.04]"
          linhas={[
            "A carga tributária",
            "da sua empresa,",
            "examinada linha a linha.",
          ]}
        />

        <motion.div
          initial={menosMovimento ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl"
        >
          <p className="text-lg leading-relaxed text-on-dark-muted">
            Atuamos exclusivamente com empresas no regime de Lucro Real, em
            duas frentes: o passivo que já existe e os créditos que ainda não
            foram aproveitados.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Botao href="/contato/">Solicitar diagnóstico</Botao>
            <Botao href="/produtos/" variante="claro">
              Conhecer a atuação
            </Botao>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
