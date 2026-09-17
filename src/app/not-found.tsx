import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import Monograma from "@/components/ui/Monograma";

export default function NaoEncontrado() {
  return (
    <>
      <PageHero
        rotulo="Erro 404"
        titulo={["Esta página não existe."]}
        descricao="O endereço pode ter mudado ou o link estar incompleto."
      />
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <Monograma
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-16 hidden w-[20rem] text-paper-2 md:block"
        />
        <Container className="relative">
          <Botao href="/">Voltar ao início</Botao>
        </Container>
      </section>
    </>
  );
}
