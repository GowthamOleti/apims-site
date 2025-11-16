const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['ui-finding', 'podcast', 'book', 'article', 'video', 'tool', 'inspiration', 'quick-tip']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  url: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Increment views when accessed
resourceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Add like
resourceSchema.methods.addLike = function(userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Remove like
resourceSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.toString() !== userId.toString());
  return this.save();
};

module.exports = mongoose.model('Resource', resourceSchema);
