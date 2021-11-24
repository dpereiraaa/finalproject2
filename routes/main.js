const router = require("express").Router();
const Expenses = require('../models/Expenses.model');
const Received = require('../models/Received.model');
const fileUploader = require('../config/cloudinary.config');

//MAIN APP VIEW
router.get("/main", async (req, res, next) => {
    const expenses = await Expenses.find()
    const received = await Received.find()
    res.render("teste/main-app-dois", { expenses: expenses, received: received })
  })

//NEW EXPENSES
router.get("/newexpense", (req, res) => {
    res.render("main/new-expense")
    })

router.post("/newexpense", fileUploader.single('receipt-img'), (req, res) => {
    const { description, value, date, category } = req.body;
    let fileUrl = "";
    if(req.file){
      fileUrl = req.file.path;
    }
    Expenses.create({ description, value, date, category, imageUrl: fileUrl })
      .then((createdExpense) => {
        console.log(createdExpense)
        res.redirect(`/main`);
      })
      .catch( (err) => console.log(err));
  
  });

//EDITING EXPENSES
router.get('/expenses/:expenseId/edit', (req, res) => {
    const expenseId = req.params.expenseId;
  
    Expenses.findById(expenseId)
      .then((expense) => {
        res.render('main/expenses-edit-view', { expense: expense } );
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

//DETAILS EXPENSE
router.get('/expenses/:expenseId/details', (req, res) => {
  const expenseId = req.params.expenseId;

  Expenses.findById(expenseId)
    .then((expense) => {
      res.render('main/expenses-details-view', { expense: expense } );
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
router.get("/newearning", (req, res, next) => {
    res.render("main/new-earnings")
    })

router.post("/newearning", (req, res) => {
    const { description, value, date, category } = req.body;
  
    Received.create({ description, value, date, category })
      .then((createdEarning) => {
        res.redirect(`/main`);
      })
      .catch( (err) => console.log(err));
  
  });


//EDITING EARNINGS
router.get('/earnings/:earningsId/edit', (req, res) => {
  const earningsId = req.params.earningsId;

  Received.findById(earningsId)
    .then((earnings) => {
      res.render('main/earnings-edit-view', { earnings: earnings } );
    })
    .catch( (err) => console.log(err));
})


router.post('/expenses/:earningsId/edit', (req, res) => {
  const earningsId = req.params.earningsId;
  const { description, value, date, category } = req.body;

  Received.findByIdAndUpdate(earningsId, { description, value, date, category }, { new: true })
    .then((updatedEarning) => {
      res.redirect(`/main`);
    })
    .catch( (err) => console.log(err));
})

//DETAILS EARNINGS
router.get('/earnings/:earningsId/details', (req, res) => {
const earningsId = req.params.earningsId;

Received.findById(earningsId)
  .then((earnings) => {
    res.render('main/earnings-details-view', { earnings: earnings } );
  })
  .catch( (err) => console.log(err));
})

//DELETING EARNINGS
router.post('/earnings/:earningsId/delete', (req, res) => {
  const earningsId = req.params.earningsId;

  Received.findByIdAndRemove(earningsId)
    .then((status) => {
      res.redirect('/main')
    })
    .catch((err) => console.log(err));
})


module.exports = router;