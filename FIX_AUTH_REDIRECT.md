# Fix: Sign-In Redirecting Back to Login

## The Problem
After signing in with Google, you get redirected but then see the login page again. This means the session isn't being detected after OAuth redirect.

## Quick Fix Steps

### 1. Verify Supabase Redirect URLs

Go to: https://supabase.com/dashboard/project/ldrgkwykjwpqnalgghao/auth/url-configuration

Make sure you have BOTH:
- **Site URL:** `https://designers-playground.vercel.app`
- **Redirect URLs:** 
  ```
  http://localhost:5176
  http://localhost:5176/**
  https://designers-playground.vercel.app
  https://designers-playground.vercel.app/**
  ```

### 2. Verify Google Cloud Console Redirect URIs

Go to: https://console.cloud.google.com/ → Your Project → Credentials → Your OAuth Client

**Authorized redirect URIs MUST include:**
```
https://ldrgkwykjwpqnalgghao.supabase.co/auth/v1/callback
```

This is critical! Without this exact URL, Google won't redirect back to Supabase.

### 3. Test Again

1. Clear browser cache (Cmd+Shift+Delete)
2. Go to http://localhost:5176
3. Sign in with Google
4. Check browser console (F12) for messages:
   - "Auth state changed: SIGNED_IN"
   - "User signed in: [your-email]"
   - "Session found on mount"

## Debug Steps

If it still doesn't work, check browser console:

1. **After clicking "Sign in with Google"**
   - Should redirect to Google
   - Complete sign-in
   - Should redirect back to your app

2. **After redirect back**
   - Open Console (F12)
   - Look for: "Auth state changed: SIGNED_IN"
   - If you see errors, share them

3. **Check the URL after redirect**
   - Should be: `http://localhost:5176` (or your Vercel URL)
   - Might have hash fragments: `#access_token=...`
   - That's normal - Supabase handles them

## Common Issues

**Issue:** "redirect_uri_mismatch"
- **Fix:** Add exact Supabase callback URL to Google Cloud Console

**Issue:** Session not persisting
- **Fix:** Check Supabase Site URL matches your actual URL

**Issue:** Keeps redirecting to login
- **Fix:** Clear browser cookies/localStorage and try again

