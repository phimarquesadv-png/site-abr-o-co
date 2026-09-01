import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Bloco de qualificação. Existe para que a empresa errada se identifique como
 * errada antes de preencher o formulário — economiza o tempo do Comercial e o
 * tempo de quem está do outro lado.
 */
const criterios = [
  {
    titulo: "Regime de Lucro Real",
    texto:
      "É o recorte de toda a nossa atuação. Empresas no Simples Nacional ou no Lucro Presumido não se enquadram nos trabalhos que conduzimos.",
  },
  {
    titulo: "Passivo ou crédito relevante",
    texto:
      "Débitos em aberto, parcelamentos em curso, autuações recebidas — ou bases de cálculo com crédito ainda não aproveitado.",
  },
  {
    titulo: "Documentação disponível",
    texto:
      "Trabalhamos sobre o que a empresa já declarou. Sem acesso ao SPED, às declarações acessórias e à procuração eletrônica, não há análise possível.",
  },
];

export default function Qualificacao() {
  return (
    <section className="border-b border-paper-3 bg-paper py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <Rotulo>Para quem trabalhamos</Rotulo>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-ink">
              Um recorte estreito, de propósito.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Concentrar em um único regime é o que permite conhecer a fundo as
              teses que se aplicam a ele.
            </p>
          </Reveal>

          <Stagger className="space-y-px">
            {criterios.map((c, i) => (
              <StaggerItem key={c.titulo}>
                <div className="border-t border-paper-3 py-8 first:border-t-0 md:py-9">
                  <div className="flex gap-6">
                    <span className="pt-1 text-sm text-ink">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg text-ink">{c.titulo}</h3>
                      <p className="mt-2.5 leading-relaxed text-muted">
                        {c.texto}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
