'use client'

import Image from 'next/image'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { Phone, ShieldCheck, Star, CheckCircle2 } from 'lucide-react'

function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative min-h-screen pt-24 pb-12 w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background with Mobile-Specific Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_URL}
          alt="Luxury Renovation Craftsmanship"
          fill
          priority
          className="object-cover object-center opacity-60 md:opacity-80 scale-105 select-none"
        />
        {/* Mobile Gradient: Stronger at bottom to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black lg:bg-gradient-to-r lg:from-black lg:via-black/40 lg:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* CONTENT AREA: Center-aligned on mobile, left-aligned on desktop */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl mb-6 md:mb-8"
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-black text-amber-200 uppercase">
              The Gold Standard in MA Construction
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-white leading-[0.9] mb-6">
              Precision <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-slate-400">
                Crafted.
              </span>
            </h1>
            
            <p className="max-w-md mx-auto lg:mx-0 text-base md:text-xl text-slate-300 font-light leading-relaxed mb-10 border-l-0 lg:border-l-2 border-amber-500/50 lg:pl-6">
              Specializing in high-end residential transformations where architectural integrity meets unparalleled luxury.
            </p>
          </motion.div>

          {/* Social Proof & Phone: Stacked on tiny screens, side-by-side on tablets */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-white/70">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-slate-900 flex items-center justify-center shadow-xl">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                   </div>
                 ))}
              </div>
              <div className="text-left">
                  <span className="text-white font-bold text-sm block leading-none">Rated 5.0</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Master Builders</span>
               </div>
            </div>

            <a href="tel:8573467357" className="group flex items-center gap-3 hover:text-white transition-all">
               <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Phone className="w-4 h-4 md:w-5 h-5" />
               </div>
               <span className="text-base md:text-lg font-bold tracking-tight">857-346-7357</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT CONTENT: THE FORM - Optimized for small screen padding */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[480px] relative px-2 md:px-0"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/30 to-blue-600/20 blur-2xl rounded-[2rem] opacity-30" />
          
          <div className="relative bg-[#ffffff] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="bg-[#111] px-6 md:px-8 py-5 flex justify-between items-center border-b border-white/5">
               <div>
                  <h3 className="text-white font-bold text-lg md:text-xl tracking-tight">Project Inquiry</h3>
                  <p className="text-amber-500 text-[9px] uppercase tracking-[0.2em] font-black">Elite Concierge Service</p>
               </div>
               <div className="h-10 w-10 relative">
                  <ShieldCheck className="w-full h-full text-amber-500 opacity-80" />
               </div>
            </div>
            
            {/* MOBILE-STABILIZED IFRAME WRAPPER */}
            <div className="w-full h-[500px] md:h-[580px] lg:h-[620px] overflow-y-auto scrollbar-hide bg-white">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/form/5olFlOgVmZkKBiE3PglC"
                    style={{ width: '100%', height: '100%', minHeight: '800px', border: 'none' }}
                    id="inline-5olFlOgVmZkKBiE3PglC" 
                    title="Project Inquiry Form"
                />
                <Script 
                    src="https://link.msgsndr.com/js/form_embed.js" 
                    strategy="lazyOnload"
                />
            </div>
          </div>

          {/* Badge: Visible on Mobile, but centered and smaller */}
          <div className="mt-6 lg:absolute lg:bottom-8 lg:-right-12 flex items-center justify-center lg:justify-start gap-3 bg-black/80 border border-white/10 p-3 rounded-2xl backdrop-blur-xl mx-auto w-fit">
             <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <div className="text-left">
                <p className="text-[9px] opacity-60 uppercase font-black tracking-tighter">Licensed & Insured</p>
                <p className="text-xs font-bold text-white">MA HIC #213061</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero