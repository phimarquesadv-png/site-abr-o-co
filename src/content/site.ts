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
    telefone: "+55 (62) 98134-7394",
    whatsapp: "5562981347394",
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
      linhas: ["Rua 87, nº 535, Qd. F27, Lt. 61, Sala 02", "Setor Sul · CEP 74.080-295"],
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

  navegacao: [
    { href: "/atuacao/", rotulo: "Atuação" },
    { href: "/quem-somos/", rotulo: "Quem somos" },
    { href: "/contato/", rotulo: "Contato" },
  ],
} as const;
