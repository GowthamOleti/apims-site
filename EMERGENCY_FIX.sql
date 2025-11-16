-- ============================================
-- EMERGENCY FIX - If nothing else works
-- Run this to completely reset and rebuild
-- ============================================

-- STEP 1: Drop EVERYTHING related to resources
DROP TABLE IF EXISTS resources CASCADE;

-- STEP 2: Recreate resources table from scratch
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- STEP 3: Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create INSERT policy (the most important one)
CREATE POLICY "Authenticated users can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.role() = 'authenticated'
    AND created_by = auth.uid()
  );

-- STEP 5: Create SELECT policy
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (TRUE);

-- STEP 6: Create UPDATE policy
CREATE POLICY "Users can update their own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- STEP 7: Create DELETE policy
CREATE POLICY "Users can delete their own resources"
  ON resources FOR DELETE
  USING (auth.uid() = created_by);

-- STEP 8: Test if auth works
SELECT 
  CASE 
    WHEN auth.uid() IS NULL THEN 'ERROR: Not authenticated - sign in first!'
    ELSE 'OK: Authenticated as ' || auth.uid()::text
  END as auth_status;

-- STEP 9: Verify table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'resources'
ORDER BY ordinal_position;

-- STEP 10: Verify policies
SELECT 
  policyname,
  cmd
FROM pg_policies
WHERE tablename = 'resources'
ORDER BY cmd;

-- STEP 11: Test insert (only if authenticated)
-- Uncomment the next 3 lines after signing in:
-- INSERT INTO resources (type, title, description, author_name, created_by)
-- VALUES ('article', 'SQL Test', 'Testing', 'Test User', auth.uid())
-- RETURNING *;

-- ============================================
-- After running this:
-- 1. Check results of STEP 8-10
-- 2. Share the output with me
-- 3. Try adding resource in app
-- ============================================

