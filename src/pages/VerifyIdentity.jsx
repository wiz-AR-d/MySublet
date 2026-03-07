// src/pages/VerifyIdentity.jsx
import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Shield, Upload, Mail, Camera, CheckCircle, X, Loader, ArrowLeft} from 'lucide-react';
import {useAuth} from '../hooks/useAuth';
import {verificationAPI} from '../services/api/verification';
import {toast} from 'sonner';
import {motion, AnimatePresence} from 'framer-motion';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const {user} = useAuth();
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
      {method: 'POST', body: formData}
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

      const {error} = await verificationAPI.submit(user.id, {
        method: 'id',
        documentUrl,
        metadata: {fileName: idFile.name}
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
      const {error} = await verificationAPI.submit(user.id, {
        method: type,
        emailUsed: email,
        metadata: {domain, verified: false}
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="max-w-md w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-light text-white mb-4">
            Verification submitted
          </h1>
          <p className="text-gray-400 font-light mb-8 leading-relaxed">
            We're now checking your information. This usually takes 5–30 minutes during active hours.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Go to dashboard
            </button>
            <button
              onClick={() => navigate('/my-listings')}
              className="w-full bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              View my listings
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedMethod ? (
            <motion.div
              key="method-form"
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -20}}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => setSelectedMethod(null)}
                className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to options
              </button>

              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                {selectedMethod === 'id' && (
                  <>
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                        <Upload className="w-10 h-10 text-blue-400" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-light text-white text-center mb-4">Upload your ID</h2>
                    <p className="text-gray-400 text-center mb-12 font-light">
                      Upload a clear photo of your passport or ID card
                    </p>

                    <div className="space-y-6">
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
                          className="w-full border-2 border-dashed border-white/10 rounded-3xl p-16 hover:border-blue-500/50 hover:bg-white/[0.02] transition-all group"
                        >
                          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                          <p className="text-white font-light text-xl">Click to upload ID document</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </button>
                      ) : (
                        <div className="border border-emerald-500/30 rounded-3xl p-8 bg-emerald-500/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mr-4">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                              </div>
                              <div>
                                <p className="font-medium text-white">{idFile.name}</p>
                                <p className="text-sm text-gray-500">{(idFile.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setIdFile(null)}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleIDVerification}
                        disabled={!idFile || uploading}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
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
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                        <Mail className="w-10 h-10 text-blue-400" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-light text-white text-center mb-4">
                      {selectedMethod === 'student_email' ? 'Student Email' : 'Work Email'} Verification
                    </h2>
                    <p className="text-gray-400 text-center mb-12 font-light">
                      Enter your {selectedMethod === 'student_email' ? 'university' : 'company'} email to verify
                    </p>

                    <div className="space-y-6">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={selectedMethod === 'student_email' ? 'your.name@university.edu' : 'your.name@company.com'}
                        className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                      />

                      <button
                        onClick={() => handleEmailVerification(selectedMethod)}
                        disabled={!email || uploading}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
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
            </motion.div>
          ) : (
            <motion.div
              key="selection-screen"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  className="flex items-center justify-center mb-8"
                >
                  <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 rotate-12">
                    <Shield className="w-12 h-12 text-white -rotate-12" />
                  </div>
                </motion.div>
                <h1 className="text-5xl font-light text-white mb-6">Verify your identity</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                  To keep SubLease safe and scam-free, every host must verify their identity. This takes less than 1 minute and is 100% free.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {[
                  {text: 'Safer for you', color: 'text-blue-400'},
                  {text: 'Safer for guests', color: 'text-emerald-400'},
                  {text: 'No scams', color: 'text-purple-400'},
                  {text: 'Free verification', color: 'text-orange-400'}
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: idx * 0.1}}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
                  >
                    <CheckCircle className={`w-5 h-5 mx-auto mb-2 ${badge.color}`} />
                    <p className="text-sm font-medium text-gray-300">{badge.text}</p>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-2xl font-light text-white mb-8 text-center">Choose how you want to verify</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {[
                  {
                    id: 'id',
                    icon: Upload,
                    title: 'Verify with ID',
                    desc: 'Upload a photo of your passport or ID card. Secure and private.',
                    color: 'blue'
                  },
                  {
                    id: 'student_email',
                    icon: Mail,
                    title: 'Student email',
                    desc: 'Use your university email to verify your identity instantly.',
                    color: 'emerald'
                  },
                  {
                    id: 'work_email',
                    icon: Mail,
                    title: 'Work email',
                    desc: 'Use your company email to confirm who you are.',
                    color: 'purple'
                  },
                  {
                    id: 'selfie',
                    icon: Camera,
                    title: 'Selfie check',
                    desc: 'Take a quick selfie to match with your ID. (Coming soon)',
                    color: 'gray',
                    disabled: true
                  }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => !method.disabled && setSelectedMethod(method.id)}
                    className={`group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-left transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 ${method.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                  >
                    <div className={`w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-${method.color}-500/10 border border-${method.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                      <method.icon className={`w-8 h-8 text-${method.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-3">{method.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      {method.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <h3 className="text-2xl font-light text-white mb-8">Frequently Asked Questions</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <p className="font-medium text-white mb-3">Why do I need to verify?</p>
                    <p className="text-gray-400 font-light leading-relaxed">Verification protects hosts and guests from scams and keeps the community real.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-3">Is verification free?</p>
                    <p className="text-gray-400 font-light leading-relaxed">Yes. Verification is always free on SubLease.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-3">Who can see my info?</p>
                    <p className="text-gray-400 font-light leading-relaxed">Only our safety team. Guests never see your documents.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="px-10 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Back to listing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}