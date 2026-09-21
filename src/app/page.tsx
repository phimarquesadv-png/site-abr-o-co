import Hero from "@/components/sections/Hero";
import OQueFazemos from "@/components/sections/OQueFazemos";
import Historico from "@/components/sections/Historico";
import Processo from "@/components/sections/Processo";
import ChamadaFinal from "@/components/sections/ChamadaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Historico />
      <Processo />
      <OQueFazemos />
      <ChamadaFinal />
    </>
  );
}
