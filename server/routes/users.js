const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

const handleError = (e) => {
  let err = { username: "", password: "" };
  if (e.message == "Blank password") {
    err.password = "Password must not be empty";
  }
  if (e.message == "Blank username") {
    err.password = "Username must not be empty";
  }
  if (e.message == "Incorrect password") {
    err.password = "Password is incorrect";
  }
  if (e.message == "No username found") {
    err.username = "No username found";
  }
  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties: prop }) => {
      err[prop.path] = prop.message;
    });
  }
  if (e.code === 11000) {
    err.username = "Username already exists";
  }

  return err;
};

//set max age and create token
const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).send(users);
    }
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPW = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      username,
      password: hashedPW,
    });
    const token = createToken(user._id);
    res.cookie("todolistJWT", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).send({ user: { id: user._id, username: user.username } });
  } catch (err) {
    const error = handleError(err);
    console.log(err);
    res.status(400).send({ error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("todolistJWT", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).send({ user: { id: user._id, username: user.username } });
  } catch (err) {
    console.log(err);
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("todolistJWT", "", { maxAge: 1 });
  res.send({ redirect: true });
  // res.redirect("/")
});

module.exports = router;
