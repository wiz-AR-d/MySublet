import {useState} from 'react';
import {useListingStore} from '../../store/listingStore';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import {Search, MapPin, Calendar, X} from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

// Mock location options (you can later integrate with Google Places API)
const locationOptions = [
  {value: 'new york', label: 'New York, NY, USA'},
  {value: 'brooklyn', label: 'Brooklyn, NY, USA'},
  {value: 'manhattan', label: 'Manhattan, NY, USA'},
  {value: 'queens', label: 'Queens, NY, USA'},
  {value: 'bronx', label: 'The Bronx, NY, USA'},
  {value: 'chicago', label: 'Chicago, IL, USA'},
  {value: 'los angeles', label: 'Los Angeles, CA, USA'},
  {value: 'san francisco', label: 'San Francisco, CA, USA'},
  {value: 'boston', label: 'Boston, MA, USA'},
  {value: 'washington dc', label: 'Washington, DC, USA'}
];

export default function SearchBar() {
  const {filters, setFilters, fetchListings, searchListings} = useListingStore();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationChange = (option) => {
    setSelectedLocation(option);
    setFilters({location: option ? option.label : ''});
  };

  const handleMoveInDateChange = (date) => {
    setFilters({moveInDate: date});
  };

  const handleMoveOutDateChange = (date) => {
    setFilters({moveOutDate: date});
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
      color: '#9CA3AF',
      fontSize: '16px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#F3F4F6',
      fontSize: '16px'
    }),
    input: (provided) => ({
      ...provided,
      color: '#F3F4F6',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
      backgroundColor: '#1F2937',
      border: '1px solid #374151',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#374151' : 'transparent',
      color: '#F3F4F6',
      '&:active': {
        backgroundColor: '#4B5563'
      }
    })
  };

  return (
    <div className="py-1">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-1">
        <div className="flex flex-col lg:flex-row lg:items-center lg:divide-x lg:divide-white/10">

          {/* Location / Search */}
          <div className="flex-1 p-2">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, title..."
                  className="w-full text-base text-white placeholder-gray-500 border-none focus:outline-none bg-transparent"
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
          <div className="flex-1 p-2 hidden lg:block">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
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
          <div className="flex-1 p-2">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Move-in
                </label>
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={filters.moveInDate}
                    onChange={handleMoveInDateChange}
                    placeholderText="Add dates"
                    className="w-full text-base text-white placeholder-gray-500 border-none focus:outline-none bg-transparent"
                    dateFormat="MMM d, yyyy"
                    minDate={new Date()}
                    data-testid="move-in-date"
                  />
                  {filters.moveInDate && (
                    <button
                      onClick={() => handleMoveInDateChange(null)}
                      className="text-gray-400 hover:text-white transition-colors"
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
          <div className="flex-1 p-2">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Move-out
                </label>
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={filters.moveOutDate}
                    onChange={handleMoveOutDateChange}
                    placeholderText="Add dates"
                    className="w-full text-base text-white placeholder-gray-500 border-none focus:outline-none bg-transparent"
                    dateFormat="MMM d, yyyy"
                    minDate={filters.moveInDate || new Date()}
                    data-testid="move-out-date"
                  />
                  {filters.moveOutDate && (
                    <button
                      onClick={() => handleMoveOutDateChange(null)}
                      className="text-gray-400 hover:text-white transition-colors"
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
          <div className="p-2">
            <button
              onClick={handleSearch}
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2"
              data-testid="search-btn"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          background-color: #1F2937 !important;
          border-color: #374151 !important;
          color: #F3F4F6 !important;
          font-family: inherit !important;
        }
        .react-datepicker__header {
          background-color: #111827 !important;
          border-bottom-color: #374151 !important;
        }
        .react-datepicker__current-month, .react-datepicker__day-name {
          color: #F3F4F6 !important;
        }
        .react-datepicker__day {
          color: #F3F4F6 !important;
        }
        .react-datepicker__day:hover {
          background-color: #374151 !important;
        }
        .react-datepicker__day--selected {
          background-color: #3B82F6 !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #2563EB !important;
        }
        .react-datepicker__day--disabled {
          color: #4B5563 !important;
        }
      `}</style>
    </div>
  );
}