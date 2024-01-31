const mongoose = require("mongoose");

const DbFileSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  name: String,
  latitude: Number,
  longitude: Number,
  file: Buffer,
});

module.exports = mongoose.model("DbFile", DbFileSchema);
