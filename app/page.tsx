'use client';

import Link from 'next/link';
import PageBorder from './components/PageBorder';
import { ASCIIArt } from './components/ASCIIArt';
import { WireframeGraphic } from './components/WireframeGraphic';
import { BlogSection } from './components/BlogSection';
import { ProductsSection } from './components/ProductsSection';
import { asciiArt } from '@/lib/ascii-art';
import { FRAME_INSET } from '@/lib/frame';

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="relative h-[min(78vh,720px)] overflow-hidden bg-[linear-gradient(#FEFEFEEE,#FEFEFEEE),url(/noise-smooth.png)] font-mono text-brown-800 bg-container"
        aria-label="Landing"
      >
        <style jsx>{`
          .bg-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(#FEFEFEEE, #FEFEFEEE), url(/noise-smooth.png);
            pointer-events: none;
            z-index: -1;
          }
        `}</style>

      <ASCIIArt art={asciiArt.hackclub} horizontalPosition={80} verticalOffset="5vh" />
      <ASCIIArt art={asciiArt.earth} horizontalPosition={35} verticalOffset="14vh" />
      <ASCIIArt art={asciiArt.fish} horizontalPosition={65} verticalOffset="42vh" />
      <ASCIIArt art={asciiArt.cat} horizontalPosition={85} verticalOffset="50vh" />
      <ASCIIArt art={asciiArt.roflcopter} horizontalPosition={35} verticalOffset="56vh" />
      <ASCIIArt art={asciiArt.duck} horizontalPosition={90} verticalOffset="64vh" />
      <ASCIIArt art={asciiArt.opensauce2} horizontalPosition={18} verticalOffset="68vh" />

        <PageBorder />

        <WireframeGraphic />

        <div
          className="absolute z-0 inset-x-0 md:left-[3rem] md:right-[3rem]"
          style={{
            top: FRAME_INSET,
            bottom: FRAME_INSET,
          }}
        >
          <div
            className="pointer-events-none absolute top-4 md:top-8 left-6 md:left-3 z-20"
            aria-hidden="true"
          >
            <div
              className="block h-9 w-9 md:h-11 md:w-11 bg-cream-500"
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
            />
          </div>

          <div className="absolute z-20 left-10 md:left-10 top-1/2 -translate-y-1/2 max-w-[min(100%,32rem)] md:max-w-2xl pr-6 md:pr-16">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="h-px w-[35px] bg-cream-400 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-500">
                Mission
              </span>
            </div>
            <p className="font-display font-bold text-[19px] sm:text-[22px] md:text-[28px] lg:text-[34px] tracking-[-0.02em] text-brown-950 leading-[1.18] md:leading-[1.14]">
              We research the path from neural intent to action in the physical world.
            </p>
            <Link
              href="/forms"
              className="inline-flex mt-8 md:mt-10 min-h-12 items-center justify-center border border-brown-800 bg-brown-800 px-7 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      </section>

      <ProductsSection />
      <BlogSection />
    </>
  );
}
