import { Resend } from 'resend';
import { getWaitlistInterest } from '@/lib/waitlist';

export type WaitlistSubmission = {
  name: string;
  email: string;
  interest: string;
  notes: string;
};

const DEFAULT_NOTIFY_EMAIL = 'omar.firdaus101@gmail.com';

export async function sendWaitlistNotification(
  submission: WaitlistSubmission,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const to = process.env.WAITLIST_NOTIFY_EMAIL ?? DEFAULT_NOTIFY_EMAIL;
  const from =
    process.env.WAITLIST_FROM_EMAIL ?? 'Mausix Research <onboarding@resend.dev>';
  const program = getWaitlistInterest(submission.interest);

  const resend = new Resend(apiKey);

  const text = [
    'New waitlist registration',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Program: ${program.label} (${program.serial})`,
    `Interest ID: ${submission.interest}`,
    '',
    'Notes:',
    submission.notes || '(none)',
    '',
    `Submitted at: ${new Date().toISOString()}`,
  ].join('\n');

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: submission.email,
    subject: `[Mausix Waitlist] ${submission.name} — ${program.label}`,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
