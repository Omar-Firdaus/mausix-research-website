'use client';

import { useEffect, useRef } from 'react';

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateNoise = () => {
      if (!canvas.width || !canvas.height) return;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 40;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    generateNoise();
    window.addEventListener('resize', resize);

    const interval = setInterval(generateNoise, 120);

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage: 'url(/noise-smooth.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.14] mix-blend-multiply"
        aria-hidden="true"
        role="presentation"
      />
    </div>
  );
}
