const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  "mongodb+srv://admin-deb:test1234@cluster0.gw36x.mongodb.net/todolistDB?retryWrites=true&w=majority"
);

//get models
const Item = require("../modules/item");
const TaskList = require("../modules/taskList");

//get list
router.get("/", async (req, res) => {
  const listCollection = await TaskList.find({});
  res.send(listCollection);
});

//create list
router.post("/", async (req, res) => {
  const newTaskList = new TaskList({
    name: req.body.name,
    items: req.body.items,
  });
  await newTaskList.save();
  res.status(201).send();
});

module.exports = router;
