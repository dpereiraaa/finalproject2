const router = require("express").Router();
const Expenses = require('./../../models/Expenses.model')
const Received = require('./../../models/Received.model')

//MAIN APP VIEW

router.get("/raissatest", async (req, res, next) => {
    const expenses = await Expenses.find()
    const received = await Received.find()
    res.render("raissa/raissa-view", { expenses: expenses, received: received })
  })

router.get("/newexp", (req, res, next) => {
    res.render("raissa/new-exp")
    })

router.post("/newexp", (req, res) => {
    const { description, value, date, category } = req.body;

    Expenses.create({ description, value, date, category })
      .then((createdExpense) => {
        res.redirect(`/raissatest`);
      })
      .catch( (err) => console.log(err));
  
  });

  //add - edit
router.get('/expenses/:expenseId/edit', (req, res) => {
    const expenseId = req.params.expenseId;

    Expenses.findById(expenseId)
      .then((expense) => {
        res.render('raissa/expense-edit', { expense: expense } );
      })
      .catch( (err) => console.log(err));
  })

  router.post('/expenses/:expenseId/edit', (req, res) => {
    const expenseId = req.params.expenseId;
    const { description, value, date, category } = req.body;
  
    Expenses.findByIdAndUpdate(expenseId, { description, value, date, category}, { new: true })
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

//Earnings

router.get("/newear", (req, res, next) => {
    res.render("raissa/new-ear")
    })

router.post("/newear", (req, res) => {
        const { description, value, date, category } = req.body;

    Received.create({ description, value, date, category })
      .then((createdEarning) => {
        res.redirect(`/raissatest`);
        })
        .catch( (err) => console.log(err));

    });



//earnings edit

router.get('/received/:receivedId/edit', (req, res) => {
    const receivedId = req.params.receivedId;
  
    Received.findById(receivedId)
      .then((received) => {
        res.render('raissa/earning-edit', { received: received } );
      })
      .catch( (err) => console.log(err));
  })

  router.post('/received/:receivedId/edit', (req, res) => {
    const receivedId = req.params.receivedId;
    const { description, value, date, category } = req.body;
  
    Expenses.findByIdAndUpdate(receivedId, { description, value, date, category }, { new: true })
      .then((updatedReceived) => {
        res.redirect(`/main`);
      })
      .catch( (err) => console.log(err));
  })

//DELETING EXPENSES
router.post('/received/:receivedId/delete', (req, res) => {
    const receivedId = req.params.receivedId;
  
    Received.findByIdAndRemove(receivedId)
      .then((status) => {
        res.redirect('/raissatest')
      })
      .catch((err) => console.log(err));
  })

module.exports = router;