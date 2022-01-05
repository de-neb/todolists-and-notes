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
  try {
    const listCollection = await TaskList.find({}).exec();

    res.send(listCollection);
  } catch (error) {
    console.log(error.message);
  }
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
    await TaskList.updateMany({}, { active: false });
    await newTaskList.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

//delete list
router.delete("/:id/delete-list", async (req, res) => {
  try {
    const listExists = await TaskList.exists({ _id: req.params.id });

    if (listExists) {
      await TaskList.deleteOne({ _id: req.params.id });
      //set last list as active
      TaskList.countDocuments({}, (err, c) => {
        if (c > 0) {
          TaskList.findOne()
            .sort({ field: "asc", _id: -1 })
            .exec(async (err, list) => {
              list.active = true;
              await list.save();
              //sending updated list instead
              const updatedList = await TaskList.find({});
              res.send(updatedList);
            });
        } else {
          res.send([]);
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//update list
router.put("/:id/update-active-list", async (req, res) => {
  const id = req.params.id;
  try {
    await TaskList.updateMany({ _id: { $ne: id } }, { active: false });
    TaskList.findOneAndUpdate(
      { _id: id },
      { active: true },
      { new: true },
      (err, list) => {
        if (!err) {
          // console.log(`list: ${list.name}, active: ${list.active}`);
          res.status(200).send();
        }
      }
    );
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

//delete single item
router.delete("/:id/delete-item", (req, res) => {
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

//delete all items
router.delete("/:id/delete-items", (req, res) => {
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $set: { items: [] } },
    (err, doc) => {
      if (!err) {
        res.status(200).send();
      }
    }
  );
});

//update items arr
router.put("/:id/update-items", (req, res) => {
  const updatedItems = req.body.items;
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $set: { items: updatedItems } },
    (err, doc) => {
      if (!err) {
        res.status(200).send();
      }
    }
  );
});

module.exports = router;
