import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X } from 'lucide-react';

const FilterModal = ({ open, onClose, onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    placeType: 'Any type',
    amenities: [],
    roommateGender: [],
    maxRoommates: 'Any',
    pets: 'All'
  });

  const bedroomOptions = ['Any', '1', '2', '3', '4', '5', '6'];
  const placeTypeOptions = ['Any type', 'Entire home', 'Private room'];
  const amenitiesOptions = ['In-unit laundry', 'Building laundry', 'Gym', 'Doorman'];
  const genderOptions = ['Female', 'Male', 'Non-binary'];
  const roommateOptions = ['Any', '1', '2', '3', '4', '5'];
  const petOptions = ['All', 'Pets allowed', 'Pets prohibited'];

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (Array.isArray(current)) {
        return {
          ...prev,
          [category]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]
        };
      }
      return { ...prev, [category]: value };
    });
  };

  const handleSave = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
    onClose();
  };

  const handleClearAll = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: 'Any',
      placeType: 'Any type',
      amenities: [],
      roommateGender: [],
      maxRoommates: 'Any',
      pets: 'All'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Price */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Price (per month)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Min. price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full pl-7"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Max. price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="5000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full pl-7"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setFilters({ ...filters, minPrice: '', maxPrice: '' })}
              className="text-sm text-gray-600 hover:text-gray-900 mt-3 underline"
            >
              Clear price filter
            </button>
          </div>

          {/* Available Bedrooms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('bedrooms', option)}
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    filters.bedrooms === option
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Type of Place */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Type of Place</h3>
            <div className="flex flex-wrap gap-2">
              {placeTypeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('placeType', option)}
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    filters.placeType === option
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenitiesOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('amenities', option)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filters.amenities.includes(option)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Roommate Gender */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Roommate gender</h3>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('roommateGender', option)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filters.roommateGender.includes(option)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Roommates */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Roommates</h3>
            <p className="text-sm text-gray-600 mb-3">Max. number of roommates</p>
            <div className="flex flex-wrap gap-2">
              {roommateOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('maxRoommates', option)}
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    filters.maxRoommates === option
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Pets */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pets</h3>
            <div className="flex flex-wrap gap-2">
              {petOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('pets', option)}
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    filters.pets === option
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleClearAll}
            className="text-gray-700 hover:text-gray-900 font-medium underline"
          >
            Clear all filters
          </button>
          <Button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg font-medium"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;