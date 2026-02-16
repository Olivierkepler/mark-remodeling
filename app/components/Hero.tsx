'use client'

import Image from 'next/image'
import Script from 'next/script' // Important for the form loader
import { motion } from 'framer-motion'
import { Phone, Mail, ArrowRight, ShieldCheck, Star } from 'lucide-react'

function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex items-center text-white overflow-hidden bg-[#0a0a0a]">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_URL}
          alt="Luxury Construction Craftsmanship"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Content */}
        <div className="flex flex-col text-left max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6 w-fit px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Massachusetts Premium Contractor
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight"
          >
            Building <br />
            <span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-200">
              Legacies.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed font-light"
          >
            Clairvil X Construction redefines luxury living through uncompromising precision and architectural excellence.
          </motion.p>

          <div className="mt-10 flex items-center gap-6">
             <div className="flex flex-col gap-1">
                <span className="text-amber-200 text-xs uppercase tracking-widest font-bold">Direct Line</span>
                <a href="tel:8573467357" className="text-xl font-medium hover:text-amber-200 transition-colors">857-346-7357</a>
             </div>
             <div className="w-[1px] h-10 bg-white/20" />
             <div className="flex flex-col gap-1">
                <span className="text-amber-200 text-xs uppercase tracking-widest font-bold">Email</span>
                <a href="mailto:mhclairvil@gmail.com" className="text-xl font-medium hover:text-amber-200 transition-colors">Contact Us</a>
             </div>
          </div>
        </div>

        {/* Right Content: LeadConnector Embedded Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-[500px] relative"
        >
          {/* Glassmorphism Container for Form */}
          <div className="relative z-10 bg-white/95 rounded-2xl shadow-2xl overflow-hidden p-1 border border-white/20">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="text-gray-900 font-bold text-lg">Request a Private Quote</h3>
                <p className="text-gray-500 text-sm">Fill out the form below to begin your project.</p>
            </div>
            
            <div className="w-full min-h-[550px] lg:min-h-[600px]">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/form/5olFlOgVmZkKBiE3PglC"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                    id="inline-5olFlOgVmZkKBiE3PglC" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Form 4"
                    data-height="990"
                    data-layout-iframe-id="inline-5olFlOgVmZkKBiE3PglC"
                    data-form-id="5olFlOgVmZkKBiE3PglC"
                    title="Form 4"
                />
                <Script 
                    src="https://link.msgsndr.com/js/form_embed.js" 
                    strategy="lazyOnload"
                />
            </div>
          </div>
          
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full -z-10" />
        </motion.div>

      </div>
    </section>
  )
}

export default Hero