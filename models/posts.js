const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: String,
});

module.exports = mongoose.model("Post", PostSchema);
