var express = require("express");
var router = express.Router();
var User = require("../models/User");

// render registrationForm
router.get("/register", function (req, res, next) {
  res.render("registrationForm");
});

//
router.post("/register", function (req, res, next) {
  User.create(req.body)
    .then((users) => {
      res.redirect("/users");
    })
    .catch((err) => {
      return next(err);
    });
});

router.get("/login", function (req, res, next) {
  res.render("loginForm");
});
module.exports = router;
