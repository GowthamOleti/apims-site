const express = require('express');
const passport = require('passport');
const { generateToken, authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/design-hub-live.html?token=${token}`);
  }
);

// Get current user (with JWT token authentication)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.displayName || req.user.name,
      email: req.user.email,
      picture: req.user.image || req.user.picture,
      givenName: req.user.firstName || req.user.givenName,
      familyName: req.user.lastName || req.user.familyName,
      resourcesAdded: req.user.resourcesAdded || 0,
      totalViews: req.user.totalViews || 0,
      isAdmin: req.user.isAdmin || false
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
