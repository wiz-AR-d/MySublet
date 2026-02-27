import {Link} from 'react-router-dom'
import {ArrowRight, Shield, Search, MessageSquare, Home as HomeIcon} from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-black">

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

        {/* Overlay - Professional dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-neutral-950/60 to-black/90" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 animate-fade-in-down">
            <HomeIcon className="h-12 w-12 text-white drop-shadow-2xl" />
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-2xl">MySublet</h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 max-w-4xl leading-tight animate-fade-in-up drop-shadow-2xl">
            Sublease from<br />real people<br />with confidence
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-center mb-12 text-neutral-200 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            The safest way to sublease
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Link
              to="/listings"
              className="group bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-100 hover:scale-105 transition-all flex items-center gap-2 shadow-2xl"
            >
              Find your home
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all border-2 border-white/40 shadow-xl"
            >
              List your place
            </Link>
          </div>

          {/* Stats */}
          <div className="absolute bottom-8 md:bottom-16 left-0 right-0 flex justify-center gap-8 sm:gap-12 md:gap-20 text-center px-4 animate-slide-up">
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-neutral-300 mt-1">verified listings</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">5,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-neutral-300 mt-1">people matched</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">$2M+</div>
              <div className="text-xs sm:text-sm md:text-base text-neutral-300 mt-1">earned by hosts</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-neutral-100">1</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
              Find the perfect sublet
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              All MySublet hosts are verified (real people ✨) and it's easy to filter by location, move-in date, and property type
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16">
            {/* Step 1 */}
            <div className="text-center group animate-stagger-in">
              <div className="bg-neutral-900 border border-neutral-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:border-neutral-600 group-hover:shadow-xl transition-all duration-300">
                <Search className="h-10 w-10 text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-100">Browse Listings</h3>
              <p className="text-neutral-400 leading-relaxed text-base">
                Search through verified apartments in your city with flexible dates and transparent pricing
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group animate-stagger-in animation-delay-200">
              <div className="bg-neutral-900 border border-neutral-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:border-neutral-600 group-hover:shadow-xl transition-all duration-300">
                <MessageSquare className="h-10 w-10 text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-100">Connect Directly</h3>
              <p className="text-neutral-400 leading-relaxed text-base">
                Message verified hosts to ask questions, schedule viewings, and get to know your future home
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group animate-stagger-in animation-delay-400">
              <div className="bg-neutral-900 border border-neutral-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:border-neutral-600 group-hover:shadow-xl transition-all duration-300">
                <Shield className="h-10 w-10 text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-100">Book Securely</h3>
              <p className="text-neutral-400 leading-relaxed text-base">
                Complete your booking with secure payments and move in with complete confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* List Your Place Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-900 to-neutral-950 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-neutral-100">2</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-100 leading-tight">
              List your place
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              MySublet will instantly notify thousands of people looking for sublets in your city
            </p>
            <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-semibold mb-12 shadow-lg hover:bg-orange-500 hover:scale-105 transition-all duration-300 animate-pulse-subtle">
              🔔 2,361 people notified today
            </div>

            <div className="mt-8">
              <Link
                to="/create-listing"
                className="inline-block bg-white text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-neutral-100 hover:scale-105 transition-all shadow-2xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes stagger-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-stagger-in {
          animation: stagger-in 0.8s ease-out backwards;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}