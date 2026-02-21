// Data transformers for European listing structure
// Transforms between app format and Supabase format

/**
 * Transform listing from Supabase format to app format
 */
export function transformListing(supabaseListing, profile) {
  if (!supabaseListing) return null;

  return {
    id: supabaseListing.id,
    
    // Basic Info
    title: supabaseListing.title,
    description: supabaseListing.description,
    propertyType: supabaseListing.property_type,
    whatOffering: supabaseListing.what_offering,
    furnishing: supabaseListing.furnishing,
    rentalType: supabaseListing.rental_type,
    registration: supabaseListing.registration,
    
    // Property Details
    totalRooms: supabaseListing.total_rooms,
    roomsOffered: supabaseListing.rooms_offered,
    bathrooms: supabaseListing.bathrooms,
    
    // BACKWARD COMPATIBILITY: Map to old field names
    bedrooms: supabaseListing.total_rooms, // For components still using bedrooms
    
    // Location
    street: supabaseListing.street,
    houseNumber: supabaseListing.house_number,
    city: supabaseListing.city,
    postalCode: supabaseListing.postal_code,
    location: `${supabaseListing.street} ${supabaseListing.house_number}, ${supabaseListing.city}`,
    coordinates: null,
    // coordinates: supabaseListing.coordinates,
    
    // BACKWARD COMPATIBILITY: Old location fields
    address: `${supabaseListing.street} ${supabaseListing.house_number}`,
    zip_code: supabaseListing.postal_code,
    state: '', // Not used in Europe
    
    // Pricing
    monthlyRent: supabaseListing.monthly_rent,
    deposit: supabaseListing.deposit,
    price: supabaseListing.monthly_rent, // For backward compatibility
    currency: 'EUR',
    duration: '/mo',
    
    // BACKWARD COMPATIBILITY: Old pricing field
    price_per_month: supabaseListing.monthly_rent,
    
    // Availability
    availabilityDates: supabaseListing.availability_dates || [
      {
        moveIn: supabaseListing.available_from,
        moveOut: supabaseListing.available_to,
      }
    ],
    available_from: supabaseListing.available_from,
    available_to: supabaseListing.available_to,
    
    // Images
    images: supabaseListing.images || [],
    photos: supabaseListing.images || [], // Alias
    
    // Amenities & Policies
    amenities: supabaseListing.amenities || [],
    petPolicy: supabaseListing.pet_policy,
    
    // Roommates
    roommatesCount: supabaseListing.roommates?.length || 0,
    roommates: supabaseListing.roommates || [],
    
    // Host Info
    host: profile ? {
      id: profile.id,
      name: profile.full_name,
      avatar: profile.avatar_url,
      email: profile.email,
      bio: profile.bio,
      university: profile.university,
      company: profile.company,
      instagram: profile.instagram,
      linkedin: profile.linkedin,
    } : null,
    
    // Metadata
    status: supabaseListing.status,
    views: supabaseListing.views || 0,
    views_count: supabaseListing.views || 0, // Backward compatibility
    created_at: supabaseListing.created_at,
    updated_at: supabaseListing.updated_at,
    
    // Computed fields
    postedTime: getRelativeTime(supabaseListing.created_at),
    
    // Include Supabase fields for reference
    _supabase: {
      user_id: supabaseListing.user_id,
      available_from: supabaseListing.available_from,
      available_to: supabaseListing.available_to,
      status: supabaseListing.status,
      square_feet: supabaseListing.square_feet,
      house_rules: supabaseListing.house_rules,
      views_count: supabaseListing.views_count,
      created_at: supabaseListing.created_at,
      updated_at: supabaseListing.updated_at
    }
  };
}

/**
 * Transform listing from app format to Supabase format
 */
