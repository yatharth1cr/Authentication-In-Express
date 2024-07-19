var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", (req, res, next) => {
  res.send("Welcome to users");
});

// render registrationForm
router.get("/register", (req, res, next) => {
  res.render("registrationForm");
});

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/users/login");
    })
    .catch((err) => {
      return next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("loginForm");
});

module.exports = router;
