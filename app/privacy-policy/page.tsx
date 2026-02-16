import React from 'react';

export default function PrivacyPolicy() {
  const lastUpdated = "January 1, 2026";
  
  return (
    <div className="bg-white min-h-screen pt-30 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 italic">Effective Date: {lastUpdated}</p>

        <div className="space-y-10 text-gray-800 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Clairvil X Construction and Services (“Company,” “we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you provide to us.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              <a href="https://www.clairvilx.com" className="text-blue-600 hover:underline ml-1">www.clairvilx.com</a>, contact us, submit a form, or use our services.
            </p>
            <p className="mt-2 font-medium">If you do not agree with the terms of this policy, please do not use our services.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <div className="pl-4 border-l-2 border-gray-200 space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">A. Personal Information</h3>
                <p>When you fill out a contact form, request a quote, book an appointment, or contact us, we may collect:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Full name, Email address, and Phone number</li>
                  <li>Property address and Project details</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">B. Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect IP addresses, browser type, device information, and pages visited to help us improve user experience.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Respond to inquiries and provide estimates/proposals.</li>
              <li>Schedule appointments and deliver renovation services.</li>
              <li>Send confirmations, updates, and (if you opt-in) promotional offers.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">4. Text Messages and Marketing Communications</h2>
            <p>If you provide your phone number, you may receive appointment confirmations, project updates, or promotional offers.</p>
            <p className="mt-2 font-bold italic">You may opt out at any time by replying STOP to any message.</p>
            <p className="mt-2">We do not sell or share your phone number with third parties for marketing purposes.</p>
          </section>

          {/* Section 5 and 6 */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Sharing Your Information</h2>
              <p>We do not sell your personal information. We only share data with licensed subcontractors, service providers assisting your project, or legal authorities if required by law.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
              <p>We implement reasonable administrative and technical safeguards, though no method of electronic storage is 100% secure.</p>
            </section>
          </div>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Your Privacy Rights</h2>
            <p className="mb-4">If you are a Massachusetts resident, you have the right to request access, corrections, or deletion of your personal data.</p>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded">
              <p><strong>Contact us to exercise these rights:</strong></p>
              <p>Phone:  +1 (781) 390-4510|+1 (339) 208-1602</p>
              <p>Email: info@clairvilx.com</p>
            </div>
          </section>

          {/* Section 8, 9, 10, 11 */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">8. Cookies</h2>
              <p>Our website may use cookies to analyze traffic. You can disable cookies in your browser settings.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">9. Third-Party Links</h2>
              <p>We are not responsible for the privacy practices of linked third-party websites (like social media platforms).</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">10. Childrenandapos;s Privacy</h2>
              <p>Our services are not intended for individuals under 18 years of age.</p>
            </section>
          </div>

          <hr className="border-gray-300" />

          {/* Section 12 */}
          <section className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="font-bold text-lg">Clairvil X Construction and Services</p>
            <address className="not-italic mt-2 space-y-1 text-gray-700">
              <p>30 Pleasant St, Randolph, MA 02368</p>
              <p>Phone: <a href="tel:+13392081602" className="text-blue-600">+1 (781) 390-4510 | +1 (339) 208-1602</a></p>
              <p>Email: <a href="mailto:info@clairvilx.com" className="text-blue-600">info@clairvilx.com</a></p>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
}