export function transformListingToSupabase(appListing, userId) {
  // Extract first availability date (primary)
  const primaryDate = appListing.availabilityDates?.[0] || {
    moveIn: appListing.available_from,
    moveOut: appListing.available_to,
  };

  // Build the full address from parts
  const fullAddress = `${appListing.street || ''} ${appListing.houseNumber || ''}`.trim();
  
  return {
    // User
    user_id: userId,
    
    // Basic Info
    title: appListing.title?.trim(),
    description: appListing.description?.trim(),
    property_type: appListing.propertyType,
    what_offering: appListing.whatOffering,
    furnishing: appListing.furnishing,
    rental_type: appListing.rentalType,
    registration: appListing.registration,
    
    // Property Details
    total_rooms: appListing.totalRooms || appListing.bedrooms, // Support old field
    rooms_offered: appListing.roomsOffered || appListing.bedrooms, // Support old field
    bedrooms: appListing.totalRooms || appListing.bedrooms, // Keep for backward compatibility
    bathrooms: appListing.bathrooms,
    
    // Location - NEW FIELDS
    street: appListing.street?.trim(),
    house_number: appListing.houseNumber?.trim(),
    city: appListing.city?.trim(),
    postal_code: appListing.postalCode?.trim() || appListing.zip_code?.trim(), // Support old field
    
    // Location - OLD FIELDS (required by database constraint)
    address: fullAddress || appListing.address?.trim(), // Build from parts or use existing
    state: appListing.state?.trim() || '', // Empty string if not provided
    zip_code: appListing.postalCode?.trim() || appListing.zip_code?.trim() || '', // Support both
    
    // coordinates: appListing.coordinates || null,
    
    // Pricing - NEW FIELDS (EUR only)
    monthly_rent: parseFloat(appListing.monthlyRent || appListing.price || appListing.price_per_month || 0),
    deposit: parseFloat(appListing.deposit || appListing.monthlyRent || appListing.price || 0),
    
    // Pricing - OLD FIELDS (required by database constraint)
    price_per_month: parseFloat(appListing.monthlyRent || appListing.price || appListing.price_per_month || 0),
    
    // Availability
    available_from: primaryDate.moveIn || appListing.available_from,
    available_to: primaryDate.moveOut || appListing.available_to,
    availability_dates: appListing.availabilityDates || [],
    
    // Images (Cloudinary URLs)
    images: appListing.photos || appListing.images || [],
    
    // Amenities & Policies
    amenities: appListing.amenities || [],
    pet_policy: appListing.petPolicy,
    
    // Roommates
    roommates: appListing.roommates || [],
    
    // Status
    status: appListing.status || 'active',
    
    // Optional fields
    square_feet: appListing.square_feet || null,
    house_rules: appListing.house_rules || null,
  };
}

/**
 * Transform Supabase booking to app format
 */
export function transformBooking(supabaseBooking, listing = null, profile = null) {
  if (!supabaseBooking) return null;

  return {
    id: supabaseBooking.id,
    listing_id: supabaseBooking.listing_id,
    tenant_id: supabaseBooking.tenant_id,
    start_date: supabaseBooking.start_date,
    end_date: supabaseBooking.end_date,
    total_price: parseFloat(supabaseBooking.total_price || 0),
    status: supabaseBooking.status,
    special_requests: supabaseBooking.special_requests || '',
    created_at: supabaseBooking.created_at,
    updated_at: supabaseBooking.updated_at,
    listing: listing ? transformListing(listing, listing.profiles) : null,
    tenant: profile ? {
      id: profile.id,
      name: profile.full_name || 'Unknown',
      avatar: profile.avatar_url || '',
      email: profile.email || ''
    } : null
  };
}

/**
 * Transform Supabase message to app format
 */
