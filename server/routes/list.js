const path = require("path");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gw36x.mongodb.net/newTodolistDB?retryWrites=true&w=majority`
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
      active: req.body.isActive,
      done: req.body.isDone,
    });
    await newTaskList.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

//delete list
router.delete("/:id/deleteList", async (req, res) => {
  try {
    await TaskList.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch (error) {
    console.log(error.message);
  }
});

//get items

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const foundList = await TaskList.findById(id).exec();
      res.send(foundList);
    }
  } catch (error) {
    console.log(error.message);
  }
});

//add items
router.post("/:id", (req, res) => {
  const newItem = new Item({
    title: req.body.itemTitle,
    priority: req.body.priority,
    details: req.body.details,
    done: req.body.done,
    expandedItem: req.body.expandedItem,
    date: req.body.date,
  });
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $push: { items: newItem } },
    (err, doc) => {
      if (!err) {
        res.status(200).send();
      }
    }
  );
});

//delete item
router.delete("/:id/deleteId", (req, res) => {
  const itemId = req.body.itemId;
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $pull: { items: { _id: itemId } } },
    (err, doc) => {
      if (!err) {
        res.status(200).send();
      }
    }
  );
});

module.exports = router;
