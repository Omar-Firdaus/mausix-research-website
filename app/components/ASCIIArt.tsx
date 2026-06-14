'use client';

import { useEffect, useRef, useState } from 'react';

type Props = Readonly<{
  art: string;
  horizontalPosition?: number;
  verticalOffset?: string;
  inline?: boolean;
}>;

export function ASCIIArt({
  art,
  horizontalPosition = 50,
  verticalOffset = '0',
  inline = false,
}: Props) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
      setMouseY(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        inline
          ? 'relative max-sm:hidden pointer-events-none select-none'
          : 'absolute max-sm:hidden pointer-events-none select-none z-[5]'
      }
      style={
        inline
          ? undefined
          : {
              left: `${horizontalPosition}%`,
              top: verticalOffset,
              transform: 'translateX(-50%)',
            }
      }
      aria-hidden="true"
    >
      <pre className="text-brown-800/10 text-[0.7rem] leading-[1.2] whitespace-pre font-mono text-left">
        {art}
      </pre>
      <pre
        className="absolute top-0 left-0 text-brown-800/30 text-[0.7rem] leading-[1.2] whitespace-pre font-mono text-left"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      >
        {art}
      </pre>
    </div>
  );
}
