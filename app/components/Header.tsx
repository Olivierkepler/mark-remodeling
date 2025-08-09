import Image from "next/image";


export default function Header() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="/images/mark.png"
              alt="Mark Remodeling"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Mark Remodeling
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Home
              </a>
              <a href="#services" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Services
              </a>
              <a href="#about" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                About
              </a>
              <a href="#contact" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Contact
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
