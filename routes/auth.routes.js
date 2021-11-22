const router = require('express').Router();
const User = require('./../models/User.model')
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// ROUTES 

//GET  --> signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });

//POST --> signup
router.post("/signup", (req, res) => {
  const { username , password } = req.body

const usernameNotProvided = !username || username === "";
const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/signup-form", {
      errorMessage: "Provide username and password.",
    });
    return;
  };
  
  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }     
      return bcrypt.genSalt(saltRounds);
    })

    .then((salt) => {
      return bcrypt.hash(password, salt);
    })

    .then((hashedPassword) => {
      return User.create({ username: username, password: hashedPassword });
    })

    .then((createdUser) => {
      res.redirect("/");
    })

    .catch((err) => {
      res.render("auth/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

module.exports = router;