const express = require("express");
const mongoose = require("mongoose");
//get models
const { Item } = require("../models/item");
const { TodoList } = require("../models/todolist");
const router = express.Router();

//get list
router.get("/", async (req, res) => {
  try {
    const listCollection = await TodoList.find({}).exec();
    res.send(listCollection);
  } catch (error) {
    console.log(error.message);
  }
});

//create list
router.post("/", async (req, res) => {
  try {
    const newTodoList = new TodoList({
      name: req.body.name,
    });
    await TodoList.updateMany({}, { active: false });
    await newTodoList.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

//delete list
router.delete("/:id/delete-list", async (req, res) => {
  try {
    const { prevListId } = req.body;
    const listExists = await TodoList.exists({ _id: req.params.id });
    if (listExists) {
      await TodoList.deleteOne({ _id: req.params.id });
      TodoList.countDocuments({}, async (err, c) => {
        //checks if document is not empty
        if (c > 0) {
          //find current active list and set value to false and
          //set last document as active instead
          TodoList.bulkWrite(
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
            const updatedList = await TodoList.find({});
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

  TodoList.updateMany({ _id: { $ne: id } }, { active: false }).then(() => {
    TodoList.findOneAndUpdate({ _id: id }, { active: true }, (err) => {
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
      const foundList = await TodoList.findById(id).exec();
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
  TodoList.findByIdAndUpdate(
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
  TodoList.findByIdAndUpdate(
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
  TodoList.findByIdAndUpdate(req.params.id, { items: [] }, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send();
    }
  });
});

//update items arr
router.patch("/:id/update-items", (req, res) => {
  TodoList.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
