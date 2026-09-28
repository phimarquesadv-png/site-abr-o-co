import Image from "next/image";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { clientes } from "@/content/clientes";

/**
 * Tarja rolante com as empresas atendidas, sobre o azul da marca.
 *
 * Cada logo vai num cartão branco, como nas pranchas do portfólio: os
 * arquivos têm fundo branco e, soltos sobre o azul, virariam caixas.
 *
 * A trilha é duplicada e desliza metade do próprio comprimento em loop, o
 * que fecha o ciclo sem emenda visível. Para quem pede menos movimento, o
 * CSS global zera a animação e a tarja fica parada no início.
 */
export default function Clientes() {
  const trilha = [...clientes, ...clientes];
  return (
    <section className="overflow-hidden bg-azul py-16 text-white md:py-20">
      <Container>
        <Reveal>
          <Rotulo claro>Empresas atendidas</Rotulo>
        </Reveal>
      </Container>

      <div
        className="tarja-mascara group mt-10 w-full overflow-hidden"
        role="list"
        aria-label="Empresas atendidas"
      >
        <ul className="tarja flex w-max items-center gap-4 pr-4 group-hover:[animation-play-state:paused] md:gap-5 md:pr-5">
          {trilha.map((c, i) => (
            <li
              key={`${c.slug}-${i}`}
              role="listitem"
              aria-hidden={i >= clientes.length}
              className="flex h-20 flex-none items-center rounded-lg bg-white px-7 md:h-24 md:px-9"
            >
              <Image
                src={`/clientes/${c.slug}.webp`}
                alt={i < clientes.length ? c.nome : ""}
                loading={i < clientes.length ? "eager" : "lazy"}
                width={c.largura}
                height={c.altura}
                className="h-9 w-auto opacity-80 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none md:h-11"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
