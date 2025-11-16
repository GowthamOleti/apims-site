# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: "District Design Hub"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get started**
2. Click **Sign-in method** tab
3. Enable **Google** provider
4. Add your support email
5. Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Start in **test mode** (we'll add security rules)
3. Choose your region
4. Click **Enable**

## Step 4: Create Storage Bucket

1. Go to **Storage** > **Get started**
2. Start in **test mode** (we'll add security rules)
3. Click **Done**

## Step 5: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps**
3. Click **Web** icon (</>)
4. Register app: "District Design Hub"
5. Copy the config object

## Step 6: Update src/lib/firebase.js

Replace the placeholder values in `src/lib/firebase.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## Step 7: Set Firestore Security Rules

Go to **Firestore Database** > **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles collection
    match /profiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Resources collection
    match /resources/{resourceId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.createdBy;
    }
  }
}
```

## Step 8: Set Storage Security Rules

Go to **Storage** > **Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /ui-findings/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 9: Configure OAuth Redirect

In Firebase Console > **Authentication** > **Settings** > **Authorized domains**:
- Make sure `localhost` is listed
- Add your production domain if needed

---

**Done! Your Firebase backend is ready.**

