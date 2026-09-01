import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático — o Cloudflare Pages serve a pasta `out/` sem servidor.
  output: "export",
  images: {
    // O otimizador de imagem do Next exige servidor; no export estático ele sai.
    unoptimized: true,
  },
  // Cada rota vira uma pasta com index.html — evita 404 em refresh de URL interna.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
