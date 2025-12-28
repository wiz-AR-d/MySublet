// src/components/profile/ProfileCompletionCheck.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usersAPI } from '../../services/api/users';
import { AlertCircle, CheckCircle, User, Phone, FileText } from 'lucide-react';

export default function ProfileCompletionCheck({ onComplete, onIncomplete }) {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    checkProfileCompletion();
  }, [user, profile]);

  const checkProfileCompletion = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Use profile from auth hook directly
    if (!profile) {
      setLoading(true);
      return;
    }

    // Check required fields (using camelCase properties from transformed profile)
    const required = [];
    
    if (!profile.fullName || profile.fullName.trim().length === 0) {
      required.push({
        field: 'full_name',
        label: 'Full Name',
        icon: User,
        description: 'Your full name as it appears on your ID'
      });
    }
    
    if (!profile.phone || profile.phone.trim().length === 0) {
      required.push({
        field: 'phone',
        label: 'Phone Number',
        icon: Phone,
        description: 'A valid phone number to contact you'
      });
    }
    
    if (!profile.bio || profile.bio.trim().length === 0) {
      required.push({
        field: 'bio',
        label: 'Bio',
        icon: FileText,
        description: 'A short description about yourself'
      });
    }

    setMissingFields(required);
    setLoading(false);

    if (required.length === 0) {
      onComplete?.();
    } else {
      onIncomplete?.(required.map(f => f.label));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Checking your profile...</p>
        </div>
      </div>
    );
  }

  if (missingFields.length === 0) {
    return null; // Profile is complete
  }

  // Show incomplete profile warning
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Complete your profile first
          </h1>
          
          <p className="text-base text-gray-600">
            Before creating your listing, please complete your profile. This helps build trust with potential guests and is required for verification.
          </p>
        </div>

        {/* Missing Fields List */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            Missing information:
          </h3>
          <div className="space-y-3">
            {missingFields.map((field, idx) => {
              const Icon = field.icon;
              return (
                <div key={idx} className="flex items-start p-3 bg-white rounded-lg border border-orange-100">
                  <Icon className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{field.label}</div>
                    <div className="text-sm text-gray-600">{field.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Why this matters:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Required for identity verification</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Helps guests know who you are</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Increases trust and booking rates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Takes less than 2 minutes</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[ProfileCompletionCheck] Navigate button clicked');
              
              // Filter out non-serializable data (React components) from missingFields
              const serializableFields = missingFields.map(({ field, label, description }) => ({
                field,
                label,
                description
              }));
              
              console.log('[ProfileCompletionCheck] Serializable fields:', serializableFields);
              console.log('[ProfileCompletionCheck] Navigating to /profile');
              
              try {
                navigate('/profile', { 
                  state: { 
                    returnTo: '/create-listing', 
                    missingFields: serializableFields 
                  } 
                });
                console.log('[ProfileCompletionCheck] Navigate called successfully');
              } catch (error) {
                console.error('[ProfileCompletionCheck] Navigation error:', error);
              }
            }}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-orange-600 transition-colors shadow-md"
          >
            Complete my profile now
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to dashboard
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your profile information will be kept private and only shared with confirmed guests.
        </p>
      </div>
    </div>
  );
}