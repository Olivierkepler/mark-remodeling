'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white flex items-center justify-center">

      {/* --- Background Image + Cinematic Effects --- */}
      <div className="absolute inset-0">
        <Image
          src={HERO_URL}
          alt="Construction Team"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 brightness-90"
        />

        {/* Vignette for cinematic depth */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Directional gradient for dramatic lighting */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />

        {/* Glassy orange atmospheric glow */}
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[#F59E0B]/20 blur-[130px]" />
      </div>

      {/* --- Content Container --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-40 md:py-60">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="flex flex-col max-w-3xl space-y-8"
        >

          {/* Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="
              text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight
              tracking-tight text-white drop-shadow-xl
            "
          >
            Crafting the Spaces  
            <span className="text-[#F59E0B]"> That Define You</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="
              text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed
            "
          >
            Premium construction, remodeling, and custom design services—
            delivering craftsmanship that blends innovation, precision, and lasting beauty.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 mt-4"
          >
            {/* Primary CTA */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              className="
                px-8 py-4 rounded-full font-semibold text-white
                bg-gradient-to-r from-[#F59E0B] to-[#d88b07]
                shadow-[0_10px_25px_rgba(245,158,11,0.35)]
                transition-all duration-300
              "
            >
              Explore Services
            </motion.a>

            {/* Secondary CTA with Glassmorphism */}
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="
                px-8 py-4 rounded-full font-semibold text-white
                bg-white/10 backdrop-blur-lg border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.2)]
                transition-all duration-300
              "
            >
              Get a Quote
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Floating Particles / Motion Elements --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute top-1/4 right-1/3 w-48 h-48 bg-white/10 rounded-full blur-[100px]"
      />
    </section>
  )
}
