"use client";
import HeroSection from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";     
import ServicesSection from "./components/Services";
import About from "./components/about";
import Contact from "./components/contact";
import ChatEmbed from "./components/chatembed"
import DealsSection from "./components/DealsSection";
import FaQ from "./components/FaQ";

export default function Home() {
  return (
    /* Adding 'overflow-x-hidden' and 'w-full' here is the "Safety Shield".
      It ensures that even if a component has an animation that starts 
      off-screen, it won't create a horizontal scrollbar on iPhones/Androids.
    */
    <div className="relative min-h-screen bg-white w-full overflow-x-hidden">

      <main className="w-full">
        <HeroSection />
        
        {/* We use a relative container for sections to ensure z-index stability */}
        <div className="relative z-10">
          <DealsSection />
          <FeaturedProjects />
          <ServicesSection />
          <About />
          <FaQ />
          <Contact />
        </div>
      </main>

      {/* Floating Widgets: 
        Ensuring they have a small 'right' offset so they don't 
        touch the very edge of the screen on small devices.
      */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <ChatEmbed />   
      </div> 

    </div>
  );
}