import { isValidWaitlistInterest } from '@/lib/waitlist';
import { sendWaitlistNotification } from '@/lib/send-waitlist-email';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = sanitize(payload.name, 120);
  const email = sanitize(payload.email, 254);
  const interest = sanitize(payload.interest, 64);
  const notes = sanitize(payload.notes, 2000);

  if (!name) {
    return Response.json({ error: 'Name is required.' }, { status: 400 });
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  if (!isValidWaitlistInterest(interest)) {
    return Response.json({ error: 'Select a valid program interest.' }, { status: 400 });
  }

  try {
    await sendWaitlistNotification({ name, email, interest, notes });
  } catch (error) {
    console.error('[waitlist] email delivery failed', error);

    const message =
      error instanceof Error && error.message === 'RESEND_API_KEY is not configured.'
        ? 'Waitlist email is not configured on the server.'
        : 'Could not deliver your registration. Try again later.';

    return Response.json({ error: message }, { status: 503 });
  }

  return Response.json({ ok: true });
}
