# Quick Fix: Supabase Configuration Error

## The Problem
You're seeing `DNS_PROBE_FINISHED_NXDOMAIN` because the app is trying to use placeholder credentials.

## Solution: Add Your Real Supabase Credentials

### Option 1: Create .env File (Recommended)

1. **Get your Supabase credentials:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **API**
   - Copy:
     - **Project URL** (e.g., `https://abcdefghijk.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)

2. **Create `.env` file in the root directory:**
   ```bash
   VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   **Replace with your actual values!**

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Option 2: Edit Directly in Code

1. Open `src/lib/supabase.js`
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'https://YOUR-ACTUAL-PROJECT-ID.supabase.co'
   const SUPABASE_ANON_KEY = 'your-actual-anon-key-here'
   ```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Redeploy

### Also Configure Supabase Auth URLs

In Supabase Dashboard → Authentication → URL Configuration:

- **Site URL:** `https://designers-playground.vercel.app`
- **Redirect URLs:** 
  - `https://designers-playground.vercel.app/**`
  - `http://localhost:5173/**`

Then it will work! 🎉

