// Mock listing data based on the screenshots
export const mockListings = [
  {
    id: '1',
    title: "Shania's apartment in New York",
    location: 'New York, NY, USA',
    coordinates: [40.7829, -73.9654], // Upper West Side
    price: 3895,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 'SL', // Studio/Loft
    bathrooms: 1,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Shania',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted yesterday',
    amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Parking'],
    petPolicy: 'No pets',
    roomType: 'Private room'
  },
  {
    id: '2',
    title: "Lara's room in New York",
    location: 'New York, NY, USA',
    coordinates: [40.7505, -73.9934], // Chelsea
    price: 2211,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 2,
    bathrooms: 1,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Lara',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted today',
    amenities: ['Wi-Fi', 'Kitchen', 'Gym', 'Doorman'],
    petPolicy: 'Pets allowed',
    roomType: 'Private room'
  },
  {
    id: '3',
    title: "Ben's apartment in New York",
    location: 'New York, NY, USA',
    coordinates: [40.7359, -74.0014], // SoHo
    price: 6842,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 1,
    bathrooms: 1.5,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Ben',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted today',
    amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Balcony'],
    petPolicy: 'No pets',
    roomType: 'Entire home'
  },
  {
    id: '4',
    title: "Jaime's apartment in Brooklyn",
    location: 'Brooklyn, NY, USA',
    coordinates: [40.6892, -73.9442], // Williamsburg
    price: 4737,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 1,
    bathrooms: 1,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Jaime',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted yesterday',
    amenities: ['Wi-Fi', 'Kitchen', 'Gym', 'Rooftop'],
    petPolicy: 'Pets allowed',
    roomType: 'Private room'
  },
  {
    id: '5',
    title: "Yuan's apartment in Brooklyn",
    location: 'Brooklyn, NY, USA',
    coordinates: [40.6782, -73.9442], // Park Slope
    price: 4737,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 'SL',
    bathrooms: 1,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Yuan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted yesterday',
    amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Garden'],
    petPolicy: 'No pets',
    roomType: 'Entire home'
  },
  {
    id: '6',
    title: "Rebekah's room in New York",
    location: 'New York, NY, USA',
    coordinates: [40.7282, -73.9942], // Greenwich Village
    price: 2421,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 2,
    bathrooms: 1,
    roommates: 1,
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Rebekah',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted today',
    amenities: ['Wi-Fi', 'Kitchen', 'Doorman', 'Balcony'],
    petPolicy: 'Pets allowed',
    roomType: 'Private room'
  },
  // Add more listings to demonstrate pagination
  {
    id: '7',
    title: "Alex's studio in Manhattan",
    location: 'New York, NY, USA',
    coordinates: [40.7614, -73.9776], // Upper East Side
    price: 3200,
    currency: 'USD',
    duration: '/mo',
    bedrooms: 'SL',
    bathrooms: 1,
    roommates: 0,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
    },
    postedTime: 'Posted 2 days ago',
    amenities: ['Wi-Fi', 'Kitchen', 'Gym'],
    petPolicy: 'No pets',
    roomType: 'Entire home'
  }
];

// Currency conversion rates (you can later integrate with a real API)
export const currencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CAD: 1.25,
  AUD: 1.45
};

export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];