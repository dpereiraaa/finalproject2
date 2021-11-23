const router = require("express").Router();
const Expenses = require('../models/Expenses.model')
const Received = require('../models/Received.model')

//MAIN APP VIEW
router.get("/maindavid", async (req, res, next) => {
    const expenses = await Expenses.find()
    const received = await Received.find()
    res.render("main/david-view", { expenses: expenses, received: received })
  })

//NEW EXPENSES
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

//EDITING EXPENSES
router.get('/expenses/:expenseId/edit', (req, res) => {
    const expenseId = req.params.expenseId;
  
    Expenses.findById(expenseId)
      .then((expense) => {
        res.render('main/david-expenses-edit-view', { expense: expense } );
      })
      .catch( (err) => console.log(err));
  })
  
  
router.post('/expenses/:expenseId/edit', (req, res) => {
    const expenseId = req.params.expenseId;
    const { description, value, date, category } = req.body;
  
    Expenses.findByIdAndUpdate(expenseId, { description, value, date, category }, { new: true })
      .then((updatedExpense) => {
        res.redirect(`/main`);
      })
      .catch( (err) => console.log(err));
  })


//DELETING EXPENSES
router.post('/expenses/:expenseId/delete', (req, res) => {
    const expenseId = req.params.expenseId;
  
    Expenses.findByIdAndRemove(expenseId)
      .then((status) => {
        res.redirect('/main')
      })
      .catch((err) => console.log(err));
  })
  

//NEW EARNINGS
router.get("/newearnings", (req, res, next) => {
    res.render("main/newearningdavid")
    })

router.post("/newearnings", (req, res) => {
    const { description, value, date, category } = req.body;
  
    Received.create({ description, value, date, category })
      .then((createdEarning) => {
        res.redirect(`/maindavid`);
      })
      .catch( (err) => console.log(err));
  
  });

module.exports = router;