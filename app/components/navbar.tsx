"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Home } from "lucide-react";
import Link from "next/link";
import SearchBar from "./searchbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => setOpen((v) => !v);

  /* ---------------------------------------------------- */
  /* Close Drawer When Clicking Outside                   */
  /* ---------------------------------------------------- */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------------------------------------------- */
  /* Detect Desktop / Mobile                              */
  /* ---------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();

    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* ---------------------------------------------------- */
  /* Scroll Shadow Transition                             */
  /* ---------------------------------------------------- */
  useEffect(() => {
    if (!desktop) return;

    const update = () => setScrolled(window.scrollY > 10);

    update();
    const onScroll = () => requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [desktop]);

  const opacity = desktop ? (scrolled ? "opacity-100" : "opacity-95") : "opacity-100";

  /* ---------------------------------------------------- */
  /* Menu Links                                            */
  /* ---------------------------------------------------- */
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50 ${opacity}
        backdrop-blur-2xl 
        bg-white/10 border-b border-white/20
        transition-all duration-300
        ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.25)]" : ""}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ---------------------------------------------------- */}
        {/* BRAND / LOGO                                         */}
        {/* ---------------------------------------------------- */}
        <Link href="/" className="flex items-center group select-none">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Home className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(255,150,50,0.5)]" />
          </motion.div>

          <span className="ml-2 text-xl sm:text-2xl font-semibold tracking-wide text-white group-hover:text-orange-300 transition-colors">
            Clairvil <span className="text-orange-400">X</span> Construction
          </span>
        </Link>

        {/* ---------------------------------------------------- */}
        {/* DESKTOP NAVIGATION                                   */}
        {/* ---------------------------------------------------- */}
        <div className="hidden md:flex space-x-10">
          {links.map(({ label, href }) => (
            <motion.div
              key={href}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 260 }}
            >
              <Link
                href={href}
                className="relative text-white/90 hover:text-white transition font-medium group"
              >
                {label}

                {/* Modern Underline */}
                <span
                  className="
                    absolute left-0 -bottom-1 h-[2px] w-0
                    bg-gradient-to-r from-orange-400 to-orange-600
                    transition-all duration-300 group-hover:w-full 
                  "
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex">
          <SearchBar onSearch={() => {}} />
        </div>

        {/* ---------------------------------------------------- */}
        {/* MOBILE TOGGLE                                        */}
        {/* ---------------------------------------------------- */}
        <button
          className="md:hidden text-white"
          aria-expanded={open}
          onClick={toggle}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* ---------------------------------------------------- */}
      {/* MOBILE OVERLAY                                        */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* MOBILE DRAWER (GLASS, ANIMATED, PREMIUM)              */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="
              fixed top-0 left-0 h-full w-72 z-50
              p-6 flex flex-col space-y-8
              bg-white/10 backdrop-blur-2xl border-r border-white/20
              shadow-[0_8px_40px_rgba(0,0,0,0.45)] saturate-150
            "
          >
            {/* Drawer Logo */}
            <Link
              href="/"
              className="text-xl font-semibold tracking-wide text-white hover:text-orange-400 transition"
              onClick={() => setOpen(false)}
            >
              ClairvilX
            </Link>

            {/* Drawer Links */}
            <div className="space-y-6">
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white text-lg tracking-wide relative group block"
                >
                  {label}

                  <span
                    className="
                      absolute left-0 -bottom-1 h-[2px] w-0
                      bg-gradient-to-r from-orange-400 to-orange-600
                      transition-all duration-300 group-hover:w-3/4
                    "
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="pt-6 border-t border-white/20">
              <SearchBar onSearch={() => {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
