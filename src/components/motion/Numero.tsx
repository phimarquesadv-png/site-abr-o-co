"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Props = {
  /** Valor final. Só entra aqui número real, conferido. */
  valor: number;
  prefixo?: string;
  sufixo?: string;
  className?: string;
};

/**
 * Contagem de 0 até o valor, disparada quando o número entra em tela.
 *
 * Roda uma vez só. O valor final já vai no HTML servido, então quem chega com
 * JavaScript desligado, ou com menos movimento pedido ao sistema, lê o número
 * inteiro do mesmo jeito — a animação é enfeite, não é o conteúdo.
 */
export default function Numero({
  valor,
  prefixo = "",
  sufixo = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const naTela = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const menosMovimento = useReducedMotion();
  const [atual, setAtual] = useState(valor);

  // Zera só enquanto o número ainda está fora de tela. Se ele já estiver
  // visível na carga, fica no valor final em vez de piscar de 500 para 0.
  //
  // O setState aqui é proposital: o HTML servido precisa trazer o valor
  // cheio, e a zeragem só pode acontecer depois da hidratação. Fazer isso
  // no render quebraria a igualdade entre servidor e cliente.
  useEffect(() => {
    if (menosMovimento || naTela) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAtual(0);
  }, [menosMovimento, naTela]);

  useEffect(() => {
    if (menosMovimento || !naTela) return;

    const duracao = 1400;
    const inicio = performance.now();
    let quadro = 0;

    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      // Desaceleração forte no fim: o número "assenta" em vez de parar seco.
      const suave = 1 - Math.pow(1 - t, 3);
      setAtual(Math.round(valor * suave));
      if (t < 1) quadro = requestAnimationFrame(passo);
    };

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [naTela, valor, menosMovimento]);

  return (
    <span ref={ref} className={className}>
      {/* O valor real fica no DOM para leitor de tela e para busca; a
          contagem é apresentada como decoração. */}
      <span className="sr-only">{`${prefixo}${valor}${sufixo}`}</span>
      <span aria-hidden>
        {prefixo}
        {atual}
        {sufixo}
      </span>
    </span>
  );
}
