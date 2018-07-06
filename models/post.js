const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = { Post };
