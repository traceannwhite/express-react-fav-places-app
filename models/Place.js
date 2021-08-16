//import mongoose
const mongoose = require("mongoose");

//pull schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

//create place schema
const placeSchema = new Schema(
  {
    name: String,
    img: String,
    description: String,
  },
  { timestamps: true }
);

// create our model object
const Place = model("Place", placeSchema);

//export our model object
module.exports = Place;
