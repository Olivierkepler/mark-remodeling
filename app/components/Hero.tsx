'use client'

import Image from 'next/image'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { Phone, ShieldCheck, Star, ArrowRight, CheckCircle2 } from 'lucide-react'

function Hero() {
  const HERO_URL =
    'https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/image-1754873406587.png'

  return (
    <section className="relative min-h-[95vh] pt-30 pb-10 w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_URL}
          alt="Luxury Renovation Craftsmanship"
          fill
          priority
          className="object-cover object-center opacity-80 scale-105 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 lg:py-0 flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 text-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl mb-8"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-200 uppercase">
              The Gold Standard in MA Construction
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-white leading-[0.95] mb-6">
              Precision <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-slate-400">
                Crafted.
              </span>
            </h1>
            
            <p className="max-w-md text-lg md:text-xl text-slate-300/90 font-light leading-relaxed mb-10 border-l-2 border-amber-500/50 pl-6">
              Specializing in high-end residential transformations where architectural integrity meets unparalleled luxury.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 text-white/70">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    {i === 4 ? '5.0' : <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                 </div>
               ))}
               <div className="pl-6 flex flex-col justify-center">
                  <span className="text-white font-bold text-sm leading-none">Rated 5/5 Stars</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Verified Reviews</span>
               </div>
            </div>

            <a href="tel:8573467357" className="group flex items-center gap-4 hover:text-white transition-colors">
               <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Phone className="w-5 h-5" />
               </div>
               <span className="text-lg font-semibold tracking-tight">857-346-7357</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT CONTENT: THE FORM */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-[480px] relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/20 to-blue-500/20 blur-2xl rounded-[2rem] opacity-50" />
          
          <div className="relative bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-[#111] px-8 py-4 flex justify-between items-center">
               <div>
                  <h3 className="text-white font-bold text-xl tracking-tight">Project Inquiry</h3>
                  <p className="text-amber-200/70 text-[10px] uppercase tracking-[0.2em] font-bold">Elite Concierge Service</p>
               </div>
               <img src="/images/fulllogo_transparent_nobuffer.png" alt="Logo" width={60} height={60} className="object-contain" />
            </div>
            
            {/* SCROLLABLE WRAPPER */}
            <div className="w-full h-[580px] lg:h-[620px] overflow-y-auto scrollbar-hide">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/form/5olFlOgVmZkKBiE3PglC"
                    /* Setting height to 1000px forces the parent container to scroll */
                    style={{ width: '100%', height: '1000px', border: 'none' }}
                    id="inline-5olFlOgVmZkKBiE3PglC" 
                    data-layout="{'id':'INLINE'}"
                    data-form-name="Form 4"
                    title="Form 4"
                />
                <Script 
                    src="https://link.msgsndr.com/js/form_embed.js" 
                    strategy="lazyOnload"
                />
            </div>
          </div>

          <div className="absolute bottom-8 -right-20 hidden md:flex items-center gap-3 bg-black border border-white/20 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
             <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div className="pr-4 text-white">
                <p className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">Licensed & Insured</p>
                <p className="text-sm font-bold leading-none">HIC #213061</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero