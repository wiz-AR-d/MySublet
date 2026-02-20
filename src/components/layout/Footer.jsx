import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">MySublease</h2>
              <p className="text-sm text-gray-400">support@mysublease.com</p>
              <p className="text-sm text-gray-400">© 2025 MySublease Housing Co.</p>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For those looking */}
          <div>
            <h3 className="font-semibold mb-4">For those looking</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-white transition">
                  Browse Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* For those listing */}
          <div>
            <h3 className="font-semibold mb-4">For those listing</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/create-listing" className="text-gray-400 hover:text-white transition">
                  Create a listing
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="text-gray-400 hover:text-white transition">
                  My listings
                </Link>
              </li>
            </ul>
          </div>

          {/* For everyone */}
          <div>
            <h3 className="font-semibold mb-4">For everyone</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-400 hover:text-white transition">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/impressum" className="text-gray-400 hover:text-white transition">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}