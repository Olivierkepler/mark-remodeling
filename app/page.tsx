"use client";

import React from "react";
import HeroSection from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";     
import ServicesSection from "./components/Services";
import About from "./components/about";
import Contact from "./components/contact";
import ChatEmbed from "./components/chatembed";
import DealsSection from "./components/DealsSection";
import FaQ from "./components/FaQ";

export default function Home() {
  return (
    /**
     * STABILITY LAYER
     * 'flex flex-col' ensures vertical stacking is mathematically perfect.
     * 'selection:bg-amber-100' adds a luxury touch when users highlight text.
     */
    <div className="relative min-h-screen bg-white w-full overflow-x-hidden flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* MAIN CONTENT ORCHESTRATION 
        We use a semantic <main> tag for SEO and accessibility.
      */}
      <main className="flex-grow w-full">
        
        {/* Hero is usually outside the standard padding to allow for 'Full Bleed' visuals */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* CONTENT ARCHITECTURE
          The 'space-y' utility ensures consistent breathing room between large blocks 
          without having to manually adjust margins in every sub-component.
        */}
        <div className="relative z-10 space-y-0 md:space-y-0">
          
          <DealsSection />
          
          <div className="bg-white">
            <FeaturedProjects />
          </div>

          <div className="bg-slate-50/50">
            <ServicesSection />
          </div>

          <About />

          <div className="bg-white py-12">
            <FaQ />
          </div>

          <Contact />
        </div>
      </main>

      {/* FLOATING INTERFACE LAYER 
        'pointer-events-none' on the container ensures the div doesn't block 
        clicks to the content behind it, while 'pointer-events-auto' on the child 
        re-enables interaction for the chat widget.
      */}
      <div className="fixed bottom-0 right-0 p-4 md:p-8 z-50 pointer-events-none">
        <div className="pointer-events-auto transition-transform hover:scale-105 active:scale-95">
          <ChatEmbed />   
        </div> 
      </div> 

    </div>
  );
}