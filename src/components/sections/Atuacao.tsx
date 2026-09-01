import Link from "next/link";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { produtos } from "@/content/produtos";

export default function Atuacao() {
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <Container>
        <Reveal>
          <Rotulo>Atuação</Rotulo>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-ink">
            Cinco frentes de trabalho, cada uma com entrada e método próprios.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-lg bg-paper-3 md:grid-cols-2">
          {produtos.map((p) => (
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
  );
}
