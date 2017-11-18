"use strict";

var User = require("../models/user");
var UserValidator = require("../validator/user");

var UserController = {};

// register get
UserController.getRegister = function(req, res) {
    var messages = req.flash('messages');
    res.render('user/register', {
        title: 'Register',
        csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0
    });
};

// register post
UserController.postRegister = function (req, res) {
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').isLength({ min:4 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        req.flash("messages", messages);
        res.redirect('/user/register');
    } else {
        User.findOne({ 'email': req.body.email }, function (err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                var messages = [];
                messages.push("email is not available");
                req.flash("messages", messages);
                res.redirect('/user/register');;
            } else {
                var newUser = new User();
                newUser.email = req.body.email;
                newUser.password = newUser.encryptPassword(req.body.password);
                newUser.save(function(err, result) {
                    if (err) throw err;
                    req.flash("success_msg", "You are registered");
                    res.redirect('/');
                });
            }
        });
    }
};

// login get form
UserController.getLogin = function (req, res) {
    res.render("user/login", {
        title: "Login", csrfToken: req.csrfToken()
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