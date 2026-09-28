import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Percurso from "@/components/sections/Percurso";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { frentes, analise, segmentos } from "@/content/atuacao";

export const metadata: Metadata = {
  title: "Atuação",
  description:
    "Quatro frentes (Negócio, Tributário, Tecnologia e Agronegócio) e a Análise 360º: revisão detalhada da parte fiscal, com os valores a recuperar apontados.",
};

export default function Atuacao() {
  return (
    <>
      <PageHero
        rotulo="Atuação"
        titulo={["Quatro frentes,", "uma leitura só."]}
        descricao="Somos um escritório de negócios com visão tributária. A ordem importa: primeiro entender como a empresa ganha dinheiro, depois onde a carga pesa."
      />

      {/* As quatro frentes, no mesmo passo a passo de "Como funciona". Os ids
          vêm do slug para o rodapé chegar direto em cada frente. */}
      <Percurso
        tema="escuro"
        rotulo="As frentes"
        titulo="Negócio vem primeiro."
        descricao="As outras três existem para sustentar a leitura que ele abre."
        itens={frentes.map((f) => ({
          id: f.slug,
          titulo: f.nome,
          texto: f.descricao,
        }))}
      />

      {/* Análise 360º — o produto central */}
      <section className="bg-paper-2 py-12 md:py-16">
        <Container>
          <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <Rotulo>O trabalho</Rotulo>
              <h2 className="mt-6 text-ink text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                {analise.nome}
              </h2>
            </Reveal>

            <div>
              <Reveal delay={0.06}>
                <p className="text-lg leading-relaxed text-muted">
                  {analise.resumo}
                </p>
              </Reveal>

              <Stagger className="mt-12 space-y-px">
                {analise.pilares.map((p) => (
                  <StaggerItem key={p.titulo}>
                    <div className="border-t border-paper-3 py-7">
                      <h3 className="text-lg text-ink">{p.titulo}</h3>
                      <p className="mt-2.5 max-w-xl leading-relaxed text-muted">
                        {p.texto}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      {/* Segmentos com base instalada. Ficavam numa aba própria, "Transportes",
          que era pensamento de landing page; num site institucional, os três
          cabem aqui, lado a lado, sem hierarquia entre eles. */}
      <section className="bg-paper-2 py-12 md:py-16">
        <Container>
          <Reveal>
            <Rotulo>Onde já atuamos</Rotulo>
            <h2 className="mt-6 max-w-2xl text-ink text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12]">
              Três segmentos com base instalada.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              A matéria tributária é a mesma. O que muda é onde ela aparece na
              operação de cada um. É isso que a leitura de negócio vai buscar
              primeiro.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-lg bg-paper-3 sm:grid-cols-3">
            {segmentos.map((s) => (
              <StaggerItem key={s.slug}>
                <div className="flex h-full items-end bg-paper p-8 md:min-h-[9rem]">
                  <p className="text-xl text-ink">{s.nome}</p>
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
