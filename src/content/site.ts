/**
 * Dados institucionais do site.
 *
 * Origem: timbrado oficial da Abrão & Co (arquivo .ai enviado em 2026-09-01).
 * Os campos marcados como PENDENTE ainda não têm fonte — não preencher por
 * estimativa.
 */
export const site = {
  nome: "Abrão & Co",
  assinatura: "Negócio antes do tributo.",
  descricao:
    "Escritório de negócios com visão tributária. Revisão fiscal, créditos tributários e contencioso, em quatro frentes: Negócio, Tributário, Tecnologia e Agronegócio. São Paulo, Brasília e Goiânia.",
  url: "https://abrao.co",

  contato: {
    // Caixa comercial, confirmada por Daniel em 2026-09-17. Substitui o
    // e-mail pessoal do sócio fundador que constava do portfólio.
    email: "contato@abrao.co",
    // Número confirmado por Daniel em 2026-09-17.
    telefone: "+55 (62) 99924-2307",
    whatsapp: "5562999242307",
  },

  /** Endereços conforme o timbrado. */
  escritorios: [
    {
      cidade: "São Paulo",
      uf: "SP",
      linhas: ["Av. Faria Lima, nº 3729", "5º andar"],
    },
    {
      cidade: "Brasília",
      uf: "DF",
      linhas: ["SCN, Qd. 02, nº 190", "5º andar"],
    },
    {
      cidade: "Goiânia",
      uf: "GO",
      // Sede, conforme a Cláusula Segunda do contrato social.
      linhas: [
        "Rua 87, nº 535, Qd. F27, Lt. 61, Sala 02",
        "Setor Sul · CEP 74.080-295",
      ],
      sede: true,
    },
  ],

  /**
   * Números do histórico. Vieram do portfólio institucional (500M / 300M) e
   * foram atualizados e corrigidos pelo Philipe em 2026-09-22: valores
   * exatos e legendas na ordem certa (créditos recuperados, débitos
   * renegociados).
   * PENDENTE: período de apuração e critério de cálculo, para a nota de rodapé.
   */
  historico: [
    { valor: 517, sufixo: "M", legenda: "em Créditos Recuperados" },
    { valor: 309, sufixo: "M", legenda: "de Débitos Renegociados" },
  ],

  legal: {
    // Contrato social de constituição, 08/01/2026. NIRE 52207400221.
    razaoSocial: "Abrão & Co Escritório de Negócios e Participações Ltda",
    // Cartão CNPJ emitido em 09/01/2026. Matriz, situação ativa.
    cnpj: "64.381.438/0001-40",
  },

  /**
   * Encarregado pelo tratamento de dados (LGPD, art. 41). A lei exige indicar
   * um canal público; não exige que seja uma pessoa dedicada.
   *
   * Aponta para a caixa comercial, confirmada por Philipe em 2026-09-17: é
   * onde o pedido de titular de dados de fato será lido. O art. 41 pede canal
   * de comunicação, não endereço exclusivo — e o site passa a ter um só
   * e-mail, em vez de um comercial e um de privacidade.
   */
  encarregado: {
    nome: "André Abrão",
    email: "contato@abrao.co",
  },

  /** Data de vigência das políticas. Atualizar a cada revisão de texto. */
  politicasAtualizadasEm: "17 de setembro de 2026",

  /** Perfis oficiais, confirmados pelo Philipe em 2026-09-28. */
  redes: [
    {
      nome: "Instagram",
      usuario: "@abrao.co",
      href: "https://www.instagram.com/abrao.co",
    },
    {
      nome: "LinkedIn",
      usuario: "Abrão & Co",
      href: "https://www.linkedin.com/company/abr%C3%A3o-co",
    },
  ],

  navegacao: [
    { href: "/quem-somos/", rotulo: "Quem somos" },
    { href: "/atuacao/", rotulo: "Atuação" },
    { href: "/contato/", rotulo: "Contato" },
  ],
} as const;

/**
 * Link universal do Google Maps para um escritório: no celular abre o
 * aplicativo de mapas, no computador abre o site, sempre com o endereço já
 * pesquisado para a pessoa traçar a rota.
 *
 * A busca usa rua, número, quadra, bairro e cidade: andar, sala e lote
 * confundem o geocodificador e não mudam o ponto no mapa.
 */
export function linkMapa(e: {
  cidade: string;
  uf: string;
  linhas: readonly string[];
}) {
  const ruaNumero = e.linhas[0]
    .split(",")
    .map((t) => t.trim())
    .filter((t) => !/^(Lt\.|Sala|\d+º andar)/i.test(t))
    .join(", ");
  const bairro = (e.linhas[1] ?? "").split("·")[0].trim();
  const bairroLimpo = /andar/i.test(bairro) ? "" : bairro;
  const endereco = [ruaNumero, bairroLimpo, `${e.cidade} - ${e.uf}`]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}