export function transformMessage(supabaseMessage, senderProfile = null, receiverProfile = null) {
  if (!supabaseMessage) return null;

  return {
    id: supabaseMessage.id,
    sender_id: supabaseMessage.sender_id,
    receiver_id: supabaseMessage.receiver_id,
    listing_id: supabaseMessage.listing_id,
    message: supabaseMessage.message,
    read: supabaseMessage.read || false,
    created_at: supabaseMessage.created_at,
    sender: senderProfile ? {
      id: senderProfile.id,
      name: senderProfile.full_name || 'Unknown',
      avatar: senderProfile.avatar_url || ''
    } : null,
    receiver: receiverProfile ? {
      id: receiverProfile.id,
      name: receiverProfile.full_name || 'Unknown',
      avatar: receiverProfile.avatar_url || ''
    } : null
  };
}

/**
 * Transform user profile data
 */
export function transformProfile(supabaseProfile) {
  if (!supabaseProfile) return null;

  return {
    id: supabaseProfile.id,
    full_name: supabaseProfile.full_name,
    avatar_url: supabaseProfile.avatar_url,
    email: supabaseProfile.email,
    phone: supabaseProfile.phone,
    bio: supabaseProfile.bio,
    university: supabaseProfile.university,
    company: supabaseProfile.company,
    instagram: supabaseProfile.instagram,
    linkedin: supabaseProfile.linkedin,
    created_at: supabaseProfile.created_at,
    updated_at: supabaseProfile.updated_at,
  };
}

/**
 * Get relative time from timestamp
 */
function getRelativeTime(timestamp) {
  if (!timestamp) return 'Just now';
  
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Validate listing data before submission
 */
export function validateListingData(listing) {
  const errors = [];

  // Required fields
  if (!listing.title || listing.title.trim().length < 10) {
    errors.push('Title must be at least 10 characters');
  }
  
  if (!listing.description || listing.description.trim().length < 50) {
    errors.push('Description must be at least 50 characters');
  }
  
  if (!listing.propertyType) errors.push('Property type is required');
  if (!listing.whatOffering) errors.push('What you are offering is required');
  if (!listing.furnishing) errors.push('Furnishing status is required');
  if (!listing.rentalType) errors.push('Rental type is required');
  if (!listing.registration) errors.push('Registration option is required');
  
  const totalRooms = listing.totalRooms || listing.bedrooms;
  const roomsOffered = listing.roomsOffered || listing.bedrooms;
  
  if (!totalRooms || totalRooms < 1) {
    errors.push('Total rooms must be at least 1');
  }
  
  if (!roomsOffered || roomsOffered < 1) {
    errors.push('Rooms offered must be at least 1');
  }
  
  if (!listing.bathrooms || listing.bathrooms < 1) {
    errors.push('Number of bathrooms is required');
  }
  
  // Location - check new fields
  if (!listing.street) errors.push('Street is required');
  if (!listing.houseNumber) errors.push('House number is required');
  if (!listing.city) errors.push('City is required');
  
  const postalCode = listing.postalCode || listing.zip_code;
  if (!postalCode) errors.push('Postal code is required');
  
  // Pricing
  const monthlyRent = listing.monthlyRent || listing.price || listing.price_per_month;
  if (!monthlyRent || parseFloat(monthlyRent) <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }
  
  const deposit = listing.deposit;
  if (deposit !== undefined && deposit !== null && parseFloat(deposit) < 0) {
    errors.push('Deposit cannot be negative');
  }
  
  // Availability
  const primaryDate = listing.availabilityDates?.[0];
  const moveIn = primaryDate?.moveIn || listing.available_from;
  const moveOut = primaryDate?.moveOut || listing.available_to;
  
  if (!moveIn) errors.push('Move-in date is required');
  if (!moveOut) errors.push('Move-out date is required');
  
  if (moveIn && moveOut) {
    if (new Date(moveOut) <= new Date(moveIn)) {
      errors.push('Move-out date must be after move-in date');
    }
  }
  
  // Images
  const images = listing.photos || listing.images || [];
  if (images.length < 1) {
    errors.push('At least 1 photo is required');
  }
  
  // Pet policy
  if (!listing.petPolicy) errors.push('Pet policy is required');
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}