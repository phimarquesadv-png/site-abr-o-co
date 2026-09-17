import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Monograma from "@/components/ui/Monograma";
import { site } from "@/content/site";
import { frentes } from "@/content/atuacao";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-on-dark">
      {/* Monograma como marca-d'água, no mesmo espírito do campo azul do
          histórico: presença de marca sem competir com a navegação. */}
      <Monograma
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-20 hidden w-[26rem] text-white/[0.04] lg:block"
      />
      <Container className="relative py-20">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo className="h-4 w-auto" />
            <p className="mt-6 max-w-xs leading-relaxed text-on-dark-muted">
              {site.assinatura}
            </p>
          </div>

          <nav aria-label="Atuação">
            <p className="rotulo text-on-dark-muted">Atuação</p>
            <ul className="mt-5 space-y-3">
              {frentes.map((f) => (
                <li key={f.slug}>
                  <Link
                    href="/atuacao/"
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark motion-reduce:transition-none"
                  >
                    {f.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Institucional">
            <p className="rotulo text-on-dark-muted">Institucional</p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/quem-somos/", rotulo: "Quem somos" },
                { href: "/contato/", rotulo: "Contato" },
                { href: "/privacidade/", rotulo: "Política de privacidade" },
                { href: "/termos/", rotulo: "Termos de uso" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark motion-reduce:transition-none"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* As três praças, na mesma ordem e no mesmo recorte do timbrado. */}
        <div className="mt-16 grid gap-8 border-t border-on-dark/15 pt-10 sm:grid-cols-3">
          {site.escritorios.map((e) => (
            <address key={e.cidade} className="not-italic">
              <p className="rotulo text-on-dark">
                {e.cidade}
                {"sede" in e && e.sede ? (
                  <span className="ml-2 font-normal normal-case tracking-normal text-on-dark-muted">
                    sede
                  </span>
                ) : null}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">
                {e.linhas.join(", ")}
                <br />
                {e.cidade} — {e.uf}
              </p>
            </address>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-on-dark/15 pt-8 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} {site.legal.razaoSocial || site.nome}
            {site.legal.cnpj ? ` · CNPJ ${site.legal.cnpj}` : ""}
          </p>
        </div>
      </Container>
    </footer>
  );
}
