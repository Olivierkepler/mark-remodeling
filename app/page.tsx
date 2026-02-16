// import ServiceCard from "./components/ServiceCard";
"use client";
import HeroSection from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";     
import ServicesSection from "./components/Services";
import About from "./components/about";
import Contact from "./components/contact";
import ChatEmbed from "./components/chatembed"
// import Chatbot from "./components/Chatbot"; // ✅ NEW
import { services } from "./lib/data";
import DealsSection from "./components/DealsSection";
import FaQ from "./components/FaQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <DealsSection />
      {/* <RenovationAssistant /> */}
      {/* <RoomPhotoAnalyzer /> */}
      <FeaturedProjects />
      <ServicesSection />

      <About />

      <FaQ/>

      {/* ✅ Floating Chatbot Widget */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <Chatbot />
      </div> */}


    <div className="fixed bottom-6 right-6 z-50">
      <ChatEmbed />   
      </div> 


    </div>
  );
}
