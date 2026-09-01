import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { produtos } from "@/content/produtos";

export const metadata: Metadata = {
  title: "Transportadoras",
  description:
    "ICMS sobre insumos para transportadoras no Lucro Real: apuração mensal do vincendo e crédito extemporâneo com homologação.",
};

const deTransportes = produtos.filter((p) => p.setor === "Transportes");

export default function Transportes() {
  return (
    <>
      <PageHero
        rotulo="Transportadoras"
        titulo={["ICMS sobre insumos,", "no mês e no retroativo."]}
        descricao="Uma frente específica do setor de transportes. A matéria é a mesma; o que separa os dois trabalhos é o período a que se aplicam."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Rotulo>O recorte</Rotulo>
              <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12] text-ink">
                Por que transportadora tem tratamento próprio.
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
                  O trabalho consiste em apurar, a partir do SPED e dos XMLs de
                  entrada que a empresa já emite, o que é elegível em cada
                  período. No vincendo, isso acontece mês a mês. No
                  extemporâneo, alcança períodos anteriores e depende de
                  homologação formal do órgão estadual antes de qualquer
                  compensação.
                </p>
                <p>
                  O requisito de regime continua valendo: atuamos apenas com
                  transportadoras no Lucro Real.
                </p>
              </div>
            </Reveal>
          </div>

          <Stagger className="mt-20 grid gap-px overflow-hidden rounded-lg bg-paper-3 md:grid-cols-2">
            {deTransportes.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/produtos/${p.slug}/`}
                  className="group flex h-full flex-col bg-paper p-8 transition-colors duration-300 hover:bg-white md:p-10 motion-reduce:transition-none"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="rotulo text-ink">
                      {p.chamada}
                    </span>
                    <span className="text-[0.7rem] text-muted">
                      {p.recorrencia}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl leading-snug text-ink">
                    {p.nome}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted">
                    {p.resumo}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink">
                    Ver detalhe
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
