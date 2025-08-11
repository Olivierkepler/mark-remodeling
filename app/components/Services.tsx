// app/components/Services.tsx
'use client';

import { motion } from 'framer-motion';

type Service = {
  title: string;
  description: string;
  icon?: string;      // emoji or Tailwind-powered SVG if you prefer
  href?: string;      // optional "Learn more" link
};

const defaultServices: Service[] = [
  { title: 'Kitchen Remodeling',  description: 'Full kitchen renovations: cabinetry, countertops, appliances, lighting, and layout optimization.', icon: '🍽️' },
  { title: 'Bathroom Remodeling', description: 'Modern fixtures, custom tile work, walk-in showers, vanities, and spa-level details.',      icon: '🚿' },
  { title: 'Basement Finishing',  description: 'Turn unused basements into media rooms, guest suites, gyms, or play spaces.',              icon: '🏡' },
  { title: 'Room Additions',      description: 'Add square footage with seamless additions that match your home’s style.',                 icon: '➕' },
  { title: 'Exterior Renovations',description: 'Siding, roofing, doors, windows, and outdoor living spaces built to last.',               icon: '🏠' },
  { title: 'Handyman Services',   description: 'Repairs, maintenance, and small upgrades handled quickly and professionally.',             icon: '🧰' },
];

export default function ServicesSection({ services = defaultServices }: { services?: Service[] }) {
  return (
    <section id="services" className="relative ">
      {/* soft background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 10% 10%, rgba(30,58,138,0.06), transparent 60%), radial-gradient(50% 40% at 90% 20%, rgba(245,158,11,0.08), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-full px-6 lg:px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 border-gray-200">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Renovations that blend <span className="text-amber-500">craft</span> and <span className="text-blue-700">precision</span>
          </h2>
          <p className="mt-4 text-gray-600">
            From concept to completion, we manage every detail so your project finishes on time and on budget.
          </p>
        </div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-12   grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { y: 12, opacity: 0 },
                show:   { y: 0,  opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group relative  overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              style={{ borderColor: 'rgba(30,58,138,0.12)' }}
            >
              {/* accent ring on hover */}
              <div className="pointer-events-none  absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-amber-300/50" />

              {/* icon */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-2xl">
                {s.icon ?? '🔧'}
              </div>

              {/* content */}
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>

              {/* footer/cta */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Licensed • Insured • Guaranteed</span>
                {s.href ? (
                  <a
                    href={s.href}
                    className="text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Learn more →
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Get a quote →
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-white/70 p-5 backdrop-blur-xl shadow md:flex-row"
             style={{ borderColor: 'rgba(30,58,138,0.12)' }}>
          <p className="text-sm text-gray-700">
            Not sure where to start? We’ll help you prioritize, plan, and price the perfect scope.
          </p>
          <a
            href="#contact"
            className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </section>
  );
}
