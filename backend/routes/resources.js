const express = require('express');
const Resource = require('../models/Resource');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;
    
    let query = { isPublic: true };
    
    // Filter by type
    if (type && type !== 'all') {
      query.type = type;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const resources = await Resource.find(query)
      .populate('author', 'name picture')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Resource.countDocuments(query);
    
    res.json({
      resources,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single resource
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('author', 'name picture');
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    // Increment views
    await resource.incrementViews();
    
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new resource
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, title, description, tags, url } = req.body;
    
    const resource = new Resource({
      type,
      title,
      description,
      tags: tags || [],
      url,
      author: req.user._id,
      authorName: req.user.name
    });
    
    await resource.save();
    
    // Update user's resource count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { resourcesAdded: 1 }
    });
    
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update resource
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    // Check if user owns the resource
    if (resource.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this resource' });
    }
    
    const { type, title, description, tags, url } = req.body;
    
    resource.type = type || resource.type;
    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.tags = tags || resource.tags;
    resource.url = url || resource.url;
    
    await resource.save();
    
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete resource
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    // Check if user owns the resource or is admin
    if (resource.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }
    
    await Resource.findByIdAndDelete(req.params.id);
    
    // Update user's resource count
    await User.findByIdAndUpdate(resource.author, {
      $inc: { resourcesAdded: -1 }
    });
    
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike resource
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    const hasLiked = resource.likes.includes(req.user._id);
    
    if (hasLiked) {
      await resource.removeLike(req.user._id);
    } else {
      await resource.addLike(req.user._id);
    }
    
    res.json({ 
      liked: !hasLiked,
      likesCount: resource.likes.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
