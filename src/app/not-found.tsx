import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";

export default function NaoEncontrado() {
  return (
    <>
      <PageHero
        rotulo="Erro 404"
        titulo={["Esta página não existe."]}
        descricao="O endereço pode ter mudado ou o link estar incompleto."
      />
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Botao href="/">Voltar ao início</Botao>
        </Container>
      </section>
    </>
  );
}
