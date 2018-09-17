//Dependencies and stuff
const express = require("express");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

//Lets us interact with the pages
const app = express();

//Gives us access to the page routes
const users = require("./routes/users");
const config = require("./config/database");

//Lets different origins do things basically
app.use(cors());
//Tells the app to use the index.html in the public folder
app.use(express.static(path.join(__dirname, "public")));
//Lets us get data from the various HTML elements
//associated with various pages/paths.
app.use(bodyParser.urlencoded({extended: true}));
//Lets us use tokens to authenticate users
app.use(passport.initialize());
app.use(passport.session());

//All things that go on in the /users page go automatically
//to the users.js file
app.use("/users", users);

//Port (localhost:3000)
const port = 3000;

app.listen(port, () => {
	console.log("Server started on 3000");
});