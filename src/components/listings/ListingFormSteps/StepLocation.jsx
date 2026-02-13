import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function StepLocation({ formData, updateFormData, errors }) {
  const [locationQuery, setLocationQuery] = useState('');

  // Try to get coordinates from browser geolocation or use a geocoding service
  // For now, we'll use a simple approach where user can enter coordinates manually
  // In production, integrate with Google Maps API or similar

  const handleAddressChange = (e) => {
    updateFormData({ address: e.target.value });
  };

  const handleCityChange = (e) => {
    updateFormData({ city: e.target.value });
  };

  const handleStateChange = (e) => {
    updateFormData({ state: e.target.value });
  };

  const handleZipChange = (e) => {
    updateFormData({ zip_code: e.target.value });
  };

  // Common US states
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-6">
      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleAddressChange}
            placeholder="123 Main Street"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleCityChange}
            placeholder="New York"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={handleStateChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-2">
          ZIP Code (Optional)
        </label>
        <input
          type="text"
          id="zip_code"
          value={formData.zip_code}
          onChange={handleZipChange}
          placeholder="10001"
          maxLength={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Coordinates (Optional - for map integration) */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Location will be shown on the map. You can manually set coordinates if needed, 
          or they will be automatically calculated from the address.
        </p>
      </div>

      {/* Manual Coordinates (Optional) */}
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
          Set coordinates manually (Optional)
        </summary>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              step="any"
              value={formData.coordinates?.[0] || ''}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                updateFormData({
                  coordinates: lat ? [lat, formData.coordinates?.[1] || 0] : null
                });
              }}
              placeholder="40.7128"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              step="any"
              value={formData.coordinates?.[1] || ''}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                updateFormData({
                  coordinates: formData.coordinates?.[0] 
                    ? [formData.coordinates[0], lng] 
                    : null
                });
              }}
              placeholder="-74.0060"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </details>
    </div>
  );
}

