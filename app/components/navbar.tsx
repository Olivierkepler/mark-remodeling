'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home } from 'lucide-react'
import Link from 'next/link'
import SearchBar from './searchbar'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setIsOpen((v) => !v)
  const handleSearchChange = (q: string) => setSearchQuery(q)

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Track desktop vs mobile (md = 768px)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Only apply scroll listener on desktop
  useEffect(() => {
    if (!isDesktop) return
    const update = () => setIsScrolled(window.scrollY > 0)
    update()
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isDesktop])

  const opacityClass = isDesktop ? (isScrolled ? 'opacity-100' : 'opacity-70 ') : 'opacity-100'

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-xl transition-opacity duration-300 ${opacityClass}`}>
      <nav className="max-w-7xl mx-auto p-6 flex items-center justify-between"> 
        {/* Logo */}
        <div className="text-3xl font-semibold hover:text-gray-200 transition-colors flex items-center text-opacity-100">
          <Home className="w-8 h-8 text-orange-400 mr-2" />
          <Link href="/" className="text-2xl font-semibold hover:text-gray-200 transition-colors text-opacity-50">
            ConstructionCo
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105 text-opacity-100">Home</Link>
          <Link href="/about" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105 text-opacity-100">About</Link>
          <Link href="/services" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105 text-opacity-100">Services</Link>
          <Link href="/contact" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105 text-opacity-100">Contact</Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar onSearch={handleSearchChange as (q: string) => void} />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-opacity-100" aria-expanded={isOpen} aria-controls="mobile-menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-50 bg-gray-800/30 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-gray-800 to-gray-600 p-6 space-y-4 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        ref={menuRef}
      >
        <div className="text-white text-2xl font-semibold">
          <Link href="/" className="hover:text-orange-400 transition duration-300 ease-in-out">ConstructionCo</Link>
        </div>

        <div className="space-y-6">
          {[
            ['Home', '/'],
            ['About', '/about'],
            ['Services', '/services'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-white block hover:scale-105 transition duration-300 ease-in-out group">
              <span className="flex items-center">
                {label}
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-2 transition-all duration-300 ml-2">→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar onSearch={handleSearchChange as (q: string) => void} />
        </div>
      </div>
    </header>
  )
}
