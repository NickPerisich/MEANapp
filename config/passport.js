const config = require("../config/database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
	User.findById(id, function(err, user) {
		cb(err, user);
	});
});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
	name: String,
	email: String,
	username: String,
	password: String,
	rhodates: Number,
	duespaid: Boolean,
	landfshifts: Boolean,
	visitations: Number,
	socials: Number,
	hours: Number
});
const UserDetails = module.exports = mongoose.model('userInfo', UserDetail, 'userInfo');

mongoose.connect(config.mongoURI);

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({username: username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));



