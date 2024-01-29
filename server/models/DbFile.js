const mongoose = require("mongoose");

const DbFileSchema = new mongoose.Schema({
  name: String,
  file: Buffer,
});

module.exports = mongoose.model("DbFile", DbFileSchema);
