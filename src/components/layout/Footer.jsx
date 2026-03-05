import {Link} from 'react-router-dom'
import {Instagram, Linkedin, Twitter, Facebook, Home, Mail, MapPin} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 via-black to-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Home className="h-8 w-8 text-orange-400" />
              <h2 className="text-3xl font-light tracking-wide">MySublet</h2>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              The safest way to sublease in Germany. Connecting verified users across major cities.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:support@mysublet.com" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition group">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">support@mysublet.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">Berlin, Germany</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all">
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500/20 hover:border-sky-500/50 transition-all">
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-sky-400 transition" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-600/50 transition-all">
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition" />
                </div>
              </a>
            </div>
          </div>

          {/* For those looking */}
          <div>
            <h3 className="font-medium text-lg mb-6 text-white">For Tenants</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* For those listing */}
          <div>
            <h3 className="font-medium text-lg mb-6 text-white">For Hosts</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/create-listing" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Create Listing
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Host Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-medium text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/impressum" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-400 mr-3 transition"></span>
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 MySublet Housing Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <Link to="/terms" className="hover:text-orange-400 transition">Terms of Service</Link>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <Link to="/cookies" className="hover:text-orange-400 transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}