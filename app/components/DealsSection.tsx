"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, Zap } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function RenovationShowcase() {
  const router = useRouter();

  const slides = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-12 mt-12 mb-20 flex flex-col lg:flex-row gap-6 font-sans">
      
      {/* LEFT BLOCK – THE INTELLIGENT CORE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full lg:w-[65%] bg-[#0A0A0A] rounded-[2rem] md:rounded-[2.5rem] text-white relative overflow-hidden border border-white/5"
      >
        {/* Ambient Glow Background - Adjusted for mobile visibility */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/10 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

        <div className="flex flex-col lg:flex-row h-full">
          {/* CONTENT AREA */}
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Next-Gen Systems</span>
              </div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-amber-500/60">© 2026</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 relative bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-2xl">
                <Image src="/images/robot.png" fill className="p-2 object-contain" alt="Logo" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter">CLAIRVIL X</h2>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-6 uppercase">
              Renovation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                Redefined.
              </span>
            </h1>

            <p className="max-w-md text-slate-400 text-sm md:text-base leading-relaxed mb-10 border-l-2 border-orange-500/30 pl-4 md:pl-6">
              Access contractor-direct logistics, elite material sourcing, and 
              AI-driven project orchestration.
            </p>

            {/* AI COMMAND BUTTON */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/cmd")}
                className="relative group bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-3 transition-all w-full sm:w-auto justify-center"
              >
                <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">Launch AI</span>
              </motion.button>

              <div className="flex flex-col pl-2 sm:pl-0">
                <span className="text-[9px] md:text-[10px] font-black uppercase text-orange-500 tracking-widest">Pricing Model</span>
                <span className="text-white text-xs md:text-sm font-bold">Contractor Direct</span>
              </div>
            </div>
          </div>

          {/* VISUAL SHOWCASE AREA - Dynamic Height for Mobile */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-auto border-t lg:border-t-0 lg:border-l border-white/5">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop={true}
              className="w-full h-full"
            >
              {slides.map((url, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full group">
                    <Image src={url} alt="Slide" fill className="object-cover transition-transform duration-[5000ms] group-hover:scale-110" />
                    {/* Dark gradient to ensure mobile text/elements pop if overlapping */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>

      {/* RIGHT BLOCK – SECONDARY EXPERIENCE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full lg:flex-1 group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 min-h-[350px] md:min-h-[450px]"
      >
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Luxury Interior"
          fill
          className="object-cover opacity-70 grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        <div className="absolute inset-x-6 md:inset-x-8 bottom-8 md:bottom-12 text-white">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-6 md:w-8 bg-orange-500" />
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Curated Design</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
            Elite <br /> Aesthetics
          </h2>

          <button className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-5 md:px-6 py-3 rounded-lg md:rounded-xl hover:bg-white hover:text-black transition-all">
            Explore Portfolio <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl transition-transform"
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        </motion.button>
      </motion.div>
    </div>
  );
}