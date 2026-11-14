import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export const runtime = 'nodejs';

const fieldLimits = { name: 100, email: 254, organization: 120, service: 80, timing: 120, brief: 1000 };
const hour = 60 * 60 * 1000;

async function notifyInbox(inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !to) return;

  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Service: ${inquiry.service}`,
    `Organization: ${inquiry.organization || '—'}`,
    `Timing: ${inquiry.timing || '—'}`,
    '',
    inquiry.brief,
  ].join('\n');

  const key = createHash('sha256').update(JSON.stringify({ to, text })).digest('hex');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `project-inquiry/${key}`,
    },
    body: JSON.stringify({
      from: 'Billy Mitchell Design <inquiries@notify.billymitchell.design>',
      to: [to],
      reply_to: inquiry.email,
      subject: 'New project inquiry',
      text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Resend did not accept the email.');
}

export async function POST(request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return Response.json({ message: 'Please submit from the contact page.' }, { status: 403 });
  }

  let fields;
  try {
    const body = await request.text();
    if (body.length > 8192) return Response.json({ message: 'This inquiry is too long.' }, { status: 413 });
    fields = JSON.parse(body);
  } catch {
    return Response.json({ message: 'Please check your entries and try again.' }, { status: 400 });
  }
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return Response.json({ message: 'Please check your entries and try again.' }, { status: 400 });
  }
  if (fields.website) return Response.json({ message: 'This inquiry could not be accepted.' }, { status: 422 });

  const inquiry = {};
  for (const [field, limit] of Object.entries(fieldLimits)) {
    const value = typeof fields[field] === 'string' ? fields[field].trim() : '';
    if (value.length > limit) {
      return Response.json({ message: 'Please shorten your entries and try again.' }, { status: 400 });
    }
    inquiry[field] = value;
  }

  if (!inquiry.name || !inquiry.service || !inquiry.brief || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return Response.json({ message: 'Enter your name, a valid email, a service, and a project brief.' }, { status: 400 });
  }

  const configuredPath = process.env.INQUIRY_DB_PATH;
  if (!configuredPath && process.env.NODE_ENV === 'production') {
    return Response.json({ message: 'Inquiries are temporarily unavailable. Please email us directly.' }, { status: 503 });
  }

  let db;
  try {
    const path = configuredPath || resolve('.private', 'inquiries.sqlite');
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    db = new DatabaseSync(path);
    db.exec(`
      PRAGMA busy_timeout = 3000;
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY,
        created_at INTEGER NOT NULL,
        email TEXT NOT NULL COLLATE NOCASE,
        details TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries(created_at);
      BEGIN IMMEDIATE;
    `);

    const now = Date.now();
    const recent = db.prepare(`
      SELECT COUNT(*) AS total, COUNT(CASE WHEN email = ? THEN 1 END) AS sender
      FROM inquiries WHERE created_at > ?
    `).get(inquiry.email, now - hour);
    if (recent.total >= 30 || recent.sender >= 3) {
      return Response.json({ message: 'Too many recent inquiries. Please try later or email us directly.' }, { status: 429 });
    }

    db.prepare('INSERT INTO inquiries (created_at, email, details) VALUES (?, ?, ?)')
      .run(now, inquiry.email, JSON.stringify(inquiry));
    db.exec('COMMIT');
    try {
      await notifyInbox(inquiry);
    } catch {
      console.error('Inquiry saved but email notification failed.');
      return Response.json({
        message: 'Your inquiry was saved, but the email notification failed. Please email us directly to follow up.',
      }, { status: 502 });
    }
    return Response.json({ received: true }, { status: 201 });
  } catch {
    return Response.json({ message: 'We couldn’t save your inquiry. Please try again or email us directly.' }, { status: 503 });
  } finally {
    db?.close();
  }
}
