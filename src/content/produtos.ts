/**
 * Catálogo público de atuação.
 *
 * Fonte: `negocio/produtos/` no cérebro. O que está aqui é a versão voltada ao
 * cliente — os fluxos internos, nomes de responsáveis e faixas de honorário
 * ficam de fora de propósito.
 */

export type Produto = {
  slug: string;
  nome: string;
  chamada: string;
  resumo: string;
  paraQuem: string;
  etapas: { titulo: string; texto: string }[];
  documentos: string[];
  recorrencia: "Pontual" | "Mensal recorrente" | "Pontual, com continuidade";
  setor?: "Transportes";
};

export const produtos: Produto[] = [
  {
    slug: "aro-debito",
    nome: "Diagnóstico de débitos",
    chamada: "ARO Débito",
    resumo:
      "Levantamento completo do passivo tributário da empresa — auto de infração, Receita Federal, PGFN, esfera estadual e discussões judiciais — seguido da análise das vias de negociação disponíveis para cada débito.",
    paraQuem:
      "Empresas no Lucro Real com débitos tributários em aberto, parcelamentos em curso ou autuações recebidas.",
    etapas: [
      {
        titulo: "Procuração e documentos",
        texto:
          "A empresa libera a procuração eletrônica e envia a documentação inicial. É o que permite consultar a posição real do passivo nos sistemas de cada órgão.",
      },
      {
        titulo: "Análise do passivo",
        texto:
          "Mapeamento débito a débito, com a origem, o estágio de cobrança e o órgão responsável por cada um.",
      },
      {
        titulo: "Devolutiva",
        texto:
          "Apresentação das possibilidades técnicas de negociação identificadas, com o que cada caminho envolve. A decisão de prosseguir é da empresa.",
      },
      {
        titulo: "Condução",
        texto:
          "Negociação, renegociação ou medida judicial, conforme a via escolhida, com acompanhamento até a operacionalização.",
      },
    ],
    documentos: [
      "Procuração eletrônica",
      "Documentos societários",
      "Situação fiscal nos órgãos federais e estaduais",
    ],
    recorrencia: "Pontual, com continuidade",
  },
  {
    slug: "aro-credito",
    nome: "Recuperação de créditos",
    chamada: "ARO Crédito",
    resumo:
      "Apuração de créditos tributários passíveis de aproveitamento nas bases previdenciária e de PIS/COFINS, com acompanhamento mensal do aproveitamento em guia.",
    paraQuem:
      "Empresas no Lucro Real com folha relevante ou volume significativo de PIS/COFINS apurado.",
    etapas: [
      {
        titulo: "Procuração no e-CAC",
        texto:
          "Liberação do acesso necessário para apurar a base de cálculo a partir dos dados já declarados pela empresa.",
      },
      {
        titulo: "Cálculo",
        texto:
          "Apuração técnica do crédito, seguida de revisão interna antes de qualquer apresentação à empresa.",
      },
      {
        titulo: "Alinhamento",
        texto:
          "Apresentação do resultado e do plano de aproveitamento. A empresa avalia e decide o ritmo.",
      },
      {
        titulo: "Ciclo mensal",
        texto:
          "A partir da aprovação, o aproveitamento passa a ser acompanhado mês a mês, junto ao vencimento de cada guia.",
      },
    ],
    documentos: [
      "Procuração eletrônica no e-CAC",
      "Declarações acessórias do período",
      "Folha de pagamento",
    ],
    recorrencia: "Mensal recorrente",
  },
  {
    slug: "parcelamento",
    nome: "Parcelamento",
    chamada: "Parcelamento",
    resumo:
      "Simulação de reenquadramento do débito em novo parcelamento e, havendo ganho, protocolo do pedido administrativo e acompanhamento até a consolidação.",
    paraQuem:
      "Empresas no Lucro Real com parcelamento vigente em condições menos favoráveis que as disponíveis hoje.",
    etapas: [
      {
        titulo: "Levantamento",
        texto:
          "Reunião das guias e da posição atual do parcelamento em curso.",
      },
      {
        titulo: "Simulação",
        texto:
          "Comparação entre a condição atual e as modalidades de parcelamento disponíveis para o perfil do débito.",
      },
      {
        titulo: "Decisão",
        texto:
          "Apresentação do resultado da simulação. Se a empresa não aprovar, o caso não avança — sem custo de êxito.",
      },
      {
        titulo: "Protocolo e consolidação",
        texto:
          "Pedido administrativo protocolado, novo parcelamento refeito e acompanhamento até a primeira guia consolidada.",
      },
    ],
    documentos: [
      "Guias do parcelamento atual",
      "Posição do débito no órgão",
      "Documentos societários",
    ],
    recorrencia: "Pontual",
  },
  {
    slug: "insumos-vincendo",
    nome: "ICMS sobre insumos — vincendo",
    chamada: "Insumos · Vincendo",
    resumo:
      "Apuração mensal do ICMS sobre a aquisição de insumos, aplicada sobre o imposto que a transportadora ainda vai apurar no período.",
    paraQuem:
      "Transportadoras no Lucro Real que adquirem insumos com ICMS destacado em nota.",
    etapas: [
      {
        titulo: "Envio mensal",
        texto:
          "A transportadora envia o SPED fiscal e os XMLs de entrada do mês anterior. É a única rotina recorrente do lado da empresa.",
      },
      {
        titulo: "Apuração",
        texto:
          "Cálculo dos insumos elegíveis do período e consolidação do valor apurado.",
      },
      {
        titulo: "Consolidação",
        texto:
          "A empresa recebe a consolidação a tempo de lançar e recolher o ICMS já considerando a apuração do mês.",
      },
    ],
    documentos: ["SPED fiscal mensal", "XMLs de entrada do período"],
    recorrencia: "Mensal recorrente",
    setor: "Transportes",
  },
  {
    slug: "insumos-extemporaneo",
    nome: "ICMS sobre insumos — extemporâneo",
    chamada: "Insumos · Extemporâneo",
    resumo:
      "Mesma matéria do vincendo, aplicada a períodos anteriores cujo ICMS sobre insumos não foi aproveitado na época. Depende de homologação formal antes da compensação.",
    paraQuem:
      "Transportadoras no Lucro Real com histórico de aquisição de insumos sem o aproveitamento correspondente.",
    etapas: [
      {
        titulo: "Acesso e base",
        texto:
          "Procuração eletrônica no e-CAC, XMLs de entrada e SPED do período retroativo analisado.",
      },
      {
        titulo: "Cálculo do crédito",
        texto:
          "Apuração do montante referente aos períodos anteriores, com devolutiva e alinhamento do plano de aproveitamento.",
      },
      {
        titulo: "Homologação",
        texto:
          "Requerimento formal protocolado junto ao órgão estadual. O prazo de análise é do órgão, não da consultoria.",
      },
      {
        titulo: "Compensação",
        texto:
          "Homologado o crédito, a compensação passa a correr mensalmente, junto do ciclo do vincendo.",
      },
    ],
    documentos: [
      "Procuração eletrônica no e-CAC",
      "XMLs de entrada do período retroativo",
      "SPED fiscal do período",
    ],
    recorrencia: "Pontual",
    setor: "Transportes",
  },
];

export const encontrarProduto = (slug: string) =>
  produtos.find((p) => p.slug === slug);
