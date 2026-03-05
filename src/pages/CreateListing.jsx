// src/pages/CreateListing.jsx
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import ListingForm from '../components/listings/ListingForm';
import ProfileCompletionCheck from '../components/profile/ProfileCompletionCheck';
import {Shield, Clock, CheckCircle, AlertCircle} from 'lucide-react';

export default function CreateListing() {
  const navigate = useNavigate();
  const {user, profile, loading} = useAuth();
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      </div>
    );
  }

  const verificationStatus = profile.verificationStatus || 'unverified';

  // Unverified - Show prompt to verify
  if (verificationStatus === 'unverified') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30 shadow-lg shadow-blue-500/20">
            <Shield className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Verify your identity to publish listings
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            To keep MySublet safe and scam-free, every host must verify their identity before publishing. This takes less than 1 minute and is 100% free.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-10 text-left">
            <h3 className="font-bold text-white text-lg mb-4">Why verify?</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">✓</span>
                <span>Builds trust with potential guests</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">✓</span>
                <span>Your listings go live immediately after approval</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">✓</span>
                <span>Get a verified badge on your profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">✓</span>
                <span>Takes less than 1 minute</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/verify-identity', {state: {returnTo: '/create-listing'}})}
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Start verification now
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              I'll do this later
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pending verification - Can create draft but not publish
  if (verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Verification Pending Banner */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 mb-10 backdrop-blur-md animate-fade-in-down">
            <div className="flex items-start">
              <div className="bg-yellow-500/20 p-3 rounded-xl mr-4">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-xl mb-2">
                  Verification in progress
                </h3>
                <p className="text-gray-400 text-base mb-4 leading-relaxed">
                  We're reviewing your {profile.verificationMethod === 'id' ? 'ID document' : 'email verification'}.
                  This usually takes 5-30 minutes. You can create your listing now, and it will be published automatically once you're verified.
                </p>
                <div className="flex items-center text-xs text-gray-500 font-medium uppercase tracking-wider">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                  Submitted {profile.verified_at ? new Date(profile.verified_at).toLocaleString() : 'recently'}
                </div>
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
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30 shadow-lg shadow-red-500/20">
            <AlertCircle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Verification was not approved
          </h1>

          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Unfortunately, we couldn't verify your identity with the information provided.
          </p>

          {profile.rejection_reason && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-10 text-left">
              <p className="text-gray-300">
                <strong className="text-red-400">Reason:</strong> {profile.rejection_reason}
              </p>
            </div>
          )}

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-10 text-left">
            <h3 className="font-bold text-white text-lg mb-4">Next steps:</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 font-bold">1.</span>
                <span>Make sure your ID document is clear and not expired</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 font-bold">2.</span>
                <span>Ensure all information matches your profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 font-bold">3.</span>
                <span>Try uploading a different photo or using email verification</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/verify-identity', {state: {returnTo: '/create-listing'}})}
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Try verification again
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              Go back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Approved/Verified - Allow full listing creation
  if (verificationStatus === 'approved' || verificationStatus === 'verified') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Success Banner */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 mb-10 backdrop-blur-md animate-fade-in-down">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-xl mr-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-xl mb-2">
                  ✨ You're verified!
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}