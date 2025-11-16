# Supabase Configuration for designers-playground.vercel.app

## Authentication → URL Configuration

Set these in your Supabase Dashboard:

### Site URL
```
https://designers-playground.vercel.app
```

### Redirect URLs (Add all of these)
```
https://designers-playground.vercel.app
https://designers-playground.vercel.app/**
http://localhost:5173/**
http://localhost:5174/**
http://localhost:5175/**
http://localhost:5176/**
http://localhost:5177/**
```

## Authentication → Providers

1. **Enable Google Provider**
2. For now, you can use Supabase's built-in Google OAuth (no Client ID/Secret needed initially)
3. Click **Save**

## Your Current Credentials

Project URL: `https://ldrgkwykjwpqnalgghao.supabase.co`

This is already configured in the code!

## Next Steps

1. Go to https://supabase.com/dashboard/project/ldrgkwykjwpqnalgghao/auth/url-configuration
2. Update the URLs as shown above
3. Make sure Google provider is enabled
4. Deploy to Vercel (or test locally first)

## For Vercel Deployment

Make sure to add environment variables in Vercel:
- `VITE_SUPABASE_URL` = `https://ldrgkwykjwpqnalgghao.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (your anon key)

Then redeploy!

