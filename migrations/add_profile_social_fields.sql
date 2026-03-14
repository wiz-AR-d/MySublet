-- Migration: Add social and company fields to profiles table
-- Run this in your Supabase SQL editor

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='profiles' AND column_name='company') THEN
        ALTER TABLE profiles ADD COLUMN company TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='profiles' AND column_name='instagram') THEN
        ALTER TABLE profiles ADD COLUMN instagram TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='profiles' AND column_name='linkedin') THEN
        ALTER TABLE profiles ADD COLUMN linkedin TEXT;
    END IF;
END $$;
