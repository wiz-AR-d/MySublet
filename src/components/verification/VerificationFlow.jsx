import { useState } from 'react';
import { Upload, CheckCircle, Loader2, Shield } from 'lucide-react';
import CloudinaryImageUpload from '../listings/CloudinaryImageUpload';
import { verificationAPI } from '../../services/api/verification';
import { toast } from 'sonner';

export default function VerificationFlow({ userId, onComplete, onSkip }) {
  const [step, setStep] = useState(1); // 1: Intro, 2: Upload ID, 3: Submitted
  const [uploading, setUploading] = useState(false);
  const [idDocument, setIdDocument] = useState(null);

  const handleStartVerification = () => {
    setStep(2);
  };

  const handleIdUpload = async () => {
    if (!idDocument) {
      toast.error('Please upload your ID document first');
      return;
    }

    setUploading(true);
    try {
      const { data, error } = await verificationAPI.submit(userId, {
        method: 'id',
        documentUrl: idDocument,
        metadata: { uploaded_at: new Date().toISOString() }
      });

      if (error) throw error;

      toast.success('Verification submitted successfully!');
      setStep(3);
    } catch (error) {
      console.error('Verification submission error:', error);
      toast.error('Failed to submit verification. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  // Step 1: Intro Screen
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Before your listing goes live…
          </h1>
          
          <p className="text-base text-gray-600 mb-8">
            We verify every host to keep MySublet safe and scam-free. This step is quick and 100% free.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">What you'll need:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>A clear photo of your government-issued ID (passport, driver's license, or national ID)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>2-3 minutes of your time</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleStartVerification}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-orange-600 transition-colors mb-4"
          >
            Start verification
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              I'll do this later
            </button>
          )}
        </div>
      </div>
    );
  }

  // Step 2: Upload ID
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload your ID
            </h2>
            <p className="text-gray-600">
              Please upload a clear photo of your government-issued ID
            </p>
          </div>

          <div className="mb-6">
            {!idDocument ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 transition-colors">
                <CloudinaryImageUpload
                  images={[]}
                  onImagesChange={(images) => setIdDocument(images[0])}
                  maxImages={1}
                />
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: JPG, PNG, PDF • Max size: 10MB
                </p>
              </div>
            ) : (
              <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                    <span className="font-medium text-gray-900">ID document uploaded</span>
                  </div>
                  <button
                    onClick={() => setIdDocument(null)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <img 
                  src={idDocument} 
                  alt="ID preview" 
                  className="w-full rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Privacy note:</strong> Your ID is securely stored and only viewed by our verification team. It won't be shared with anyone else.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              disabled={uploading}
            >
              Back
            </button>
            <button
              onClick={handleIdUpload}
              disabled={!idDocument || uploading}
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for verification'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Submission Confirmed
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Verification submitted
        </h1>
        
        <p className="text-base text-gray-600 mb-4">
          We're now checking your information. This usually takes <strong>5–30 minutes</strong> during active hours.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          You'll get a notification as soon as it's approved.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">1.</span>
              <span>Our team reviews your ID (usually within 5-30 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">2.</span>
              <span>You'll receive an email confirmation when approved</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">3.</span>
              <span>Your listing goes live automatically</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">4.</span>
              <span>You get a "Verified Host" badge on your profile</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleComplete}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-orange-600 transition-colors mb-3"
        >
          Go to dashboard
        </button>

        <button
          onClick={() => window.location.href = '/my-listings'}
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          View my listing
        </button>
      </div>
    </div>
  );
}
