"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Scroll suave global.
 *
 * Duas travas deliberadas:
 * - Desliga inteiro se o sistema pediu menos movimento.
 * - Nunca captura o scroll: `wheelMultiplier` fica em 1, então a distância
 *   percorrida por giro de roda é a mesma do navegador. O suave é a
 *   interpolação, não a velocidade.
 *
 * E uma regra de convivência com o Next: ao trocar de rota, o Lenis vai ao
 * topo na hora. Sem isso ele continua mirando a posição da página anterior
 * e arrasta a nova página para o meio.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rota = usePathname();

  useEffect(() => {
    const querMenosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (querMenosMovimento) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      // Em toque, o scroll nativo do celular já é bom. Não mexer.
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const loop = (tempo: number) => {
      lenis.raf(tempo);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Troca de rota: topo imediato. `force` ignora a interpolação em curso.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [rota]);

  return null;
}
