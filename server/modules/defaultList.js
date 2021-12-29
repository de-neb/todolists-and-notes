const TaskList = require("./taskList");

module.exports = new TaskList({
  name: "My Task",
  isActive: true,
  items: [
    {
      title: "Your to-do items are listed here",
    },
    {
      title: "Click the add button or hit Enter to add an item",
    },
    {
      title: "Remember to click Save when making changes!",
    },
  ],
  done: false,
});
