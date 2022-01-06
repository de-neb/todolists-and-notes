const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  details: String,
  visibility: { type: Boolean, default: false },
});

module.exports = mongoose.model("note", notesSchema);
