import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Condições de uso do site da Abrão & Co: natureza do conteúdo, propriedade intelectual, formulário de contato e limites de responsabilidade.",
  robots: { index: true, follow: true },
};

const sede = site.escritorios.find((e) => "sede" in e && e.sede);

/**
 * Uma seção dos termos. Numeradas porque é documento de referência, e sem
 * animação de entrada pelo mesmo motivo da política de privacidade: texto
 * legal precisa estar lá ao imprimir, ao salvar em PDF e ao ser lido por
 * ferramenta que não rola a página.
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

export default function Termos() {
  return (
    <>
      <PageHero
        rotulo="Termos"
        titulo={["Termos de uso"]}
        descricao={`Em vigor desde ${site.politicasAtualizadasEm}. Valem para quem navega neste site ou usa o formulário de contato.`}
      />

      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <div className="max-w-3xl space-y-12">
            <Item numero={1} titulo="Quem responde por este site">
              <p>
                O site{" "}
                <strong className="font-medium text-ink">
                  {site.url.replace("https://", "")}
                </strong>{" "}
                é mantido por {site.legal.razaoSocial}, inscrita no CNPJ sob o
                nº {site.legal.cnpj}, com sede em{" "}
                {sede
                  ? `${sede.linhas.join(", ")}, ${sede.cidade}/${sede.uf}`
                  : ""}
                . Ao navegar, você concorda com estes termos. Se não concordar,
                a alternativa é não usar o site.
              </p>
            </Item>

            <Item numero={2} titulo="O que este site é, e o que não é">
              <p>
                É um site institucional. Apresenta a Abrão &amp; Co, suas
                frentes de atuação, sua equipe e seus canais de contato.
              </p>
              <p>
                <strong className="font-medium text-ink">
                  Não é orientação técnica.
                </strong>{" "}
                Nada aqui, seja descrição de tese, de método ou de resultado
                anterior, constitui parecer, recomendação ou análise aplicável a
                um caso concreto. Cada situação depende da documentação, do
                histórico fiscal da empresa e da decisão dos órgãos competentes,
                e só pode ser avaliada mediante análise própria, sob contrato.
              </p>
              <p>
                <strong className="font-medium text-ink">
                  Não é promessa de resultado.
                </strong>{" "}
                Os números de histórico publicados são valores acumulados de
                trabalhos passados. Não projetam, não estimam e não garantem
                resultado futuro para ninguém.
              </p>
            </Item>

            <Item numero={3} titulo="Formulário e canais de contato">
              <p>
                Enviar mensagem pelo formulário, pelo WhatsApp ou por e-mail{" "}
                <strong className="font-medium text-ink">
                  não cria vínculo contratual
                </strong>{" "}
                nem obrigação de atendimento. A relação de prestação de serviços
                só existe depois de proposta aceita e contrato assinado.
              </p>
              <p>
                Por isso, não envie informação sigilosa, documento fiscal ou
                dado de terceiros pelo formulário. Se o contato avançar, o canal
                e o momento adequados para isso serão combinados.
              </p>
              <p>
                Ao usar o botão que abre o WhatsApp, a conversa passa a correr
                no aplicativo, sob os termos e a política de privacidade da
                Meta. O que acontece dentro dele está fora do nosso controle.
              </p>
            </Item>

            <Item numero={4} titulo="Propriedade intelectual">
              <p>
                O logotipo, o nome, a assinatura “Negócio antes do tributo”, os
                textos, as fotografias e o desenho deste site pertencem à Abrão
                &amp; Co ou são usados sob licença. Você pode ler, citar com
                referência e compartilhar o endereço das páginas. Não pode
                reproduzir o conteúdo em outro site, usar a marca ou as
                fotografias, nem apresentar qualquer parte como sua.
              </p>
            </Item>

            <Item numero={5} titulo="Uso permitido">
              <p>
                O site existe para ser lido por pessoas. Não é permitido usar
                robôs, raspadores ou qualquer automação para extrair conteúdo em
                massa, sobrecarregar o servidor, enviar mensagens automatizadas
                pelo formulário ou tentar acessar área que não seja pública.
              </p>
            </Item>

            <Item numero={6} titulo="Dados pessoais">
              <p>
                O tratamento dos dados que você informa está descrito na{" "}
                <a
                  href="/privacidade/"
                  className="text-ink underline underline-offset-4"
                >
                  política de privacidade
                </a>
                , que faz parte destes termos.
              </p>
            </Item>

            <Item numero={7} titulo="Links para fora">
              <p>
                O site pode apontar para páginas de terceiros, como WhatsApp,
                órgãos públicos e veículos de imprensa. Não respondemos pelo
                conteúdo, pela disponibilidade nem pelas práticas desses sites.
              </p>
            </Item>

            <Item
              numero={8}
              titulo="Disponibilidade e limites de responsabilidade"
            >
              <p>
                Procuramos manter o site no ar e atualizado, mas ele é oferecido
                como está. Pode sair do ar para manutenção, mudar de conteúdo ou
                conter imprecisão que ainda não corrigimos. Não respondemos por
                decisão tomada com base exclusivamente no que está publicado
                aqui, nem por prejuízo decorrente de indisponibilidade,
                interrupção ou falha de acesso.
              </p>
              <p>
                Nada nestes termos afasta responsabilidade que a lei não permita
                afastar.
              </p>
            </Item>

            <Item numero={9} titulo="Mudanças">
              <p>
                Estes termos podem ser alterados. A versão em vigor é sempre a
                publicada nesta página, com a data indicada no topo. Alteração
                relevante é sinalizada na própria página por um período
                razoável.
              </p>
            </Item>

            <Item numero={10} titulo="Lei aplicável e foro">
              <p>
                Aplica-se a legislação brasileira. Para qualquer questão
                decorrente do uso deste site, fica eleito o foro da comarca de{" "}
                {sede ? `${sede.cidade}/${sede.uf}` : "Goiânia/GO"}, com
                renúncia a qualquer outro, ressalvadas as hipóteses em que a lei
                assegure foro diverso.
              </p>
            </Item>
          </div>
        </Container>
      </section>
    </>
  );
}
