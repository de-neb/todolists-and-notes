const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  title: String,
  priority: { type: String, default: "None" },
  details: String,
  done: { type: Boolean, default: false },
  expandedItem: { type: Boolean, default: false },
  date: String,
});
