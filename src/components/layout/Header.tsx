"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Redes from "@/components/ui/Redes";

export default function Header() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const menosMovimento = useReducedMotion();
  const rota = usePathname();
  // Página atual: marca o item do menu (desktop e celular).
  const ativo = (href: string) =>
    rota === href || rota === href.replace(/\/$/, "");

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 motion-reduce:transition-none ${
        menuAberto
          ? "bg-azul text-white"
          : rolou
            ? "bg-paper/92 text-ink shadow-[0_1px_0_rgba(35,31,32,0.08)] backdrop-blur-md"
            : "bg-transparent text-ink"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            aria-label="Abrão & Co, página inicial"
            onClick={() => setMenuAberto(false)}
          >
            <Logo className="h-[15px] w-auto md:h-4" />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {site.navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo(item.href) ? "page" : undefined}
                className={`group relative text-sm transition-colors hover:text-ink motion-reduce:transition-none ${
                  ativo(item.href) ? "text-ink" : "text-ink-3"
                }`}
              >
                {item.rotulo}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none ${
                    ativo(item.href) ? "scale-x-100" : "scale-x-0"
                  }`}
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
            <Redes className="ml-1" />
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
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                aria-hidden
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 motion-reduce:transition-none ${
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
            className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-azul text-white md:hidden"
            initial={menosMovimento ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={menosMovimento ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex min-h-full flex-col justify-between pt-6 pb-10">
              <nav className="flex flex-col">
                {site.navegacao.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={menosMovimento ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuAberto(false)}
                      aria-current={ativo(item.href) ? "page" : undefined}
                      className={`flex items-center gap-4 border-b border-white/15 py-5 text-4xl tracking-tight ${
                        ativo(item.href) ? "text-white" : "text-white/60"
                      }`}
                    >
                      {ativo(item.href) ? (
                        <span aria-hidden className="h-px w-6 bg-white" />
                      ) : null}
                      {item.rotulo}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={menosMovimento ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
              >
                <a
                  href={`https://wa.me/${site.contato.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuAberto(false)}
                  className="inline-flex w-fit items-center rounded-full border border-white/50 px-6 py-3 text-base transition-colors hover:bg-white hover:text-azul motion-reduce:transition-none"
                >
                  WhatsApp
                </a>
                <Redes tom="azul" />
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
