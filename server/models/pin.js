const mongoose = require("mongoose");

//define a message schema for the database
const PinSchema = new mongoose.Schema({
  name:String,
  description:String,
  location:String
});

// compile model from schema
module.exports = mongoose.model("pin", PinSchema);
