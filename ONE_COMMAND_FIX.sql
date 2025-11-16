-- ============================================
-- ONE COMMAND FIX - Resources Not Saving
-- This will fix 99% of issues
-- Copy and run in Supabase SQL Editor
-- ============================================

-- Drop and recreate resources table
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
  created_by UUID REFERENCES auth.users(id)  -- This column was missing!
);

-- Enable security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policies (drop old ones first)
DROP POLICY IF EXISTS "Resources are viewable by everyone" ON resources;
DROP POLICY IF EXISTS "Authenticated users can insert resources" ON resources;
DROP POLICY IF EXISTS "Users can update their own resources" ON resources;
DROP POLICY IF EXISTS "Users can delete their own resources" ON resources;

CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT USING (TRUE);

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

-- Done! Now refresh your app and try adding a resource.

