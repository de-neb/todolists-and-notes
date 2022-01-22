const express = require("express");

const router = express.Router();

const { Note } = require("../models/note");

router.get("/", async (req, res) => {
  try {
    const notesCollection = await Note.find({}).exec();
    res.send(notesCollection);
  } catch (error) {
    console.log(error.message);
  }
});

//create note
router.post("/", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      details: req.body.details,
      bgColor: req.body.bgColor,
      txtColor: req.body.txtColor,
    });
    await newNote.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

//delete note
router.delete("/:id/delete", async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch (error) {
    console.log(error.message);
  }
});

//update
router.put("/:id", (req, res) => {
  try {
    Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        details: req.body.details,
        bgColor: req.body.bgColor,
        txtColor: req.body.txtColor,
      },
      (err, doc) => {
        if (!err) {
          res.status(200).send();
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
