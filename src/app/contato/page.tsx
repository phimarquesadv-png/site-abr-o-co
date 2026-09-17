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
    "Fale com a Abrão & Co por formulário, WhatsApp, e-mail ou telefone. Escritórios em São Paulo, Brasília e Goiânia.",
};

export default function Contato() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        titulo={["Fale com a gente."]}
        descricao="Pelo formulário, pelo WhatsApp ou pelos canais ao lado. O primeiro contato serve para ouvir o caso e dizer se há trabalho a fazer."
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
                    Não fazemos estimativa de valor sem acesso à documentação. A
                    primeira conversa serve para entender o caso, não para
                    projetar resultado.
                  </li>
                  <li>
                    Não envie documento fiscal nem dado de terceiros por aqui.
                    Se o contato avançar, combinamos o canal adequado.
                  </li>
                  <li>
                    Os dados enviados são usados apenas para o contato comercial
                    e ficam sob a política de privacidade.
                  </li>
                </ul>

                <div className="mt-9 space-y-5 border-t border-paper-3 pt-6">
                  <div>
                    <p className="rotulo text-muted">Ou escreva direto</p>
                    <a
                      href={`mailto:${site.contato.email}`}
                      className="mt-2.5 inline-block text-ink underline underline-offset-4"
                    >
                      {site.contato.email}
                    </a>
                  </div>
                  <div>
                    <p className="rotulo text-muted">Telefone</p>
                    <a
                      href={`tel:${site.contato.telefone.replace(/[^+\d]/g, "")}`}
                      className="mt-2.5 inline-block text-ink underline underline-offset-4"
                    >
                      {site.contato.telefone}
                    </a>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
