// src/pages/CreateListing.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ListingForm from '../components/listings/ListingForm';
import ProfileCompletionCheck from '../components/profile/ProfileCompletionCheck';
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function CreateListing() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Handle profile completion check
  const handleProfileComplete = () => {
    setProfileComplete(true);
    setCheckingProfile(false);
  };

  const handleProfileIncomplete = (missingFields) => {
    setProfileComplete(false);
    setCheckingProfile(false);
  };

  // Handle verification check
  useEffect(() => {
    if (!loading && profile && profileComplete) {
      setVerificationChecked(true);
    }
  }, [loading, profile, profileComplete]);

  // Loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Step 1: Check Profile Completion
  if (checkingProfile || !profileComplete) {
    return (
      <ProfileCompletionCheck
        onComplete={handleProfileComplete}
        onIncomplete={handleProfileIncomplete}
      />
    );
  }

  // Step 2: Check Verification Status
  if (!verificationChecked || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const verificationStatus = profile.verificationStatus || 'unverified';

  // Unverified - Show prompt to verify
  if (verificationStatus === 'unverified') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Verify your identity to publish listings
          </h1>
          
          <p className="text-base text-gray-600 mb-8">
            To keep MySublet safe and scam-free, every host must verify their identity before publishing. This takes less than 1 minute and is 100% free.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Why verify?</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Builds trust with potential guests</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Your listings go live immediately after approval</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Get a verified badge on your profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Takes less than 1 minute</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/verify-identity', { state: { returnTo: '/create-listing' } })}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-orange-600 transition-colors mb-3"
          >
            Start verification now
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            I'll do this later
          </button>
        </div>
      </div>
    );
  }

  // Pending verification - Can create draft but not publish
  if (verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Verification Pending Banner */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Verification in progress
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  We're reviewing your {profile.verificationMethod === 'id' ? 'ID document' : 'email verification'}. 
                  This usually takes 5-30 minutes. You can create your listing now, and it will be published automatically once you're verified.
                </p>
                <p className="text-xs text-gray-600">
                  Submitted {profile.verified_at ? new Date(profile.verified_at).toLocaleString() : 'recently'}
                </p>
              </div>
            </div>
          </div>

          {/* Listing Form */}
          <ListingForm allowDraft={true} verificationPending={true} />
        </div>
      </div>
    );
  }

  // Rejected - Show error and allow retry
  if (verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Verification was not approved
          </h1>
          
          <p className="text-base text-gray-600 mb-4">
            Unfortunately, we couldn't verify your identity with the information provided.
          </p>

          {profile.rejection_reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-gray-700">
                <strong>Reason:</strong> {profile.rejection_reason}
              </p>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Next steps:</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">1.</span>
                <span>Make sure your ID document is clear and not expired</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">2.</span>
                <span>Ensure all information matches your profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">3.</span>
                <span>Try uploading a different photo or using email verification</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/verify-identity', { state: { returnTo: '/create-listing' } })}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-orange-600 transition-colors mb-3"
          >
            Try verification again
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  // Approved/Verified - Allow full listing creation
  if (verificationStatus === 'approved' || verificationStatus === 'verified') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Success Banner */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  ✨ You're verified!
                </h3>
                <p className="text-gray-700 text-sm">
                  Your listing will be published immediately. We've already filled in some details from your profile to save you time.
                </p>
              </div>
            </div>
          </div>

          {/* Listing Form with Auto-fill */}
          <ListingForm autoFillFromProfile={true} />
        </div>
      </div>
    );
  }

  // Fallback - shouldn't reach here
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}