import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Percurso from "@/components/sections/Percurso";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { frentes, segmentos } from "@/content/atuacao";

export const metadata: Metadata = {
  title: "Atuação",
  description:
    "Quatro frentes: Negócio, Tributário, Tecnologia e Agronegócio. Segmentos com base instalada: atacadistas e alimentos, transporte, indústria e comércio.",
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
        itens={frentes.map((f) => ({
          id: f.slug,
          titulo: f.nome,
          texto: f.descricao,
        }))}
      />

      {/* Segmentos com base instalada: só os três nomes, em linha, separados
          por um fio. Sem cartão, sem texto de apoio. */}
      <section className="bg-paper py-12 md:py-16">
        <Container>
          <Reveal>
            <Rotulo>Onde já atuamos</Rotulo>
          </Reveal>
          <Stagger className="mt-8 flex flex-col divide-y divide-paper-3 md:-mx-10 md:flex-row md:divide-x md:divide-y-0">
            {segmentos.map((seg) => (
              <StaggerItem key={seg.slug}>
                <p className="py-5 text-[clamp(1.4rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink md:px-10 md:py-2">
                  {seg.nome}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
