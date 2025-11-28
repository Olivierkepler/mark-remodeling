'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Home, Wrench, Leaf, Landmark } from 'lucide-react'

const BRAND_BLUE = '#1E3A8A'
const BRAND_GOLD = '#F59E0B'

const Card = ({
  title,
  desc,
  accent = BRAND_GOLD,
}: {
  title: string
  desc: string
  accent?: string
}) => (
  <motion.article
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    className="
      group relative cursor-pointer p-6 rounded-2xl
      bg-white/75 backdrop-blur-2xl shadow-xl border
      hover:shadow-2xl transition-shadow
    "
    style={{ borderColor: `${BRAND_BLUE}2b` }}
  >
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: `linear-gradient(135deg, ${accent}44 0%, transparent 60%)`,
      }}
    />
    <div className="relative space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </motion.article>
)

const tabs = [
  {
    title: 'Residential',
    badge: 'Homes & Living',
    icon: Home,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 lg:p-10">
        <Card title="Kitchen Remodeling" desc="Modern kitchens with premium finishes and efficient layouts." />
        <Card title="Luxury Bathrooms" desc="Spa-like retreats with custom tiling and fixtures." accent={BRAND_BLUE} />
        <Card title="Room Additions" desc="Seamless expansions that feel like part of the original design." />
      </div>
    ),
  },
  {
    title: 'Commercial',
    badge: 'Business Spaces',
    icon: Building2,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 lg:p-10">
        <Card title="Office Environments" desc="High-performance workspaces that inspire focus and collaboration." accent={BRAND_BLUE} />
        <Card title="Retail Concepts" desc="Experience-driven retail spaces tailored to your brand." />
        <Card title="Hospitality & Dining" desc="Restaurants and lounges with architectural presence." accent={BRAND_BLUE} />
      </div>
    ),
  },
  {
    title: 'Specialty',
    badge: 'Craft & Detail',
    icon: Wrench,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 lg:p-10">
        <Card title="Historic Restoration" desc="Respectful restorations that preserve character and integrity." />
        <Card title="Sustainable Builds" desc="Energy-conscious designs using modern green standards." accent={BRAND_BLUE} />
        <Card title="Bespoke Projects" desc="One-of-a-kind constructions built around your vision." />
      </div>
    ),
  },
]

