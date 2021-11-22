const router = require("express").Router();
const loggedIn = require("./../middleware/loggedIn");


/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }

  res.render("index", { userIsLoggedIn: userIsLoggedIn });
});

router.get("/main", (req, res, next) => {
  res.render("main-app")
})

module.exports = router;