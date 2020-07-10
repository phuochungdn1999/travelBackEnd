const mongoose = require("mongoose");

const PlaceSchema = mongoose.Schema({
  PlaceID: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Country: {
    type: String,
    require: true,
  },
  URL_Image: {
    type: String,
    require: false,
  },
});
module.exports = mongoose.model("Places", PlaceSchema);
