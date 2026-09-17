import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a Abrão & Co trata os dados pessoais informados neste site, com que base legal, com quem compartilha e como exercer seus direitos.",
  robots: { index: true, follow: true },
};

const sede = site.escritorios.find((e) => "sede" in e && e.sede);

/**
 * Uma seção da política. Numeradas porque é documento de referência: quem
 * escreve pedindo um direito cita o item.
 *
 * Sem animação de entrada, de propósito. Texto legal tem que estar lá — ao
 * imprimir, ao salvar em PDF, ao ser lido por ferramenta que não rola a
 * página. Entrada em scroll é recurso de página de venda, não de documento.
 */
function Item({
  numero,
  titulo,
  children,
}: {
  numero: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-paper-3 pt-8">
      <div className="flex gap-6">
        <span className="rotulo flex-none pt-1.5 text-azul tabular-nums">
          {String(numero).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl text-ink">{titulo}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tabela({
  cabecalho,
  linhas,
}: {
  cabecalho: string[];
  linhas: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <thead>
          <tr>
            {cabecalho.map((c) => (
              <th
                key={c}
                scope="col"
                className="rotulo border-b border-paper-3 py-3 pr-6 text-left align-bottom text-muted last:pr-0"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td
                  key={j}
                  className={`border-b border-paper-3 py-4 pr-6 align-top leading-relaxed last:pr-0 ${
                    j === 0 ? "text-ink" : "text-muted"
                  }`}
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacidade() {
  return (
    <>
      <PageHero
        rotulo="Privacidade"
        titulo={["Política de privacidade"]}
        descricao={`Em vigor desde ${site.politicasAtualizadasEm}. Descreve o que este site coleta, por quê, com quem compartilha e o que você pode exigir a respeito.`}
      />

      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <div className="max-w-3xl space-y-12">
            <Item numero={1} titulo="Quem trata seus dados">
              <p>
                {site.legal.razaoSocial}, inscrita no CNPJ sob o nº{" "}
                {site.legal.cnpj}, com sede em{" "}
                {sede ? `${sede.linhas.join(", ")}, ${sede.cidade} — ${sede.uf}` : ""}
                , é a <strong className="font-medium text-ink">controladora</strong>{" "}
                dos dados pessoais coletados neste site. Controladora é quem
                decide por que e como esses dados são tratados.
              </p>
            </Item>

            <Item numero={2} titulo="Encarregado">
              <p>
                O encarregado pelo tratamento de dados, previsto no art. 41 da
                Lei nº 13.709/2018, é {site.encarregado.nome}. Todo pedido
                relativo a dados pessoais pode ser enviado para{" "}
                <a
                  href={`mailto:${site.encarregado.email}`}
                  className="text-ink underline underline-offset-4"
                >
                  {site.encarregado.email}
                </a>
                .
              </p>
            </Item>

            <Item numero={3} titulo="Que dados coletamos">
              <p>
                <strong className="font-medium text-ink">
                  Os que você informa.
                </strong>{" "}
                No formulário de contato: nome, empresa, e-mail, telefone, o
                assunto escolhido e o texto que você escrever. Nada além disso é pedido, e nenhum campo é preenchido
                por nós.
              </p>
              <p>
                <strong className="font-medium text-ink">
                  Os que o navegador envia sozinho.
                </strong>{" "}
                Como qualquer site, o nosso registra endereço IP, data e hora do
                acesso, páginas visitadas e identificação do navegador. Esses
                registros existem para segurança e para cumprir o art. 15 do
                Marco Civil da Internet.
              </p>
              <p>
                <strong className="font-medium text-ink">
                  O que não coletamos.
                </strong>{" "}
                Não pedimos CPF, dados bancários, documentos fiscais nem
                qualquer dado sensível por este site. Se o seu caso exigir esse
                tipo de documento, ele é solicitado depois, por canal próprio, e
                sob contrato.
              </p>
            </Item>

            <Item numero={4} titulo="Para que usamos, e com que base legal">
              <Tabela
                cabecalho={["Finalidade", "Dados", "Base legal"]}
                linhas={[
                  [
                    "Responder ao contato e avaliar se há trabalho possível dentro da nossa área de atuação",
                    "Os informados no formulário",
                    "Procedimentos preliminares a contrato, a seu pedido (art. 7º, V) e o consentimento que você marca ao enviar (art. 7º, I)",
                  ],
                  [
                    "Segurança do site e apuração de abuso",
                    "Registros de acesso",
                    "Cumprimento de obrigação legal (art. 7º, II) e legítimo interesse (art. 7º, IX)",
                  ],
                  [
                    "Cumprir prazos legais e fiscais, quando o contato vira contrato",
                    "Dados cadastrais e contratuais",
                    "Cumprimento de obrigação legal (art. 7º, II)",
                  ],
                ]}
              />
              <p>
                Não usamos seus dados para publicidade, não fazemos perfilamento
                e não tomamos decisões automatizadas sobre você.
              </p>
            </Item>

            <Item numero={5} titulo="Com quem compartilhamos">
              <p>
                Não vendemos nem cedemos dados pessoais. O compartilhamento se
                limita aos fornecedores que operam a infraestrutura do site e do
                nosso atendimento:
              </p>
              <Tabela
                cabecalho={["Quem", "Para quê", "Onde fica"]}
                linhas={[
                  [
                    "WhatsApp (Meta)",
                    "Quando você escolhe enviar pelo WhatsApp, a mensagem que o site monta é entregue pelo aplicativo, nos termos e na política de privacidade dele",
                    "Exterior",
                  ],
                  [
                    "Cloudflare",
                    "Hospedagem do site e registros de acesso",
                    "Exterior",
                  ],
                  [
                    "Resend",
                    "Entrega do formulário como e-mail para a equipe comercial",
                    "Exterior",
                  ],
                  [
                    "Google Workspace",
                    "Caixa de e-mail corporativa onde o contato é lido",
                    "Exterior",
                  ],
                ]}
              />
              <p>
                Também podemos compartilhar dados com autoridade pública quando
                houver obrigação legal ou ordem judicial.
              </p>
            </Item>

            <Item numero={6} titulo="Transferência internacional">
              <p>
                Os fornecedores acima processam dados fora do Brasil. A
                transferência é feita com amparo no art. 33 da Lei nº
                13.709/2018 e limitada ao necessário para prestar o serviço
                descrito em cada linha da tabela.
              </p>
            </Item>

            <Item numero={7} titulo="Por quanto tempo guardamos">
              <Tabela
                cabecalho={["Dado", "Prazo"]}
                linhas={[
                  [
                    "Contato que não avança",
                    "Até 12 meses após a última interação, salvo se você pedir a exclusão antes",
                  ],
                  [
                    "Registros de acesso",
                    "6 meses, conforme o art. 15 do Marco Civil da Internet",
                  ],
                  [
                    "Contato que vira contrato",
                    "Pelo prazo do contrato e pelos prazos legais e fiscais aplicáveis depois dele",
                  ],
                ]}
              />
            </Item>

            <Item numero={8} titulo="Seus direitos, e como exercer">
              <p>
                O art. 18 da Lei nº 13.709/2018 garante a você, entre outros
                direitos: confirmar que existe tratamento; acessar seus dados;
                corrigir dado incompleto, inexato ou desatualizado; pedir
                anonimização, bloqueio ou eliminação de dado desnecessário ou
                excessivo; pedir a portabilidade; revogar o consentimento; e ser
                informado com quem compartilhamos.
              </p>
              <p>
                Para exercer qualquer um deles, escreva para{" "}
                <a
                  href={`mailto:${site.encarregado.email}`}
                  className="text-ink underline underline-offset-4"
                >
                  {site.encarregado.email}
                </a>
                . Respondemos em até 15 dias. Podemos pedir informação adicional
                para confirmar que o pedido é seu — é proteção sua, não
                obstáculo.
              </p>
              <p>
                Revogar o consentimento não apaga o que foi feito enquanto ele
                valia, e não alcança dado que precisemos manter por obrigação
                legal.
              </p>
            </Item>

            <Item numero={9} titulo="Segurança">
              <p>
                O site trafega inteiramente em HTTPS. O acesso às mensagens
                recebidas é restrito à equipe que precisa delas para atender o
                contato. Nenhum sistema é infalível: se acontecer incidente de
                segurança com risco relevante a você, comunicamos você e a ANPD,
                como manda o art. 48.
              </p>
            </Item>

            <Item numero={10} titulo="Cookies">
              <p>
                Este site <strong className="font-medium text-ink">não usa</strong>{" "}
                cookies de publicidade, de rastreamento entre sites nem
                ferramenta de medição de audiência. Não há banner de cookies
                porque não há o que consentir. Se isso mudar, esta política é
                atualizada antes, e o aviso correspondente passa a aparecer.
              </p>
            </Item>

            <Item numero={11} titulo="Mudanças nesta política">
              <p>
                Alterações passam a valer na data indicada no topo desta página.
                Mudança que amplie o uso dos seus dados não é aplicada
                retroativamente sem nova base legal.
              </p>
            </Item>
          </div>
        </Container>
      </section>
    </>
  );
}
