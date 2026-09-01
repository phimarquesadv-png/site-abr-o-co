import Hero from "@/components/sections/Hero";
import Qualificacao from "@/components/sections/Qualificacao";
import Historico from "@/components/sections/Historico";
import Atuacao from "@/components/sections/Atuacao";
import Processo from "@/components/sections/Processo";
import ChamadaFinal from "@/components/sections/ChamadaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Qualificacao />
      <Historico />
      <Atuacao />
      <Processo />
      <ChamadaFinal />
    </>
  );
}
