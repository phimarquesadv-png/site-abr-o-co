import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { frentes, analise, teses } from "@/content/atuacao";

export const metadata: Metadata = {
  title: "Atuação",
  description:
    "Quatro frentes — Negócio, Tributário, Tecnologia e Agronegócio — e a Análise 360º: revisão de cinco anos da parte fiscal, com as teses que a sustentam.",
};

export default function Atuacao() {
  return (
    <>
      <PageHero
        rotulo="Atuação"
        titulo={["Quatro frentes,", "uma leitura só."]}
        descricao="Somos um escritório de negócios com visão tributária. A ordem importa: primeiro entender como a empresa ganha dinheiro, depois onde a carga pesa."
      />

      {/* As quatro frentes */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <Stagger className="grid gap-px overflow-hidden rounded-lg bg-paper-3 md:grid-cols-2">
            {frentes.map((f) => (
              <StaggerItem key={f.slug}>
                <div className="flex h-full flex-col bg-paper p-8 md:p-10">
                  <span className="rotulo text-azul">{f.nome}</span>
                  <p className="mt-5 leading-relaxed text-muted">
                    {f.descricao}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Análise 360º — o produto central */}
      <section className="bg-paper-2 py-20 md:py-28">
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

      {/* Teses */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal>
            <Rotulo>Teses</Rotulo>
            <h2 className="mt-6 max-w-2xl text-ink text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12]">
              O que sustenta cada oportunidade apontada.
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {teses.map((t) => (
              <StaggerItem key={t.nome}>
                <div className="border-t border-paper-3 pt-7">
                  <h3 className="text-xl text-ink">{t.nome}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{t.texto}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mt-16 max-w-xl border-t border-paper-3 pt-6 text-sm leading-relaxed text-muted">
              A aplicação de cada tese depende da apuração do caso concreto.
              Nada aqui constitui orientação técnica nem indica cabimento sem a
              análise da documentação da empresa.
            </p>
          </Reveal>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
