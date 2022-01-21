const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const handleError = (e) => {
  const err = { username: "", password: "" };
  if (e.code === 11000) {
    err.username = "Username already exists";
  }
  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties: prop }) => {
      err[prop.path] = prop.message;
    });
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

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
    });
    const token = createToken(user._id);
    res.cookie("todolistJWT", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).send({ user: { id: user._id } });
  } catch (err) {
    const error = handleError(err);
    console.log(err);
    res.status(400).send({ error });
  }
});

module.exports = router;
