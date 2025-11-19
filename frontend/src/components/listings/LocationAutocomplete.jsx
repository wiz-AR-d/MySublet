import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const LocationAutocomplete = ({ value, onChange, placeholder = 'Where?' }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (newValue.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: newValue,
          types: ['(cities)'],
          componentRestrictions: { country: 'us' }
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        className="text-sm text-gray-900 outline-none bg-transparent w-full"
        placeholder={placeholder}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{suggestion.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;