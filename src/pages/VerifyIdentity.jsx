// src/pages/VerifyIdentity.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, Mail, Camera, CheckCircle, X, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { verificationAPI } from '../services/api/verification';
import { toast } from 'sonner';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const [idFile, setIdFile] = useState(null);
  const [email, setEmail] = useState('');

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.secure_url;
  };

  const handleIDVerification = async () => {
    if (!idFile) {
      toast.error('Please upload your ID document');
      return;
    }

    setUploading(true);
    try {
      const documentUrl = await uploadToCloudinary(idFile);
      
      const { data, error } = await verificationAPI.submit(user.id, {
        method: 'id',
        documentUrl,
        metadata: { fileName: idFile.name }
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success('ID verification submitted successfully!');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to submit verification');
    } finally {
      setUploading(false);
    }
  };

  const handleEmailVerification = async (type) => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    const domain = email.split('@')[1];
    const isUniversityEmail = domain.includes('.edu') || domain.includes('.ac.');
    const isWorkEmail = !isUniversityEmail && domain !== 'gmail.com' && domain !== 'yahoo.com' && domain !== 'hotmail.com';

    if (type === 'student_email' && !isUniversityEmail) {
      toast.error('Please use a valid university email (.edu or .ac domain)');
      return;
    }

    if (type === 'work_email' && !isWorkEmail) {
      toast.error('Please use a valid work email (not Gmail, Yahoo, or Hotmail)');
      return;
    }

    setUploading(true);
    try {
      const { data, error } = await verificationAPI.submit(user.id, {
        method: type,
        emailUsed: email,
        metadata: { domain, verified: false }
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success('Email verification submitted! Check your inbox.');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to submit verification');
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Verification submitted
          </h1>
          <p className="text-gray-600 mb-6">
            We're now checking your information. This usually takes 5–30 minutes during active hours.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            You'll get a notification as soon as it's approved.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Go to dashboard
            </button>
            <button
              onClick={() => navigate('/my-listings')}
              className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-gray-300 transition"
            >
              View my listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedMethod(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <X className="w-5 h-5 mr-2" />
            Back to options
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {selectedMethod === 'id' && (
              <>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">Upload your ID</h2>
                <p className="text-gray-600 text-center mb-8">
                  Upload a clear photo of your passport or ID card
                </p>

                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdFile(e.target.files[0])}
                    className="hidden"
                  />
                  
                  {!idFile ? (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-orange-500 hover:bg-orange-50 transition"
                    >
                      <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600">Click to upload ID document</p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </button>
                  ) : (
                    <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{idFile.name}</p>
                            <p className="text-sm text-gray-500">{(idFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIdFile(null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleIDVerification}
                    disabled={!idFile || uploading}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Submit verification'
                    )}
                  </button>
                </div>
              </>
            )}

            {(selectedMethod === 'student_email' || selectedMethod === 'work_email') && (
              <>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  {selectedMethod === 'student_email' ? 'Student Email' : 'Work Email'} Verification
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Enter your {selectedMethod === 'student_email' ? 'university' : 'company'} email to verify
                </p>

                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedMethod === 'student_email' ? 'your.name@university.edu' : 'your.name@company.com'}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />

                  <button
                    onClick={() => handleEmailVerification(selectedMethod)}
                    disabled={!email || uploading}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Send verification email'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify your identity</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            To keep MySublet safe and scam-free, every host must verify their identity before their listing goes live. This takes less than 1 minute and is 100% free.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '✓', text: 'Safer for you' },
            { icon: '✓', text: 'Safer for guests' },
            { icon: '✓', text: 'No scams' },
            { icon: '✓', text: 'Free verification' }
          ].map((badge, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <p className="text-sm font-medium text-gray-700">{badge.text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose how you want to verify</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setSelectedMethod('id')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left border-2 border-transparent hover:border-orange-500"
          >
            <Upload className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify with ID</h3>
            <p className="text-gray-600">
              Upload a photo of your passport or ID card. (We only use this for safety — never shared with guests.)
            </p>
          </button>

          <button
            onClick={() => setSelectedMethod('student_email')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left border-2 border-transparent hover:border-orange-500"
          >
            <Mail className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify with student email</h3>
            <p className="text-gray-600">
              Use your university email to verify your identity instantly.
            </p>
          </button>

          <button
            onClick={() => setSelectedMethod('work_email')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-left border-2 border-transparent hover:border-orange-500"
          >
            <Mail className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify with work email</h3>
            <p className="text-gray-600">
              Use your company email to confirm who you are.
            </p>
          </button>

          <button
            onClick={() => toast.info('Selfie verification coming soon!')}
            className="bg-gray-100 rounded-2xl p-8 shadow text-left opacity-60 cursor-not-allowed"
          >
            <Camera className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Selfie check</h3>
            <p className="text-gray-500">
              Take a quick selfie to match with your ID. (Coming soon)
            </p>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Why do I need to verify?</p>
              <p className="text-gray-600">Verification protects hosts and guests from scams and keeps the community real.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Is verification free?</p>
              <p className="text-gray-600">Yes. Verification is always free on MySublet.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Who can see my information?</p>
              <p className="text-gray-600">Only you and our safety team. Guests never see your documents.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition"
          >
            Back to listing
          </button>
        </div>
      </div>
    </div>
  );
}