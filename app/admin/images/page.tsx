'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Section = 'hero' | 'services' | 'team' | 'gallery';

const sectionMaxWidth: Record<Section, number> = {
  hero: 1600,
  services: 900,
  team: 800,
  gallery: 1200,
};

async function imageToWebP(file: File, maxWidth: number, quality = 0.82): Promise<File> {
  const img = document.createElement('img');
  const reader = new FileReader();

  const dataUrl: string = await new Promise((res, rej) => {
    reader.onerror = () => rej(new Error('read error'));
    reader.onload = () => res(reader.result as string);
    reader.readAsDataURL(file);
  });

  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error('img load error'));
    img.src = dataUrl;
  });

  const scale = Math.min(1, maxWidth / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, w, h);

  const blob: Blob = await new Promise((res) =>
    canvas.toBlob((b) => res(b as Blob), 'image/webp', quality)
  );

  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
}

export default function AdminImages() {
  const [section, setSection] = useState<Section>('hero');
  const [file, setFile] = useState<File | null>(null);
  const [baseName, setBaseName] = useState('hero-banner');
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [items, setItems] = useState<{ url: string; pathname: string; size: number }[]>([]);

  const maxWidth = sectionMaxWidth[section];

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // optimize to webp with the section’s max width
      const optimized = await imageToWebP(file, maxWidth, 0.82);

      const fd = new FormData();
      fd.append('file', optimized);
      fd.append('folder', section);
      fd.append('base', baseName);     // will be slugged server-side
      fd.append('ext', 'webp');

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload failed');

      setUrl(data.url);
      // refresh list
      await loadList(section);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function loadList(sec: Section) {
    const res = await fetch(`/api/list?folder=${encodeURIComponent(sec)}`);
    const data = await res.json();
    setItems(data.items ?? []);
  }

  useEffect(() => { loadList(section); }, [section]);

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Image Manager</h1>

      <form onSubmit={handleUpload} className="grid gap-4 md:grid-cols-2 items-start">
        <div className="space-y-3">
          <label className="block text-sm font-medium">Section / Folder</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as Section)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="hero">Hero</option>
            <option value="services">Services</option>
            <option value="team">Team</option>
            <option value="gallery">Gallery</option>
          </select>

          <label className="block text-sm font-medium">Base name (used for filename)</label>
          <input
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            placeholder="e.g. living-room-makeover"
            className="w-full rounded border px-3 py-2"
          />

          <label className="block text-sm font-medium">Choose image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          <p className="text-xs text-gray-500">
            Will optimize to <b>WebP</b>, max width <b>{maxWidth}px</b>, quality <b>82%</b>.
          </p>

          <button
            type="submit"
            disabled={!file || uploading}
            className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Latest Upload</h3>
            {url ? (
              <div className="space-y-2">
                <a href={url} target="_blank" className="text-blue-600 underline break-all">{url}</a>
                <div className="relative w-full aspect-[16/9]">
                  {/* Next Image for optimization & layout */}
                  <Image src={url} alt="uploaded" fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No upload yet.</p>
            )}
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Images in “{section}”</h2>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No images yet.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4">
            {items.map((it) => (
              <li key={it.pathname} className="border rounded p-2">
                <div className="relative w-full aspect-video">
                  <Image src={it.url} alt={it.pathname} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover rounded" />
                </div>
                <a className="text-xs text-blue-600 underline break-all" href={it.url} target="_blank">
                  {it.url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
