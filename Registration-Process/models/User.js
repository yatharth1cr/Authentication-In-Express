var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  age: { type: Number },
  phone: { type: String },
});

userSchema.pre("save", (next) => {
  console.log(this);
});

module.exports = mongoose.model("User", userSchema);
