-- ============================================
-- BACKEND DIAGNOSTIC SCRIPT
-- Run this to check if your database is set up correctly
-- ============================================

-- 1. Check if tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'resources')
ORDER BY table_name;

-- 2. Check resources table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'resources'
ORDER BY ordinal_position;

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('profiles', 'resources');

-- 4. Check all policies on resources table
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'resources'
ORDER BY policyname;

-- 5. Check profiles table policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- 6. Test: Count existing resources
SELECT COUNT(*) as total_resources FROM resources;

-- 7. Test: Check if created_by column exists
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_name = 'resources' 
  AND column_name = 'created_by'
) as has_created_by_column;

-- 8. Check storage bucket exists
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'ui-findings';

