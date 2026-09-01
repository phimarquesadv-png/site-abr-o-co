import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { produtos } from "@/content/produtos";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = ["", "/produtos", "/transportes", "/quem-somos", "/contato"];

  return [
    ...fixas.map((rota) => ({
      url: `${site.url}${rota}/`,
      changeFrequency: "monthly" as const,
      priority: rota === "" ? 1 : 0.8,
    })),
    ...produtos.map((p) => ({
      url: `${site.url}/produtos/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
