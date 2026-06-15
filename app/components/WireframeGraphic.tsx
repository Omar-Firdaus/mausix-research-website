'use client';

export function WireframeGraphic() {
  return (
    <div
      className="absolute pointer-events-none hidden md:block z-10"
      style={{
        right: 'calc(3rem + 7rem)',
        bottom: '3rem',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <p
          className="absolute z-30 font-mono text-xs uppercase tracking-[0.22em] text-brown-800/75 whitespace-nowrap"
          style={{
            right: '100%',
            top: '62%',
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
          className="wireframe-robot-idle relative z-10 block w-auto h-[min(46vh,480px)] max-w-[min(52vw,680px)] object-contain object-right-bottom"
          style={{
            filter: 'invert(1) grayscale(1) contrast(1.2)',
          }}
        />
      </div>
    </div>
  );
}
