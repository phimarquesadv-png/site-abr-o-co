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

  // Onde a página deve estar depois de uma navegação: na âncora, se a URL
  // tiver uma e ela existir; senão, no topo. `immediate` e `force` ignoram
  // qualquer interpolação em curso — é exatamente ela que arrastava a página
  // nova para o meio.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Posiciona por último e de forma determinística. Fazer a conta pelo
    // Lenis dava errado: ele soma a posição do elemento à ideia interna de
    // scroll, que na troca de rota ainda é a da página anterior, e o alvo
    // estourava o limite. Deixar o navegador posicionar sozinho também não
    // bastou: algo rolava depois até o topo exato do elemento, sem o
    // scroll-margin.
    //
    // Dois quadros de espera: o primeiro deixa o Next terminar o próprio
    // scroll da navegação, o segundo deixa o layout da página nova assentar.
    let quadro = 0;
    const irParaDestino = () => {
      quadro = requestAnimationFrame(() => {
        quadro = requestAnimationFrame(() => {
          // Limites recalculados para a altura da página nova.
          lenis.resize();
          const alvo = window.location.hash
            ? document.querySelector<HTMLElement>(window.location.hash)
            : null;
          // Alvo em número, a partir da posição real do elemento e do scroll
          // real do navegador — nada de estado interno de ninguém. Os 96px
          // compensam o cabeçalho fixo (mesmo valor do scroll-mt dos alvos).
          const topo = alvo
            ? Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - 96)
            : 0;
          // Navegador e Lenis recebem o mesmo número, nesta ordem: assim o
          // Lenis não encontra diferença entre o que ele acha e o que é.
          window.scrollTo({ top: topo, behavior: "instant" });
          lenis.scrollTo(topo, { immediate: true, force: true });
        });
      });
    };

    irParaDestino();

    // Clique em âncora dentro da mesma página não troca a rota — só o hash.
    window.addEventListener("hashchange", irParaDestino);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("hashchange", irParaDestino);
    };
  }, [rota]);

  return null;
}
