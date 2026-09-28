import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Blog em arquivos: cada texto é um `.md` em `content/blog/`, com os campos
 * do topo (título, data, resumo) e o corpo em Markdown. O painel em
 * `/admin/` escreve nesses mesmos arquivos pelo GitHub; quem preferir pode
 * editar o arquivo direto no repositório. O site é gerado a cada push.
 */
export type Post = {
  slug: string;
  titulo: string;
  data: string;
  resumo: string;
  autor?: string;
  capa?: string;
  rascunho: boolean;
  html: string;
};

const pasta = path.join(process.cwd(), "content", "blog");

function lerArquivo(nome: string): Post {
  const bruto = fs.readFileSync(path.join(pasta, nome), "utf8");
  const { data, content } = matter(bruto);
  const html = remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(content)
    .toString();
  return {
    slug: nome.replace(/\.md$/, ""),
    titulo: String(data.titulo ?? ""),
    data: String(data.data ?? "").slice(0, 10),
    resumo: String(data.resumo ?? ""),
    autor: data.autor ? String(data.autor) : undefined,
    capa: data.capa ? String(data.capa) : undefined,
    rascunho: Boolean(data.rascunho),
    html,
  };
}

/** Textos publicados, do mais novo para o mais antigo. */
export function listarPosts(): Post[] {
  if (!fs.existsSync(pasta)) return [];
  return fs
    .readdirSync(pasta)
    .filter((n) => n.endsWith(".md"))
    .map(lerArquivo)
    .filter((p) => !p.rascunho && p.titulo)
    .sort((a, b) => (a.data < b.data ? 1 : -1));
}

export function lerPost(slug: string): Post | null {
  const nome = `${slug}.md`;
  if (!fs.existsSync(path.join(pasta, nome))) return null;
  const post = lerArquivo(nome);
  return post.rascunho ? null : post;
}

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
