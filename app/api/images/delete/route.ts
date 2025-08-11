import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  await del(url); // deletes the blob by URL
  return NextResponse.json({ ok: true });
}
