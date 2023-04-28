const express = require('express');
const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
const ctrlAuth = require('../controllers/authenticationController');
const ctrlVideo = require('../controllers/videoController');

// Authentication
router.post('/auth/login', ctrlAuth.login);
router.get('/auth/user', ctrlAuth.user);

// User
router.post('/videos/search', verifyToken, ctrlVideo.search);
router.put('/videos/:_id', verifyToken, ctrlVideo.update);

module.exports = router;