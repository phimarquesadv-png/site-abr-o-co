import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/atuacao", "/transportes", "/quem-somos", "/contato"];

  return rotas.map((rota) => ({
    url: `${site.url}${rota}/`,
    changeFrequency: "monthly" as const,
    priority: rota === "" ? 1 : 0.8,
  }));
}
