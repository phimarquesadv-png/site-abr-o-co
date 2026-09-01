import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import Reveal from "@/components/motion/Reveal";

export default function ChamadaFinal() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-ink">
            Vale uma conversa de vinte minutos.
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-muted">
            Se a sua empresa está no Lucro Real, o contato inicial já é
            suficiente para saber se existe trabalho possível — e, quando não
            existe, dizemos isso na primeira conversa.
          </p>
          <div className="mt-10 flex justify-center">
            <Botao href="/contato/">Falar com a Abrão &amp; Co</Botao>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
