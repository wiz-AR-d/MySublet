// Enhanced app constants for sublease platform

export const APP_NAME = 'Sublease App';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LISTINGS: '/listings',
  CREATE_LISTING: '/create-listing',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Property Types
export const PROPERTY_TYPES = {
  APARTMENT: 'Apartment',
  SHARED_APARTMENT: 'Shared apartment',
  STUDIO: 'Studio',
  HOUSE: 'House',
};

// What Offering
export const OFFERING_TYPES = {
  PRIVATE_BEDROOM: 'Private bedroom',
  ENTIRE_PLACE: 'Entire place',
};

// Furnishing Status
export const FURNISHING_STATUS = {
  MOVE_IN_READY: 'Move-in ready',
  FURNISHED: 'Furnished',
  UNFURNISHED: 'Unfurnished',
};

// Rental Types
export const RENTAL_TYPES = {
  SUBLET: 'Sublet',
  ROOM_TAKEOVER: 'Room takeover',
  NEW_LEASE: 'New lease',
};

// Registration Options
export const REGISTRATION_OPTIONS = {
  YES: 'Yes',
  NO: 'No',
  LONG_STAY_ONLY: 'Long stay only',
};

// Pet Policy
export const PET_POLICY = {
  ALLOWED: 'Pets allowed',
  NOT_ALLOWED: 'No pets',
  SMALL_PETS_ONLY: 'Only small pets',
};

// Listing Status
export const LISTING_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  RENTED: 'rented',
  CANCELLED: 'cancelled',
  DRAFT: 'draft',
};

// Amenities List
export const AMENITIES = [
  'Heating',
  'Washing machine',
  'Dryer',
  'Wifi',
  'Dishwasher',
  'Oven',
  'Stove',
  'Microwave',
  'Elevator',
  'Balcony',
  'Storage room',
  'Bike storage',
  'Parking / Garage',
  'Garden access',
  'Wheelchair accessible',
];

// Gender Options
export const GENDER_OPTIONS = {
  MALE: 'Male',
  FEMALE: 'Female',
  NON_BINARY: 'Non-binary',
  PREFER_NOT_TO_SAY: 'Prefer not to say',
};

// Form validation rules
export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MIN_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  BIO_MIN_LENGTH: 20,
  MIN_PHOTOS: 3,
  MAX_PHOTOS: 10,
};