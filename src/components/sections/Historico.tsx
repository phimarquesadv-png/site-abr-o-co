import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import Numero from "@/components/motion/Numero";
import Monograma from "@/components/ui/Monograma";
import Ambiente from "@/components/motion/Ambiente";
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
      <Ambiente cor="rgba(255,255,255,0.075)" passo={72} segundos={48} />
      {/* Halo frio no alto: dá profundidade ao campo chapado sem virar
          gradiente decorativo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 70% 0%, rgba(255,255,255,0.14), transparent 65%)",
        }}
      />
      <Monograma
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 hidden w-[26rem] text-white/[0.07] lg:block"
      />

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
          <p className="mt-16 max-w-xl border-t border-white/20 pt-6 text-sm leading-relaxed text-on-azul-muted">
            Valores acumulados em operações conduzidas pela Abrão &amp; Co.
            Resultado obtido no passado não representa promessa nem projeção de
            resultado futuro: cada caso depende da documentação, da situação
            fiscal da empresa e da decisão dos órgãos competentes.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
