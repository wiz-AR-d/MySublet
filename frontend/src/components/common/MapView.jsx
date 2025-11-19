import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const MapView = ({ listings, center = { lat: 40.7580, lng: -73.9855 } }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const googleMapRef = useRef(null);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      setMap(mapInstance);
      googleMapRef.current = mapInstance;
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      // TODO: Replace with your Google Maps API key
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initMap);
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [center]);

  // Add markers to map
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = listings.map(listing => {
      // Create custom marker with price
      const markerDiv = document.createElement('div');
      markerDiv.className = 'custom-marker';
      markerDiv.innerHTML = `
        <div style="
          background: #2563eb;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: all 0.2s;
        "
        onmouseover="this.style.transform='scale(1.1)';this.style.background='#1d4ed8';"
        onmouseout="this.style.transform='scale(1)';this.style.background='#2563eb';"
        >
          $${listing.price.toLocaleString()}
        </div>
      `;

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: listing.lat, lng: listing.lng },
        map: map,
        content: markerDiv,
        title: listing.title,
      });

      // Add click listener
      marker.addListener('click', () => {
        // TODO: Show listing details
        console.log('Clicked listing:', listing);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Cleanup
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, listings]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative bg-gray-100 ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-full'
    }`}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5 text-gray-700" />
        ) : (
          <Maximize2 className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Help Button */}
      <button
        className="absolute bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
        onClick={() => alert('Need help finding a place? Contact our support team!')}
      >
        <span className="text-xl">🔥</span>
        <span>Need a place asap?</span>
      </button>

      {/* Fallback for when Google Maps is not loaded */}
      {!window.google && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <div className="animate-pulse mb-4">
              <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-4"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading map...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please add your Google Maps API key to .env file
            </p>
            <p className="text-xs text-gray-400 mt-1">
              REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;