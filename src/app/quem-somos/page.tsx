import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/content/site";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import Socios from "@/components/sections/Socios";
import VideoSede from "@/components/ui/VideoSede";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A Abrão & Co: consultoria tributária com a operação no centro, três praças e os sócios que respondem pelo trabalho.",
};

export default function QuemSomos() {
  return (
    <>
      <PageHero
        rotulo="Quem somos"
        titulo={["Uma equipe organizada", "em torno do caso."]}
        descricao="Cerca de vinte profissionais em três praças. Cada caso passa por quem precisa passar, e por ninguém a mais."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div>
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
                      {e.cidade}/{e.uf}
                    </p>
                  </address>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Projeto arquitetônico da matriz. O rótulo já diz que é projeto. */}
      <section className="bg-paper-2 py-20 md:py-28">
        <Container>
          <Reveal>
            <Rotulo>Projeto da Matriz</Rotulo>
            <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12] text-ink">
              A matriz, em Goiânia.
            </h2>
          </Reveal>

          <Reveal className="mt-12" delay={0.15}>
            <VideoSede
              src="/sede/projeto.mp4"
              poster="/sede/projeto.jpg"
              descricao="Fachada do projeto da matriz da Abrão & Co em Goiânia: ripas verticais onduladas sobre a entrada em vidro, com o letreiro da marca."
              className="aspect-video w-full"
            />
          </Reveal>
        </Container>
      </section>

      <Socios />

      {/* Compilação de 28 s com a equipe: apresentação, visita à obra e as
          assinaturas no concreto. Fundo escuro para os trechos noturnos não
          virarem um buraco preto sobre o papel. */}
      <section className="bg-ink py-20 text-on-dark md:py-28">
        <Container>
          <Reveal>
            <Rotulo claro>Momentos</Rotulo>
            <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12] text-on-dark">
              A equipe, fora da mesa.
            </h2>
          </Reveal>
          <Reveal className="mt-12" delay={0.1}>
            <VideoSede
              src="/marca/equipe.mp4"
              poster="/marca/equipe.jpg"
              descricao="Compilação com a equipe da Abrão & Co: apresentação em auditório, visita à obra com capacetes da marca e assinaturas no concreto."
              className="aspect-video w-full rounded-lg"
            />
          </Reveal>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
