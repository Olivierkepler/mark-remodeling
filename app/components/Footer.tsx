'use client'

import Link from 'next/link'
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">ConstructionCo</h3>
            <p className="text-gray-300">
              Building dreams into reality with quality craftsmanship and dedication to excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Construction Ave</li>
              <li>Building City, BC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@constructionco.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition duration-300">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition duration-300">
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition duration-300">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition duration-300">
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ConstructionCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
