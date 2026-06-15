'use client';

export function WireframeGraphic() {
  return (
    <div
      className="absolute pointer-events-none hidden md:block z-10"
      style={{
        right: 'calc(3rem + 2rem)',
        top: '3rem',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <p
          className="absolute z-30 font-mono text-xs uppercase tracking-[0.22em] text-brown-800/75 whitespace-nowrap"
          style={{
            right: '100%',
            top: '48%',
            marginRight: '-9rem',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
          }}
        >
          MAUSIX-H1
        </p>
        <img
          src="/openarm-wireframe.png"
          alt=""
          className="wireframe-robot-idle relative z-10 block w-auto h-[min(42vh,440px)] max-w-[min(48vw,620px)] object-contain object-right-top"
          style={{
            filter: 'invert(1) grayscale(1) contrast(1.2)',
          }}
        />
      </div>
    </div>
  );
}
