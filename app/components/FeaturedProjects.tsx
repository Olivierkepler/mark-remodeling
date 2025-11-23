"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const BRAND_BLUE = "#1E3A8A";
const BRAND_GOLD = "#F59E0B";

const PH = "/images/placeholder.jpg";

// Existing blob images
const BEFORE_URL =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before1-1754881762282.jpeg";
const AFTER_URL1 =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after1-1754875578651.jpeg";
const BEFORE_URL2 =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before2-1754881944144.jpeg";
const AFTER_URL2 =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after2-1754882098440.jpeg";
const BEFORE_URL3 =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before3-1754882346828.jpeg";
const AFTER_URL3 =
  "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after3-1754882414605.jpeg";

export type Project = {
  id: string;
  url?: string;
  title: string;
  industry?: string;
  impact?: string;
  before?: string;
  after?: string;
};

const FALLBACK: Project[] = [
  {
    id: "support-automation",
    title: "AI Support Automation",
    industry: "SaaS · B2B",
    impact: "↓ 62% response time · 24/7 coverage",
    before: BEFORE_URL,
    after: AFTER_URL1,
  },
  {
    id: "ecommerce-assistant",
    title: "AI Sales Assistant",
    industry: "E-commerce",
    impact: "↑ 31% conversion on product pages",
    before: BEFORE_URL2,
    after: AFTER_URL2,
    url: "https://www.google.com",
  },
  {
    id: "workflow-orchestration",
    title: "Workflow Orchestration",
    industry: "Operations",
    impact: "↓ 48% manual processing time",
    before: BEFORE_URL3,
    after: AFTER_URL3,
    url: "https://www.google.com",
  },
];

export default function FeaturedProjects({
  projects = FALLBACK,
}: {
  projects?: Project[];
}) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion() ?? false;

  const data = projects.length ? projects : FALLBACK;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % data.length);
  }, [data.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + data.length) % data.length);
  }, [data.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 px-0"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 blur-3xl"
        style={{
          background: `
            radial-gradient(40% 60% at 10% 10%, ${BRAND_GOLD}18, transparent 60%),
            radial-gradient(40% 60% at 80% 0%, ${BRAND_BLUE}24, transparent 65%)
          `,
        }}
      />

      {/* 🚀 FULL-WIDTH CONTAINER */}
      <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-20">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full  bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-lg backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Featured</span>
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Real projects.{" "}
              <span className="bg-gradient-to-r from-slate-900 via-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Visible impact.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm md:text-base text-slate-600">
              A snapshot of how WebAIGen turns manual workflows into
              intelligent, AI-driven systems. These examples demonstrate the
              power of custom AI integrations.
            </p>
          </div>

          {/* Mobile controls */}
          <div className="mt-2 flex items-center justify-start gap-2 md:hidden">
            <button
              onClick={prev}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white/80 px-3 py-2 text-slate-800 shadow-md backdrop-blur transition hover:shadow-lg hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={next}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white/80 px-3 py-2 text-slate-800 shadow-md backdrop-blur transition hover:shadow-lg hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="mt-10 hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {data.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              prefersReduced={prefersReduced}
              index={i}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mt-8 md:hidden relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: prefersReduced
                ? "none"
                : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {data.map((p, i) => (
              <div key={p.id} className="min-w-full pr-2">
                <ProjectCard
                  project={p}
                  prefersReduced={prefersReduced}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div className="mt-5 flex justify-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="h-1.5 w-6 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === index ? BRAND_GOLD : "rgba(148,163,184,0.6)",
                  opacity: i === index ? 1 : 0.7,
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA bar */}
        <div
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/80 p-5 md:p-6 backdrop-blur-xl shadow-md"
        >
          <div className="flex items-center gap-3 text-slate-800">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-100">
              <Sparkles className="h-4 w-4" style={{ color: BRAND_GOLD }} />
            </div>

            <p className="text-sm md:text-base">
              Want a similar transformation for your business? Let’s design your
              custom AI system.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-2xl transition bg-slate-900 text-white hover:bg-slate-800"
          >
            Book a consultation
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  prefersReduced,
  index,
}: {
  project: Project;
  prefersReduced: boolean;
  index: number;
}) {
  const [split, setSplit] = useState(55);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const handleId = useId();

  const beforeSrc = project.before || PH;
  const afterSrc = project.after || PH;

  const startDrag = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    );
    setSplit(pct);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: prefersReduced ? 0 : index * 0.06,
      }}
      whileHover={!prefersReduced ? { y: -4 } : undefined}
      className="group relative overflow-hidden rounded-xl bg-white/85 backdrop-blur-xl shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Before/After slider */}
      <div
        ref={sliderRef}
        className="relative aspect-[4/3] select-none touch-none"
        onPointerDown={(e) => startDrag(e.clientX)}
        onPointerMove={(e) => {
          if ((e.buttons & 1) !== 1) return;
          startDrag(e.clientX);
        }}
      >
        {/* Before */}
        <Image
          src={beforeSrc}
          alt={`${project.title} — before`}
          fill
          className="object-cover"
        />

        {/* After */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${split}%` }}
        >
          <Image
            src={afterSrc}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0"
          style={{ left: `calc(${split}% - 1px)` }}
        >
          <div className="h-full w-[2px] bg-white/90 shadow-md" />
        </div>

        {/* Handle */}
        <button
          id={handleId}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-800 bg-white/95 shadow-sm"
          style={{
            left: `calc(${split}% - 0px)`,
          }}
        >
          Drag
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>

      {/* Info */}
      <div className="relative p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {project.title}
        </h3>

        {(project.industry || project.impact) && (
          <p className="mt-1 text-sm text-slate-600">
            {project.industry} • {project.impact}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}
