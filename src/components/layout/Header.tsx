"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const menosMovimento = useReducedMotion();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava o scroll do corpo enquanto o menu de celular está aberto.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  // Esc fecha o menu — teclado é caminho de navegação, não exceção.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none ${
        rolou || menuAberto
          ? "bg-paper/92 shadow-[0_1px_0_rgba(35,31,32,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            aria-label="Abrão & Co — início"
            onClick={() => setMenuAberto(false)}
          >
            <Logo className="h-[15px] w-auto md:h-4" />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {site.navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-ink-3 transition-colors hover:text-ink motion-reduce:transition-none"
              >
                {item.rotulo}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </Link>
            ))}

            <a
              href={`https://wa.me/${site.contato.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/25 px-5 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper motion-reduce:transition-none"
            >
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                aria-hidden
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 motion-reduce:transition-none ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                aria-hidden
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 motion-reduce:transition-none ${
                  menuAberto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            id="menu-mobile"
            className="overflow-hidden bg-paper md:hidden"
            initial={menosMovimento ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={menosMovimento ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container>
              <nav className="flex flex-col border-t border-paper-3 py-4">
                {site.navegacao.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    className="border-b border-paper-3 py-4 text-2xl tracking-tight text-ink last:border-b-0"
                  >
                    {item.rotulo}
                  </Link>
                ))}
                <a
                  href={`https://wa.me/${site.contato.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuAberto(false)}
                  className="py-4 text-2xl tracking-tight text-azul"
                >
                  WhatsApp
                </a>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
