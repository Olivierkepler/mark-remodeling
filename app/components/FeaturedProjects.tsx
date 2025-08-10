'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Images, Sparkles } from 'lucide-react'

/**
 * FeaturedProjects — Modern before/after portfolio
 * - Grid on desktop, swipeable carousel on mobile
 * - Each card has an interactive Before/After slider (drag or use range input)
 * - Brand palette: steel blue (#1E3A8A) + construction gold (#F59E0B)
 *
 * Usage: <FeaturedProjects projects={PROJECTS} />
 * Replace image paths with your assets in /public.
 */

const BRAND_BLUE = '#1E3A8A'
const BRAND_GOLD = '#F59E0B'

export type Project = {
  id: string
  title: string
  location?: string
  scope?: string
  before: string // /public path
  after: string // /public path
}

const FALLBACK: Project[] = [
  {
    id: 'kitchen-01',
    title: 'Modern Kitchen Remodel',
    location: 'Cambridge, MA',
    scope: 'Cabinetry, counters, lighting',
    before: '/images/afterall.JPG',
    after: '/images/after1.jpg',
  },
  {
    id: 'bath-01',
    title: 'Luxury Bathroom Update',
    location: 'Boston, MA',
    scope: 'Tile, fixtures, walk-in shower',
    before: '/images/before2.jpg',
    after: '/images/after2.jpg',
  },
  {
    id: 'office-01',
    title: 'Office Build-Out',
    location: 'Somerville, MA',
    scope: 'Open concept, glass partitions',
    before: '/images/before4.jpg',
    after: '/images/after4.jpg',
  },
]

export default function FeaturedProjects({ projects = FALLBACK }: { projects?: Project[] }) {
    const [index, setIndex] = useState(0) // mobile carousel index
  
    const next = () => setIndex((i) => (i + 1) % projects.length)
    const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  
    return (
      <section id="projects" className="relative py-16 md:py-24">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl"
          style={{
            background: `radial-gradient(40% 60% at 10% 20%, ${BRAND_GOLD}24, transparent 60%), radial-gradient(40% 60% at 90% 30%, ${BRAND_BLUE}26, transparent 60%)`,
          }}
        />
  
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Heading */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Featured Projects</h2>
              <p className="mt-2 text-gray-600">Before & after transformations that showcase our craftsmanship.</p>
            </div>
  
            {/* Mobile carousel controls */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={prev}
                className="inline-flex items-center justify-center rounded-full border bg-white/80 px-3 py-2 backdrop-blur-xl shadow"
                style={{ borderColor: `${BRAND_BLUE}26` }}
                aria-label="Previous project"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="inline-flex items-center justify-center rounded-full border bg-white/80 px-3 py-2 backdrop-blur-xl shadow"
                style={{ borderColor: `${BRAND_BLUE}26` }}
                aria-label="Next project"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
  
          {/* Grid (desktop) */}
          <div className="mt-10 hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />)
            )}
          </div>
  
          {/* Carousel (mobile) */}
          <div className="mt-8 md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
              {projects.map((p) => (
                <div key={p.id} className="min-w-full pr-2">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
  
            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="h-1.5 w-6 rounded-full transition-all"
                  style={{ backgroundColor: i === index ? BRAND_GOLD : '#e5e7eb' }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
  
          {/* CTA bar */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white/70 p-5 backdrop-blur-xl shadow" style={{ borderColor: `${BRAND_BLUE}26` }}>
            <div className="flex items-center gap-3 text-gray-800">
              <Sparkles style={{ color: BRAND_GOLD }} className="h-5 w-5" />
              <p className="text-sm md:text-base">
                Want to see more transformations? Explore our full portfolio and case studies.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg"
              style={{ background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD}cc)`, color: '#111827' }}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    )
  }
  
  function ProjectCard({ project }: { project: Project }) {
    const [split, setSplit] = useState(55) // percentage visible of AFTER image
  
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-xl shadow-lg"
        style={{ borderColor: `${BRAND_BLUE}26` }}
      >
        {/* Image container */}
        <div className="relative aspect-[4/3]">
          {/* BEFORE (base) */}
          <img src={project.before} alt={`${project.title} — before`} className="absolute inset-0 h-full w-full object-cover" />
  
          {/* AFTER (clipped by split) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${split}%` }}>
            <img src={project.after} alt={`${project.title} — after`} className="h-full w-full object-cover" />
          </div>
  
          {/* Divider handle */}
          <div className="absolute inset-y-0" style={{ left: `calc(${split}% - 1px)` }}>
            <div className="h-full w-[2px] bg-white/70 shadow [--g:${BRAND_GOLD}]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 px-2 py-1 text-[10px] font-semibold text-gray-800 shadow" style={{ borderColor: `${BRAND_BLUE}26` }}>
              Drag
            </div>
          </div>
  
          {/* Range input overlay (invisible track) */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Compare before and after"
            className="absolute inset-0 h-full w-full appearance-none bg-transparent cursor-ew-resize"
          />
        </div>
  
        {/* Info */}
        <div className="relative p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <span className="rounded-full bg-[rgba(245,158,11,0.12)] px-3 py-1 text-xs font-bold" style={{ color: BRAND_GOLD }}>
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
  
        {/* Hover tint */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(180deg, transparent, ${BRAND_BLUE}08)` }} />
      </motion.article>
    )
  }
  