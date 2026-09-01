/**
 * Cloudflare Pages Function — recebe o formulário de contato.
 *
 * Roda no edge do Cloudflare, ao lado do site estático. Não faz parte do build
 * do Next: o Pages detecta a pasta `functions/` sozinho e publica esta rota em
 * `/api/lead`.
 *
 * Variáveis de ambiente (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY   obrigatória — chave da API do Resend
 *   LEAD_EMAIL_TO    obrigatória — caixa do Comercial que recebe o lead
 *   LEAD_EMAIL_FROM  obrigatória — remetente em domínio verificado no Resend
 *
 * Nenhuma delas vai para o repositório. O repo é público.
 */

type Env = {
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  LEAD_EMAIL_FROM?: string;
};

type Contexto = {
  request: Request;
  env: Env;
};

const REGIMES: Record<string, string> = {
  real: "Lucro Real",
  presumido: "Lucro Presumido",
  simples: "Simples Nacional",
  "nao-sei": "Não sabe informar",
};

const texto = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const responder = (status: number, corpo: Record<string, unknown>) =>
  new Response(JSON.stringify(corpo), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequestPost({ request, env }: Contexto) {
  let dados: Record<string, unknown>;

  try {
    dados = await request.json();
  } catch {
    return responder(400, { mensagem: "Requisição inválida." });
  }

  // Campo-armadilha preenchido = robô. Devolve sucesso para não ensinar o robô
  // a contornar a checagem, mas não envia nada.
  if (texto(dados.website)) {
    return responder(200, { ok: true });
  }

  const nome = texto(dados.nome, 120);
  const empresa = texto(dados.empresa, 160);
  const email = texto(dados.email, 160);
  const telefone = texto(dados.telefone, 40);
  const regime = texto(dados.regime, 20);
  const assunto = texto(dados.assunto, 60);
  const mensagem = texto(dados.mensagem, 4000);

  if (!nome || !empresa || !email || !regime) {
    return responder(400, { mensagem: "Preencha os campos obrigatórios." });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return responder(400, { mensagem: "E-mail inválido." });
  }
  if (dados.consentimento !== "on" && dados.consentimento !== true) {
    return responder(400, {
      mensagem: "É necessário autorizar o tratamento dos dados.",
    });
  }

  if (!env.RESEND_API_KEY || !env.LEAD_EMAIL_TO || !env.LEAD_EMAIL_FROM) {
    // Falha explícita em vez de sucesso falso: um formulário que finge ter
    // enviado perde lead sem ninguém perceber.
    console.error("lead: variáveis de ambiente de e-mail não configuradas");
    return responder(503, {
      mensagem:
        "O envio está temporariamente indisponível. Escreva para o e-mail no rodapé.",
    });
  }

  const linhas = [
    `Nome: ${nome}`,
    `Empresa: ${empresa}`,
    `E-mail: ${email}`,
    telefone ? `Telefone: ${telefone}` : null,
    `Regime: ${REGIMES[regime] ?? regime}`,
    assunto ? `Assunto: ${assunto}` : null,
    "",
    mensagem || "(sem contexto adicional)",
  ].filter(Boolean);

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.LEAD_EMAIL_FROM,
      to: [env.LEAD_EMAIL_TO],
      reply_to: email,
      subject: `Site — ${empresa} (${REGIMES[regime] ?? regime})`,
      text: linhas.join("\n"),
    }),
  });

  if (!resposta.ok) {
    console.error("lead: falha no envio", resposta.status, await resposta.text());
    return responder(502, {
      mensagem: "Não conseguimos enviar agora. Tente novamente em instantes.",
    });
  }

  // PENDENTE — abertura automática de oportunidade no NectarCRM.
  //
  // A base e a autenticação estão documentadas no cérebro
  // (`negocio/governanca/referencias/nectarcrm-api.md`): base
  // https://app.nectarcrm.com.br/crm/api/1/ com header `Access-Token`.
  // O que ainda NÃO está verificado é o corpo do POST de cliente e de
  // oportunidade — o cérebro só documenta os GETs em uso. Antes de ligar isto:
  //   1. Rodar `GET /app/columns/full` para ver os campos obrigatórios reais.
  //   2. Testar a criação em um funil de teste, não no funil de produção.
  //   3. Gerar um token com permissão de escrita (o do nectar-sync é leitura).
  // Enquanto isso, o lead chega por e-mail e o Comercial lança no CRM.

  return responder(200, { ok: true });
}
