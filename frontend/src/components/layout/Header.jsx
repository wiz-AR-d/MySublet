import React, { useState } from 'react';
import { MapPin, Calendar, Search, Menu, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import FilterModal from '../listings/FilterModal';
import DatePicker from '../listings/DatePicker';
import LocationAutocomplete from '../listings/LocationAutocomplete';

const Header = ({ onSearch, onFilterChange }) => {
  const [location, setLocation] = useState('New York, NY, USA');
  const [moveIn, setMoveIn] = useState(null);
  const [moveOut, setMoveOut] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ location, moveIn, moveOut });
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-orange-600 cursor-pointer">Ohana</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow">
                {/* Filter Button */}
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <div className="h-8 w-px bg-gray-300"></div>

                {/* Location */}
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-sm text-gray-900 outline-none bg-transparent"
                    placeholder="Where?"
                  />
                </div>

                <div className="h-8 w-px bg-gray-300"></div>

                {/* Move-in */}
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-gray-700 mb-1">Move-in</label>
                  <input
                    type="text"
                    value={moveIn}
                    onChange={(e) => setMoveIn(e.target.value)}
                    className="text-sm text-gray-400 outline-none bg-transparent"
                    placeholder="Add move-in"
                  />
                </div>

                <div className="h-8 w-px bg-gray-300"></div>

                {/* Move-out */}
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-gray-700 mb-1">Move-out</label>
                  <input
                    type="text"
                    value={moveOut}
                    onChange={(e) => setMoveOut(e.target.value)}
                    className="text-sm text-gray-400 outline-none bg-transparent"
                    placeholder="Add move-out"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-3 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                List your place
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Chat
              </button>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <Avatar className="w-10 h-10 bg-purple-600 cursor-pointer">
                <AvatarFallback className="bg-purple-600 text-white font-semibold">A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Modal */}
      <FilterModal 
        open={showFilterModal} 
        onClose={() => setShowFilterModal(false)}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

export default Header;