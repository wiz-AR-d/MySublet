import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usersAPI } from '../../services/api/users';
import { AlertCircle, Check } from 'lucide-react';

export default function ProfileCompletionCheck({ onComplete, onIncomplete }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    checkProfileCompletion();
  }, [user]);

  const checkProfileCompletion = async () => {
    if (!user) return;

    try {
      const { data, error } = await usersAPI.getProfile(user.id);
      
      if (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      setProfile(data);

      // Check required fields
      const required = [];
      if (!data.full_name || data.full_name.trim().length === 0) {
        required.push('Full Name');
      }
      if (!data.bio || data.bio.trim().length === 0) {
        required.push('Bio');
      }
      if (!data.phone || data.phone.trim().length === 0) {
        required.push('Phone Number');
      }

      setMissingFields(required);
      setLoading(false);

      if (required.length === 0) {
        onComplete?.();
      } else {
        onIncomplete?.(required);
      }
    } catch (error) {
      console.error('Profile completion check error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (missingFields.length === 0) {
    return null; // Profile is complete
  }

  // Show incomplete profile warning
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Complete your profile first
        </h1>
        
        <p className="text-base text-gray-600 mb-8">
          Before publishing your listing, please complete your profile. This helps build trust with potential guests.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Missing information:</h3>
          <ul className="space-y-2">
              {missingFields.map((field, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <Check className="w-4 h-4 text-orange-500 mr-2" />
                  {field}
                </li>
              ))}
          </ul>
        </div>

        <button
          onClick={() => window.location.href = '/profile'}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-orange-600 transition-colors mb-3"
        >
          Complete my profile
        </button>

        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Back to listing
        </button>
      </div>
    </div>
  );
}
