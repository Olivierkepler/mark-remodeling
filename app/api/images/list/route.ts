import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = (searchParams.get('folder') || '').replace(/[^a-z0-9/_-]/gi, '');
  const prefix = folder ? `images/${folder}` : 'images';

  const { blobs } = await list({ prefix }); // up to 1000 by default
  return NextResponse.json({
    items: blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname, // e.g. images/services/xyz.webp
      size: b.size,
      uploadedAt: b.uploadedAt,
    })),
  });
}
