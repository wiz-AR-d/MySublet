import {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {currencyRates, convertPrice, getCurrencySymbol} from '../../utils/currency';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for price bubbles
const createPriceIcon = (price, currency, isSelected = false) => {
  const convertedPrice = convertPrice(price, 'USD', currency);
  const symbol = getCurrencySymbol(currency);

  return L.divIcon({
    html: `
      <div class="${isSelected
        ? 'bg-black text-white border-black'
        : 'bg-white text-black border-gray-300 hover:bg-gray-50'
      } px-3 py-2 rounded-full border-2 shadow-lg font-semibold text-sm whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200">
        ${symbol}${Math.round(convertedPrice).toLocaleString()}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

export default function ListingMap({listings, selectedCurrency, selectedListingId = null}) {
  const [selectedListing, setSelectedListing] = useState(null);

  // Default center (Germany)
  const defaultCenter = [51.1657, 10.4515];
  const defaultZoom = 6;

  // Calculate map bounds based on listings
  const getMapBounds = () => {
    if (!listings || listings.length === 0) return null;

    const bounds = L.latLngBounds();
    listings.forEach(listing => {
      if (listing.coordinates && listing.coordinates.length === 2) {
        bounds.extend([listing.coordinates[0], listing.coordinates[1]]);
      }
    });

    return bounds.isValid() ? bounds : null;
  };

  return (
    <div className="w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="w-full h-full"
        bounds={getMapBounds()}
        boundsOptions={{padding: [20, 20]}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listings?.map((listing) => {
          if (!listing.coordinates || listing.coordinates.length !== 2) return null;

          const isSelected = selectedListingId === listing.id || selectedListing?.id === listing.id;

          return (
            <Marker
              key={listing.id}
              position={[listing.coordinates[0], listing.coordinates[1]]}
              icon={createPriceIcon(listing.price, selectedCurrency, isSelected)}
              eventHandlers={{
                click: () => setSelectedListing(listing),
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                }
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <div className="flex space-x-3">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {listing.location}
                      </p>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-bold text-gray-900 text-sm">
                          {getCurrencySymbol(selectedCurrency)}
                          {Math.round(convertPrice(listing.price, 'USD', selectedCurrency)).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-600">/mo</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-600">
                          {listing.bedrooms} bed • {listing.bathrooms} bath
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}