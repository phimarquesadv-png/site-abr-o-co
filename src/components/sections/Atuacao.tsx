import Link from "next/link";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Botao from "@/components/ui/Botao";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { frentes } from "@/content/atuacao";

export default function Atuacao() {
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <Container>
        <Reveal>
          <Rotulo>Atuação</Rotulo>
          <h2 className="mt-6 max-w-2xl text-ink text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Quatro frentes, e a ordem entre elas.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            Negócio vem primeiro. As outras três existem para sustentar a
            leitura que ele abre.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-lg bg-paper-3 md:grid-cols-2">
          {frentes.map((f) => (
            <StaggerItem key={f.slug}>
              <div className="flex h-full flex-col bg-paper p-8 md:p-10">
                <span className="rotulo text-azul">{f.nome}</span>
                <p className="mt-5 leading-relaxed text-muted">{f.descricao}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <Botao href="/atuacao/" variante="contorno">
              Ver a Análise 360º e as teses
            </Botao>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
