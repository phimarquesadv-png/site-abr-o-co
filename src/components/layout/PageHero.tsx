import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import TextReveal from "@/components/motion/TextReveal";

/** Topo padrão das páginas internas: claro, como o timbrado. */
export default function PageHero({
  rotulo,
  titulo,
  descricao,
}: {
  rotulo: string;
  titulo: string[];
  descricao?: string;
}) {
  return (
    <section className="bg-paper">
      <Container className="pt-36 pb-16 md:pt-44 md:pb-20">
        <Rotulo>{rotulo}</Rotulo>
        <TextReveal
          as="h1"
          delayInicial={0.1}
          className="mt-7 max-w-4xl text-ink text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04] tracking-[-0.03em]"
          linhas={titulo}
        />
        {descricao ? (
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {descricao}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
