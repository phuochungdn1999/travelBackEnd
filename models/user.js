const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Username: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Created_Date: Date,
  Type_User: {
    type: String,
    require: false,
  },
  Status_User: {
    type: Boolean,
    require: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);
