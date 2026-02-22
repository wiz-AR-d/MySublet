-- Safe Migration for Listing Verification Flow
-- This version checks for existence before creating

-- 1. Add verification fields to profiles table (if not already exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='verification_status') THEN
        ALTER TABLE profiles ADD COLUMN verification_status VARCHAR(50) DEFAULT 'unverified';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='verification_method') THEN
        ALTER TABLE profiles ADD COLUMN verification_method VARCHAR(50);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='id_document_url') THEN
        ALTER TABLE profiles ADD COLUMN id_document_url TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='verified_at') THEN
        ALTER TABLE profiles ADD COLUMN verified_at TIMESTAMP;
    END IF;
END $$;

-- 2. Verifications table and listings table already exist - skipping

-- 3. Update RLS policy for listings to allow pending status (recreate safely)
DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
CREATE POLICY "Users can insert their own listings" 
  ON listings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 4. Update SELECT policy for listings (allow owners to see their own pending listings)
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

-- 5. Create or replace the function to update user verification status
CREATE OR REPLACE FUNCTION update_user_verification()
RETURNS TRIGGER AS $$
BEGIN
  -- If verification is approved, update the user's profile
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    UPDATE profiles 
    SET 
      verification_status = 'verified',
      verification_method = NEW.method,
      id_document_url = NEW.document_url,
      verified_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Also update any pending listings from this user to active
    UPDATE listings
    SET status = 'active', verification_status = 'approved'
    WHERE user_id = NEW.user_id AND status = 'pending';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger for auto-updating verification status (drop first if exists)
DROP TRIGGER IF EXISTS on_verification_approved ON verifications;
CREATE TRIGGER on_verification_approved
  AFTER UPDATE ON verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_user_verification();

-- 7. Ensure indexes exist (these use IF NOT EXISTS so they're safe)
CREATE INDEX IF NOT EXISTS idx_verifications_user_id ON verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_verifications_status ON verifications(status);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_user_id_status ON listings(user_id, status);

-- Done! The tables and RLS policies already exist from your previous setup.
