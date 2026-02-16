"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// ... (Projects Data remains the same as previous)
const CONSTRUCTION_PROJECTS = [
  { id: "1", title: "Culinary Masterpiece", location: "Newton, MA", scope: "Full Gut Renovation", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before1-1754881762282.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after1-1754875578651.jpeg" },
  { id: "2", title: "The Spa Suite", location: "Brookline, MA", scope: "Master Bath Expansion", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before2-1754881944144.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after2-1754882098440.jpeg" },
  { id: "3", title: "Legacy Living Room", location: "Wellesley, MA", scope: "Structural Open-Concept", before: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/before3-1754882346828.jpeg", after: "https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/after3-1754882414605.jpeg" },
];

export default function FeaturedProjects() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % CONSTRUCTION_PROJECTS.length);
  const prev = () => setIndex((i) => (i - 1 + CONSTRUCTION_PROJECTS.length) % CONSTRUCTION_PROJECTS.length);

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        
        {/* Header with Scroll Reveal */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <motion.span variants={fadeInUp} className="text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
              The Portfolio
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-light text-slate-900 tracking-tighter leading-none">
              Witness the <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-amber-600">
                Transformation.
              </span>
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <button onClick={prev} className="p-4 rounded-full border border-gray-200 hover:bg-slate-900 hover:text-white transition-all">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="p-4 rounded-full border border-gray-200 hover:bg-slate-900 hover:text-white transition-all">
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Project Grid with Staggered Reveal */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CONSTRUCTION_PROJECTS.map((p, i) => (
            <motion.div key={p.id} variants={fadeInUp}>
               <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA with subtle pop-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-[2rem]"
        >
          <div className="bg-white p-8 rounded-[1.9rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-slate-900 font-bold text-lg tracking-tight">
                Ready for your transformation? <span className="text-slate-400 font-light">Let's build your future.</span>
              </p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-600 transition-all">
              Book Consultation
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ProjectCard component remains mostly the same, ensuring it's a "clean" sub-component.
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
    <div className="group">
      <div 
        ref={sliderRef}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-ew-resize border border-gray-100 shadow-lg"
        onPointerMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onPointerDown={(e) => handleMove(e.clientX)}
      >
        <Image src={project.before} alt="Before" fill className="object-cover" />
        <motion.div 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${split}%`, borderRight: '2px solid white' }}
        >
          <Image src={project.after} alt="After" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-y-0 z-20 pointer-events-none" style={{ left: `${split}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center" />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-black text-slate-900 italic uppercase">{project.title}</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mt-1">{project.location} • {project.scope}</p>
      </div>
    </div>
  );
}