import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { listingsAPI } from '../../services/api/listings';
import { useListingStore } from '../../store/listingStore';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

// Step Components
import StepBasicInfo from './ListingFormSteps/StepBasicInfo';
import StepLocation from './ListingFormSteps/StepLocation';
import StepPropertyDetails from './ListingFormSteps/StepPropertyDetails';
import StepPricing from './ListingFormSteps/StepPricing';
import StepImages from './ListingFormSteps/StepImages';
import StepReview from './ListingFormSteps/StepReview';

const STEPS = [
  { id: 1, title: 'Basic Info', component: StepBasicInfo },
  { id: 2, title: 'Location', component: StepLocation },
  { id: 3, title: 'Property Details', component: StepPropertyDetails },
  { id: 4, title: 'Pricing', component: StepPricing },
  { id: 5, title: 'Images', component: StepImages },
  { id: 6, title: 'Review', component: StepReview },
];

export default function ListingForm() {
  const navigate = useNavigate();
  const { user, isSublessor } = useAuth();
  const { fetchListings } = useListingStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    roomType: 'Entire home',
    
    // Location
    address: '',
    city: '',
    state: '',
    zip_code: '',
    coordinates: null,
    
    // Property Details
    bedrooms: 1,
    bathrooms: 1,
    square_feet: '',
    amenities: [],
    petPolicy: 'No pets',
    house_rules: '',
    
    // Pricing
    price_per_month: '',
    available_from: '',
    available_to: '',
    
    // Images
    images: [],
  });

  const [errors, setErrors] = useState({});

  // Redirect if not sublessor
  if (!user && !loading) {
    navigate('/login');
    return null;
  }

  if (user && !isSublessor()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            Only sublessors can create listings. Please update your profile role to sublessor.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        break;
      case 3:
        if (!formData.bedrooms && formData.bedrooms !== 0) newErrors.bedrooms = 'Number of bedrooms is required';
        if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
        break;
      case 4:
        if (!formData.price_per_month) newErrors.price_per_month = 'Price per month is required';
        if (!formData.available_from) newErrors.available_from = 'Available from date is required';
        if (!formData.available_to) newErrors.available_to = 'Available to date is required';
        if (new Date(formData.available_to) <= new Date(formData.available_from)) {
          newErrors.available_to = 'End date must be after start date';
        }
        break;
      case 5:
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      toast.error('Please fix the errors before submitting.');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Submitting listing with formData:', formData);
      console.log('User ID:', user?.id);

      // Transform data to app format for the transformer
      // Use the direct fields since we already have them parsed
      const listingData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: `${formData.address}, ${formData.city}, ${formData.state}${formData.zip_code ? ` ${formData.zip_code}` : ''}`.trim(),
        coordinates: formData.coordinates || null, // Let transformer handle default
        price: parseFloat(formData.price_per_month),
        bedrooms: formData.bedrooms === 0 ? 'SL' : formData.bedrooms,
        bathrooms: parseFloat(formData.bathrooms),
        roommates: 1, // Default
        images: formData.images || [],
        amenities: formData.amenities || [],
        petPolicy: formData.petPolicy || 'No pets',
        roomType: formData.roomType || 'Entire home',
        available_from: formData.available_from,
        available_to: formData.available_to,
        square_feet: formData.square_feet ? parseInt(formData.square_feet) : null,
        house_rules: formData.house_rules?.trim() || null,
        // Pass these directly so transformer uses them
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zip_code?.trim() || '',
      };

      console.log('Transformed listingData:', listingData);

      if (!user?.id) {
        throw new Error('User not authenticated. Please log in again.');
      }

      const result = await listingsAPI.create(listingData, user.id);
      
      console.log('API Response:', result);

      if (result.error) {
        console.error('API Error:', result.error);
        // Handle Supabase errors more gracefully
        let errorMessage = 'Failed to create listing. ';
        
        if (result.error.message) {
          errorMessage += result.error.message;
        } else if (result.error.code) {
          errorMessage += `Database error: ${result.error.code}`;
          if (result.error.hint) {
            errorMessage += `. ${result.error.hint}`;
          }
        } else {
          errorMessage += 'Please check your connection and try again.';
        }
        
        toast.error(errorMessage);
        return; // Exit early on error
      }

      if (!result.data) {
        toast.error('No data returned from server. Please try again.');
        return;
      }

      console.log('Listing created successfully:', result.data);
      toast.success('Listing created successfully! Your listing is now live!');
      
      // Navigate to listings page
      navigate('/listings');
      
      // Refresh listings after navigation to include the new listing
      // Small delay to ensure navigation completes first
      setTimeout(() => {
        fetchListings();
      }, 300);
    } catch (error) {
      console.error('Unexpected error creating listing:', error);
      const errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 mt-1">
              {currentStep === 1 && 'Tell us about your place'}
              {currentStep === 2 && 'Where is your property located?'}
              {currentStep === 3 && 'What features does your property have?'}
              {currentStep === 4 && 'Set your pricing and availability'}
              {currentStep === 5 && 'Add photos of your property'}
              {currentStep === 6 && 'Review and publish your listing'}
            </p>
          </div>

          {/* Step Content */}
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'hover:bg-green-700'
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
