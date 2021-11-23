const router = require("express").Router();
const Received = require("./../models/Received.model");

router.get("/raissatest", (req, res, next) => {

// find user
// find expenses of the foundUser
// sum all the expenses by category 
// pass them to the view as an object
// use hbs to dinamically change the chart

  res.render("main/main-raissa")
})
  
router.post("/raissatest", (req, res) => {
  const { description , value , date , category } = req.body

})


module.exports = router;