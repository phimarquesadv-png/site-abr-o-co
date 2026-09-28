import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { listarPosts, formatarData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Textos da Abrão & Co sobre tributos, operação e o que muda para as empresas.",
};

export default function Blog() {
  const posts = listarPosts();

  return (
    <>
      <PageHero rotulo="Blog" titulo={["Negócio, tributo", "e o que muda."]} />

      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          {posts.length === 0 ? (
            <p className="text-lg text-muted">Em breve.</p>
          ) : (
            <Stagger className="divide-y divide-paper-3 border-t border-paper-3">
              {posts.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group grid gap-3 py-8 md:grid-cols-[10rem_1fr] md:gap-10 md:py-10"
                  >
                    <time dateTime={p.data} className="rotulo text-muted">
                      {formatarData(p.data)}
                    </time>
                    <div>
                      <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-azul motion-reduce:transition-none">
                        {p.titulo}
                      </h2>
                      {p.resumo ? (
                        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                          {p.resumo}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
    </>
  );
}
