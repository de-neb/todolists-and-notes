const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, default: "None" },
  details: String,
  done: { type: Boolean, default: false },
  expandedItem: { type: Boolean, default: false },
  date: { type: String, default: "" },
});

module.exports = { Item: mongoose.model("item", itemSchema), itemSchema };
