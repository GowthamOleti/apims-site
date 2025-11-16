# Troubleshooting: Resources Not Adding

## Quick Check

1. **Open Browser Console (F12)** after trying to add a resource
2. Look for error messages
3. Check if you see: "Adding resource to Supabase..."

## Common Issues & Fixes

### Issue 1: "Resources table does not exist"

**Fix:** Run the SQL setup script:
1. Go to Supabase Dashboard → SQL Editor
2. Copy/paste entire `COMPLETE_DATABASE_SETUP.sql` file
3. Click "Run"

### Issue 2: "new row violates row-level security policy"

**Fix:** Check RLS policies in Supabase:
1. Go to: Table Editor → `resources` table → Policies
2. Make sure you have:
   - ✅ "Authenticated users can insert resources" policy
   - ✅ Policy uses: `auth.role() = 'authenticated'`

### Issue 3: "null value in column violates not-null constraint"

**Fix:** Check required fields:
- `type` - must be provided
- `title` - must be provided  
- `author_name` - must be provided
- `created_by` - should be auto-filled with user.id

### Issue 4: "permission denied for table resources"

**Fix:** 
1. Check if you're signed in (should see your name in sidebar)
2. Check Supabase project URL/key in `src/lib/supabase.js`
3. Verify RLS is enabled on the table

## Test Steps

1. **Sign in** with Google
2. **Open Console** (F12)
3. **Add a resource** with:
   - Title: "Test Resource"
   - Description: "Testing"
   - Type: "Article"
4. **Watch console** for:
   - "Adding resource to Supabase..."
   - Either success message or error details

## Manual Test in Supabase

Try inserting directly in Supabase SQL Editor:

```sql
-- Replace YOUR_USER_ID with your actual user ID
INSERT INTO resources (type, title, description, author_name, created_by)
VALUES ('article', 'Test', 'Test description', 'Test User', 'YOUR_USER_ID');
```

If this works, the issue is with RLS policies.
If this fails, the table structure is wrong.

## What to Share

If still stuck, share:
1. Browser console error message (exact text)
2. Screenshot of Supabase Policies for `resources` table
3. Whether manual SQL insert works

