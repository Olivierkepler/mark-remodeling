'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const BRAND_BLUE = '#1E3A8A';
const BRAND_GOLD = '#F59E0B';

// Keep PH as a true placeholder
const PH = '/images/placeholder.jpg';

// Your AFTER image URL
const BEFORE_URL =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before1-1754881762282.jpeg';

const AFTER_URL1 =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after1-1754875578651.jpeg';

const BEFORE_URL2 =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before2-1754881944144.jpeg';

const AFTER_URL2 =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after2-1754882098440.jpeg';

const BEFORE_URL3 =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before3-1754882346828.jpeg';

const AFTER_URL3 =
  'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after3-1754882414605.jpeg';

export type Project = {
  id: string;
  url?: string;
  title: string;
  location?: string;
  scope?: string;
  before?: string; // string, optional
  after?: string;  // string, optional
};

const FALLBACK: Project[] = [
  {
    id: 'kitchen-01',
    title: 'Modern Kitchen Remodel',
    location: 'Cambridge, MA',
    scope: 'Cabinetry, counters, lighting',
    before: BEFORE_URL,          // replace with real "before" when you have it
    after: AFTER_URL1,    // ← your Blob link
  },
  {
    id: 'bath-01',
    title: 'Luxury Bathroom Update',
    location: 'Boston, MA',
    scope: 'Tile, fixtures, walk-in shower',
    before: BEFORE_URL2,
    after: AFTER_URL2,
    url: 'https://www.google.com',
  },
  {
    id: 'office-01',
    title: 'Office Build-Out',
    location: 'Somerville, MA',
    scope: 'Open concept, glass partitions',
    before: BEFORE_URL3,
    after: AFTER_URL3,
    url: 'https://www.google.com',
  },
];

export default function FeaturedProjects({ projects = FALLBACK }: { projects?: Project[] }) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion() ?? false;

  const data = projects.length ? projects : FALLBACK;

  const next = () => setIndex((i) => (i + 1) % data.length);
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="projects" className="relative py-16 md:py-24 ">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(40% 60% at 10% 20%, ${BRAND_GOLD}24, transparent 60%), radial-gradient(40% 60% at 90% 30%, ${BRAND_BLUE}26, transparent 60%)`,
        }}
      />

      <div className="mx-auto max-w-full px-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Projects
            </h2>
            <p className="mt-2 text-gray-600">
              Before & after transformations that showcase our craftsmanship.
            </p>
          </div>

          {/* Mobile-only controls */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={prev} className="inline-flex cursor-pointer items-center justify-center rounded-full border bg-white/80 px-3 py-2 backdrop-blur-xl shadow" style={{ borderColor: `${BRAND_BLUE}26` }} aria-label="Previous project">
              <ArrowLeft className="h-4 w-4 text-black" />
            </button>
            <button onClick={next} className="inline-flex cursor-pointer items-center justify-center rounded-full border bg-white/80 px-3 py-2 backdrop-blur-xl shadow" style={{ borderColor: `${BRAND_BLUE}26` }} aria-label="Next project">
              <ArrowRight className="h-4 w-4 text-black" />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-10 hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((p) => (
            <ProjectCard key={p.id} project={p} prefersReduced={prefersReduced} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-8 md:hidden relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: prefersReduced ? 'none' : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}
          >
            {data.map((p) => (
              <div key={p.id} className="min-w-full pr-2">
                <ProjectCard project={p} prefersReduced={prefersReduced} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="h-1.5 w-6 rounded-full transition-all"
                style={{ backgroundColor: i === index ? BRAND_GOLD : '#e5e7eb' }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white/70 p-5 backdrop-blur-xl shadow" style={{ borderColor: `${BRAND_BLUE}26` }}>
          <div className="flex items-center gap-3 text-gray-800">
            <Sparkles style={{ color: BRAND_GOLD }} className="h-5 w-5" />
            <p className="text-sm md:text-base">Want to see more transformations? Explore our services and the work we ve done.</p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg" style={{ background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD}cc)`, color: '#111827' }}>
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, prefersReduced }: { project: Project; prefersReduced: boolean; }) {
  const [split, setSplit] = useState(55);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleId = useId();

  const beforeSrc = project.before || PH;
  const afterSrc  = project.after  || PH;

  const hasBefore = !!project.before; // just check presence
  const hasAfter  = !!project.after;

  const startDrag = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSplit(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    startDrag(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if ((e.buttons & 1) !== 1) return;
    startDrag(e.clientX);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSplit((v) => Math.max(0, v - 2));
    if (e.key === 'ArrowRight') setSplit((v) => Math.min(100, v + 2));
    if (e.key === 'Home') setSplit(0);
    if (e.key === 'End') setSplit(100);
  };

  return (
    <motion.article
      whileHover={prefersReduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="group relative overflow-hidden rounded-sm lg:rounded-2xl border bg-white/80 backdrop-blur-xl shadow-lg"
      style={{ borderColor: `${BRAND_BLUE}26` }}
    >
      <div
        ref={sliderRef}
        className="relative aspect-[4/3] select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        role="region"
        aria-label={`${project.title}: before and after comparison`}
      >
        {/* BEFORE */}
        {hasBefore ? (
          <Image
            src={beforeSrc}
            alt={`${project.title} — before`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-amber-500 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Before Image</span>
          </div>
        )}

        {/* AFTER (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${split}%` }} aria-hidden>
          {hasAfter ? (
            <Image
              src={afterSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-blue-900 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">After Image</span>
            </div>
          )}
        </div>

        {/* Divider + handle */}
        <div className="absolute inset-y-0" style={{ left: `calc(${split}% - 1px)` }} aria-hidden>
          <div className="h-full w-[2px] bg-white/80 shadow" />
        </div>

        <button
          id={handleId}
          aria-label="Drag to compare before and after"
          aria-describedby={`${handleId}-desc`}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[11px] font-semibold text-gray-800 bg-white/95 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          style={{ left: `calc(${split}% - 0px)`, borderColor: `${BRAND_BLUE}26` }}
        >
          Drag
        </button>
        <span id={`${handleId}-desc`} className="sr-only">
          Use Left/Right arrows to adjust, Home=0%, End=100%.
        </span>

        {/* Invisible range for accessibility */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(split)}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-0 h-full w-full appearance-none bg-transparent cursor-ew-resize"
        />
      </div>

      {/* Info */}
      <div className="relative p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: 'rgba(245,158,11,0.12)', color: BRAND_GOLD }}>
            Before / After
          </span>
        </div>
        {(project.location || project.scope) && (
          <p className="mt-1 text-sm text-gray-600">
            {project.location && <span>{project.location}</span>}
            {project.location && project.scope && ' • '}
            {project.scope}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(180deg, transparent, ${BRAND_BLUE}08)` }} aria-hidden />
    </motion.article>
  );
}
