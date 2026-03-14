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
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      },
      verified: {
        icon: CheckCircle,
        text: 'Verified',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      },
      pending: {
        icon: Clock,
        text: 'Verification Pending',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
      },
      rejected: {
        icon: XCircle,
        text: 'Verification Rejected',
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20'
      },
      unverified: {
        icon: Shield,
        text: 'Not Verified',
        color: 'text-gray-400',
        bg: 'bg-white/5',
        border: 'border-white/10'
      }
    };

    const badge = badges[status] || badges.unverified;
    const Icon = badge.icon;

    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full border ${badge.bg} ${badge.border} backdrop-blur-md`}>
        <Icon className={`w-4 h-4 mr-2 ${badge.color}`} />
        <span className={`text-sm font-bold uppercase tracking-wider ${badge.color}`}>{badge.text}</span>
      </div>
    );
  };

  // Helper to check if field should be highlighted
  const isHighlighted = (fieldName) => highlightFields.includes(fieldName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Return Flow Banner */}
        {returnTo && highlightFields.length > 0 && (
          <div className="mb-8 bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-6 animate-fade-in">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-white text-lg mb-1 tracking-tight">
                  Complete your profile
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Please fill in the highlighted fields to continue with your listing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar with Upload */}
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />
                {formData.avatar_url || profile?.avatarUrl ? (
                  <img
                    src={formData.avatar_url || profile?.avatarUrl}
                    alt={profile?.fullName || 'User'}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/10 relative z-10 shadow-2xl"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-4xl font-black relative z-10 shadow-2xl">
                    {profile?.fullName?.charAt(0) || 'U'}
                  </div>
                )}

                {editing && (
                  <label className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={avatarUploading}
                    />
                    {avatarUploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-8 h-8 text-white mb-1" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">Change</span>
                      </div>
                    )}
                  </label>
                )}
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                  {profile?.fullName || 'User Profile'}
                </h1>
                <p className="text-gray-400 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {profile?.email}
                </p>
                {getVerificationBadge()}
              </div>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      full_name: profile?.fullName || '',
                      phone: profile?.phone || '',
                      bio: profile?.bio || '',
                      university: profile?.university || '',
                      company: profile?.company || '',
                      instagram: profile?.instagram || '',
                      linkedin: profile?.linkedin || '',
                      avatar_url: profile?.avatarUrl || ''
                    });
                  }}
                  className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Verification Status Details */}
          {profile?.verificationStatus === 'unverified' && (
            <div className="mt-10 p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2rem] animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-blue-500/20 p-4 rounded-2xl">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">Verify your identity</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Get verified in under 1 minute to start hosting on MySublet.
                  </p>
                  <button
                    onClick={() => navigate('/verify-identity', { state: { returnTo: returnTo || '/create-listing' } })}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Start Verification
                  </button>
                </div>
              </div>
            </div>
          )}

          {profile?.verificationStatus === 'pending' && verification && (
            <div className="mt-10 p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2rem] animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-blue-500/20 p-4 rounded-2xl">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">Verification in progress</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    We're reviewing your {verification.method === 'id' ? 'ID document' : 'email verification'}.
                    This usually takes 5-30 minutes.
                  </p>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                    Submitted {new Date(verification.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {profile?.verificationStatus === 'rejected' && verification && (
            <div className="mt-10 p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-red-500/20 p-4 rounded-2xl">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">Verification not approved</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {verification.rejection_reason || 'We were unable to verify your identity with the provided information.'}
                  </p>
                  <button
                    onClick={() => navigate('/verify-identity', { state: { returnTo: returnTo || '/create-listing' } })}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {(profile?.verificationStatus === 'approved' || profile?.verificationStatus === 'verified') && (
            <div className="mt-10 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-emerald-500/20 p-4 rounded-2xl">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">You're verified!</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your listings will be published immediately. Verified {profile.verified_at ? new Date(profile.verified_at).toLocaleDateString() : 'recently'}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Details Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-black text-white mb-10 tracking-tight flex items-center gap-3">
            <User className="w-6 h-6 text-blue-400" />
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Full Name */}
            <div className={`space-y-3 ${isHighlighted('full_name') ? 'p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl' : ''}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                Full Name {isHighlighted('full_name') && <span className="text-blue-400">*</span>}
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.fullName || 'Not set'}</p>
              )}
            </div>

            {/* Phone */}
            <div className={`space-y-3 ${isHighlighted('phone') ? 'p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl' : ''}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                Phone {isHighlighted('phone') && <span className="text-blue-400">*</span>}
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="+31 6 12345678"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.phone || 'Not set'}</p>
              )}
            </div>

            {/* University */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                University
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g., University of Amsterdam"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.university || 'Not set'}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g., Google"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.company || 'Not set'}</p>
              )}
            </div>

            {/* Instagram */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="@username"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.instagram || 'Not set'}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="linkedin.com/in/username"
                />
              ) : (
                <p className="text-xl font-bold text-white">{profile?.linkedin || 'Not set'}</p>
              )}
            </div>

            {/* Bio */}
            <div className={`md:col-span-2 space-y-3 ${isHighlighted('bio') ? 'p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl' : ''}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                Bio {isHighlighted('bio') && <span className="text-blue-400">*</span>}
              </label>
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">{profile?.bio || 'Not set'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
