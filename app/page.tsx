
import Header from "./components/navbar";
import ServiceCard from "./components/ServiceCard";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/navbar";

const services = [
  {
    title: "Kitchen Remodeling",
    description: "Complete kitchen renovations including cabinets, countertops, appliances, and layout redesign.",
    icon: "🏠"
  },
  {
    title: "Bathroom Remodeling",
    description: "Bathroom updates and complete renovations with modern fixtures and finishes.",
    icon: "🚿"
  },
  {
    title: "Basement Finishing",
    description: "Transform your basement into usable living space with proper insulation and finishing.",
    icon: "🏠"
  },
  {
    title: "Room Additions",
    description: "Add square footage to your home with professional room additions and expansions.",
    icon: "➕"
  },
  {
    title: "Exterior Renovations",
    description: "Siding, roofing, windows, doors, and outdoor living spaces.",
    icon: "🏡"
  },
  {
    title: "Handyman Services",
    description: "Small repairs, maintenance, and improvement projects around your home.",
    icon: "🔧"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Space
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional remodeling services to turn your vision into reality. 
              From kitchens and bathrooms to complete home renovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Get Free Quote
              </a>
              <a
                href="#services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400">Project Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-gray-600">
              Ready to start your remodeling project? Contact us for a free consultation and estimate.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-3">📞</span>
                    <span className="text-gray-600">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-3">📧</span>
                    <span className="text-gray-600">info@markremodeling.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-3">📍</span>
                    <span className="text-gray-600">Washington, D.C. Metro Area</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact Form</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
      </footer>
    </div>
  );
}
