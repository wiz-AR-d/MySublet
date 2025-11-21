import { Bed, Bath, Square, Home, Dog, Cat } from 'lucide-react';

const AMENITIES = [
  { id: 'Wi-Fi', label: 'Wi-Fi', icon: '📶' },
  { id: 'Kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'Laundry', label: 'Laundry', icon: '🧺' },
  { id: 'Parking', label: 'Parking', icon: '🅿️' },
  { id: 'Gym', label: 'Gym', icon: '💪' },
  { id: 'Pool', label: 'Pool', icon: '🏊' },
  { id: 'Balcony', label: 'Balcony', icon: '🌅' },
  { id: 'Rooftop', label: 'Rooftop', icon: '🏙️' },
  { id: 'Garden', label: 'Garden', icon: '🌳' },
  { id: 'Doorman', label: 'Doorman', icon: '🚪' },
  { id: 'Elevator', label: 'Elevator', icon: '🛗' },
  { id: 'Air Conditioning', label: 'Air Conditioning', icon: '❄️' },
  { id: 'Heating', label: 'Heating', icon: '🔥' },
  { id: 'TV', label: 'TV', icon: '📺' },
  { id: 'Workspace', label: 'Workspace', icon: '💼' },
];

export default function StepPropertyDetails({ formData, updateFormData, errors }) {
  const toggleAmenity = (amenity) => {
    const amenities = formData.amenities || [];
    if (amenities.includes(amenity)) {
      updateFormData({ amenities: amenities.filter(a => a !== amenity) });
    } else {
      updateFormData({ amenities: [...amenities, amenity] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Bedrooms and Bathrooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Bed className="inline w-5 h-5 mr-2" />
            Bedrooms *
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => updateFormData({ bedrooms: Math.max(0, formData.bedrooms - 1) })}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center font-semibold"
            >
              −
            </button>
            <input
              type="number"
              value={formData.bedrooms}
              onChange={(e) => updateFormData({ bedrooms: parseInt(e.target.value) || 0 })}
              min="0"
              className={`w-20 text-center px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.bedrooms ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => updateFormData({ bedrooms: formData.bedrooms + 1 })}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center font-semibold"
            >
              +
            </button>
            {formData.bedrooms === 0 && (
              <span className="text-sm text-gray-500">(Studio/Loft)</span>
            )}
          </div>
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Bath className="inline w-5 h-5 mr-2" />
            Bathrooms *
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => updateFormData({ bathrooms: Math.max(0.5, formData.bathrooms - 0.5) })}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center font-semibold"
            >
              −
            </button>
            <input
              type="number"
              value={formData.bathrooms}
              onChange={(e) => updateFormData({ bathrooms: parseFloat(e.target.value) || 1 })}
              min="0.5"
              step="0.5"
              className={`w-20 text-center px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.bathrooms ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => updateFormData({ bathrooms: formData.bathrooms + 0.5 })}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center font-semibold"
            >
              +
            </button>
          </div>
          {errors.bathrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
          )}
        </div>
      </div>

      {/* Square Feet */}
      <div>
        <label htmlFor="square_feet" className="block text-sm font-medium text-gray-700 mb-2">
          <Square className="inline w-5 h-5 mr-2" />
          Square Feet (Optional)
        </label>
        <input
          type="number"
          id="square_feet"
          value={formData.square_feet}
          onChange={(e) => updateFormData({ square_feet: e.target.value })}
          placeholder="e.g., 800"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Amenities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={`p-3 border-2 rounded-lg text-left transition-all ${
                formData.amenities?.includes(amenity.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl mr-2">{amenity.icon}</span>
              <span className="text-sm font-medium">{amenity.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pet Policy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Pet Policy
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'Pets allowed', label: 'Pets Allowed', icon: Dog },
            { value: 'No pets', label: 'No Pets', icon: Home },
          ].map((policy) => {
            const Icon = policy.icon;
            return (
              <button
                key={policy.value}
                type="button"
                onClick={() => updateFormData({ petPolicy: policy.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all flex items-center space-x-3 ${
                  formData.petPolicy === policy.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-6 h-6 text-gray-600" />
                <span className="font-medium">{policy.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* House Rules */}
      <div>
        <label htmlFor="house_rules" className="block text-sm font-medium text-gray-700 mb-2">
          House Rules (Optional)
        </label>
        <textarea
          id="house_rules"
          value={formData.house_rules}
          onChange={(e) => updateFormData({ house_rules: e.target.value })}
          placeholder="e.g., No smoking, No parties, Quiet hours after 10 PM..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

