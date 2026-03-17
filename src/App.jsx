import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { Toaster } from "sonner";
import useAuthStore from "./store/authStore";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import Landing from "./pages/Landing";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import SavedListings from "./pages/SavedListings";
import Messages from "./pages/Messages";
import ListingDetail from "./pages/ListingDetail";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import Terms from "./pages/Terms";
import VerifyIdentity from "./pages/VerifyIdentity";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerifications from "./pages/admin/AdminVerifications";

// Layout wrapper
function Layout({ children }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Header />}

      <main className="grow">{children}</main>

      <Footer />
    </div>
  );
}

function App() {
  const { initialize, initialized, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize auth on mount
    const initAuth = async () => {
      await initialize();
      setIsInitializing(false);
    };

    initAuth();
  }, []); // Empty dependency array - run once on mount

  // Handle OAuth callback redirect
  useEffect(() => {
    // Check if we have OAuth tokens in the URL hash
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      console.log('[App] OAuth callback detected, waiting for session...');

      // Wait for user to be set by onAuthStateChange
      const checkAuth = setInterval(() => {
        if (user) {
          console.log('[App] User authenticated, redirecting to dashboard');
          clearInterval(checkAuth);
          // Clear hash and redirect to dashboard
          window.location.href = '/dashboard';
        }
      }, 100); // Check every 100ms

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkAuth);
        if (!user) {
          console.error('[App] OAuth timeout, redirecting to login');
          window.location.href = '/login';
        }
      }, 5000);

      return () => clearInterval(checkAuth);
    }
  }, [user]);

  // Show loading screen while initializing
  if (isInitializing || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Landing Page with video - Main home */}
          <Route path="/" element={<Landing />} />

          {/* Public Routes - WITH header/footer */}
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Protected Routes - WITH header/footer */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-listings"
            element={
              <ProtectedRoute>
                <SavedListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/:id/edit"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify-identity"
            element={
              <ProtectedRoute>
                <VerifyIdentity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify/:listingId"
            element={
              <ProtectedRoute>
                <VerifyIdentity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/verifications"
            element={
              <ProtectedRoute>
                <AdminVerifications />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors duration={2000} />
    </Router>
  );
}

export default App;
