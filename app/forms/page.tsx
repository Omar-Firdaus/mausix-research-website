import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageBorder from '../components/PageBorder';
import { WaitlistForm } from '../components/WaitlistForm';
import { FormsDecorations } from './FormsDecorations';
import { FRAME_INSET } from '@/lib/frame';

export const metadata: Metadata = {
  title: 'Waitlist · Mausix Research',
  description: 'Join the Mausix Research operator waitlist for platform programs and hardware releases.',
};

function FormFallback() {
  return (
    <div className="border border-cream-400 bg-cream-100/80 p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-cream-500">
        Loading registration panel…
      </p>
    </div>
  );
}

export default function FormsPage() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(#FCFCFCEE,#FCFCFCEE),url(/noise-smooth.png)] font-mono text-brown-800"
      aria-label="Waitlist registration"
    >
      <div className="absolute inset-0 opacity-[0.22] blueprint-grid blueprint-grid-minor pointer-events-none" />

      <PageBorder hud={false} edges="top" />

      <FormsDecorations />

      <div
        className="relative z-10 mx-auto w-full max-w-2xl px-5 md:px-[calc(3rem+2rem)]"
        style={{
          paddingTop: `calc(${FRAME_INSET} + 2rem)`,
          paddingBottom: '2rem',
        }}
      >
        <Link
          href="/"
          className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500 hover:text-brown-800 transition-colors mb-8 md:mb-10"
        >
          ← Back to console
        </Link>

        <div className="flex items-start justify-between gap-6 mb-8 md:mb-10">
          <div
            className="shrink-0 h-9 w-9 md:h-11 md:w-11 bg-cream-500"
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

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-500 text-right">
            SYS MR-WL-001
            <br />
            STATUS accepting
          </p>
        </div>

        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="h-px w-[35px] bg-cream-400 shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-500">
              Operator channel
            </span>
          </div>

          <h1 className="font-display font-bold text-[24px] sm:text-[28px] md:text-[34px] tracking-[-0.02em] text-brown-950 leading-[1.18] md:leading-[1.14] max-w-xl">
            Join the waitlist for Mausix platform programs.
          </h1>

          <p className="mt-4 font-mono text-xs md:text-sm text-brown-800/80 leading-relaxed max-w-lg">
            Register interest in Mausix Research hardware and interface systems. We use this
            channel for early access, bench partner invites, and release notifications.
          </p>
        </div>

        <Suspense fallback={<FormFallback />}>
          <WaitlistForm />
        </Suspense>
      </div>
    </section>
  );
}
