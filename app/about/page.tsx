import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ConstructionCo</h1>
          <p className="text-xl text-gray-600">Building dreams into reality since 1995</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-96">
            <Image
              src="/images/construction-team.jpg"
              alt="Construction team at work"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              For over 25 years, ConstructionCo has been at the forefront of innovative construction solutions. 
              What started as a small family business has grown into one of the regions most trusted construction companies.
            </p>
            <p className="text-gray-600 mb-4">
              We pride ourselves on our commitment to quality, safety, and customer satisfaction. Our team of experienced 
              professionals brings expertise and dedication to every project, ensuring exceptional results.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Delivering excellence in every project we undertake</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Teamwork</h3>
              <p className="text-gray-600">Collaborating to achieve outstanding results</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety</h3>
              <p className="text-gray-600">Prioritizing safety in every aspect of our work</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8">Let s build something amazing together</p>
          <a href="/contact" className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition duration-300 ease-in-out transform hover:scale-105">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}
