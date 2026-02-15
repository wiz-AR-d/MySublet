import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import useAuthStore from "./store/authStore";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import MyListings from "./pages/MyListings";

function App() {
  const { initialize, initialized } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize auth on mount
    const initAuth = async () => {
      await initialize();
      setIsInitializing(false);
    };

    initAuth();
  }, []); // Empty dependency array - run once on mount

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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected Routes */}
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
                <ProtectedRoute requireRole="sublessor">
                  <MyListings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-listing"
              element={
                <ProtectedRoute requireRole="sublessor">
                  <CreateListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">
                      Messages - Coming Soon
                    </h1>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600">Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
