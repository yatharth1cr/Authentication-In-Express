var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("users");
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

// render loginForm
router.get("/login", (req, res, next) => {
  res.render("loginForm");
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    console.log("Email or password not provided");
    return res.redirect("/users/login");
  }

  User.findOne({ email })
    .then((user) => {
      // no user
      if (!user) {
        console.log("User not found");
        return res.redirect("/users/login");
      }

      // compare password
      user.verifyPassword(password, (err, result) => {
        if (err) return next(err);
        // if incorrect pass
        if (!result) {
          console.log("Password incorrect");
          return res.redirect("/users/login");
        }
        // persist logged in user information
        req.session.userId = user.id;
        res.redirect("/dashboard");
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      return next(err);
    });
});

// logout
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});

module.exports = router;
