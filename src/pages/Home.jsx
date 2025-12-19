import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, FileText, Home, Shield, Clock, DollarSign, Users, MapPin, Star, ArrowRight, Heart } from 'lucide-react';

export default function UniSubleaseHomepage() {

  const featuredListings = [
    {
      id: 1,
      title: "Modern Studio near MIT",
      location: "Cambridge, MA",
      price: "$1,200/mo",
      type: "Studio",
      duration: "3 months",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      verified: true,
      furnished: true
    },
    {
      id: 2,
      title: "Cozy 1BR near Harvard",
      location: "Cambridge, MA",
      price: "$1,500/mo",
      type: "1 Bed",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      verified: true,
      furnished: true
    },
    {
      id: 3,
      title: "Spacious 2BR Apartment",
      location: "Boston, MA",
      price: "$2,000/mo",
      type: "2 Bed",
      duration: "4 months",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      verified: true,
      furnished: true
    },
    {
      id: 4,
      title: "Bright Studio with Study",
      location: "Allston, MA",
      price: "$950/mo",
      type: "Studio",
      duration: "5 months",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
      verified: true,
      furnished: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      initials: "SJ",
      university: "Harvard University",
      rating: 5,
      text: "UniSublease made finding housing for my summer internship so easy! The verification process gave me peace of mind, and I found the perfect place within days."
    },
    {
      id: 2,
      name: "MJ Collins",
      initials: "MC",
      university: "MIT Graduate",
      rating: 5,
      text: "As an international student, I was nervous about finding housing. UniSublease's transparent pricing and helpful community made the process stress-free."
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      initials: "ER",
      university: "BU Law School",
      rating: 5,
      text: "I've used UniSublease twice now for semester exchanges. The platform is intuitive, the listings are genuine, and the support team is always responsive."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-white/60" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ⭐ Trusted by 10,000+ Students
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{fontFamily: 'serif'}}>
              Find Your Perfect Home
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Discover flexible, affordable housing options for students. Safe, verified, and hassle-free subletting.
            </p>
          </div>

          {/* Browse Listings Button */}
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/listings">
              <button className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors inline-flex items-center shadow-lg">
                Browse Listings
                <ArrowRight className="ml-3 w-6 h-6" />
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Verified Listings</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Instant Booking</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">5K+</div>
              <div className="text-gray-600">Verified Listings</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'serif'}}>
              Featured Listings
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked properties that offer the best value and location for students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  {listing.verified && (
                    <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
                      Verified
                    </div>
                  )}
                  {listing.furnished && (
                    <div className="absolute top-11 left-4 bg-yellow-400 px-2 py-1 rounded text-xs font-medium text-gray-900">
                      Furnished
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{listing.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price</span>
                      <span className="font-bold text-gray-900">{listing.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type</span>
                      <span className="text-gray-900">{listing.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900">{listing.duration}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/listings">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-900 hover:text-white font-medium transition-colors">
                View All Listings
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'serif'}}>
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Finding your next home is as easy as 1-2-3-4. Here's how we make subletting simple.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Search & Filter</h3>
              <p className="text-gray-600">
                Browse thousands of verified listings near your university. Use filters to find your perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Connect & Chat</h3>
              <p className="text-gray-600">
                Message property owners directly through our secure platform. Ask questions and schedule viewings.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Review & Apply</h3>
              <p className="text-gray-600">
                Review lease terms, check reviews, and submit your application with just a few clicks.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Move In</h3>
              <p className="text-gray-600">
                Complete secure payment, sign digital lease, and get your keys. Welcome home!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'serif'}}>
              Why Choose UniSublease?
            </h2>
            <p className="text-gray-600 text-lg">
              We've built the most trusted platform for student housing with features designed for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Properties</h3>
              <p className="text-gray-600">
                Every listing is verified by our team to ensure safety and authenticity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-yellow-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Flexible Leasing</h3>
              <p className="text-gray-600">
                Short-term or semester-long subleases that match your academic schedule.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Affordable Options</h3>
              <p className="text-gray-600">
                Find housing within your budget with transparent pricing and no hidden fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Student Community</h3>
              <p className="text-gray-600">
                Connect with fellow students and find compatible roommates easily.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Prime Locations</h3>
              <p className="text-gray-600">
                Properties near campus, transit, and essential amenities for student life.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="bg-pink-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Trusted Reviews</h3>
              <p className="text-gray-600">
                Read genuine reviews from students who have lived in the properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Link to="/listings">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-900 hover:text-white font-medium transition-colors mb-8">
                View All Listings
              </button>
            </Link>
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'serif'}}>
              What Students Say
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of satisfied students who found their perfect home through UniSublease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.university}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'serif'}}>
                UniSublease
              </div>
              <p className="text-gray-600 mb-4">
                The most trusted platform for university students to find and list sublease housing. Safe, verified, and hassle-free.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium text-sm">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Browse Listings</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">List Property</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Student Guides</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Safety Tips</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2024 UniSublease. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}