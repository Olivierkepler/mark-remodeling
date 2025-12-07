"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const HERO_URL =
    "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png";

  return (
    <section className="relative w-full  min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* ================= BACKGROUND LAYERS ================= */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85 pointer-events-none" />

        {/* Futuristic Light Sweep */}
        <motion.div
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "130%", opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-[40vw] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Ambient Glows */}
        <div className="absolute bottom-20 right-10 w-[45vw] h-[45vw] bg-[#F59E0B]/25 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-10 w-[35vw] h-[35vw] bg-blue-600/25 blur-[180px] rounded-full pointer-events-none" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 py-36 sm:py-44 md:py-52 w-full max-w-[72rem] mx-auto">

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-8 sm:space-y-12 max-w-4xl"
        >
          {/* HEADLINE */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
              font-extrabold leading-tight tracking-tight drop-shadow-2xl
            "
          >
            Tomorrow’s{" "}
            <span className="text-[#F59E0B]">Construction</span>{" "}
            Begins Today
          </motion.h1>

          {/* SUBHEADLINE */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.95, ease: "easeOut" }}
            className="
              text-base sm:text-lg md:text-xl text-white/90 
              max-w-2xl leading-relaxed drop-shadow
            "
          >
            We combine engineering precision, innovative design, and premium craftsmanship
            to build environments that elevate the way you live and work.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="flex flex-wrap gap-5 pt-6"
          >
            {/* PRIMARY BUTTON */}
            <motion.a
              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 35px rgba(245,158,11,0.55)",
              }}
              whileTap={{ scale: 0.96 }}
              href="#services"
              className="
                bg-gradient-to-r from-[#F59E0B] to-[#d38a07]
                text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 
                rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.35)]
                transition-all duration-300 tracking-wide text-sm sm:text-base
              "
            >
              Explore Services
            </motion.a>

            {/* SECONDARY BUTTON */}
            <motion.a
              whileHover={{
                scale: 1.07,
                backgroundColor: "rgba(255,255,255,0.17)",
              }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="
                px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold
                bg-white/10 backdrop-blur-xl border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                transition-all duration-300 tracking-wide text-sm sm:text-base
              "
            >
              Get a Quote
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING PARTICLES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.18, y: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-1/3 right-1/4 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-white/10 blur-[80px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute bottom-1/4 left-1/3 w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-white/5 blur-[120px] pointer-events-none"
      />
    </section>
  );
}
