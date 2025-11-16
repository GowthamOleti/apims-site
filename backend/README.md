# Design Team Hub - Backend API

A Node.js/Express backend API for the Design Team Hub application with Google OAuth authentication and MongoDB database.

## Features

- 🔐 Google OAuth 2.0 authentication
- 📊 User management and statistics
- 📚 Resource management (CRUD operations)
- 👥 Admin dashboard with team analytics
- 🔍 Search functionality
- ❤️ Like/unlike resources
- 📈 View tracking and analytics

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp config.env .env
```

3. Configure your environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/design-hub
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-super-secret-session-key
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=http://localhost:3000
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will create the database automatically

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Resources
- `GET /api/resources` - Get all resources (with pagination and search)
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create new resource (authenticated)
- `PUT /api/resources/:id` - Update resource (owner only)
- `DELETE /api/resources/:id` - Delete resource (owner or admin)
- `POST /api/resources/:id/like` - Like/unlike resource

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)
- `GET /api/admin/contributors` - Get contributors with stats (admin only)
- `PUT /api/admin/users/:id/admin` - Update user admin status
- `DELETE /api/admin/users/:id` - Delete user and their resources

## Database Models

### User
- Google OAuth profile data
- Resource count and view statistics
- Admin status
- Last active timestamp

### Resource
- Type, title, description
- Tags and URL
- Author reference
- View count and likes
- Public/private status

## Security Features

- JWT token authentication
- Session management with MongoDB store
- CORS configuration
- Input validation and sanitization
- Admin role-based access control

## Development

The backend uses:
- Express.js for the web framework
- MongoDB with Mongoose for database
- Passport.js for authentication
- JWT for token-based auth
- CORS for cross-origin requests

## Deployment

1. Set `NODE_ENV=production`
2. Update `FRONTEND_URL` to your production domain
3. Use a production MongoDB instance
4. Set secure session secrets
5. Deploy to your preferred platform (Heroku, AWS, etc.)
