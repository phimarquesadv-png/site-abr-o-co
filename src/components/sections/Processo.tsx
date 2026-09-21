"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import Ambiente from "@/components/motion/Ambiente";

const etapas = [
  {
    titulo: "Contato inicial",
    texto:
      "Uma conversa curta para entender a operação, o porte e o que motivou a busca. Serve para saber se há trabalho possível, e para dizer quando não há.",
  },
  {
    titulo: "Acesso e documentação",
    texto:
      "Procuração eletrônica e envio dos documentos. Nada é analisado por estimativa: a apuração parte do que a empresa já declarou aos órgãos.",
  },
  {
    titulo: "Diagnóstico",
    texto:
      "Levantamento técnico do passivo, dos créditos ou de ambos, conforme o caso, com revisão interna antes de ir à mesa.",
  },
  {
    titulo: "Devolutiva",
    texto:
      "Apresentação do que foi encontrado e dos caminhos disponíveis, com o que cada um envolve em prazo e risco. A decisão é da empresa.",
  },
  {
    titulo: "Condução",
    texto:
      "Execução do caminho escolhido, com acompanhamento até a operacionalização. Nos trabalhos recorrentes, mês a mês.",
  },
];

/**
 * Uma etapa do percurso.
 *
 * Acende quando entra na faixa central da tela e apaga quando sai. O efeito
 * não é enfeite: com o título fixo à esquerda, é ele que diz em que ponto do
 * percurso o leitor está — a mesma função que uma barra de progresso teria,
 * sem ocupar espaço.
 */
function Etapa({
  indice,
  titulo,
  texto,
}: {
  indice: number;
  titulo: string;
  texto: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const menosMovimento = useReducedMotion();
  // Faixa estreita no meio da tela: só uma etapa fica acesa por vez.
  const ativa = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const acesa = menosMovimento || ativa;

  return (
    <li ref={ref} className="border-t border-on-dark/15">
      <motion.div
        className="flex gap-8 py-9 md:py-11"
        animate={{ opacity: acesa ? 1 : 0.38 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex-none">
          <span className="block font-medium text-3xl leading-none tabular-nums text-on-dark">
            {String(indice + 1).padStart(2, "0")}
          </span>
          {/* Régua que preenche na etapa ativa — marca a posição no percurso. */}
          <motion.span
            aria-hidden
            className="mt-4 block h-px w-10 origin-left bg-azul"
            animate={{ scaleX: acesa ? 1 : 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div>
          <h3 className="text-xl text-on-dark">{titulo}</h3>
          <p className="mt-3 max-w-lg leading-relaxed text-on-dark-muted">
            {texto}
          </p>
        </div>
      </motion.div>
    </li>
  );
}

export default function Processo() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-on-dark md:py-32">
      <Ambiente />
      <Container className="relative">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <Rotulo claro>Como funciona</Rotulo>
              <h2 className="mt-6 text-on-dark text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                Do primeiro contato à operação.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-on-dark-muted">
                O mesmo percurso em qualquer frente. O que muda é a matéria
                analisada, não o método.
              </p>
            </Reveal>
          </div>

          <ol>
            {etapas.map((e, i) => (
              <Etapa key={e.titulo} indice={i} {...e} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
