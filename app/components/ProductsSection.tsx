import Link from 'next/link';
import { products } from '@/lib/products';
import { ASCIIArt } from './ASCIIArt';
import { SectionDecorations } from './SectionDecorations';
import { asciiArt } from '@/lib/ascii-art';

function ProductSchematic({ label }: Readonly<{ label: string }>) {
  return (
    <div
      className="relative flex h-full min-h-[140px] md:min-h-[160px] items-center justify-center border-b border-cream-400 bg-cream-200/30 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.35] blueprint-grid blueprint-grid-minor" />

      <svg
        className="absolute top-3 left-3 w-6 h-6 text-cream-400/50"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 8 L0 0 L8 0" stroke="currentColor" strokeWidth="1" />
      </svg>

      <svg
        className="absolute bottom-3 right-3 w-6 h-6 text-cream-400/50"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M24 16 L24 24 L16 24" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative border border-cream-400/60 px-6 py-4 bg-cream-100/50">
        <div className="absolute -top-px left-3 right-3 h-px bg-cream-100/50" />
        <div className="absolute -bottom-px left-3 right-3 h-px bg-cream-100/50" />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-500 text-center">
          {label}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-cream-400/60" />
          <span className="w-1.5 h-1.5 bg-cream-500/60" />
          <span className="h-px w-10 bg-cream-400/60" />
        </div>
      </div>
    </div>
  );
}

export function ProductsSection() {
  return (
    <section
      id="systems"
      className="relative overflow-hidden bg-cream-100 text-brown-800 border-t border-cream-400"
      aria-labelledby="systems-heading"
    >
      <SectionDecorations
        leftMono="0x4a8f2c19"
        leftBarcode="pltfmstack8392hf"
        rightMono="BENCH BUS ONLINE"
      />

      <div className="relative z-10 pt-16 md:pt-24 pb-8 md:pb-10">
        <div className="px-5 md:px-[calc(3rem+2rem)]">
          <header className="relative mb-10 md:mb-12 text-left">
            <div
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-end pointer-events-none select-none pr-2 lg:pr-6"
              aria-hidden="true"
            >
              <ASCIIArt art={asciiArt.donut} inline />
            </div>

            <div className="relative max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-[35px] bg-cream-400 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-500">
                Systems line
              </span>
            </div>

            <h2
              id="systems-heading"
              className="font-mono text-[22px] md:text-[28px] uppercase tracking-wide text-brown-800"
            >
              {">>: Platform Stack"}
            </h2>

            <p className="mt-4 font-mono text-xs md:text-sm text-brown-800/80 leading-relaxed max-w-xl text-left">
              Current hardware and interface programs under active development at Mausix Research.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 font-mono text-[10px] md:text-xs text-cream-500 tracking-wide text-left">
              <span>
                <span>CHANNEL</span> PUBLIC
              </span>
              <span className="text-cream-400">·</span>
              <span>
                <span>UNITS</span> {products.length.toString().padStart(2, '0')}
              </span>
            </div>
            </div>
          </header>
        </div>

        <div className="px-5 md:px-[3rem]">
          <div className="border-y border-cream-400">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="flex min-h-[360px] flex-col border-b border-cream-400 md:border-b-0 md:border-r last:border-r-0 last:border-b-0 md:last:border-b-0"
                >
                  {product.image ? (
                    <div
                      className={`relative flex h-[180px] md:h-[200px] items-center justify-center border-b border-cream-400 overflow-hidden ${
                        product.image.variant === 'light'
                          ? 'bg-cream-100'
                          : 'bg-brown-950'
                      }`}
                    >
                      <div className="absolute inset-0 opacity-[0.18] blueprint-grid blueprint-grid-minor" />
                      <img
                        src={product.image.src}
                        alt={product.image.alt}
                        className={`relative z-10 h-[88%] w-auto max-w-[88%] object-contain ${
                          product.image.variant === 'light'
                            ? 'opacity-90'
                            : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <ProductSchematic label="Optical stack" />
                  )}

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500">
                        {product.serial}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-500 tabular-nums">
                        {(index + 1).toString().padStart(2, '0')}
                        <span className="text-cream-400 mx-1">/</span>
                        {products.length.toString().padStart(2, '0')}
                      </p>
                    </div>

                    <h3 className="font-mono text-sm md:text-base uppercase tracking-wide text-brown-800 leading-snug">
                      {product.name}
                    </h3>

                    <p className="mt-3 flex-1 font-mono text-xs text-brown-800/80 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-stretch">
                      <a
                        href={product.exploreHref}
                        className="inline-flex min-h-11 flex-1 items-center justify-center border border-cream-400 bg-cream-100 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brown-800 transition-colors hover:bg-cream-200 hover:border-brown-800/30"
                      >
                        Explore
                      </a>
                      <Link
                        href={`/forms?product=${product.id}`}
                        className="inline-flex min-h-11 flex-1 items-center justify-center border border-brown-800 bg-brown-800 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
                      >
                        Join waitlist
                      </Link>
                    </div>

                    <div className="mt-6 pt-4 border-t border-cream-400 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className="text-cream-500">{product.category}</span>
                      <span className="text-brown-800/80">{product.status}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 md:px-[calc(3rem+2rem)]">
          <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-cream-500 text-left">
            <span>Specs subject to revision as systems ship.</span>
            <span className="hidden md:inline text-cream-400" aria-hidden="true">
              ·
            </span>
            <span className="hidden md:inline font-barcode normal-case tracking-normal text-cream-500/85">
              syspltfm0048219
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
}
