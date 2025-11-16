# How to Find Your Supabase Anon Key

## Step-by-Step Instructions

### 1. Go to Supabase Dashboard
Visit: https://supabase.com/dashboard

### 2. Select Your Project
- Click on your project (or the project with ID: `ldrgkwykjwpqnalgghao`)

### 3. Navigate to API Settings
- Look at the left sidebar menu
- Click on **"Settings"** (⚙️ icon at the bottom)
- Then click on **"API"** under Settings

### 4. Find the Anon Key
On the API settings page, you'll see several sections:
- **Project URL** (you already have this: `https://ldrgkwykjwpqnalgghao.supabase.co`)
- **API Keys** section with:
  - **anon** `public` - This is what you need!
  - **service_role** `secret` - Don't use this one

### 5. Copy the Anon Key
- Find the **"anon public"** key
- It's a very long string that starts with `eyJ...`
- Click the **copy icon** (📋) next to it
- The full key looks like:
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkcmdrd3lrandwcW5hbGdnaGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Mzk2MTksImV4cCI6MjA3NzQxNTYxOX0.A7MP7JA80pyiO3oL8f8v49MI8Fw3mSmg-iZJL-_Ejac
  ```
- It's usually 200-300 characters long

## Quick Link
If you're logged in, go directly to:
https://supabase.com/dashboard/project/ldrgkwykjwpqnalgghao/settings/api

## Visual Guide
```
Supabase Dashboard
  ├── [Your Project Name]
  │   ├── Table Editor
  │   ├── SQL Editor
  │   ├── Authentication
  │   ├── Storage
  │   ├── ...
  │   └── ⚙️ Settings
  │       ├── General
  │       ├── Database
  │       ├── 🔑 API          ← Click here!
  │       │   └── API Keys
  │       │       ├── anon public    ← Copy this one!
  │       │       └── service_role
  │       ├── Auth
  │       └── ...
```

## What It Looks Like
On the API page, you'll see something like:

```
┌─────────────────────────────────────────┐
│  Project URL                            │
│  https://ldrgkwykjwpqnalgghao...        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  API Keys                               │
│                                         │
│  anon public                            │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│  [📋 Copy]                              │
│                                         │
│  service_role secret                    │
│  (Don't copy this one)                  │
└─────────────────────────────────────────┘
```

## Important Notes
- ✅ Use the **anon public** key (safe for client-side use)
- ❌ Don't use the **service_role** key (server-side only)
- The key should be very long (200+ characters)
- It starts with `eyJ` (it's a JWT token)

