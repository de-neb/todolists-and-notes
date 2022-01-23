const mongoose = require("mongoose");
const { todoListSchema } = require("./todolist");
const { notesSchema } = require("./note");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: [true, "Username was already taken"],
    minlength: [4, "Username minimum length is 4 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password minimum length is 6 characters"],
  },
  todoLists: [todoListSchema],
  notes: [notesSchema],
});

//static method to login user
userSchema.static("login", async function (username, password) {
  const user = await this.findOne({ username }).exec();
  if (!password) {
    throw Error("Blank password");
  }
  if (!username) {
    throw Error("Blank username");
  }
  //if username is found check if password matches in db
  if (user) {
    const authRes = await bcrypt.compare(password, user.password);
    if (authRes) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("No username found");
});

module.exports = new mongoose.model("user", userSchema);
