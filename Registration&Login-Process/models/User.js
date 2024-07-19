var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  age: { type: Number },
  phone: { type: String },
});

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hashed) => {
        this.password = hashed;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
