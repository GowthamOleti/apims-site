# Design Team Hub - Complete Setup Guide

A full-stack application for managing design team resources with Google OAuth authentication, built with React frontend and Node.js/Express backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp config.env .env
# Edit .env with your configuration

# Start MongoDB (if running locally)
mongod

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to main project directory
cd ..

# Install dependencies (if not already done)
npm install --legacy-peer-deps

# Start the frontend development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables (.env)

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

### Frontend Environment Variables

Create `.env` in the main project directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret to your backend `.env` file

## 📊 Database Setup

### Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🏗️ Project Structure

```
design-team-hub/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database and Passport config
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
├── app/                   # React frontend
│   ├── components/        # React components
│   ├── containers/       # Page containers
│   ├── utils/            # Utilities and API service
│   └── ...
└── package.json          # Frontend dependencies
```

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Resources
- `GET /api/resources` - Get resources (with search/pagination)
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource
- `POST /api/resources/:id/like` - Like/unlike resource

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/contributors` - Contributors with stats
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/:id/admin` - Update admin status
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Features

### Frontend Features
- ✅ Google OAuth login
- ✅ Resource management (CRUD)
- ✅ Search and filtering
- ✅ User profiles and stats
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Dark theme with Notion-style UI

### Backend Features
- ✅ Google OAuth 2.0 authentication
- ✅ JWT token management
- ✅ MongoDB database with Mongoose
- ✅ RESTful API endpoints
- ✅ User and resource management
- ✅ Admin role-based access
- ✅ Search functionality
- ✅ View tracking and analytics

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set GOOGLE_CLIENT_ID=your-client-id
heroku config:set GOOGLE_CLIENT_SECRET=your-client-secret
heroku config:set SESSION_SECRET=your-session-secret
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set FRONTEND_URL=https://your-frontend-url.com

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables:
   - `REACT_APP_API_URL=https://your-backend-url.com/api`

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
npm test
```

## 📝 Usage

1. **Start the application**: Both frontend and backend should be running
2. **Access the app**: Go to `http://localhost:3000`
3. **Login**: Click "Continue with Google" to authenticate
4. **Add resources**: Use the "Add Resource" button to contribute
5. **Admin access**: Admins can view team statistics and manage users

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB connection error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Google OAuth error**
   - Verify Client ID and Secret
   - Check redirect URI configuration

3. **CORS errors**
   - Ensure `FRONTEND_URL` is set correctly in backend `.env`

4. **Port conflicts**
   - Change `PORT` in backend `.env` if 5000 is occupied
   - Update `REACT_APP_API_URL` in frontend `.env`

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
