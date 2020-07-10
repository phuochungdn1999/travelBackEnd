const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  PlaceID: {
    type: String,
    require: true,
  },
  Start_Date: {
    type: Date,
    require: true,
  },
  End_Date:{
    type: Date,
    require: true
  },
  Star_Rating: {
    type: Number,
    require: false,
  },
  URL_Image: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Hotels", HotelSchema);
