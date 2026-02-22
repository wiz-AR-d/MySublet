import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { verificationAPI } from '../../services/api/verification';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Loader2, User, Mail, Calendar, ExternalLink, Home, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminVerifications() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState([]);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    // Check if user is admin
    if (!profile || profile.userRole !== 'admin') {
      toast.error('Unauthorized access');
      navigate('/dashboard');
      return;
    }

    fetchVerifications();
  }, [filter, profile]);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      const { data, error } = filter === 'pending'
        ? await verificationAPI.getAllPending()
        : await verificationAPI.getAllVerifications({ status: filter === 'all' ? undefined : filter });

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
    setProcessing(verificationId);
    try {
      const { error } = await verificationAPI.approve(verificationId, user.id);
      
      if (error) throw error;

      toast.success('Verification approved successfully!');
      fetchVerifications(); // Refresh list
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error('Failed to approve verification');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (verificationId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    setProcessing(verificationId);
    try {
      const { error } = await verificationAPI.reject(verificationId, user.id, reason);
      
      if (error) throw error;

      toast.success('Verification rejected');
      fetchVerifications(); // Refresh list
    } catch (error) {
      console.error('Error rejecting verification:', error);
      toast.error('Failed to reject verification');
    } finally {
      setProcessing(null);
    }
  };

  const getMethodBadge = (method) => {
    const badges = {
      id: { color: 'bg-blue-100 text-blue-700', text: 'ID Verification' },
      student_email: { color: 'bg-purple-100 text-purple-700', text: 'Student Email' },
      work_email: { color: 'bg-green-100 text-green-700', text: 'Work Email' },
      selfie: { color: 'bg-pink-100 text-pink-700', text: 'Selfie Check' },
    };
    return badges[method] || { color: 'bg-gray-100 text-gray-700', text: method };
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Loader2, text: 'Pending' },
      approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Rejected' },
    };
    return badges[status] || { color: 'bg-gray-100 text-gray-700', text: status };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Requests</h1>
          <p className="text-gray-600 text-sm">Review and approve identity verifications</p>
          
          {/* Navigation Tabs */}
          <div className="flex gap-3 mt-6">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <Home className="w-4 h-4" />
              Overview
            </Link>
            <Link
              to="/admin/verifications"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-orange-500 text-white"
            >
              <Users className="w-4 h-4" />
              All Verifications
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {['pending', 'approved', 'rejected', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Requests</div>
            <div className="text-3xl font-bold text-gray-900">{verifications.length}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
            <div className="text-sm text-yellow-700 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-900">
              {verifications.filter(v => v.status === 'pending').length}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow-sm">
            <div className="text-sm text-green-700 mb-1">Approved</div>
            <div className="text-3xl font-bold text-green-900">
              {verifications.filter(v => v.status === 'approved').length}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-6 shadow-sm">
            <div className="text-sm text-red-700 mb-1">Rejected</div>
            <div className="text-3xl font-bold text-red-900">
              {verifications.filter(v => v.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Verifications List */}
        {verifications.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <p className="text-gray-500">No {filter !== 'all' ? filter : ''} verifications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {verifications.map((verification) => {
              const methodBadge = getMethodBadge(verification.method);
              const statusBadge = getStatusBadge(verification.status);
              const StatusIcon = statusBadge.icon;

              return (
                <div key={verification.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        {verification.user?.avatar_url ? (
                          <img src={verification.user.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{verification.user?.full_name || 'Unknown User'}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Mail className="w-4 h-4 mr-1" />
                          {verification.user?.email}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${methodBadge.color}`}>
                            {methodBadge.text}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusBadge.color}`}>
                            {StatusIcon && <StatusIcon className="w-3 h-3" />}
                            {statusBadge.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Document/Email Info */}
                    <div className="flex-1">
                      {verification.method === 'id' && verification.document_url && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">ID Document:</p>
                          <a
                            href={verification.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                          >
                            View Document
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                      {(verification.method === 'student_email' || verification.method === 'work_email') && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Email Used:</p>
                          <p className="font-medium text-gray-900">{verification.email_used}</p>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Submitted {new Date(verification.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    {verification.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(verification.id)}
                          disabled={processing === verification.id}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {processing === verification.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(verification.id)}
                          disabled={processing === verification.id}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {verification.status === 'rejected' && verification.rejection_reason && (
                      <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                        <p className="text-sm text-red-900">
                          <strong>Rejection reason:</strong> {verification.rejection_reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
