const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  "mongodb+srv://admin-deb:test1234@cluster0.gw36x.mongodb.net/todolistDB?retryWrites=true&w=majority"
);

//get list
router.get("/", (req, res) => {
  res.send("test");
});

module.exports = router;
