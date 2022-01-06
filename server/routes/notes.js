const path = require("path");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gw36x.mongodb.net/newTodolistDB?retryWrites=true&w=majority`
);

const Note = require("../modules/note");

//notes route
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
    });
    await newNote.save();
    res.status(201).send();
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;