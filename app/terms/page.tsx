"use client"
export default function TermsOfService() {
  const effectiveDate = "January 1, 2026";

  return (
    <div className="bg-slate-50 pt-30 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white shadow-sm border border-slate-200 rounded-xl p-8 md:p-12">
        
        {/* Header */}
        <header className="border-b border-slate-100 pb-8 mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 font-medium">Effective Date: {effectiveDate}</p>
        </header>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          
          <section>
            <p>
              Welcome to the website of <span className="font-semibold text-slate-900">Clairvil X Construction and Services</span> (“Company,” “we,” “our,” or “us”). 
              By accessing or using our website (<a href="https://www.clairvilx.com" className="text-blue-600 hover:underline">www.clairvilx.com</a>) 
              or our services, you agree to the following terms.
            </p>
          </section>

          {/* 1. Services */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-l-4 border-blue-500 pl-4">1. Services</h2>
            <p className="mb-3">Clairvil X Construction and Services provides residential and light commercial renovation services including:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span> Kitchen remodeling
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span> Bathroom remodeling
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span> Basement renovations
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span> Window and door installation
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span> General construction services
              </li>
            </ul>
            <p className="mt-4 italic text-sm text-slate-500">
              All services are subject to written contracts, estimates, and project agreements.
            </p>
          </section>

          {/* 2. Estimates & Proposals */}
          <section className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Estimates & Proposals</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>All estimates are valid for <strong className="text-slate-900">15–30 days</strong> unless otherwise stated.</li>
              <li>Pricing may change due to material cost fluctuations or scope changes.</li>
              <li>Any additional work not included in the original proposal must be approved in writing.</li>
            </ul>
          </section>

          {/* 3. Payments */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Payments</h2>
            <p>
              Payment terms are outlined in individual project contracts. 
              Failure to make payments may result in project delays or suspension of services.
            </p>
          </section>

          {/* 4. Website Use */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Website Use</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Use the website for unlawful purposes.</li>
              <li>Attempt to gain unauthorized access.</li>
              <li>Copy or distribute website content without permission.</li>
            </ul>
            <p className="mt-3 text-sm">All content (logos, text, images) belongs to Clairvil X Construction and Services.</p>
          </section>

          {/* 5. Liability & 6. Governing Law */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
              <p className="text-sm">
                Clairvil X Construction and Services is not liable for indirect or incidental damages arising from website use or services beyond the scope of signed contracts.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Governing Law</h2>
              <p className="text-sm">
                These terms are governed by the laws of the <span className="font-semibold text-slate-900">Commonwealth of Massachusetts</span>.
              </p>
            </section>
          </div>

          <hr className="border-slate-100" />

          {/* 7. Contact */}
          <section className="bg-slate-50 rounded-xl p-8 text-black">
            <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
            <div className="space-y-2 opacity-90">
              <p className="font-bold text-xl">Clairvil X Construction and Services</p>
              <p>30 Pleasant St, Randolph, MA 02368</p>
              <p>
                Phone: <a href="tel:+13392081602" className="hover:underline font-medium">+1 (781)-390-4510 | +1 (339) 208-1602</a>
              </p>
              <p>
                Email: <a href="mailto:info@clairvilx.com" className="hover:underline font-medium">info@clairvilx.com</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}