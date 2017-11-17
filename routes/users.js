var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("user/register", { title: "User Registration"});
});

// login form
router.get("/login", function (req, res, next) {
  res.render("user/login", { title: "Login" });
});

module.exports = router;
