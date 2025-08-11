'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Home, Wrench, Leaf, Landmark } from 'lucide-react'

/** Brand Palette */
const BRAND_BLUE = '#1E3A8A'   // steel blue
const BRAND_GOLD = '#F59E0B'   // construction gold

interface TabContent {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  content: React.ReactNode
}

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
    whileHover={{ y: -4 }}
    className="group relative rounded-2xl border cursor-pointer p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white/75 backdrop-blur-xl"
    style={{ borderColor: `${BRAND_BLUE}26` /* ~15% */ }}
  >
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: `linear-gradient(135deg, ${accent}40 0%, transparent 60%)`,
      }}
    />
    <h3 className="relative text-lg font-semibold tracking-tight text-gray-900">
      {title}
    </h3>
    <p className="relative mt-2 text-sm text-gray-600">{desc}</p>
  </motion.article>
)

const tabs: TabContent[] = [
  {
    title: 'Residential',
    icon: Home,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <Card title="Kitchen Remodeling" desc="Complete kitchen renovations with modern designs" accent={BRAND_GOLD} />
        <Card title="Bathroom Updates" desc="Luxury bathroom renovations and upgrades" accent={BRAND_BLUE} />
        <Card title="Room Additions" desc="Expand your living space professionally" accent={BRAND_GOLD} />
      </div>
    ),
  },
  {
    title: 'Commercial',
    icon: Building2,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <Card title="Office Renovations" desc="Modern office space transformations" accent={BRAND_BLUE} />
        <Card title="Retail Spaces" desc="Custom retail environment design" accent={BRAND_GOLD} />
        <Card title="Restaurant Builds" desc="Specialized restaurant construction" accent={BRAND_BLUE} />
      </div>
    ),
  },
  {
    title: 'Specialty',
    icon: Wrench,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <Card title="Historic Restoration" desc="Careful restoration of historic properties" accent={BRAND_GOLD} />
        <Card title="Green Building" desc="Sustainable construction practices" accent={BRAND_BLUE} />
        <Card title="Custom Design" desc="Unique architectural solutions" accent={BRAND_GOLD} />
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show subnav when scrolling down and past a certain threshold (e.g., 100px)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(true)
        } else {
          // Scrolling up
          setIsVisible(false)
        }
      } else {
        // At the top, hide subnav
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close on ESC + keyboard cycling
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
          className="w-full fixed top-22 left-0 right-0 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Decorative gradient glow (brand-tuned) */}
          <div
            className="pointer-events-none absolute inset-0 mx-auto h-32 -translate-y-6 max-w-5xl opacity-60 blur-3xl"
            style={{
              background: `
                radial-gradient(40% 60% at 50% 40%, ${BRAND_BLUE}2E, transparent 60%),
                radial-gradient(30% 50% at 70% 50%, ${BRAND_GOLD}38, transparent 60%)
              `.trim(),
            }}
          />

          <div className="max-w-7xl mx-auto">
            {/* Hover wrapper: leaving this area closes the panel */}
            <div
              ref={hoverWrapRef}
              className="relative hidden md:block"
              onMouseLeave={() => setActiveTab(null)}
            >
              {/* Desktop nav */}
              <nav
                className="flex items-center justify-center gap-2 rounded-md px-4 py-2 shadow-lg bg-white/70 backdrop-blur-xl border"
                role="tablist"
                aria-label="Service categories"
                style={{ borderColor: `${BRAND_BLUE}26` }}
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
                      className="relative px-5 py-3 text-sm font-medium focus:outline-none cursor-pointer"
                      style={{ color: isActive ? '#111827' : '#374151' }}
                    >
                      <span className="inline-flex items-center gap-2 ">
                        <Icon className="h-4 w-4" />
                        <span className="tracking-wide">{t.title}</span>
                      </span>

                      {/* Brand gold ink underline */}
                      {isActive && (
                        <motion.span
                          layoutId="ink"
                          className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
                          style={{ backgroundColor: BRAND_GOLD }}
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </nav>

              {/* Desktop mega panel */}
              <AnimatePresence>
                {activeTab !== null && (
                  <motion.section
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    className="absolute left-0 right-0 z-30 mt-2 "
                    onMouseEnter={() => setActiveTab(activeTab)}
                  >
                    <div className="mx-auto max-w-7xl">
                      <div
                        className="relative   overflow-hidden rounded-md bg-white/80 backdrop-blur-2xl shadow-2xl border"
                        style={{ borderColor: `${BRAND_BLUE}26` }}
                      >
                        {/* subtle background grid */}
                        <div className="pointer-events-none  absolute inset-0 opacity-[0.04] [background:linear-gradient(to_bottom,transparent_23px,rgba(0,0,0,0.5)_24px),linear-gradient(to_right,transparent_23px,rgba(0,0,0,0.5)_24px)] [background-size:24px_24px]" />
                        {tabs[activeTab].content}
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile trigger */}
            <div className="md:hidden flex justify-center">
              <motion.button
                onClick={() => setDrawerOpen(true)}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-[92%] cursor-pointer rounded-2xl px-4 py-3 text-base font-medium shadow-lg bg-white/75 backdrop-blur-xl border"
                style={{ borderColor: `${BRAND_BLUE}26`, color: '#1f2937' }}
              >
                Explore Services
              </motion.button>
            </div>

            {/* Mobile drawer + backdrop */}
            <AnimatePresence>
              {drawerOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ backgroundColor: '#00000066' }}
                    onClick={() => setDrawerOpen(false)}
                  />
                  <motion.aside
                    className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm bg-white shadow-2xl border-l"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                    style={{ borderColor: `${BRAND_BLUE}26` }}
                  >
                    <div className="relative h-full overflow-y-auto">
                      <div
                        className="sticky top-0 z-10 border-b px-5 py-4 bg-white/90 backdrop-blur-md"
                        style={{ borderColor: `${BRAND_BLUE}26` }}
                      >
                        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                          Browse Services
                        </h2>
                        <p className="text-xs text-gray-500">Tap a category to explore</p>
                      </div>

                      <div className="divide-y" style={{ borderColor: `${BRAND_BLUE}14` }}>
                        {tabs.map((t) => {
                          const Icon = t.icon ?? Leaf
                          return (
                            <details key={t.title} className="group">
                              <summary className="list-none px-5 py-4 flex items-center justify-between cursor-pointer select-none">
                                <span className="inline-flex items-center gap-3 text-[15px] font-medium text-gray-800">
                                  <Icon className="h-4 w-4" />
                                  {t.title}
                                </span>
                                <span
                                  className="text-gray-500 transition-transform group-open:rotate-180"
                                  style={{ color: BRAND_BLUE }}
                                >
                                  ▾
                                </span>
                              </summary>
                              <div className="px-3 pb-4">{t.content}</div>
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
