// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, GraduationCap, Instagram, Linkedin, Shield, CheckCircle, Clock, XCircle, Edit2, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { verificationAPI } from '../services/api/verification';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: profile?.fullName || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    university: profile?.university || '',
    company: profile?.company || '',
    instagram: profile?.instagram || '',
    linkedin: profile?.linkedin || ''
  });

  useEffect(() => {
    if (user?.id) {
      fetchVerificationStatus();
    }
  }, [user]);

  const fetchVerificationStatus = async () => {
    const { data } = await verificationAPI.getStatus(user.id);
    setVerification(data);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = () => {
    const status = profile?.verificationStatus || 'unverified';
    
    const badges = {
      approved: {
        icon: CheckCircle,
        text: 'Verified',
        color: 'text-green-600',
        bg: 'bg-green-100'
      },
      pending: {
        icon: Clock,
        text: 'Verification Pending',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100'
      },
      rejected: {
        icon: XCircle,
        text: 'Verification Rejected',
        color: 'text-red-600',
        bg: 'bg-red-100'
      },
      unverified: {
        icon: Shield,
        text: 'Not Verified',
        color: 'text-gray-600',
        bg: 'bg-gray-100'
      }
    };

    const badge = badges[status] || badges.unverified;
    const Icon = badge.icon;

    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${badge.bg}`}>
        <Icon className={`w-5 h-5 mr-2 ${badge.color}`} />
        <span className={`font-medium ${badge.color}`}>{badge.text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
                {profile?.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile?.fullName || 'User Profile'}
                </h1>
                <p className="text-gray-600 mb-3">{profile?.email}</p>
                {getVerificationBadge()}
              </div>
            </div>
            
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Verification Status Details */}
          {profile?.verificationStatus === 'unverified' && (
            <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Verify your identity to publish listings</h3>
                  <p className="text-gray-600 mb-3">
                    Get verified in under 1 minute to start hosting on MySublet.
                  </p>
                  <button
                    onClick={() => navigate('/verify-identity')}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Start Verification
                  </button>
                </div>
              </div>
            </div>
          )}

          {profile?.verificationStatus === 'pending' && verification && (
            <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Verification in progress</h3>
                  <p className="text-gray-600 mb-2">
                    We're reviewing your {verification.method === 'id' ? 'ID document' : 'email verification'}.
                    This usually takes 5-30 minutes.
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted {new Date(verification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {profile?.verificationStatus === 'rejected' && verification && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start">
                <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Verification was not approved</h3>
                  <p className="text-gray-600 mb-2">
                    {verification.rejectionReason || 'We were unable to verify your identity with the provided information.'}
                  </p>
                  <button
                    onClick={() => navigate('/verify-identity')}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {profile?.verificationStatus === 'approved' && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">✨ You're verified!</h3>
                  <p className="text-gray-600">
                    Your listings will be published immediately. Verified {new Date(profile.verifiedAt).toLocaleDateString()}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-900">{profile?.fullName || 'Not set'}</p>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <p className="text-gray-900">{profile?.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="+31 6 12345678"
                />
              ) : (
                <p className="text-gray-900">{profile?.phone || 'Not set'}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Bio
              </label>
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-gray-900">{profile?.bio || 'Not set'}</p>
              )}
            </div>

            {/* University */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                University
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., University of Amsterdam"
                />
              ) : (
                <p className="text-gray-900">{profile?.university || 'Not set'}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 mr-2" />
                Company
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Google"
                />
              ) : (
                <p className="text-gray-900">{profile?.company || 'Not set'}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="@username"
                />
              ) : (
                <p className="text-gray-900">{profile?.instagram || 'Not set'}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="linkedin.com/in/username"
                />
              ) : (
                <p className="text-gray-900">{profile?.linkedin || 'Not set'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}