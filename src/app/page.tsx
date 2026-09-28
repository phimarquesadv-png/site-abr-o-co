import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Historico from "@/components/sections/Historico";
import Clientes from "@/components/sections/Clientes";
import ChamadaFinal from "@/components/sections/ChamadaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Clientes />
      <Historico />
      <Manifesto />
      <ChamadaFinal />
    </>
  );
}
