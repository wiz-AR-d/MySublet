import { useState, useEffect } from 'react';
import { useListingStore } from '../../store/listingStore';
import { X } from 'lucide-react';

import { AMENITIES_LIST as amenitiesList } from '../../constants/amenities';

export default function FilterModal({ isOpen, onClose }) {
  const { filters, setFilters, clearFilters } = useListingStore();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
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
      priceRange: ['', ''],
      bedrooms: '',
      roomType: '',
      amenities: [],
      roommateGender: '',
      maxRoommates: '',
      petPolicy: ''
    });
    // Auto-save and close after clearing
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const updateLocalFilter = (key, value) => {
    // If the value is the same as current, toggle it off (set to empty string)
    // This applies to single-select filters like bedrooms, roomType, etc.
    if (key !== 'priceRange' && key !== 'location' && key !== 'amenities' && localFilters[key] === value) {
      setLocalFilters(prev => ({ ...prev, [key]: '' }));
    } else {
      setLocalFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const toggleAmenity = (amenity) => {
    const currentAmenities = localFilters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    updateLocalFilter('amenities', updatedAmenities);
  };

  const handlePriceChange = (index, value) => {
    const newVal = value === '' ? '' : Math.max(0, parseInt(value));
    const newRange = [...localFilters.priceRange];
    newRange[index] = newVal;
    updateLocalFilter('priceRange', newRange);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

        <div className="relative bg-white/90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="close-filter-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-5 space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Price</h3>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1.5">Min. price</label>
                  <input
                    type="number"
                    min="0"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>
                <div className="pb-3 text-gray-400">–</div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1.5">Max. price</label>
                  <input
                    type="number"
                    min="0"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={() => updateLocalFilter('priceRange', ['', ''])}
                className="mt-3 text-xs text-gray-600 hover:text-gray-900 font-medium"
                data-testid="clear-price-filter"
              >
                Clear price filter
              </button>
            </div>

            <hr className="border-gray-100" />

            {/* Available Bedrooms */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Available Bedrooms</h3>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5', '6'].map((bedroom) => (
                  <button
                    key={bedroom}
                    onClick={() => updateLocalFilter('bedrooms', bedroom)}
                    className={`flex-1 min-w-[42px] px-3 py-2 text-sm rounded-lg border font-medium transition-colors text-center ${localFilters.bedrooms === bedroom
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    data-testid={`bedroom-${bedroom.toLowerCase()}`}
                  >
                    {bedroom}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Type of Place */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Type of Place</h3>
              <div className="flex flex-wrap gap-2">
                {['Entire home', 'Private room'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateLocalFilter('roomType', type)}
                    className={`flex-1 px-4 py-2.5 text-sm rounded-lg border font-medium transition-colors whitespace-nowrap text-center ${localFilters.roomType === type
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      } `}
                    data-testid={`room-type-${type.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Amenities */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="grid grid-rows-3 grid-flow-col gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap w-max ${localFilters.amenities?.includes(amenity)
                      ? 'bg-orange-50 text-orange-700 border-orange-200 font-medium'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 font-normal'
                      }`}
                    data-testid={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Roommate Gender */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Roommate gender</h3>
              <div className="flex flex-wrap gap-2">
                {['Female', 'Male', 'Non-binary'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => updateLocalFilter('roommateGender', gender)}
                    className={`flex-1 px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap text-center ${localFilters.roommateGender === gender
                      ? 'bg-gray-900 text-white border-gray-900 font-medium'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 font-normal'
                      } `}
                    data-testid={`gender-${gender.toLowerCase()}`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Roommates */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Roommates</h3>
              <p className="text-xs text-gray-500 mb-3">Max. number of roommates</p>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5'].map((count) => (
                  <button
                    key={count}
                    onClick={() => updateLocalFilter('maxRoommates', count)}
                    className={`flex-1 min-w-[42px] px-3 py-2 text-sm rounded-lg border font-medium transition-colors text-center ${localFilters.maxRoommates === count
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      } `}
                    data-testid={`roommates-${count.toLowerCase()}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Pets */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Pets</h3>
              <div className="flex flex-wrap gap-2">
                {['Pets allowed', 'Pets prohibited'].map((policy) => (
                  <button
                    key={policy}
                    onClick={() => updateLocalFilter('petPolicy', policy)}
                    className={`flex-1 px-4 py-2 text-sm rounded-lg border font-medium transition-colors text-center whitespace-nowrap ${localFilters.petPolicy === policy
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      } `}
                    data-testid={`pet-policy-${policy.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {policy}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white sticky bottom-0">
            <button
              onClick={handleClearAll}
              className="flex-1 px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
              data-testid="clear-all-filters"
            >
              Clear all filters
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
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