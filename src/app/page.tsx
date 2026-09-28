import Hero from "@/components/sections/Hero";
import OQueFazemos from "@/components/sections/OQueFazemos";
import Historico from "@/components/sections/Historico";
import Clientes from "@/components/sections/Clientes";
import ChamadaFinal from "@/components/sections/ChamadaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Clientes />
      <Historico />
      <OQueFazemos />
      <ChamadaFinal />
    </>
  );
}
