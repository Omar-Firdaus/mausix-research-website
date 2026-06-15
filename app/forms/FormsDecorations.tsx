'use client';

import { SectionDecorations } from '../components/SectionDecorations';
import { asciiArt } from '@/lib/ascii-art';

export function FormsDecorations() {
  return (
    <SectionDecorations
      leftMono="0x00wl9c4e"
      leftBarcode="operatorreg5521"
      rightMono="CHANNEL OPEN"
      ascii={asciiArt.duck}
      asciiRailSide="right"
      asciiVertical="62%"
    />
  );
}
