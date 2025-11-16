-- ============================================
-- COMPLETE FIX: Recreate resources table with all columns
-- Run this if you're getting column errors
-- ============================================

-- Drop and recreate resources table with all columns
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

-- Re-enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Resources are viewable by everyone" ON resources;
DROP POLICY IF EXISTS "Authenticated users can insert resources" ON resources;
DROP POLICY IF EXISTS "Users can update their own resources" ON resources;
DROP POLICY IF EXISTS "Users can delete their own resources" ON resources;

-- Recreate policies
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

-- ============================================
-- Done! The resources table now has all columns.
-- ============================================

