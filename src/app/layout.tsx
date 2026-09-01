import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import { site } from "@/content/site";

/**
 * A fonte da marca é a Gramatika (consta no timbrado, em Regular e Bold).
 * É comercial e exige licença de webfont à parte, que ainda não existe.
 * Figtree é a substituta mais próxima entre as gratuitas — mesma classe de
 * grotesca geométrica, altura de x alta, "a" de dois andares e "g" de um só.
 * Quando a licença sair, troca-se aqui e no `globals.css`.
 */
const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — ${site.assinatura}`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${site.nome} — ${site.assinatura}`,
    description: site.descricao,
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
