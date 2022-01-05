const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  details: String,
});

module.exports = mongoose.model("note", notesSchema);
