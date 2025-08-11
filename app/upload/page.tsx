'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Section = 'hero' | 'services' | 'team' | 'gallery' | 'misc';

const MAX_WIDTH: Record<Section, number> = {
  hero: 1600,
  services: 1000,
  team: 800,
  gallery: 1200,
  misc: 1200,
};

// (Optional) If you already have optimizeToWebP from before, keep it.
// Here’s a minimal no-op passthrough to avoid breaking:
async function passthrough(file: File) { return file; }

export default function UploadPage() {
  const [folder, setFolder] = useState<Section>('hero');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [quality] = useState(0.82); // if optimizing, wire this into your optimizer

  const [items, setItems] = useState<{ url: string; pathname: string; size: number; uploadedAt?: string }[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const dropRef = useRef<HTMLLabelElement>(null);

  // Live preview
  useEffect(() => {
    if (!file) return setPreviewUrl(null);
    const u = URL.createObjectURL(file);
    setPreviewUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
    dropRef.current?.classList.remove('ring-2', 'ring-blue-500');
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    dropRef.current?.classList.add('ring-2', 'ring-blue-500');
  }
  function onDragLeave() {
    dropRef.current?.classList.remove('ring-2', 'ring-blue-500');
  }

  async function loadList(sec: Section) {
    setLoadingList(true);
    try {
      const res = await fetch(`/api/images/list?folder=${encodeURIComponent(sec)}`, { cache: 'no-store' });
      const data = await res.json();
      setItems(data.items ?? []);
    } finally {
      setLoadingList(false);
    }
  }
  useEffect(() => { loadList(folder); }, [folder]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUrl(null);

    try {
      // If you have the optimizer from the previous step, call that instead:
      // const optimized = await optimizeToWebP(file, MAX_WIDTH[folder], quality);
      const optimized = await passthrough(file);

      const fd = new FormData();
      fd.append('file', optimized);
      fd.append('folder', folder);

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload failed');
      setUrl(data.url);
      setFile(null);
      setPreviewUrl(null);
      await loadList(folder);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(itemUrl: string) {
    if (!confirm('Delete this image?')) return;

    // optimistic UI
    const prev = items;
    setItems((curr) => curr.filter((i) => i.url !== itemUrl));

    try {
      const res = await fetch('/api/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: itemUrl }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Delete failed');
      }
    } catch (e: any) {
      alert(e.message);
      setItems(prev); // rollback on failure
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8 mt-30">
      <h1 className="text-2xl font-bold">Image Manager</h1>

      <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2 items-start">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Section / Folder</label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value as Section)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="hero">Hero</option>
              <option value="services">Services</option>
              <option value="team">Team</option>
              <option value="gallery">Gallery</option>
              <option value="misc">Misc</option>
            </select>
          </div>

          {/* Dropzone */}
          <label
            ref={dropRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
          >
            <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            <span className="text-sm text-gray-700">
              <b>Click to choose</b> or drag & drop an image here
            </span>
            <span className="text-xs text-gray-500">PNG, JPG, WEBP…</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!file || uploading}
              className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-white disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
            {file && (
              <button
                type="button"
                onClick={() => { setFile(null); setPreviewUrl(null); }}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                Clear selection
              </button>
            )}
          </div>

          {/* Preview */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Preview (Local)</h3>
            {previewUrl ? (
              <div className="space-y-2">
                <div className="relative w-full aspect-video overflow-hidden rounded bg-gray-50">
                  <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
                </div>
                <p className="text-xs text-gray-500">
                  {file?.name} • {(file!.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select an image to preview.</p>
            )}
          </div>

          {/* Upload result */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Upload Result (CDN)</h3>
            {url ? (
              <div className="space-y-2">
                <a className="text-blue-600 underline break-all" href={url} target="_blank">
                  {url}
                </a>
                <div className="relative w-full aspect-video overflow-hidden rounded bg-gray-50">
                  <img src={url} alt="uploaded" className="w-full h-full object-contain" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Upload to see the CDN URL.</p>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Images in “{folder}”</h2>
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-black underline"
              onClick={() => loadList(folder)}
              disabled={loadingList}
            >
              {loadingList ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-gray-500">No images yet.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <li key={it.pathname} className="border rounded p-2 flex flex-col gap-2">
                  <div className="relative w-full aspect-video rounded overflow-hidden bg-gray-50">
                    <Image
                      src={it.url}
                      alt={it.pathname}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <a className="text-xs text-blue-600 underline break-all" href={it.url} target="_blank">
                    {it.url}
                  </a>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{(it.size / 1024).toFixed(1)} KB</span>
                    {it.uploadedAt && <span>{new Date(it.uploadedAt).toLocaleDateString()}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(it.url)}
                    className="self-end text-red-600 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </main>
  );
}
