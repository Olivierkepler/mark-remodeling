"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, ChevronRight, Maximize2 } from "lucide-react";

// Animation Variants for an expensive "drift" feel
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const CONSTRUCTION_PROJECTS = [
  { id: "1", title: "Culinary Masterpiece", location: "Newton, MA", scope: "Full Gut Renovation", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before1-1754881762282.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after1-1754875578651.jpeg" },
  { id: "2", title: "The Spa Suite", location: "Brookline, MA", scope: "Master Bath Expansion", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before2-1754881944144.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after2-1754882098440.jpeg" },
  { id: "3", title: "Legacy Living Room", location: "Wellesley, MA", scope: "Structural Open-Concept", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before3-1754882346828.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after3-1754882414605.jpeg" },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-32 bg-white overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
        >
          <div className="max-w-3xl">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-amber-500"></span>
              <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em]">Selected Works</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-light text-slate-900 tracking-tighter leading-[0.9]">
              The Art of the <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600">
                Turnkey Reveal.
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Dynamic Project Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
        >
          {CONSTRUCTION_PROJECTS.map((p) => (
            <motion.div key={p.id} variants={fadeInUp}>
               <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/10 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-slate-950 p-1 rounded-[2.5rem] overflow-hidden">
            <div className="bg-[#050505] p-10 md:p-16 rounded-[2.4rem] flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-2xl rotate-3">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-black italic tracking-tighter mb-2">Ready to break ground?</h3>
                  <p className="text-slate-400 text-lg font-light tracking-tight max-w-md">
                    Your vision deserves the precision of a master builder. Let's schedule your site visit.
                  </p>
                </div>
              </div>
              <a href="#contact" className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:scale-105 transition-all duration-300">
                Start My Project
                <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const [split, setSplit] = useState(50);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setSplit(Math.max(0, Math.min(100, position)));
  };

  return (
    <div className="group space-y-8">
      {/* Before/After Interaction Area */}
      <div 
        ref={sliderRef}
        className="relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-none border border-slate-100 shadow-2xl"
        onPointerMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* Images */}
        <Image src={project.before} alt="Before" fill className="object-cover" />
        <motion.div 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${split}%` }}
        >
          <div className="absolute inset-0 w-[300%] h-full"> {/* Maintains aspect ratio while clipping */}
            <Image src={project.after} alt="After" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Dynamic Slider Handle */}
        <div className="absolute inset-y-0 z-30 pointer-events-none" style={{ left: `${split}%` }}>
          <div className="h-full w-[2px] bg-white/50 backdrop-blur-md relative">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center gap-1">
               <div className="flex gap-1">
                 <ArrowLeft className="w-2 h-2 text-slate-400" />
                 <ArrowRight className="w-2 h-2 text-slate-400" />
               </div>
            </div>
            {/* Context Labels */}
            <div className={`absolute top-6 right-4 px-3 py-1 bg-black/80 backdrop-blur-md text-[8px] font-black text-white uppercase tracking-widest rounded-md transition-opacity duration-500 ${split > 90 ? 'opacity-0' : 'opacity-100'}`}>After</div>
            <div className={`absolute top-6 left-4 px-3 py-1 bg-white/80 backdrop-blur-md text-[8px] font-black text-slate-900 uppercase tracking-widest rounded-md transition-opacity duration-500 ${split < 10 ? 'opacity-0' : 'opacity-100'}`}>Before</div>
          </div>
        </div>
      </div>

      {/* Project Metadata */}
      <div className="px-2 transition-transform duration-500 group-hover:translate-x-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">{project.scope}</span>
        </div>
        <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">{project.title}</h3>
        <p className="text-sm font-light text-slate-500 mt-2 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
           {project.location}
        </p>
      </div>
    </div>
  );
}