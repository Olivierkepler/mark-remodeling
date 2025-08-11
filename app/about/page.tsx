'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="relative min-h-screen pt-20 bg-gray-50 overflow-hidden">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
     

        {/* Story + Hero Visual */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          {/* Visual */}
          <motion.div
            initial={{ x: -16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative"
          >
            {/* Gradient frame */}
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-50 to-amber-50" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/pexels-falling4utah-2724749-1754934241769.jpg"
                  alt="Construction team at work"
                  fill
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Overlay caption */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="h-28 bg-gradient-to-t from-black/45 to-transparent rounded-b-[2rem]" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="rounded-xl bg-white/90 px-4 py-2 shadow">
                  <p className="text-xs font-semibold text-gray-800">Active Site • Navy Yard, DC</p>
                  <p className="text-xs text-gray-600">Structural & Interior Buildout</p>
                </div>
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                  On-time • On-budget
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-48 rotate-[-6deg] rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
              <p className="text-xs font-semibold text-gray-900">Licensed • Insured</p>
              <p className="mt-1 text-xs text-gray-600">EPA Lead-Safe Certified</p>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ x: 16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              For nearly three decades, ClairvilX has led with craftsmanship, safety, and transparency.
              What began as a family shop is now a trusted, technology-forward GC delivering complex builds
              across the region.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We coordinate architects, designers, subs, and inspectors through a rigorous, software-driven
              process—so you get predictable schedules, airtight budgets, and finish-level detail.
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
              {[
                ['950+', 'Projects Delivered'],
                ['15', 'Awards Won'],
                ['28+', 'Years in Business'],
                ['100%', 'Licensed & Insured'],
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-blue-700">{num}</div>
                  <div className="mt-1 text-xs font-medium text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values (glass cards) */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Our Values</h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Quality', 'Excellence in every detail, from framing to finishes.', '🏗️'],
              ['Safety', 'Every site exceeds code and industry standards.', '🦺'],
              ['Transparency', 'Clear scopes, tracked changes, honest pricing.', '🔎'],
              ['Sustainability', 'Efficient systems and responsible materials.', '🌿'],
              ['Teamwork', 'Tight coordination across trades delivers speed.', '🤝'],
              ['Warranty', 'Post-project support you can count on.', '🛡️'],
            ].map(([title, desc, icon]) => (
              <li
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-md"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-amber-300/50" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-xl">
                  {icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{desc}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Timeline (process) */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Our Process
          </h3>
          <ol className="relative mx-auto max-w-4xl border-l border-gray-200 pl-6">
            {[
              ['Consult', 'On-site walkthrough, goals, constraints, and budget alignment.'],
              ['Design', 'Partner architects/designers produce plans and selections.'],
              ['Build', 'Permits, schedule, and trade coordination—daily QA and updates.'],
              ['Deliver', 'Punchlist, cleanup, warranty handoff, and photo documentation.'],
            ].map(([step, desc], i) => (
              <li key={step} className="mb-8">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-amber-500 shadow" />
                <h4 className="text-base font-semibold text-gray-900">{i + 1}. {step}</h4>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">Let’s build something exceptional—on time and on budget.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600"
          >
            Contact Us
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
