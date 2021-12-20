const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  "mongodb+srv://admin-deb:test1234@cluster0.gw36x.mongodb.net/newTodolistDB?retryWrites=true&w=majority"
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
  try {
    const newTaskList = new TaskList({
      name: req.body.name,
      items: req.body.items,
    });
    await newTaskList.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

//delete list
router.delete("/:id", async (req, res) => {
  try {
    await TaskList.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
