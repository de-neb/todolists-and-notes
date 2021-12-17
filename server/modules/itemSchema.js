const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  title: String,
  priority: String,
  details: String,
});
