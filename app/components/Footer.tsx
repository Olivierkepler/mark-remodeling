'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Phone,
  ShieldCheck
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden">
      {/* BACKGROUND TECH ELEMENT: Suble grid pattern & radial glow */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* BRAND BLOCK: 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <img src="/images/fulllogo_transparent_nobuffer.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter uppercase">Clairvil X</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extralight leading-tight tracking-tighter">
              Defining the <span className="font-black italic text-amber-500">Gold Standard</span> <br />
              in Massachusetts Construction.
            </h2>

            <div className="flex gap-4">
              {[
                { icon: Facebook, href: 'https://facebook.com/...' },
                { icon: Instagram, href: 'https://instagram.com/...' },
                { icon: Linkedin, href: 'https://linkedin.com/...' },
              ].map((social, i) => (
                <Link key={i} href={social.href} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-black transition-all duration-500">
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS: 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Navigation</h3>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-4">
              {['Home', 'About', 'Services', 'Contact', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-slate-400 hover:text-white flex items-center group transition-colors"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & HQ: 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Headquarters</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">30 Pleasant Street, Floor 2</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Randolph, MA 02368</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">(781) 390-4510</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Mon - Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">info@ClairvilX.com</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Direct Inquiry</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: The Final Proof */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Licensed & Insured: HIC #213061</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              © {currentYear} Clairvil X Construction & Services LLC. <br className="md:hidden" />
              <span className="text-slate-700 ml-2">Engineered for Excellence.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer