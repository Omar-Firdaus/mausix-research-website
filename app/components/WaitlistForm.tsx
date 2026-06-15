'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getWaitlistInterest, isValidWaitlistInterest, waitlistInterests } from '@/lib/waitlist';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm() {
  const searchParams = useSearchParams();
  const initialInterest = useMemo(() => {
    const product = searchParams.get('product');
    return product && isValidWaitlistInterest(product) ? product : 'general';
  }, [searchParams]);

  const [interest, setInterest] = useState(initialInterest);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const selectedInterest = getWaitlistInterest(interest);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interest, notes }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setState('error');
        setErrorMessage(data.error ?? 'Submission failed. Try again.');
        return;
      }

      setState('success');
    } catch {
      setState('error');
      setErrorMessage('Network error. Check your connection and try again.');
    }
  }

  if (state === 'success') {
    return (
      <div className="border border-cream-400 bg-cream-100/80 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-cream-400" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-cream-500 shrink-0">
            Confirmed
          </span>
          <div className="h-px flex-1 bg-cream-400" />
        </div>

        <p className="font-display font-bold text-[22px] md:text-[26px] tracking-[-0.02em] text-brown-950 leading-tight mb-3">
          Operator channel registered
        </p>

        <p className="font-mono text-xs md:text-sm text-brown-800/80 leading-relaxed mb-8 max-w-md">
          Your waitlist request for {selectedInterest.label} is logged. We will reach out at{' '}
          <span className="text-brown-800">{email}</span> when the next cohort opens.
        </p>

        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center border border-brown-800 bg-brown-800 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-cream-400 bg-cream-100/80 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-cream-400" />
        <span className="text-[10px] uppercase tracking-[0.22em] text-cream-500 shrink-0">
          Registration
        </span>
        <div className="h-px flex-1 bg-cream-400" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-500 mb-6">
        Dwg MR-WL-001 · Rev 0.1 · {selectedInterest.serial}
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="waitlist-name" className="block text-[10px] uppercase tracking-[0.18em] text-cream-500 mb-2">
            Operator name
          </label>
          <input
            id="waitlist-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full min-h-12 border border-cream-400 bg-cream-50 px-4 py-3 font-mono text-sm text-brown-800 placeholder:text-cream-500 focus:outline-none focus:border-brown-800 transition-colors"
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="waitlist-email" className="block text-[10px] uppercase tracking-[0.18em] text-cream-500 mb-2">
            Contact address
          </label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full min-h-12 border border-cream-400 bg-cream-50 px-4 py-3 font-mono text-sm text-brown-800 placeholder:text-cream-500 focus:outline-none focus:border-brown-800 transition-colors"
            placeholder="you@domain.com"
          />
        </div>

        <div>
          <label htmlFor="waitlist-interest" className="block text-[10px] uppercase tracking-[0.18em] text-cream-500 mb-2">
            Program interest
          </label>
          <select
            id="waitlist-interest"
            name="interest"
            required
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className="w-full min-h-12 border border-cream-400 bg-cream-50 px-4 py-3 font-mono text-sm text-brown-800 focus:outline-none focus:border-brown-800 transition-colors appearance-none"
          >
            {waitlistInterests.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} · {option.serial}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="waitlist-notes" className="block text-[10px] uppercase tracking-[0.18em] text-cream-500 mb-2">
            Notes <span className="normal-case tracking-normal text-cream-400">(optional)</span>
          </label>
          <textarea
            id="waitlist-notes"
            name="notes"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full border border-cream-400 bg-cream-50 px-4 py-3 font-mono text-sm text-brown-800 placeholder:text-cream-500 focus:outline-none focus:border-brown-800 transition-colors resize-y min-h-[112px]"
            placeholder="Lab context, use case, or hardware you are building on…"
          />
        </div>
      </div>

      {state === 'error' && errorMessage && (
        <p className="mt-5 font-mono text-xs text-brown-950 border border-cream-400 bg-cream-200/60 px-4 py-3">
          {errorMessage}
        </p>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center border border-brown-800 bg-brown-800 px-7 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-cream-50 transition-colors hover:bg-brown-950 hover:border-brown-950 disabled:opacity-60 disabled:pointer-events-none"
        >
          {state === 'submitting' ? 'Transmitting…' : 'Submit registration'}
        </button>

        <Link
          href="/"
          className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-cream-500 underline underline-offset-4 decoration-cream-400 hover:text-brown-800 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
