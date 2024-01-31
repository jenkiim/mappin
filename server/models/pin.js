const mongoose = require("mongoose");

//define a message schema for the database
const PinSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: Object, //this is the GeoJSON pin
  file: Buffer,
});

// compile model from schema
module.exports = mongoose.model("pin", PinSchema);
