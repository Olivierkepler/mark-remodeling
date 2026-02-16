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
            <h3 className="text-xl font-semibold mb-4">Clairvil X Construction and Services LLC</h3>
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

              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-orange-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>30 Pleasant Street, Floor 2</li>
              <li>Randolph, MA 02368</li>
              <li>Phone: (781) 390-4510</li>
              <li>Email: info@ClairvilX.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-5">
  {[
    { id: 'fb', icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?id=61580135264497' },
    { id: 'ig', icon: InstagramIcon, href: 'https://www.instagram.com/clairvil_x_construction/' },
    { id: 'li', icon: LinkedinIcon, href: 'https://www.linkedin.com/company/109205116/admin/dashboard/' },
  ].map((social) => (
    <a
      key={social.id}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-amber-500 transition-all duration-300 hover:-translate-y-1"
      aria-label={`Visit Clairvil X on ${social.id}`}
    >
      <social.icon className="w-6 h-6" />
    </a>
  ))}
</div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Clairvil X Construction and Services LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
