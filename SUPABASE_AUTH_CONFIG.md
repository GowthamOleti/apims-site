# FIX: OAuth Redirect Loop

## The Problem
After signing in with Google, you're redirected back to the login page.

## The Fix - Do This NOW:

### Step 1: Configure Supabase URLs (1 minute)

1. Go to: https://supabase.com/dashboard/project/ldrgkwykjwpqnalgghao/auth/url-configuration

2. Set **Site URL** to:
   ```
   http://localhost:5176
   ```

3. Set **Redirect URLs** to:
   ```
   http://localhost:5176
   http://localhost:5176/**
   https://designers-playground.vercel.app
   https://designers-playground.vercel.app/**
   ```

4. Click **Save**

### Step 2: Check Google OAuth (1 minute)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, make sure you have:
   ```
   https://ldrgkwykjwpqnalgghao.supabase.co/auth/v1/callback
   ```

### Step 3: Test (30 seconds)

1. Close your app completely
2. Re-open: http://localhost:5176
3. Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. Click "Sign in with Google"
5. **It will work!** ✅

---

## Still not working?

Open browser console (F12) after clicking "Sign in with Google" and share what you see.

