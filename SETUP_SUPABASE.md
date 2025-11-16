# Supabase Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijk.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

## Step 2: Create .env File

In the root of your project, create a file named `.env`:

```bash
VITE_SUPABASE_URL=https://YOUR-ACTUAL-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

**Important:** Replace the placeholders with your actual values!

## Step 3: Configure Supabase Auth

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. You'll need to add:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

## Step 4: Set Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your Vercel URL: `https://designers-playground.vercel.app`
3. Add to **Redirect URLs**:
   - `https://designers-playground.vercel.app/**`
   - `http://localhost:5173/**` (for local development)

## Step 5: Restart Your Dev Server

After creating `.env`, restart:
```bash
npm run dev
```

## Troubleshooting

**DNS Error:** This means you're still using placeholder credentials. Make sure your `.env` file has the correct values.

**"Invalid API key":** Double-check your anon key is correct (no extra spaces, full key copied)

**"redirect_uri_mismatch":** Make sure your Vercel URL is in the Redirect URLs list in Supabase.

