import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { site } from "@/content/site";
import { produtos } from "@/content/produtos";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ink text-on-dark">
      <Container className="py-20">
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
              {produtos.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/produtos/${p.slug}/`}
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark motion-reduce:transition-none"
                  >
                    {p.nome}
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
                { href: "/transportes/", rotulo: "Transportes" },
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
              <p className="rotulo text-on-dark">{e.cidade}</p>
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
          {/* Se a sociedade for inscrita na OAB, o número aparece aqui —
              exigência do Provimento 205/2021 do CFOAB. */}
          {site.legal.oab ? <p>{site.legal.oab}</p> : null}
        </div>
      </Container>
    </footer>
  );
}
