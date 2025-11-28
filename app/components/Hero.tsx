'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* ========= BACKGROUND LAYERS ========= */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <Image
          src={HERO_URL}
          alt="Construction Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.65] scale-[1.05]"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        {/* Futuristic Light Sweep */}
        <motion.div
          initial={{ x: '-40%', opacity: 0 }}
          animate={{ x: '130%', opacity: 0.7 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute top-0 left-0 h-full w-[35vw] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl"
        />

        {/* Ambient Glow - Orange */}
        <div className="absolute bottom-10 right-10 w-[40vw] h-[40vw] bg-[#F59E0B]/30 blur-[180px] rounded-full" />

        {/* Ambient Glow - Blue */}
        <div className="absolute top-10 left-10 w-[30vw] h-[30vw] bg-blue-600/30 blur-[160px] rounded-full" />
      </div>

      {/* ========= MAIN CONTENT ========= */}
      <div className="relative z-20 px-6 lg:px-12 py-40 md:py-56 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-3xl space-y-10"
        >

          {/* HEADLINE */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl"
          >
            Tomorrow’s  
            <span className="text-[#F59E0B]"> Construction</span>  
            Begins Today
          </motion.h1>

          {/* SUBHEADLINE */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed"
          >
            We combine engineering precision, innovative design, and premium craftsmanship  
            to build environments that elevate the way you live and work.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="flex flex-wrap gap-5 pt-4"
          >

            {/* PRIMARY: Gold Luxury Button */}
            <motion.a
              whileHover={{ scale: 1.07, boxShadow: '0 0 35px rgba(245,158,11,0.55)' }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="
                bg-gradient-to-r from-[#F59E0B] to-[#d38a07]
                text-white font-semibold px-10 py-4 rounded-full
                shadow-[0_10px_40px_rgba(245,158,11,0.35)]
                transition-all duration-300 tracking-wide
              "
            >
              Explore Services
            </motion.a>

            {/* SECONDARY: Glassmorphism */}
            <motion.a
              whileHover={{ scale: 1.07, backgroundColor: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="
                px-10 py-4 rounded-full font-semibold
                border border-white/20
                bg-white/10 backdrop-blur-xl
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                transition-all duration-300 tracking-wide
              "
            >
              Get a Quote
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ========= FLOATING PARTICLES ========= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.22, y: 0 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/10 blur-[80px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.18, y: 0 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-white/5 blur-[120px]"
      />
    </section>
  )
}
