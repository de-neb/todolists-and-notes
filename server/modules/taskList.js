const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const taskListSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

module.exports = mongoose.model("taskList", taskListSchema);
