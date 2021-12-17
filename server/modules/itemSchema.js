const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  title: String,
  due: Number,
  priority: String,
  details: String,
});
