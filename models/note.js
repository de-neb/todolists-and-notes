const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  details: String,
  bgColor: String,
  txtColor: String,
});

module.exports = { Note: new mongoose.model("note", notesSchema), notesSchema };
