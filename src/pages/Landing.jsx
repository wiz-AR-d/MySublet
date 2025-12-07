import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Search, MessageSquare, Home as HomeIcon } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/videos/landing_page.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <HomeIcon className="h-12 w-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">MySublet</h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 max-w-4xl leading-tight">
            Sublease from<br />real people<br />with confidence
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-center mb-12 text-white/90">
            The safest way to sublease
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/listings"
              className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl"
            >
              Find your home
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/30"
            >
              List your place
            </Link>
          </div>

          {/* Stats - Optional for now but ready */}
          <div className="absolute bottom-6 md:bottom-12 left-0 right-0 flex justify-center gap-4 sm:gap-8 md:gap-16 text-center px-4">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">verified listings</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">5,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">people matched</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">$2M+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">earned by hosts</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find the perfect sublet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All MySublet hosts are verified (real people ✨) and it's easy to filter by location, move-in date, and property type
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Browse Listings</h3>
              <p className="text-gray-600 leading-relaxed">
                Search through verified apartments in your city with flexible dates and transparent pricing
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <MessageSquare className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Connect Directly</h3>
              <p className="text-gray-600 leading-relaxed">
                Message verified hosts to ask questions, schedule viewings, and get to know your future home
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Book Securely</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your booking with secure payments and move in with complete confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* List Your Place Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              List your place
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              MySublet will instantly notify thousands of people looking for sublets in your city
            </p>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold mb-12">
              🔔 2,361 people notified today
            </div>

            <Link
              to="/create-listing"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}