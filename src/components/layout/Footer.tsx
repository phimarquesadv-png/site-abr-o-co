import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";
import { produtos } from "@/content/produtos";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ink text-on-dark">
      <Container className="py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">{site.nome}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">
              Consultoria tributária dedicada a empresas no regime de Lucro
              Real.
            </p>
          </div>

          <nav aria-label="Atuação">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-on-dark-muted">
              Atuação
            </p>
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
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-on-dark-muted">
              Institucional
            </p>
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

        <div className="mt-16 flex flex-col gap-3 border-t border-on-dark/10 pt-8 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
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
