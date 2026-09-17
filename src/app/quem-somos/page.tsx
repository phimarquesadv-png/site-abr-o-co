import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/content/site";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import Socios from "@/components/sections/Socios";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A estrutura da Abrão & Co: quatro áreas, três praças e os sócios que respondem pelo trabalho.",
};

const areas = [
  {
    nome: "Jurídico Tributário",
    texto:
      "Conduz as teses e a análise técnica de débitos e créditos, do diagnóstico à devolutiva.",
  },
  {
    nome: "Jurídico Trabalhista e Cível",
    texto:
      "Atende as demandas das empresas atendidas fora da matéria tributária.",
  },
  {
    nome: "Comercial",
    texto:
      "Primeiro contato, proposta e acompanhamento do relacionamento ao longo do trabalho.",
  },
  {
    nome: "Administrativo",
    texto:
      "Suporte operacional, controle de prazos e rotina documental de cada caso.",
  },
];

export default function QuemSomos() {
  return (
    <>
      <PageHero
        rotulo="Quem somos"
        titulo={["Uma equipe organizada", "em torno do caso."]}
        descricao="Cerca de vinte profissionais distribuídos em quatro áreas e três praças. Cada caso passa por quem precisa passar, e por ninguém a mais."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Rotulo>Estrutura</Rotulo>
              <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12] text-ink">
                Quatro áreas, um caso por vez.
              </h2>
            </Reveal>

            <Stagger className="space-y-px">
              {areas.map((a) => (
                <StaggerItem key={a.nome}>
                  <div className="border-t border-paper-3 py-8 first:border-t-0">
                    <h3 className="text-lg text-ink">{a.nome}</h3>
                    <p className="mt-2.5 max-w-xl leading-relaxed text-muted">
                      {a.texto}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-24 border-t border-paper-3 pt-14">
            <Reveal>
              <Rotulo>Onde estamos</Rotulo>
            </Reveal>
            <Stagger className="mt-10 grid gap-10 sm:grid-cols-3">
              {site.escritorios.map((e) => (
                <StaggerItem key={e.cidade}>
                  <address className="not-italic">
                    <p className="text-xl text-ink">{e.cidade}</p>
                    <p className="mt-3 leading-relaxed text-muted">
                      {e.linhas.join(", ")}
                      <br />
                      {e.cidade} — {e.uf}
                    </p>
                  </address>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <Socios />

      <ChamadaFinal />
    </>
  );
}
