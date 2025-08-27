

// import ServiceCard from "./components/ServiceCard";

import HeroSection from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";     
import ServicesSection from "./components/Services";

import About from "./components/about";
import Contact from "./components/contact";








export default function Home() {
  return (
    <div className="min-h-screen bg-white">
   

   <HeroSection />
  <FeaturedProjects />
  <ServicesSection
  services={[
    { title: "Kitchen Remodeling",  description: "Cabinetry, countertops, lighting, appliance layout & workflow upgrades.", icon: "🍽️" },
    { title: "Bathroom Remodeling", description: "Custom tile, vanities, walk-in showers, fixtures, waterproofing.",       icon: "🚿" },
    { title: "Basement Finishing",  description: "Code-compliant framing, insulation, flooring, egress, and lighting.",    icon: "🏡" },
    { title: "Room Additions",      description: "Seamless additions that match your home’s structure and style.",         icon: "➕" },
    { title: "Exterior Renovations",description: "Siding, roofing, windows/doors, and outdoor living spaces.",             icon: "🏠" },
    { title: "Handyman Services",   description: "Repairs, maintenance, and punch-list items—done right the first time.",  icon: "🧰" },
  ]}
/>
<About />


<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
    
    {/* Left Content */}
    <div className="max-w-xl text-center md:text-left flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Contact Us.
        <p className="text-lg text-gray-600 leading-relaxed">
        Ready to start your remodeling project? 
        <span className="block mt-1">
          Contact us for a free consultation and estimate.
        </span>
      </p>
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        Ready to start your remodeling project? 
        <span className="block mt-1">
          Contact us for a free consultation and estimate.
        </span>
      </p>
    </div>

    {/* Contact Form */}
    <div className="w-full md:w-[65%] lg:w-[60%] bg-white  rounded-2xl p-6 sm:p-8">
      <Contact />
    </div>
    
  </div>



      {/* Services Section
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in comprehensive remodeling solutions for every room in your home
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* About Section */}
      {/* <section id="about" className="py-20 bg-white">
        <div className=" max-w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Mark Remodeling
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in the remodeling industry, we ve been helping homeowners 
                transform their spaces into beautiful, functional, and comfortable environments.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of skilled craftsmen and designers work together to bring your vision to life, 
                ensuring quality workmanship and attention to detail on every project.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
             <Image src="https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/carpentry-1754927116032.jpg" alt="About Mark Remodeling" width={500} height={500} />
            </div>
          </div>
        </div>
      </section> */}

   

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mark Remodeling</h3>
              <p className="text-gray-400">
                Transforming spaces, creating homes. Professional remodeling services in the Washington, D.C. area.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Kitchen Remodeling</li>
                <li>Bathroom Remodeling</li>
                <li>Basement Finishing</li>
                <li>Room Additions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>(555) 123-4567</p>
                <p>info@markremodeling.com</p>
                <p>Washington, D.C. Metro Area</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mark Remodeling. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
