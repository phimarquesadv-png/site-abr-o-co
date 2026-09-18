import VideoSede from "@/components/ui/VideoSede";

/**
 * Faixa de marca entre o processo e a chamada final: o vídeo institucional
 * azul com o logotipo, sem texto por cima. É respiro e assinatura, não
 * informação — por isso não tem título nem botão.
 *
 * O vídeo roda com opacidade reduzida sobre o azul da marca: o movimento
 * fica mais suave e a cor puxa para o azul oficial em vez do azul do render.
 *
 * A proporção muda com a tela para o logotipo, que está no centro do
 * vídeo, nunca ser cortado: 4:3 no celular, 16:7 em telas largas.
 */
export default function Marca() {
  return (
    <section aria-label="Abrão & Co" className="bg-azul">
      <VideoSede
        src="/marca/marca.mp4"
        poster="/marca/marca.jpg"
        descricao="Logotipo Abrão & Co sobre um fundo azul em movimento."
        className="aspect-[4/3] w-full opacity-60 md:aspect-[16/7]"
      />
    </section>
  );
}
