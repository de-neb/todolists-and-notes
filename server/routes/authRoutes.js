const express = require("express");
const User = require("../models/user");
const router = express.Router();

const handleError = (e) => {
  const err = { username: "", password: "" };

  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties: prop }) => {
      err[prop.path] = prop.message;
    });
  }
  return err;
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
    });
    res.status(201).send(user);
  } catch (error) {
    const err = handleError(error);
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
