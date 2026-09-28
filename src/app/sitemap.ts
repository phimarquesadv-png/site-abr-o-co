import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { listarPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/atuacao",
    "/quem-somos",
    "/blog",
    "/contato",
    "/privacidade",
    "/termos",
  ];

  const paginas = rotas.map((rota) => ({
    url: `${site.url}${rota}/`,
    changeFrequency: "monthly" as const,
    priority: rota === "" ? 1 : 0.8,
  }));
  const posts = listarPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: p.data,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...paginas, ...posts];
}
