// src/components/verification/VerificationGuard.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Clock, XCircle, CheckCircle } from 'lucide-react';

/**
 * VerificationGuard - Protects routes that require verified users
 * 
 * Usage:
 * <VerificationGuard>
 *   <YourProtectedComponent />
 * </VerificationGuard>
 * 
 * Props:
 * - requireVerified: If true, only verified users can access (default: true)
 * - allowPending: If true, pending verification users can access (default: false)
 * - redirectTo: Where to redirect if not verified (default: '/verify-identity')
 * - showMessage: Show verification status message (default: true)
 * - children: The protected content
 */
export default function VerificationGuard({
  children,
  requireVerified = true,
  allowPending = false,
  redirectTo = '/verify-identity',
  showMessage = true
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, loading } = useAuth();
  const [checkingVerification, setCheckingVerification] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      checkVerification();
    }
  }, [loading, user, profile]);

  const checkVerification = () => {
    if (!profile) {
      setCheckingVerification(true);
      return;
    }

    const status = profile.verification_status;
    
    // Check verification requirements
    if (requireVerified) {
      const isVerified = status === 'approved' || status === 'verified';
      const isPending = status === 'pending';
      
      if (!isVerified && !(allowPending && isPending)) {
        // Redirect to verification with return path
        navigate(redirectTo, {
          state: { returnTo: location.pathname },
          replace: true
        });
        return;
      }
    }

    setCheckingVerification(false);
  };

  // Loading state
  if (loading || checkingVerification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Render protected content
  return (
    <>
      {showMessage && <VerificationStatusBanner profile={profile} />}
      {children}
    </>
  );
}

/**
 * VerificationStatusBanner - Shows user's verification status
 */
function VerificationStatusBanner({ profile }) {
  if (!profile) return null;

  const status = profile.verification_status;

  // Don't show banner if verified
  if (status === 'approved' || status === 'verified') {
    return null;
  }

  // Pending verification
  if (status === 'pending') {
    return (
      <div className="bg-yellow-50 border-b-2 border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Verification in progress
                </p>
                <p className="text-xs text-gray-600">
                  We're reviewing your information. Usually takes 5-30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rejected verification
  if (status === 'rejected') {
    return (
      <div className="bg-red-50 border-b-2 border-red-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Verification was not approved
                </p>
                <p className="text-xs text-gray-600">
                  Please try again with updated information.
                </p>
              </div>
            </div>
            <a
              href="/verify-identity"
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Try again
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Unverified
  return (
    <div className="bg-orange-50 border-b-2 border-orange-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-orange-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Verify your identity to publish listings
              </p>
              <p className="text-xs text-gray-600">
                Quick and free. Takes less than 1 minute.
              </p>
            </div>
          </div>
          <a
            href="/verify-identity"
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            Verify now
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Verification status check hook - use in components
 * 
 * Usage:
 * const { isVerified, isPending, isRejected, canPublish } = useVerificationStatus();
 */
export function useVerificationStatus() {
  const { profile } = useAuth();
  
  if (!profile) {
    return {
      isVerified: false,
      isPending: false,
      isRejected: false,
      isUnverified: true,
      canPublish: false,
      status: 'unverified'
    };
  }

  const status = profile.verification_status;
  
  return {
    isVerified: status === 'approved' || status === 'verified',
    isPending: status === 'pending',
    isRejected: status === 'rejected',
    isUnverified: status === 'unverified' || !status,
    canPublish: status === 'approved' || status === 'verified',
    status
  };
}