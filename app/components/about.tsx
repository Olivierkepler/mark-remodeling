'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, ArrowRight } from "lucide-react";

function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden">
      {/* Subtle Background Text for a high-end "Editorial" look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none -ml-10 -mt-10 text-white">
          Excellence
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* IMAGE SIDE: Asymmetrical Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image Frame */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20">
              <Image
                src="https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/carpentry-1754927116032.jpg"
                alt="Master Craftsmanship"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            {/* Decorative "Float" Element (The Gold Frame) */}
            <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3 border-2 border-amber-500/30 rounded-2xl -z-10" />
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-6 bg-white p-6 rounded-xl shadow-2xl z-30 flex items-center gap-4 border border-amber-200"
            >
              <span className="text-4xl font-black text-black">15+</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Years of</span>
                <span className="text-sm font-bold text-slate-800">Mastery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* TEXT SIDE: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] mb-4"
            >
              Building The Future
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[0.95] mb-8"
            >
              Where <span className="font-black italic">Legacy</span> <br />
              Meets Modern Living.
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-slate-400 font-light text-lg max-w-xl leading-relaxed"
            >
              <p>
                At <span className="text-white font-medium italic">Clairvil X Construction and Services</span>, we believe a home is more than a structure—it is a reflection of its owner’s ambition and taste. 
              </p>
              <p>
                Our philosophy is simple: uncompromising precision. We bridge the gap between architectural vision and tangible reality, employing a disciplined team of master craftsmen dedicated to the art of the renovation.
              </p>
            </motion.div>

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full">
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, label: "Quality Insured", val: "Licensed HIC" },
                { icon: <Award className="w-5 h-5" />, label: "Elite Craft", val: "500+ Projects" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-black">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200/60">{stat.label}</span>
                    <span className="text-white font-bold text-lg">{stat.val}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Link to Contact */}
            <motion.a 
              href="#contact"
              whileHover={{ x: 10 }}
              className="mt-12 group flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs"
            >
              Explore Our Portfolio 
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;