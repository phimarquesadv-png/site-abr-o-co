import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  robots: { index: false, follow: true },
};

export default function Privacidade() {
  return (
    <>
      <PageHero rotulo="LGPD" titulo={["Política de privacidade"]} />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="max-w-2xl space-y-8 leading-relaxed text-muted">
            {/* MINUTA. Precisa de revisão jurídica interna antes de publicar —
                os campos de controlador e encarregado ainda estão pendentes. */}
            <p className="rounded-md bg-paper-2 px-5 py-4 text-sm">
              <strong className="text-ink">Minuta em revisão.</strong> Este
              texto é uma base a ser validada pela área jurídica antes da
              publicação.
            </p>

            <div>
              <h2 className="font-display text-2xl text-ink">
                Quem trata os dados
              </h2>
              <p className="mt-3">
                {site.legal.razaoSocial || site.nome}
                {site.legal.cnpj ? `, inscrita no CNPJ ${site.legal.cnpj}` : ""}
                , na qualidade de controladora dos dados coletados neste site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">
                Que dados coletamos
              </h2>
              <p className="mt-3">
                Apenas os dados que você informa no formulário de contato: nome,
                empresa, e-mail, telefone, regime tributário e o contexto
                descrito na mensagem. Não coletamos dados sensíveis nem dados de
                terceiros por este canal.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Para quê</h2>
              <p className="mt-3">
                Exclusivamente para responder ao contato e avaliar se há
                trabalho possível dentro da nossa área de atuação. Não vendemos,
                cedemos nem compartilhamos esses dados para fins publicitários.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Por quanto tempo</h2>
              <p className="mt-3">
                Pelo tempo necessário ao atendimento do contato e ao cumprimento
                de obrigações legais aplicáveis.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Seus direitos</h2>
              <p className="mt-3">
                A Lei nº 13.709/2018 assegura, entre outros, o direito de
                confirmar o tratamento, acessar, corrigir, anonimizar, bloquear
                ou eliminar os dados, e revogar o consentimento. Para exercer
                qualquer um deles, escreva para{" "}
                {site.contato.email || "o e-mail informado no rodapé"}.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Cookies</h2>
              <p className="mt-3">
                Este site não utiliza cookies de publicidade nem de rastreamento
                entre sites. Caso venhamos a adotar ferramenta de medição de
                audiência, esta política será atualizada e o aviso
                correspondente passará a ser exibido.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
