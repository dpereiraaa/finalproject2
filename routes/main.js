const router = require("express").Router();
const Expenses = require('../models/Expenses.model')
const Received = require('../models/Received.model')

router.get("/main", async (req, res, next) => {
    const expenses = await Expenses.find()
    const received = await Received.find()
    console.log("expenses", expenses, received);
    res.render("main/main-app", { expenses: expenses, received: received })
  })


router.get("/newexpense", (req, res, next) => {
    res.render("main/new-expense")
    })

router.post("/newexpense", (req, res) => {
    const { description, value, date, category } = req.body;
  
    Expenses.create({ description, value, date, category })
      .then((createdExpense) => {
        res.redirect(`/main`);
      })
      .catch( (err) => console.log(err));
  
  });

module.exports = router;