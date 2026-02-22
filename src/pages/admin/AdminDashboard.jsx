import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, User, Mail, Calendar, ExternalLink, Loader, Home, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { verificationAPI } from '../../services/api/verification';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    setLoading(true);
    try {
      const { data, error } = await verificationAPI.getAllPending();
      if (error) throw error;
      setVerifications(data || []);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast.error('Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (verificationId) => {
    setProcessingId(verificationId);
    try {
      const { error } = await verificationAPI.approve(verificationId, user.id);
      if (error) throw error;
      
      toast.success('Verification approved! User\'s listings are now live.');
      setVerifications(verifications.filter(v => v.id !== verificationId));
      setSelectedVerification(null);
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error('Failed to approve verification');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (verificationId) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setProcessingId(verificationId);
    try {
      const { error } = await verificationAPI.reject(verificationId, user.id, rejectionReason);
      if (error) throw error;
      
      toast.success('Verification rejected. User has been notified.');
      setVerifications(verifications.filter(v => v.id !== verificationId));
      setSelectedVerification(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting verification:', error);
      toast.error('Failed to reject verification');
    } finally {
      setProcessingId(null);
    }
  };

  const getMethodBadge = (method) => {
    const badges = {
      id: { text: 'ID Document', color: 'bg-blue-100 text-blue-700' },
      student_email: { text: 'Student Email', color: 'bg-purple-100 text-purple-700' },
      work_email: { text: 'Work Email', color: 'bg-green-100 text-green-700' },
      selfie: { text: 'Selfie', color: 'bg-orange-100 text-orange-700' }
    };
    
    const badge = badges[method] || badges.id;
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>{badge.text}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Review and approve user verifications</p>
            </div>
            <div className="bg-orange-100 rounded-full p-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-3 border-b border-gray-200 pb-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-orange-500 text-white"
            >
              <Home className="w-4 h-4" />
              Overview
            </Link>
            <Link
              to="/admin/verifications"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <Users className="w-4 h-4" />
              All Verifications
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{verifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Today</p>
                <p className="text-3xl font-bold text-gray-900">
                  {verifications.filter(v => 
                    new Date(v.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Oldest</p>
                <p className="text-lg font-bold text-gray-900">
                  {verifications.length > 0 
                    ? `${Math.floor((Date.now() - new Date(verifications[0].createdAt)) / 3600000)}h ago`
                    : 'None'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Queue */}
        {verifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
            <p className="text-gray-600">No pending verifications at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {verifications.map((verification) => (
              <div key={verification.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                {/* User Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {verification.user?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{verification.user?.full_name || 'Unknown User'}</h3>
                      <p className="text-sm text-gray-600">{verification.user?.email}</p>
                    </div>
                  </div>
                  {getMethodBadge(verification.method)}
                </div>

                {/* Verification Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Submitted {new Date(verification.createdAt).toLocaleString()}
                  </div>
                  
                  {verification.user?.university && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {verification.user.university}
                    </div>
                  )}

                  {verification.emailUsed && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {verification.emailUsed}
                    </div>
                  )}
                </div>

                {/* Document Preview */}
                {verification.method === 'id' && verification.documentUrl && (
                  <div className="mb-4">
                    <a
                      href={verification.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition"
                    >
                      <img
                        src={verification.documentUrl}
                        alt="ID Document"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 bg-gray-50 flex items-center justify-center text-sm text-gray-600 hover:text-orange-600">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View full size
                      </div>
                    </a>
                  </div>
                )}

                {/* Rejection Reason Input */}
                {selectedVerification === verification.id && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rejection Reason
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Explain why the verification was rejected..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  {selectedVerification === verification.id ? (
                    <>
                      <button
                        onClick={() => {
                          setSelectedVerification(null);
                          setRejectionReason('');
                        }}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReject(verification.id)}
                        disabled={processingId === verification.id}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 flex items-center justify-center"
                      >
                        {processingId === verification.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Confirm Reject
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedVerification(verification.id)}
                        className="flex-1 px-4 py-2 border-2 border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center justify-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(verification.id)}
                        disabled={processingId === verification.id}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center justify-center"
                      >
                        {processingId === verification.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}