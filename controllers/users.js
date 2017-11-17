"use strict";

var User = require("../models/user");
var UserValidator = require("../validator/user");

var UserController = {};

// register get
UserController.getRegister = function(req, res) {
    res.render('user/register', {
        title: 'Register'
    });
};

// register post
UserController.postRegister = function (req, res) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('user/register', {/*csrfToken: req.csrfToken(), *//*messages: messages, hasErrors: messages.length > 0*/});
    } else {
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.save(function(err, result) {
            if (err) throw err;
            req.flash("success_msg", "You are registered");
            res.location('/');
            res.redirect('/');
        });
    }
};

// login get form
UserController.getLogin = function (req, res) {
    res.render("user/login", {
        title: "Login"
    });
};

// login submit
// ???

// logout
UserController.logout = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/user/login');
};

module.exports = UserController;