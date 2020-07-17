const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  PlaceID: {
    type: Object,
    require: true,
  },
  Star:{
    type: Number,
    require: false,
  },
  Price:{
    type: Number,
    require: true,
  },
  Star_Rating: {
    type: Number,
    require: false,
  },
  Description: {
    type: String,
    require: false,
  },
  URL_Image: {
    type: String,
    require: false,
  },
},{
  timestamps:true
});

module.exports = mongoose.model("Hotels", HotelSchema);
