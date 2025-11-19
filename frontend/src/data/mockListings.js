export const mockListings = [
  {
    id: 1,
    title: "Rachel's room in New York",
    price: 1805,
    location: "New York, NY",
    lat: 40.7580,
    lng: -73.9855,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    bedrooms: 2,
    bathrooms: 1,
    roommates: 1,
    host: {
      name: "Rachel",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    postedDate: "2024-11-18",
    amenities: ["In-unit laundry", "Gym", "Doorman"],
    placeType: "Private room",
    pets: "Pets allowed",
    roommateGender: "Female"
  },
  {
    id: 2,
    title: "Carmel's room in New York",
    price: 1768,
    location: "New York, NY",
    lat: 40.7489,
    lng: -73.9680,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
    ],
    bedrooms: 3,
    bathrooms: 1,
    roommates: 1,
    host: {
      name: "Carmel",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    postedDate: "2024-11-17",
    amenities: ["Building laundry", "Doorman"],
    placeType: "Private room",
    pets: "Pets prohibited",
    roommateGender: "Female"
  },
  {
    id: 3,
    title: "Jaime's apartment in Brooklyn",
    price: 4737,
    location: "Brooklyn, NY",
    lat: 40.6782,
    lng: -73.9442,
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800&h=600&fit=crop"
    ],
    bedrooms: 1,
    bathrooms: 1,
    roommates: 1,
    host: {
      name: "Jaime",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    postedDate: "2024-11-17",
    amenities: ["In-unit laundry", "Gym"],
    placeType: "Entire home",
    pets: "Pets allowed",
    roommateGender: "Non-binary"
  },
  {
    id: 4,
    title: "Rhyann's room in New York",
    price: 1684,
    location: "New York, NY",
    lat: 40.7614,
    lng: -73.9776,
    images: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"
    ],
    bedrooms: 1,
    bathrooms: 1,
    roommates: 1,
    host: {
      name: "Rhyann",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    postedDate: "2024-11-18",
    amenities: ["In-unit laundry"],
    placeType: "Private room",
    pets: "Pets prohibited",
    roommateGender: "Female"
  },
  {
    id: 5,
    title: "Michael's apartment in Brooklyn",
    price: 3316,
    location: "Brooklyn, NY",
    lat: 40.6892,
    lng: -73.9577,
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop"
    ],
    bedrooms: 1,
    bathrooms: 1,
    roommates: 1,
    host: {
      name: "Michael",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    postedDate: "2024-11-18",
    amenities: ["Building laundry", "Gym", "Doorman"],
    placeType: "Entire home",
    pets: "Pets allowed",
    roommateGender: "Male"
  },
  {
    id: 6,
    title: "Anazia's room in Brooklyn",
    price: 2211,
    location: "Brooklyn, NY",
    lat: 40.6650,
    lng: -73.9565,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop"
    ],
    bedrooms: 2,
    bathrooms: 1,
    roommates: 2,
    host: {
      name: "Anazia",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    postedDate: "2024-11-17",
    amenities: ["In-unit laundry", "Doorman"],
    placeType: "Private room",
    pets: "Pets prohibited",
    roommateGender: "Female"
  }
];

// Generate more listings for the map
export const generateMoreListings = () => {
  const names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn"];
  const titles = ["room", "apartment", "studio"];
  const locations = [
    { name: "Manhattan, NY", lat: 40.7831, lng: -73.9712 },
    { name: "Brooklyn, NY", lat: 40.6782, lng: -73.9442 },
    { name: "Queens, NY", lat: 40.7282, lng: -73.7949 },
    { name: "Bronx, NY", lat: 40.8448, lng: -73.8648 },
  ];
  
  const additionalListings = [];
  for (let i = 7; i <= 555; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    additionalListings.push({
      id: i,
      title: `${name}'s ${title} in ${location.name.split(',')[0]}`,
      price: Math.floor(Math.random() * 4000) + 1500,
      location: location.name,
      lat: location.lat + (Math.random() - 0.5) * 0.1,
      lng: location.lng + (Math.random() - 0.5) * 0.1,
      images: [
        `https://images.unsplash.com/photo-${1560440000000 + i}?w=800&h=600&fit=crop`,
      ],
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 2) + 1,
      roommates: Math.floor(Math.random() * 3),
      host: {
        name: name,
        avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`
      },
      postedDate: "2024-11-17",
      amenities: ["In-unit laundry"],
      placeType: title === "apartment" ? "Entire home" : "Private room",
      pets: Math.random() > 0.5 ? "Pets allowed" : "Pets prohibited",
      roommateGender: ["Male", "Female", "Non-binary"][Math.floor(Math.random() * 3)]
    });
  }
  
  return [...mockListings, ...additionalListings];
};