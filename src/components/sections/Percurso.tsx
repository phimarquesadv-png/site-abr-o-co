"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";

export type ItemPercurso = {
  titulo: string;
  texto: string;
  /** Âncora do item (o rodapé aponta para as frentes por aqui). */
  id?: string;
};

type Tema = "escuro" | "claro";

const temas = {
  escuro: {
    secao: "bg-ink text-on-dark",
    borda: "border-on-dark/15",
    numero: "text-on-dark",
    titulo: "text-on-dark",
    texto: "text-on-dark-muted",
    apagado: 0.38,
    rotuloClaro: true,
  },
  claro: {
    secao: "bg-paper text-ink",
    borda: "border-paper-3",
    numero: "text-ink",
    titulo: "text-ink",
    texto: "text-muted",
    apagado: 0.45,
    rotuloClaro: false,
  },
} as const;

/**
 * Um item do percurso.
 *
 * Acende quando entra na faixa central da tela e apaga quando sai. O efeito
 * não é enfeite: com o título fixo à esquerda, é ele que diz em que ponto do
 * percurso o leitor está, a mesma função que uma barra de progresso teria,
 * sem ocupar espaço.
 */
function Item({
  indice,
  item,
  tema,
}: {
  indice: number;
  item: ItemPercurso;
  tema: Tema;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const menosMovimento = useReducedMotion();
  // Faixa estreita no meio da tela: só um item fica aceso por vez.
  const ativo = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const aceso = menosMovimento || ativo;
  const t = temas[tema];

  return (
    <li ref={ref} id={item.id} className={`scroll-mt-24 border-t ${t.borda}`}>
      <motion.div
        className="flex gap-8 py-9 md:py-11"
        animate={{ opacity: aceso ? 1 : t.apagado }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex-none">
          <span
            className={`block font-medium text-3xl leading-none tabular-nums ${t.numero}`}
          >
            {String(indice + 1).padStart(2, "0")}
          </span>
          {/* Régua que preenche no item ativo: marca a posição no percurso. */}
          <motion.span
            aria-hidden
            className="mt-4 block h-px w-10 origin-left bg-azul"
            animate={{ scaleX: aceso ? 1 : 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div>
          <h3 className={`text-xl ${t.titulo}`}>{item.titulo}</h3>
          <p className={`mt-3 max-w-lg leading-relaxed ${t.texto}`}>
            {item.texto}
          </p>
        </div>
      </motion.div>
    </li>
  );
}

/**
 * Bloco de passo a passo: título fixo à esquerda, lista numerada à direita
 * com o item da vez aceso conforme o scroll. Usado em "Como funciona" (home,
 * escuro) e nas frentes de atuação (claro).
 */
export default function Percurso({
  rotulo,
  titulo,
  descricao,
  itens,
  tema = "escuro",
}: {
  rotulo: string;
  titulo: string;
  descricao?: string;
  itens: readonly ItemPercurso[];
  tema?: Tema;
}) {
  const t = temas[tema];
  return (
    <section className={`relative overflow-hidden py-14 md:py-20 ${t.secao}`}>
      <Container className="relative">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <Rotulo claro={t.rotuloClaro}>{rotulo}</Rotulo>
              <h2
                className={`mt-6 text-[clamp(2rem,4vw,3rem)] leading-[1.1] ${t.titulo}`}
              >
                {titulo}
              </h2>
              {descricao ? (
                <p className={`mt-6 max-w-sm leading-relaxed ${t.texto}`}>
                  {descricao}
                </p>
              ) : null}
            </Reveal>
          </div>

          <ol>
            {itens.map((item, i) => (
              <Item key={item.titulo} indice={i} item={item} tema={tema} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
