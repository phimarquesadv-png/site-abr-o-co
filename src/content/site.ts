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
      linhas: ["Rua 87, nº 535"],
    },
  ],

  legal: {
    // PENDENTE: razão social e CNPJ
    razaoSocial: "",
    cnpj: "",
    // PENDENTE: inscrição da sociedade na OAB, se aplicável.
    // Obrigatória no rodapé pelo Provimento 205/2021 do CFOAB caso a
    // Abrão & Co seja sociedade de advogados inscrita.
    oab: "",
  },

  navegacao: [
    { href: "/produtos/", rotulo: "Atuação" },
    { href: "/transportes/", rotulo: "Transportes" },
    { href: "/quem-somos/", rotulo: "Quem somos" },
    { href: "/contato/", rotulo: "Contato" },
  ],
} as const;
