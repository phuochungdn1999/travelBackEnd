const mongoose = require("mongoose");

const HotplaceSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  PlaceID: {
    type: String,
    require: true
  },
  Place: {
    type: Object,
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

module.exports = mongoose.model("Hotplaces", HotplaceSchema);
