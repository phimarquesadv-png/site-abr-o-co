"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { frentes } from "@/content/atuacao";
import { site } from "@/content/site";
import Monograma from "@/components/ui/Monograma";

const campo =
  "w-full rounded-md border border-paper-3 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink motion-reduce:transition-none";
const rotulo = "block text-sm text-ink";

type Estado = "parado" | "enviando" | "ok" | "erro";

export default function FormularioContato() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [erro, setErro] = useState("");
  const menosMovimento = useReducedMotion();

  /** Monta a mensagem que já vai escrita na conversa do WhatsApp. */
  function montarMensagem(d: Record<string, FormDataEntryValue>) {
    const texto = (k: string) => (typeof d[k] === "string" ? d[k].trim() : "");
    const frente = frentes.find((f) => f.slug === texto("assunto"));
    const linhas = [
      `Olá, sou ${texto("nome")}, da ${texto("empresa")}.`,
      "",
      frente ? `Assunto: ${frente.nome}` : null,
      texto("email") ? `E-mail: ${texto("email")}` : null,
      texto("telefone") ? `Telefone: ${texto("telefone")}` : null,
      texto("mensagem") ? `\n${texto("mensagem")}` : null,
    ].filter(Boolean);
    return linhas.join("\n");
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    setErro("");

    const dados = Object.fromEntries(new FormData(evento.currentTarget));

    // Registra o lead por e-mail em segundo plano. Sem `await`: se o Resend
    // não estiver configurado, ou a rede falhar, a pessoa não pode ficar
    // presa esperando — o WhatsApp é o caminho principal.
    //
    // `keepalive` garante que a requisição sobreviva à navegação para o
    // WhatsApp logo abaixo — sem isso o navegador pode abortá-la em voo,
    // e o registro escrito nunca chegaria.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
      keepalive: true,
    }).catch(() => {});

    const url = `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
      montarMensagem(dados),
    )}`;

    // Navegação no mesmo clique, não depois de um `await`: assim o navegador
    // entende como ação do usuário e não bloqueia como pop-up.
    window.location.href = url;

    // Se o aparelho não tiver WhatsApp, a navegação não acontece e a pessoa
    // fica olhando "Abrindo…". Este retorno devolve o controle.
    window.setTimeout(() => setEstado("ok"), 1200);
  }

  if (estado === "ok") {
    return (
      <motion.div
        initial={menosMovimento ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-lg bg-paper-2 p-10"
        role="status"
      >
        <Monograma
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-8 w-40 text-paper-3"
        />
        <h2 className="relative text-2xl text-ink">Recebido.</h2>
        <p className="relative mt-4 leading-relaxed text-muted">
          Se a conversa não abriu sozinha, o WhatsApp pode não estar instalado
          neste aparelho. Escreva para{" "}
          <a
            href={`mailto:${site.contato.email}`}
            className="text-ink underline underline-offset-4"
          >
            {site.contato.email}
          </a>{" "}
          que a equipe comercial responde.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nome" className={rotulo}>
            Nome
          </label>
          <input id="nome" name="nome" required className={campo} />
        </div>
        <div className="space-y-2">
          <label htmlFor="empresa" className={rotulo}>
            Empresa
          </label>
          <input id="empresa" name="empresa" required className={campo} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={rotulo}>
            E-mail corporativo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={campo}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="telefone" className={rotulo}>
            Telefone
          </label>
          <input id="telefone" name="telefone" className={campo} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="assunto" className={rotulo}>
          Assunto
        </label>
        <select id="assunto" name="assunto" className={campo} defaultValue="">
          <option value="">Ainda não sei</option>
          {frentes.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="mensagem" className={rotulo}>
          Contexto
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          className={campo}
          placeholder="Conte em poucas linhas o que motivou o contato."
        />
      </div>

      {/* Armadilha para robô de formulário. Invisível para pessoas e
          anunciada como oculta para leitor de tela. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm leading-relaxed text-muted">
        Ao enviar, abrimos uma conversa no WhatsApp com a mensagem já escrita.
        Você confere antes de mandar.
      </p>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consentimento"
          required
          className="mt-1 accent-[var(--color-ink)]"
        />
        <span>
          Autorizo o contato da Abrão &amp; Co e o tratamento dos dados
          informados para essa finalidade, conforme a{" "}
          <a href="/privacidade/" className="text-ink underline">
            política de privacidade
          </a>
          .
        </span>
      </label>

      {estado === "erro" && (
        <p role="alert" className="text-sm text-[#a33]">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink-2 disabled:opacity-60 motion-reduce:transition-none"
      >
        {estado === "enviando" ? "Abrindo…" : "Enviar e abrir o WhatsApp"}
      </button>
    </form>
  );
}
