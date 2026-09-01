"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import Container from "@/components/ui/Container";

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 motion-reduce:transition-none ${
        rolou || menuAberto
          ? "bg-ink/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-on-dark"
            onClick={() => setMenuAberto(false)}
          >
            {site.nome}
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {site.navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-on-dark-muted transition-colors hover:text-on-dark motion-reduce:transition-none"
              >
                {item.rotulo}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                aria-hidden
                className={`absolute left-0 block h-px w-6 bg-on-dark transition-transform duration-300 motion-reduce:transition-none ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                aria-hidden
                className={`absolute left-0 block h-px w-6 bg-on-dark transition-transform duration-300 motion-reduce:transition-none ${
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
            className="md:hidden"
            initial={menosMovimento ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={menosMovimento ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <Container>
              <nav className="flex flex-col gap-1 border-t border-on-dark/10 py-6">
                {site.navegacao.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    className="py-3 font-display text-2xl text-on-dark"
                  >
                    {item.rotulo}
                  </Link>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
