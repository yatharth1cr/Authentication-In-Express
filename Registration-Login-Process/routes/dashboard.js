var express = require("express");
var router = express.Router();
var User = require("../models/User");

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

// Define the /dashboard route
router.get("/", isAuthenticated, (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/users/login");
      }
      res.render("dashboard", { user });
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
