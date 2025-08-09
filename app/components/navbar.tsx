'use client'

import { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon, SearchIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import SearchBar from './searchbar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: string) => {
    setSearchQuery(e);
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-xl">
      <nav className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        {/* Logo using Lucide Icon */}
        <div className="text-3xl font-semibold hover:text-gray-200 transition-colors flex items-center">
          <HomeIcon className="w-8 h-8 text-orange-400 mr-2" />
          <Link href="/" className="text-2xl font-semibold hover:text-gray-200 transition-colors">ConstructionCo</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105">Home</Link>
          <Link href="/about" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105">About</Link>
          <Link href="/services" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105">Services</Link>
          <Link href="/contact" className="hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-105">Contact</Link>
        </div>

        {/* Search Bar for Desktop
        <div className="hidden md:flex items-center border border-white rounded-full px-4 py-1 space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent text-white focus:outline-none placeholder-white"
          />
          <SearchIcon className="w-5 h-5 text-white" />
        </div> */}

{/* <div className="flex items-center space-x-6">
          <SearchBar onSearch={handleSearchChange} />
        </div> */}
        <div className="flex items-center space-x-6 hidden md:flex">
          <SearchBar onSearch={handleSearchChange as (query: string) => void} />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
{/* Overlay Background */}
<div
          className={`fixed top-0  left-0 w-full h-full  bg-gray-800/30 ${isOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsOpen(false)} // Close on outside click
        ></div>
      {/* Mobile Menu (Right Side Overlay) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-gray-800 to-gray-600 p-6 space-y-4 transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        ref={menuRef}
      >
        

        <div className="text-white text-2xl font-semibold">
          <Link href="/" className="hover:text-orange-400 transition duration-300 ease-in-out">ConstructionCo</Link>
        </div>

        {/* Mobile Menu Links */}
        <div className="space-y-6">
          <Link href="/" className="text-white cursor-pointer block hover:scale-105 transition duration-300 ease-in-out group">
            <span className="flex items-center">
              Home
              <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-2 transition-all duration-300 ml-2">→</span>
            </span>
          </Link>
          <Link href="/about" className="text-white cursor-pointer block hover:scale-105 transition duration-300 ease-in-out group">
            <span className="flex items-center">
              About
              <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-2 transition-all duration-300 ml-2">→</span>
            </span>
          </Link>
          <Link href="/services" className="text-white cursor-pointer block hover:scale-105 transition duration-300 ease-in-out group">
            <span className="flex items-center">
              Services
              <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-2 transition-all duration-300 ml-2">→</span>
            </span>
          </Link>
          <Link href="/contact" className="text-white cursor-pointer block hover:scale-105 transition duration-300 ease-in-out group">
            <span className="flex items-center">
              Contact
              <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-2 transition-all duration-300 ml-2">→</span>
            </span>
          </Link>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="flex items-center border border-white rounded-full px-4 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-transparent text-white focus:outline-none placeholder-white"
          />
          <SearchIcon className="w-5 h-5 text-white" />
          </div> */}

        <div className="flex items-center space-x-6">
          <SearchBar onSearch={handleSearchChange as (query: string) => void} />
        </div>
      </div>
    </header>
  );
}
