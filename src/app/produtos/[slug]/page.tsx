import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import ChamadaFinal from "@/components/sections/ChamadaFinal";
import { produtos, encontrarProduto } from "@/content/produtos";

type Params = { params: Promise<{ slug: string }> };

// Export estático: o Next precisa saber todas as rotas em tempo de build.
export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const produto = encontrarProduto(slug);
  if (!produto) return {};
  return { title: produto.nome, description: produto.resumo };
}

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const produto = encontrarProduto(slug);
  if (!produto) notFound();

  return (
    <>
      <PageHero
        rotulo={produto.chamada}
        titulo={[produto.nome]}
        descricao={produto.resumo}
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <Rotulo>Como conduzimos</Rotulo>
              </Reveal>
              <ol className="mt-10 space-y-px">
                {produto.etapas.map((e, i) => (
                  <Reveal as="li" key={e.titulo} delay={i * 0.05}>
                    <div className="border-t border-paper-3 py-8">
                      <div className="flex gap-7">
                        <span className="text-2xl leading-none text-ink">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h2 className="text-lg text-ink">{e.titulo}</h2>
                          <p className="mt-2.5 leading-relaxed text-muted">
                            {e.texto}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <aside className="md:sticky md:top-32 md:self-start">
              <Reveal>
                <div className="rounded-lg bg-paper-2 p-8">
                  <p className="rotulo text-muted">
                    Para quem
                  </p>
                  <p className="mt-4 leading-relaxed text-ink">
                    {produto.paraQuem}
                  </p>

                  <p className="mt-9 rotulo text-muted">
                    Documentação
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {produto.documentos.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span aria-hidden className="text-ink">
                          ·
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-9 rotulo text-muted">
                    Ritmo
                  </p>
                  <p className="mt-3 text-sm text-ink">{produto.recorrencia}</p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <ChamadaFinal />
    </>
  );
}
