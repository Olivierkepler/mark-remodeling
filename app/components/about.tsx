'use client'

import Image from "next/image";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              About <span className="text-blue-600">Mark Remodeling</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 15 years of experience in the remodeling industry, we’ve been helping homeowners
              transform their spaces into beautiful, functional, and comfortable environments.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of skilled craftsmen and designers work together to bring your vision to life, 
              ensuring quality workmanship and attention to detail on every project.
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center bg-blue-50 px-6 py-4 rounded-lg shadow-sm"
              >
                <div className="text-4xl font-bold text-blue-600">500+</div>
                <div className="text-gray-700">Projects Completed</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center bg-yellow-50 px-6 py-4 rounded-lg shadow-sm"
              >
                <div className="text-4xl font-bold text-yellow-600">15+</div>
                <div className="text-gray-700">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg group w-full max-w-md">
              <Image
                src="https://holh1uldewromppp.public.blob.vercel-storage.com/images/hero/carpentry-1754927116032.jpg"
                alt="About Mark Remodeling"
                width={500}
                height={500}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
