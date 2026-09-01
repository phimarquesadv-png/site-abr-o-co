import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Termos de uso",
  robots: { index: false, follow: true },
};

export default function Termos() {
  return (
    <>
      <PageHero rotulo="Termos" titulo={["Termos de uso"]} />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="max-w-2xl space-y-8 leading-relaxed text-muted">
            {/* MINUTA — revisão jurídica pendente. */}
            <p className="rounded-md bg-paper-2 px-5 py-4 text-sm">
              <strong className="text-ink">Minuta em revisão.</strong> Este
              texto é uma base a ser validada pela área jurídica antes da
              publicação.
            </p>

            <div>
              <h2 className="text-2xl text-ink">
                Natureza do conteúdo
              </h2>
              <p className="mt-3">
                As informações publicadas neste site têm caráter estritamente
                informativo sobre as áreas de atuação da consultoria. Não
                constituem orientação técnica, parecer ou recomendação aplicável
                a caso concreto, e não estabelecem relação de prestação de
                serviços.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-ink">
                Ausência de garantia de resultado
              </h2>
              <p className="mt-3">
                Nenhum conteúdo deste site promete, garante ou projeta resultado
                em matéria tributária. Cada caso depende da documentação, da
                situação fiscal da empresa e da decisão dos órgãos competentes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-ink">Contato</h2>
              <p className="mt-3">
                O envio de mensagem pelo formulário não cria vínculo contratual
                nem obrigação de atendimento, e não deve conter informação
                sigilosa antes do estabelecimento formal da relação.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
