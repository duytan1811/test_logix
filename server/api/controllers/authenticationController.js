require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../libs/utils');
const globalConstants = require('../../constants/global-constants');

const login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    if (!username) {
      return res.status(400).json({
        type: globalConstants.RESPONSE_TYPE.ERROR,
        message: 'Username is required'
      });
    }
    if (!password) {
      return res.status(400).json({
        type: globalConstants.RESPONSE_TYPE.ERROR,
        message: 'Password is required'
      });
    }
    const user = await User.findOne({
      username: username
    });
    if (!user) {
      return res.status(200).json({
        type: globalConstants.RESPONSE_TYPE.ERROR,
        message: 'Not found user'
      });
    }
    if (!utils.verifyPassword(password, user.password)) {
      return res.status(200).json({
        type: globalConstants.RESPONSE_TYPE.ERROR,
        message: 'Password incorrect'
      });
    }
    const token = jwt.sign({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email
    }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24
    });

    return res.status(200).json({
      type: globalConstants.RESPONSE_TYPE.SUCCESS,
      data: {
        token
      }
    });
  } catch (error) {
    return res.status(500).json(`Login error: ${error}`);
  }
};

const user = async (req, res) => {
  try {
    const token = req.header('authorization');
    const verified = jwtDecode(token);
    return res.status(200).json({
      type: globalConstants.RESPONSE_TYPE.SUCCESS,
      data: verified
    });
  } catch (error) {
    return res.status(500).json(`Login error: ${error}`);
  }
};

module.exports = utils.warpAsyncFunc({
  login,
  user
});