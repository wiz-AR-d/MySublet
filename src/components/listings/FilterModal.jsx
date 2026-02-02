import { useState, useEffect } from 'react';
import { useListingStore } from '../../store/listingStore';
import { X } from 'lucide-react';

const amenitiesList = [
  'In-unit laundry',
  'Building laundry', 
  'Gym',
  'Doorman',
  'Wi-Fi',
  'Kitchen',
  'Parking',
  'Balcony',
  'Rooftop',
  'Garden'
];

export default function FilterModal({ isOpen, onClose }) {
  const { filters, setFilters, clearFilters } = useListingStore();
  const [localFilters, setLocalFilters] = useState(filters);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);
  
  if (!isOpen) return null;
  
  const handleSave = () => {
    setFilters(localFilters);
    onClose();
  };
  
  const handleClearAll = () => {
    clearFilters();
    setLocalFilters({
      location: '',
      moveInDate: null,
      moveOutDate: null,
      priceRange: [0, 10000],
      bedrooms: 'Any',
      roomType: 'Any type',
      amenities: [],
      roommateGender: 'Any',
      maxRoommates: 'Any',
      petPolicy: 'All'
    });
  };
  
  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const toggleAmenity = (amenity) => {
    const currentAmenities = localFilters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    updateLocalFilter('amenities', updatedAmenities);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="close-filter-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min. price</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => updateLocalFilter('priceRange', [parseInt(e.target.value) || 0, localFilters.priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                    data-testid="min-price-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max. price</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => updateLocalFilter('priceRange', [localFilters.priceRange[0], parseInt(e.target.value) || 10000])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="10000"
                    data-testid="max-price-input"
                  />
                </div>
              </div>
              <button
                onClick={() => updateLocalFilter('priceRange', [0, 10000])}
                className="mt-2 text-sm text-orange-500 hover:text-orange-600"
                data-testid="clear-price-filter"
              >
                Clear price filter
              </button>
            </div>
            
            {/* Available Bedrooms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Bedrooms</h3>
              <div className="flex flex-wrap gap-2">
                {['Any', '1', '2', '3', '4', '5', '6'].map((bedroom) => (
                  <button
                    key={bedroom}
                    onClick={() => updateLocalFilter('bedrooms', bedroom)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      localFilters.bedrooms === bedroom
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`bedroom-${bedroom.toLowerCase()}`}
                  >
                    {bedroom}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Type of Place */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Type of Place</h3>
              <div className="flex flex-wrap gap-2">
                {['Any type', 'Entire home', 'Private room'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateLocalFilter('roomType', type)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      localFilters.roomType === type
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`room-type-${type.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors text-left ${
                      localFilters.amenities?.includes(amenity)
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Roommate Gender */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Roommate gender</h3>
              <div className="flex flex-wrap gap-2">
                {['Any', 'Female', 'Male', 'Non-binary'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => updateLocalFilter('roommateGender', gender)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      localFilters.roommateGender === gender
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`gender-${gender.toLowerCase()}`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Roommates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Roommates</h3>
              <p className="text-sm text-gray-600 mb-3">Max. number of roommates</p>
              <div className="flex flex-wrap gap-2">
                {['Any', '1', '2', '3', '4', '5'].map((count) => (
                  <button
                    key={count}
                    onClick={() => updateLocalFilter('maxRoommates', count)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      localFilters.maxRoommates === count
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`roommates-${count.toLowerCase()}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Pets */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pets</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Pets allowed', 'Pets prohibited'].map((policy) => (
                  <button
                    key={policy}
                    onClick={() => updateLocalFilter('petPolicy', policy)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      localFilters.petPolicy === policy
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    data-testid={`pet-policy-${policy.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {policy}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleClearAll}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              data-testid="clear-all-filters"
            >
              Clear all filters
            </button>
            <button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              data-testid="save-filters"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}