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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
            </div>
          </div>
          <p className="text-gray-400 font-medium">Checking your profile...</p>
        </div>
      </div>
    );
  }

  if (missingFields.length === 0) {
    return null; // Profile is complete
  }

  // Show incomplete profile warning
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30 shadow-lg shadow-blue-500/20">
            <AlertCircle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Complete your profile first
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed">
            Before creating your listing, please complete your profile. This helps build trust with potential guests and is required for verification.
          </p>
        </div>

        {/* Missing Fields List */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 text-blue-400" />
            Missing information:
          </h3>
          <div className="space-y-4">
            {missingFields.map((field, idx) => {
              const Icon = field.icon;
              return (
                <div key={idx} className="flex items-start p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="bg-blue-500/10 p-2 rounded-lg mr-4">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{field.label}</div>
                    <div className="text-sm text-gray-400">{field.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-8 mb-10">
          <h3 className="font-bold text-white text-lg mb-4">Why this matters:</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
              <span>Required for identity verification</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
              <span>Helps guests know who you are</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
              <span>Increases trust and booking rates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
              <span>Takes less than 2 minutes</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[ProfileCompletionCheck] Navigate button clicked');

              const serializableFields = missingFields.map(({ field, label, description }) => ({
                field,
                label,
                description
              }));

              try {
                navigate('/profile', {
                  state: {
                    returnTo: '/create-listing',
                    missingFields: serializableFields
                  }
                });
              } catch (error) {
                console.error('[ProfileCompletionCheck] Navigation error:', error);
              }
            }}
            className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
          >
            Complete my profile now
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full border border-white/10 text-gray-400 py-4 px-8 rounded-xl font-bold text-lg hover:bg-white/5 hover:text-white transition-all"
          >
            Back to dashboard
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Your profile information will be kept private and only shared with confirmed guests.
        </p>
      </div>
    </div>
  );
}