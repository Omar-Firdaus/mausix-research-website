'use client';

import { FRAME_INSET } from '@/lib/frame';
import { ASCIIArt } from './ASCIIArt';

type Props = Readonly<{
  leftMono?: string;
  leftBarcode?: string;
  rightMono?: string;
  ascii?: string;
  asciiRailSide?: 'left' | 'right';
  asciiVertical?: string;
}>;

export function SectionDecorations({
  leftMono,
  leftBarcode,
  rightMono,
  ascii,
  asciiRailSide = 'right',
  asciiVertical = '55%',
}: Props) {
  const hasSideText = leftMono || rightMono;

  if (!hasSideText && !ascii) {
    return null;
  }

  return (
    <>
      {leftMono && (
        <div
          className="pointer-events-none absolute hidden md:block z-[1] whitespace-nowrap text-xs text-cream-500/90"
          style={{
            left: `calc(${FRAME_INSET} + 0.75rem)`,
            top: '32%',
            transform: 'translateX(calc(-100% - 1.25rem)) rotate(-90deg)',
            transformOrigin: 'bottom right',
          }}
          aria-hidden="true"
        >
          <span className="font-mono">{leftMono}</span>
          {leftBarcode && (
            <>
              {' '}
              <span className="font-barcode">{leftBarcode}</span>
            </>
          )}
        </div>
      )}

      {rightMono && (
        <div
          className="pointer-events-none absolute hidden md:block z-[1] whitespace-nowrap font-mono text-xs text-cream-500/90"
          style={{
            right: `calc(${FRAME_INSET} + 0.75rem)`,
            top: '32%',
            transform: 'translateX(calc(100% + 1.25rem)) rotate(90deg)',
            transformOrigin: 'bottom left',
          }}
          aria-hidden="true"
        >
          {rightMono}
        </div>
      )}

      {ascii && (
        <ASCIIArt
          art={ascii}
          railSide={asciiRailSide}
          verticalOffset={asciiVertical}
        />
      )}
    </>
  );
}
