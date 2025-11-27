'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home } from 'lucide-react'
import Link from 'next/link'
import SearchBar from './searchbar'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggle = () => setOpen((v) => !v)

  /* ------------ Close When Clicking Outside ------------ */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  /* ------------ Track Desktop Layout ------------ */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* ------------ Scroll Shadow Effect ------------ */
  useEffect(() => {
    if (!desktop) return
    const update = () => setScrolled(window.scrollY > 0)
    update()

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [desktop])

  const opacity = desktop ? (scrolled ? 'opacity-100' : 'opacity-90') : 'opacity-100'

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <header
      className={`
        sticky top-0 z-50 backdrop-blur-2xl ${opacity}
        bg-white/10 border-b border-white/20
        shadow-lg transition-all duration-300
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Home className="w-8 h-8 text-orange-400 transition-transform group-hover:-translate-y-0.5" />
          <span className="ml-2 text-2xl font-semibold tracking-wide text-white group-hover:text-orange-300 transition-colors">
          Clairvil <span className="text-orange-400">X</span> Construction
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative text-white/90 hover:text-white transition font-medium"
            >
              {label}
              {/* animated underline */}
              <span className="
                absolute left-0 -bottom-1 h-[2px] w-0
                bg-gradient-to-r from-orange-400 to-orange-600
                transition-all duration-300
                group-hover:w-full peer-hover:w-full
                hover:w-full
              " />
            </Link>
          ))}
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex">
          <SearchBar onSearch={() => {}} />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          aria-expanded={open}
          onClick={toggle}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

     {/* Mobile Drawer – Ultra Glassmorphism */}
<div
  ref={menuRef}
  className={`
    fixed top-0 left-0 h-full w-72 z-50 

    /* GLASSMORPHISM MAGIC */
    bg-white/10 backdrop-blur-2xl
    border-r border-white/20
    shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    saturate-150

    /* LAYOUT */
    p-6 flex flex-col space-y-8

    /* SLIDE ANIMATION */
    transform transition-transform duration-300 ease-out
    ${open ? 'translate-x-0' : '-translate-x-full'}
  `}
>
  {/* Drawer logo */}
  <Link
    href="/"
    className="text-xl font-semibold tracking-wide text-white hover:text-orange-400 transition"
    onClick={() => setOpen(false)}
  >
    ClairvilX
  </Link>

  {/* Drawer links */}
  <div className="space-y-6 ">
    {links.map(({ label, href }) => (
      <Link
        key={href}
        href={href}
        onClick={() => setOpen(false)}
        className="text-white text-lg tracking-wide relative group block"
      >
        {label}
        {/* underline animation */}
        <span className="
          absolute left-0 -bottom-1 h-[2px] w-0
          bg-gradient-to-r from-orange-400 to-orange-600
          transition-all duration-300 group-hover:w-3/4
        " />
      </Link>
    ))}
  </div>

  {/* Mobile search */}
  <div className="pt-6 border-t border-white/20">
    <SearchBar onSearch={() => {}} />
  </div>
</div>

    </header>
  )
}
