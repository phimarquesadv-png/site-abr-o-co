/**
 * Sócios, conforme o portfólio institucional.
 *
 * As biografias foram condensadas a partir do texto do portfólio, mantendo
 * formação, cargo e trajetória verificáveis. Ficaram de fora as afirmações
 * promocionais sem base documentada — "referência em", "mais de 1bi gerado" —
 * que numa página pública viram exposição de publicidade enganosa sem
 * acrescentar credibilidade a quem lê.
 */
export type Socio = {
  slug: string;
  nome: string;
  cargo: string;
  bio: string | null;
};

export const socios: Socio[] = [
  {
    slug: "andre-abrao",
    nome: "André Abrão",
    cargo: "CEO e sócio fundador",
    bio: "Advogado, com mais de quinze anos de atuação. Bacharel em Direito pela PUC-GO, pós-graduado em Planejamento Tributário pela UFG e em Direito Civil e Processo Civil pela Universidade Cândido Mendes, e pós-graduando em Direito Empresarial pela FGV.",
  },
  {
    slug: "rafael-cruvinel",
    nome: "Rafael Cruvinel",
    cargo: "Diretor Tributário e sócio",
    bio: "Advogado e professor de Direito Tributário e Processo Tributário. Bacharel em Direito pela PUC-GO, pós-graduado em Direito Tributário pelo IBET-GO e em Advocacia Tributária pela ESA OAB-MG, com especializações em Planejamento Tributário e em ICMS. Vice-Presidente da Comissão de Direito Tributário da OAB-GO.",
  },
  {
    slug: "luiz-maronezi",
    nome: "Luiz Maronezi",
    cargo: "Sócio",
    bio: "Advogado, inscrito na OAB-GO sob o nº 21.346. Bacharel em Direito pelo ITEB-SP e em Contabilidade pela ETEC-SP. Foi diretor da Antártica Niger S/A entre 1975 e 1996 e, a partir de 2010, atuou nas Secretarias de Indústria e Comércio, de Desenvolvimento Econômico e da Fazenda do Estado de Goiás, além de Goiás Fomento, Goiás Industrial, Goiás Parceria, Sebrae Goiás e CODAP.",
  },
];
