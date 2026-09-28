import Percurso from "@/components/sections/Percurso";

const etapas = [
  {
    titulo: "Contato inicial",
    texto:
      "Uma conversa curta para entender a operação, o porte e o que motivou a busca. Serve para saber se há trabalho possível, e para dizer quando não há.",
  },
  {
    titulo: "Acesso e documentação",
    texto:
      "Procuração eletrônica e envio dos documentos. Nada é analisado por estimativa: a apuração parte do que a empresa já declarou aos órgãos.",
  },
  {
    titulo: "Diagnóstico",
    texto:
      "Levantamento técnico do passivo, dos créditos ou de ambos, conforme o caso, com revisão interna antes de ir à mesa.",
  },
  {
    titulo: "Devolutiva",
    texto:
      "Apresentação do que foi encontrado e dos caminhos disponíveis, com o que cada um envolve em prazo e risco. A decisão é da empresa.",
  },
  {
    titulo: "Condução",
    texto:
      "Execução do caminho escolhido, com acompanhamento até a operacionalização. Nos trabalhos recorrentes, mês a mês.",
  },
];

export default function Processo() {
  return (
    <Percurso
      rotulo="Como funciona"
      titulo="Do primeiro contato à operação."
      descricao="O mesmo percurso em qualquer frente. O que muda é a matéria analisada, não o método."
      itens={etapas}
    />
  );
}
