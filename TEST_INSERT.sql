-- ============================================
-- TEST: Check if you can insert a resource
-- Run this AFTER running FIX_RESOURCES_NOW.sql
-- ============================================

-- Replace YOUR_USER_ID with your actual user ID
-- To find your user ID, run: SELECT auth.uid();

-- Test insert (replace YOUR_USER_ID)
INSERT INTO resources (
  type,
  title,
  description,
  url,
  tags,
  author_name,
  created_by
) VALUES (
  'article',
  'Test Resource',
  'This is a test',
  'https://example.com',
  ARRAY['test'],
  'Test User',
  auth.uid()  -- This uses your current user ID
);

-- Check if it was inserted
SELECT * FROM resources ORDER BY created_at DESC LIMIT 1;

-- Clean up test
DELETE FROM resources WHERE title = 'Test Resource';

