var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserController = require("../controllers/users");

// register get
router.get("/register", UserController.getRegister);

// register post
router.post("/register", UserController.postRegister);

// login get form
router.get("/login", UserController.getLogin);

// login submit
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: 'Invalid username or password'
}), function (req, res) {
    console.log('Authentication Successful');
    req.flash('success', 'You are logged in');
    res.redirect('/');
});

// logout
router.get('/logout', UserController.logout);

module.exports = router;
