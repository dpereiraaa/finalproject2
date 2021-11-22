const router = require('express').Router();
const User = require('./../models/User.model')
const bcrypt = require("bcryptjs");
const loggedIn = require("./../middleware/loggedIn");

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

      })
    })
})
      





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

// LOGOUT ROUTE
router.get("/logout", loggedIn, (req, res) => {
    req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }
    res.redirect("/");
  });
});


module.exports = router;