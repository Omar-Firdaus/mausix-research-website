'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/nav';

const logoMaskStyle = {
  WebkitMaskImage: 'url(/mausix-logo.png)',
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskImage: 'url(/mausix-logo.png)',
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
} as const;

export function ScrollNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname !== '/');

  useEffect(() => {
    if (pathname !== '/') {
      setVisible(true);
      return;
    }

    const hero = document.getElementById('hero');
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] font-mono transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="border-b border-cream-400 bg-cream-100/96">
        <div className="relative mx-auto flex h-12 md:h-14 max-w-[100rem] items-center justify-between gap-4 px-5 md:px-[calc(3rem+2rem)]">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2.5 md:gap-3 shrink-0 text-brown-800 transition-colors hover:text-brown-950"
          >
            <div
              className="h-7 w-7 md:h-8 md:w-8 bg-cream-500 shrink-0"
              style={logoMaskStyle}
              aria-hidden="true"
            />
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-cream-500">
              Mausix Research
            </span>
          </Link>

          <nav
            className="flex items-center gap-2 md:gap-4"
            aria-label="Primary"
          >
            {navLinks
              .filter((link) => link.href !== '/forms')
              .map((link, index) => (
                <span key={link.href} className="flex items-center gap-2 md:gap-4">
                  {index > 0 && (
                    <span className="hidden md:inline text-cream-400 text-[10px]" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center px-1 md:px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brown-800 transition-colors hover:text-brown-950 underline-offset-4 hover:underline decoration-cream-400"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}

            <Link
              href="/forms"
              className="inline-flex min-h-11 items-center justify-center border border-brown-800 bg-brown-800 px-3 md:px-5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
            >
              Waitlist
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
