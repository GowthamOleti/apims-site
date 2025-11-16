-- ============================================
-- COMPLETE DATABASE SETUP FOR DISTRICT DESIGN HUB
-- Copy and paste this ENTIRE file into Supabase SQL Editor
-- ============================================

-- STEP 1: CREATE PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 2: CREATE RESOURCES TABLE
CREATE TABLE IF NOT EXISTS resources (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- STEP 3: ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- STEP 4: DROP ALL EXISTING POLICIES (to avoid conflicts)
DO $$ 
BEGIN
  -- Drop profiles policies
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  
  -- Drop resources policies
  DROP POLICY IF EXISTS "Resources are viewable by everyone" ON resources;
  DROP POLICY IF EXISTS "Authenticated users can insert resources" ON resources;
  DROP POLICY IF EXISTS "Users can update their own resources" ON resources;
  DROP POLICY IF EXISTS "Users can delete their own resources" ON resources;
END $$;

-- STEP 5: CREATE POLICIES FOR PROFILES TABLE
-- Anyone can view profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (TRUE);

-- Users can only insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- STEP 6: CREATE POLICIES FOR RESOURCES TABLE
-- Anyone can view all resources
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (TRUE);

-- Authenticated users can insert resources (IMPORTANT: This allows anyone signed in to add resources)
CREATE POLICY "Authenticated users can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.role() = 'authenticated'
    AND created_by = auth.uid()
  );

-- Users can only update resources they created
CREATE POLICY "Users can update their own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Users can only delete resources they created
CREATE POLICY "Users can delete their own resources"
  ON resources FOR DELETE
  USING (auth.uid() = created_by);

-- STEP 7: CREATE FUNCTION TO AUTO-CREATE PROFILE ON USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    )
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    name = COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      profiles.name
    ),
    email = NEW.email,
    avatar_url = COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture',
      profiles.avatar_url
    ),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 8: CREATE TRIGGER FOR AUTO-PROFILE CREATION
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- STEP 9: CREATE STORAGE BUCKET FOR UI FINDINGS IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('ui-findings', 'ui-findings', true)
ON CONFLICT (id) DO NOTHING;

-- STEP 10: CREATE STORAGE POLICIES FOR UI FINDINGS BUCKET
-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own uploads" ON storage.objects;

-- Allow anyone to view images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ui-findings');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'ui-findings' 
    AND auth.role() = 'authenticated'
  );

-- Allow users to update their own uploads
CREATE POLICY "Users can update own uploads"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'ui-findings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own uploads"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'ui-findings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- SETUP COMPLETE!
-- 
-- Next steps:
-- 1. Verify tables exist: Check Table Editor
-- 2. Verify policies: Check Table Editor → resources → Policies tab
-- 3. Test: Try adding a resource in the app
-- ============================================
