"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave global.
 *
 * Duas travas deliberadas:
 * - Desliga inteiro se o sistema pediu menos movimento.
 * - Nunca captura o scroll: `wheelMultiplier` fica em 1, então a distância
 *   percorrida por giro de roda é a mesma do navegador. O suave é a
 *   interpolação, não a velocidade.
 */
export default function SmoothScroll() {
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

    let frame = 0;
    const loop = (tempo: number) => {
      lenis.raf(tempo);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
