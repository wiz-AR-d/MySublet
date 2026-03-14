-- 1. Remove the restrictive check constraint
-- This allows any string to be a role, or you can just use 'user' as the default for everyone.
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_role_check;

-- 2. Make sure the default is set to 'user' for new profiles
ALTER TABLE profiles ALTER COLUMN user_role SET DEFAULT 'user';

-- 3. Update all existing profiles to just be 'user' (optional, but good for consistency)
UPDATE profiles SET user_role = 'user' WHERE user_role IN ('sublessee', 'sublessor');

-- ==========================================
-- HOW TO MAKE SOMEONE AN ADMIN
-- ==========================================
-- Run this query, replacing the email with your actual login email.
-- This will set the user_role to 'admin', allowing them to pass admin RLS policies.
UPDATE profiles 
SET user_role = 'admin' 
WHERE email = 'your-email@example.com'; 
