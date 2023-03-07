//jshint esversion:6
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const https = require("https");
// const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");

app.use(cors());
app.use(express.json()); // for parsing application/json instead of body-parser

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(cookieParser()); // for parsing

var sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess))

// To mute the error message
mongoose.set("strictQuery", true);
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, "public")));
  
  mongoose.connect("mongodb://127.0.0.1:27017/userDb");
  
  //routes
  app.use('/', authRoute);
  
  // passport configurations
  const Account = require('./models/account')
  passport.use(Account.createStrategy());
  
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
  
  
  
  app.listen(3000, () => {
    console.log("Server is running on http//localhost:3000 ");
  });