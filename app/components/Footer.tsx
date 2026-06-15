import Link from 'next/link';
import PageBorder from './PageBorder';
import { FRAME_INSET } from '@/lib/frame';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-cream-100 text-brown-800 font-mono overflow-hidden border-t border-cream-400">
      <PageBorder hud={false} edges="bottom" />

      <div
        className="relative z-10 px-5 md:px-[calc(3rem+2rem)] pt-5 md:pt-6"
        style={{
          paddingBottom: `calc(${FRAME_INSET} + 0.5rem)`,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <div
              className="shrink-0 h-7 w-7 md:h-8 md:w-8 bg-cream-500 mb-3"
              style={{
                WebkitMaskImage: 'url(/mausix-logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/mausix-logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
              aria-hidden="true"
            />

            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-[35px] bg-cream-400 shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-cream-500">
                End of line
              </span>
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500 text-right shrink-0">
            SYS MR-{year}-001
            <br />
            STATUS operational
          </p>
        </div>

        <div className="space-y-2 text-left max-w-xl mb-5">
          <p className="text-[17px] md:text-[20px] uppercase tracking-wide text-brown-800">
            {">>: Mausix Research"}
          </p>

          <p className="text-xs text-brown-800/80 leading-relaxed">
            Industrial systems research and engineering.
          </p>

          <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-brown-800">
            <a
              href="mailto:hello@mausix.research"
              className="underline underline-offset-4 decoration-cream-400 hover:bg-orange-500 hover:text-cream-50 hover:no-underline transition-colors"
            >
              Contact
            </a>
            <span className="text-cream-400">·</span>
            <Link
              href="/#blog"
              className="underline underline-offset-4 decoration-cream-400 hover:bg-orange-500 hover:text-cream-50 hover:no-underline transition-colors"
            >
              Blog
            </Link>
            <span className="text-cream-400">·</span>
            <a
              href="#"
              className="underline underline-offset-4 decoration-cream-400 hover:bg-orange-500 hover:text-cream-50 hover:no-underline transition-colors"
            >
              GitHub
            </a>
          </nav>

          <p className="text-[10px] uppercase tracking-wider text-cream-500">
            © {year} Mausix Research
          </p>
        </div>

        <div
          className="mx-auto w-full md:w-[calc(100%-4rem)] md:mx-[2rem] pointer-events-none select-none leading-[0] opacity-[0.16] md:opacity-10 mt-5 md:mt-6"
          aria-hidden="true"
        >
          <img
            src="/mausix-research-wordmark.png"
            alt=""
            className="block w-full h-auto opacity-50"
            style={{
              filter: 'invert(1) grayscale(1) brightness(0.48) contrast(0.95)',
            }}
          />
          <div className="h-px w-full bg-cream-400 -mt-px" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 pt-2 md:pl-[2rem] md:pr-[2rem] font-mono text-[10px] uppercase tracking-[0.16em] text-cream-500">
          <span>BODY::FOOTER</span>
          <span className="font-barcode tracking-normal normal-case text-xs text-cream-500/80">
            jksdfj8392hf9832hf983
          </span>
        </div>
      </div>
    </footer>
  );
}
