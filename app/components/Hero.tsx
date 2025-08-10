'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { Building2, Home, Wrench, Leaf, Landmark } from 'lucide-react'

// Hero section component with background image + gradient overlay
function Hero() {
  return (
    <section className="relative text-white overflow-hidden ">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/before.JPG"  
          alt="Construction Team at Work"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#1E3A8A]/70 to-[#F59E0B]/70 " />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-60 pb-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Building Your <span className="text-[#F59E0B]">Dream</span> Space
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-xl"
          >
            From concept to completion, we deliver top-tier construction and remodeling services tailored to your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <a
              href="#services"
              className="px-6 py-3 rounded-full bg-[#F59E0B] text-white font-semibold shadow-lg hover:bg-[#d98207] transition"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow-lg hover:bg-white/30 transition backdrop-blur"
            >
              Get a Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
