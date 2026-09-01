"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { produtos } from "@/content/produtos";

const campo =
  "w-full rounded-md border border-paper-3 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brass motion-reduce:transition-none";
const rotulo = "block text-sm text-ink";

type Estado = "parado" | "enviando" | "ok" | "erro";

export default function FormularioContato() {
  const [regime, setRegime] = useState("");
  const [estado, setEstado] = useState<Estado>("parado");
  const [erro, setErro] = useState("");
  const menosMovimento = useReducedMotion();

  // Qualificação na origem: fora do Lucro Real não há trabalho possível, e é
  // melhor dizer isso na hora do que depois de uma reunião marcada.
  const foraDoPerfil = regime === "presumido" || regime === "simples";

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    setErro("");

    const dados = Object.fromEntries(new FormData(evento.currentTarget));

    try {
      const resposta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(corpo.mensagem || "Falha no envio.");
      }

      setEstado("ok");
    } catch (e) {
      setEstado("erro");
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível enviar agora. Tente novamente.",
      );
    }
  }

  if (estado === "ok") {
    return (
      <motion.div
        initial={menosMovimento ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-lg bg-paper-2 p-10"
        role="status"
      >
        <h2 className="font-display text-2xl text-ink">Recebido.</h2>
        <p className="mt-4 leading-relaxed text-muted">
          A equipe comercial entra em contato para uma primeira conversa. Se
          preferir adiantar, responda ao e-mail de confirmação com o regime e o
          porte da empresa.
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
        <label htmlFor="regime" className={rotulo}>
          Regime tributário
        </label>
        <select
          id="regime"
          name="regime"
          required
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
          className={campo}
        >
          <option value="">Selecione</option>
          <option value="real">Lucro Real</option>
          <option value="presumido">Lucro Presumido</option>
          <option value="simples">Simples Nacional</option>
          <option value="nao-sei">Não sei informar</option>
        </select>
      </div>

      <AnimatePresence>
        {foraDoPerfil && (
          <motion.p
            initial={menosMovimento ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={menosMovimento ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-md bg-paper-2 px-4 py-3 text-sm leading-relaxed text-muted"
          >
            Nossa atuação é restrita ao regime de Lucro Real. Você pode enviar a
            mensagem mesmo assim, mas provavelmente não teremos um trabalho a
            propor neste momento.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <label htmlFor="assunto" className={rotulo}>
          Assunto
        </label>
        <select id="assunto" name="assunto" className={campo} defaultValue="">
          <option value="">Ainda não sei</option>
          {produtos.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nome}
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
          placeholder="Débitos em aberto, autuação recebida, parcelamento em curso, setor de atuação…"
        />
      </div>

      {/* Armadilha para robô de formulário. Invisível para pessoas e
          anunciada como oculta para leitor de tela. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consentimento"
          required
          className="mt-1 accent-[var(--color-brass)]"
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
        className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brass-bright disabled:opacity-60 motion-reduce:transition-none"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
