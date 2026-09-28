import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import { listarPosts, lerPost, formatarData } from "@/lib/blog";

export function generateStaticParams() {
  return listarPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = lerPost(slug);
  if (!post) return {};
  return { title: post.titulo, description: post.resumo };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = lerPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-paper">
      <Container className="max-w-3xl pt-32 pb-20 md:pt-40 md:pb-28">
        <Link href="/blog/" className="rotulo text-muted hover:text-ink">
          ← Blog
        </Link>
        <h1 className="mt-8 text-ink text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] tracking-[-0.03em]">
          {post.titulo}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <time dateTime={post.data} className="rotulo text-muted">
            {formatarData(post.data)}
          </time>
          {post.autor ? <Rotulo>{post.autor}</Rotulo> : null}
        </div>
        <div
          className="prosa mt-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>
    </article>
  );
}
