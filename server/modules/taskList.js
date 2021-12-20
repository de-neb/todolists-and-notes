const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const taskListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
  active: { type: Boolean, default: true },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("taskList", taskListSchema);
