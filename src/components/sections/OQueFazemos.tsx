import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const paragrafos = [
  "Antes de olhar o tributo, olhamos como a empresa compra, produz, vende e transporta. É essa leitura que mostra onde a carga pesa mais do que deveria, e o que dá para fazer a respeito dentro da lei.",
  "O trabalho é uma revisão detalhada de créditos e débitos, estaduais e federais, somada à leitura dos impactos da Reforma Tributária sobre a operação. Atuamos de forma conservadora, restrita ao que está previsto em lei ou já pacificado nos Tribunais Superiores.",
  "Ao final, as oportunidades vêm com os valores apontados e uma revisão dos serviços contábeis, com riscos, contingências e o que há para recuperar ou compensar.",
];

/**
 * O que a consultoria faz, logo depois do Hero. O título entra com a
 * revelação de linhas; os parágrafos, escalonados, em scroll.
 */
export default function OQueFazemos() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Rotulo>O que fazemos</Rotulo>
            <TextReveal
              as="h2"
              emScroll
              delayInicial={0.1}
              className="mt-6 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12] text-ink"
              linhas={["Consultoria tributária", "com a operação no centro."]}
            />
          </Reveal>

          <Stagger className="space-y-6 text-lg leading-relaxed text-muted">
            {paragrafos.map((p) => (
              <StaggerItem key={p.slice(0, 24)}>
                <p>{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
