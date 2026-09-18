"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Texto para leitores de tela. Vazio quando o vídeo é só decoração. */
  descricao?: string;
  /** Capa carregada de imediato (primeira tela). Padrão: lazy. */
  prioridade?: boolean;
};

/**
 * Vídeo sem som, em loop, que só toca quando faz sentido:
 * - respeita `prefers-reduced-motion` (mostra a capa parada);
 * - respeita economia de dados do navegador (`saveData`);
 * - só começa a baixar quando entra na tela.
 *
 * Fora desses casos, o `<video>` nunca é montado — a capa é uma imagem
 * comum, leve, que carrega em qualquer situação.
 */
export default function VideoSede({
  src,
  poster,
  className = "",
  descricao = "",
  prioridade = false,
}: Props) {
  const menosMovimento = useReducedMotion();
  const [tocar, setTocar] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menosMovimento) return;
    const conexao = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conexao?.saveData) return;

    const el = caixa.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setTocar(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [menosMovimento]);

  return (
    <div ref={caixa} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- capa estática servida sem otimização */}
      <img
        src={poster}
        alt={descricao}
        className="absolute inset-0 h-full w-full object-cover"
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding="async"
      />
      {tocar ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          src={src}
        />
      ) : null}
    </div>
  );
}
