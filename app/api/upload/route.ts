import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const folder = (form.get('folder') as string | null) ?? 'misc';

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const safe = folder.replace(/[^a-z0-9/_-]/gi, '');
  const ext = file.name.split('.').pop() || 'webp';
  const base = file.name.replace(/\.[^.]+$/, '');
  const key = `images/${safe}/${base}-${Date.now()}.${ext}`;

  const blob = await put(key, file, { access: 'public' });
  return NextResponse.json({ url: blob.url, path: key });
}
