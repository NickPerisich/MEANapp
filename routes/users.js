const express = require("express");
const router = express.Router();
const config = require("../config/database");
const UserDetails = require("../config/passport");
const passport = require("passport");

//Name of the mongoDB we keep the info in
var dbName = "userInfo";

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI);
var data = mongoose.connection;

//Register
router.post("/register", (req, res) => {
	let newUser = new UserDetails({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		rhodates: 0,
		duespaid: false,
		landfshifts: false,
		visitations: 0,
		socials: 0,
		hours: 0
	});
    data.collection(dbName).save(newUser, (err, result) => {
		console.log(newUser);
		if (err) {
			return console.log(err);
		} else {
			console.log("Saved to the database");
			res.redirect("/");
		}
	});
});

var userData;

//Sign on
router.post("/authenticate", passport.authenticate('local', { failureRedirect: '/users/error' }), (req, res) => {
	console.log("LOGIN");
	res.redirect("/users/success");
});

//Profile page
router.get("/profile", (req, res) => {
    res.send(userData);
});

//If login successful, gets the data from Mongo and sets it to userData
//Redirects to the Profile page after it does so
router.get('/success', (req, res) => {
	data.collection(dbName).findOne({username: 'nickgfp'}, function(err, user) {
		while (userData === undefined){
			userData = user;
		}
		res.redirect("/users/profile?name="+user.username);
	});
});

router.get('/error', (req, res) => res.send("error logging in"));

module.exports = router;
