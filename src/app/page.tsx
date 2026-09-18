import Hero from "@/components/sections/Hero";
import Historico from "@/components/sections/Historico";
import Atuacao from "@/components/sections/Atuacao";
import Processo from "@/components/sections/Processo";
import Marca from "@/components/sections/Marca";
import ChamadaFinal from "@/components/sections/ChamadaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Historico />
      <Atuacao />
      <Processo />
      <Marca />
      <ChamadaFinal />
    </>
  );
}
