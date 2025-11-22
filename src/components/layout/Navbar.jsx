import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-300">
            <Home className="w-6 h-6" />
            <span className="font-bold text-xl">UniSublease</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <Link to="/listings" className="hover:text-blue-300">Listings</Link>
            <Link to="/messages" className="hover:text-blue-300">Messages</Link>
            <Link to="/profile" className="hover:text-blue-300">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
