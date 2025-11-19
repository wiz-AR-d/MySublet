import { Link } from 'react-router-dom'
import { Search, Home as HomeIcon, Shield, MessageSquare } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Summer Housing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with students subletting their apartments for internships
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter city (e.g., New York, San Francisco)"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                />
                <Link
                  to="/listings"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search & Browse</h3>
              <p className="text-gray-600">
                Find apartments in your internship city with flexible dates and pricing
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Chat</h3>
              <p className="text-gray-600">
                Message apartment owners directly to ask questions and arrange viewings
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book Securely</h3>
              <p className="text-gray-600">
                Complete your booking with secure payments and move in with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have an Empty Apartment This Summer?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            List it on SubLease and earn money while you're away
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Popular Cities
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['New York', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Chicago', 'Los Angeles', 'Washington DC'].map((city) => (
              <Link
                key={city}
                to={`/listings?city=${city}`}
                className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg text-center font-semibold"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}