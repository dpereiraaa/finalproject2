const router = require("express").Router();
const Expenses = require('../models/Expenses.model')
const Received = require('../models/Received.model')

router.get("/maindavid", async (req, res, next) => {
    const expenses = await Expenses.find()
    const received = await Received.find()
    console.log("expenses", expenses, received);
    res.render("main/david-view", { expenses: expenses, received: received })
  })


router.get("/newexpense", (req, res, next) => {
    res.render("main/newexpensedavid")
    })

router.post("/newexpense", (req, res) => {
    const { description, value, date, category } = req.body;
  
    Expenses.create({ description, value, date, category })
      .then((createdExpense) => {
        res.redirect(`/maindavid`);
      })
      .catch( (err) => console.log(err));
  
  });

module.exports = router;