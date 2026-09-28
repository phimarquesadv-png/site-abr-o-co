import { site } from "@/content/site";

const icones = {
  Instagram: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
} as const;

const tons = {
  papel: "text-muted hover:text-ink",
  escuro: "text-on-dark-muted hover:text-on-dark",
  azul: "text-white/75 hover:text-white",
} as const;

/**
 * Links para os perfis oficiais, com ícone. `tom` acompanha o fundo (papel,
 * escuro do rodapé ou azul do menu). `comNome` mostra o usuário ao lado do
 * ícone (página de contato).
 */
export default function Redes({
  tom = "papel",
  comNome = false,
  className = "",
}: {
  tom?: keyof typeof tons;
  comNome?: boolean;
  className?: string;
}) {
  const cor = tons[tom];
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      {site.redes.map((r) => (
        <li key={r.nome}>
          <a
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={comNome ? undefined : `${r.nome} da Abrão & Co`}
            className={`inline-flex items-center gap-2 transition-colors motion-reduce:transition-none ${cor}`}
          >
            {icones[r.nome]}
            {comNome ? <span className="text-sm">{r.usuario}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
