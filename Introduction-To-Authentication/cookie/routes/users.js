var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  console.log(req.cookies);
  res.cookie("name", "Yatharth");
  res.redirect("/");
});

module.exports = router;
