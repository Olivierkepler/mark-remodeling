// app/components/Services.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Service = {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  image?: string; // NEW: image field
};

const defaultServices: Service[] = [
  { 
    title: "Kitchen Remodeling",
    description: "Full kitchen transformations with custom cabinetry, luxury materials, light optimization, and contemporary layouts.",
    icon: "🍽️",
    // Use a properly named and placed image. Also, ensure correct Next.js public folder path (no leading /public).
    image: "/images/kitchen.jpeg" // Make sure this file exists in your /public/images/ directory
  },
  { 
    title: "Bathroom Renovations",
    description: "Spa-level upgrades featuring modern fixtures, premium tilework, walk-in showers, and designer finishes.",
    icon: "🚿",
    image: "/images/renovation.jpeg"
  },
  { 
    title: "Basement Finishing",
    description: "Convert unused basements into media rooms, gyms, guest suites, and functional living spaces.",
    icon: "🏡",
    image: "/images/basement.jpg"
  },
  { 
    title: "Room Additions",
    description: "Architecturally seamless home expansions designed to enhance flow, value, and long-term comfort.",
    icon: "➕",
    image: "/images/addition.jpg"
  },
  { 
    title: "Exterior Renovations",
    description: "Premium siding, roofing, doors, windows, and outdoor enhancements built for durability and style.",
    icon: "🏠",
    image: "/images/exterior.jpg"
  },
  { 
    title: "Handyman Services",
    description: "Small repairs and home improvements handled with craftsmanship, speed, and professionalism.",
    icon: "🧰",
    image: "/images/handyman.jpg"
  },
];

export default function ServicesSection({ services = defaultServices }: { services?: Service[] }) {
  return (
    <section id="services" className="relative py-24">
      
      {/* Ambient gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.65]"
        style={{
          background:
            "radial-gradient(55% 45% at 15% 15%, rgba(59,130,246,0.12), transparent 65%), radial-gradient(55% 45% at 85% 10%, rgba(245,158,11,0.14), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 border-gray-300/60 bg-white/50 backdrop-blur">
            Our Services
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
            Renovations built on{" "}
            <span className="bg-gradient-to-r from-amber-500 to-blue-700 bg-clip-text text-transparent">
              craftsmanship
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent">
              precision
            </span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Architectural-quality design meets reliable execution. We manage every detail from planning to completion.
          </p>
        </div>

        {/* Services Grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((s, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="
                group relative rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-xl 
                shadow-sm overflow-hidden transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
              "
            >

              {/* IMAGE AREA */}
              <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy"
                  src={s.image ?? ""}
                  alt={s.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full absolute inset-0"
                  style={{ objectFit: 'cover' }}
                />
                {/* image overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition bg-black" />
              </div>

              {/* Content */}
              <div className="relative p-10">
                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-4xl shadow-inner">
                  {s.icon ?? "🔧"}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-[15px]">
                  {s.description}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-gray-500 tracking-wide">
                    Licensed • Insured • Guaranteed
                  </span>

                  <a
                    href={s.href ?? "#contact"}
                    className="font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    {s.href ? "Learn more →" : "Get a quote →"}
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <div
          className="
            mt-20 flex flex-col md:flex-row items-center justify-between gap-6 
            p-8 rounded-3xl border border-gray-300/50 bg-white/80 backdrop-blur-xl shadow
          "
        >
          <p className="text-gray-700 text-base md:text-lg">
            Not sure where to begin? Our specialists can help you plan, prioritize, and price your renovation.
          </p>

          <a
            href="#contact"
            className="rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </section>
  );
}
