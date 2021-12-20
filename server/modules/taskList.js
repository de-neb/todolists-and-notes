const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const taskListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
});

module.exports = mongoose.model("taskList", taskListSchema);
