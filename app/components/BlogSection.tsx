import Link from 'next/link';
import { blogPosts, formatBlogDate } from '@/lib/blog-posts';
import { SectionDecorations } from './SectionDecorations';
import { asciiArt } from '@/lib/ascii-art';

export function BlogSection() {
  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-cream-100 text-brown-800 border-t border-cream-400"
      aria-labelledby="blog-heading"
    >
      <SectionDecorations
        leftMono="0x00log7f3a"
        leftBarcode="dispatchlog9284"
        rightMono="FIELD NOTES"
        ascii={asciiArt.fish}
        asciiRailSide="left"
        asciiVertical="58%"
      />

      <div className="relative z-10 pt-16 md:pt-24 pb-8 md:pb-10">
        <div className="px-5 md:px-[calc(3rem+2rem)]">
          <header className="mb-10 md:mb-12 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-[35px] bg-cream-400 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-500">
                Dispatch log
              </span>
            </div>

            <h2
              id="blog-heading"
              className="font-mono text-[22px] md:text-[28px] uppercase tracking-wide text-brown-800"
            >
              {">>: Research Blog"}
            </h2>

            <p className="mt-4 font-mono text-xs md:text-sm text-brown-800/80 leading-relaxed max-w-xl text-left">
              Build notes, integration logs, and write-ups from the Mausix lab.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 font-mono text-[10px] md:text-xs text-cream-500 tracking-wide text-left">
              <span>
                <span>CHANNEL</span> PUBLIC
              </span>
              <span className="text-cream-400">·</span>
              <span>
                <span>ENTRIES</span> {blogPosts.length.toString().padStart(3, '0')}
              </span>
              <span className="text-cream-400">·</span>
              <span className="uppercase tracking-[0.16em]">Scroll catalog →</span>
            </div>
          </header>
        </div>

        <div className="px-5 md:px-[3rem]">
          <div className="border-y border-cream-400">
            <div
              className="flex gap-0 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-px md:pl-[2rem] md:pr-[2rem]"
              role="list"
              aria-label="Blog catalog"
            >
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  role="listitem"
                  className="snap-start shrink-0 w-[min(100%,320px)] md:w-[min(100%,340px)] border-r border-cream-400 last:border-r-0"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full min-h-[280px] flex-col p-5 md:p-6 transition-colors hover:bg-cream-200/60"
                  >
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500">
                        {post.serial}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-500 tabular-nums">
                        {(index + 1).toString().padStart(2, '0')}
                        <span className="text-cream-400 mx-1">/</span>
                        {blogPosts.length.toString().padStart(2, '0')}
                      </p>
                    </div>

                    <h3 className="font-mono text-sm md:text-base uppercase tracking-wide text-brown-800 group-hover:text-brown-950 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-3 flex-1 font-mono text-xs text-brown-800/80 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 pt-4 border-t border-cream-400 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className="text-cream-500">{formatBlogDate(post.date)}</span>
                      <span className="text-brown-800/80 group-hover:text-brown-950 transition-colors">
                        Read · {post.readTime}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 md:px-[calc(3rem+2rem)]">
          <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-cream-500 text-left">
            <span>Archive updates as systems ship.</span>
            <span className="hidden md:inline text-cream-400" aria-hidden="true">
              ·
            </span>
            <span className="hidden md:inline font-barcode normal-case tracking-normal text-cream-500/85">
              logarchive77102
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
}
