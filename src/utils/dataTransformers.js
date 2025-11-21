// Transform data between Supabase schema and app format

/**
 * Transform Supabase listing to app format
 */
export function transformListing(supabaseListing, profile = null) {
  if (!supabaseListing) return null;

  // Parse location from address, city, state, zip_code
  const locationParts = [
    supabaseListing.address,
    supabaseListing.city,
    supabaseListing.state,
    supabaseListing.zip_code
  ].filter(Boolean);
  const location = locationParts.join(', ');

  // Extract coordinates from amenities if stored, or default to NYC
  const coordinates = supabaseListing.amenities?.coordinates || [40.7128, -74.0060];

  // Format posted time
  const postedTime = formatPostedTime(supabaseListing.created_at);

  // Get host info from profile or default
  const host = profile ? {
    name: profile.full_name || 'Unknown',
    avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b742?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
  } : {
    name: 'Unknown',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
  };

  // Parse amenities
  const amenitiesList = Array.isArray(supabaseListing.amenities?.list) 
    ? supabaseListing.amenities.list 
    : typeof supabaseListing.amenities === 'object' && supabaseListing.amenities !== null
    ? Object.keys(supabaseListing.amenities).filter(key => supabaseListing.amenities[key])
    : [];

  // Determine room type from bedrooms
  let roomType = 'Private room';
  if (supabaseListing.bedrooms === 1 && supabaseListing.bathrooms >= 1) {
    roomType = 'Entire home';
  }

  // Determine pet policy from amenities
  const petPolicy = supabaseListing.amenities?.pets === true ? 'Pets allowed' : 'No pets';

  // Format bedrooms (handle studio/loft)
  let bedroomsDisplay = supabaseListing.bedrooms;
  if (supabaseListing.bedrooms === 0 || supabaseListing.bedrooms === null) {
    bedroomsDisplay = 'SL'; // Studio/Loft
  }

  return {
    id: supabaseListing.id,
    title: supabaseListing.title,
    description: supabaseListing.description || '',
    location: location,
    coordinates: coordinates,
    price: parseFloat(supabaseListing.price_per_month || 0),
    currency: 'USD', // Default currency
    duration: '/mo',
    bedrooms: bedroomsDisplay,
    bathrooms: supabaseListing.bathrooms || 1,
    roommates: supabaseListing.amenities?.roommates || 1,
    images: supabaseListing.images && supabaseListing.images.length > 0 
      ? supabaseListing.images 
      : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&h=600&fit=crop'],
    host: host,
    postedTime: postedTime,
    amenities: amenitiesList,
    petPolicy: petPolicy,
    roomType: roomType,
    // Include all Supabase fields for reference
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
 * Transform app listing format to Supabase format
 */
export function transformListingToSupabase(appListing, userId) {
  // Parse location to extract city, state, address
  const locationParts = appListing.location?.split(',').map(s => s.trim()) || [];
  
  let address = '';
  let city = '';
  let state = '';
  let zip_code = '';

  if (locationParts.length > 0) {
    address = locationParts[0] || '';
    city = locationParts.length > 1 ? locationParts[locationParts.length - 2] || '' : '';
    state = locationParts.length > 2 ? locationParts[locationParts.length - 1] || '' : '';
    // If last part looks like zip code, extract it
    if (locationParts[locationParts.length - 1]?.match(/^\d{5}(-\d{4})?$/)) {
      zip_code = locationParts[locationParts.length - 1];
      state = locationParts.length > 2 ? locationParts[locationParts.length - 2] || '' : '';
      city = locationParts.length > 3 ? locationParts[locationParts.length - 3] || '' : '';
    }
  }

  // Parse bedrooms (handle SL)
  const bedrooms = appListing.bedrooms === 'SL' ? 0 : parseInt(appListing.bedrooms) || 0;

  // Build amenities object
  const amenities = {
    list: Array.isArray(appListing.amenities) ? appListing.amenities : [],
    pets: appListing.petPolicy === 'Pets allowed',
    roommates: appListing.roommates || 1,
    coordinates: appListing.coordinates || null
  };

  // Use direct fields if provided, otherwise parse from location
  const finalAddress = appListing.address || address || appListing.location || '';
  const finalCity = appListing.city || city || '';
  const finalState = appListing.state || state || '';
  const finalZip = appListing.zip_code || zip_code || '';

  return {
    user_id: userId,
    title: appListing.title,
    description: appListing.description || '',
    address: finalAddress,
    city: finalCity,
    state: finalState,
    zip_code: finalZip,
    price_per_month: appListing.price || 0,
    available_from: appListing.available_from || appListing._supabase?.available_from || new Date().toISOString().split('T')[0],
    available_to: appListing.available_to || appListing._supabase?.available_to || new Date().toISOString().split('T')[0],
    bedrooms: bedrooms,
    bathrooms: parseFloat(appListing.bathrooms) || 1,
    images: Array.isArray(appListing.images) ? appListing.images : (appListing.images ? [appListing.images] : []),
    amenities: amenities,
    status: appListing.status || 'active',
    square_feet: appListing.square_feet || appListing._supabase?.square_feet || null,
    house_rules: appListing.house_rules || appListing._supabase?.house_rules || null
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
    listing: listing ? transformListing(listing) : null,
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
 * Format posted time relative to now
 */
function formatPostedTime(dateString) {
  if (!dateString) return 'Recently posted';
  
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now - posted;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Posted just now';
  if (diffHours < 24) return `Posted ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Posted yesterday';
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  
  return `Posted on ${posted.toLocaleDateString()}`;
}

