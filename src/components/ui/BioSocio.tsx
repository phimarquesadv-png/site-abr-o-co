"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Biografia escondida atrás de um botão. Nome e cargo ficam à vista; a
 * trajetória abre só para quem quiser ler. O texto continua no HTML
 * servido, então busca e leitor de tela chegam nele do mesmo jeito.
 */
export default function BioSocio({ bio }: { bio: string }) {
  const [aberta, setAberta] = useState(false);
  const menosMovimento = useReducedMotion();
  const id = useId();

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        aria-expanded={aberta}
        aria-controls={id}
        className="inline-flex items-center gap-2 text-sm text-azul transition-colors hover:text-azul-escuro motion-reduce:transition-none"
      >
        {aberta ? "Fechar bio" : "Ver bio"}
        <span
          aria-hidden
          className={`inline-block transition-transform duration-300 motion-reduce:transition-none ${
            aberta ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {aberta ? (
          <motion.div
            id={id}
            className="overflow-hidden"
            initial={menosMovimento ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={menosMovimento ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="pt-4 leading-relaxed text-muted">{bio}</p>
          </motion.div>
        ) : (
          <p id={id} className="sr-only">
            {bio}
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
