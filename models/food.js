const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  PlaceID: {
    type: String,
    require: true,
  },
  Place: {
    type: Object,
    require: true,
  },
  Description:{
      type: String,
      require: false
  },
  Price:{
      type: Number,
      require: false
  },
  Star_Rating: {
    type: Number,
    require: false,
  },
  URL_Image: {
    type: String,
    require: false,
  },
},{
  timestamps:true
});

module.exports = mongoose.model("Foods", FoodSchema);
