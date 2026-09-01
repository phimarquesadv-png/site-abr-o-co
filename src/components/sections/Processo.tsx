import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";

const etapas = [
  {
    titulo: "Contato inicial",
    texto:
      "Uma conversa curta para entender o regime, o porte e o que motivou a busca. Serve para saber se há trabalho possível — e para dizer quando não há.",
  },
  {
    titulo: "Acesso e documentação",
    texto:
      "Procuração eletrônica e envio dos documentos. Nada é analisado por estimativa: a apuração parte do que a empresa já declarou aos órgãos.",
  },
  {
    titulo: "Diagnóstico",
    texto:
      "Levantamento técnico do passivo, dos créditos ou de ambos, conforme o caso, com revisão interna antes de ir à mesa.",
  },
  {
    titulo: "Devolutiva",
    texto:
      "Apresentação do que foi encontrado e dos caminhos disponíveis, com o que cada um envolve em prazo e risco. A decisão é da empresa.",
  },
  {
    titulo: "Condução",
    texto:
      "Execução do caminho escolhido, com acompanhamento até a operacionalização — e, nos trabalhos recorrentes, mês a mês.",
  },
];

export default function Processo() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-on-dark md:py-32">
      <Container>
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <Rotulo claro>Como funciona</Rotulo>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                Do primeiro contato à operação.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-on-dark-muted">
                O mesmo percurso em qualquer frente. O que muda é a matéria
                analisada, não o método.
              </p>
            </Reveal>
          </div>

          <ol className="space-y-px">
            {etapas.map((e, i) => (
              <Reveal as="li" key={e.titulo} delay={i * 0.05}>
                <div className="border-t border-on-dark/10 py-8 md:py-10">
                  <div className="flex gap-8">
                    <span className="font-display text-3xl leading-none text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl">{e.titulo}</h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-on-dark-muted">
                        {e.texto}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
