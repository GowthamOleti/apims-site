const express = require('express');
const User = require('../models/User');
const Resource = require('../models/Resource');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({})
      .select('-googleId')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ resourcesAdded: { $gt: 0 } });
    const totalResources = await Resource.countDocuments();
    const totalViews = await Resource.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    const recentResources = await Resource.find({})
      .populate('author', 'name picture')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalUsers,
      activeUsers,
      totalResources,
      totalViews: totalViews[0]?.total || 0,
      recentResources
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get contributors with their stats
router.get('/contributors', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contributors = await User.find({})
      .select('-googleId')
      .sort({ resourcesAdded: -1 });
    
    // Get recent resources for each contributor
    const contributorsWithRecentResources = await Promise.all(
      contributors.map(async (contributor) => {
        const recentResources = await Resource.find({ author: contributor._id })
          .sort({ createdAt: -1 })
          .limit(3)
          .select('title type createdAt');
        
        return {
          ...contributor.toObject(),
          recentResources
        };
      })
    );
    
    res.json(contributorsWithRecentResources);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user admin status
router.put('/users/:id/admin', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isAdmin } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin },
      { new: true }
    ).select('-googleId');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete all resources by this user
    await Resource.deleteMany({ author: user._id });
    
    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'User and their resources deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
