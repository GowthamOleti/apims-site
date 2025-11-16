# Troubleshooting: Sign-In Issues

## Step 1: Check Your Browser Console

Open Developer Tools (F12) → Console tab. Look for:
- ⚠️ Warnings about Supabase configuration
- Error messages from Supabase
- Any authentication errors

## Step 2: Verify Supabase Configuration

### Check if .env file exists and has correct values:

```bash
# In your project root
cat .env
```

Should show:
```
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Get Your Supabase Credentials:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** 
   - **anon public** key

### Update .env File:

```bash
# Replace with your actual values
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDE5NzY5NzksImV4cCI6MTk1NzU1Mjk3OX0.example...
```

## Step 3: Restart Dev Server

After updating .env:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

**Important:** Vite only reads .env files on startup. You MUST restart after changes.

## Step 4: Verify Supabase Auth Configuration

In Supabase Dashboard:

1. **Authentication → Providers:**
   - ✅ Google provider is **Enabled**
   - ✅ Client ID and Secret are set

2. **Authentication → URL Configuration:**
   - **Site URL:** `https://designers-playground.vercel.app` (or your Vercel URL)
   - **Redirect URLs:** 
     ```
     https://designers-playground.vercel.app/**
     http://localhost:5173/**
     ```

## Step 5: Check Common Issues

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Cause:** Still using placeholder `YOUR-PROJECT-id`
**Fix:** Update .env with your real Supabase URL

### Issue: "Invalid API key"
**Cause:** Wrong anon key or not copied completely
**Fix:** Copy the entire key from Supabase dashboard (it's very long)

### Issue: "redirect_uri_mismatch"
**Cause:** Redirect URL not in Supabase allowlist
**Fix:** Add your exact URL to Redirect URLs in Supabase Auth settings

### Issue: Button clicks but nothing happens
**Cause:** Supabase not configured, check browser console for errors
**Fix:** Verify .env file and restart dev server

## Step 6: Test the Configuration

1. Look at the debug box in bottom-right corner (dev mode only)
   - ✅ Configured = Good
   - ❌ Not Configured = Update .env file

2. Try signing in again
3. Check browser console for specific error messages

## Step 7: For Production (Vercel)

Add environment variables in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy

## Still Not Working?

Share:
1. Browser console errors
2. What happens when you click "Sign in with Google"
3. Your Supabase project URL (you can share just the ID part, not full credentials)

