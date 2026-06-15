'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createAudioEngine,
  fadeOutAmbient,
  playBootSequence,
  resumeAudio,
  startAmbientDrone,
} from '@/lib/synth-audio';
import { BootScreen } from './BootScreen';

const BOOT_STORAGE_KEY = 'mausix-boot-complete';

type BootPhase = 'invite' | 'running' | 'exiting' | 'ready' | 'skipped';

export function SiteAudio() {
  const engineRef = useRef<ReturnType<typeof createAudioEngine>>(null);
  const stopAmbientRef = useRef<(() => void) | null>(null);
  const stopBootRef = useRef<(() => void) | null>(null);
  const [bootPhase, setBootPhase] = useState<BootPhase>('invite');
  const [muted, setMuted] = useState(false);
  const bootPhaseRef = useRef(bootPhase);
  bootPhaseRef.current = bootPhase;

  const startAmbient = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || stopAmbientRef.current) return;
    stopAmbientRef.current = startAmbientDrone(engine);
  }, []);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
    setBootPhase('exiting');
    window.setTimeout(() => {
      startAmbient();
      setBootPhase('ready');
    }, 520);
  }, [startAmbient]);

  const handleEngage = useCallback(async () => {
    const engine = engineRef.current ?? createAudioEngine();
    if (!engine) {
      finishBoot();
      return;
    }

    engineRef.current = engine;
    await resumeAudio(engine.context);

    if (engine.context.state !== 'running') {
      return;
    }

    setBootPhase('running');
    stopBootRef.current?.();
    stopBootRef.current = playBootSequence(engine, finishBoot);
  }, [finishBoot]);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
    setBootPhase('ready');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
      setBootPhase('skipped');
      return;
    }

    if (sessionStorage.getItem(BOOT_STORAGE_KEY) === '1') {
      setBootPhase('ready');
    }

    return () => {
      stopBootRef.current?.();
      stopAmbientRef.current?.();
      void engineRef.current?.context.close();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (bootPhaseRef.current !== 'invite') return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        void handleEngage();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleEngage]);

  const toggleMute = async () => {
    const engine = engineRef.current ?? createAudioEngine();
    if (!engine) return;

    engineRef.current = engine;
    await resumeAudio(engine.context);

    if (muted) {
      if (!stopAmbientRef.current) {
        startAmbient();
      } else {
        engine.master.gain.cancelScheduledValues(engine.context.currentTime);
        engine.master.gain.setValueAtTime(engine.master.gain.value, engine.context.currentTime);
        engine.master.gain.linearRampToValueAtTime(0.42, engine.context.currentTime + 0.6);
      }
      setMuted(false);
      return;
    }

    fadeOutAmbient(engine);
    setMuted(true);
  };

  if (bootPhase === 'skipped') {
    return null;
  }

  const showBoot = bootPhase === 'invite' || bootPhase === 'running' || bootPhase === 'exiting';

  return (
    <>
      {showBoot && (
        <BootScreen
          phase={bootPhase === 'exiting' ? 'exiting' : bootPhase === 'running' ? 'running' : 'invite'}
          onEngage={() => void handleEngage()}
          onSkip={handleSkip}
        />
      )}

      {bootPhase === 'ready' && (
        <button
          type="button"
          onClick={() => void toggleMute()}
          className="fixed bottom-4 right-4 md:right-[calc(3rem+1rem)] z-[60] flex items-center gap-2 border border-cream-400 bg-cream-100/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brown-800 transition-colors hover:bg-cream-200"
          aria-label={muted ? 'Unmute ambient audio' : 'Mute ambient audio'}
          aria-pressed={muted}
        >
          <span
            className="inline-block w-1.5 h-1.5 bg-brown-800"
            style={{ opacity: muted ? 0.3 : 1 }}
          />
          {muted ? 'Audio off' : 'Audio on'}
        </button>
      )}
    </>
  );
}
