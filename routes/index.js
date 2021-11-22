const router = require("express").Router();
const loggedIn = require("./../middleware/loggedIn");

router.get("/", (req, res) => {
  res.render("index");
});


/* GET home page */
// router.get("/", (req, res, next) => {
//   // Check if the incoming request has a valid cookie/session
//   let userIsLoggedIn = false;
//   if (req.session.user) {
//     userIsLoggedIn = true;
//   }

//   res.render("index", { userIsLoggedIn: userIsLoggedIn });
// });

module.exports = router;