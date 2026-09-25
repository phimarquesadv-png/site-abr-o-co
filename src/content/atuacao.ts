/**
 * Atuação, conforme o portfólio institucional.
 *
 * O portfólio é a fonte que manda sobre o catálogo (decisão de Philipe,
 * 2026-09-01). Os nomes operacionais internos — ARO Débito, ARO Crédito,
 * Parcelamento, Insumos — continuam valendo dentro de casa, mas não são a
 * taxonomia pública.
 */

export type Frente = {
  slug: string;
  nome: string;
  descricao: string;
};

/** As quatro frentes da apresentação comercial. */
export const frentes: Frente[] = [
  {
    slug: "negocio",
    nome: "Negócio",
    descricao:
      "O ponto de partida das outras três. Ler a operação antes de ler o tributo: entender como a empresa ganha dinheiro para então enxergar onde a carga pesa sem precisar pesar.",
  },
  {
    slug: "tributario",
    nome: "Tributário",
    descricao:
      "Boutique tributária: consultoria de alto valor, créditos tributários e contencioso. É a frente onde vive a Análise 360º e as teses que a sustentam.",
  },
  {
    slug: "tecnologia",
    nome: "Tecnologia",
    descricao:
      "Startup própria, que desenvolveu ferramenta para calcular os impactos da Reforma Tributária sobre a operação de cada empresa.",
  },
  {
    slug: "agronegocio",
    nome: "Agronegócio",
    descricao:
      "Solução tributária desenhada para o agronegócio, visando a tributação mais benéfica para o produtor rural.",
  },
];

/** O produto central descrito no portfólio. */
export const analise = {
  nome: "Análise 360º",
  resumo:
    "Revisão detalhada da parte fiscal de créditos e débitos, estaduais e federais, somada à leitura dos impactos operacionais da Reforma Tributária. Ao final, as oportunidades encontradas vêm com os valores a recuperar apontados.",
  pilares: [
    {
      titulo: "Segurança",
      texto:
        "Atuação conservadora, restrita a questões previstas em lei ou já pacificadas pelos Tribunais Superiores, no STJ e no STF.",
    },
    {
      titulo: "Dupla checagem",
      texto:
        "Ao final, revisão dos serviços contábeis, apontando riscos, contingências e oportunidades.",
    },
    {
      titulo: "Resultado",
      texto:
        "Fluxo de caixa, aumento da margem de lucro, dinheiro recuperado e compensação de débitos.",
    },
  ],
};

/** Teses citadas no portfólio. */
export const teses = [
  {
    nome: "Exclusão da base de cálculo",
    texto:
      "Exclusão do ICMS da base de cálculo do PIS/COFINS, do ICMS-ST da base do PIS/COFINS, e do PIS/COFINS da própria base.",
  },
  {
    nome: "Subvenção",
    texto:
      "Análise de benefícios fiscais estaduais e federais concedidos que podem estar sendo recolhidos indevidamente ou a maior.",
  },
  {
    nome: "Reporto",
    texto:
      "Identificação das compras para revenda sem crédito e aplicação da alíquota básica do regime.",
  },
  {
    nome: "Desossa",
    texto:
      "Recuperação de imposto indevido ou a maior sobre a base de cálculo da operação de desossa.",
  },
];

/** Segmentos com base instalada, conforme o portfólio. */
export const segmentos = [
  { slug: "atacado-alimentos", nome: "Atacadistas e Alimentos" },
  { slug: "transporte", nome: "Transporte" },
  { slug: "industria-comercio", nome: "Indústria e Comércio" },
];
