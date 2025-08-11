'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, MotionConfig, useMotionValue, useTransform } from 'framer-motion';
import SearchBar from '../components/searchbar';

const services = [
  {
    title: "Kitchen Remodeling",
    description: "Complete kitchen renovations including cabinets, countertops, appliances, and layout redesign.",
    icon: "🍽️",
    details: "Our kitchen remodeling service includes custom cabinetry, premium countertops, modern appliance installation, and expert layout optimization for maximum functionality."
  },
  {
    title: "Bathroom Remodeling",
    description: "Bathroom updates and complete renovations with modern fixtures and finishes.",
    icon: "🚿",
    details: "Transform your bathroom with luxury fixtures, custom tilework, modern vanities, and efficient storage solutions. We handle everything from simple updates to complete renovations."
  },
  {
    title: "Basement Finishing",
    description: "Transform your basement into usable living space with proper insulation and finishing.",
    icon: "🏡",
    details: "Convert your unfinished basement into a comfortable living space with proper insulation, waterproofing, electrical work, flooring, and custom finishes."
  },
  {
    title: "Room Additions",
    description: "Add square footage to your home with professional room additions and expansions.",
    icon: "➕",
    details: "Expand your living space with expertly planned and executed room additions. We handle all aspects from foundation to finishing touches."
  },
  {
    title: "Exterior Renovations",
    description: "Siding, roofing, windows, doors, and outdoor living spaces.",
    icon: "🏠",
    details: "Enhance your home's curb appeal and energy efficiency with comprehensive exterior renovations including siding replacement, roofing, window installation, and outdoor living spaces."
  },
  {
    title: "Handyman Services",
    description: "Small repairs, maintenance, and improvement projects around your home.",
    icon: "🛠️",
    details: "Professional handyman services for all your home maintenance needs, from minor repairs to small improvement projects."
  }
];

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-40, 40], [8, -8]);
  const ry = useTransform(mx, [-40, 40], [-10, 10]);
  const s = useTransform(mx, [-40, 0, 40], [1, 1.01, 1]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 80);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 80);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, scale: s }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const [filteredServices, setFiltered] = useState(services);
  const [q, setQ] = useState('');
  const tags = useMemo(() => ([
    'Kitchen', 'Bathroom', 'Basement', 'Additions', 'Exterior', 'Handyman'
  ]), []);

  const handleSearch = useCallback((query: string) => {
    setQ(query);
    const filtered = services.filter(s =>
      (s.title + s.description + s.details).toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filtered);
  }, []);

  const filterByTag = (t: string) => {
    const filtered = services.filter(s => s.title.toLowerCase().includes(t.toLowerCase()));
    setFiltered(filtered);
    setQ(t);
  };

  return (
    <MotionConfig transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <main className="min-h-screen bg-gray-50 text-black pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden py-20">
          {/* Ambient blobs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(30,58,138,0.35), transparent 70%)' }}
              animate={{ x: [0, 30, -15, 0], y: [0, -20, 25, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-28 -right-16 h-[36rem] w-[36rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(245,158,11,0.38), transparent 70%)' }}
              animate={{ x: [0, -20, 10, 0], y: [0, 16, -14, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="inline-flex items-center rounded-full border border-black/30 bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                Our Services
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Renovations with <span className="text-black">craft</span> & <span className="text-black">precision</span>
              </h1>
              <p className="mt-3 text-lg max-w-3xl mx-auto">
                Discover our comprehensive range of home improvement and renovation services.
              </p>

              {/* Search + meta */}
              {/* <div className="mt-8 max-w-2xl mx-auto">
                <SearchBar onSearch={handleSearch} placeholder="Search services..." />
                <p className="mt-2 text-sm">
                  {q ? `Showing ${filteredServices.length} result${filteredServices.length !== 1 ? 's' : ''} for “${q}”`
                     : `Showing all ${services.length} services`}
                </p>
              </div> */}

              {/* Quick filters */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {tags.map(t => (
                  <button
                    key={t}
                    onClick={() => filterByTag(t)}
                    className="rounded-full cursor-pointer   border border-black/25 bg-black/5 px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-black/10 transition"
                  >
                    {t}
                  </button>
                ))}
                {q && (
                  <button
                    onClick={() => window.location.reload()}
                    className="rounded-full border  cursor-pointer border-black/25 text-white bg-black px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-black/10 transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 cursor-pointer"
          >
            {filteredServices.map((s, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { y: 16, opacity: 0, filter: 'blur(4px)' }, show: { y: 0, opacity: 1, filter: 'blur(0px)' } }}
              >
                <Tilt>
                  <ServiceCard service={s} />
                </Tilt>
              </motion.li>
            ))}
          </motion.ul>

          {/* Bottom CTA */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-white/70 p-6 backdrop-blur-xl shadow md:flex-row"
            style={{ borderColor: 'rgba(30,58,138,0.12)' }}
          >
            <p className="text-sm">
              Not sure where to start? We’ll help you prioritize, plan, and price the perfect scope.
            </p>
            <a href="/contact" className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-amber-600">
              Get a free consultation
            </a>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}

function ServiceCard({ service }: { service: { title: string; description: string; icon: string; details: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
      style={{ borderColor: 'rgba(30,58,138,0.12)' }}
    >
      {/* glow ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-amber-300/50" />

      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-2xl">
        {service.icon}
      </div>

      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="mt-1 text-sm">{service.description}</p>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-gray-100" />

      {/* Expandable details */}
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center cursor-pointer gap-2 text-sm font-semibold hover:text-black"
        aria-expanded={open}
        aria-controls={`details-${service.title}`}
      >
        {open ? 'Hide details' : 'View details'} →
      </button>

      <motion.div
        id={`details-${service.title}`}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-sm leading-relaxed">{service.details}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium">Licensed • Insured • Guaranteed</span>
          <a
            href="/contact"
            className="rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-black shadow transition hover:bg-blue-800"
          >
            Request a quote
          </a>
        </div>
      </motion.div>

      {/* soft hover shadow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl shadow-[0_25px_60px_-20px_rgba(30,58,138,0.25)] opacity-0"
        whileHover={{ opacity: 1 }}
      />
    </div>
  );
}
