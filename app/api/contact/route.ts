// app/api/contact/route.ts
import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (per server instance)
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 10;

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown';
  const now = Date.now();
  const record = hits.get(ip) ?? { count: 0, ts: now };
  if (now - record.ts > WINDOW_MS) { record.count = 0; record.ts = now; }
  record.count++; hits.set(ip, record);
  if (record.count > MAX_HITS) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Bad JSON' }, { status: 400 }); }

  const { name, email, phone, message, company } = body || {};
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }
  // honeypot
  if (company) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // TODO: hook up your email provider here (Resend, SendGrid, AWS SES, etc.)
  // Example debug log (remove in prod):
  console.log('Contact request:', { name, email, phone, message });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Optional: quick health check
  return NextResponse.json({ ok: true });
}
