import { Bed, Bath, MapPin, DollarSign, Calendar, Check } from 'lucide-react';

export default function StepReview({ formData }) {
  const getBedroomDisplay = () => {
    return formData.bedrooms === 0 ? 'Studio/Loft' : `${formData.bedrooms} bed${formData.bedrooms !== 1 ? 's' : ''}`;
  };

  const getDuration = () => {
    if (!formData.available_from || !formData.available_to) return 'N/A';
    const days = Math.ceil(
      (new Date(formData.available_to) - new Date(formData.available_from)) / (1000 * 60 * 60 * 24)
    );
    return `${days} days`;
  };

  const getTotalPrice = () => {
    if (!formData.available_from || !formData.available_to || !formData.price_per_month) return 'N/A';
    const months = Math.ceil(
      (new Date(formData.available_to) - new Date(formData.available_from)) / (1000 * 60 * 60 * 24 * 30)
    );
    return `$${(parseFloat(formData.price_per_month) * months).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Review your listing</strong> - Make sure all information is correct before publishing.
        </p>
      </div>

      {/* Basic Info */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-500">Title</span>
            <p className="text-gray-900">{formData.title || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Description</span>
            <p className="text-gray-900 whitespace-pre-wrap">{formData.description || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Room Type</span>
            <p className="text-gray-900">{formData.roomType}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location
        </h3>
        <div className="space-y-2">
          <p className="text-gray-900">{formData.address}</p>
          <p className="text-gray-900">
            {formData.city}, {formData.state} {formData.zip_code}
          </p>
          {formData.coordinates && (
            <p className="text-sm text-gray-500">
              Coordinates: {formData.coordinates[0]}, {formData.coordinates[1]}
            </p>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Bed className="w-5 h-5 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">Bedrooms</p>
            <p className="font-semibold text-gray-900">{getBedroomDisplay()}</p>
          </div>
          <div>
            <Bath className="w-5 h-5 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">Bathrooms</p>
            <p className="font-semibold text-gray-900">{formData.bathrooms}</p>
          </div>
          {formData.square_feet && (
            <div>
              <span className="text-2xl">📐</span>
              <p className="text-sm text-gray-500">Square Feet</p>
              <p className="font-semibold text-gray-900">{formData.square_feet} sq ft</p>
            </div>
          )}
        </div>

        {formData.amenities && formData.amenities.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">Pet Policy</p>
          <p className="text-gray-900">{formData.petPolicy}</p>
        </div>

        {formData.house_rules && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">House Rules</p>
            <p className="text-gray-900 whitespace-pre-wrap">{formData.house_rules}</p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Pricing & Availability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Price per Month</p>
            <p className="text-2xl font-bold text-gray-900">
              ${parseFloat(formData.price_per_month || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <Calendar className="w-5 h-5 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">Available From</p>
            <p className="font-semibold text-gray-900">
              {formData.available_from
                ? new Date(formData.available_from).toLocaleDateString()
                : 'Not set'}
            </p>
          </div>
          <div>
            <Calendar className="w-5 h-5 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">Available To</p>
            <p className="font-semibold text-gray-900">
              {formData.available_to
                ? new Date(formData.available_to).toLocaleDateString()
                : 'Not set'}
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Estimated Total</p>
          <p className="text-xl font-bold text-gray-900">{getTotalPrice()}</p>
          <p className="text-xs text-gray-500 mt-1">Duration: {getDuration()}</p>
        </div>
      </div>

      {/* Images */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
        {formData.images && formData.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images added</p>
        )}
      </div>
    </div>
  );
}

