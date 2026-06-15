'use client';

import { useEffect, useState } from 'react';
import { FRAME_INSET } from '@/lib/frame';

const BOOT_STEPS = [
  'NEURAL BUS SYNC',
  'EEG CHANNEL MAP',
  'INTENT MODEL LOAD',
  'PHYSICAL WORLD LINK',
] as const;

type BootUiPhase = 'invite' | 'running' | 'exiting';

type Props = Readonly<{
  phase: BootUiPhase;
  onEngage: () => void;
  onSkip: () => void;
}>;

export function BootScreen({ phase, onEngage, onSkip }: Props) {
  const [stepIndex, setStepIndex] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'running') return;

    setStepIndex(0);
    setProgress(0);

    const stepTimer = window.setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, BOOT_STEPS.length - 1));
    }, 420);

    const progressTimer = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 3));
    }, 48);

    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(progressTimer);
    };
  }, [phase]);

  const isInvite = phase === 'invite';
  const isRunning = phase === 'running';

  return (
    <div
      className={`fixed inset-0 z-[200] font-mono text-brown-800 overflow-hidden ${
        phase === 'exiting' ? 'boot-screen-exiting' : ''
      }`}
      aria-live="polite"
      aria-label={isInvite ? 'Console standby' : 'System booting'}
    >
      <div
        className="absolute inset-0 bg-cream-100/72 backdrop-blur-[1px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(#F8F8F6CC,#F8F8F6CC),url(/noise-smooth.png)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.28] blueprint-grid blueprint-grid-minor pointer-events-none" />
      {isRunning && (
        <div className="absolute inset-x-0 h-px bg-cream-400/40 boot-scan-beam pointer-events-none" />
      )}

      <div
        className="absolute pointer-events-none border-t border-b border-cream-400"
        style={{ top: FRAME_INSET, bottom: FRAME_INSET, left: 0, right: 0 }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none w-px bg-cream-400 hidden md:block"
        style={{ left: FRAME_INSET, top: 0, bottom: 0 }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none w-px bg-cream-400 hidden md:block"
        style={{ right: FRAME_INSET, top: 0, bottom: 0 }}
        aria-hidden="true"
      />

      <div
        className="absolute top-6 md:top-10 left-6 md:left-[calc(3rem+0.75rem)] flex items-center gap-3"
        aria-hidden="true"
      >
        <div
          className="block h-8 w-8 md:h-9 md:w-9 bg-cream-500"
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
        <span className="text-[10px] uppercase tracking-[0.22em] text-cream-500 hidden sm:inline">
          Mausix Research
        </span>
      </div>

      <p
        className="absolute right-6 md:right-[calc(3rem+0.75rem)] top-6 md:top-10 text-[10px] uppercase tracking-[0.16em] text-cream-500 text-right"
        aria-hidden="true"
      >
        SYS MR-BOOT-001
        <br />
        <span className="inline-flex items-center justify-end gap-1.5 mt-1">
          <span
            className={`w-1.5 h-1.5 bg-orange-500 ${isRunning ? 'boot-live-pulse' : 'opacity-50'}`}
          />
          {isInvite ? 'Standby' : isRunning ? 'Linking' : 'Ready'}
        </span>
      </p>

      <div
        className="absolute inset-x-0 flex items-center justify-center px-6"
        style={{ top: FRAME_INSET, bottom: FRAME_INSET }}
      >
        <div className="w-full max-w-md border border-cream-400 bg-cream-100/80 p-6 md:p-8 boot-panel-reveal">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-cream-400" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-cream-500 shrink-0">
              {isInvite ? 'Operator channel' : 'Boot sequence'}
            </span>
            <div className="h-px flex-1 bg-cream-400" />
          </div>

          <p className="text-[22px] md:text-[26px] uppercase tracking-wide text-brown-800 mb-2">
            {isInvite ? '>>: Console ready' : '>>: System bring-up'}
          </p>

          {isInvite ? (
            <p className="text-xs md:text-sm text-brown-800/70 leading-relaxed mb-8 max-w-sm">
              Initialize the research console to open the operator channel — ambient
              audio and system boot included.
            </p>
          ) : (
            <p className="text-[10px] uppercase tracking-[0.14em] text-cream-500 mb-6">
              Dwg MR-BOOT · Rev 0.1 · Scale 1:1
            </p>
          )}

          {isRunning && (
            <div className="space-y-2 mb-6 text-[10px] uppercase tracking-[0.14em]">
              {BOOT_STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center justify-between gap-4 transition-opacity duration-300 ${
                    index <= stepIndex ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span className={index === stepIndex ? 'text-brown-800' : 'text-cream-500'}>
                    {step}
                  </span>
                  <span className="text-cream-500 tabular-nums">
                    {index < stepIndex ? 'OK' : index === stepIndex ? '…' : '—'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {isInvite ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={onEngage}
                className="w-full min-h-12 border border-brown-800 bg-brown-800 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
              >
                Initialize console
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="block w-full text-center font-mono text-[10px] uppercase tracking-[0.14em] text-cream-500 underline underline-offset-4 decoration-cream-400 hover:text-brown-800 transition-colors"
              >
                Continue without audio
              </button>
            </div>
          ) : (
            <div className="border-t border-cream-400 pt-5">
              <div className="flex items-center justify-between gap-3 mb-2 text-[10px] uppercase tracking-[0.14em]">
                <span className="text-cream-500">Load progress</span>
                <span className="text-brown-800 tabular-nums">
                  {progress.toString().padStart(3, '0')}%
                </span>
              </div>
              <div className="h-1 w-full bg-cream-300/80 overflow-hidden">
                <div
                  className="h-full bg-brown-800/40 transition-[width] duration-75 linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isInvite && (
        <p
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-cream-500 boot-status-blink"
          aria-hidden="true"
        >
          Awaiting operator
        </p>
      )}
    </div>
  );
}
