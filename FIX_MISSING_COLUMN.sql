-- ============================================
-- FIX: Add missing created_by column to resources table
-- Run this if you get "column created_by does not exist" error
-- ============================================

-- Add the created_by column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'resources' 
    AND column_name = 'created_by'
  ) THEN
    ALTER TABLE resources 
    ADD COLUMN created_by UUID REFERENCES auth.users(id);
    
    RAISE NOTICE 'Column created_by added successfully';
  ELSE
    RAISE NOTICE 'Column created_by already exists';
  END IF;
END $$;

-- Verify the column exists
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'resources'
ORDER BY ordinal_position;

