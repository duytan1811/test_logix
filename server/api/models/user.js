const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  password: String,
}, {timestamps: true});

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'MY_SECRET'); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema, 'users');
