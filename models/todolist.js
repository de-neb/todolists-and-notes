const mongoose = require("mongoose");
const { itemSchema } = require("./item");

const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
  active: { type: Boolean, default: true },
  done: { type: Boolean, default: false },
});

module.exports = {
  TodoList: new mongoose.model("todoList", todoListSchema),
  todoListSchema,
};
