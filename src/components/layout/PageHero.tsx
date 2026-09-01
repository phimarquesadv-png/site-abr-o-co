import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import TextReveal from "@/components/motion/TextReveal";

/**
 * Topo escuro padrão das páginas internas.
 *
 * O cabeçalho é fixo e transparente até o primeiro scroll, com texto claro.
 * Por isso toda página começa com um bloco escuro — sem ele o menu ficaria
 * ilegível no carregamento.
 */
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
    <section className="relative overflow-hidden bg-ink text-on-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 60% at 85% 10%, rgba(180,136,76,0.16), transparent 70%)",
        }}
      />
      <Container className="relative pt-36 pb-20 md:pt-44 md:pb-24">
        <Rotulo claro>{rotulo}</Rotulo>
        <TextReveal
          as="h1"
          delayInicial={0.1}
          className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.06]"
          linhas={titulo}
        />
        {descricao ? (
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark-muted">
            {descricao}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
