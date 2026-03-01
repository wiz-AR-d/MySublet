-- Migration: Add Saved Listings Feature
-- Create saved_listings table for users to bookmark listings

-- 1. Create saved_listings table
CREATE TABLE IF NOT EXISTS saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_saved_listings_user ON saved_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_listings_listing ON saved_listings(listing_id);
CREATE INDEX IF NOT EXISTS idx_saved_listings_created ON saved_listings(created_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Users can view their own saved listings
DROP POLICY IF EXISTS "Users can view their own saved listings" ON saved_listings;
CREATE POLICY "Users can view their own saved listings"
  ON saved_listings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own saved listings
DROP POLICY IF EXISTS "Users can insert their own saved listings" ON saved_listings;
CREATE POLICY "Users can insert their own saved listings"
  ON saved_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own saved listings
DROP POLICY IF EXISTS "Users can delete their own saved listings" ON saved_listings;
CREATE POLICY "Users can delete their own saved listings"
  ON saved_listings FOR DELETE
  USING (auth.uid() = user_id);

-- Comment
COMMENT ON TABLE saved_listings IS 'Stores user bookmarked/saved listings';
