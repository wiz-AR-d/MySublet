/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {listingsAPI} from '../../services/api/listings';
import {toast} from 'sonner';
import {ChevronLeft, ChevronRight, Check, Home, Calendar, AlertCircle, CheckCircle, XCircle, Plus, X, Info, MapPin, Euro, Camera, FileText, Sparkles} from "lucide-react";
import {AMENITIES_LIST as amenitiesList} from '../../constants/amenities';
import CloudinaryImageUpload from "./CloudinaryImageUpload";

// FIXED: Better Rent Input Component
const StepRentDeposit = ({formData, updateFormData, errors}) => {
  const handleRentChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    updateFormData({monthlyRent: value});
  };

  const handleDepositChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    updateFormData({deposit: value});
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          11
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          How much is the monthly rent?
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Monthly rent (€)
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold group-focus-within:text-blue-400 transition-colors">
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={formData.monthlyRent}
              onChange={handleRentChange}
              placeholder="1200"
              className={`w-full pl-12 pr-6 py-5 bg-white/[0.03] border-2 rounded-2xl text-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none ${errors.monthlyRent ? "border-red-500/50" : "border-white/10"
                }`}
            />
          </div>
          {errors.monthlyRent && (
            <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.monthlyRent}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Deposit (€)
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold group-focus-within:text-blue-400 transition-colors">
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={formData.deposit}
              onChange={handleDepositChange}
              placeholder="1200"
              className={`w-full pl-12 pr-6 py-5 bg-white/[0.03] border-2 rounded-2xl text-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none ${errors.deposit ? "border-red-500/50" : "border-white/10"
                }`}
            />
          </div>
          {errors.deposit && (
            <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.deposit}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Enter the total monthly rent including utilities. The deposit is
          usually one month's rent or more.
        </p>
      </div>
    </div>
  );
};

// FIXED: Working Photos Component with Cloudinary
const StepPhotos = ({formData, updateFormData, errors}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          12
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Add photos of your place
        </h2>
        <p className="text-gray-400 text-lg">Upload at least 3 clear photos</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <CloudinaryImageUpload
          images={formData.photos || []}
          onImagesChange={(images) => updateFormData({photos: images})}
          maxImages={10}
        />

        {errors.photos && (
          <p className="mt-6 text-sm text-red-400 font-medium text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.photos}
          </p>
        )}
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          First photo will be the cover image. Drag to reorder. High quality photos increase your chances of finding a guest!
        </p>
      </div>
    </div>
  );
};

// Keep all other step components the same...
const StepPropertyType = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        1
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        What are you subleasing?
      </h2>
      <p className="text-gray-400 text-lg">Is your property an apartment or house?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {[
        {value: "Apartment", label: "Apartment", icon: "🏢"},
        {value: "Shared apartment", label: "Shared apartment", icon: "🏘️"},
        {value: "Studio", label: "Studio", icon: "🏠"},
        {value: "House", label: "House", icon: "🏡"},
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({propertyType: type.value})}
          className={`group p-8 border-2 rounded-3xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${formData.propertyType === type.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
          <div className={`font-bold text-lg transition-colors ${formData.propertyType === type.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>{type.label}</div>
        </button>
      ))}
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <AlertCircle className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        Choose the option that best matches your place. This helps guests filter for their preferred home style.
      </p>
    </div>
  </div>
);

const StepWhatOffering = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        2
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        What type of place?
      </h2>
      <p className="text-gray-400 text-lg">
        Just your bedroom, or your entire apartment?
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {[
        {value: "Private bedroom", label: "Private bedroom", icon: "🛏️"},
        {value: "Entire place", label: "Entire place", icon: "🏠"},
      ].map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => updateFormData({whatOffering: type.value})}
          className={`group p-8 border-2 rounded-3xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${formData.whatOffering === type.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
          <div className={`font-bold text-lg transition-colors ${formData.whatOffering === type.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>{type.label}</div>
        </button>
      ))}
    </div>
  </div>
);

