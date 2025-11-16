-- ============================================
-- FIX: Resources Not Saving
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- Step 1: Drop and recreate resources table with correct structure
DROP TABLE IF EXISTS resources CASCADE;

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

-- Step 2: Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop old policies if they exist
DROP POLICY IF EXISTS "Resources are viewable by everyone" ON resources;
DROP POLICY IF EXISTS "Authenticated users can insert resources" ON resources;
DROP POLICY IF EXISTS "Users can update their own resources" ON resources;
DROP POLICY IF EXISTS "Users can delete their own resources" ON resources;

-- Step 4: Create correct policies
-- Everyone can view
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (TRUE);

-- Authenticated users can insert (this is the key policy)
CREATE POLICY "Authenticated users can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.role() = 'authenticated'
    AND created_by = auth.uid()
  );

-- Users can update their own
CREATE POLICY "Users can update their own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Users can delete their own
CREATE POLICY "Users can delete their own resources"
  ON resources FOR DELETE
  USING (auth.uid() = created_by);

-- Step 5: Verify setup
SELECT 
  'Table created' as status,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_name = 'resources';

SELECT 
  'RLS enabled' as status,
  rowsecurity as enabled
FROM pg_tables
WHERE tablename = 'resources';

SELECT 
  'Policies created' as status,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'resources';

-- ============================================
-- ✅ DONE! Resources table is fixed.
-- Now try adding a resource in the app.
-- ============================================

