-- ============================================
-- COMPLETE BACKEND SETUP FOR DISTRICT DESIGN HUB
-- Copy this ENTIRE file into Supabase SQL Editor and run it
-- ============================================

-- ==========================================
-- PART 1: DROP EVERYTHING (Clean Start)
-- ==========================================
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- ==========================================
-- PART 2: CREATE TABLES
-- ==========================================

-- Profiles table (stores user information)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table (stores all design resources)
CREATE TABLE resources (
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

-- ==========================================
-- PART 3: ENABLE ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- PART 4: CREATE POLICIES FOR PROFILES
-- ==========================================

-- Anyone can view all profiles
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

-- ==========================================
-- PART 5: CREATE POLICIES FOR RESOURCES
-- ==========================================

-- Anyone can view all resources
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (TRUE);

-- Authenticated users can insert resources
CREATE POLICY "Authenticated users can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.role() = 'authenticated'
    AND created_by = auth.uid()
  );

-- Users can update their own resources
CREATE POLICY "Users can update their own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Users can delete their own resources
CREATE POLICY "Users can delete their own resources"
  ON resources FOR DELETE
  USING (auth.uid() = created_by);

-- ==========================================
-- PART 6: AUTO-CREATE PROFILE FUNCTION
-- ==========================================
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

-- ==========================================
-- PART 7: CREATE TRIGGER
-- ==========================================
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- PART 8: STORAGE BUCKET FOR IMAGES
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('ui-findings', 'ui-findings', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- ==========================================
-- PART 9: STORAGE POLICIES
-- ==========================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own uploads" ON storage.objects;

-- Allow anyone to view images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ui-findings');

-- Allow authenticated users to upload
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

-- ==========================================
-- PART 10: VERIFICATION
-- ==========================================

-- Check tables
SELECT 
  'Tables created' as status,
  COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'resources');

-- Check RLS
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('profiles', 'resources');

-- Check policies
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('profiles', 'resources')
GROUP BY tablename;

-- Check storage bucket
SELECT 
  id,
  name,
  public
FROM storage.buckets
WHERE id = 'ui-findings';

-- ============================================
-- ✅ BACKEND SETUP COMPLETE!
-- 
-- Next steps:
-- 1. Go to Authentication → Providers → Enable Google
-- 2. Add your Google OAuth credentials
-- 3. Set Redirect URLs in Authentication → URL Configuration
-- 4. Test the app!
-- ============================================

