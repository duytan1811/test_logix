const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  like: Number,
  dislike: Number,
  url: String,
}, {timestamps: true});

mongoose.model('Video', videoSchema, 'videos');
