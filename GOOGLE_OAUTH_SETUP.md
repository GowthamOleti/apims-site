# Google OAuth Setup Guide for Design Team Hub

## Quick Setup Steps

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select Project
- Click "Select a project" at the top
- Click "New Project" if you don't have one
- Name it "Design Team Hub" or similar

### 3. Enable Google+ API
- Go to "APIs & Services" > "Library"
- Search for "Google+ API"
- Click on it and press "Enable"

### 4. Create OAuth Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"
- Choose "Web application"
- Name it "Design Team Hub Web Client"

### 5. Configure OAuth Consent Screen
- Go to "OAuth consent screen"
- Choose "External" (unless you have Google Workspace)
- Fill in required fields:
  - App name: "Design Team Hub"
  - User support email: your email
  - Developer contact: your email
- Add scopes: email, profile, openid

### 6. Set Authorized Redirect URIs
In the OAuth client configuration, add:
```
http://localhost:5000/api/auth/google/callback
```

### 7. Copy Credentials
Copy the Client ID and Client Secret

### 8. Update Backend Configuration
Edit `backend/config.env`:
```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### 9. Restart Backend
```bash
cd backend
# Stop current server (Ctrl+C)
node server.js
```

## Testing the Setup

1. Open: http://localhost:3000/design-hub-live.html
2. Click "Sign in with Google"
3. Complete Google OAuth flow
4. You should be redirected back and logged in!

## Troubleshooting

### "redirect_uri_mismatch" Error
- Check that the redirect URI in Google Console exactly matches:
  `http://localhost:5000/api/auth/google/callback`

### "invalid_client" Error
- Verify Client ID and Secret are correct in config.env
- Make sure there are no extra spaces or quotes

### "access_denied" Error
- Check OAuth consent screen is configured
- Make sure scopes include email and profile

## Production Deployment

For production, update:
1. Authorized redirect URIs to your production domain
2. FRONTEND_URL in backend config.env
3. OAuth consent screen with production domain
