import Image from "next/image";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import Numero from "@/components/motion/Numero";
import { site } from "@/content/site";

/**
 * Campo azul com os números do portfólio institucional.
 *
 * Os valores são reproduzidos exatamente como constam lá. A nota de rodapé
 * existe porque número acumulado de resultado passado não é promessa de
 * resultado futuro — e dizer isso na própria peça é o que separa dado de
 * publicidade enganosa.
 */
export default function Historico() {
  return (
    <section className="relative overflow-hidden bg-azul py-24 text-white md:py-32">
      {/* Grafismo da marca: textura abstrata azul do material oficial, com um
          véu do azul da marca por cima para unificar a cor e manter o branco
          legível. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/grafismo/abstrato.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-azul/40" />
      </div>
      <Container className="relative">
        <Reveal>
          <Rotulo claro>Nosso histórico</Rotulo>
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          {site.historico.map((item, i) => (
            <Reveal key={item.legenda} delay={i * 0.1}>
              <Numero
                valor={item.valor}
                prefixo="+ "
                sufixo={item.sufixo}
                className="block text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] tracking-[-0.04em] tabular-nums"
              />
              <p className="mt-5 text-lg text-white/85 md:text-xl">
                {item.legenda}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 max-w-xl border-t border-white/20 pt-5 text-xs leading-relaxed text-on-azul-muted">
            Valores acumulados. Resultado passado não é promessa nem projeção de
            resultado futuro.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
