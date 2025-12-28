// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, Building2, GraduationCap, Instagram, Linkedin, Shield, CheckCircle, Clock, XCircle, Edit2, Save, AlertCircle, Camera, Upload } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { verificationAPI } from '../services/api/verification';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [verification, setVerification] = useState(null);

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Get return path and missing fields from navigation state
  const returnTo = location.state?.returnTo;
  const highlightFields = location.state?.missingFields?.map(f => f.field) || [];

  const [formData, setFormData] = useState({
    full_name: profile?.fullName || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    university: profile?.university || '',
    company: profile?.company || '',
    instagram: profile?.instagram || '',
    linkedin: profile?.linkedin || '',
    avatar_url: profile?.avatarUrl || ''
  });

  // Sync formData with profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.fullName || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        university: profile.university || '',
        company: profile.company || '',
        instagram: profile.instagram || '',
        linkedin: profile.linkedin || '',
        avatar_url: profile.avatarUrl || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user?.id) {
      fetchVerificationStatus();
    }
  }, [user]);

  // Auto-enable editing if there are missing fields
  useEffect(() => {
    if (highlightFields.length > 0) {
      setEditing(true);
    }
  }, [highlightFields]);

  const fetchVerificationStatus = async () => {
    const { data } = await verificationAPI.getStatus(user.id);
    setVerification(data);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setAvatarUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, avatar_url: url }));
      toast.success('Avatar uploaded successfully!');
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Failed to upload avatar. Please try again.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    const errors = [];
    if (!formData.full_name?.trim()) errors.push('Full Name');
    if (!formData.phone?.trim()) errors.push('Phone Number');
    if (!formData.bio?.trim()) errors.push('Bio');

    if (errors.length > 0) {
      toast.error(`Please fill in: ${errors.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      console.log('[Profile] Updating profile with data:', formData);
      const { data, error } = await updateProfile(formData);
      
      if (error) {
        console.error('[Profile] Update error:', error);
        throw error;
      }

      console.log('[Profile] Update successful, returned data:', data);
      toast.success('Profile updated successfully!');
      setEditing(false);

      // If there's a return path and profile is now complete, redirect back
      if (returnTo) {
        setTimeout(() => {
          navigate(returnTo);
        }, 1000);
      }
    } catch (error) {
      console.error('[Profile] Failed to update profile:', error);
      toast.error(error.message || 'Failed to update profile');
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
      verified: {
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

  // Helper to check if field should be highlighted
  const isHighlighted = (fieldName) => highlightFields.includes(fieldName);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Return Flow Banner */}
        {returnTo && highlightFields.length > 0 && (
          <div className="mb-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Complete these fields to continue creating your listing
                </p>
                <p className="text-sm text-gray-600">
                  Fields marked with a orange highlight are required.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              {/* Avatar with Upload */}
              <div className="relative mr-6 group">
                {formData.avatar_url || profile?.avatarUrl ? (
                  <img
                    src={formData.avatar_url || profile?.avatarUrl}
                    alt={profile?.fullName || 'User'}
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile?.fullName?.charAt(0) || 'U'}
                  </div>
                )}
                
                {editing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={avatarUploading}
                    />
                    {avatarUploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="w-8 h-8 text-white" />
                    )}
                  </label>
                )}
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
                  onClick={() => {
                    setEditing(false);
                    // Reset form data
                    setFormData({
                      full_name: profile?.fullName || '',
                      phone: profile?.phone || '',
                      bio: profile?.bio || '',
                      university: profile?.university || '',
                      company: profile?.company || '',
                      instagram: profile?.instagram || '',
                      linkedin: profile?.linkedin || ''
                    });
                  }}
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
                    onClick={() => navigate('/verify-identity', { state: { returnTo: returnTo || '/create-listing' } })}
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
                    Submitted {new Date(verification.created_at).toLocaleString()}
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
                    {verification.rejection_reason || 'We were unable to verify your identity with the provided information.'}
                  </p>
                  <button
                    onClick={() => navigate('/verify-identity', { state: { returnTo: returnTo || '/create-listing' } })}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {(profile?.verificationStatus === 'approved' || profile?.verificationStatus === 'verified') && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">✨ You're verified!</h3>
                  <p className="text-gray-600">
                    Your listings will be published immediately. Verified {profile.verified_at ? new Date(profile.verified_at).toLocaleDateString() : 'recently'}.
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
            {/* Full Name - REQUIRED */}
            <div className={isHighlighted('full_name') ? 'p-4 bg-orange-50 border-2 border-orange-300 rounded-xl' : ''}>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name {isHighlighted('full_name') && <span className="text-orange-600 ml-1">*</span>}
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
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

            {/* Phone - REQUIRED */}
            <div className={isHighlighted('phone') ? 'p-4 bg-orange-50 border-2 border-orange-300 rounded-xl' : ''}>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone {isHighlighted('phone') && <span className="text-orange-600 ml-1">*</span>}
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

            {/* Bio - REQUIRED */}
            <div className={isHighlighted('bio') ? 'p-4 bg-orange-50 border-2 border-orange-300 rounded-xl' : ''}>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Bio {isHighlighted('bio') && <span className="text-orange-600 ml-1">*</span>}
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