// import ServiceCard from "./components/ServiceCard";
"use client";
import HeroSection from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";     
import ServicesSection from "./components/Services";
import About from "./components/about";
import Contact from "./components/contact";
// import Chatbot from "./components/Chatbot"; // ✅ NEW
import { services } from "./lib/data";
import DealsSection from "./components/DealsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <DealsSection />
      {/* <RenovationAssistant /> */}
      {/* <RoomPhotoAnalyzer /> */}
      <FeaturedProjects />
      <ServicesSection services={services} />

      <About />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ready to start your remodeling project? 
            <span className="block mt-1">
              Contact us for a free consultation and estimate.
            </span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-[65%] lg:w-[60%] bg-white rounded-2xl p-6 sm:p-8">
          <Contact />
        </div>
      </div>

      {/* ✅ Floating Chatbot Widget */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <Chatbot />
      </div> */}

    </div>
  );
}
