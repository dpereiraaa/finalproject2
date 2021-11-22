const router = require("express").Router();

router.get("/main", (req, res, next) => {
    res.render("main/main-app")
  })
  
  
router.post ("/main/main-app", (req, res, next) => {
    
    })

module.exports = router;