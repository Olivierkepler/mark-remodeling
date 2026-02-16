'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './searchbar'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Optimized for white background: Text is always dark for immediate legibility
  const navLinkClass = "relative text-sm font-black uppercase tracking-[0.2em] text-slate-900 hover:text-amber-600 transition-colors duration-300 group"

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // For white pages, we use a subtle border that glows when scrolled
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
        ? 'py-3 bg-white/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b border-slate-100' 
        : 'py-6 bg-white border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* LOGO AREA: Strong black presence */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-12 w-12 bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-xl">
            <img
              src="/images/fulllogo_transparent_nobuffer.png"
              alt="Logo"
              className="object-contain p-1"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black italic tracking-tighter leading-none text-slate-950">
              CLAIRVIL X
            </span>
            <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
              Construction
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV: Static Dark Text */}
        <div className="hidden lg:flex items-center space-x-10">
          {['Home', 'About', 'Services', 'Terms', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              className={navLinkClass}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA SECTION: High-contrast Dark mode UI */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="text-slate-900">
            <SearchBar onSearch={() => {}} />
          </div>
          
          <Link 
            href="tel:8573467357"
            className="flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            Book Inquiry
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-950 hover:bg-slate-50 transition-colors"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* MOBILE DRAWER: Maintains the premium white-space aesthetic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-white z-[110] p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-8 mt-20">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">Site Map</span>
              {['Home', 'About', 'Services', 'Privacy', 'Terms', 'Contact'].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item}
                >
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black italic tracking-tighter text-slate-950 hover:text-amber-600 transition-colors flex items-center justify-between group"
                  >
                    {item}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 pt-10 border-t border-slate-100">
               <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Inquiry</p>
                <Link href="tel:8573467357" className="text-2xl font-black text-slate-950 tracking-tighter">
                  857-346-7357
                </Link>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-950"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}