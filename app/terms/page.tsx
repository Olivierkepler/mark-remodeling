'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Lock, 
  CreditCard, 
  Copyright, 
  AlertCircle, 
  UserCheck, 
  RefreshCw, 
  MapPin 
} from 'lucide-react';

export default function TermsOfService() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Document Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-gray-100 pb-12 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em]">Legal Framework</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-6">
            Terms of <span className="font-black italic">Service</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-widest text-xs uppercase">
            Effective Date: <span className="text-slate-900">January 1, 2026</span>
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* 1. Agreement */}
          <motion.section variants={sectionVariants} className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck size={20} />
                </div>
                <div className="w-px h-full bg-gray-100 my-4" />
              </div>
              <div>
                <h2 className="text-xl font-black italic uppercase tracking-tight mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-600 leading-relaxed font-light">
                  By accessing this website (<span className="font-medium text-blue-900">www.clairvilx.com</span>), requesting a quote, booking an appointment, or using services provided by <span className="font-bold">Clairvil X Construction and Services</span> (“Company,” “we,” “our,” or “us”), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 2. Services */}
          <motion.section variants={sectionVariants} className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <FileText size={20} />
                </div>
                <div className="w-px h-full bg-gray-100 my-4" />
              </div>
              <div>
                <h2 className="text-xl font-black italic uppercase tracking-tight mb-4">2. Services Provided</h2>
                <p className="text-slate-600 leading-relaxed font-light mb-4">
                  Clairvil X Construction provides residential and commercial renovation services, including but not limited to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 font-medium text-slate-800 text-sm">
                  {['Kitchen remodeling', 'Bathroom remodeling', 'Basement renovations', 'General construction services', 'Repair and installation services'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 italic text-sm">All project details, pricing, and timelines are outlined in written proposals or contracts.</p>
              </div>
            </div>
          </motion.section>

          {/* 3. SMS Messaging - Complex Section */}
          <motion.section variants={sectionVariants} className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <MessageSquare className="text-amber-500" />
              <h2 className="text-2xl font-black italic uppercase tracking-tight">3. SMS & Mobile Messaging Terms</h2>
            </div>
            <div className="space-y-8 font-light text-slate-600 leading-relaxed">
              <p>By providing your mobile phone number, you expressly consent to receive text messages from Clairvil X Construction and Services.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-3">A. Use Cases</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Appointment confirmations</li>
                    <li>• Project scheduling updates</li>
                    <li>• On-site arrival notifications</li>
                    <li>• Billing & Customer service</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-3">B. Rates</h4>
                  <p className="text-sm">Message and data rates may apply based on your carrier plan.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2">C. Opt-Out & Support</h4>
                <p className="text-sm mb-4">Reply <span className="font-bold text-slate-900">STOP</span> to opt out. Reply <span className="font-bold text-slate-900">HELP</span> for assistance.</p>
                <div className="text-xs text-slate-400">D. Carriers are not liable for delayed or undelivered messages.</div>
              </div>
            </div>
          </motion.section>

          {/* 4 - 9 Simple Rows */}
          {[
            { id: 4, icon: <Lock />, title: " Privacy Policy", text: "Your use of our services is also governed by our Privacy Policy, available at www.clairvilx.com/privacy-policy." },
            { id: 5, icon: <CreditCard />, title: " Payment Terms", text: "Payment schedules, deposits, and final payments are outlined in your project contract. Failure to make payments as agreed may result in suspension of services." },
            { id: 6, icon: <Copyright />, title: " Intellectual Property", text: "All website content, logos, branding, images, and materials are the property of Clairvil X Construction and may not be used without written permission." },
            { id: 7, icon: <AlertCircle />, title: " Limitation of Liability", text: "Clairvil X Construction shall not be liable for indirect, incidental, or consequential damages arising from use of our website or services beyond the scope permitted by law." },
            { id: 8, icon: <UserCheck />, title: " Age Restriction", text: "Our services and website are intended for individuals 18 years of age or older." },
            { id: 9, icon: <RefreshCw />, title: " Changes to Terms", text: "We reserve the right to modify these Terms at any time. Updates will be posted on this page with a revised Effective Date." },
          ].map((item) => (
            <motion.section key={item.id} variants={sectionVariants} className="border-t border-gray-50 pt-10">
              <div className="flex items-start gap-6">
                <div className="text-slate-300 group-hover:text-amber-500 transition-colors">{item.icon}</div>
                <div>
                  <h2 className="text-lg font-black italic uppercase tracking-tight mb-2">{item.id}. {item.title}</h2>
                  <p className="text-slate-500 font-light leading-relaxed">{item.text}</p>
                </div>
              </div>
            </motion.section>
          ))}

          {/* 10. Contact Information */}
          <motion.section variants={sectionVariants} className="pt-16 border-t-2 border-slate-900">
            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="max-w-xs">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">10. Contact <br/> Information</h2>
                <MapPin className="text-amber-500 mb-2" />
                <address className="not-italic text-slate-500 font-light leading-relaxed">
                  Clairvil X Construction and Services<br />
                  30 Pleasant St<br />
                  Randolph, MA 02368
                </address>
              </div>
              <div className="flex flex-col justify-end gap-2">
                <a href="tel:+17813904510" className="text-xl font-bold text-slate-900 hover:text-amber-600 transition-colors">+1 (781) 390-4510</a>
                <a href="tel:+13392081602" className="text-xl font-bold text-slate-900 hover:text-amber-600 transition-colors">+1 (339) 208-1602</a>
                <a href="mailto:info@clairvilx.com" className="text-amber-600 font-black uppercase tracking-widest text-sm hover:underline">info@clairvilx.com</a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}