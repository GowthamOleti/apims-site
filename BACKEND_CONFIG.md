# Complete Backend Configuration

## Overview
This app uses **Supabase** as the backend (PostgreSQL database + Auth + Storage).
No traditional Node.js backend is needed.

## Backend Components

### 1. Database (PostgreSQL)
- **Tables**: `profiles`, `resources`
- **RLS**: Row Level Security enabled on all tables
- **Policies**: Control who can read/write data
- **Function**: Auto-creates user profile on signup

### 2. Authentication
- **Provider**: Google OAuth
- **Session**: JWT tokens managed by Supabase
- **User data**: Stored in `auth.users` (managed by Supabase)

### 3. Storage
- **Bucket**: `ui-findings` for uploading images
- **Public**: Images are publicly accessible
- **Policies**: Only authenticated users can upload

## File Structure

```
Backend Configuration Files:
├── src/lib/supabase.js          # Supabase client (connects to backend)
├── FULL_BACKEND_SETUP.sql       # Complete database setup
└── .env (if using env vars)     # Optional: Supabase credentials

Database Schema:
├── profiles table
│   ├── id (UUID, primary key)
│   ├── name (TEXT)
│   ├── email (TEXT, unique)
│   ├── avatar_url (TEXT)
│   ├── created_at (TIMESTAMP)
│   └── updated_at (TIMESTAMP)
│
└── resources table
    ├── id (BIGSERIAL, primary key)
    ├── type (TEXT, not null)
    ├── title (TEXT, not null)
    ├── description (TEXT)
    ├── url (TEXT)
    ├── tags (TEXT[])
    ├── author_name (TEXT, not null)
    ├── image_url (TEXT)
    ├── created_at (TIMESTAMP)
    └── created_by (UUID, foreign key to auth.users)
```

## Setup Instructions

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Wait for database to initialize (~2 minutes)

### Step 2: Run SQL Setup
1. Go to SQL Editor in Supabase Dashboard
2. Copy entire `FULL_BACKEND_SETUP.sql` file
3. Paste and click "Run"
4. Verify: Check Table Editor to see `profiles` and `resources` tables

### Step 3: Configure Authentication
1. Go to Authentication → Providers
2. Enable Google provider
3. Add Google OAuth credentials:
   - Client ID (from Google Cloud Console)
   - Client Secret (from Google Cloud Console)

### Step 4: Set Redirect URLs
1. Go to Authentication → URL Configuration
2. Set **Site URL**: `https://your-app.vercel.app` (or localhost for dev)
3. Add **Redirect URLs**:
   ```
   https://your-app.vercel.app/**
   http://localhost:5176/**
   ```

### Step 5: Update Frontend Config
Edit `src/lib/supabase.js`:
```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key-here'
```

Get these from: Settings → API in Supabase Dashboard

## API Endpoints (Automatically Created by Supabase)

Supabase automatically creates REST API endpoints:

### Resources
- `GET /rest/v1/resources` - Get all resources
- `POST /rest/v1/resources` - Create resource
- `PATCH /rest/v1/resources?id=eq.{id}` - Update resource
- `DELETE /rest/v1/resources?id=eq.{id}` - Delete resource

### Profiles
- `GET /rest/v1/profiles` - Get all profiles
- `POST /rest/v1/profiles` - Create profile
- `PATCH /rest/v1/profiles?id=eq.{id}` - Update profile

### Authentication
- `POST /auth/v1/signup` - Sign up
- `POST /auth/v1/token` - Sign in
- `POST /auth/v1/signout` - Sign out
- `GET /auth/v1/user` - Get current user

All endpoints automatically enforce RLS policies!

## Security (Row Level Security)

### Profiles Table Policies:
```sql
-- Anyone can view profiles
SELECT: TRUE

-- Users can only insert their own profile
INSERT: auth.uid() = id

-- Users can only update their own profile
UPDATE: auth.uid() = id
```

### Resources Table Policies:
```sql
-- Anyone can view resources
SELECT: TRUE

-- Only authenticated users can insert, must set created_by to their own ID
INSERT: auth.uid() IS NOT NULL 
        AND auth.role() = 'authenticated'
        AND created_by = auth.uid()

-- Users can only update their own resources
UPDATE: auth.uid() = created_by

-- Users can only delete their own resources
DELETE: auth.uid() = created_by
```

## Storage Policies

### UI Findings Bucket:
```sql
-- Anyone can view images
SELECT: bucket_id = 'ui-findings'

-- Only authenticated users can upload
INSERT: bucket_id = 'ui-findings' AND auth.role() = 'authenticated'

-- Users can update/delete their own uploads
UPDATE/DELETE: bucket_id = 'ui-findings' 
               AND auth.uid()::text = folder_name
```

## Environment Variables

Optional `.env` file:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Or hardcode in `src/lib/supabase.js` (simpler for deployment).

## Database Functions

### `handle_new_user()`
Automatically creates a profile when a user signs up via Google:
- Extracts name, email, avatar from OAuth data
- Creates entry in `profiles` table
- Runs on every new user signup

## Testing the Backend

### Test 1: Check Tables Exist
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Test 2: Check RLS is Enabled
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('profiles', 'resources');
```

### Test 3: Check Policies
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename = 'resources';
```

### Test 4: Insert Test Resource
```sql
INSERT INTO resources (type, title, description, author_name, created_by)
VALUES ('article', 'Test', 'Test desc', 'Test User', auth.uid());
```

## Troubleshooting

### "Column does not exist"
→ Run `FULL_BACKEND_SETUP.sql` again

### "Row violates RLS policy"
→ Check if you're signed in (auth.uid() should not be null)

### "Permission denied"
→ RLS policies are blocking you. Check policies in Table Editor

### Resources not saving
→ Run `FIX_RESOURCES_NOW.sql`

### Can't sign in
→ Check Google OAuth credentials and redirect URLs

## Monitoring

Check Supabase Dashboard:
- **Database** → Table Editor: View data
- **Authentication** → Users: See signed-in users
- **Storage** → ui-findings: View uploaded images
- **Logs** → Check for errors

## Scaling

Supabase handles scaling automatically:
- **Database**: Auto-scales PostgreSQL
- **Storage**: Unlimited file storage
- **Auth**: Unlimited users on free tier
- **API**: Rate limits based on plan

Free tier limits:
- 500 MB database
- 1 GB storage
- 50,000 monthly active users

