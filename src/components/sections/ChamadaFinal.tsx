import Container from "@/components/ui/Container";
import Botao from "@/components/ui/Botao";
import Reveal from "@/components/motion/Reveal";
import VideoSede from "@/components/ui/VideoSede";

export default function ChamadaFinal() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-36">
      {/* O monograma animado da marca, nítido, à direita do texto. O fundo do
          vídeo é branco; `mix-blend-multiply` faz esse branco sumir sobre o
          papel e deixa só o azul em movimento. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 hidden w-[24rem] -translate-y-1/2 mix-blend-multiply md:block"
      >
        <VideoSede
          src="/marca/monograma.mp4"
          poster="/marca/monograma.jpg"
          className="aspect-square w-full"
        />
      </div>

      <Container className="relative">
        <Reveal className="max-w-2xl">
          <h2 className="text-ink text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] tracking-[-0.03em]">
            Quer entender como isso se aplica à sua empresa?
          </h2>
          <p className="mt-7 max-w-xl leading-relaxed text-muted">
            O primeiro contato serve para ouvir o caso e dizer, com franqueza,
            se há trabalho a fazer. Sem estimativa antes de ver a documentação,
            sem promessa antes de conhecer a operação.
          </p>
          <div className="mt-10">
            <Botao href="/contato/">Fale conosco</Botao>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
