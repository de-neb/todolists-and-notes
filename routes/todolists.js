const express = require("express");
//get models
const { TodoList } = require("../models/todolist");
const User = require("../models/user");
const router = express.Router();

const handleError = (err) => {
  return { error: err.message };
};

const starterList = new TodoList({
  name: "My First List",
  isActive: true,
  items: [
    {
      title: "Your to-do items are listed here",
    },
    {
      title: "Click the add button or hit Enter to add an item",
    },
    {
      title: "Remember to click Save when making changes!",
    },
  ],
  done: false,
});

//get list
router.get("/:uid", (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) {
      const error = handleError(err);
      res.status(400).send({ error });
    } else {
      if (user.todoLists.length === 0) {
        user.todoLists.push(starterList);
        user.save();
      }
      res.status(200).send(user.todoLists);
    }
  });
});

//create list
router.post("/:uid", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    user.todoLists.forEach((list) => {
      list.active = false;
    });
    user.todoLists.push({ name: req.body.name });
    await user.save();
    res.status(201).send(user.todoLists);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//delete list
router.delete("/:uid/list/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    //previd is index
    const { prevListId } = req.body;

    if (user.todoLists.length === 1) {
      user.todoLists.id(req.params.id).remove();
      user.save();
      res.send([]);
    } else if (user.todoLists.length > 1) {
      user.todoLists.id(req.params.id).remove();
      user.todoLists.forEach((list) => {
        if (list.active) {
          list.active = false;
        }
      });
      user.todoLists[prevListId].active = true;
      user.save();
      res.status(200).send(user.todoLists);
    }
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//update list
router.put("/:uid/list/:id", async (req, res) => {
  const { uid, id } = req.params;
  try {
    const user = await User.findById(uid).exec();
    user.todoLists.forEach((list) => {
      if (list._id != id) {
        list.active = false;
      } else {
        list.active = true;
      }
    });
    user.save();
    res.status(200).send(user.todoLists);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//get items
router.get("/:uid/list/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    const items = user.todoLists.id(req.params.id).items;
    res.status(200).send(items);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//add items
router.post("/:uid/list/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    const items = user.todoLists.id(req.params.id).items;
    items.push({ title: req.body.itemTitle });
    user.save();
    res.status(201).send(items);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//delete single item
router.patch("/:uid/list/:id/delete-item", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    const items = user.todoLists.id(req.params.id).items;
    items.id(req.body.itemId).remove();
    user.save();
    res.status(200).send(items);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//delete all items
router.patch("/:uid/list/:id/delete-items", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    user.todoLists.id(req.params.id).items = [];
    user.save();
    res.status(200).send([]);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//update items arr
router.patch("/:uid/list/:id/update-items", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    user.todoLists.id(req.params.id).items = req.body.items;
    await user.save();
    res.status(200).send("items updated successfully!");
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

module.exports = router;
