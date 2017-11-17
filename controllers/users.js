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
    var errors = UserValidator.validate(req);
    if (errors) {
        res.render('user/register', {
            title: 'Register',
            errors: errors
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });
        User.saveUser(newUser, function (err, user) {
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