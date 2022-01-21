const mongoose = require("mongoose");
const { todoListSchema } = require("./todolist");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a unique username"],
    unique: [true, "Username was already taken"],
    minlength: [4, "Username minimum length is 4 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password minimum length is 6 characters"],
  },
  todoLists: [todoListSchema],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = new mongoose.model("user", userSchema);
