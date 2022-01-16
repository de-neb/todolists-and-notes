require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//get models
const Item = require("../modules/item");
const TaskList = require("../modules/taskList");
const router = express.Router();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

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
    const { prevListId } = req.body;
    const listExists = await TaskList.exists({ _id: req.params.id });
    if (listExists) {
      await TaskList.deleteOne({ _id: req.params.id });
      TaskList.countDocuments({}, async (err, c) => {
        //checks if document is not empty
        if (c > 0) {
          //find current active list and set value to false and
          //set last document as active instead
          TaskList.bulkWrite(
            [
              {
                updateOne: {
                  filter: { active: true },
                  update: { active: false },
                },
              },
              {
                updateOne: {
                  filter: { _id: prevListId },
                  update: { active: true },
                },
              },
            ],
            { ordered: true }
          ).then(async () => {
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
router.put("/:id/update-active-list", (req, res) => {
  const id = req.params.id;

  TaskList.updateMany({ _id: { $ne: id } }, { active: false }).then(() => {
    TaskList.findOneAndUpdate({ _id: id }, { active: true }, (err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });
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
  });
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $push: { items: newItem } },
    (err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.status(200).send();
      }
    }
  );
});

//delete single item
router.patch("/:id/delete-item", (req, res) => {
  TaskList.findByIdAndUpdate(
    req.params.id,
    { $pull: { items: { _id: req.body.itemId } } },
    (err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.status(200).send();
      }
    }
  );
});

//delete all items
router.patch("/:id/delete-items", (req, res) => {
  TaskList.findByIdAndUpdate(req.params.id, { items: [] }, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send();
    }
  });
});

//update items arr
router.patch("/:id/update-items", (req, res) => {
  TaskList.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
