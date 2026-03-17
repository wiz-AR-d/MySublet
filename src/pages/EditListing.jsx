import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { listingsAPI } from '../services/api/listings';
import ListingForm from '../components/listings/ListingForm';
import { AlertCircle } from 'lucide-react';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user && id) {
      fetchListing();
    }
  }, [user, authLoading, id, navigate]);

  const fetchListing = async () => {
    setLoading(true);
    try {
      const { data, error } = await listingsAPI.getById(id);
      
      if (error) throw error;
      
      if (!data) {
        throw new Error('Listing not found');
      }

      // Verify ownership
      if (data.host?.id !== user.id) {
        throw new Error('You do not have permission to edit this listing');
      }

      setListing(data);
    } catch (err) {
      console.error('Error fetching listing:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Cannot Edit Listing</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => navigate('/my-listings')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition-colors font-bold"
          >
            Back to My Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Listing</h1>
        <p className="text-gray-400">Update the details for "{listing?.title}"</p>
      </div>
      <ListingForm initialData={listing} isEdit={true} />
    </div>
  );
}
