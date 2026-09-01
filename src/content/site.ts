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
    "Consultoria tributária para empresas no Lucro Real. Diagnóstico de débitos e créditos, parcelamento e aproveitamento de ICMS sobre insumos. São Paulo, Brasília e Goiânia.",
  url: "https://abrao.co",

  contato: {
    // PENDENTE: e-mail comercial oficial
    email: "",
    // PENDENTE: telefone e WhatsApp Business
    telefone: "",
    whatsapp: "",
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
   * Números do portfólio institucional. Reproduzidos exatamente como constam
   * lá — sem arredondar, sem reescrever.
   * PENDENTE: período de apuração e critério de cálculo, para a nota de rodapé.
   */
  historico: [
    { valor: 500, sufixo: "M", legenda: "em Créditos Renegociados" },
    { valor: 300, sufixo: "M", legenda: "de Débitos Recuperados" },
  ],

  legal: {
    // Contrato social de constituição, 08/01/2026. NIRE 52207400221.
    razaoSocial: "Abrão & Co Escritório de Negócios e Participações Ltda",
    // Cartão CNPJ emitido em 09/01/2026. Matriz, situação ativa.
    cnpj: "64.381.438/0001-40",
    // Não se aplica: o contrato social constitui uma sociedade empresária
    // limitada, não uma sociedade de advogados. Confirmado por Philipe em
    // 2026-09-01 e pelo próprio contrato.
    oab: "",
  },

  navegacao: [
    { href: "/produtos/", rotulo: "Atuação" },
    { href: "/transportes/", rotulo: "Transportes" },
    { href: "/quem-somos/", rotulo: "Quem somos" },
    { href: "/contato/", rotulo: "Contato" },
  ],
} as const;
