import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { produtos } from "@/content/produtos";

export const metadata: Metadata = {
  title: "Atuação",
  description:
    "As cinco frentes de trabalho da Abrão & Co para empresas no Lucro Real: diagnóstico de débitos, recuperação de créditos, parcelamento e ICMS sobre insumos.",
};

export default function Produtos() {
  return (
    <>
      <PageHero
        rotulo="Atuação"
        titulo={["Cinco frentes,", "um mesmo método."]}
        descricao="Cada frente tem entrada, documentação e ritmo próprios. O que não muda é o ponto de partida: o dado que a empresa já declarou."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="space-y-px">
            {produtos.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link
                  href={`/produtos/${p.slug}/`}
                  className="group grid gap-6 border-t border-paper-3 py-10 transition-colors duration-300 hover:bg-paper-2 md:grid-cols-[0.4fr_1fr_auto] md:items-start md:gap-10 md:px-4 motion-reduce:transition-none"
                >
                  <div>
                    <span className="rotulo text-ink">
                      {p.chamada}
                    </span>
                    <p className="mt-2 text-xs text-muted">{p.recorrencia}</p>
                    {p.setor ? (
                      <p className="mt-1 text-xs text-muted">
                        Setor: {p.setor}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <h2 className="text-2xl leading-snug text-ink md:text-3xl">
                      {p.nome}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                      {p.resumo}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="text-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
