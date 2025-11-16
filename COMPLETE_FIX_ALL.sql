-- ============================================
-- COMPLETE FIX: Rebuild Everything from Scratch
-- ⚠️ WARNING: This will DELETE all existing data!
-- Run this if nothing else works
-- ============================================

-- STEP 1: Drop everything (CASCADE removes dependent objects)
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- STEP 2: Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 3: Create resources table (with ALL columns)
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

-- STEP 4: Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- STEP 5: Create profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- STEP 6: Create resources policies
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.role() = 'authenticated'
    AND created_by = auth.uid()
  );

CREATE POLICY "Users can update their own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own resources"
  ON resources FOR DELETE
  USING (auth.uid() = created_by);

-- STEP 7: Create auto-profile function
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

-- STEP 8: Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- STEP 9: Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('ui-findings', 'ui-findings', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- STEP 10: Storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own uploads" ON storage.objects;

CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ui-findings');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'ui-findings' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own uploads"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'ui-findings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own uploads"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'ui-findings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- ✅ DONE! Everything is recreated.
-- Now test adding a resource in the app.
-- ============================================

