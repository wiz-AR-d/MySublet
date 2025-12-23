import { useState } from 'react';
import { useListingStore } from '../../store/listingStore';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Search, MapPin, Calendar, X } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

// Mock location options (you can later integrate with Google Places API)
const locationOptions = [
  { value: 'new york', label: 'New York, NY, USA' },
  { value: 'brooklyn', label: 'Brooklyn, NY, USA' },
  { value: 'manhattan', label: 'Manhattan, NY, USA' },
  { value: 'queens', label: 'Queens, NY, USA' },
  { value: 'bronx', label: 'The Bronx, NY, USA' },
  { value: 'chicago', label: 'Chicago, IL, USA' },
  { value: 'los angeles', label: 'Los Angeles, CA, USA' },
  { value: 'san francisco', label: 'San Francisco, CA, USA' },
  { value: 'boston', label: 'Boston, MA, USA' },
  { value: 'washington dc', label: 'Washington, DC, USA' }
];

export default function SearchBar() {
  const { filters, setFilters, fetchListings, searchListings } = useListingStore();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationChange = (option) => {
    setSelectedLocation(option);
    setFilters({ location: option ? option.label : '' });
  };

  const handleMoveInDateChange = (date) => {
    setFilters({ moveInDate: date });
  };

  const handleMoveOutDateChange = (date) => {
    setFilters({ moveOutDate: date });
  };

  const handleSearch = () => {
    // Extract city from location filter if available
    const city = filters.location ? filters.location.split(',')[0].trim() : '';

    // Build search filters
    const searchFilters = {
      city: city,
      availableFrom: filters.moveInDate ? filters.moveInDate.toISOString().split('T')[0] : null,
      availableTo: filters.moveOutDate ? filters.moveOutDate.toISOString().split('T')[0] : null,
    };

    if (searchQuery || city) {
      searchListings(searchQuery || city, searchFilters);
    } else {
      fetchListings(searchFilters);
    }
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      minHeight: '48px',
      backgroundColor: 'transparent',
      '&:hover': {
        border: 'none'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6B7280',
      fontSize: '16px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#111827',
      fontSize: '16px'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50
    })
  };

  return (
    <div className="py-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:divide-x lg:divide-gray-200">

          {/* Location / Search */}
          <div className="flex-1 p-4">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, title, or description"
                  className="w-full text-base text-gray-900 placeholder-gray-500 border-none focus:outline-none bg-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  data-testid="search-input"
                />
              </div>
            </div>
          </div>

          {/* Location Filter (Optional) */}
          <div className="flex-1 p-4 hidden lg:block">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  options={locationOptions}
                  placeholder="Filter by city"
                  isClearable
                  isSearchable
                  styles={customSelectStyles}
                  className="text-base"
                  data-testid="location-select"
                />
              </div>
            </div>
          </div>

          {/* Move-in Date */}
          <div className="flex-1 p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Move-in
                </label>
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={filters.moveInDate}
                    onChange={handleMoveInDateChange}
                    placeholderText="Add dates"
                    className="w-full text-base text-gray-900 placeholder-gray-500 border-none focus:outline-none bg-transparent"
                    dateFormat="MMM d, yyyy"
                    minDate={new Date()}
                    data-testid="move-in-date"
                  />
                  {filters.moveInDate && (
                    <button
                      onClick={() => handleMoveInDateChange(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear move-in date"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Move-out Date */}
          <div className="flex-1 p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Move-out
                </label>
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={filters.moveOutDate}
                    onChange={handleMoveOutDateChange}
                    placeholderText="Add dates"
                    className="w-full text-base text-gray-900 placeholder-gray-500 border-none focus:outline-none bg-transparent"
                    dateFormat="MMM d, yyyy"
                    minDate={filters.moveInDate || new Date()}
                    data-testid="move-out-date"
                  />
                  {filters.moveOutDate && (
                    <button
                      onClick={() => handleMoveOutDateChange(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear move-out date"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="p-4">
            <button
              onClick={handleSearch}
              className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              data-testid="search-btn"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}