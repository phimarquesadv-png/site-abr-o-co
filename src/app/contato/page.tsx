import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import FormularioContato from "@/components/sections/FormularioContato";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite uma primeira conversa com a Abrão & Co. Atuação restrita a empresas no regime de Lucro Real.",
};

export default function Contato() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        titulo={["Comece por uma", "primeira conversa."]}
        descricao="Vinte minutos costumam bastar para saber se há trabalho possível. Quando não há, dizemos ali mesmo."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <FormularioContato />
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="rounded-lg bg-paper-2 p-8">
                <Rotulo>Antes de enviar</Rotulo>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                  <li>
                    Nossa atuação é restrita a empresas no regime de{" "}
                    <strong className="font-medium text-ink">Lucro Real</strong>.
                  </li>
                  <li>
                    Não fazemos estimativa de valor sem acesso à documentação. A
                    primeira conversa serve para entender o caso, não para
                    projetar resultado.
                  </li>
                  <li>
                    Os dados enviados são usados apenas para o contato comercial
                    e ficam sob a política de privacidade.
                  </li>
                </ul>

                {site.contato.email ? (
                  <div className="mt-9 border-t border-paper-3 pt-6">
                    <p className="rotulo text-muted">
                      Ou escreva direto
                    </p>
                    <a
                      href={`mailto:${site.contato.email}`}
                      className="mt-3 inline-block text-ink underline underline-offset-4"
                    >
                      {site.contato.email}
                    </a>
                  </div>
                ) : null}
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
