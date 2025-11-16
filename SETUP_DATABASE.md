# Database Setup - Step by Step

## Quick Setup

1. **Go to Supabase SQL Editor:**
   https://supabase.com/dashboard/project/ldrgkwykjwpqnalgghao/sql/new

2. **Copy ALL the SQL from `DATABASE_SETUP.sql`**

3. **Paste it into the SQL Editor**

4. **Click "Run" (or press Cmd/Ctrl + Enter)**

5. **Wait for success message** ✅

That's it! Your tables and policies are now set up.

## What This Creates:

✅ `profiles` table - stores user information
✅ `resources` table - stores all design resources
✅ Row Level Security policies - allows users to add/edit/delete their own resources
✅ Auto-profile creation - creates profile when user signs up

## Verify It Worked:

After running the SQL, check:
1. Go to **Table Editor** in Supabase
2. You should see two tables: `profiles` and `resources`
3. Both should be empty initially (that's normal)

## Test It:

Once tables are created:
1. Sign in to your app
2. Try adding a resource
3. Try editing it
4. Try deleting it

All should work now! 🎉

## If You Get Errors:

- "relation already exists" → Tables already created, that's fine
- "policy already exists" → Policies already created, that's fine  
- Just continue - the DROP statements will handle conflicts

