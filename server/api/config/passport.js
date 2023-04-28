var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../libs/utils');

passport.use(new LocalStrategy({
  usernameField: 'username'
},

function (username, password, done) {
  User.findOne({ email: username }, function (err, user) {
    if (err) { return done(err); }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // Return if password is wrong
    if (!utils.verifyPassword(password, user.hash)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));
