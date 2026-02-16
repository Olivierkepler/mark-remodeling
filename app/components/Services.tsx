'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Bath, 
  Warehouse, 
  PlusSquare, 
  Home, 
  Wrench, 
  ArrowUpRight,
  Star,
  ArrowRight
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

const defaultServices: Service[] = [
  { title: 'Kitchen Remodeling', tag: 'Culinary Spaces', description: 'Bespoke cabinetry, premium stone surfaces, and layout optimization for the modern chef.', icon: <UtensilsCrossed className="w-6 h-6" /> },
  { title: 'Bathroom Remodeling', tag: 'Private Spas', description: 'Curated tile work, walk-in steam showers, and high-end fixtures for ultimate relaxation.', icon: <Bath className="w-6 h-6" /> },
  { title: 'Basement Finishing', tag: 'Entertainment', description: 'Converting subterranean levels into sophisticated lounges, media rooms, or fitness suites.', icon: <Warehouse className="w-6 h-6" /> },
  { title: 'Room Additions', tag: 'Expansion', description: 'Seamlessly integrated square footage designed to match your home’s original character.', icon: <PlusSquare className="w-6 h-6" /> },
  { title: 'Exterior Renovations', tag: 'Curb Appeal', description: 'Luxury siding, architectural roofing, and outdoor living environments built for longevity.', icon: <Home className="w-6 h-6" /> },
  { title: 'Handyman Services', tag: 'Maintenance', description: 'White-glove repair and maintenance services handled with professional-grade precision.', icon: <Wrench className="w-6 h-6" /> },
];

export default function ServicesSection({ services = defaultServices }: { services?: Service[] }) {
  return (
    <section id="services" className="relative bg-[#050505] py-24 lg:py-32 overflow-hidden">
      {/* Background Architectural Accent */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] block mb-4"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight"
            >
              Mastering the Art of <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-200">
                Structural Luxury.
              </span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-sm text-sm md:text-base font-light leading-relaxed border-l border-white/10 pl-8"
          >
            We don’t just renovate; we restore purpose and elegance to your living environment through disciplined craft.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="group relative bg-[#0a0a0a] p-10 transition-all duration-500 hover:bg-[#111111]"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-white/5 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">{service.tag}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-amber-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  {service.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] uppercase tracking-widest text-white font-medium text-xs">Bespoke Solution</span>
                   <ArrowUpRight className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[2rem] bg-gradient-to-br from-[#111] to-black border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black">
              <Star className="w-6 h-6 fill-black" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-none mb-2 tracking-tight">Ready to elevate your home?</h4>
              <p className="text-slate-400 text-sm">Join over 200+ homeowners who trusted our structural expertise.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="group px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-amber-500 transition-all"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}