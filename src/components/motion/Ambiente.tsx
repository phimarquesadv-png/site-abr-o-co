"use client";

import { useReducedMotion } from "motion/react";

type Props = {
  /** Cor das linhas. Recebe qualquer cor CSS, inclusive com transparência. */
  cor?: string;
  /** Distância entre linhas, em pixels. */
  passo?: number;
  /** Duração de um ciclo completo de deriva. Longo de propósito. */
  segundos?: number;
};

/**
 * Malha que deriva devagar ao fundo de uma seção escura.
 *
 * É atmosfera, não informação: dá a sensação de que a página está viva sem
 * competir com o texto nem depender de scroll. O ciclo é longo — 40 segundos —
 * porque movimento perceptível ao fundo de um texto técnico atrapalha a
 * leitura.
 *
 * Custa quase nada: dois gradientes repetidos em CSS e uma animação de
 * `transform`, sem imagem, sem canvas e sem JavaScript por quadro.
 */
export default function Ambiente({
  cor = "rgba(255,255,255,0.055)",
  passo = 64,
  segundos = 40,
}: Props) {
  const menosMovimento = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute -inset-x-8 -inset-y-24"
        style={{
          backgroundImage: `linear-gradient(${cor} 1px, transparent 1px), linear-gradient(90deg, ${cor} 1px, transparent 1px)`,
          backgroundSize: `${passo}px ${passo}px`,
          // A malha some nas bordas para não virar moldura.
          maskImage:
            "radial-gradient(105% 75% at 50% 40%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(105% 75% at 50% 40%, #000 35%, transparent 100%)",
          animation: menosMovimento
            ? undefined
            : `deriva ${segundos}s linear infinite`,
        }}
      />
      <style>{`
        @keyframes deriva {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(${passo}px, ${passo}px, 0); }
        }
      `}</style>
    </div>
  );
}
