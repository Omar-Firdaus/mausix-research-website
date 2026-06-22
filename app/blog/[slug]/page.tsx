import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, formatBlogDate, getBlogPost } from '@/lib/blog-posts';
import { BlogPostDecorations } from './BlogPostDecorations';

type Props = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: `${post.title} · Mausix Research`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream-100 text-brown-800">
      <BlogPostDecorations />

      <article className="relative z-10 mx-auto max-w-2xl px-5 md:px-[calc(3rem+2rem)] py-16 md:py-24">
        <Link
          href="/#blog"
          className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500 hover:text-brown-800 transition-colors mb-10"
        >
          ← Back to log
        </Link>

        <header className="border-b border-cream-400 pb-8 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500 mb-4">
            {post.serial} · {formatBlogDate(post.date)} · {post.readTime}
            <span className="hidden md:inline text-cream-400 mx-2" aria-hidden="true">
              ·
            </span>
            <span className="hidden md:inline font-barcode normal-case tracking-normal text-cream-500/85">
              {post.slug.replace(/-/g, '').slice(0, 12)}
            </span>
          </p>
          <h1 className="font-mono text-[24px] md:text-[32px] uppercase tracking-wide text-brown-800 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 font-mono text-sm text-brown-800/80 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="space-y-6 font-mono text-sm leading-relaxed text-brown-800/85">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-cream-400">
          <Link
            href="/forms?product=mausix-glass"
            className="inline-flex min-h-12 items-center justify-center border border-brown-800 bg-brown-800 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
          >
            Join Mausix Glass waitlist
          </Link>
        </div>
      </article>
    </div>
  );
}
