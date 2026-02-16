'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Maximize, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  Box,
  Compass
} from 'lucide-react';

export default function TechShowcase() {
  // Synchronized Variants to eliminate console errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Structural Grid Background Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header: Reflecting the Brand Philosophy */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 gap-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-14 bg-blue-600" />
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em]">
                Building the Future
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-6xl font-light tracking-tighter text-gray-900 leading-[0.9]"
            >
              Where <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800">Legacy</span> <br />
              Meets Modern Living.
            </motion.h2>
          </div>
          <div className="lg:max-w-md self-end">
             <p className="text-gray-500 font-medium text-sm border-l-2 border-blue-600 pl-6 leading-relaxed italic">
               "At Clairvil X Construction and Services, we believe a home is a reflection of its owner’s ambition and taste. We bridge the gap between architectural vision and tangible reality."
             </p>
          </div>
        </div>

        {/* The Bento-Tech Grid: Uncompromising Precision */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto lg:h-[720px]"
        >
          
          {/* Card 1: Architectural Vision */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')] bg-cover opacity-50 grayscale group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="relative h-full p-12 flex flex-col justify-end">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                 <span className="text-blue-400 text-xs font-bold tracking-widest uppercase text-[10px]">Uncompromising Precision</span>
               </div>
               <h3 className="text-4xl font-bold text-white mb-4 leading-none tracking-tight">Masterful Execution.</h3>
               <p className="text-gray-400 max-w-md font-light leading-relaxed">
                 A disciplined team of master craftsmen dedicated to the art of the renovation, ensuring architectural integrity in every detail.
               </p>
            </div>
          </motion.div>

          {/* Card 2: Precision Metric */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-gray-50 rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black text-gray-900 tracking-tighter italic">Alpha</span>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mt-2">Craftsmanship Grade</p>
              <div className="mt-8 h-[2px] w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb]" 
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Structural Layering */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-blue-600 rounded-[2.5rem] p-10 flex flex-col justify-between text-white shadow-2xl shadow-blue-500/20">
            <div className="flex justify-between items-start">
               <Layers className="w-10 h-10" />
               <ArrowUpRight className="w-6 h-6 opacity-50" />
            </div>
            <div>
               <h4 className="text-2xl font-bold leading-tight tracking-tight italic uppercase text-[16px]">Tangible Reality</h4>
               <p className="text-blue-100 text-sm mt-3 opacity-80 font-light">
                 We bridge the gap between blueprint and the physical world through relentless technical rigour.
               </p>
            </div>
          </motion.div>

          {/* Card 4: Digital Protocol */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden relative group">
            <div className="absolute right-0 bottom-0 p-12 opacity-5 pointer-events-none">
               <Box size={280} className="text-gray-900 rotate-12" />
            </div>
            <div className="p-12 h-full flex flex-col justify-between relative z-10">
               <div className="max-w-md">
                 <div className="flex items-center gap-2 mb-6 text-blue-600">
                   <ShieldCheck size={18} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Disciplined Methodology</span>
                 </div>
                 <h4 className="text-3xl font-bold text-gray-900 mb-4 tracking-tighter italic">The Art of Renovation.</h4>
                 <p className="text-gray-500 text-sm leading-relaxed font-light">
                   Utilizing advanced parametric project management to ensure every scope of work is delivered with mathematical certainty.
                 </p>
               </div>
               <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-4 py-2 rounded-full border border-gray-200 text-[9px] font-bold uppercase tracking-widest text-gray-500">Legacy Built</span>
                  <span className="px-4 py-2 rounded-full border border-gray-200 text-[9px] font-bold uppercase tracking-widest text-gray-500">Modern Living</span>
                  <span className="px-4 py-2 rounded-full border border-gray-200 text-[9px] font-bold uppercase tracking-widest text-gray-500">Precision Grade</span>
               </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}