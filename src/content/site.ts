/**
 * Dados institucionais do site.
 *
 * Os campos marcados como PENDENTE precisam do dado real antes da publicação —
 * ver a checklist em `negocio/projetos/site-abrao-co/README.md` no cérebro.
 * Nada aqui pode ser preenchido por estimativa.
 */
export const site = {
  nome: "Abrão & Co",
  descricao:
    "Consultoria tributária para empresas no Lucro Real. Diagnóstico de débitos e créditos, parcelamento e aproveitamento de ICMS sobre insumos.",
  // PENDENTE: domínio definitivo
  url: "https://abraoeco.com.br",

  contato: {
    // PENDENTE: e-mail comercial oficial
    email: "contato@abraoeco.com.br",
    // PENDENTE: telefone e WhatsApp Business
    telefone: "",
    whatsapp: "",
  },

  legal: {
    // PENDENTE: razão social, CNPJ e endereço completo
    razaoSocial: "",
    cnpj: "",
    endereco: "",
    // PENDENTE: inscrição da sociedade na OAB, se aplicável.
    // Se a Abrão & Co for sociedade de advogados, este número é obrigatório
    // no rodapé pelo Provimento 205/2021 do CFOAB.
    oab: "",
  },

  navegacao: [
    { href: "/produtos/", rotulo: "Atuação" },
    { href: "/transportes/", rotulo: "Transportes" },
    { href: "/quem-somos/", rotulo: "Quem somos" },
    { href: "/contato/", rotulo: "Contato" },
  ],
} as const;
