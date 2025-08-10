'use client'

import { useState, useCallback } from 'react'
import SearchBar from '../components/searchbar'

const services = [
  {
    title: "Kitchen Remodeling",
    description: "Complete kitchen renovations including cabinets, countertops, appliances, and layout redesign.",
    icon: "🏠",
    details: "Our kitchen remodeling service includes custom cabinetry, premium countertops, modern appliance installation, and expert layout optimization for maximum functionality."
  },
  {
    title: "Bathroom Remodeling", 
    description: "Bathroom updates and complete renovations with modern fixtures and finishes.",
    icon: "🚿",
    details: "Transform your bathroom with luxury fixtures, custom tilework, modern vanities, and efficient storage solutions. We handle everything from simple updates to complete renovations."
  },
  {
    title: "Basement Finishing",
    description: "Transform your basement into usable living space with proper insulation and finishing.",
    icon: "🏠",
    details: "Convert your unfinished basement into a comfortable living space with proper insulation, waterproofing, electrical work, flooring, and custom finishes."
  },
  {
    title: "Room Additions",
    description: "Add square footage to your home with professional room additions and expansions.",
    icon: "➕",
    details: "Expand your living space with expertly planned and executed room additions. We handle all aspects from foundation to finishing touches."
  },
  {
    title: "Exterior Renovations",
    description: "Siding, roofing, windows, doors, and outdoor living spaces.",
    icon: "🏡",
    details: "Enhance your home's curb appeal and energy efficiency with comprehensive exterior renovations including siding replacement, roofing, window installation, and outdoor living spaces."
  },
  {
    title: "Handyman Services",
    description: "Small repairs, maintenance, and improvement projects around your home.",
    icon: "🔧",
    details: "Professional handyman services for all your home maintenance needs, from minor repairs to small improvement projects."
  }
];

export default function ServicesPage() {
  const [filteredServices, setFilteredServices] = useState(services);

  const handleSearch = useCallback((query: string) => {
    const filtered = services.filter(service => 
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover our comprehensive range of home improvement and renovation services
            </p>
            <SearchBar onSearch={handleSearch} placeholder="Search services..." />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">{service.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8">Contact us today for a free consultation</p>
          <a 
            href="/contact" 
            className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Free Quote
          </a>
        </div>
      </section>
    </main>
  );
}