export default function SubNav() {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const hoverWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y > 160 && y > lastScrollY) {
        setIsVisible(true)
      } else if (y < 120 || y < lastScrollY) {
        setIsVisible(false)
      }
      setLastScrollY(y)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTab(null)
        setDrawerOpen(false)
      }
      if (activeTab !== null && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault()
        setActiveTab((prev) => {
          if (prev === null) return 0
          const next = e.key === 'ArrowRight' ? prev + 1 : prev - 1
          return (next + tabs.length) % tabs.length
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeTab])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-0 right-0 z-30 top-20"
          initial={{ y: -90, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -90, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 mx-auto h-44 -translate-y-10 max-w-5xl opacity-80 blur-[80px]"
            style={{
              background: `
                radial-gradient(circle at 20% 0%, ${BRAND_BLUE}33, transparent 60%),
                radial-gradient(circle at 80% 120%, ${BRAND_GOLD}33, transparent 60%)
              `,
            }}
          />

          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            {/* Desktop */}
            <div
              ref={hoverWrapRef}
              className="relative hidden md:block"
              onMouseLeave={() => setActiveTab(null)}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Our Capabilities
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-500/60 via-slate-500/20 to-transparent" />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(15,23,42,0.25)]" />

                <nav
                  role="tablist"
                  aria-label="Service categories"
                  className="
                    relative z-10 flex items-center justify-center gap-2
                    rounded-2xl px-4 py-3
                    bg-white/70 backdrop-blur-2xl shadow-xl border
                  "
                  style={{ borderColor: `${BRAND_BLUE}3d` }}
                >
                  {tabs.map((t, i) => {
                    const Icon = t.icon ?? Landmark
                    const isActive = activeTab === i
                    return (
                      <motion.button
                        key={t.title}
                        role="tab"
                        aria-selected={isActive}
                        onMouseEnter={() => setActiveTab(i)}
                        onFocus={() => setActiveTab(i)}
                        onClick={() => setActiveTab(i)}
                        className={`
                          relative px-6 py-3 text-sm font-medium cursor-pointer select-none
                          rounded-xl transition-all duration-200
                          ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-800'}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              inline-flex h-7 w-7 items-center justify-center rounded-full text-[0.7rem]
                              ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}
                            `}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="tracking-wide">{t.title}</span>
                        </div>

                        {isActive && (
                          <motion.span
                            layoutId="tabHighlight"
                            className="absolute inset-0 rounded-xl -z-10 bg-white/70 shadow-[0_10px_40px_rgba(15,23,42,0.18)]"
                            transition={{ type: 'spring', stiffness: 420, damping: 35 }}
                          />
                        )}

                        {isActive && (
                          <motion.span
                            layoutId="tabInk"
                            className="absolute left-5 right-5 -bottom-1 h-[3px] rounded-full"
                            style={{ background: `linear-gradient(90deg, ${BRAND_GOLD}, #fbbf24)` }}
                            transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </nav>
              </div>

              {/* Mega panel */}
              <AnimatePresence>
                {activeTab !== null && (
                  <motion.section
                    key={activeTab}
                    initial={{ opacity: 0, y: -6, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    role="tabpanel"
                    aria-label={tabs[activeTab].title}
                    className="absolute left-0 right-0 z-20 mt-3"
                    onMouseEnter={() => setActiveTab(activeTab)}
                  >
                    <div className="mx-auto max-w-7xl">
                      <div
                        className="
                          relative overflow-hidden rounded-2xl
                          bg-white/85 backdrop-blur-2xl border shadow-2xl
                        "
                        style={{ borderColor: `${BRAND_BLUE}30` }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
                          style={{
                            background: `
                              radial-gradient(circle at 0% 0%, ${BRAND_BLUE}22, transparent 55%),
                              radial-gradient(circle at 100% 100%, ${BRAND_GOLD}22, transparent 55%)
                            `,
                          }}
                        />
                        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:linear-gradient(to_bottom,transparent_23px,rgba(15,23,42,0.75)_24px),linear-gradient(to_right,transparent_23px,rgba(15,23,42,0.75)_24px)] [background-size:26px_26px]" />

                        <div className="relative flex items-center justify-between px-8 pt-6 pb-3">
                          <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              {tabs[activeTab].badge}
                            </p>
                            <h2 className="text-base font-semibold text-slate-900">
                              {tabs[activeTab].title} Construction Services
                            </h2>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            <span>Active category</span>
                          </div>
                        </div>

                        <div className="relative mx-8 mb-1 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

                        <div className="relative">{tabs[activeTab].content}</div>
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center gap-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
                Services
              </span>
              <motion.button
                onClick={() => setDrawerOpen(true)}
                whileTap={{ scale: 0.96 }}
                className="
                  mt-1 w-[92%] rounded-2xl px-4 py-3 font-medium text-sm
                  bg-white/75 backdrop-blur-xl shadow-lg border
                "
                style={{ borderColor: `${BRAND_BLUE}2b`, color: '#111827' }}
              >
                Explore Services
              </motion.button>
            </div>

            <AnimatePresence>
              {drawerOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40 backdrop-blur-[3px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ backgroundColor: '#020617aa' }}
                    onClick={() => setDrawerOpen(false)}
                  />
                  <motion.aside
                    className="
                      fixed left-0 top-0 z-50 h-full w-[88%] max-w-sm
                      bg-white/92 backdrop-blur-2xl shadow-2xl border-r
                      rounded-r-2xl
                    "
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                    style={{ borderColor: `${BRAND_BLUE}30` }}
                  >
                    <div className="relative h-full overflow-y-auto">
                      <div
                        className="sticky top-0 z-20 px-6 py-4 bg-white/92 backdrop-blur-2xl border-b"
                        style={{ borderColor: `${BRAND_BLUE}26` }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                          Services
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-900">
                          Browse Categories
                        </h2>
                        <p className="text-xs text-slate-500">
                          Tap a category to see what we build.
                        </p>
                      </div>

                      <div className="divide-y" style={{ borderColor: `${BRAND_BLUE}14` }}>
                        {tabs.map((t) => {
                          const Icon = t.icon ?? Leaf
                          return (
                            <details key={t.title} className="group">
                              <summary className="list-none px-6 py-4 flex items-center justify-between cursor-pointer">
                                <span className="inline-flex items-center gap-3 text-[15px] font-medium text-gray-900">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span>
                                    {t.title}
                                    <span className="block text-[11px] font-normal text-slate-500">
                                      {t.badge}
                                    </span>
                                  </span>
                                </span>
                                <span
                                  className="text-slate-500 transition-transform group-open:rotate-180"
                                  style={{ color: BRAND_BLUE }}
                                >
                                  ▾
                                </span>
                              </summary>
                              <div className="px-4 pb-4">{t.content}</div>
                            </details>
                          )
                        })}
                      </div>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
