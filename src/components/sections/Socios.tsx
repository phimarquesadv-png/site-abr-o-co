import Image from "next/image";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import Reveal from "@/components/motion/Reveal";
import { socios } from "@/content/socios";

export default function Socios() {
  return (
    <section className="border-t border-paper-3 bg-paper py-20 md:py-28">
      <Container>
        <Reveal>
          <Rotulo>Sócios</Rotulo>
          <h2 className="mt-6 max-w-2xl text-ink text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.12]">
            Quem responde pelo trabalho.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {socios.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-2">
                  <Image
                    src={`/socios/${s.slug}.jpg`}
                    alt={`Retrato de ${s.nome}`}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl text-ink">{s.nome}</h3>
                <p className="rotulo mt-2 text-muted">{s.cargo}</p>
                {s.bio ? (
                  <p className="mt-4 leading-relaxed text-muted">{s.bio}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
