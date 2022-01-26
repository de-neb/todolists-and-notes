const express = require("express");
const router = express.Router();
const User = require("../models/user");

const handleError = (err) => {
  return { error: err.message };
};

router.get("/:uid", (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) {
      const error = handleError(err);
      res.status(400).send(error);
    } else {
      res.status(200).send(user.notes);
    }
  });
});

//create note
router.post("/:uid", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    user.notes.push({
      title: req.body.title,
      details: req.body.details,
      bgColor: req.body.bgColor,
      txtColor: req.body.txtColor,
    });
    user.save();
    res.status(201).send(user.notes);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send(error);
  }
});

//delete note
router.delete("/:uid/note/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).exec();
    user.notes.id(req.params.id).remove();
    user.save();
    res.status(200).send(user.notes);
  } catch (err) {
    const error = handleError(err);
    res.status(400).send(error);
  }
});

//update
router.patch("/:uid/note/:id", (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) {
      const error = handleError(err);
      res.status(400).send(error);
    } else {
      const index = user.notes.indexOf(user.notes.id(req.params.id));
      user.notes[index] = req.body;
      user.save();
      res.status(200).send(user.notes);
    }
  });
});

module.exports = router;
