/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { listingsAPI } from '../../services/api/listings';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import CloudinaryImageUpload from "./CloudinaryImageUpload";

// FIXED: Better Rent Input Component
const StepRentDeposit = ({ formData, updateFormData, errors }) => {
  const handleRentChange = (e) => {
    // Allow only numbers and decimals
    const value = e.target.value.replace(/[^\d.]/g, "");
    updateFormData({ monthlyRent: value });
  };

  const handleDepositChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    updateFormData({ deposit: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          11
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          How much is the monthly rent?
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly rent (€)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={formData.monthlyRent}
              onChange={handleRentChange}
              placeholder="1200"
              className={`w-full pl-10 pr-4 py-4 border-2 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.monthlyRent ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.monthlyRent && (
            <p className="mt-1 text-sm text-red-600">{errors.monthlyRent}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deposit (€)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={formData.deposit}
              onChange={handleDepositChange}
              placeholder="1200"
              className={`w-full pl-10 pr-4 py-4 border-2 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.deposit ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.deposit && (
            <p className="mt-1 text-sm text-red-600">{errors.deposit}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        ℹ️ Enter the total monthly rent including utilities. The deposit is
        usually one month's rent or more.
      </p>
    </div>
  );
};

// FIXED: Working Photos Component with Cloudinary
const StepPhotos = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          12
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Add photos of your place
        </h2>
        <p className="text-gray-600">Upload at least 3 clear photos</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <CloudinaryImageUpload
          images={formData.photos || []}
          onImagesChange={(images) => updateFormData({ photos: images })}
          maxImages={10}
        />

        {errors.photos && (
          <p className="mt-4 text-sm text-red-600 text-center">
            {errors.photos}
          </p>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        ℹ️ First photo will be the cover image. Drag to reorder.
      </p>
    </div>
  );
};

// Keep all other step components the same...
const StepPropertyType = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        1
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        What are you subleasing?
      </h2>
      <p className="text-gray-600">Is your property an apartment or house?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {[
        { value: "Apartment", label: "Apartment", icon: "🏢" },
        { value: "Shared apartment", label: "Shared apartment", icon: "🏘️" },
        { value: "Studio", label: "Studio", icon: "🏠" },
        { value: "House", label: "House", icon: "🏡" },
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({ propertyType: type.value })}
          className={`p-6 border-2 rounded-xl text-center transition-all hover:shadow-md ${
            formData.propertyType === type.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-4xl mb-2">{type.icon}</div>
          <div className="font-semibold text-gray-900">{type.label}</div>
        </button>
      ))}
    </div>

    <p className="text-sm text-gray-500 text-center mt-4">
      ⚠️ Choose the option that best matches your place.
    </p>
  </div>
);

const StepWhatOffering = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        2
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        What type of place?
      </h2>
      <p className="text-gray-600">
        Just your bedroom, or your entire apartment?
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {[
        { value: "Private bedroom", label: "Private bedroom", icon: "🛏️" },
        { value: "Entire place", label: "Entire place", icon: "🏠" },
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({ whatOffering: type.value })}
          className={`p-6 border-2 rounded-xl text-center transition-all hover:shadow-md ${
            formData.whatOffering === type.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-4xl mb-2">{type.icon}</div>
          <div className="font-semibold text-gray-900">{type.label}</div>
        </button>
      ))}
    </div>
  </div>
);

const StepFurnishing = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        3
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Is it furnished?
      </h2>
      <p className="text-gray-600">Let your guest know what to expect</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {[
        {
          value: "Move-in ready",
          label: "Move-in ready",
          desc: "Fully equipped with essentials included",
          icon: "✅",
        },
        {
          value: "Furnished",
          label: "Furnished",
          desc: "Includes furniture shown in photos",
          icon: "🛋️",
        },
        {
          value: "Unfurnished",
          label: "Unfurnished",
          desc: "Empty space, no furniture provided",
          icon: "📦",
        },
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({ furnishing: type.value })}
          className={`p-6 border-2 rounded-xl text-center transition-all hover:shadow-md ${
            formData.furnishing === type.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-4xl mb-3">{type.icon}</div>
          <div className="font-semibold text-gray-900 mb-2">{type.label}</div>
          <div className="text-sm text-gray-600">{type.desc}</div>
        </button>
      ))}
    </div>
  </div>
);

const StepRentalType = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        4
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        What type of rental is this?
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
      {[
        {
          value: "Sublet",
          label: "Sublet",
          desc: "You are away temporarily. Guest stays in your place for a short period.",
          icon: "🔄",
        },
        {
          value: "Room takeover",
          label: "Room takeover",
          desc: "You are moving out. Guest takes over your room in a shared apartment.",
          icon: "🚪",
        },
        {
          value: "New lease",
          label: "New lease",
          desc: "Full new contract. Guest rents the whole place directly from the landlord.",
          icon: "📝",
        },
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({ rentalType: type.value })}
          className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
            formData.rentalType === type.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{type.icon}</div>
            <div>
              <div className="font-semibold text-gray-900 text-lg mb-2">
                {type.label}
              </div>
              <div className="text-sm text-gray-600">{type.desc}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const StepRegistration = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        5
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Is registration possible at this address?
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
      {[
        { value: "Yes", label: "Yes, registration is possible", icon: "✅" },
        { value: "No", label: "No, registration is not possible", icon: "❌" },
        { value: "Long stay only", label: "Only for long stay", icon: "📅" },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateFormData({ registration: option.value })}
          className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
            formData.registration === option.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{option.icon}</div>
            <div className="font-semibold text-gray-900 text-lg">
              {option.label}
            </div>
          </div>
        </button>
      ))}
    </div>

    <p className="text-sm text-gray-500 text-center mt-4">
      ℹ️ Registration is important for guests who need official address
      documents.
    </p>
  </div>
);

const StepTotalRooms = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        6
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        How many rooms does the place have?
      </h2>
    </div>

    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => updateFormData({ totalRooms: num })}
          className={`p-6 border-2 rounded-xl text-center transition-all hover:shadow-md ${
            formData.totalRooms === num
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-3xl font-bold text-gray-900">{num}</div>
          <div className="text-sm text-gray-600 mt-1">
            room{num > 1 ? "s" : ""}
          </div>
        </button>
      ))}
    </div>

    <button
      type="button"
      onClick={() => updateFormData({ totalRooms: 7 })}
      className={`w-full max-w-xs mx-auto block p-4 border-2 rounded-xl text-center transition-all hover:shadow-md ${
        formData.totalRooms >= 7
          ? "border-orange-500 bg-orange-50 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="font-semibold text-gray-900">6+ rooms</div>
    </button>

    <p className="text-sm text-gray-500 text-center mt-4">
      ℹ️ Count all main living rooms and bedrooms.
    </p>
  </div>
);

const StepRoomsOffered = ({ formData, updateFormData, errors }) => {
  const maxRooms = formData.totalRooms || 1;
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          7
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          How many rooms are you offering?
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
        {Array.from({ length: maxRooms }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => updateFormData({ roomsOffered: num })}
            className={`p-6 border-2 rounded-xl text-center transition-all hover:shadow-md ${
              formData.roomsOffered === num
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-3xl font-bold text-gray-900">{num}</div>
            <div className="text-sm text-gray-600 mt-1">
              room{num > 1 ? "s" : ""}
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        ℹ️ Choose how many rooms the guest can use.
      </p>
    </div>
  );
};

const StepBathrooms = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        8
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        How many bathrooms are there?
      </h2>
    </div>

    <div className="flex items-center justify-center space-x-6">
      <button
        type="button"
        onClick={() =>
          updateFormData({ bathrooms: Math.max(1, formData.bathrooms - 1) })
        }
        className="w-14 h-14 border-2 border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center text-2xl font-semibold transition-all hover:shadow-md"
      >
        −
      </button>
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900">
          {formData.bathrooms}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          bathroom{formData.bathrooms !== 1 ? "s" : ""}
        </div>
      </div>
      <button
        type="button"
        onClick={() => updateFormData({ bathrooms: formData.bathrooms + 1 })}
        className="w-14 h-14 border-2 border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center text-2xl font-semibold transition-all hover:shadow-md"
      >
        +
      </button>
    </div>

    <p className="text-sm text-gray-500 text-center mt-8">
      ℹ️ Include full bathrooms and shower rooms.
    </p>
  </div>
);

const StepAvailability = ({ formData, updateFormData, errors }) => {
  const addDateRange = () => {
    updateFormData({
      availabilityDates: [
        ...formData.availabilityDates,
        { moveIn: "", moveOut: "" },
      ],
    });
  };

  const updateDateRange = (index, field, value) => {
    const newDates = [...formData.availabilityDates];
    newDates[index][field] = value;
    updateFormData({ availabilityDates: newDates });
  };

  const removeDateRange = (index) => {
    const newDates = formData.availabilityDates.filter((_, i) => i !== index);
    updateFormData({ availabilityDates: newDates });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          9
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          When is your place available?
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {formData.availabilityDates.map((dateRange, index) => (
          <div key={index} className="p-6 border-2 border-gray-200 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Move-in date
                </label>
                <input
                  type="date"
                  value={dateRange.moveIn}
                  onChange={(e) =>
                    updateDateRange(index, "moveIn", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Move-out date
                </label>
                <input
                  type="date"
                  value={dateRange.moveOut}
                  onChange={(e) =>
                    updateDateRange(index, "moveOut", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            {formData.availabilityDates.length > 1 && (
              <button
                type="button"
                onClick={() => removeDateRange(index)}
                className="mt-3 text-sm text-red-600 hover:text-red-700"
              >
                Remove this date range
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addDateRange}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
        >
          + Add another date range
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        ℹ️ You can add multiple availability windows.
      </p>
    </div>
  );
};

const StepAddress = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        10
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        What is the address of the place?
      </h2>
    </div>

    <div className="max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => updateFormData({ street: e.target.value })}
            placeholder="Main Street"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number
          </label>
          <input
            type="text"
            value={formData.houseNumber}
            onChange={(e) => updateFormData({ houseNumber: e.target.value })}
            placeholder="123"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          placeholder="Amsterdam"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Postal code
        </label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => updateFormData({ postalCode: e.target.value })}
          placeholder="1012 AB"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>

    <p className="text-sm text-gray-500 text-center mt-6">
      ℹ️ Your full address stays private until you approve a guest.
    </p>
  </div>
);

const StepTitle = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        13
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Add a title for your listing
      </h2>
    </div>

    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => updateFormData({ title: e.target.value })}
        placeholder="e.g., Bright studio in city center"
        maxLength={60}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
      <div className="text-sm text-gray-500 mt-2 text-right">
        {formData.title.length}/60 characters
      </div>
    </div>

    <p className="text-sm text-gray-500 text-center mt-6">
      ℹ️ Keep it short and clear.
    </p>
  </div>
);

const StepDescription = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        14
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Describe your place
      </h2>
    </div>

    <div className="max-w-2xl mx-auto">
      <textarea
        value={formData.description}
        onChange={(e) => updateFormData({ description: e.target.value })}
        placeholder="Tell guests about your space, the neighborhood, nearby transport, and anything else they should know..."
        rows={8}
        maxLength={500}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
      <div className="text-sm text-gray-500 mt-2 text-right">
        {formData.description.length}/500 characters
      </div>
    </div>

    <p className="text-sm text-gray-500 text-center mt-6">
      ℹ️ Mention the space, area, transport, and anything important.
    </p>
  </div>
);
//       <function_calls>
// <invoke name="artifacts">
// <parameter name="command">update</parameter>
// <parameter name="id">updated-listing-form</parameter>
// <parameter name="old_str">      <div className="text-sm text-gray-500 mt-2 text-right">
// {formData.description.length}/500 characters
// </div></parameter>
// <parameter name="new_str">      <div className="text-sm text-gray-500 mt-2 text-right">
// {formData.description.length}/500 characters
// </div>
// </div>
// <p className="text-sm text-gray-500 text-center mt-6">
//   ℹ️ Mention the space, area, transport, and anything important.
// </p>
//   </div>
// );
const StepRoommates = ({ formData, updateFormData, errors }) => {
  const addRoommate = () => {
    updateFormData({
      roommatesCount: formData.roommatesCount + 1,
      roommates: [
        ...formData.roommates,
        { age: "", gender: "", occupation: "" },
      ],
    });
  };
  const updateRoommate = (index, field, value) => {
    const newRoommates = [...formData.roommates];
    newRoommates[index][field] = value;
    updateFormData({ roommates: newRoommates });
  };
  const removeRoommate = () => {
    if (formData.roommatesCount > 0) {
      updateFormData({
        roommatesCount: formData.roommatesCount - 1,
        roommates: formData.roommates.slice(0, -1),
      });
    }
  };
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          15
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          How many people live in the apartment now?
        </h2>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-6 mb-8">
          <button
            type="button"
            onClick={removeRoommate}
            disabled={formData.roommatesCount === 0}
            className="w-14 h-14 border-2 border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center text-2xl font-semibold transition-all disabled:opacity-30"
          >
            −
          </button>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">
              {formData.roommatesCount}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              roommate{formData.roommatesCount !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={addRoommate}
            className="w-14 h-14 border-2 border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center text-2xl font-semibold transition-all"
          >
            +
          </button>
        </div>

        {formData.roommates.map((roommate, index) => (
          <div
            key={index}
            className="p-6 border-2 border-gray-200 rounded-xl mb-4"
          >
            <h3 className="font-semibold text-gray-900 mb-4">
              Roommate {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                value={roommate.age}
                onChange={(e) => updateRoommate(index, "age", e.target.value)}
                placeholder="Age"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <select
                value={roommate.gender}
                onChange={(e) =>
                  updateRoommate(index, "gender", e.target.value)
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <input
                type="text"
                value={roommate.occupation}
                onChange={(e) =>
                  updateRoommate(index, "occupation", e.target.value)
                }
                placeholder="Occupation"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        ℹ️ Helps guests understand who they will live with.
      </p>
    </div>
  );
};
const StepAmenities = ({ formData, updateFormData, errors }) => {
  const amenitiesList = [
    "Heating",
    "Washing machine",
    "Dryer",
    "Wifi",
    "Dishwasher",
    "Oven",
    "Stove",
    "Microwave",
    "Elevator",
    "Balcony",
    "Storage room",
    "Bike storage",
    "Parking / Garage",
    "Garden access",
    "Wheelchair accessible",
  ];
  const toggleAmenity = (amenity) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      updateFormData({ amenities: current.filter((a) => a !== amenity) });
    } else {
      updateFormData({ amenities: [...current, amenity] });
    }
  };
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          16
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What amenities are available?
        </h2>
      </div>
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenitiesList.map((amenity) => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
              formData.amenities?.includes(amenity)
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-sm font-medium text-gray-900">{amenity}</span>
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        ℹ️ Select everything included.
      </p>
    </div>
  );
};
const StepPetPolicy = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        17
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Is your place pet-friendly?
      </h2>
    </div>
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
      {[
        { value: "Pets allowed", label: "Pets allowed", icon: "🐕" },
        { value: "No pets", label: "No pets", icon: "🚫" },
        { value: "Only small pets", label: "Only small pets", icon: "🐈" },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateFormData({ petPolicy: option.value })}
          className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
            formData.petPolicy === option.value
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{option.icon}</div>
            <div className="font-semibold text-gray-900 text-lg">
              {option.label}
            </div>
          </div>
        </button>
      ))}
    </div>

    <p className="text-sm text-gray-500 text-center mt-6">
      ℹ️ Choose what's allowed in your building.
    </p>
  </div>
);
const StepAboutYou = ({ formData, updateFormData, errors }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        18
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Tell us about yourself
      </h2>
    </div>
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          placeholder="Tell guests a bit about yourself..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University (optional)
        </label>
        <input
          type="text"
          value={formData.university}
          onChange={(e) => updateFormData({ university: e.target.value })}
          placeholder="e.g., University of Amsterdam"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company (optional)
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => updateFormData({ company: e.target.value })}
          placeholder="e.g., Google"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instagram (optional)
        </label>
        <input
          type="text"
          value={formData.instagram}
          onChange={(e) => updateFormData({ instagram: e.target.value })}
          placeholder="@username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn (optional)
        </label>
        <input
          type="text"
          value={formData.linkedin}
          onChange={(e) => updateFormData({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>

    <p className="text-sm text-gray-500 text-center mt-6">
      ℹ️ Guests feel safer when they know who the host is.
    </p>
  </div>
);
const StepPreview = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Listing</h2>
        <p className="text-gray-600">Check everything before publishing</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Property Overview */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Property Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-600">Type:</span> <span className="font-medium">{formData.propertyType}</span></div>
            <div><span className="text-gray-600">Offering:</span> <span className="font-medium">{formData.whatOffering}</span></div>
            <div><span className="text-gray-600">Furnishing:</span> <span className="font-medium">{formData.furnishing}</span></div>
            <div><span className="text-gray-600">Rental Type:</span> <span className="font-medium">{formData.rentalType}</span></div>
            <div><span className="text-gray-600">Registration:</span> <span className="font-medium">{formData.registration}</span></div>
            <div><span className="text-gray-600">Rooms:</span> <span className="font-medium">{formData.roomsOffered}/{formData.totalRooms}</span></div>
            <div><span className="text-gray-600">Bathrooms:</span> <span className="font-medium">{formData.bathrooms}</span></div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Location</h3>
          <p className="text-sm">{formData.street} {formData.houseNumber}, {formData.city} {formData.postalCode}</p>
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Pricing</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-600">Monthly Rent:</span> <span className="font-medium">€{formData.monthlyRent}</span></div>
            <div><span className="text-gray-600">Deposit:</span> <span className="font-medium">€{formData.deposit}</span></div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Photos ({formData.photos?.length || 0})</h3>
          <div className="grid grid-cols-4 gap-2">
            {formData.photos?.slice(0, 4).map((photo, idx) => (
              <img key={idx} src={photo} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Listing Details</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 text-sm">Title:</span>
              <p className="font-medium">{formData.title}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Description:</span>
              <p className="text-sm">{formData.description}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {formData.amenities?.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, idx) => (
                <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Main Form Component
export default function ListingForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "",
    whatOffering: "",
    furnishing: "",
    rentalType: "",
    registration: "",
    totalRooms: 1,
    roomsOffered: 1,
    bathrooms: 1,
    availabilityDates: [{ moveIn: "", moveOut: "" }],
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    monthlyRent: "",
    deposit: "",
    photos: [],
    title: "",
    description: "",
    roommatesCount: 0,
    roommates: [],
    amenities: [],
    petPolicy: "",
    bio: "",
    university: "",
    company: "",
    instagram: "",
    linkedin: "",
  });
  const [errors, setErrors] = useState({});
  const TOTAL_STEPS = 19;
  const steps = [
    { id: 1, component: StepPropertyType, title: "Property Type" },
    { id: 2, component: StepWhatOffering, title: "What Offering" },
    { id: 3, component: StepFurnishing, title: "Furnishing" },
    { id: 4, component: StepRentalType, title: "Rental Type" },
    { id: 5, component: StepRegistration, title: "Registration" },
    { id: 6, component: StepTotalRooms, title: "Total Rooms" },
    { id: 7, component: StepRoomsOffered, title: "Rooms Offered" },
    { id: 8, component: StepBathrooms, title: "Bathrooms" },
    { id: 9, component: StepAvailability, title: "Availability" },
    { id: 10, component: StepAddress, title: "Address" },
    { id: 11, component: StepRentDeposit, title: "Rent & Deposit" },
    { id: 12, component: StepPhotos, title: "Photos" },
    { id: 13, component: StepTitle, title: "Title" },
    { id: 14, component: StepDescription, title: "Description" },
    { id: 15, component: StepRoommates, title: "Roommates" },
    { id: 16, component: StepAmenities, title: "Amenities" },
    { id: 17, component: StepPetPolicy, title: "Pet Policy" },
    { id: 18, component: StepAboutYou, title: "About You" },
    { id: 19, component: StepPreview, title: "Review" }
  ];
  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    const newErrors = { ...errors };
    Object.keys(updates).forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };
  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.propertyType)
          newErrors.propertyType = "Please select a property type";
        break;
      case 2:
        if (!formData.whatOffering)
          newErrors.whatOffering = "Please select what you are offering";
        break;
      case 3:
        if (!formData.furnishing)
          newErrors.furnishing = "Please select furnishing status";
        break;
      case 4:
        if (!formData.rentalType)
          newErrors.rentalType = "Please select rental type";
        break;
      case 5:
        if (!formData.registration)
          newErrors.registration = "Please select registration option";
        break;
      case 6:
        if (!formData.totalRooms)
          newErrors.totalRooms = "Please select number of rooms";
        break;
      case 7:
        if (!formData.roomsOffered)
          newErrors.roomsOffered = "Please select rooms offered";
        break;
      case 8:
        if (!formData.bathrooms)
          newErrors.bathrooms = "Please select number of bathrooms";
        break;
      case 9:
        if (!formData.availabilityDates[0].moveIn)
          newErrors.moveIn = "Please select move-in date";
        if (!formData.availabilityDates[0].moveOut)
          newErrors.moveOut = "Please select move-out date";
        break;
      case 10:
        if (!formData.street) newErrors.street = "Street is required";
        if (!formData.houseNumber)
          newErrors.houseNumber = "House number is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.postalCode)
          newErrors.postalCode = "Postal code is required";
        break;
      case 11:
        if (!formData.monthlyRent)
          newErrors.monthlyRent = "Monthly rent is required";
        if (!formData.deposit) newErrors.deposit = "Deposit is required";
        break;
      case 12:
        if (formData.photos.length < 3)
          newErrors.photos = "Please add at least 3 photos";
        break;
      case 13:
        if (!formData.title || formData.title.trim().length < 10) {
          newErrors.title = "Title must be at least 10 characters";
        }
        break;
      case 14:
        if (!formData.description || formData.description.trim().length < 50) {
          newErrors.description = "Description must be at least 50 characters";
        }
        break;
      case 17:
        if (!formData.petPolicy)
          newErrors.petPolicy = "Please select a pet policy";
        break;
      case 18:
        if (!formData.bio || formData.bio.trim().length < 20) {
          newErrors.bio = "Please write at least 20 characters about yourself";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('Please log in to create a listing');
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      // Map your enhanced form fields to the API format
      const listingData = {
        // Map new fields to transformer-compatible format
        propertyType: formData.propertyType,
        whatOffering: formData.whatOffering,
        furnishing: formData.furnishing,
        rentalType: formData.rentalType,
        registration: formData.registration,
        
        totalRooms: formData.totalRooms,
        roomsOffered: formData.roomsOffered,
        bathrooms: formData.bathrooms,
        
        street: formData.street?.trim(),
        houseNumber: formData.houseNumber?.trim(),
        city: formData.city?.trim(),
        postalCode: formData.postalCode?.trim(),
        
        monthlyRent: formData.monthlyRent,
        deposit: formData.deposit,
        
        availabilityDates: formData.availabilityDates,
        available_from: formData.availabilityDates[0]?.moveIn,
        available_to: formData.availabilityDates[0]?.moveOut,
        
        photos: formData.photos || [],
        images: formData.photos || [],
        
        title: formData.title?.trim(),
        description: formData.description?.trim(),
        
        roommates: formData.roommates || [],
        amenities: formData.amenities || [],
        petPolicy: formData.petPolicy || 'No pets',
      };

      console.log('Submitting listing:', listingData);

      const result = await listingsAPI.create(listingData, user.id);
      
      if (result.error) {
        console.error('API Error:', result.error);
        toast.error(result.error.message || 'Failed to create listing');
        return;
      }

      toast.success('Listing created successfully!');
      navigate('/listings');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;
  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {TOTAL_STEPS}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 min-h-[500px]">
          {CurrentStepComponent && (
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md ${
                  loading ? "bg-green-400 cursor-not-allowed" : "hover:bg-green-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Publish Listing</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
