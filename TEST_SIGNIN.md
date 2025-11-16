# Testing Google Sign-In

## ✅ What You've Set Up:

1. ✅ Google Cloud Console OAuth credentials
2. ✅ Client ID and Secret added to Supabase
3. ✅ Authorized URLs in Google Cloud Console
4. ✅ Supabase Auth URLs configured

## 🧪 Test Steps:

### 1. Local Testing (http://localhost:5176)

1. Make sure dev server is running
2. Open http://localhost:5176 in your browser
3. Click "Continue with Google"
4. You should be redirected to Google sign-in
5. After signing in, you should be redirected back
6. You should see the main app interface

### 2. Production Testing (https://designers-playground.vercel.app)

1. Wait for Vercel to finish deploying (check Vercel dashboard)
2. Visit https://designers-playground.vercel.app
3. Click "Continue with Google"
4. Sign in with your Google account
5. Should redirect back to your site, logged in

## 🔍 If Sign-In Doesn't Work:

Check browser console (F12 → Console tab) for errors:
- `redirect_uri_mismatch` → Check Google Cloud Console redirect URIs
- `invalid_client` → Check Client ID/Secret in Supabase
- `access_denied` → Check OAuth consent screen configuration

## 📋 Verify These URLs Are Set:

### In Google Cloud Console → Credentials:
**Authorized JavaScript origins:**
```
https://designers-playground.vercel.app
http://localhost:5176
https://ldrgkwykjwpqnalgghao.supabase.co
```

**Authorized redirect URIs:**
```
https://ldrgkwykjwpqnalgghao.supabase.co/auth/v1/callback
https://designers-playground.vercel.app
http://localhost:5176
```

### In Supabase:
**Site URL:**
```
https://designers-playground.vercel.app
```

**Redirect URLs:**
```
https://designers-playground.vercel.app/**
http://localhost:5176/**
```

## ✅ Next Steps:

Once sign-in works, you'll need to create the database tables. See START_FRESH.md for the SQL!

