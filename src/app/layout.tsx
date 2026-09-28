import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import { site } from "@/content/site";

/**
 * Gramatika, a fonte da marca (consta no timbrado). Arquivos entregues pelo
 * Philipe em 2026-09-28, em Regular e Bold; a licença de web fica por conta
 * da Abrão & Co. Hospedada aqui mesmo, sem serviço externo.
 *
 * Não há peso Medium: onde o site pede 500, o navegador usa o Regular.
 * O "º" não existe na fonte e cai na reserva do sistema.
 */
const sans = localFont({
  src: [
    { path: "./fonts/Gramatika-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gramatika-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} | ${site.assinatura}`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${site.nome} | ${site.assinatura}`,
    description: site.descricao,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: site.assinatura },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} | ${site.assinatura}`,
    description: site.descricao,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body>
        {/* Os elementos animados são servidos com opacity:0 e só recebem o
            estado final quando o JavaScript roda. Sem ele — bundle que não
            carregou, JS desligado, rastreador que não executa script — a
            página ficaria praticamente em branco. Este bloco devolve todos
            eles à visibilidade. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        <Header />
        <main id="conteudo">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
