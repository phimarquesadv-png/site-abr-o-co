import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Botao from "@/components/ui/Botao";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { segmentos } from "@/content/atuacao";

export const metadata: Metadata = {
  title: "Transportadoras",
  description:
    "Atuação tributária para transportadoras no Lucro Real: ICMS sobre insumos, revisão de cinco anos e gestão de passivo.",
};

export default function Transportes() {
  return (
    <>
      <PageHero
        rotulo="Transporte"
        titulo={["Transportadora tem", "conta própria a fazer."]}
        descricao="Um dos três segmentos onde temos base instalada. A matéria é a mesma; o que muda é onde ela aparece na operação."
      />

      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Rotulo>O recorte</Rotulo>
              <h2 className="mt-6 text-ink text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12]">
                Onde a carga costuma escapar.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  A transportadora compra insumos com ICMS destacado em nota ao
                  longo de toda a operação — e apura ICMS sobre a prestação do
                  serviço. Os dois lados dessa conta nem sempre conversam na
                  escrituração.
                </p>
                <p>
                  A revisão parte do SPED e dos XMLs de entrada que a empresa já
                  emite. Alcança o período corrente e também os anteriores, e aí
                  o aproveitamento retroativo depende de homologação formal do
                  órgão estadual antes de qualquer compensação.
                </p>
                <p>
                  Como em toda a nossa atuação, o requisito de regime continua
                  valendo: trabalhamos com transportadoras no Lucro Real.
                </p>
              </div>

              <div className="mt-10">
                <Botao href="/contato/">Solicitar diagnóstico</Botao>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-20 border-t border-paper-3 pt-10">
              <Rotulo>Outros segmentos com base instalada</Rotulo>
            </div>
          </Reveal>

          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-lg bg-paper-3 sm:grid-cols-3">
            {segmentos.map((s) => (
              <StaggerItem key={s.slug}>
                <div className="bg-paper p-7">
                  <p className="text-lg text-ink">{s.nome}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
