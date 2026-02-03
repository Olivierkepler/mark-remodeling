'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import Minicontact from "../components/minicontact"

function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_URL}
          alt="Construction Team at Work"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/80 via-[#1E3A8A]/60 to-[#F59E0B]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-6 py-32 md:py-48 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex flex-col text-center md:text-left md:max-w-lg">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-tight tracking-tight md:tracking-normal"
          >
            We <span className="text-red-500">live</span> to renovate.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-md md:max-w-lg"
          >
            From concept to completion, we deliver top-tier construction and remodeling services tailored to your vision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6"
          >
            {/* <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-gray-900 font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Start Your Project
              </a>
              <a
                href="#services"
                className="px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition"
              >
                Explore Services
              </a>
            </div> */}

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-white/90 text-sm md:text-base mt-4">
              <a
                href="tel:8573467357"
                className="px-5 py-3  rounded-full bg-red-500 text-white font-medium flex items-center gap-2 border border-white/30 hover:bg-white/20 transition backdrop-blur"
              >
                <Phone className="w-4 h-4" />
                <span>857-346-7357</span>
              </a>
              <a
                href="mailto:mhclairvil@gmail.com"
                className="px-5 py-3 rounded-full bg-white/10 text-white font-medium flex items-center gap-2 border border-white/30 hover:bg-white/20 transition backdrop-blur"
              >
                <Mail className="w-4 h-4" />
                <span>mhclairvil@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Mini Contact Component */}
        <div className="w-full md:w-auto">
          <Minicontact />
        </div>
      </div>
    </section>
  )
}

export default Hero
