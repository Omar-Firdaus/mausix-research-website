'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { FRAME_INSET } from '@/lib/frame';

type Props = Readonly<{
  inset?: string;
}>;

const fixedLayer: CSSProperties = {
  position: 'fixed',
};

export function SiteSideRails({ inset = FRAME_INSET }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="pointer-events-none hidden md:block w-px bg-cream-500 z-50"
        style={{
          ...fixedLayer,
          left: inset,
          top: 0,
          bottom: 0,
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none hidden md:block w-px bg-cream-500 z-50"
        style={{
          ...fixedLayer,
          right: inset,
          top: 0,
          bottom: 0,
          transform: 'translateX(50%)',
        }}
        aria-hidden="true"
      />
    </>,
    document.body,
  );
}