const StepFurnishing = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        3
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Is it furnished?
      </h2>
      <p className="text-gray-400 text-lg">Let your guest know what to expect</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {[
        {
          value: "Move-in ready",
          label: "Move-in ready",
          desc: "Fully equipped with essentials included",
          icon: <Home className="w-10 h-10 mx-auto" />,
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
          onClick={() => updateFormData({furnishing: type.value})}
          className={`group p-8 border-2 rounded-3xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center ${formData.furnishing === type.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform ${typeof type.icon !== 'string' ? 'text-blue-400' : ''}`}>{type.icon}</div>
          <div className={`font-bold text-lg mb-2 transition-colors ${formData.furnishing === type.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>{type.label}</div>
          <div className="text-sm text-gray-500 leading-relaxed">{type.desc}</div>
        </button>
      ))}
    </div>
  </div>
);

const StepRentalType = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        4
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        What type of rental is this?
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
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
          onClick={() => updateFormData({rentalType: type.value})}
          className={`group p-8 border-2 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${formData.rentalType === type.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl group-hover:scale-110 transition-transform">{type.icon}</div>
            <div>
              <div className={`font-bold text-xl mb-2 transition-colors ${formData.rentalType === type.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                {type.label}
              </div>
              <div className="text-sm text-gray-500 leading-relaxed">{type.desc}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const StepRegistration = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        5
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Is registration possible at this address?
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
      {[
        {value: "Yes", label: "Yes, registration is possible", icon: <CheckCircle className="w-8 h-8 text-green-500" />},
        {value: "No", label: "No, registration is not possible", icon: <XCircle className="w-8 h-8 text-red-500" />},
        {value: "Long stay only", label: "Only for long stay", icon: "📅"},
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateFormData({registration: option.value})}
          className={`group p-8 border-2 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${formData.registration === option.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl group-hover:scale-110 transition-transform">{option.icon}</div>
            <div className={`font-bold text-xl transition-colors ${formData.registration === option.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
              {option.label}
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        Registration is important for guests who need official address documents for residency or banking.
      </p>
    </div>
  </div>
);

const StepTotalRooms = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        6
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        How many rooms does the place have?
      </h2>
    </div>

    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => updateFormData({totalRooms: num})}
          className={`group p-6 border-2 rounded-2xl text-center transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] ${formData.totalRooms === num
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className={`text-3xl font-bold transition-colors ${formData.totalRooms === num ? "text-white" : "text-gray-400 group-hover:text-white"}`}>{num}</div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
            room{num > 1 ? "s" : ""}
          </div>
        </button>
      ))}
    </div>

    <button
      type="button"
      onClick={() => updateFormData({totalRooms: 7})}
      className={`w-full max-w-xs mx-auto block p-5 border-2 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${formData.totalRooms >= 7
        ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
        }`}
    >
      <div className={`font-bold text-lg transition-colors ${formData.totalRooms >= 7 ? "text-white" : "text-gray-300 hover:text-white"}`}>6+ rooms</div>
    </button>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Count all main living rooms and bedrooms.
      </p>
    </div>
  </div>
);

const StepRoomsOffered = ({formData, updateFormData, errors}) => {
  const maxRooms = formData.totalRooms || 1;
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          7
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          How many rooms are you offering?
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {Array.from({length: maxRooms}, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => updateFormData({roomsOffered: num})}
            className={`group p-6 border-2 rounded-2xl text-center transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] ${formData.roomsOffered === num
              ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
          >
            <div className={`text-3xl font-bold transition-colors ${formData.roomsOffered === num ? "text-white" : "text-gray-400 group-hover:text-white"}`}>{num}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
              room{num > 1 ? "s" : ""}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
          Choose how many rooms the guest can use.
        </p>
      </div>
    </div>
  );
};

const StepBathrooms = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        8
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        How many bathrooms are there?
      </h2>
    </div>

    <div className="flex items-center justify-center space-x-10">
      <button
        type="button"
        onClick={() =>
          updateFormData({bathrooms: Math.max(1, formData.bathrooms - 1)})
        }
        className="w-16 h-16 border-2 border-white/10 rounded-full hover:bg-white/5 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90"
      >
        −
      </button>
      <div className="text-center">
        <div className="text-7xl font-bold text-white tracking-tighter">
          {formData.bathrooms}
        </div>
        <div className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">
          bathroom{formData.bathrooms !== 1 ? "s" : ""}
        </div>
      </div>
      <button
        type="button"
        onClick={() => updateFormData({bathrooms: formData.bathrooms + 1})}
        className="w-16 h-16 border-2 border-white/10 rounded-full hover:bg-white/5 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90"
      >
        +
      </button>
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Include full bathrooms and shower rooms.
      </p>
    </div>
  </div>
);

const StepAvailability = ({formData, updateFormData, errors}) => {
  const addDateRange = () => {
    updateFormData({
      availabilityDates: [
        ...formData.availabilityDates,
        {moveIn: "", moveOut: ""},
      ],
    });
  };

  const updateDateRange = (index, field, value) => {
    const newDates = [...formData.availabilityDates];
    newDates[index][field] = value;
    updateFormData({availabilityDates: newDates});
  };

  const removeDateRange = (index) => {
    const newDates = formData.availabilityDates.filter((_, i) => i !== index);
    updateFormData({availabilityDates: newDates});
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          9
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          When is your place available?
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {formData.availabilityDates.map((dateRange, index) => (
          <div key={index} className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl relative group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  Move-in date
                </label>
                <input
                  type="date"
                  value={dateRange.moveIn}
                  onChange={(e) =>
                    updateDateRange(index, "moveIn", e.target.value)
                  }
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  Move-out date
                </label>
                <input
                  type="date"
                  value={dateRange.moveOut}
                  onChange={(e) =>
                    updateDateRange(index, "moveOut", e.target.value)
                  }
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>
            {formData.availabilityDates.length > 1 && (
              <button
                type="button"
                onClick={() => removeDateRange(index)}
                className="mt-4 text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" /> Remove this date range
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addDateRange}
          className="w-full p-5 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/5 transition-all font-bold flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add another date range
        </button>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
          You can add multiple availability windows.
        </p>
      </div>
    </div>
  );
};

const StepAddress = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        10
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        What is the address of the place?
      </h2>
    </div>

    <div className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Street
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => updateFormData({street: e.target.value})}
            placeholder="Main Street"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Number
          </label>
          <input
            type="text"
            value={formData.houseNumber}
            onChange={(e) => updateFormData({houseNumber: e.target.value})}
            placeholder="123"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => updateFormData({city: e.target.value})}
          placeholder="Amsterdam"
          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Postal code
        </label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => updateFormData({postalCode: e.target.value})}
          placeholder="1012 AB"
          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
        />
      </div>
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Your full address stays private until you approve a guest.
      </p>
    </div>
  </div>
);

const StepTitle = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        13
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Add a title for your listing
      </h2>
    </div>

    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => updateFormData({title: e.target.value})}
        placeholder="e.g., Bright studio in city center"
        maxLength={60}
        className={`w-full px-6 py-5 bg-white/[0.03] border-2 rounded-2xl text-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none ${errors.title ? "border-red-500/50" : "border-white/10"}`}
      />
      <div className="flex justify-between mt-3 px-2">
        {errors.title ? (
          <p className="text-sm text-red-400 font-medium flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.title}
          </p>
        ) : <div />}
        <div className={`text-sm font-medium ${formData.title.length > 50 ? 'text-orange-400' : 'text-gray-500'}`}>
          {formData.title.length}/60 characters
        </div>
      </div>
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Keep it short, clear, and catchy. Mention the best feature!
      </p>
    </div>
  </div>
);

const StepDescription = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        14
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Describe your place
      </h2>
    </div>

    <div className="max-w-2xl mx-auto">
      <textarea
        value={formData.description}
        onChange={(e) => updateFormData({description: e.target.value})}
        placeholder="Tell guests about your space, the neighborhood, nearby transport, and anything else they should know..."
        rows={8}
        maxLength={500}
        className={`w-full px-6 py-5 bg-white/[0.03] border-2 rounded-2xl text-lg text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none ${errors.description ? "border-red-500/50" : "border-white/10"}`}
      />
      <div className="flex justify-between mt-3 px-2">
        {errors.description ? (
          <p className="text-sm text-red-400 font-medium flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.description}
          </p>
        ) : <div />}
        <div className={`text-sm font-medium ${formData.description.length > 450 ? 'text-orange-400' : 'text-gray-500'}`}>
          {formData.description.length}/500 characters
        </div>
      </div>
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Mention the space, area, transport, and anything important.
      </p>
    </div>
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
const StepRoommates = ({formData, updateFormData, errors}) => {
  const addRoommate = () => {
    updateFormData({
      roommatesCount: formData.roommatesCount + 1,
      roommates: [
        ...formData.roommates,
        {age: "", gender: "", occupation: ""},
      ],
    });
  };
  const updateRoommate = (index, field, value) => {
    const newRoommates = [...formData.roommates];
    newRoommates[index][field] = value;
    updateFormData({roommates: newRoommates});
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
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          15
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          How many people live in the apartment now?
        </h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-10 mb-12">
          <button
            type="button"
            onClick={removeRoommate}
            disabled={formData.roommatesCount === 0}
            className="w-16 h-16 border-2 border-white/10 rounded-full hover:bg-white/5 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed"
          >
            −
          </button>
          <div className="text-center">
            <div className="text-7xl font-bold text-white tracking-tighter">
              {formData.roommatesCount}
            </div>
            <div className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">
              roommate{formData.roommatesCount !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={addRoommate}
            className="w-16 h-16 border-2 border-white/10 rounded-full hover:bg-white/5 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90"
          >
            +
          </button>
        </div>

        <div className="space-y-4">
          {formData.roommates.map((roommate, index) => (
            <div
              key={index}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl animate-fade-in-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                Roommate Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="number"
                  value={roommate.age}
                  onChange={(e) => updateRoommate(index, "age", e.target.value)}
                  placeholder="Age"
                  className="px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                />
                <select
                  value={roommate.gender}
                  onChange={(e) =>
                    updateRoommate(index, "gender", e.target.value)
                  }
                  className="px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
                >
                  <option value="" className="bg-neutral-900">Gender</option>
                  <option value="Male" className="bg-neutral-900">Male</option>
                  <option value="Female" className="bg-neutral-900">Female</option>
                  <option value="Non-binary" className="bg-neutral-900">Non-binary</option>
                  <option value="Prefer not to say" className="bg-neutral-900">Prefer not to say</option>
                </select>
                <input
                  type="text"
                  value={roommate.occupation}
                  onChange={(e) =>
                    updateRoommate(index, "occupation", e.target.value)
                  }
                  placeholder="Occupation"
                  className="px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
          Helps guests understand who they will live with.
        </p>
      </div>
    </div>
  );
};
const StepAmenities = ({formData, updateFormData, errors}) => {
  const [newAmenity, setNewAmenity] = useState("");

  const toggleAmenity = (amenity) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      updateFormData({amenities: current.filter((a) => a !== amenity)});
    } else {
      updateFormData({amenities: [...current, amenity]});
    }
  };

  const addCustomAmenity = () => {
    if (!newAmenity.trim()) return;
    const amenityToAdd = newAmenity.trim();
    const current = formData.amenities || [];

    const existsInStandard = amenitiesList.some(a => a.toLowerCase() === amenityToAdd.toLowerCase());
    const existsInCurrent = current.some(a => a.toLowerCase() === amenityToAdd.toLowerCase());

    if (!existsInStandard && !existsInCurrent) {
      updateFormData({amenities: [...current, amenityToAdd]});
    } else if (existsInStandard && !current.includes(amenitiesList.find(a => a.toLowerCase() === amenityToAdd.toLowerCase()))) {
      toggleAmenity(amenitiesList.find(a => a.toLowerCase() === amenityToAdd.toLowerCase()));
    }

    setNewAmenity("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAmenity();
    }
  };

  const removeCustomAmenity = (amenity) => {
    toggleAmenity(amenity);
  };

  const customAmenities = (formData.amenities || []).filter(
    (a) => !amenitiesList.includes(a)
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          16
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          What amenities are available?
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {amenitiesList.map((amenity) => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`p-5 border-2 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group ${formData.amenities?.includes(amenity)
              ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
          >
            <span className={`text-sm font-bold transition-colors ${formData.amenities?.includes(amenity) ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
              {amenity}
            </span>
            {formData.amenities?.includes(amenity) && <Check className="w-4 h-4 text-blue-400" />}
          </button>
        ))}

        {customAmenities.map((amenity) => (
          <div
            key={amenity}
            className="p-5 border-2 border-blue-500 bg-blue-500/10 rounded-2xl flex items-center justify-between group relative"
          >
            <span className="text-sm font-bold text-white pr-6 break-words">{amenity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCustomAmenity(amenity);
              }}
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-300 p-1"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div className="p-5 border-2 border-dashed border-white/10 rounded-2xl flex items-center space-x-2 bg-white/[0.01] focus-within:border-blue-500 focus-within:bg-blue-500/5 transition-all">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Other..."
            className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm text-white placeholder-gray-600 min-w-0 font-medium"
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            disabled={!newAmenity.trim()}
            className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
          Select everything included. Add custom ones if missing.
        </p>
      </div>
    </div>
  );
};
const StepPetPolicy = ({formData, updateFormData, errors}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        17
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Is your place pet-friendly?
      </h2>
    </div>
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
      {[
        {value: "Pets allowed", label: "Pets allowed", icon: "🐕"},
        {value: "No pets", label: "No pets", icon: "🚫"},
        {value: "Only small pets", label: "Only small pets", icon: "🐈"},
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateFormData({petPolicy: option.value})}
          className={`group p-8 border-2 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${formData.petPolicy === option.value
            ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl group-hover:scale-110 transition-transform">{option.icon}</div>
            <div className={`font-bold text-xl transition-colors ${formData.petPolicy === option.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
              {option.label}
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Choose what's allowed in your building.
      </p>
    </div>
  </div>
);
const StepAboutYou = ({formData, updateFormData, errors, autoFilled = false}) => (
  <div className="space-y-8">
    <div className="text-center mb-10">
      <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
        18
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Tell us about yourself
      </h2>
      {autoFilled && (
        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-blue-400 font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>Pre-filled from your profile</span>
        </div>
      )}
    </div>
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Short bio {autoFilled && <span className="text-blue-400 text-xs normal-case">(from profile)</span>}
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData({bio: e.target.value})}
          placeholder="Tell guests a bit about yourself..."
          rows={4}
          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            University {autoFilled && formData.university && <span className="text-blue-400 text-xs normal-case">(from profile)</span>}
          </label>
          <input
            type="text"
            value={formData.university}
            onChange={(e) => updateFormData({university: e.target.value})}
            placeholder="e.g., University of Amsterdam"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Company {autoFilled && formData.company && <span className="text-blue-400 text-xs normal-case">(from profile)</span>}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateFormData({company: e.target.value})}
            placeholder="e.g., Google"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Instagram {autoFilled && formData.instagram && <span className="text-blue-400 text-xs normal-case">(from profile)</span>}
          </label>
          <input
            type="text"
            value={formData.instagram}
            onChange={(e) => updateFormData({instagram: e.target.value})}
            placeholder="@username"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            LinkedIn {autoFilled && formData.linkedin && <span className="text-blue-400 text-xs normal-case">(from profile)</span>}
          </label>
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) => updateFormData({linkedin: e.target.value})}
            placeholder="linkedin.com/in/username"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>
    </div>

    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-2xl mx-auto flex items-start gap-3">
      <div className="bg-blue-500/10 p-1.5 rounded-lg">
        <Info className="w-4 h-4 text-blue-400" />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed text-center w-full">
        Guests feel safer when they know who the host is. You can edit any pre-filled information.
      </p>
    </div>
  </div>
);
const StepPreview = ({formData}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Review Your Listing</h2>
        <p className="text-gray-400 text-lg">Check everything before publishing</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Property Overview */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-400" />
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Type</span>
              <span className="font-bold text-gray-200">{formData.propertyType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Offering</span>
              <span className="font-bold text-gray-200">{formData.whatOffering}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Furnishing</span>
              <span className="font-bold text-gray-200">{formData.furnishing}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Rental Type</span>
              <span className="font-bold text-gray-200">{formData.rentalType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Registration</span>
              <span className="font-bold text-gray-200">{formData.registration}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Rooms</span>
              <span className="font-bold text-gray-200">{formData.roomsOffered}/{formData.totalRooms}</span>
            </div>
          </div>
        </div>

        {/* Location & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Location
            </h3>
            <p className="text-gray-300 font-medium leading-relaxed">
              {formData.street} {formData.houseNumber}<br />
              {formData.city} {formData.postalCode}
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Euro className="w-5 h-5 text-blue-400" />
              Pricing
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Monthly Rent</span>
                <span className="text-2xl font-bold text-white">€{formData.monthlyRent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Deposit</span>
                <span className="text-xl font-bold text-gray-300">€{formData.deposit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Photos ({formData.photos?.length || 0})
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {formData.photos?.map((photo, idx) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                <img src={photo} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Listing Details
          </h3>
          <div className="space-y-6">
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Title</span>
              <p className="text-xl font-bold text-white leading-tight">{formData.title}</p>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</span>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{formData.description}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {formData.amenities?.length > 0 && (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Amenities
            </h3>
            <div className="flex flex-wrap gap-3">
              {formData.amenities.map((amenity, idx) => (
                <span key={idx} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-sm font-bold">
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
export default function ListingForm({
  autoFillFromProfile = false, 
  allowDraft = false, 
  verificationPending = false,
  initialData = null,
  isEdit = false
}) {
  const navigate = useNavigate();
  const {user, profile} = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [autoFilledFields, setAutoFilledFields] = useState(false);

  // Initialize form data - will be populated from profile if autoFillFromProfile is true
  const [formData, setFormData] = useState(initialData || {
    propertyType: "",
    whatOffering: "",
    furnishing: "",
    rentalType: "",
    registration: "",
    totalRooms: 1,
    roomsOffered: 1,
    bathrooms: 1,
    availabilityDates: [{moveIn: "", moveOut: ""}],
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

  // Auto-fill from profile on mount
  useEffect(() => {
    if (autoFillFromProfile && profile && !autoFilledFields) {
      const updates = {};

      // Auto-fill personal information
      if (profile.bio) updates.bio = profile.bio;
      if (profile.university) updates.university = profile.university;
      if (profile.company) updates.company = profile.company;
      if (profile.instagram) updates.instagram = profile.instagram;
      if (profile.linkedin) updates.linkedin = profile.linkedin;

      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({...prev, ...updates}));
        setAutoFilledFields(true);

        toast.success('Profile information pre-filled! You can edit any field.', {
          duration: 4000,
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        });
      }
    }
  }, [autoFillFromProfile, profile, autoFilledFields]);

  const [errors, setErrors] = useState({});
  const TOTAL_STEPS = 19;

  const steps = [
    {id: 1, component: StepPropertyType, title: "Property Type"},
    {id: 2, component: StepWhatOffering, title: "What Offering"},
    {id: 3, component: StepFurnishing, title: "Furnishing"},
    {id: 4, component: StepRentalType, title: "Rental Type"},
    {id: 5, component: StepRegistration, title: "Registration"},
    {id: 6, component: StepTotalRooms, title: "Total Rooms"},
    {id: 7, component: StepRoomsOffered, title: "Rooms Offered"},
    {id: 8, component: StepBathrooms, title: "Bathrooms"},
    {id: 9, component: StepAvailability, title: "Availability"},
    {id: 10, component: StepAddress, title: "Address"},
    {id: 11, component: StepRentDeposit, title: "Rent & Deposit"},
    {id: 12, component: StepPhotos, title: "Photos"},
    {id: 13, component: StepTitle, title: "Title"},
    {id: 14, component: StepDescription, title: "Description"},
    {id: 15, component: StepRoommates, title: "Roommates"},
    {id: 16, component: StepAmenities, title: "Amenities"},
    {id: 17, component: StepPetPolicy, title: "Pet Policy"},
    {id: 18, component: StepAboutYou, title: "About You"},
    {id: 19, component: StepPreview, title: "Review"}
  ];

  const updateFormData = (updates) => {
    setFormData((prev) => ({...prev, ...updates}));
    const newErrors = {...errors};
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
        if (!formData.title || formData.title.trim().length === 0) {
          newErrors.title = "Title is required";
        }
        break;
      case 14:
        if (!formData.description || formData.description.trim().length === 0) {
          newErrors.description = "Description is required";
        }
        break;
      case 17:
        if (!formData.petPolicy)
          newErrors.petPolicy = "Please select a pet policy";
        break;
      case 18:
        if (!formData.bio || formData.bio.trim().length === 0) {
          newErrors.bio = "Please write something about yourself";
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
        window.scrollTo({top: 0, behavior: "smooth"});
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  };

  const handleSubmit = async (isDraft = false) => {
    console.log('[ListingForm] handleSubmit called, isDraft:', isDraft);
    console.log('[ListingForm] User:', user?.id);
    console.log('[ListingForm] Profile verificationStatus:', profile?.verificationStatus);

    if (!user?.id) {
      toast.error('Please log in to create a listing');
      navigate('/login');
      return;
    }

    // Check if user is verified for publishing
    const isVerified = profile?.verificationStatus === 'approved' || profile?.verificationStatus === 'verified';
    console.log('[ListingForm] isVerified:', isVerified);

    if (!isDraft && !isVerified) {
      toast.error('You must be verified to publish listings');
      setLoading(false);
      return;
    }

    console.log('[ListingForm] Starting submission...');
    setLoading(true);

    try {
      // Map form data to API format
      const listingData = {
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

        // Status logic:
        // - Verified users: 'active' if publishing, 'cancelled' if saving as draft
        // - Unverified users: always 'pending' (waiting for verification)
        status: isDraft ? 'cancelled' : (isVerified ? 'active' : 'pending'),
        verification_status: isVerified ? 'approved' : 'pending'
      };

      console.log('[ListingForm] Computed status:', listingData.status);
      console.log('[ListingForm] isDraft:', isDraft, 'isVerified:', isVerified);
      console.log('[ListingForm] Submitting listing data:', listingData);

      // Add timeout protection
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out after 30 seconds')), 30000)
      );

      let result;
      if (isEdit && initialData?.id) {
        result = await Promise.race([
          listingsAPI.update(initialData.id, listingData, user.id),
          timeoutPromise
        ]);
      } else {
        result = await Promise.race([
          listingsAPI.create(listingData, user.id),
          timeoutPromise
        ]);
      }

      console.log('[ListingForm] API call completed, result:', result);

      if (result.error) {
        console.error('[ListingForm] API Error:', result.error);
        toast.error(result.error.message || 'Failed to create listing');
        setLoading(false);
        return;
      }

      console.log('[ListingForm] Listing created successfully!', result.data);

      // Success messages and navigation
      if (isEdit) {
        toast.success('Listing updated successfully!');
        navigate('/my-listings');
      } else if (isDraft) {
        toast.success('Listing saved as draft!');
        navigate('/my-listings');
      } else if (isVerified) {
        toast.success('🎉 Listing published successfully!');
        navigate('/my-listings');
      } else {
        toast.success("Listing created! It will be published once you're verified.");
        navigate('/my-listings');
      }

    } catch (error) {
      console.error('[ListingForm] Catch block - Error:', error);
      console.error('[ListingForm] Error stack:', error.stack);
      toast.error(error.message || 'An error occurred while creating the listing');
      setLoading(false);
    } finally {
      console.log('[ListingForm] Finally block - setting loading to false');
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;
  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  // Verification warning banner
  const showVerificationWarning = verificationPending || (profile?.verificationStatus === 'pending');

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification Warning */}
        {showVerificationWarning && (
          <div className="mb-10 bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-2 rounded-xl">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Verification Pending</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your listing will be saved but won't be published until your identity is verified.
                  We'll automatically publish it once approved!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Progress</span>
              <span className="text-2xl font-black text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Step</span>
              <span className="text-xl font-bold text-gray-300">{currentStep} <span className="text-gray-600">/ {TOTAL_STEPS}</span></span>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3 p-0.5 border border-white/5">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              style={{width: `${progressPercentage}%`}}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-16 min-h-[600px] relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {CurrentStepComponent && (
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                autoFilled={autoFilledFields && currentStep === 18}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-20 pt-10 border-t border-white/5">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all ${currentStep === 1
                  ? "opacity-0 pointer-events-none"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              {currentStep < TOTAL_STEPS ? (
                <button
                  onClick={handleNext}
                  className="w-full md:w-auto flex items-center justify-center space-x-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  {allowDraft && (
                    <button
                      onClick={() => handleSubmit(true)}
                      disabled={loading}
                      className="px-8 py-5 border-2 border-white/10 text-gray-300 rounded-2xl font-bold hover:bg-white/5 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save as draft
                    </button>
                  )}
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={loading}
                    className={`flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-green-500 hover:to-emerald-500"
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
                        <span>{verificationPending ? 'Create listing' : 'Publish listing'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
