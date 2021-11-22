const router = require('express').Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");

//AUTH ROUTES GO HERE

// GET  /signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });



// LOGIN ROUTES
//Rendering the login view page
router.get("/login", (req, res) => {
  res.render("auth/login-view");
});

//Route to request login info from login-view page
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/login-view", {
      errorMessage: "Please provide username and password.",
    });

    return;
  }

  let user;
  // Checking if the user already exists
  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;

      if (!foundUser) {
        throw new Error("Wrong credentials");
      }

      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-view", {
        errorMessage: err.message || "Please provide username and password.",
      });
    });
});




module.exports = router;